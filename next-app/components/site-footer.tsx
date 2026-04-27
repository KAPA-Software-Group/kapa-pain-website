import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="footer" style={{ borderTop: "1px solid var(--sand)" }}>
      <span className="footer-left">
        © Precision Pain Centre. All rights reserved.
      </span>
      <div className="footer-right">
        <a href="tel:2897529388">289-752-9388</a>
        <a href="mailto:info@precisioncare.ca">info@precisioncare.ca</a>
        <Link href="/contact-us">Contact Us</Link>
      </div>
    </footer>
  )
}
