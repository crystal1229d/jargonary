'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Category,
  LinkedWordInput,
  Word,
  WordDefinition,
  WordLinkType,
} from '@/types'
// import { createWord } from '@/services/word'
import { generateTempId } from '@/utils'

import SelectCategory from '../SelectCategory'
import DefinitionsForm from '../DefinitionsForm'
import ExamplesForm from '../ExamplesForm'
import LinkedWordsForm from '../LinkedWordsForm'

import styles from './Form.module.css'

interface Props {
  categories: Category[] | []
  wordLinkTypes: WordLinkType[]
}

export default function WordForm({ categories, wordLinkTypes }: Props) {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const [selectedCategory, setSelectedCategory] = useState<Category['id']>(
    categories[0]?.id ?? '',
  )
  const [word, setWord] = useState<Word['word']>('')
  const [ipa, setIpa] = useState<Word['ipa']>('')
  const [definitions, setDefinitions] = useState<WordDefinition[]>([
    { id: generateTempId(), definition: '', isJargon: false, order: 1 },
  ])
  const [examples, setExamples] = useState<Word['examples']>([''])
  const [linkedWords, setLinkedwords] = useState<LinkedWordInput[]>([])
  const [memo, setMemo] = useState<Word['memo']>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // await createWord(newWord)
      router.push('/words')
    } catch (error) {
      console.error(error)
      alert('Failed to create word')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <SelectCategory
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />

      <div className={styles.formGroup}>
        <label htmlFor="word">Word</label>
        <input
          type="text"
          placeholder="bug"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="ipa">IPA</label>
        <div className={styles.ipa}>
          <p>{`[`}</p>
          <input
            type="text"
            placeholder="bʌɡ"
            value={ipa}
            onChange={(e) => setIpa(e.target.value)}
            required
          />
          <p>{`]`}</p>
        </div>
      </div>

      <DefinitionsForm definitions={definitions} onChange={setDefinitions} />

      <ExamplesForm examples={examples} onChange={setExamples} />

      <LinkedWordsForm
        wordLinkTypes={wordLinkTypes}
        linkedWords={linkedWords}
        onChange={setLinkedwords}
      />

      <div className={styles.formGroup}>
        <label htmlFor="memo">Memo</label>
        <textarea
          id="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="A bug is an error that prevents an app or website from operating the way it’s supposed to. This is one of the most common web development terms you’ll hear."
          required
          rows={5}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.cancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.createButton}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  )
}
