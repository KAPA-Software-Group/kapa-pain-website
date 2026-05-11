import type { Metadata } from "next"
import {
  ServiceDetailPage,
  type ServiceDetailPageData,
} from "@/components/service-detail-page"

export const metadata: Metadata = {
  title: "Landmark Injections | Precision Care Centre",
  description:
    "Learn how Precision Care Centre uses landmark injections to target painful joints, muscles, tendons, and soft tissue concerns.",
}

const page: ServiceDetailPageData = {
  heroClassName: "landmark-injections-service-hero",
  title: "Landmark Injections",
  intro: [
    "Landmark injections use a physician's knowledge of anatomy and careful physical assessment to identify the treatment area. These injections can be used when the painful structure can be accurately located by touch, movement testing, and established anatomical landmarks.",
    "Your physician will review your symptoms, examination findings, and care goals to decide whether a landmark injection is appropriate or whether image guidance is recommended instead.",
  ],
  quickFacts: [
    { label: "Guidance", value: "Anatomical landmarks and assessment" },
    { label: "Use", value: "Joints, muscles, tendons, and soft tissue" },
    { label: "Goal", value: "Targeted pain relief and improved function" },
  ],
  sections: [
    {
      id: "when-used",
      eyebrow: "When Used",
      title: "A focused option for accessible treatment areas.",
      paragraphs: [
        "Landmark injections may be considered when the target area is close enough to the surface and can be reliably identified through examination. They are often used as part of a broader pain management plan.",
      ],
      bulletLabel: "Common targets can include",
      bullets: [
        "Painful joints",
        "Inflamed tendons",
        "Muscle trigger points",
        "Bursitis-related pain",
        "Localized soft tissue pain",
      ],
      visual: {
        title: "Anatomy-based targeting",
        copy: "The physician uses examination findings and anatomical landmarks to guide placement.",
      },
    },
    {
      id: "appointment",
      eyebrow: "Appointment",
      title: "What to expect during your visit.",
      paragraphs: [
        "Before the injection, your physician will review the area of pain, perform an exam, and explain the intended target. The skin is cleaned before treatment, and the injection is placed using the identified anatomical landmarks.",
        "Afterward, your care team may provide activity guidance and explain what response to watch for over the following days.",
      ],
      bulletLabel: "Your visit may include",
      bullets: [
        "Review of symptoms and goals",
        "Physical examination of the painful area",
        "Discussion of benefits and risks",
        "Post-injection instructions",
      ],
      tone: "muted",
    },
  ],
  faqs: [
    {
      question: "How Are Landmark Injections Different From Image-Guided Injections?",
      paragraphs: [
        "Landmark injections are guided by physical examination and anatomical landmarks. Image-guided injections use ultrasound or fluoroscopy to view the target area during the procedure.",
        "Your physician will recommend the approach that best fits the treatment area and your clinical needs.",
      ],
    },
    {
      question: "Are Landmark Injections Right For Every Area?",
      paragraphs: [
        "No. Some targets are deeper, smaller, or close to sensitive structures, so image guidance may be preferred for accuracy and safety.",
      ],
    },
    {
      question: "How Long Does The Appointment Take?",
      paragraphs: [
        "Timing can vary depending on the treatment area and assessment required, but many injections are completed during a regular clinic visit.",
      ],
    },
    {
      question: "What Should I Expect Afterward?",
      paragraphs: [
        "You may have temporary soreness at the injection site. Your physician or care team will review any activity limits and follow-up instructions that apply to your treatment.",
      ],
    },
  ],
}

export default function LandmarkInjectionsPage() {
  return (
    <>
      <style>
        {`
          .landmark-injections-service-hero .service-hero-grid {
            grid-template-columns: minmax(0, 920px);
            justify-content: center;
            text-align: center;
          }

          .landmark-injections-service-hero .service-hero-copy-block {
            display: grid;
            justify-items: center;
          }

          .landmark-injections-service-hero .service-hero-intro {
            max-width: 820px;
            margin-inline: auto;
          }

          .landmark-injections-service-hero .procedure-hero-actions {
            justify-content: center;
          }
        `}
      </style>
      <ServiceDetailPage page={page} />
    </>
  )
}
