export type ProcedureCard = {
  title: string
  description: string
}

export type ProcedureSection = {
  title: string
  intro?: string[]
  bullets?: string[]
  cards?: ProcedureCard[]
  tone?: "default" | "muted" | "alert"
}

export type ProcedurePage = {
  slug: string
  title: string
  shortTitle: string
  eyebrow: string
  description: string
  metaDescription: string
  cardSummary: string
  cardHighlights: string[]
  quickFacts: {
    label: string
    value: string
  }[]
  intro: string[]
  sections: ProcedureSection[]
  relatedSlugs: string[]
}

export const patientProcedurePages: ProcedurePage[] = [
  {
    slug: "chronic-pain-assessment-medical-management",
    title: "Chronic Pain Assessment & Medical Management",
    shortTitle: "Assessment & Medical Management",
    eyebrow: "Start Here",
    description:
      "Comprehensive assessment and medical management help identify the source of pain and guide a personalized, evidence-based treatment plan.",
    metaDescription:
      "Learn how Precision Care Centre approaches chronic pain assessment, medical management, imaging review, and coordinated multidisciplinary care.",
    cardSummary:
      "A structured starting point for patients who need diagnosis, medication review, and a coordinated plan before choosing a procedure.",
    cardHighlights: [
      "History, examination, and imaging review",
      "Non-opioid and targeted medication planning",
      "Integrated follow-up with procedures and rehabilitation",
    ],
    quickFacts: [
      {
        label: "Format",
        value: "Multidisciplinary assessment and treatment planning",
      },
      {
        label: "May Include",
        value:
          "History, exam, imaging review, function review, medication plan",
      },
      {
        label: "Focus",
        value: "Safe, effective, sustainable pain control",
      },
    ],
    intro: [
      "Precision Care Centre uses a multidisciplinary approach to chronic pain assessment and management. The goal is to identify the likely pain source as accurately as possible and build a plan that fits the patient's condition, function, and prior treatment history.",
      "Care may include medication planning, image-guided procedures, rehabilitation guidance, lifestyle modification, and follow-up as symptoms change.",
    ],
    sections: [
      {
        title: "What the assessment includes",
        bullets: [
          "Review of medical history and prior treatments",
          "Focused physical examination",
          "Review of imaging such as X-ray, MRI, and CT",
          "Functional assessment and discussion of how pain affects daily life",
        ],
      },
      {
        title: "How medical management is approached",
        bullets: [
          "Non-opioid medications such as anti-inflammatories and neuropathic agents",
          "Targeted pharmacologic therapy based on the type of pain",
          "Infusion-based treatments for complex or refractory pain",
          "Coordination with primary care and other specialists",
          "A focus on minimizing reliance on opioids whenever possible",
        ],
      },
      {
        title: "How this fits into a broader treatment plan",
        bullets: [
          "Image-guided procedures such as nerve blocks, radiofrequency ablation, and injections when appropriate",
          "Rehabilitation and physiotherapy guidance",
          "Lifestyle and activity modification",
          "Ongoing follow-up and reassessment as symptoms change",
        ],
      },
      {
        title: "Goals of care",
        bullets: [
          "Reduce pain",
          "Improve function and mobility",
          "Enhance quality of life",
          "Create a treatment plan that is individualized and evidence-based",
        ],
      },
    ],
    relatedSlugs: [
      "nerve-blocks-diagnostic-injections",
      "epidural-injections",
      "radiofrequency-ablation",
    ],
  },
  {
    slug: "nerve-hydrodissection",
    title: "Nerve Hydrodissection",
    shortTitle: "Nerve Hydrodissection",
    eyebrow: "Ultrasound-Guided Treatment",
    description:
      "A minimally invasive ultrasound-guided procedure that uses saline and dextrose around a nerve to reduce irritation, pressure, and scar-related restriction.",
    metaDescription:
      "Learn how nerve hydrodissection works, what conditions it may help, what to expect after treatment, and when to contact the clinic.",
    cardSummary:
      "Useful when a nerve may be irritated, compressed, or tethered by surrounding tissue and a precise non-surgical procedure is being considered.",
    cardHighlights: [
      "Ultrasound-guided for accuracy",
      "Saline and dextrose injected around the nerve",
      "Quick recovery with short activity restrictions",
    ],
    quickFacts: [
      {
        label: "Image Guidance",
        value: "Ultrasound",
      },
      {
        label: "Injectate",
        value: "Saline and dextrose around the nerve",
      },
      {
        label: "Typical Recovery",
        value: "Avoid heavy activity for 24 to 48 hours",
      },
    ],
    intro: [
      "Nerve hydrodissection is a simple, minimally invasive procedure used to treat nerve pain. A small needle is used to place fluid around the nerve under ultrasound guidance.",
      "The fluid is intended to gently separate the nerve from surrounding tissue, reduce pressure, release scar tissue, and decrease pain and irritation.",
    ],
    sections: [
      {
        title: "Common treatment areas",
        cards: [
          {
            title: "Sciatic nerve",
            description:
              "Used for pain that travels from the lower back or buttock down the leg and may help relieve irritation contributing to sciatica.",
          },
          {
            title: "Median nerve",
            description:
              "Used for carpal tunnel symptoms such as numbness, tingling, or weakness in the hand and fingers, including patients hoping to avoid or delay surgery.",
          },
          {
            title: "Ulnar nerve",
            description:
              "Used for numbness or tingling in the ring and little fingers, pain along the inner forearm or hand, and symptoms related to cubital tunnel syndrome.",
          },
          {
            title: "Abdominal wall nerves",
            description:
              "Used for localized abdominal wall pain, including pain after surgery, injury, or strain.",
          },
        ],
      },
      {
        title: "What patients may notice afterward",
        bullets: [
          "Mild soreness or bruising at the injection site",
          "A feeling of fullness where the fluid was injected",
          "Temporary numbness or tingling",
          "Some patients feel better right away, while others improve gradually over several days to weeks",
        ],
      },
      {
        title: "Aftercare and recovery",
        bullets: [
          "Apply an ice pack for 10 to 15 minutes at a time",
          "Take acetaminophen (Tylenol) if needed",
          "Avoid heavy activity for 24 to 48 hours",
        ],
      },
      {
        title: "When to contact the clinic",
        tone: "alert",
        bullets: [
          "Increasing redness, swelling, or warmth",
          "Fever or chills",
          "Severe or worsening pain",
        ],
      },
      {
        title: "Why this procedure is considered",
        bullets: [
          "Minimally invasive and does not involve surgery",
          "Quick recovery",
          "Performed with ultrasound for accuracy",
          "May reduce pain and improve function",
        ],
      },
    ],
    relatedSlugs: [
      "nerve-blocks-diagnostic-injections",
      "radiofrequency-ablation",
      "advanced-specialized-procedures",
    ],
  },
  {
    slug: "nerve-blocks-diagnostic-injections",
    title: "Nerve Blocks & Diagnostic Injections",
    shortTitle: "Nerve Blocks & Diagnostic Injections",
    eyebrow: "Diagnosis And Targeted Relief",
    description:
      "Image-guided nerve blocks can help identify the source of pain, reduce inflammation, and guide the next step in treatment.",
    metaDescription:
      "Learn about nerve blocks, medial branch blocks, genicular nerve blocks, selective nerve root blocks, diagnostic injections, and what to expect afterward.",
    cardSummary:
      "Best for patients who need targeted diagnosis, short-term relief, or a clearer answer about which nerve or joint is driving symptoms.",
    cardHighlights: [
      "Diagnostic and therapeutic uses",
      "Ultrasound or fluoroscopy guidance",
      "Pain journal and activity testing matter after some injections",
    ],
    quickFacts: [
      {
        label: "Purpose",
        value: "Diagnostic, therapeutic, or both",
      },
      {
        label: "Image Guidance",
        value: "Ultrasound or fluoroscopy/X-ray",
      },
      {
        label: "Important Patient Role",
        value: "Track pain carefully and bring the journal to follow-up",
      },
    ],
    intro: [
      "Precision Care Centre performs a wide range of image-guided nerve blocks to diagnose and treat pain. These procedures are minimally invasive and are performed with ultrasound or fluoroscopy/X-ray to improve precision and safety.",
      "Some injections are used primarily to confirm the exact pain source. Others are used to reduce inflammation, interrupt pain signals, or guide decisions about treatments such as radiofrequency ablation.",
    ],
    sections: [
      {
        title: "Common procedures on this page",
        cards: [
          {
            title: "Medial branch blocks",
            description:
              "Used to diagnose and treat pain coming from the facet joints of the spine, especially in chronic neck pain and low back pain.",
          },
          {
            title: "Genicular nerve blocks",
            description:
              "Target nerves around the knee to assess and treat chronic knee pain, including pain after knee replacement.",
          },
          {
            title: "Peripheral nerve blocks",
            description:
              "Used for nerves in areas such as the shoulder, hip, ankle, and upper extremity for joint-related and nerve-related pain.",
          },
          {
            title: "Selective nerve root blocks",
            description:
              "Target a specific spinal nerve root to diagnose and treat radiating arm or leg pain, including radiculopathy and sciatica.",
          },
        ],
      },
      {
        title: "How diagnostic injections are interpreted",
        bullets: [
          "Short-term pain relief after the injection can help confirm the diagnosis",
          "Temporary pain relief may last a few hours to up to one day, depending on the medication used",
          "Pain often returns after the numbing medication wears off, which can still be useful diagnostically",
          "If you are given a pain journal, the clinic relies on your recorded response to help plan the next step",
        ],
      },
      {
        title: "Activity instructions after diagnostic injections",
        bullets: [
          "Stay active on the day of the procedure",
          "Perform activities that normally bring on the pain if you have been instructed to do so",
          "Bring the completed pain journal to the follow-up appointment",
        ],
      },
      {
        title: "What to expect after the procedure",
        bullets: [
          "Temporary numbness in the affected area",
          "Mild soreness at the injection site",
          "Immediate but short-term relief may occur in some cases",
          "Temporary weakness or heaviness in the limb may occur after selective nerve root blocks",
          "Do not drive on the day of the procedure if numbness or weakness is present",
        ],
      },
      {
        title: "Benefits and role in the treatment plan",
        bullets: [
          "Minimally invasive with quick recovery",
          "Performed with image guidance for accuracy and safety",
          "Can provide meaningful pain relief",
          "Helps accurately identify the source of pain",
          "Can guide further treatment, including radiofrequency ablation",
        ],
      },
      {
        title: "Risks and when to contact the clinic",
        tone: "alert",
        bullets: [
          "Pain, bruising, or swelling",
          "Temporary numbness or weakness",
          "Infection or bleeding, which are uncommon",
          "Very rare nerve injury or allergic reaction",
          "Seek medical attention for increasing redness, swelling, or warmth, fever or chills, severe or worsening pain, or new or worsening weakness",
        ],
      },
    ],
    relatedSlugs: [
      "radiofrequency-ablation",
      "epidural-injections",
      "nerve-hydrodissection",
    ],
  },
  {
    slug: "radiofrequency-ablation",
    title: "Radiofrequency Ablation (RFA)",
    shortTitle: "Radiofrequency Ablation",
    eyebrow: "Longer-Lasting Relief",
    description:
      "Radiofrequency ablation uses targeted heat to temporarily disrupt pain-transmitting nerves and is often considered after successful diagnostic blocks.",
    metaDescription:
      "Learn how radiofrequency ablation works, what conditions it is used for, what recovery looks like, and how long relief may last.",
    cardSummary:
      "A logical next step when diagnostic injections confirm the pain source and longer-lasting relief is being considered.",
    cardHighlights: [
      "Uses targeted heat to disrupt pain signals",
      "Commonly used for facet and chronic joint pain",
      "Relief may take weeks to build and months to last",
    ],
    quickFacts: [
      {
        label: "Primary Goal",
        value: "Longer-term pain relief",
      },
      {
        label: "Common Uses",
        value: "Facet joint pain, chronic knee pain, chronic joint pain",
      },
      {
        label: "Relief Timeline",
        value: "Full benefit is often seen by 4 weeks",
      },
    ],
    intro: [
      "Radiofrequency ablation is used to provide longer-term pain relief by applying targeted heat to the nerves that carry pain signals. The treatment is intended to temporarily disrupt those signals rather than permanently remove the nerve.",
      "At Precision Care Centre, radiofrequency ablation fits into a structured pathway. It is often considered after diagnostic injections have helped confirm the pain source.",
    ],
    sections: [
      {
        title: "When radiofrequency ablation is commonly used",
        bullets: [
          "Facet joint pain",
          "Chronic knee pain, including pain after knee replacement",
          "Chronic joint pain when other treatments have failed",
          "In selected situations, pulsed radiofrequency may be discussed when preserving nerve function is important",
        ],
      },
      {
        title: "What to expect after the procedure",
        bullets: [
          "Mild soreness, burning, or swelling",
          "A temporary increase in pain in some patients",
          "Pain relief may take up to 4 weeks",
          "Relief may last several months, depending on nerve regrowth",
        ],
      },
      {
        title: "Aftercare and activity",
        bullets: [
          "Apply ice packs for 10 to 15 minutes at a time",
          "Take acetaminophen (Tylenol) if needed",
          "Light activity the next day",
          "Gradual return to normal activity over 3 to 5 days",
          "Avoid strenuous activity for 1 week",
        ],
      },
      {
        title: "Risks and possible limitations",
        tone: "alert",
        bullets: [
          "Pain, bruising, or swelling",
          "Temporary numbness or weakness",
          "Infection or bleeding, which are uncommon",
          "Very rare nerve injury or allergic reaction",
          "Incomplete or temporary relief can still occur",
        ],
      },
    ],
    relatedSlugs: [
      "nerve-blocks-diagnostic-injections",
      "advanced-specialized-procedures",
      "arthritis-joint-injections",
    ],
  },
  {
    slug: "epidural-injections",
    title: "Epidural Injections",
    shortTitle: "Epidural Injections",
    eyebrow: "Targeted Spinal Nerve Relief",
    description:
      "Epidural injections place medication into the epidural space around the spine to reduce inflammation and relieve pain caused by irritated or inflamed spinal nerves.",
    metaDescription:
      "Learn about interlaminar, transforaminal, and caudal epidural injections, how they work, blood thinner instructions, and post-procedure recovery.",
    cardSummary:
      "Appropriate when irritated spinal nerves are contributing to arm or leg pain and a targeted or broad epidural approach is being considered.",
    cardHighlights: [
      "Fluoroscopy-guided placement",
      "Interlaminar, transforaminal, and caudal approaches",
      "Includes blood thinner and contrast allergy considerations",
    ],
    quickFacts: [
      {
        label: "Image Guidance",
        value: "Fluoroscopy/X-ray",
      },
      {
        label: "May Include",
        value: "Steroid, local anesthetic, and contrast dye",
      },
      {
        label: "Important Prep",
        value: "Review blood thinner and contrast dye instructions in advance",
      },
    ],
    intro: [
      "Epidural injections are used to treat pain caused by irritated or inflamed spinal nerves. Medication is placed into the epidural space around the spine using fluoroscopy/X-ray to help with accuracy and safety.",
      "Depending on the pain pattern and anatomy, the injection may be given from the middle of the back or neck, targeted to one nerve root, or placed through the sacral area near the tailbone for broader lower-spine coverage.",
    ],
    sections: [
      {
        title: "Types of epidural injections",
        cards: [
          {
            title: "Interlaminar epidural",
            description:
              "Placed from the middle of the back or neck so medication can spread more broadly around multiple nerves.",
          },
          {
            title: "Transforaminal epidural steroid injection",
            description:
              "Targets a specific nerve root more precisely and is often used for pain radiating into the arm or leg.",
          },
          {
            title: "Caudal epidural",
            description:
              "Placed near the tailbone in the sacral area to provide broader coverage of lower spinal nerves, often when prior surgery has caused scar tissue.",
          },
        ],
      },
      {
        title: "What is injected and why it matters",
        bullets: [
          "Steroid to reduce inflammation",
          "Local anesthetic for short-term pain relief",
          "Contrast dye to confirm accurate needle placement under imaging",
          "Tell the clinic if you have any allergy to contrast dye",
        ],
      },
      {
        title: "Common conditions treated",
        bullets: [
          "Sciatica or leg pain from nerve irritation",
          "Cervical radiculopathy or arm pain",
          "Herniated disc-related nerve pain",
          "Spinal stenosis",
          "Persistent pain after spine surgery",
        ],
      },
      {
        title: "Important preparation notes",
        tone: "muted",
        bullets: [
          "If you take blood thinners such as Apixaban, Rivaroxaban, Heparin, or Warfarin, timing matters before the procedure",
          "Cervical injections are listed as stopping 5 days before",
          "Lumbar interlaminar injections are listed as stopping 2 days before",
          "Always follow your physician's specific instructions before stopping any medication",
        ],
      },
      {
        title: "What to expect after the procedure",
        bullets: [
          "Mild soreness at the injection site",
          "Temporary numbness or weakness in the arms or legs",
          "Temporary tingling, especially with caudal injections",
          "Do not drive on the day of the procedure if numbness or weakness is present",
          "Pain may temporarily increase because of a steroid flare",
          "Relief typically begins in 2 to 7 days, but full effect may take up to 2 weeks",
          "Other temporary effects can include higher blood sugar, higher blood pressure, headache, dizziness, or nausea",
        ],
      },
      {
        title: "Benefits, aftercare, and alternatives",
        bullets: [
          "These procedures are minimally invasive and performed with image guidance for safety and accuracy",
          "They may reduce inflammation, relieve pain, improve function, and in some cases delay or avoid surgery",
          "Apply ice packs for 10 to 15 minutes at a time and take acetaminophen (Tylenol) if needed",
          "Avoid strenuous activity for 24 to 48 hours and gradually return to normal activity over a few days",
          "Alternatives can include medications, physiotherapy, activity modification, other injections, surgery in selected cases, or no treatment",
        ],
      },
      {
        title: "Rare but serious problems that need urgent attention",
        tone: "alert",
        bullets: [
          "Severe headache that gets worse when sitting or standing",
          "Significant or worsening weakness",
          "Loss of bowel or bladder control",
          "Severe or increasing pain",
        ],
      },
    ],
    relatedSlugs: [
      "nerve-blocks-diagnostic-injections",
      "chronic-pain-assessment-medical-management",
      "radiofrequency-ablation",
    ],
  },
  {
    slug: "arthritis-joint-injections",
    title: "Arthritis Joint Injections",
    shortTitle: "Arthritis Joint Injections",
    eyebrow: "Joint Pain And Inflammation",
    description:
      "Image-guided joint injections can reduce pain, calm inflammation, and improve mobility in arthritic or degenerative joints.",
    metaDescription:
      "Learn about corticosteroid, hyaluronic acid, and PRP joint injections for arthritis, including common joints treated, recovery, and risks.",
    cardSummary:
      "A good fit for patients with knee, shoulder, hip, or other joint pain when inflammation or degenerative change is limiting movement and comfort.",
    cardHighlights: [
      "Ultrasound or fluoroscopy-guided injection",
      "Steroid, hyaluronic acid, or selected PRP options",
      "Commonly used for knee, shoulder, and hip pain",
    ],
    quickFacts: [
      {
        label: "Image Guidance",
        value: "Ultrasound or fluoroscopy/X-ray",
      },
      {
        label: "Common Joints",
        value: "Knee, shoulder, hip, and other small or large joints",
      },
      {
        label: "Relief Timeline",
        value: "Often starts within days and may take up to 2 weeks",
      },
    ],
    intro: [
      "Arthritis injections are used to relieve joint pain and inflammation by placing medication directly into the affected joint. Image guidance is used for accuracy and safety.",
      "Depending on the treatment plan, injections may be used to reduce inflammation, improve lubrication, or support healing over time.",
    ],
    sections: [
      {
        title: "Injection options",
        cards: [
          {
            title: "Corticosteroid injection",
            description:
              "The most commonly used option. It reduces inflammation within the joint, helps relieve pain, and may improve mobility.",
          },
          {
            title: "Viscosupplementation",
            description:
              "Hyaluronic acid can help lubricate and cushion the joint, and may improve movement and reduce stiffness, especially in knee osteoarthritis.",
          },
          {
            title: "Platelet-rich plasma (PRP)",
            description:
              "Uses the patient's own blood to promote healing and may improve pain and joint function over time when appropriate at the clinic.",
          },
        ],
      },
      {
        title: "Common joints and conditions treated",
        bullets: [
          "Knee, shoulder, hip, and other small or large joints",
          "Osteoarthritis",
          "Degenerative joint disease",
          "Inflammatory joint pain",
          "Post-traumatic joint pain",
        ],
      },
      {
        title: "What is injected",
        bullets: [
          "Corticosteroid to reduce inflammation",
          "Local anesthetic for short-term pain relief and, in some cases, diagnostic information",
          "Hyaluronic acid to improve joint lubrication",
        ],
      },
      {
        title: "What to expect after the procedure",
        bullets: [
          "Mild soreness or swelling at the injection site",
          "Temporary increase in pain, sometimes called a steroid flare",
          "Temporary numbness from the local anesthetic",
          "Some patients notice relief within a few days",
          "Steroid injections typically work within 2 to 7 days and full benefit may take up to 2 weeks",
        ],
      },
      {
        title: "Aftercare and benefits",
        bullets: [
          "Apply ice packs for 10 to 15 minutes at a time",
          "Take acetaminophen (Tylenol) if needed",
          "Avoid strenuous activity for 24 to 48 hours and gradually return to normal activities",
          "These procedures are minimally invasive and may reduce pain, improve joint function, and help delay or avoid surgery",
        ],
      },
      {
        title: "Risks and when to contact the clinic",
        tone: "alert",
        bullets: [
          "Pain, swelling, bruising, infection, bleeding, allergic reaction, or incomplete relief",
          "Temporary increase in blood sugar, especially in patients with diabetes",
          "Rare skin changes or fat thinning at the injection site",
          "Seek medical attention for increasing redness, swelling, or warmth, fever or chills, severe or worsening pain, or difficulty moving the joint",
        ],
      },
      {
        title: "Alternatives",
        bullets: [
          "Medications",
          "Physiotherapy",
          "Activity modification",
          "Bracing or supports",
          "Surgery in selected cases",
          "No treatment",
        ],
      },
    ],
    relatedSlugs: [
      "radiofrequency-ablation",
      "advanced-specialized-procedures",
      "chronic-pain-assessment-medical-management",
    ],
  },
  {
    slug: "stellate-ganglion-block",
    title: "Stellate Ganglion Block (SGB)",
    shortTitle: "Stellate Ganglion Block",
    eyebrow: "Specialized Sympathetic Nerve Block",
    description:
      "A stellate ganglion block places local anesthetic near a nerve cluster in the neck to temporarily reduce sympathetic nerve activity.",
    metaDescription:
      "Learn about stellate ganglion block for PTSD, CRPS, hyperarousal, and anxiety, including evidence, risks, and post-procedure instructions.",
    cardSummary:
      "A specialized option for selected patients with PTSD-related hyperarousal, CRPS, anxiety, or related symptoms where sympathetic nerve activity may be part of the problem.",
    cardHighlights: [
      "Ultrasound-guided injection near the neck",
      "Often performed on the right side first",
      "Includes important off-label and safety discussion",
    ],
    quickFacts: [
      {
        label: "Image Guidance",
        value: "Ultrasound",
      },
      {
        label: "Common Uses",
        value: "PTSD, CRPS, hyperarousal, anxiety",
      },
      {
        label: "Important Note",
        value: "The PTSD application is described as off-label",
      },
    ],
    intro: [
      "A stellate ganglion block involves injecting local anesthetic into the stellate ganglion, a cluster of nerves in the neck. The goal is to temporarily block sympathetic nerve activity.",
      "The procedure is typically performed on the right side first. A later left-sided injection may be considered if needed. Ultrasound guidance is used for precision, and procedural sedation may be involved.",
    ],
    sections: [
      {
        title: "Symptoms and conditions it may help",
        bullets: [
          "Post-traumatic stress disorder (PTSD)",
          "Complex regional pain syndrome (CRPS)",
          "Hyperarousal",
          "Anxiety",
          "The intended result is often a reduction in hyperarousal and anxiety so the patient can better engage with other treatments such as psychotherapy and medication",
        ],
      },
      {
        title: "Expected benefits and treatment role",
        bullets: [
          "Reduction in PTSD symptoms",
          "Reduction in CRPS symptoms",
          "Rapid onset of symptom relief in some patients",
          "Potentially improved outcomes when combined with treatments such as psychotherapy",
        ],
      },
      {
        title: "Evidence and off-label use",
        tone: "muted",
        bullets: [
          "Clinical evidence has reported meaningful symptom improvement in selected patients",
          "Clinical trials, including Olmsted et al., 2019, are cited as showing meaningful improvement in PTSD symptoms",
          "Published outcomes and clinic materials describe positive responses in many treated patients",
          "This is considered an off-label treatment in this setting",
        ],
      },
      {
        title: "Temporary effects and rare risks",
        tone: "alert",
        bullets: [
          "Temporary Horner's syndrome with a droopy eyelid, constricted pupil, and red eye",
          "Hoarseness",
          "A lump-in-the-throat sensation",
          "Pain or redness at the injection site",
          "Temporary difficulty swallowing or speaking",
          "Rare side effects can include breathing changes, neck pain, hematoma, seizure from inadvertent intravascular uptake, or pneumothorax",
        ],
      },
      {
        title: "Aftercare and restrictions",
        bullets: [
          "Patients are monitored for 30 minutes after the procedure",
          "Avoid driving for 24 hours",
          "Have a support person present",
          "Use ice on the injection site if needed",
          "Avoid warm drinks until normal sensation returns",
          "Resume eating and drinking when the voice returns to normal",
        ],
      },
      {
        title: "Contraindications and alternatives",
        bullets: [
          "Tell the clinic if you have an allergy to local anesthetics such as bupivacaine or Sensorcaine",
          "Alternatives can include psychotherapy, pharmacological treatments such as SSRIs, and other PTSD interventions",
        ],
      },
      {
        title: "When to seek immediate medical attention",
        tone: "alert",
        bullets: [
          "Severe neck pain",
          "Difficulty breathing",
          "Persistent side effects that do not resolve as expected",
        ],
      },
    ],
    relatedSlugs: [
      "advanced-specialized-procedures",
      "chronic-pain-assessment-medical-management",
      "nerve-blocks-diagnostic-injections",
    ],
  },
  {
    slug: "advanced-specialized-procedures",
    title: "Advanced & Specialized Procedures",
    shortTitle: "Advanced & Specialized Procedures",
    eyebrow: "For Complex Pain Conditions",
    description:
      "These advanced image-guided procedures are considered for selected chronic or complex pain conditions when standard therapies are not enough.",
    metaDescription:
      "Review advanced pain procedures at Precision Care Centre, including pulsed radiofrequency, cryoablation, genicular artery embolization, vertebroplasty, and kyphoplasty.",
    cardSummary:
      "Advanced image-guided options for selected chronic or complex pain conditions when standard therapies have not provided enough relief.",
    cardHighlights: [
      "Advanced, minimally invasive interventions",
      "Image-guided planning and delivery",
      "Used when standard therapies are insufficient",
    ],
    quickFacts: [
      {
        label: "Best For",
        value: "Complex or chronic pain conditions needing advanced options",
      },
      {
        label: "Guidance",
        value: "Ultrasound or fluoroscopy/X-ray depending on the procedure",
      },
      {
        label: "Planning",
        value: "Candidacy, recovery, and risks vary by procedure",
      },
    ],
    intro: [
      "Precision Care Centre offers advanced, minimally invasive procedures for selected patients with complex or chronic pain conditions when standard therapies are not enough.",
      "These treatments are performed with image guidance, including ultrasound or fluoroscopy/X-ray, to support precision, safety, and targeted care. Because the procedures on this page are more specialized, candidacy and recovery planning are individualized.",
    ],
    sections: [
      {
        title: "Procedures covered on this page",
        cards: [
          {
            title: "Pulsed radiofrequency ablation",
            description:
              "A non-destructive treatment that uses controlled electrical energy to modulate nerve function and reduce pain without permanently damaging the nerve.",
          },
          {
            title: "Cryoablation (cryoneurolysis)",
            description:
              "Uses extreme cold to temporarily deactivate pain nerves and is commonly considered for peripheral nerve pain and post-surgical pain.",
          },
          {
            title: "Genicular artery embolization",
            description:
              "A minimally invasive option for knee osteoarthritis that works by reducing abnormal inflammation in the joint lining to relieve pain and improve function without surgery.",
          },
          {
            title: "Vertebroplasty and kyphoplasty",
            description:
              "Image-guided procedures for vertebral compression fractures in which medical cement is injected into the fractured bone to stabilize it, reduce pain, and improve mobility. Kyphoplasty may also restore some vertebral height.",
          },
        ],
      },
      {
        title: "Why these procedures may be considered",
        bullets: [
          "When the pain condition is complex or chronic",
          "When a more targeted minimally invasive option is needed",
          "When standard therapies have not provided enough relief",
          "When preserving function or avoiding surgery is an important goal",
        ],
      },
      {
        title: "Planning, recovery, and risk discussion",
        tone: "muted",
        bullets: [
          "Procedure-specific preparation, recovery expectations, aftercare, and risks vary across this group",
          "Your treating physician will review the exact technique, expected benefit, limitations, and safety considerations during consultation",
          "Image guidance is a key part of how these procedures are performed safely and precisely",
        ],
      },
      {
        title: "Alternatives and next steps",
        bullets: [
          "Assessment and medical management",
          "Other image-guided injections or nerve procedures",
          "Rehabilitation, physiotherapy, and activity modification",
          "Surgery in selected cases depending on the diagnosis",
        ],
      },
    ],
    relatedSlugs: [
      "radiofrequency-ablation",
      "arthritis-joint-injections",
      "stellate-ganglion-block",
    ],
  },
]

export const patientProcedureHubGroups = [
  {
    title: "Assessment & Planning",
    description:
      "Patients often start here when the pain source is not yet clear or when a full treatment plan needs to be built before choosing a procedure.",
    slugs: ["chronic-pain-assessment-medical-management"],
  },
  {
    title: "Nerve & Spine Procedures",
    description:
      "These pages explain procedures used to diagnose irritated nerves, reduce inflammation, and create a path toward more durable relief.",
    slugs: [
      "nerve-hydrodissection",
      "nerve-blocks-diagnostic-injections",
      "radiofrequency-ablation",
      "epidural-injections",
    ],
  },
  {
    title: "Joint & Specialized Care",
    description:
      "These treatments address joint pain, sympathetic nerve-related symptoms, and more complex pain conditions that may need advanced options.",
    slugs: [
      "arthritis-joint-injections",
      "stellate-ganglion-block",
      "advanced-specialized-procedures",
    ],
  },
]

export const patientProcedureSharedExpectations = [
  {
    title: "Assessment before intervention",
    description:
      "Procedures are part of a treatment pathway. History, examination, imaging, and prior response to treatment help determine what is appropriate.",
  },
  {
    title: "Image-guided precision",
    description:
      "Ultrasound or fluoroscopy/X-ray is used where appropriate to improve accuracy, support safety, and target the intended structure.",
  },
  {
    title: "Clear aftercare instructions",
    description:
      "Patients receive guidance about soreness, activity restrictions, medications such as acetaminophen, and when to contact the clinic.",
  },
  {
    title: "Follow-up matters",
    description:
      "Response to treatment helps shape the next step. In some cases, short-term relief from a diagnostic injection is a critical part of the diagnosis.",
  },
]

export const patientProcedureUrgentCareNotes = [
  "Increasing redness, swelling, or warmth",
  "Fever or chills",
  "Severe or worsening pain",
  "New or worsening weakness",
  "Loss of bowel or bladder control after spinal procedures",
]

export const getPatientProcedurePage = (slug: string) =>
  patientProcedurePages.find((page) => page.slug === slug)

export const getPatientProcedureHref = (slug: string) =>
  `/patient-procedures/${slug}`
