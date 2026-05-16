#!/usr/bin/env bash
set -euo pipefail

# 基于脚本位置定位项目根目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
EDITOR_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_DIR="$(cd "$EDITOR_DIR/.." && pwd)"
cd "$PROJECT_DIR"

# 在 monorepo 根目录安装依赖
pnpm install

# 构建 editor 应用
cd "$EDITOR_DIR"
pnpm exec next build
