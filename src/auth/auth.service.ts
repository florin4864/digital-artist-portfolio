import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { compare, hash } from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { SECRET } from "src/constants";
import { Request } from "express";



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async register(email: string, password: string): Promise<User> {
        const hashedPassword = await hash(password, 12);

        const user = new User();
        user.email = email;
        user.password = hashedPassword;

        // NOTE: This also updates the entry if already in the database
        return this.userRepository.save(user);
    }

    async login(email: string, password: string): Promise<string> {
        const user = await this.find(email, password);
        if (! user) {
            throw new BadRequestException('Invalid credentials');
        }

        // Use sub to hold the user id (in this case user.email)
        //  to conform with JWT standards
        const payload = {
            sub: user.email
        };

        return this.jwtService.signAsync(
            payload,
            { secret: SECRET }
        );
    }

    async find(email: string, password: string): Promise<User | null> {
        const users = await this.userRepository.findBy({email: email});
        if (users.length === 0) {
            return null;
        }

        for (let i = 0; i < users.length; i++) {
            const u = users[i];
            if (await compare(password, u.password)) {
                return u;
            }
        }

        return null;
    }

    async isSetupComplete(): Promise<boolean> {
        const usersNum = await this.userRepository.count();

        return usersNum > 0
    }

    isLogged(request: Request): boolean {
        return this.extractTokenFromCookie(request) ? true : false;
    }

    extractTokenFromCookie(request: Request): string | null {
        if (! request.headers.cookie) {
            return null;
        }

        const nameEQ = 'jwt-token=';
        const ca = request.headers.cookie.split(";");
        for(let i=0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    };
}
