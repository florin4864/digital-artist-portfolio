#!/usr/bin/env bash



cd "$(dirname "$BASH_SOURCE")"
cd ..

bash ./scripts/build-prod-all.sh
npm run start:prod
