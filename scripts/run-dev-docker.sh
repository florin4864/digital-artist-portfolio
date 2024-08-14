#!/usr/bin/env bash



cd "$(dirname "$BASH_SOURCE")"
cd ..

podman-compose down && podman-compose up -d $@
