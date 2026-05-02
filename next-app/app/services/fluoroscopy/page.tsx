import type { Metadata } from "next"
import Link from "next/link"
import {
  ServiceDetailPage,
  type ServiceDetailPageData,
} from "@/components/service-detail-page"

export const metadata: Metadata = {
  title: "Fluoroscopy | Precision Care Centre",
  description:
    "Learn how Precision Care Centre uses live X-ray fluoroscopy to guide injections with real-time imaging accuracy.",
}

const page: ServiceDetailPageData = {
  title: "Fluoroscopy",
  intro: [
    <>
      Fluoroscopy is similar to an X-ray movie on one specific area of the body.
      It provides real-time imagery which allows the{" "}
      <Link href="/doctors" className="service-inline-link">
        physician
      </Link>{" "}
      to locate the injection site with utmost accuracy and ensures the
      medication is correctly injected for pain relief. The physician can direct
      needles with more precision when performing a procedure or administering
      treatment. Fluoroscopy can be used on different parts of the body, but is
      most commonly used for spine interventions and spinal injections.
    </>,
  ],
  heroVisual: {
    label: "Image placeholder",
    title: "Fluoroscopy-guided injection",
    copy: "Best suited for an image of fluoroscopy equipment or a treatment-room setup with live X-ray guidance.",
  },
  quickFacts: [
    { label: "Imaging", value: "Real-time X-ray movie" },
    { label: "Common use", value: "Spine interventions and spinal injections" },
    { label: "Timing", value: "Often 15 to 60 minutes" },
  ],
  sections: [
    {
      id: "treatment-for",
      eyebrow: "Treatment For",
      title: "Treatment for:",
      bulletLabel: "Conditions and areas treated",
      bullets: [
        "Spine pain",
        "Hip Arthritis",
        "Sciatica",
        "Shoulder Arthritis",
        "Knee pain",
        "Lumbar Disc Herniation",
        "Piriformis Syndrome",
        "Rotator Cuff Issues",
      ],
      visual: {
        label: "Image placeholder",
        title: "Spine and joint targeting",
        copy: "A procedural or diagnostic imaging image would reinforce the accuracy of this service.",
      },
    },
    {
      id: "what-can-be-seen",
      eyebrow: "Imaging Scope",
      title: "What can be seen with fluoroscopy?",
      paragraphs: ["Fluoroscopy allows physicians to view many body systems."],
      bulletLabel: "Body systems",
      bullets: [
        "skeletal",
        "digestive",
        "urinary",
        "respiratory",
        "reproductive",
      ],
      visual: {
        label: "Image placeholder",
        title: "Real-time imaging view",
        copy: "Use an image or diagram-like clinical still that makes the live imaging concept clear.",
      },
      tone: "muted",
    },
  ],
  faqs: [
    {
      question: "What Can Be Seen With Fluoroscopy?",
      paragraphs: [
        "Fluoroscopy allows physicians to view many body systems, including:",
      ],
      bullets: [
        "skeletal",
        "digestive",
        "urinary",
        "respiratory",
        "reproductive",
      ],
    },
    {
      question: "Are There Any Side Effects?",
      paragraphs: [
        "Most patients tolerate fluoroscopy well.",
        "You may have mild soreness at the injection site.",
        "Your physician will review any specific risks with you before the procedure.",
      ],
    },
    {
      question: "How Long Does A Fluoroscopy Take?",
      paragraphs: [
        "The procedure itself is usually brief and often takes between 15 and 60 minutes.",
        "The exact length depends on the area being treated.",
      ],
    },
    {
      question: "Is It Painful?",
      paragraphs: [
        "Most patients experience only mild discomfort.",
        "You may feel some pressure or a brief sting during the injection.",
        "The procedure is generally well tolerated.",
      ],
    },
  ],
}

export default function FluoroscopyPage() {
  return <ServiceDetailPage page={page} />
}
