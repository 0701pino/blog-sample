# ベースイメージを指定
FROM node:18.12.1-bullseye-slim AS base

# ビルドステージの設定
FROM base AS builder

WORKDIR /workspace/next_app

RUN apt-get update && apt-get upgrade -y

# パッケージのJSONとロックファイルをコピー
COPY next_app/package.json next_app/yarn.lock* ./

# ソースコードとその他の関連ファイルをコピー
COPY next_app/src ./src
COPY next_app/public ./public
COPY next_app/tsconfig.json next_app/*.js ./
COPY next_app/posts ./posts

# 依存関係のインストール
RUN yarn --frozen-lockfile

# Next.jsによってテレメトリデータを収集するのを無効にする
ARG NEXT_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=$NEXT_TELEMETRY_DISABLED

# Next.jsアプリのビルド
RUN yarn build

# 実行ステージの設定
FROM base AS runner

WORKDIR /workspace/next_app

USER node

# ビルドステージからの必要なファイルをコピー
COPY --from=builder /workspace/next_app/public ./public
COPY --from=builder --chown=node:node /workspace/next_app/.next/standalone ./
COPY --from=builder --chown=node:node /workspace/next_app/.next/static ./.next/static
COPY --from=builder /workspace/next_app/posts ./posts

# Next.jsによってテレメトリデータを収集するのを無効にする
ENV NEXT_TELEMETRY_DISABLED=$NEXT_TELEMETRY_DISABLED

# 注意: ポートのマッピングはdocker-composeで行うため、設定しない


CMD ["node", "server.js"]
