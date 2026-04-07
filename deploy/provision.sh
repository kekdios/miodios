#!/usr/bin/env bash
# From your laptop (SSH key allowed on the droplet), push deploy scripts and run bootstrap.
# Usage:
#   ./deploy/provision.sh
#   ./deploy/provision.sh 178.128.218.5
# Private GitHub repo:
#   GIT_REPO='https://<token>@github.com/kekdios/miodios.git' ./deploy/provision.sh

set -euo pipefail

HOST="${1:-178.128.218.5}"
HERE="$(cd "$(dirname "$0")" && pwd)"
GIT_REPO="${GIT_REPO:-https://github.com/kekdios/miodios.git}"

echo "Provisioning ${HOST} (repo: ${GIT_REPO})"
rsync -avz "${HERE}/" "root@${HOST}:/root/miodios-deploy/"
ssh "root@${HOST}" "GIT_REPO='${GIT_REPO}' bash /root/miodios-deploy/bootstrap-droplet.sh"
