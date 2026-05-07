import { createRoute } from 'honox/factory'
import BgEffects from '../islands/BgEffects'
import Reveal from '../islands/Reveal'
import SmoothScroll from '../islands/SmoothScroll'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Section } from '../components/Section'
import { ListItem } from '../components/ListItem'
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
                RubyKaigi2026に参加して、技術を純粋に楽しむ人たちの熱量に触れました。<br />
                仕事の仕様書通りに作るのとは違う、ワクワクした感覚を忘れないうちに形にしておこうと思い、思い切ってこのサイトを作ってみました。<br />
                といっても中身がスカスカすぎるので、頑張ってこれからもっと色々追加していけたらと思ってます。
              </p>
            </Section>
          </Reveal>

          <Reveal delay={0.4}>
            <Section id="about-me" title="About me">
              <p class="mb-[1.8em]">
                北海道在住、エンジニア歴は5年目です。Web制作の現場からキャリアをスタートし、SESや受託開発など様々な環境でコードを書いてきました。<br />
                現在は、より大規模で社会に広く関わるようなシステム構築を行う企業にて、開発エンジニアとして活動しています。
              </p>
              <p class="mb-[1.8em]">すがさんとかすがちゃんと呼んでもらえたら嬉しいです</p>
              <p class="mb-[1.8em]">
                開発で意識しているのは、後から見た人が困りにくいような形でコードを書けるように意識しています。<br />
                また、お互いの知見を補完し合えるフラットな空気が好きで、僕自身もその中の一人として頑張りたいです。
              </p>

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
            <Section id="works" title="Works">
              <div class="list-container">
                <ListItem
                  title="sugach4n-dev (This Portfolio Site)"
                  meta="2026.05"
                  href="https://github.com/sugawara-kouki/sugach4n-dev"
                />
              </div>
            </Section>
          </Reveal>

          <Reveal delay={0.8}>
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

        <Reveal delay={1.0}>
          <Footer />
        </Reveal>
      </div>
    </>,
    { title: 'sugach4n' }
  )
})
