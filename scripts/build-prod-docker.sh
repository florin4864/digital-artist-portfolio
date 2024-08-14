#!/usr/bin/env bash



cd "$(dirname "$BASH_SOURCE")"
cd ..

# Create image
docker image build --tag dap .

# Create container
podman container create \
    --interactive \
    --tty \
    --name dap \
    --network='bridge' \
    -p 8050:8050 \
    dap:latest
