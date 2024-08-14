#!/usr/bin/env bash



cd "$(dirname "$BASH_SOURCE")"

bash ./build-prod-client.sh
bash ./build-prod-server.sh
