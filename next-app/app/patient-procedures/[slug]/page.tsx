import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProcedurePageView } from "@/components/procedure-page"
import {
  getPatientProcedurePage,
  patientProcedurePages,
} from "@/lib/patient-procedures"

type ProcedurePageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return patientProcedurePages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({
  params,
}: ProcedurePageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getPatientProcedurePage(slug)

  if (!page) {
    return {
      title: "Patient Procedures | Precision Pain Centre",
    }
  }

  return {
    title: `${page.title} | Precision Pain Centre`,
    description: page.metaDescription,
  }
}

export default async function ProcedureDetailPage({
  params,
}: ProcedurePageProps) {
  const { slug } = await params
  const page = getPatientProcedurePage(slug)

  if (!page) {
    notFound()
  }

  return <ProcedurePageView page={page} />
}
