export type Message = {
    role: "system" | "assistant" | "user";
    content: string;
  };
export type ResponseData = {
    id: string;
    prompt: string;
    response: string; 
}