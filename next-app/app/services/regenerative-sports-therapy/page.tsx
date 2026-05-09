import type { Metadata } from "next"
import {
  ServiceDetailPage,
  type ServiceDetailPageData,
} from "@/components/service-detail-page"

export const metadata: Metadata = {
  title: "Regenerative & Sports Therapy | Precision Care Centre",
  description:
    "Learn how Precision Care Centre uses regenerative and sports therapy to support musculoskeletal healing, pain recovery, and return to function.",
}

const page: ServiceDetailPageData = {
  heroClassName: "regenerative-service-hero",
  title: "Regenerative & Sports Therapy",
  intro: [
    "In sports medicine, regenerative medicine therapies are typically used to treat musculoskeletal injuries and disorders, in particular to repair or replace damaged ligaments, cartilage, or tendons. Regenerative therapies can also be beneficial for muscle and bone-related injuries, as well as many types of chronic pain and degeneration.",
  ],
  quickFacts: [
    { label: "Focus", value: "Musculoskeletal injuries and disorders" },
    { label: "Treatments", value: "PRP and regenerative therapies" },
    { label: "Goal", value: "Support healing and return to function" },
  ],
  sections: [
    {
      id: "conditions-treated",
      eyebrow: "Regenerative Therapy",
      title: "Commonly treated conditions.",
      bulletLabel: "Examples include",
      bullets: [
        "Tendonitis, such as tennis elbow, golfer's elbow, and patellar tendonitis",
        "Joint pain resulting from inflammation after an acute injury",
        "Early-stage partial tendon tears",
        "Stress fractures",
        "Damage to knee cartilage",
        "Chronic degenerative joint disease",
      ],
      visual: {
        title: "Regenerative therapy",
        copy: "Treatment plans focus on damaged tissue, pain recovery, and function.",
        imageSrc: "/procedure-images/regenerativeSports.png",
        imageAlt: "Regenerative sports therapy treatment",
      },
    },
    {
      id: "sports-therapy",
      eyebrow: "For Athletes",
      title: "Regenerative therapy and sports.",
      paragraphs: [
        "Treatment for athletes suffering from musculoskeletal injuries often involves surgery to repair the damage or replace an injured joint. Surgical approaches are effective, and sometimes necessary, but they frequently require months of recovery and rehabilitation to restore mobility and strength. They also carry a higher risk of complications.",
        "Regenerative therapies can be highly effective without the pain, downtime, and risks associated with major surgery, allowing athletes to return to their athletic lifestyle more quickly.",
      ],
      bulletLabel: "Benefits to regenerative therapy for athletes include",
      bullets: [
        "No surgery, no drugs, no scars",
        "No prolonged post-procedural recovery period",
        "Less risk associated with major surgery",
        "Minimal downtime and less downtime",
        "Permanently restores function and structure of damaged tissue",
      ],
      tone: "muted",
    },
  ],
  faqs: [
    {
      question: "Why Should I Consider Regenerative Therapies?",
      paragraphs: [
        "These therapies are considered low risk compared to surgery, with better recovery and fewer complications. However, surgery can still be the best option for some advanced or severe cases.",
        "Tiger Woods, Peyton Manning, Bartolo Colon, Rafael Nadal, and Kobe Bryant are just a few of the professional athletes who have sought out regenerative treatments.",
        "Undergoing regenerative therapy does not prevent a patient from having surgery in the area if it becomes necessary in the future.",
      ],
    },
    {
      question: "How Do These Treatments Compare To Steroid Injections?",
      paragraphs: [
        "Steroid injections are useful tools for treating some pain conditions and are mostly covered by insurance.",
        "However, steroid injections often provide short-term pain relief and do not permanently fix the underlying issue.",
        "Regenerative treatments are different because they are designed to:",
      ],
      bullets: [
        "target the source of the injury",
        "use your own tissue to support healing",
        "help improve the actual cause of your pain",
      ],
    },
    {
      question: "How Long Will It Take For My Pain To Improve?",
      paragraphs: [
        "These treatments do not work quickly.",
        "Improvement timelines generally look like this:",
      ],
      bullets: [
        "Acute injuries: improvement may be seen over weeks",
        "Chronic injuries and pain: improvement is often assessed over months",
        "PRP: typically reassessed 2 months after treatment",
        "Stem cell therapy: improvement is often expected over 3 to 6 months",
        "The number of treatments needed to heal or manage your condition depends on the severity and duration of your symptoms.",
        "During your evaluation, the physician will discuss how many treatments may be needed for your condition.",
      ],
    },
    {
      question: "Can These Treatments Worsen My Condition?",
      paragraphs: [
        "It is highly unlikely that this treatment will worsen your condition.",
        "While some discomfort can occur after treatment, this usually passes within a few days.",
        "As with any injectable treatment, possible risks include:",
      ],
      bullets: [
        "bleeding",
        "tissue injury",
        "pain",
        "no response to treatment",
      ],
    },
  ],
}

export default function RegenerativeSportsTherapyPage() {
  return (
    <>
      <style>
        {`
          .regenerative-service-hero .service-hero-grid {
            grid-template-columns: minmax(0, 920px);
            justify-content: center;
            text-align: center;
          }

          .regenerative-service-hero .service-hero-copy-block {
            display: grid;
            justify-items: center;
          }

          .regenerative-service-hero .service-hero-intro {
            max-width: 820px;
            margin-inline: auto;
          }

          .regenerative-service-hero .procedure-hero-actions {
            justify-content: center;
          }
        `}
      </style>
      <ServiceDetailPage page={page} />
    </>
  )
}
