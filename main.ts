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
  "messages": [],
};

const chatGPTRequestOptions: RequestInit = {
  method: `POST`,
  headers: {
    "Authorization": `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": `application/json`,
  },
  body: JSON.stringify(requestBody),
};

/// ref: https://platform.openai.com/docs/api-reference/chat/create
type ChatGPTResponse = {
  "id": string;
  "object": string;
  "created": number;
  "choices": {
    "index": number;
    "message": ChatGPTMessage;
    "finish_reason": string;
  }[];
  "usage": {
    "prompt_tokens": number;
    "completion_tokens": number;
    "total_tokens": number;
  };
};

// interactive

console.error("メッセージをどうぞ (改行で送信。未入力でCtrd+Dで終了。):");
for await (const line of readLines(Deno.stdin)) {
  requestBody.messages.push({ "role": "user", "content": line });
  chatGPTRequestOptions.body = JSON.stringify(requestBody);

  const res = await fetch(endpoint, chatGPTRequestOptions);
  const jsonData: ChatGPTResponse = await res.json();
  const message = jsonData.choices[0].message;

  requestBody.messages.push({
    "role": "assistant",
    "content": message.content,
  });

  console.log("ChatGPT> ", message.content);
  console.error(jsonData.usage);
}
