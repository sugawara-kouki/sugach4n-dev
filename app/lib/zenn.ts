import { XMLParser } from 'fast-xml-parser'

export interface ZennArticle {
  title: string
  link: string
  pubDate: string
  formattedDate: string
}

export async function fetchZennArticles(username: string): Promise<ZennArticle[]> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 seconds timeout

  try {
    const response = await fetch(`https://zenn.dev/${username}/feed`, {
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.statusText}`)
    }
    
    const xml = await response.text()
    const parser = new XMLParser()
    const jsonObj = parser.parse(xml)
    
    const items = jsonObj.rss?.channel?.item
    if (!items) return []

    const articlesArray = Array.isArray(items) ? items : [items]

    return articlesArray.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      formattedDate: formatDate(item.pubDate)
    }))
  } catch (error: any) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      console.error('Fetch Zenn articles timed out')
    } else {
      console.error('Error fetching Zenn articles:', error)
    }
    return []
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}.${m}.${d}`
}
