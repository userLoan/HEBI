import { describe, expect, it } from 'vitest'
import { buildSystemPrompt } from './chatContext'

describe('buildSystemPrompt', () => {
  it('includes all five cities by name', () => {
    const prompt = buildSystemPrompt()
    expect(prompt).toContain('Hanoi')
    expect(prompt).toContain('Ho Chi Minh City')
    expect(prompt).toContain('Da Nang')
    expect(prompt).toContain('Hai Phong')
    expect(prompt).toContain('Can Tho')
  })

  it("includes each city's HEBI score and risk level", () => {
    const prompt = buildSystemPrompt()
    expect(prompt).toMatch(/HEBI score: \d+\.\d\/100/)
    expect(prompt).toContain('risk level:')
  })

  it('includes recommendation sources for every city', () => {
    const prompt = buildSystemPrompt()
    expect(prompt).toContain('World Bank, Clean Air for Hanoi')
    expect(prompt).toContain('Gelb and Apparicio')
    expect(prompt).toContain('International Rice Research Institute')
    expect(prompt).toContain('Nguyen Phan Anh')
    expect(prompt).toContain('Tuoi Tre News')
  })

  it("instructs the model to reply in the user's language", () => {
    const prompt = buildSystemPrompt()
    expect(prompt.toLowerCase()).toContain('same language')
  })

  it('includes the HEBI methodology formula', () => {
    const prompt = buildSystemPrompt()
    expect(prompt).toContain('PM2.5')
    expect(prompt).toContain('30%')
  })
})
