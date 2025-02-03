import Image from 'next/image'
import styles from './page.module.css'

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>What is Jargonary?</h1>
        <p className={styles.description}>
          Jargonary는 일반적인 단어장과 다릅니다. 단순한 뜻 암기가 아니라, 전문
          분야에서의 실제 활용법까지 학습할 수 있도록 설계되었습니다. 일반적인
          뜻과 특수한 의미, 유의어/반대어, 예문을 함께 정리하고 퀴즈와 체크
          기능을 활용해 자신만의 효과적인 학습 방법을 만들어보세요!
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>How to Use</h2>
        <ul className={styles.description}>
          <li>📌 단어를 추가하고 일반적 의미와 특수 의미를 기록하세요.</li>
          <li>🔍 검색 기능을 활용해 원하는 단어를 빠르게 찾아보세요.</li>
          <li>🎯 퀴즈를 통해 헷갈리는 단어를 집중적으로 학습하세요.</li>
          <li>📁 단어 목록을 PDF 또는 Excel로 다운로드하세요.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>사용 예시</h2>
        <div className={styles.gallery}>
          <Image
            src="/example1.png"
            alt="단어 추가 예시"
            width={300}
            height={200}
          />
          <Image
            src="/example2.png"
            alt="단어 검색 예시"
            width={300}
            height={200}
          />
          <Image src="/example3.png" alt="퀴즈 예시" width={300} height={200} />
        </div>
      </section>
    </main>
  )
}
