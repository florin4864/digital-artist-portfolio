import { BadRequestException, Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request, Response } from 'express';



@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    async register(
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('repeat-password') repeatPassword: string,
        @Res({passthrough: true}) res: Response
    ) {
        if (password !== repeatPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        await this.authService.register(email, password);
        const jwtToken = await this.authService.login(email, password);
        res.cookie('jwt-token', jwtToken, { httpOnly: false, sameSite: "strict" });
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) res: Response
    ) {
        const jwtToken = await this.authService.login(email, password);
        res.cookie('jwt-token', jwtToken, { httpOnly: false, sameSite: "strict" });
    }

    @UseGuards(AuthGuard)
    @Get('logout')
    async logout(
        @Res({passthrough: true}) res: Response
    ) {
        // res.cookie('jwt-token', '-', { expires: new Date() });
        res.clearCookie('jwt-token');
    }

    @Get('is-setup-complete')
    async isSetupComplete() {
        return this.authService.isSetupComplete();
    }

    @Get('is-logged')
    async isLogged(
        @Req() req: Request
    ) {
        return this.authService.isLogged(req);
    }
}
