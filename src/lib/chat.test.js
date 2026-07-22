import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { sendChatMessage } from './chat'

describe('sendChatMessage', () => {
  const baseArgs = {
    messages: [{ role: 'user', content: 'Hello' }],
    systemPrompt: 'You are a helpful assistant.',
    apiKey: 'test-key',
    model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
  }

  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('throws a missing-key ChatError when apiKey is empty', async () => {
    await expect(sendChatMessage({ ...baseArgs, apiKey: '' })).rejects.toMatchObject({
      kind: 'missing-key',
    })
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('sends the system prompt and message history to OpenRouter', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ choices: [{ message: { content: 'Hi there!' } }] }),
    })

    const reply = await sendChatMessage(baseArgs)

    expect(reply).toBe('Hi there!')
    expect(global.fetch).toHaveBeenCalledTimes(1)
    const [url, options] = global.fetch.mock.calls[0]
    expect(url).toBe('https://openrouter.ai/api/v1/chat/completions')
    expect(options.headers.Authorization).toBe('Bearer test-key')
    const body = JSON.parse(options.body)
    expect(body.model).toBe('nvidia/nemotron-3-ultra-550b-a55b:free')
    expect(body.messages[0]).toEqual({ role: 'system', content: 'You are a helpful assistant.' })
    expect(body.messages[1]).toEqual({ role: 'user', content: 'Hello' })
  })

  it('only sends the last 12 messages plus the system prompt', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ choices: [{ message: { content: 'ok' } }] }),
    })
    const longHistory = Array.from({ length: 20 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: `message ${i}`,
    }))

    await sendChatMessage({ ...baseArgs, messages: longHistory })

    const body = JSON.parse(global.fetch.mock.calls[0][1].body)
    expect(body.messages).toHaveLength(13)
    expect(body.messages[1].content).toBe('message 8')
  })

  it('throws an unauthorized ChatError on 401', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 401 })
    await expect(sendChatMessage(baseArgs)).rejects.toMatchObject({ kind: 'unauthorized' })
  })

  it('throws a rate-limited ChatError on 429', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 429 })
    await expect(sendChatMessage(baseArgs)).rejects.toMatchObject({ kind: 'rate-limited' })
  })

  it('throws an unknown ChatError on other error statuses', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500 })
    await expect(sendChatMessage(baseArgs)).rejects.toMatchObject({ kind: 'unknown' })
  })

  it('throws a network ChatError when fetch rejects', async () => {
    global.fetch.mockRejectedValue(new Error('boom'))
    await expect(sendChatMessage(baseArgs)).rejects.toMatchObject({ kind: 'network' })
  })
})
