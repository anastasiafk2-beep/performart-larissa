import ContentView from "@/components/analytics/ContentView";
import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import EditorialImage from '@/components/opinions/EditorialImage'
import PortableContent from '@/components/opinions/PortableContent'
import JsonLd from '@/components/seo/JsonLd'
import type {
  DialogueDetail,
  DialoguePersona,
  OpinionArticleDetail,
} from '@/lib/opinions-data'
import {getOpinionBySlug} from '@/lib/opinions-data'
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createPageMetadata,
} from '@/lib/seo'

import styles from '../opinions.module.css'

type OpinionDetailPageProps = {
  params: Promise<{slug: string}>
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('el-GR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

function PersonaPortrait({persona}: {persona: DialoguePersona}) {
  if (persona.portrait) {
    return (
      <EditorialImage
        image={persona.portrait}
        className={styles.personaAvatarImage}
        sizes='(max-width: 640px) 88px, 120px'
      />
    )
  }

  return (
    <span className={styles.personaInitial} aria-hidden='true'>
      {persona.name.slice(0, 1)}
    </span>
  )
}

export async function generateMetadata({
  params,
}: OpinionDetailPageProps): Promise<Metadata> {
  const {slug} = await params
  const entry = await getOpinionBySlug(slug)
  const path = `/opinions/${encodeURIComponent(slug)}`

  if (!entry) {
    return createPageMetadata({
      title: 'Η δημοσίευση δεν βρέθηκε',
      description: 'Η δημοσίευση που ζητήσατε δεν είναι διαθέσιμη.',
      path,
      noIndex: true,
    })
  }

  const title = entry.seo?.title || entry.title
  const description = entry.seo?.description || entry.excerpt
  const shareImage = entry.seo?.shareImage || entry.image

  return createPageMetadata({
    title,
    description,
    path,
    image: shareImage?.url,
    imageAlt: shareImage?.alt || entry.title,
    type: 'article',
    publishedTime: entry.publishedAt,
    authors:
      entry._type === 'opinionArticle' && entry.author
        ? [entry.author.name]
        : undefined,
  })
}

function ArticleDetail({entry}: {entry: OpinionArticleDetail}) {
  return (
    <article className={styles.articleDetail}>
      <header className={styles.detailHero}>
        <div className={styles.detailHeroRail}>
          <Link href='/opinions'>← ΑΠΟΨΕΙΣ</Link>
          <span>ΑΡΘΡΟΓΡΑΦΙΑ / {entry.topic}</span>
        </div>
        <h1>{entry.title}</h1>
        <p>{entry.excerpt}</p>
        <div className={styles.detailDateLine}>
          <span>ΑΠΟΨΗ</span>
          <time dateTime={entry.publishedAt}>{formatDate(entry.publishedAt)}</time>
        </div>
      </header>

      {entry.image && (
        <figure className={styles.detailHeroImage}>
          <EditorialImage
            image={entry.image}
            className={styles.coverImage}
            priority
            sizes='100vw'
          />
          {entry.image.caption && <figcaption>{entry.image.caption}</figcaption>}
        </figure>
      )}

      <div className={styles.articleDetailGrid}>
        {entry.author && (
          <aside className={styles.authorProfile}>
            <span className={styles.authorProfileLabel}>Η ΦΩΝΗ</span>
            <div className={styles.authorProfilePhoto}>
              {entry.author.photo ? (
                <EditorialImage
                  image={entry.author.photo}
                  className={styles.personaAvatarImage}
                  sizes='120px'
                />
              ) : (
                <span className={styles.personaInitial} aria-hidden='true'>
                  {entry.author.name.slice(0, 1)}
                </span>
              )}
            </div>
            <h2>{entry.author.name}</h2>
            <p className={styles.authorRole}>{entry.author.role}</p>
            <p className={styles.authorBio}>{entry.author.bio}</p>
            {(entry.author.website || entry.author.socialUrl) && (
              <div className={styles.authorLinks}>
                {entry.author.website && (
                  <a href={entry.author.website} target='_blank' rel='noreferrer'>
                    ΙΣΤΟΣΕΛΙΔΑ ↗
                  </a>
                )}
                {entry.author.socialUrl && (
                  <a href={entry.author.socialUrl} target='_blank' rel='noreferrer'>
                    ΠΡΟΦΙΛ ↗
                  </a>
                )}
              </div>
            )}
          </aside>
        )}

        <div className={styles.articleBody}>
          <PortableContent value={entry.body} />
        </div>
      </div>
    </article>
  )
}

function DialogueDetailPage({entry}: {entry: DialogueDetail}) {
  if (!entry.firstPersona || !entry.secondPersona) notFound()

  return (
    <article className={styles.dialogueDetail}>
      <header className={styles.dialogueDetailHero}>
        <div className={styles.detailHeroRailDark}>
          <Link href='/opinions'>← ΑΠΟΨΕΙΣ</Link>
          <span>ΔΙΑΛΟΓΟΣ / {entry.topic}</span>
        </div>

        <div className={styles.dialogueDetailPeople}>
          {[entry.firstPersona, entry.secondPersona].map((persona, index) => (
            <div className={styles.dialogueDetailPerson} key={persona._id}>
              <div className={styles.dialogueDetailPortrait}>
                <PersonaPortrait persona={persona} />
              </div>
              <div>
                <strong>{persona.name}</strong>
                <span>{persona.tagline}</span>
              </div>
              {index === 0 && <b aria-hidden='true'>↔</b>}
            </div>
          ))}
        </div>

        <h1>{entry.title}</h1>
        <p>{entry.excerpt}</p>
        <div className={styles.detailDateLineDark}>
          <span>{String(entry.turnCount).padStart(2, '0')} ΑΤΑΚΕΣ</span>
          <time dateTime={entry.publishedAt}>{formatDate(entry.publishedAt)}</time>
        </div>
      </header>

      {entry.image && (
        <figure className={styles.dialogueCover}>
          <EditorialImage
            image={entry.image}
            className={styles.coverImage}
            priority
            sizes='100vw'
          />
          {entry.image.caption && <figcaption>{entry.image.caption}</figcaption>}
        </figure>
      )}

      <div className={styles.dialogueBody}>
        {entry.introduction && (
          <div className={styles.dialogueIntroduction}>
            <span>ΠΡΙΝ ΑΡΧΙΣΟΥΝ</span>
            <PortableContent value={entry.introduction} compact />
          </div>
        )}

        <div className={styles.transcript}>
          {entry.turns.map((turn, index) => {
            const isSecond = turn.speaker === 'second'
            const persona = isSecond ? entry.secondPersona : entry.firstPersona

            return (
              <section
                className={`${styles.transcriptTurn} ${
                  isSecond ? styles.transcriptTurnSecond : styles.transcriptTurnFirst
                }`}
                key={turn._key}
              >
                <div className={styles.turnIndex}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className={styles.turnSpeaker}>
                  <div className={styles.turnPortrait}>
                    <PersonaPortrait persona={persona} />
                  </div>
                  <div>
                    <strong>{persona.name}</strong>
                    <span>{persona.tagline}</span>
                  </div>
                </div>
                <div className={styles.turnContent}>
                  {turn.aside && <em>({turn.aside})</em>}
                  <PortableContent value={turn.content} compact />
                </div>
              </section>
            )
          })}
        </div>

        <aside className={styles.personaNotes}>
          <h2>ΟΙ ΔΥΟ ΦΩΝΕΣ</h2>
          <div>
            {[entry.firstPersona, entry.secondPersona].map((persona) => (
              <section key={persona._id}>
                <strong>{persona.name}</strong>
                <span>{persona.tagline}</span>
                <p>{persona.bio}</p>
              </section>
            ))}
          </div>
        </aside>
      </div>
    </article>
  )
}

export default async function OpinionDetailPage({params}: OpinionDetailPageProps) {
  const {slug} = await params
  const entry = await getOpinionBySlug(slug)

  if (!entry) notFound()

  const path = `/opinions/${encodeURIComponent(entry.slug)}`

  return (
    <main className={styles.detailPage}>
      <ContentView event="article_view" contentId={entry._id} params={{ content_title: entry.title, content_type: entry._type }} />
      <JsonLd
        data={[
          createArticleJsonLd({
            headline: entry.title,
            description: entry.seo?.description || entry.excerpt,
            path,
            image: entry.seo?.shareImage?.url || entry.image?.url,
            datePublished: entry.publishedAt,
            authorName:
              entry._type === 'opinionArticle' ? entry.author?.name : undefined,
            section: entry._type === 'dialogue' ? 'Διάλογοι' : 'Απόψεις',
          }),
          createBreadcrumbJsonLd([
            {name: 'Αρχική', path: '/'},
            {name: 'Απόψεις', path: '/opinions'},
            {name: entry.title, path},
          ]),
        ]}
      />
      {entry._type === 'dialogue' ? (
        <DialogueDetailPage entry={entry} />
      ) : (
        <ArticleDetail entry={entry} />
      )}

      <Link href='/opinions' className={styles.detailBackFooter}>
        <span>←</span>
        <span>ΕΠΙΣΤΡΟΦΗ ΣΕ ΟΛΕΣ ΤΙΣ ΑΠΟΨΕΙΣ</span>
      </Link>
    </main>
  )
}
