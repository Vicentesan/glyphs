import Link from 'next/link'

export function NavBar() {
  return (
    <nav className="m-10 flex items-center justify-between text-lg font-semibold">
      <Link href="/">Glyphs</Link>
      <Link href="/about">About</Link>
    </nav>
  )
}
