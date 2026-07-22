import { useEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '../lib/i18n'
import { buildSystemPrompt } from '../lib/chatContext'
import { sendChatMessage, ChatError } from '../lib/chat'
import { ChatBubbleIcon, CloseIcon } from './icons'

const STORAGE_KEY = 'hebi-chat-history'

function loadHistory() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function errorMessageKey(kind) {
  switch (kind) {
    case 'missing-key':
      return 'chatErrorMissingKey'
    case 'unauthorized':
      return 'chatErrorUnauthorized'
    case 'rate-limited':
      return 'chatErrorRateLimited'
    case 'network':
      return 'chatErrorNetwork'
    default:
      return 'chatErrorUnknown'
  }
}

export default function ChatWidget() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(loadHistory)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const systemPrompt = useMemo(() => buildSystemPrompt(), [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isLoading])

  const handleSend = async () => {
    const content = input.trim()
    if (!content || isLoading) return

    const nextMessages = [...messages, { role: 'user', content }]
    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    try {
      const apiMessages = nextMessages.filter((message) => message.role !== 'error')
      const reply = await sendChatMessage({
        messages: apiMessages,
        systemPrompt,
        apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
        model: import.meta.env.VITE_OPENROUTER_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b:free',
      })
      setMessages((current) => [...current, { role: 'assistant', content: reply }])
    } catch (error) {
      const kind = error instanceof ChatError ? error.kind : 'unknown'
      setMessages((current) => [...current, { role: 'error', content: t[errorMessageKey(kind)] }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setMessages([])
    window.localStorage.removeItem(STORAGE_KEY)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <button
        type="button"
        className="chat-fab"
        aria-label={isOpen ? t.chatClose : t.chatOpenLabel}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <CloseIcon /> : <ChatBubbleIcon />}
      </button>

      {isOpen && (
        <section className="chat-panel">
          <header className="chat-panel-header">
            <h3>{t.chatTitle}</h3>
            <button type="button" className="chat-clear-btn" onClick={handleClear}>
              {t.chatClear}
            </button>
          </header>

          <div className="chat-messages">
            {messages.length === 0 && <p className="chat-empty-state">{t.chatEmptyState}</p>}
            {messages.map((message, index) => (
              <div key={index} className={`chat-message chat-message-${message.role}`}>
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message chat-message-assistant chat-message-loading">
                <span className="chat-typing-dot" />
                <span className="chat-typing-dot" />
                <span className="chat-typing-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-row">
            <textarea
              className="chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.chatPlaceholder}
              disabled={isLoading}
              rows={1}
            />
            <button
              type="button"
              className="chat-send-btn"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              {t.chatSend}
            </button>
          </div>
        </section>
      )}
    </>
  )
}
