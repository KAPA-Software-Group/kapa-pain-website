import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

type PlaceholderPageProps = {
  eyebrow: string
  title: string
  description: string
}

export function PlaceholderPage({
  eyebrow,
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <>
      <SiteHeader overlay />

      <main className="page-shell hero-drawer-reveal">
        <section className="inner-hero">
          <div className="section-inner inner-hero-content">
            <div className="section-label">{eyebrow}</div>
            <h1 className="inner-hero-title">{title}</h1>
            <p className="inner-hero-copy">{description}</p>
          </div>
        </section>

        <section className="page-placeholder">
          <div className="section-inner page-placeholder-grid">
            <article className="placeholder-panel">
              <span className="placeholder-kicker">Page Status</span>
              <h2 className="placeholder-title">Content coming soon.</h2>
              <p className="placeholder-copy">
                This page has been added to the site structure and is ready for
                content, forms, physician details, or location-specific updates.
              </p>
            </article>

            <article className="placeholder-panel placeholder-panel-accent">
              <span className="placeholder-kicker">In The Meantime</span>
              <p className="placeholder-copy">
                Patients and referring providers can still reach the clinic by
                phone or email while this section is being built out.
              </p>
              <div className="placeholder-actions">
                <Link href="/" className="btn-primary">
                  Back to Home
                </Link>
                <Link href="/contact-us" className="btn-ghost">
                  Contact the Clinic
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
