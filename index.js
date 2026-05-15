import Anthropic from '@anthropic-ai/sdk';

  export default async function agent(input, client) {
    const userInput = typeof input === 'string' ? input : (input?.message ?? 'Hello');

    const response = await client.messages.create({
      // Prefer the platform-injected default model so the developer's
      // selection at /dashboard/settings/credentials or the product-level
      // runtime override drives which model this agent uses. Hard-coded
      // fallback keeps old templates working when the env var isn't set.
      model: process.env.SKAPE_DEFAULT_MODEL_ANTHROPIC ?? 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [{ role: 'user', content: userInput }],
    });

    const text = response.content.find((b) => b.type === 'text')?.text ?? '';
    return { message: text };
  }