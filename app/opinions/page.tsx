import {ArticleCard, DialogueCard} from '@/components/opinions/OpinionCard'
import {getOpinionFeed} from '@/lib/opinions-data'

import styles from './opinions.module.css'

export default async function OpinionsPage() {
  const feed = await getOpinionFeed()
  const dialogues = feed.filter((item) => item._type === 'dialogue')
  const articles = feed.filter((item) => item._type === 'opinionArticle')

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby='opinions-title'>
        <div className={styles.heroRail}>
          <span>THE PERFORMART / EDITORIAL</span>
          <span>{String(feed.length).padStart(2, '0')} ΔΗΜΟΣΙΕΥΣΕΙΣ</span>
        </div>

        <div className={styles.heroTitleRow}>
          <h1 id='opinions-title'>ΑΠΟΨΕΙΣ</h1>
          <span className={styles.heroIssue}>Νº 01</span>
        </div>

        <div className={styles.heroBottom}>
          <p>
            Ένας χώρος για διαφορετικές φωνές, ιδέες και οπτικές — εκεί όπου
            η προσωπική θέση συναντά τη δημιουργική αντιπαράθεση.
          </p>
          <nav aria-label='Περιεχόμενα Απόψεων'>
            <a href='#dialogues'>01 / ΔΙΑΛΟΓΟΙ</a>
            <a href='#articles'>02 / ΑΡΘΡΟΓΡΑΦΙΑ</a>
          </nav>
        </div>
      </section>

      <section className={styles.statement} aria-label='Η ταυτότητα της στήλης'>
        <span className={styles.statementMark}>“</span>
        <p>
          Δεν μας ενδιαφέρει η μία σωστή απάντηση. Μας ενδιαφέρει η στιγμή που
          <em> δύο σκέψεις συναντιούνται</em> — ή συγκρούονται.
        </p>
        <span className={styles.statementSide}>ΦΩΝΕΣ / ΙΔΕΕΣ / ΟΠΤΙΚΕΣ</span>
      </section>

      <section className={styles.dialoguesSection} id='dialogues'>
        <div className={styles.sectionHeadingDark}>
          <span className={styles.sectionNumber}>01</span>
          <div>
            <p>ΔΥΟ ΠΕΡΣΟΝΕΣ · ΕΝΑ ΘΕΜΑ</p>
            <h2>ΔΙΑΛΟΓΟΙ</h2>
          </div>
          <p className={styles.sectionIntro}>
            Εικονικές περσόνες με ξεχωριστή ταυτότητα συζητούν, διαφωνούν και
            φωτίζουν την ίδια ιδέα από διαφορετικές πλευρές.
          </p>
        </div>

        {dialogues.length > 0 ? (
          <div className={styles.dialogueGrid}>
            {dialogues.map((dialogue) => (
              <DialogueCard item={dialogue} key={dialogue._id} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyDialogue}>
            <span>Α ↔ Β</span>
            <p>Η πρώτη συνομιλία ετοιμάζεται.</p>
          </div>
        )}
      </section>

      <section className={styles.articlesSection} id='articles'>
        <div className={styles.sectionHeadingLight}>
          <span className={styles.sectionNumber}>02</span>
          <div>
            <p>ΠΡΟΣΩΠΙΚΕΣ ΦΩΝΕΣ · ΥΠΟΓΕΓΡΑΜΜΕΝΕΣ ΘΕΣΕΙΣ</p>
            <h2>ΑΡΘΡΟΓΡΑΦΙΑ</h2>
          </div>
          <p className={styles.sectionIntro}>
            Επιλεγμένα πρόσωπα γράφουν με το όνομα και τη δική τους οπτική για
            όσα συμβαίνουν τώρα — και για όσα αξίζει να συζητηθούν διαχρονικά.
          </p>
        </div>

        {articles.length > 0 ? (
          <div className={styles.articleGrid}>
            {articles.map((article) => (
              <ArticleCard item={article} key={article._id} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyArticles}>
            <span>✦</span>
            <p>Οι πρώτες υπογεγραμμένες απόψεις έρχονται σύντομα.</p>
          </div>
        )}
      </section>

     
    </main>
  )
}
