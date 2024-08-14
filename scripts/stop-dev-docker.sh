#!/usr/bin/env bash



cd "$(dirname "$BASH_SOURCE")"
cd ..

podman-compose down
