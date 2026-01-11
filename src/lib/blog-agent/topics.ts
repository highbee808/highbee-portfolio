import fs from 'fs'
import path from 'path'
import { Category } from './prompts'

export interface PredefinedTopic {
  id: string
  title: string
  category: Category
  suggestedTone: 'professional' | 'conversational' | 'educational' | 'technical'
  keywords: string[]
  used: boolean
  usedAt: string | null
}

interface TopicsData {
  topics: PredefinedTopic[]
  lastUpdated: string
}

const TOPICS_FILE = path.join(process.cwd(), 'data', 'topics.json')

// Default topics to seed the file if it doesn't exist
const DEFAULT_TOPICS: PredefinedTopic[] = [
  {
    id: 'ai-code-review',
    title: 'How AI is Revolutionizing Code Review',
    category: 'ai',
    suggestedTone: 'professional',
    keywords: ['AI', 'code review', 'automation', 'developer tools'],
    used: false,
    usedAt: null,
  },
  {
    id: 'typescript-generics',
    title: 'Mastering TypeScript Generics: From Basics to Advanced Patterns',
    category: 'typescript',
    suggestedTone: 'educational',
    keywords: ['TypeScript', 'generics', 'type safety', 'programming'],
    used: false,
    usedAt: null,
  },
  {
    id: 'design-system-tokens',
    title: 'Building a Design System with Design Tokens',
    category: 'design',
    suggestedTone: 'technical',
    keywords: ['design systems', 'design tokens', 'UI', 'consistency'],
    used: false,
    usedAt: null,
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering Best Practices for Developers',
    category: 'ai',
    suggestedTone: 'conversational',
    keywords: ['prompt engineering', 'AI', 'LLM', 'ChatGPT'],
    used: false,
    usedAt: null,
  },
  {
    id: 'react-server-components',
    title: 'Understanding React Server Components',
    category: 'typescript',
    suggestedTone: 'educational',
    keywords: ['React', 'server components', 'Next.js', 'performance'],
    used: false,
    usedAt: null,
  },
  {
    id: 'micro-interactions',
    title: 'The Art of Micro-interactions in Web Design',
    category: 'design',
    suggestedTone: 'conversational',
    keywords: ['micro-interactions', 'UX', 'animation', 'web design'],
    used: false,
    usedAt: null,
  },
]

function readTopics(): TopicsData {
  try {
    if (!fs.existsSync(TOPICS_FILE)) {
      // Create the file with default topics
      const initialData: TopicsData = {
        topics: DEFAULT_TOPICS,
        lastUpdated: new Date().toISOString(),
      }
      writeTopics(initialData)
      return initialData
    }
    const data = fs.readFileSync(TOPICS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading topics file:', error)
    return { topics: DEFAULT_TOPICS, lastUpdated: new Date().toISOString() }
  }
}

function writeTopics(data: TopicsData): void {
  try {
    const dir = path.dirname(TOPICS_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    data.lastUpdated = new Date().toISOString()
    fs.writeFileSync(TOPICS_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing topics file:', error)
  }
}

export async function getPredefinedTopics(): Promise<PredefinedTopic[]> {
  const data = readTopics()
  return data.topics
}

export async function getUnusedTopics(): Promise<PredefinedTopic[]> {
  const data = readTopics()
  return data.topics.filter(t => !t.used)
}

export async function getTopicsByCategory(category: Category): Promise<PredefinedTopic[]> {
  const data = readTopics()
  return data.topics.filter(t => t.category === category && !t.used)
}

export async function getTopicById(id: string): Promise<PredefinedTopic | null> {
  const data = readTopics()
  return data.topics.find(t => t.id === id) || null
}

export async function markTopicUsed(id: string): Promise<void> {
  const data = readTopics()
  const topic = data.topics.find(t => t.id === id)
  if (topic) {
    topic.used = true
    topic.usedAt = new Date().toISOString()
    writeTopics(data)
  }
}

export async function resetTopicUsage(id: string): Promise<void> {
  const data = readTopics()
  const topic = data.topics.find(t => t.id === id)
  if (topic) {
    topic.used = false
    topic.usedAt = null
    writeTopics(data)
  }
}

export async function resetAllTopics(): Promise<void> {
  const data = readTopics()
  data.topics.forEach(topic => {
    topic.used = false
    topic.usedAt = null
  })
  writeTopics(data)
}

export async function addPredefinedTopic(topic: Omit<PredefinedTopic, 'id' | 'used' | 'usedAt'>): Promise<PredefinedTopic> {
  const data = readTopics()

  const newTopic: PredefinedTopic = {
    ...topic,
    id: generateTopicId(topic.title),
    used: false,
    usedAt: null,
  }

  data.topics.push(newTopic)
  writeTopics(data)
  return newTopic
}

export async function removePredefinedTopic(id: string): Promise<boolean> {
  const data = readTopics()
  const initialLength = data.topics.length
  data.topics = data.topics.filter(t => t.id !== id)

  if (data.topics.length < initialLength) {
    writeTopics(data)
    return true
  }
  return false
}

function generateTopicId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50)
}

export async function getRandomUnusedTopic(category?: Category): Promise<PredefinedTopic | null> {
  const topics = category
    ? await getTopicsByCategory(category)
    : await getUnusedTopics()

  if (topics.length === 0) return null

  const randomIndex = Math.floor(Math.random() * topics.length)
  return topics[randomIndex]
}
