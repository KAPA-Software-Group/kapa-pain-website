import type { MetadataRoute } from "next"

import { locations } from "@/lib/locations"
import { patientProcedurePages } from "@/lib/patient-procedures"

const BASE_URL = "https://precisioncare.ca"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticPaths = [
    "",
    "/services",
    "/services/fluoroscopy",
    "/services/image-guided-procedures",
    "/services/medication-management",
    "/services/regenerative-sports-therapy",
    "/doctors",
    "/locations",
    "/patient-procedures",
    "/faq",
    "/contact-us",
    "/referrals",
  ]

  const staticEntries = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
  }))

  const locationEntries = locations.map((loc) => ({
    url: `${BASE_URL}/locations/${loc.slug}`,
    lastModified,
  }))

  const procedureEntries = patientProcedurePages.map((page) => ({
    url: `${BASE_URL}/patient-procedures/${page.slug}`,
    lastModified,
  }))

  return [...staticEntries, ...locationEntries, ...procedureEntries]
}
