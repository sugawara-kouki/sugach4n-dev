import { XMLParser } from 'fast-xml-parser'

/**
 * ZennのRSSフィードから取得する記事の型定義
 */
export interface ZennArticle {
  title: string
  link: string
  pubDate: string
  formattedDate: string
}

/**
 * 簡易的なインメモリキャッシュ
 * サーバーのプロセスが生きている間、取得した記事データを保持します。
 */
let cachedArticles: ZennArticle[] | null = null
let lastFetchTime = 0
const CACHE_TTL = 60 * 60 * 1000 // キャッシュの有効期限: 1時間

/**
 * 指定したユーザーのZenn記事一覧を取得します。
 * 外部APIへの負荷軽減とレスポンス向上のため、キャッシュを利用します。
 */
export async function fetchZennArticles(username: string): Promise<ZennArticle[]> {
  const now = Date.now()

  // キャッシュが有効期限内の場合は、保存されているデータを即座に返す
  if (cachedArticles && (now - lastFetchTime < CACHE_TTL)) {
    return cachedArticles
  }

  // APIリクエストのタイムアウト設定（5秒で中断）
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

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
    if (!items) {
      // 記事が見つからない、またはパース失敗時は既存のキャッシュがあればそれを返す
      return cachedArticles || []
    }

    // ZennのRSSは記事が1件のみの場合オブジェクトになるため、配列に正規化
    const articlesArray = Array.isArray(items) ? items : [items]

    const articles = articlesArray.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      formattedDate: formatDate(item.pubDate)
    }))

    // キャッシュを更新
    cachedArticles = articles
    lastFetchTime = now

    return articles
  } catch (error: any) {
    clearTimeout(timeoutId)
    console.error('Error fetching Zenn articles:', error)
    
    // エラー発生時は、古いキャッシュが残っていればそれを返す（サービス継続のため）
    if (error.name === 'AbortError') {
      console.error('Zenn API request timed out.')
    }
    return cachedArticles || []
  }
}

/**
 * RSSの日付文字列（RFC 822等）を YYYY.MM.DD 形式に変換します。
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}.${m}.${d}`
}
