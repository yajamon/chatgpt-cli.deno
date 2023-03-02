/**
 * OpenAI の API_KEY を入力するためのファイルを生成する。
 */
const content = `// 公開しないように気をつけて

export const OPENAI_API_KEY = "";
`;

const path = "./secrets.ts";
const options: Deno.WriteFileOptions = {
  createNew: true,
  mode: 0o600,
};

await Deno.writeTextFile(path, content, options);

console.log(`Output: File written to ${path}`);
