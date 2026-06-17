import { useState, useEffect, useCallback, useId, useRef } from 'react'

import { twMerge } from 'tailwind-merge'

function App() {
  const { theme, toggle } = useTheme()
  const themeLabelId = useId()
  const detailsRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) {
      return
    }

    const element = detailsRef.current
    if (!element) {
      return
    }

    const onEnter = () => element.setAttribute("open", "")
    const onLeave = () => element.removeAttribute("open")

    element.addEventListener("mouseenter", onEnter)
    element.addEventListener("mouseleave", onLeave)

    return () => {
      element.removeEventListener("mouseenter", onEnter)
      element.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <div className="font-mono mx-auto flex h-dvh flex-col bg-white px-6 leading-normal text-black antialiased transition-colors duration-200 dark:bg-black dark:text-white">
      <nav
        className="sticky -mx-6 top-0 z-50 flex items-center justify-center border-b-2 border-black px-6 py-3 text-left transition-colors dark:border-white"
        aria-label="Site navigation"
      >
        <div className="flex flex-1 max-w-225 items-center justify-between">
          <span className="text-lg font-bold">
            ejnkns
          </span>
          <button
            onClick={toggle}
            aria-labelledby={themeLabelId}
            className="size-8 text-[1.25rem] cursor-pointer rounded-full border-none bg-(--color-bg) text-(--color-text,#000) transition-colors hover:bg-accent hover:text-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-white"
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

      <main className="flex flex-1 flex-col items-center justify-center text-center max-sm:justify-start max-sm:pt-12">
        <section aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="m-0 mb-1 text-[clamp(3rem,10vw,7rem)] font-bold leading-tight tracking-wider font-sans">
            {personal.name}
          </h1>
          <p className="mb-6 text-[clamp(1rem,3vw,1.4rem)] text-center" aria-label="Role and location">
            Software Engineer &middot; Melbourne
          </p>
          <div className="flex flex-wrap justify-center gap-6" role="list" aria-label="Links">
            <div>
            <ExternalLink href={personal.linkedIn} label="LinkedIn" />
            </div>
            <div>
            <ExternalLink href={personal.github} label="GitHub" />
            </div>
              <details ref={detailsRef} className="group/details relative inline-block text-left max-sm:basis-full">
                <summary className="cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  <span className={twMerge(linkStyle, 'group-open/details:bg-accent group-open/details:text-(--color-bg) group-open/details:decoration-transparent')}>
                    Projects
                  </span>
                  <span className="text-accent px-1 inline-block transition-transform motion-reduce:transition-none group-open/details:rotate-90 rotate-0">
                    {"→"}
                  </span>
                </summary>
                <ul className="absolute left-0 z-10 w-56 origin-top-right">
                  <ListLinkItem href="https://piano.ejnkns.com" label="react-piano-keyboard" />
                  <ListLinkItem href="https://beatbox-sounds.vercel.app/" label="Beatbox Sounds" />
                  <ListLinkItem href="https://bagel-maker.vercel.app/" label="Bagel Maker" />
                  <ListLinkItem href="https://www.npmjs.com/package/gdocs-database" label="gdocs-database" />
                </ul>
              </details>
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

const linkStyle = "text-sm px-1 font-bold text-accent underline underline-offset-[2px] transition-all focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
const linkHoverStyle = "hover:bg-accent hover:text-(--color-bg) hover:decoration-transparent"

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className={twMerge(linkStyle, linkHoverStyle, 'my-1')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in new tab)`}
    >
      {label}
    </a>
  )
}

function ListLinkItem({ href, label }: { href: string; label: string }) {
  return (
    <li className='group/list-item'>
      &middot;{" "}
      <ExternalLink href={href} label={label} />
    </li>
  )
}

const personal = {
  name: "Elliot Jenkins",
  linkedIn: "https://www.linkedin.com/in/ejnkns/",
  github: "https://github.com/ejnkns"
}

export default App
