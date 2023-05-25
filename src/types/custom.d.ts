export type Message = {
    role: "system" | "assistant" | "user";
    content: string;
  };
export type ResponseData = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  post: Post;
  user: User;
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

interface Choice {
  index: number;
  finish_reason: string;
  message: Message;
}

interface Message {
  role: string;
  content: string;
}

interface Usage {
  completion_tokens: number;
  prompt_tokens: number;
  total_tokens: number;
}

interface Post {
  messages: Message[];
  max_tokens: number;
  temperature: number;
  stop: string;
}

interface User {
  email: string;
  name: string;
}