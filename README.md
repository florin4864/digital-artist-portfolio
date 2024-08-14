## About

<p align="center">A simple webapp that serves as a digital artist's portfolio built in <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> using <a href="https://nestjs.com/" target="_blank">NestJS</a> and <a href="https://react.dev/" target="_blank">ReactJS</a> frameworks.</p>
<p align="center">
</p>

## Development setup

#### Install required packages

For NixOS or nix users:

```bash
$ nix-shell ./scripts/nix-shell.nix
```

For Ubuntu:

```bash
$ apt update
$ apt install nodejs sqlite3
```

#### Install node dependencies

Then install npm dependencies for the backend:

```bash
$ npm install
```

And for the frontend:

```bash
$ cd ./client/
$ npm install
```

## Running the app

There are multiple ways to run the webapp, all scripts to control the project are in `scripts` directory:

- To run in local development mode (use locally installed packages):

```bash
# This runs the client with a development server on port 8060.
# The client routes API requests to the server on port 8050,
#   so the server needs to run too (in production mode or development mode).
$ bash ./scripts/run-dev-client.sh

# This runs the server in development mode on port 8050.
$ bash ./scripts/run-dev-server.sh

# Both watch for file changes and restart when appropriate.
```

- Another way is to run the server and manually build the client:

```bash
$ bash ./scripts/run-dev-server.sh
$ bash ./scripts/build-prod-client.sh
```

- To run in containerized development mode (using `docker` or `podman` if `docker` is aliased as `podman`, which is usually the case):

```bash
# This builds the container from `Dockerfile` twice.
# Once for the frontend (client) and for the backend (server).
# Both watch for file changes and restart when appropriate.
# The same ports are used (8050 for the server and 8060 for the client).
$ bash ./scripts/run-dev-docker.sh

# This takes a while to run for the first time, I know it can be
#   optimized for better developer experience but "I'm gonna do it later"™.
```

- To run in containerized production mode:

```bash
$ bash ./scripts/build-prod-docker.sh && bash ./scripts/run-prod-docker.sh
```
