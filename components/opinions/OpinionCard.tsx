import Link from 'next/link'

import EditorialImage from '@/components/opinions/EditorialImage'
import type {
  DialogueFeedItem,
  DialoguePersona,
  OpinionArticleFeedItem,
} from '@/lib/opinions-data'

import styles from '@/app/opinions/opinions.module.css'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('el-GR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

function PersonaAvatar({persona}: {persona: DialoguePersona}) {
  if (persona.portrait) {
    return (
      <EditorialImage
        image={persona.portrait}
        className={styles.personaAvatarImage}
        sizes='64px'
      />
    )
  }

  return (
    <span className={styles.personaInitial} aria-hidden='true'>
      {persona.name.slice(0, 1)}
    </span>
  )
}

export function DialogueCard({item}: {item: DialogueFeedItem}) {
  return (
    <article className={styles.dialogueCard}>
      <Link href={`/opinions/${item.slug}`} className={styles.cardLink}>
        <div className={styles.dialogueCardTopline}>
          <span>ΔΙΑΛΟΓΟΣ</span>
          <span>{String(item.turnCount).padStart(2, '0')} ΑΤΑΚΕΣ</span>
        </div>

        <div className={styles.dialogueFaces} aria-label='Συνομιλητές'>
          {item.personas.map((persona, index) => (
            <div className={styles.dialogueFace} key={persona._id || persona.name}>
              <div className={styles.personaAvatar}>
                <PersonaAvatar persona={persona} />
              </div>
              <span>{persona.name}</span>
              {index === 0 && <b aria-hidden='true'>↔</b>}
            </div>
          ))}
        </div>

        <div className={styles.cardTopic}>{item.topic}</div>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>

        <div className={styles.dialogueCardFooter}>
          <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
          <span>ΜΠΕΙΤΕ ΣΤΟΝ ΔΙΑΛΟΓΟ ↗</span>
        </div>
      </Link>
    </article>
  )
}

export function ArticleCard({item}: {item: OpinionArticleFeedItem}) {
  return (
    <article className={styles.articleCard}>
      <Link href={`/opinions/${item.slug}`} className={styles.cardLink}>
        {item.image && (
          <div className={styles.articleCardImage}>
            <EditorialImage
              image={item.image}
              className={styles.coverImage}
              sizes='(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 420px'
            />
          </div>
        )}

        <div className={styles.articleCardBody}>
          <div className={styles.articleCardMeta}>
            <span>ΑΠΟΨΗ · {item.topic}</span>
            <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
          </div>
          <h3>{item.title}</h3>
          <p>{item.excerpt}</p>

          {item.author && (
            <div className={styles.articleAuthor}>
              <div className={styles.articleAuthorPhoto}>
                {item.author.photo ? (
                  <EditorialImage
                    image={item.author.photo}
                    className={styles.personaAvatarImage}
                    sizes='52px'
                  />
                ) : (
                  <span className={styles.personaInitial} aria-hidden='true'>
                    {item.author.name.slice(0, 1)}
                  </span>
                )}
              </div>
              <div>
                <strong>{item.author.name}</strong>
                <span>{item.author.role}</span>
              </div>
            </div>
          )}

          <span className={styles.articleReadMore}>ΔΙΑΒΑΣΤΕ ΤΗΝ ΑΠΟΨΗ →</span>
        </div>
      </Link>
    </article>
  )
}
