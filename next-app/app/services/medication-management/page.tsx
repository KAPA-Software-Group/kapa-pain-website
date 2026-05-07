import type { Metadata } from "next"
import {
  ServiceDetailPage,
  type ServiceDetailPageData,
} from "@/components/service-detail-page"

export const metadata: Metadata = {
  title: "Medication Management | Precision Care Centre",
  description:
    "Learn how Precision Care Centre reviews, adjusts, and monitors medication plans for chronic pain management.",
}

const page: ServiceDetailPageData = {
  heroClassName: "medication-management-service-hero",
  title: "Medication Management",
  intro: [
    "Although medications have the power to heal, they can also cause harm. Therefore, medication management is a service that ensures you are given the right medication and right medication combinations to adequately control and reduce pain while minimizing any risks. This service can also be used in combination with other types of treatment such as physical therapy or interventional procedures.",
  ],
  quickFacts: [
    { label: "Focus", value: "Right medication and right combinations" },
    { label: "Approach", value: "Initial and ongoing review" },
    { label: "Goal", value: "Control pain while minimizing risk" },
  ],
  sections: [
    {
      id: "benefits",
      eyebrow: "Benefits",
      title: "The benefits to medication management include:",
      bulletLabel: "Patient benefits",
      bullets: [
        "Improved ability to function",
        "Improved well-being",
        "Decreased sense of pain",
        "Reduces risk for an adverse drug event",
        "Reinforces good habits",
        "Greater engagement with recovery",
      ],
      visual: {
        label: "Service image",
        title: "Medication review plan",
        copy: "Treatment plans focus on benefit, risk, and daily function.",
        imageSrc: "/procedure-images/medicationManagement.png",
        imageAlt: "Medication review plan for pain management",
      },
    },
    {
      id: "how-it-works",
      eyebrow: "Process",
      title: "How medication management works.",
      paragraphs: [
        "Our physician will meet with you to review all of your medications, including prescription, nonprescription, alternative, traditional, vitamins, and nutritional supplements, along with your history, preferences, lifestyle, and health goals.",
        "If any medication issues apply, our experts will make any necessary medication changes.",
      ],
      bulletLabel: "We determine whether each medication is:",
      bullets: [
        "still needed",
        "meeting the goals set by your doctor",
        "appropriate and effective for your conditions",
        "safe for all conditions and medication(s) you are taking",
        "able to be taken by you as intended",
        "on your health plan, and if not, whether a suitable substitution is available",
      ],
      tone: "muted",
    },
  ],
  faqs: [
    {
      question: "How Does Medication Management Work?",
      paragraphs: [
        "Our physician will meet with you to review all of your medications (e.g., prescription, nonprescription, alternative, traditional, vitamins, and nutritional supplements), along with your history, preferences, lifestyle, and health goals.",
        "We determine whether each medication is:",
      ],
      bullets: [
        "still needed",
        "meeting the goals set by your doctor",
        "appropriate and effective for your conditions",
        "safe for all conditions and medication(s) you are taking",
        "able to be taken by you as intended",
        "on your health plan, and if not, whether a suitable substitution is available",
        "If any of the above issues apply, our experts will make any necessary medication changes.",
      ],
    },
    {
      question: "What Issues Does Medication Management Address?",
      paragraphs: [
        "Effective medication management is an ongoing process that not only allows for the elimination of unnecessary drugs, but also identifies and addresses common issues such as:",
      ],
      bullets: [
        "Drug-disease contraindications: Are prescribed drugs inappropriate for a specific disease or chronic condition due to potential side effects?",
        "Drug-drug interactions: Are there any concerns about adverse events due to prescribed medications interacting with other prescriptions?",
        "Inappropriate drug dosage: Is a patient prescribed too high or too low a dose?",
        "Patient-specific precautions: Are there safety concerns due to a patient's age, gender, or another trait specific to the individual?",
        "Improper duration of treatment: Is the medication prescribed for the right period of time, or does the duration of treatment need to be adjusted?",
      ],
    },
    {
      question: "Why Is Medication Management Important?",
      paragraphs: [
        "The more conditions or doctors you see, the more medications you take, which can lead to unfavorable side effects and medication disasters.",
        "Disasters occur when doses are too high, too low, when a medication is not suited to your genetic makeup, or when it is taken in combination with other medications.",
        "Having someone to help you manage, understand, and answer questions about your medications and how they impact your health is important.",
      ],
    },
    {
      question:
        "If I Receive Medication Management Services, Will I End Up On More Medication?",
      paragraphs: [
        "Not necessarily.",
        "Medication management commonly results in some medications being stopped, but it may also lead to dose changes or new medications.",
        "The aim is to get the medications right.",
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
