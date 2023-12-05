import { registerAs } from '@nestjs/config';

export default registerAs('chatGPT', () => ({
  key: process.env.CHATGPT_KEY,
  api: process.env.CHATGPT_API,
  model: process.env.CHATGPT_MODEL,
  temperature: process.env.CHATGPT_TEMPERATURE,
  max_token: process.env.CHATGPT_MAX_TOKEN,
}));
