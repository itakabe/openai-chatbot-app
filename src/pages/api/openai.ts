import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const input = req.body.input;
    const model = req.body.model;
    let url;
    if (model ==="chat") {
      url = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/chat/chat/completions?api-version=2023-03-15-preview` || "";
    } else {
      url = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${model}/completions?api-version=2023-03-15-preview` || "";
    }
    const maxTokens = 2048;
    const temperature = 0.7;
    const data = (() => {
      switch (model) {
        case "chat":
          return {
            messages: [{ "role": "system", "content": "You are a helpful assistant." }, { "role": "user", "content": input }],
            max_tokens: maxTokens,
            temperature: temperature,
            stop: "None"
          }
        case "davinci":
          return {
            prompt: input,
            max_tokens: maxTokens,
            temperature: temperature,
          };
        default:
          return null;
      }
    })();

    const headers = {
      'Content-Type': 'application/json',
      'api-key': `${process.env.AZURE_OPENAI_API_KEY}`,
    };
    const response = await axios.post(url, data, { headers });
    switch (req.body.model) {
      case 'chat':
        res.status(200).json({ data: response.data.choices[0].message.content });
        break;
      case 'davinci':
        res.status(200).json({ data: response.data.choices[0].text });
        break;
      default:
        res.status(400).json({ error: 'Invalid model' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};