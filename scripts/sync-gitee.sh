#!/usr/bin/env bash
#
# 创建并推送 Lumière 仓库到 Gitee。
#
# 需要 Gitee 私人令牌（Personal Access Token，勾选 projects 权限）：
#   https://gitee.com/profile/personal_access_tokens
#
# 令牌来源（二选一，优先前者）：
#   1) 环境变量：export GITEE_TOKEN=xxxxxxxx
#   2) 文件：    echo xxxxxxxx > ~/.gitee_token && chmod 600 ~/.gitee_token
#
# 用法：
#   bash scripts/sync-gitee.sh [仓库名] [可见性]
#
set -euo pipefail

REPO_NAME="${1:-lumiere-store}"
VISIBILITY="${2:-public}"
OWNER="${GITEE_OWNER:-hugo-zhe}"
DESCRIPTION="Lumière 露弥尔 — 奶油马卡龙风格的科技生活方式电商首页。Next.js 16 + React 19 + TypeScript + Tailwind v4 + Motion，玻璃拟态 + 轻粒子特效，含分类筛选、实时搜索、收藏夹与购物车完整交互，附中文设计与开发文档。"

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# ---------- 读取令牌 ----------
TOKEN_FILE="${GITEE_TOKEN_FILE:-$HOME/.gitee_token}"
if [ -n "${GITEE_TOKEN:-}" ]; then
  TOKEN="$GITEE_TOKEN"
elif [ -f "$TOKEN_FILE" ]; then
  TOKEN="$(tr -d '[:space:]' < "$TOKEN_FILE")"
else
  echo "✗ 未找到 Gitee 令牌。" >&2
  echo "  请设置 GITEE_TOKEN 环境变量，或写入 $TOKEN_FILE（chmod 600）。" >&2
  echo "  令牌申请地址：https://gitee.com/profile/personal_access_tokens （需勾选 projects）" >&2
  exit 1
fi

api() {
  curl -fsS -X "$1" \
    -H "Content-Type: application/json" \
    -G "https://gitee.com/api/v5" \
    --data-urlencode "access_token=${TOKEN}" \
    "${@:2}" \
    $EXTRA_DATA
}

# ---------- 确认登录身份 ----------
LOGIN="$(curl -fsS -G "https://gitee.com/api/v5/user" --data-urlencode "access_token=${TOKEN}" | sed -n 's/.*"login":"\([^"]*\)".*/\1/p' | head -1)"
if [ -z "$LOGIN" ]; then
  echo "✗ 令牌无效或已过期。" >&2
  exit 1
fi
echo "→ 已认证为 Gitee 用户：${LOGIN}"
[ "$LOGIN" != "$OWNER" ] && OWNER="$LOGIN"

# ---------- 创建仓库（已存在则跳过） ----------
if curl -fsS -G "https://gitee.com/api/v5/repos/${OWNER}/${REPO_NAME}" \
     --data-urlencode "access_token=${TOKEN}" >/dev/null 2>&1; then
  echo "→ 仓库 ${OWNER}/${REPO_NAME} 已存在，跳过创建"
else
  echo "→ 创建仓库 ${OWNER}/${REPO_NAME}（${VISIBILITY}）"
  PRIVATE=false
  [ "$VISIBILITY" = "private" ] && PRIVATE=true
  curl -fsS -X POST -G "https://gitee.com/api/v5/user/repos" \
    -H "Content-Type: application/json" \
    --data-urlencode "access_token=${TOKEN}" \
    --data-urlencode "name=${REPO_NAME}" \
    --data-urlencode "description=${DESCRIPTION}" \
    --data-urlencode "private=${PRIVATE}" \
    --data-urlencode "auto_init=false" \
    --data-urlencode "has_issues=true" \
    --data-urlencode "has_wiki=true" \
    --data-urlencode "default_branch=main" \
    >/dev/null
  echo "  创建成功"
fi

# ---------- 更新描述与主页 ----------
curl -fsS -X PATCH -G "https://gitee.com/api/v5/repos/${OWNER}/${REPO_NAME}" \
  -H "Content-Type: application/json" \
  --data-urlencode "access_token=${TOKEN}" \
  --data-urlencode "description=${DESCRIPTION}" \
  --data-urlencode "homepage=https://github.com/${GITHUB_OWNER:-DeLaNeige517}/lumiere-store" \
  >/dev/null || true

# ---------- 添加 remote 并推送 ----------
REMOTE_NAME="gitee"
if git remote get-url "$REMOTE_NAME" >/dev/null 2>&1; then
  git remote set-url "$REMOTE_NAME" "git@gitee.com:${OWNER}/${REPO_NAME}.git"
else
  git remote add "$REMOTE_NAME" "git@gitee.com:${OWNER}/${REPO_NAME}.git"
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
echo "→ 推送到 gitee/${BRANCH}"
git push -u "$REMOTE_NAME" "$BRANCH"

echo "✓ 完成：https://gitee.com/${OWNER}/${REPO_NAME}"
