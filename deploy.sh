c#!/usr/bin/env bash
#
# deploy.sh
#
# Deploys the Ahmed Awad photo website.
#

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

REMOTE_HOST="hetzner"
REMOTE_DIR="~/html/ahmed-awad-photo"

echo "==> Ensuring remote directory exists..."
ssh "$REMOTE_HOST" "mkdir -p $REMOTE_DIR"

echo "==> Deploying website..."

rsync -avz --inplace \
    --exclude "deploy.sh" \
    --exclude "serve_dev.sh" \
    --exclude "readme.md" \
    --exclude "TODO" \
    "${SCRIPT_DIR}/" \
    "${REMOTE_HOST}:${REMOTE_DIR}/"

echo "==> Deployment complete!"
echo "https://ahmed-awad-photo.vjbe.net"