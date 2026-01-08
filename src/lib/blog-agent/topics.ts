import fs from 'fs/promises'
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

const TOPICS_FILE = path.join(process.cwd(), 'data', 'blog-topics.json')

async function ensureDataDir() {
  const dir = path.dirname(TOPICS_FILE)
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

async function readTopics(): Promise<TopicsData> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(TOPICS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return { topics: [], lastUpdated: new Date().toISOString() }
  }
}

async function writeTopics(data: TopicsData): Promise<void> {
  await ensureDataDir()
  data.lastUpdated = new Date().toISOString()
  await fs.writeFile(TOPICS_FILE, JSON.stringify(data, null, 2))
}

export async function getPredefinedTopics(): Promise<PredefinedTopic[]> {
  const data = await readTopics()
  return data.topics
}

export async function getUnusedTopics(): Promise<PredefinedTopic[]> {
  const data = await readTopics()
  return data.topics.filter(t => !t.used)
}

export async function getTopicsByCategory(category: Category): Promise<PredefinedTopic[]> {
  const data = await readTopics()
  return data.topics.filter(t => t.category === category && !t.used)
}

export async function getTopicById(id: string): Promise<PredefinedTopic | null> {
  const data = await readTopics()
  return data.topics.find(t => t.id === id) || null
}

export async function markTopicUsed(id: string): Promise<void> {
  const data = await readTopics()
  const topic = data.topics.find(t => t.id === id)
  if (topic) {
    topic.used = true
    topic.usedAt = new Date().toISOString()
    await writeTopics(data)
  }
}

export async function resetTopicUsage(id: string): Promise<void> {
  const data = await readTopics()
  const topic = data.topics.find(t => t.id === id)
  if (topic) {
    topic.used = false
    topic.usedAt = null
    await writeTopics(data)
  }
}

export async function addPredefinedTopic(topic: Omit<PredefinedTopic, 'id' | 'used' | 'usedAt'>): Promise<PredefinedTopic> {
  const data = await readTopics()

  const newTopic: PredefinedTopic = {
    ...topic,
    id: generateTopicId(topic.title),
    used: false,
    usedAt: null,
  }

  data.topics.push(newTopic)
  await writeTopics(data)
  return newTopic
}

export async function removePredefinedTopic(id: string): Promise<boolean> {
  const data = await readTopics()
  const initialLength = data.topics.length
  data.topics = data.topics.filter(t => t.id !== id)

  if (data.topics.length < initialLength) {
    await writeTopics(data)
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
