import { useState, useEffect, useCallback, useId } from 'react'
import type { ReactNode } from 'react'

function App() {
  const { theme, toggle } = useTheme()
  const themeLabelId = useId()

  return (
    <div className="font-mono mx-auto flex h-dvh flex-col bg-white px-6 leading-normal text-black antialiased transition-colors duration-200 dark:bg-black dark:text-white">
      <nav
        className="sticky -mx-6 top-0 z-50 flex items-center justify-center border-b-4 border-black px-6 py-3 text-left transition-colors duration-200 dark:border-white"
        aria-label="Site navigation"
      >
        <div className="flex flex-1 max-w-225 items-center justify-between">
          <span className="text-lg font-bold">
            ejnkns
          </span>
          <button
            onClick={toggle}
            aria-labelledby={themeLabelId}
            className="size-8 text-[1.25rem] cursor-pointer rounded-full border-none bg-(--color-bg) text-(--color-text,#000) transition-colors duration-200 hover:bg-accent hover:text-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-white"
          >
            <span id={themeLabelId} className="sr-only">
              Switch to {theme === 'dark' ? 'light' : 'dark'} theme
            </span>
            <span aria-hidden="true" className="flex items-center justify-center">
              {theme === 'dark' ? '☀︎' : '☽'}
            </span>
          </button>
        </div>
      </nav>

      <main className="flex flex-1 flex-col items-center justify-center text-center">
        <section aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="m-0 mb-1 text-[clamp(3rem,10vw,7rem)] font-bold leading-tight tracking-wide font-sans">
            {personal.name}
          </h1>
          <p className="mb-6 text-[clamp(1rem,3vw,1.4rem)] text-center" aria-label="Role and location">
            Software Engineer &middot; Melbourne
          </p>
          <div className="flex flex-wrap justify-center gap-6" role="list" aria-label="Links">
            <ExternalLink href={personal.linkedIn}>
              LinkedIn
            </ExternalLink>
            <ExternalLink href={personal.github}>
              GitHub
            </ExternalLink>
          </div>
        </section>
      </main>
    </div>
  )
}

type Theme = 'light' | 'dark'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark') return stored
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      className="text-sm px-1 font-bold text-accent underline underline-offset-[3px] hover:decoration-transparent transition-all duration-200 hover:bg-accent hover:text-(--color-bg) focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${children} (opens in new tab)`}
    >
      {children}
    </a>
  )
}

const personal = {
  name: "Elliot Jenkins",
  linkedIn: "https://www.linkedin.com/in/ejnkns/",
  github: "https://github.com/ejnkns"
}

export default App
