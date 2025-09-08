'use client'

export default function Home() {
  return (
    <div className="flex items-center justify-center gap-10 flex-col h-[calc(100dvh-3.2rem)] text-pretty">
      <blockquote className="text-8xl capitalize text-center bg-gray-950/5 dark:bg-gray-50/5 text-gray-500 text-pretty">
        this is nothing but a play ground for my curiosity.
      </blockquote>
      <pre className="text-8xl capitalize text-center text-gray-500">
        Cheers!
      </pre>
    </div>
  )
}
