'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="">
        <Link href="/chart">Chart</Link>
      </main>
    </div>
  )
}
