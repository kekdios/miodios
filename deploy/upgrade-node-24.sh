#!/usr/bin/env bash
# One-time on an existing droplet: replace Node 20 with Node 24 (@fly/sprites expects >=24).
# Run as root: sudo bash /opt/prayer/deploy/upgrade-node-24.sh

set -euo pipefail
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt-get update -y
apt-get install -y nodejs
node -v
npm -v
