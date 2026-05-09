import type { Metadata } from "next"
import {
  ServiceDetailPage,
  type ServiceDetailPageData,
} from "@/components/service-detail-page"

export const metadata: Metadata = {
  title: "Medication Management | Precision Care Centre",
  description:
    "Learn how Precision Care Centre reviews medications, identifies safety concerns, and helps patients manage pain with the right medication plan.",
}

const page: ServiceDetailPageData = {
  heroClassName: "medication-management-service-hero",
  title: "Medication Management",
  intro: [
    "Although medications have the power to heal, they can also cause harm. Medication management helps ensure you are given the right medication and medication combinations to adequately control and reduce pain while minimizing risk.",
    "This service can be used alongside other types of treatment, including physical therapy and interventional procedures, as part of a broader pain care plan.",
  ],
  quickFacts: [
    { label: "Focus", value: "Medication review and pain control" },
    { label: "Goal", value: "Reduce risk while improving function" },
    { label: "Approach", value: "Initial and ongoing review" },
  ],
  sections: [
    {
      id: "benefits",
      eyebrow: "Benefits",
      title: "Medication plans should support recovery, not add risk.",
      paragraphs: [
        "Medication management gives patients a structured way to review what they take, why they take it, and whether it still fits their health goals.",
      ],
      bulletLabel: "Benefits can include",
      bullets: [
        "Improved ability to function",
        "Improved well-being",
        "Decreased sense of pain",
        "Reduced risk for an adverse drug event",
        "Reinforced good medication habits",
        "Greater engagement with recovery",
      ],
      visual: {
        title: "Medication review",
        copy: "A careful review can identify safety concerns, interactions, and opportunities to simplify care.",
        imageSrc: "/procedure-images/medicationManagement.png",
        imageAlt: "Medication management consultation",
      },
    },
    {
      id: "review-process",
      eyebrow: "Review Process",
      title: "How medication management works.",
      paragraphs: [
        "Our physician will meet with you to review all of your medications, including prescription, nonprescription, alternative, traditional, vitamins, and nutritional supplements.",
        "Your history, preferences, lifestyle, and health goals are considered so each medication can be assessed in the context of your overall care.",
      ],
      bulletLabel: "Each medication is reviewed to determine whether it is",
      bullets: [
        "Still needed",
        "Meeting the goals set by your doctor",
        "Appropriate and effective for your conditions",
        "Safe for all conditions and medications you are taking",
        "Able to be taken by you as intended",
        "Covered by your health plan, or whether a suitable substitution is available",
      ],
      tone: "muted",
    },
    {
      id: "common-issues",
      eyebrow: "Common Issues",
      title: "What medication management can identify.",
      paragraphs: [
        "Effective medication management is an ongoing process. It can help eliminate unnecessary drugs while identifying issues that may interfere with safety, pain control, or treatment goals.",
      ],
      bulletLabel: "Common issues include",
      bullets: [
        "Drug-disease contraindications: medications that may be inappropriate for a specific disease or chronic condition",
        "Drug-drug interactions: concerns about adverse events when prescriptions interact",
        "Inappropriate drug dosage: doses that may be too high or too low",
        "Patient-specific precautions: safety concerns related to age, gender, or other individual factors",
        "Improper duration of treatment: medication being used for the wrong length of time",
      ],
    },
  ],
  faqs: [
    {
      question: "Why Is Medication Management Important?",
      paragraphs: [
        "The more conditions or doctors you see, the more medications you may take, which can lead to unfavorable side effects and medication-related problems.",
        "Problems can occur when doses are too high or too low, when a medication is not suited to your genetic makeup, or when it is taken in combination with other medications.",
        "Having someone help you manage, understand, and ask questions about your medications is an important part of safer care.",
      ],
    },
    {
      question: "If I Receive Medication Management Services, Will I End Up On More Medication?",
      paragraphs: [
        "Not necessarily.",
        "Medication management commonly results in some medications being stopped, but it may also lead to dose changes or new medications.",
        "The aim is to get the medications right.",
      ],
    },
    {
      question: "What Happens If A Medication Concern Is Found?",
      paragraphs: [
        "If a concern applies to your current medications, our experts will make any necessary medication changes or recommendations.",
        "The goal is to improve safety, support pain control, and align your medications with your overall care plan.",
      ],
    },
    {
      question: "Can Medication Management Be Combined With Other Treatments?",
      paragraphs: [
        "Yes. Medication management can be used with other types of treatment, including physical therapy and interventional procedures.",
        "This helps medication decisions fit into a broader plan for pain control, function, and recovery.",
      ],
    },
  ],
}

export default function MedicationManagementPage() {
  return (
    <>
      <style>
        {`
          .medication-management-service-hero .service-hero-grid {
            grid-template-columns: minmax(0, 920px);
            justify-content: center;
            text-align: center;
          }

          .medication-management-service-hero .service-hero-copy-block {
            display: grid;
            justify-items: center;
          }

          .medication-management-service-hero .service-hero-intro {
            max-width: 820px;
            margin-inline: auto;
          }

          .medication-management-service-hero .procedure-hero-actions {
            justify-content: center;
          }
        `}
      </style>
      <ServiceDetailPage page={page} />
    </>
  )
}
