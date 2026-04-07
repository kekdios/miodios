#!/usr/bin/env bash
# One-time: add 2G swap so npm ci / next build are less likely to be OOM-killed on 1GB droplets.
# Run as root: sudo bash /opt/prayer/deploy/add-swap.sh

set -euo pipefail

if [[ -f /swapfile ]]; then
  echo "/swapfile already exists; skipping."
  swapon --show || true
  exit 0
fi

fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
echo "2G swap enabled. swapon --show:"
swapon --show
