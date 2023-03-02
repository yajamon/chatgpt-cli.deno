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

const res = await fetch(endpoint, chatGPTRequestOptions);
const data = new Uint8Array(await res.arrayBuffer());
await Deno.stdout.write(data);
