import type { Metadata } from "next"
import {
  ServiceDetailPage,
  type ServiceDetailPageData,
} from "@/components/service-detail-page"

export const metadata: Metadata = {
  title: "Image Guided Procedures | Precision Care Centre",
  description:
    "Learn how Precision Care Centre uses ultrasound and fluoroscopy guided injections to improve accuracy for diagnosis and pain treatment.",
}

const page: ServiceDetailPageData = {
  heroClassName: "guided-injections-service-hero",
  title: "Guided Injections",
  intro: [
    'Injections need to be administered at an exact location in order to have a high success rate for treatment. The conventional palpation guided method is extremely inaccurate, and is therefore referred to as "blind". These injections are solely based on experience and knowledge. Unfortunately, even a very experienced physician will always be less accurate and their failure rate will remain high.',
    "This is the reason why fluoroscopy & ultrasound guided injections are the methods we recommend. These methods are necessary to ensure the injection is administered at the exact location. With a correct injection, physicians can make a more accurate diagnosis and better understand where the pain originates.",
  ],
  quickFacts: [
    { label: "Guidance", value: "Ultrasound and fluoroscopy" },
    { label: "Purpose", value: "Accurate diagnosis and treatment" },
    { label: "Recovery", value: "Minimize activity for 24 to 48 hours" },
  ],
  sections: [
    {
      id: "ultrasound-guided-injections",
      eyebrow: "About",
      title: "Ultrasound Guided Injections",
      paragraphs: [
        "An ultrasound-guided medication injection utilizes ultrasound technology to give our physicians a precise view of the area that is causing pain. We then use this ultrasound image to guide the injection needle into the problem area.",
        "It is particularly recommended for areas that are deeper within the body and not as close to the surface of the skin as other areas. It is more difficult to perform on these areas, and the ultrasound guidance comes in extremely useful in order to provide the best treatment possible.",
        "Ultrasound guided injections allow physicians to administer medication with utmost accuracy.",
      ],
      visual: {
        label: "Service image",
        title: "Ultrasound guided injection",
        copy: "Needle placement is guided by real-time imaging.",
        imageSrc: "/procedure-images/guidedInjection.png",
        imageAlt: "Ultrasound guided injection procedure",
      },
    },
    {
      id: "conditions-treated",
      eyebrow: "Pain Conditions",
      title: "Pain conditions treated with this method include:",
      bulletLabel: "Conditions treated",
      bullets: [
        "Rheumatoid arthritis",
        "Osteoarthritis",
        "Sports Injury",
        "Inflamed Joints and Tendons",
        "Tendonitis",
        "Joint Pain",
        "Muscle Pain",
        "Synovitis",
      ],
      tone: "muted",
    },
  ],
  faqs: [
    {
      question: "How Do I Prepare?",
      paragraphs: [
        "Please shower before your appointment so the area being injected is clean.",
        "This helps decrease the risk of infection.",
        "You may eat your normal diet before and after the procedure.",
      ],
    },
    {
      question: "What Can I Expect During My Appointment?",
      paragraphs: [
        "During the procedure, you will be positioned on an examination table with the targeted area exposed.",
        "A special imaging scanner is then used to capture images of the area and guide the injection as accurately as possible.",
      ],
    },
    {
      question: "What Are The Benefits?",
      paragraphs: ["Image-guided injections offer several benefits:"],
      bullets: [
        "real-time imaging during the procedure",
        "better visualization of the treatment area",
        "more precise needle placement",
        "greater accuracy for diagnosis and treatment",
      ],
    },
    {
      question: "Are There Any Risks?",
      paragraphs: [
        "There are small risks associated with this type of injection, and you should be aware of them before proceeding.",
        "The radiologist performing your procedure will review these with you when you arrive.",
      ],
    },
    {
      question: "How Long Is The Procedure?",
      paragraphs: ["Most procedures take between 5 and 30 minutes."],
    },
    {
      question: "How Long Does It Take To Recover?",
      paragraphs: [
        "It is important to rest the joint where the injection was administered.",
        "You should minimize activity for the first 24 to 48 hours.",
      ],
    },
    {
      question: "How Soon Will I See Results?",
      paragraphs: [
        "Injections can take a few days to have a noticeable effect and up to 7 to 10 days for the full effect.",
        "The steroid may last for up to six weeks, but the benefits can sometimes last much longer.",
        "Your doctor will normally arrange a follow-up appointment after your injection.",
      ],
    },
  ],
}

export default function ImageGuidedProceduresPage() {
  return (
    <>
      <style>
        {`
          .guided-injections-service-hero .service-hero-grid {
            grid-template-columns: minmax(0, 920px);
            justify-content: center;
            text-align: center;
          }

          .guided-injections-service-hero .service-hero-copy-block {
            display: grid;
            justify-items: center;
          }

          .guided-injections-service-hero .service-hero-intro {
            max-width: 820px;
            margin-inline: auto;
          }

          .guided-injections-service-hero .procedure-hero-actions {
            justify-content: center;
          }
        `}
      </style>
      <ServiceDetailPage page={page} />
    </>
  )
}
