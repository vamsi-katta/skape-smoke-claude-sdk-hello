import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  baseURL: process.env.ANTHROPIC_BASE_URL,
});

const userInput = process.env.SKAPE_USER_INPUT ?? 'Hello';

const response = await client.messages.create({
  model: 'claude-3-haiku-20240307',
  max_tokens: 256,
  messages: [{ role: 'user', content: userInput }],
});

const text = response.content.find((b) => b.type === 'text')?.text ?? '';
console.log(JSON.stringify({ message: text }));
