import { readLines } from "https://deno.land/std@0.178.0/io/read_lines.ts";
import { OPENAI_API_KEY } from "./secrets.ts";

const endpoint = "https://api.openai.com/v1/chat/completions";
const model = "gpt-3.5-turbo";

type ChatGPTMessage = {
  /// ref: https://platform.openai.com/docs/guides/chat/introduction
  "role": "system" | "user" | "assistant";
  "content": string;
};

/// ref: https://platform.openai.com/docs/api-reference/chat/create
type ChatGPTRequestBody = {
  "model": string;
  "messages": ChatGPTMessage[];
};

const requestBody: ChatGPTRequestBody = {
  "model": `${model}`,
  "messages": [
    { "role": "user", "content": "こんにちは" },
  ],
};

const chatGPTRequestOptions: RequestInit = {
  method: `POST`,
  headers: {
    "Authorization": `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": `application/json`,
  },
  body: JSON.stringify(requestBody),
};

// interactive

console.error("メッセージをどうぞ (改行で送信。未入力でCtrd+Dで終了。):");
for await (const line of readLines(Deno.stdin)) {
  requestBody.messages[0] = { "role": "user", "content": line };
  chatGPTRequestOptions.body = JSON.stringify(requestBody);

  const res = await fetch(endpoint, chatGPTRequestOptions);
  const data = new Uint8Array(await res.arrayBuffer());
  await Deno.stdout.write(data);
}
