#!/bin/bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$PROJECT_DIR"

echo "Installing dependencies..."
pnpm install

echo "Building the project..."
cd apps/editor
pnpm exec next build

echo "Build completed successfully!"
