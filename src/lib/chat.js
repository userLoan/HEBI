const API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const TIMEOUT_MS = 30000
const HISTORY_LIMIT = 12

export class ChatError extends Error {
  constructor(kind, message) {
    super(message)
    this.name = 'ChatError'
    this.kind = kind
  }
}

export async function sendChatMessage({ messages, systemPrompt, apiKey, model }) {
  if (!apiKey) {
    throw new ChatError('missing-key', 'Missing OpenRouter API key')
  }

  const payload = {
    model,
    messages: [{ role: 'system', content: systemPrompt }, ...messages.slice(-HISTORY_LIMIT)],
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  let response
  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
  } catch {
    throw new ChatError('network', 'Network error or request timed out')
  } finally {
    clearTimeout(timeoutId)
  }

  if (!response.ok) {
    if (response.status === 401) throw new ChatError('unauthorized', 'Invalid API key')
    if (response.status === 429) throw new ChatError('rate-limited', 'Rate limited')
    throw new ChatError('unknown', `Request failed with status ${response.status}`)
  }

  const data = await response.json()
  const reply = data?.choices?.[0]?.message?.content
  if (!reply) {
    throw new ChatError('unknown', 'Empty response from model')
  }
  return reply
}
