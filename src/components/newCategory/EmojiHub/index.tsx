'use client'

import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import styles from './EmojiHub.module.css'

interface Props {
  selectedEmoji: string
  setSelectedEmoji: (emoji: string) => void
}

export default function EmojiHub({ selectedEmoji, setSelectedEmoji }: Props) {
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const handleClickSearch = () => {
    setIsPickerOpen((prev) => !prev)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['search-btn']}>
        <button onClick={handleClickSearch}>
          <span>{selectedEmoji}</span>
        </button>
      </div>

      {isPickerOpen && (
        <EmojiPicker
          onEmojiClick={(emojiData) => setSelectedEmoji(emojiData.emoji)}
          width={400}
          height={400}
        />
      )}
    </div>
  )
}
