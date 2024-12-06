import React from 'react'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-700">Page Not Found</h1>
      <p className="mt-4 text-lg">Sorry, 404</p>
      <Link href="/">
        <span className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Go Home
        </span>
      </Link>
    </div>
  )
}
