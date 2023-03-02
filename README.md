# chatgpt-cli.deno
ChatGPT APIをDenoで対話的に実行するクライアントを書いてみる

## Require

- Deno
    - Deno 1.31.1 での動作確認はしました。

## Setup

```console
# OpenAI API KEY を書き込むためのファイル secrets.ts が生成される
deno task init
```

## Run

```console
deno run --allow-net main.ts
```
