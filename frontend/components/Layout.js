import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/stations", label: "Stations" },
  { href: "/trip", label: "Trip Planner" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-surface/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <h1 className="text-lg font-bold text-accent">Dynamic EV Pricing</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-300 hover:text-accent">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
