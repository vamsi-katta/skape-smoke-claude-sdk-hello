// Claude SDK Hello World — SAR-001 v2 smoke fixture.
// The SAR claude-sdk adapter imports this module's default export and calls
// it as `agent(input, client)` where `client` is a proxy-wrapped Anthropic
// instance (apiKey + baseURL are managed by the in-sandbox LLM proxy).

export default async function agent(input, client) {
  const userInput = typeof input === 'string' ? input : (input?.message ?? 'Hello');

  const response = await client.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 256,
    messages: [{ role: 'user', content: userInput }],
  });

  const text = response.content.find((b) => b.type === 'text')?.text ?? '';
  return { message: text };
}
