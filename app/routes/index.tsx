import { createRoute } from 'honox/factory'
import BgEffects from '../islands/BgEffects'
import Reveal from '../islands/Reveal'
import SmoothScroll from '../islands/SmoothScroll'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Section } from '../components/Section'
import { ListItem } from '../components/ListItem'
import { TimelineItem } from '../components/TimelineItem'
import { fetchZennArticles } from '../lib/zenn'
import { GitHubIcon, XIcon } from '../components/Icons'

export default createRoute(async (c) => {
  const articles = await fetchZennArticles('sugachan')

  return c.render(
    <>
      <BgEffects />
      <SmoothScroll />
      <Header />
      <div class="max-w-[800px] mx-auto px-10 pt-[160px] pb-0">
        <main>
          <Reveal delay={0.2}>
            <Section id="about-site" title="About this site">
              <p class="mb-[1.8em]">完全に熱に当てられて作りました</p>
              <p>
                RubyKaigi 2026に参加して、技術を純粋に楽しむ人たちの熱量に触れました。<br />
                仕事の仕様書通りに作るのとは違う、ワクワクした感覚を忘れないうちに形にしておこうと思い、HonoXとCloudflare Workersでこのサイトを構築しました。<br />
                培ってきた5年間の足跡と、これから先の探求を記録していく場所です。<br />
                ※Rubyで作らんのかい！というツッコミは甘んじて受け入れます。
              </p>
            </Section>
          </Reveal>

          <Reveal delay={0.4}>
            <Section id="about-me" title="About me">
              <p class="mb-[1.8em]">
                北海道在住、エンジニア歴は5年目。Web制作からキャリアをスタートし、現在は外資系IT企業にてシステム開発に従事しています。
              </p>
              <p class="mb-[1.8em]">
                フロントエンドを強みとしつつ、バックエンドもある程度は書くことができます。<br />
                大切にしているのは、<strong>「後から見た人が困りにくいコード」</strong>を書くこと。可読性と保守性を両立させ、チーム全体が幸せになれる設計ができるように心がけています。
              </p>
              <p class="mb-[1.8em]">すがさんとかすがちゃんと呼んでもらえたら嬉しいです</p>
              <p class="mb-[1.8em]">お互いの知見を補完し合えるフラットな空気が好きで、常に新しいワクワクを探しています。</p>

              <div class="flex gap-10 mt-12">
                <a
                  href="https://github.com/sugawara-kouki"
                  target="_blank"
                  rel="noopener"
                  class="flex items-center gap-2 text-[0.8rem] font-medium font-mono border-b border-ink pb-1 transition-colors duration-300 hover:text-accent hover:border-accent group"
                >
                  <GitHubIcon size={18} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://x.com/sugas4n"
                  target="_blank"
                  rel="noopener"
                  class="flex items-center gap-2 text-[0.8rem] font-medium font-mono border-b border-ink pb-1 transition-colors duration-300 hover:text-accent hover:border-accent group"
                >
                  <XIcon size={16} />
                  <span>X</span>
                </a>
              </div>
            </Section>
          </Reveal>

          <Reveal delay={0.6}>
            <Section id="experience" title="Experience">
              <div class="mt-4">
                <TimelineItem
                  title="外資系IT企業"
                  meta="2026.05 - Present"
                  description="現在は入社時研修に従事。エンタープライズ領域における設計思想や品質管理、開発プロセスを学んでいます。これまでの経験を活かし、影響力の大きいプロジェクトへの参画に向けて準備を進めています。"
                  isLatest={true}
                />
                <TimelineItem
                  title="ソフトウェア受託開発企業"
                  meta="2024.06 - 2026.04"
                  description="フルスタックエンジニアとしてプロダクト開発を牽引。TypeScript / Next.js をメインに、複雑なビジネスロジックを持つWebシステムの設計から実装、デプロイまでを一気通貫で担当しました。また、3人ほどのメンバーのリーダーとして、マネジメントも経験しました。"
                />
                <TimelineItem
                  title="Web制作・SES企業"
                  meta="2022.04 - 2024.05"
                  description="Web制作のコーディングから、C#.NETやPythonを用いたシステム開発まで、多様な現場を経験。現場ごとに異なる課題に柔軟に対応する基礎力と、エンジニアとしての適応力を構築しました。"
                />
              </div>
            </Section>
          </Reveal>

          <Reveal delay={0.8}>
            <Section id="skills" title="Skills">
              <div class="flex flex-wrap gap-3 mt-6">
                {/* Expertise - Main Weapons */}
                {[
                  'TypeScript',
                  'Next.js',
                  'React',
                  'Tailwind CSS',
                  'AWS',
                  'Docker',
                ].map((skill) => (
                  <span class="px-4 py-2 bg-accent text-white text-[0.75rem] font-bold rounded-full shadow-[0_4px_12px_rgba(255,69,0,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_16px_rgba(255,69,0,0.3)] cursor-default">
                    {skill}
                  </span>
                ))}

                {/* Familiar - Practical Experience */}
                {[
                  'Python',
                  'Node.js',
                  'Hono',
                  'C#',
                  'Cloudflare',
                ].map((skill) => (
                  <span class="px-4 py-2 bg-white/50 backdrop-blur-sm border border-black/5 text-[0.75rem] font-medium rounded-full shadow-sm transition-all duration-300 hover:border-accent/40 hover:translate-y-[-2px] hover:bg-white hover:text-ink">
                    {skill}
                  </span>
                ))}

                {/* Learning - Current Challenge */}
                <span class="px-4 py-2 border-2 border-dashed border-accent/40 text-accent text-[0.75rem] font-bold rounded-full transition-all duration-300 hover:bg-accent/5 hover:border-accent">
                  Ruby <span class="text-[0.65rem] font-medium opacity-70 ml-1">(Learning)</span>
                </span>
              </div>
            </Section>
          </Reveal>

          <Reveal delay={1.0}>
            <Section id="works" title="Works">
              <div class="list-container">
                <ListItem
                  title="sugach4n-dev (This Portfolio Site)"
                  meta="2026.05"
                  description="HonoX / Cloudflare Workers。最新技術への挑戦と、技術を純粋に楽しむ実験場。"
                  href="https://github.com/sugawara-kouki/sugach4n-dev"
                />
                <ListItem
                  title="複合型アクティビティ予約システム"
                  meta="Full-stack / Management"
                  description="TypeScript / Next.js。複数のアクティビティを統合管理する予約システム。環境ごとに異なる日時の不整合を防ぐための設計工夫や、リーダーとして要件定義からスケジュール管理までを幅広く担当。"
                />
                <ListItem
                  title="EVデータ解析・診断システム"
                  meta="Architecture / Backend"
                  description="TypeScript / Next.js / Python / AWS。認証機能をAPIとして独立させることで、他システムからのセキュアなデータ連携を実現。AWSマネージドサービスを活用し、汎用性と拡張性を備えた設計を構築。"
                />
              </div>
            </Section>
          </Reveal>

          <Reveal delay={1.2}>
            <Section id="blog" title="Blog / Zenn">
              <div class="list-container">
                {articles.length > 0 ? (
                  articles.slice(0, 5).map((article, i) => (
                    <ListItem
                      key={i}
                      title={article.title}
                      meta={article.formattedDate}
                      href={article.link}
                    />
                  ))
                ) : (
                  <p class="text-ink-sub text-sm">記事を読み込み中、または取得できませんでした。</p>
                )}
              </div>
            </Section>
          </Reveal>
        </main>

        <Reveal delay={1.4}>
          <Footer />
        </Reveal>
      </div>
    </>,
    { title: 'sugach4n' }
  )
})