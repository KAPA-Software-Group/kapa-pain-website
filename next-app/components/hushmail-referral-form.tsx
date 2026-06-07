"use client"

import Script from "next/script"

const referralFormUrl = "https://hushforms.com/precisioncare-4137"

export function HushmailReferralForm() {
  return (
    <section className="referral-embed" aria-labelledby="secure-referral-form">
      <div className="referral-embed-loading" role="status" aria-live="polite">
        Secure referral form loading below. Please complete the form through
        the encrypted Hushmail portal.
      </div>

      <a
        href={referralFormUrl}
        className="referral-direct-link"
        target="_blank"
        rel="noreferrer"
      >
        Open referral form
      </a>

      <div
        className="hushmail-form-container referral-embed-frame"
        data-secure-form="precisioncare-4137"
        data-secure-form-transparent-background="true"
      />

      <Script
        id="hushmail-referral-form-script"
        src="https://hushforms.com/f/public/javascript/embed-hush-form.js"
        strategy="afterInteractive"
      />
    </section>
  )
}
