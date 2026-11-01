export interface ProjectItem {
  name: string;
  tags: readonly [string, string];
  tagsJoined: string;
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
  imgAlt: string;
}

export interface WorkWithMeCard {
  iconName: "rocket" | "sparkles" | "zap";
  title: string;
  description: string;
}

export interface ServiceCard {
  title: string;
  items: readonly string[];
  href: string;
}

export interface AwardItem {
  title: string;
  meta: string;
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
  imgAlt: string;
}

export interface ClientLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface TestimonialItem {
  quote: string;
  renderedQuote: string;
  name: string;
  role: string;
  image: string;
  imgWidth: number;
  imgHeight: number;
  buttonAriaLabel: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  defaultOpen: boolean;
}

export interface SocialLinkItem {
  label: string;
  href: string;
  icon: string;
  width: number;
  height: number;
}

export interface ContactFieldItem {
  type: "text" | "email" | "phone";
  name: "name" | "email" | "subject" | "message" | "phone";
  label: string;
  required: boolean;
  defaultCountry?: string;
}

export const siteContent = {
  metadata: {
    title: "Johann - Creative Web Designer Portfolio Template",
    description:
      "A single-page portfolio template for creative web designers - award-winning work, services, testimonials, and client showcase, built with GSAP scroll animations.",
    og: {
      title: "Johann - Creative Web Designer Portfolio Template",
      description:
        "A single-page portfolio template for creative web designers - award-winning work, services, testimonials, and client showcase, built with GSAP scroll animations.",
      image: "/og-image.webp",
      imageWidth: 1280,
      imageHeight: 720,
      imageAlt: "Johann - Creative Web Designer Portfolio Template",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "Johann - Creative Web Designer Portfolio Template",
      description:
        "A single-page portfolio template for creative web designers - award-winning work, services, testimonials, and client showcase, built with GSAP scroll animations.",
      image: "/og-image.webp",
    },
  },

  header: {
    id: "header",
    logo: {
      src: "/johann.svg",
      alt: "Johann Logo",
      href: "/",
      width: 338,
      height: 172,
      intrinsicWidth: 445,
      intrinsicHeight: 77,
    },
    ctaButton: {
      text: "Get in Touch",
      href: "#",
    },
  },

  hero: {
    id: "hero",
    heading: "Visualise Your Mind in Motion",
    subcopyTop: "Award winning Designs",
    subcopyBottomLines: ["Creative", "Web Designer"] as const,
    portrait: {
      src: "/hero-bg-full-img.webp",
      alt: "hero-img",
      width: 1142,
      height: 1378,
    },
    marquee: {
      imgAlt: "portfolio-img",
      imgWidth: 700,
      imgHeight: 500,
      column1Desktop: [
        "/portfolio-img-1.webp",
        "/portfolio-img-3.webp",
        "/portfolio-img-1.webp",
        "/portfolio-img-3.webp",
      ] as const,
      column2Desktop: [
        "/portfolio-img-2.webp",
        "/portfolio-img-4.webp",
        "/portfolio-img-2.webp",
        "/portfolio-img-4.webp",
      ] as const,
      columnsTabletMobile: [
        "/portfolio-img-1.webp",
        "/portfolio-img-2.webp",
        "/portfolio-img-3.webp",
        "/portfolio-img-4.webp",
        "/portfolio-img-1.webp",
        "/portfolio-img-2.webp",
        "/portfolio-img-3.webp",
        "/portfolio-img-4.webp",
      ] as const,
    },
  },

  portfolio: {
    id: "portfolio",
    heading: "Award Winning Work",
    tagSeparator: "  \u2022  ", // Two spaces + bullet (U+2022) + two spaces
    projects: [
      {
        name: "Aur\u00e9 Studio",
        tags: ["Photography", "Art Direction"],
        tagsJoined: "Photography  \u2022  Art Direction",
        imgSrc: "/portfolio-img-1.webp",
        imgWidth: 800,
        imgHeight: 400,
        imgAlt: "portfolio-img",
      },
      {
        name: "Veloce",
        tags: ["Automotive", "Brand Experience"],
        tagsJoined: "Automotive  \u2022  Brand Experience",
        imgSrc: "/portfolio-img-2.webp",
        imgWidth: 800,
        imgHeight: 400,
        imgAlt: "portfolio-img",
      },
      {
        name: "Grain Studio",
        tags: ["Fashion", "Creative Direction"],
        tagsJoined: "Fashion  \u2022  Creative Direction",
        imgSrc: "/portfolio-img-3.webp",
        imgWidth: 800,
        imgHeight: 400,
        imgAlt: "portfolio-img",
      },
      {
        name: "Aether",
        tags: ["Architecture", "Digital Identity"],
        tagsJoined: "Architecture  \u2022  Digital Identity",
        imgSrc: "/portfolio-img-4.webp",
        imgWidth: 800,
        imgHeight: 400,
        imgAlt: "portfolio-img",
      },
    ] satisfies readonly ProjectItem[],
  },

  workWithMe: {
    id: "work-with-me",
    heading: "Why Work With Me?",
    subtitle: "Fast-track your Digital Projects",
    cards: [
      {
        iconName: "rocket",
        title: "Rapid Project Delivery",
        description:
          "Launch custom website projects into the real world in as little as 48 hours.",
      },
      {
        iconName: "sparkles",
        title: "Precision & Aesthetics",
        description:
          "Meticulous design craftsmanship that offers complete control over layouts, typography, and every interactive detail.",
      },
      {
        iconName: "zap",
        title: "Future-Proofed Designs",
        description:
          "Stay ahead of shifting trends with an approach that seamlessly integrates with the latest innovations in interactive design and user experience craft.",
      },
    ] satisfies readonly WorkWithMeCard[],
  },

  services: {
    id: "services",
    headingLines: ["Design That Speaks", "to Your Audience"] as const,
    headingFull: "Design That Speaks to Your Audience",
    intro:
      "My practice is focused on solving real-world digital challenges with thoughtful design thinking. Whether you need to refine brand identity, streamline user experience, or create memorable interactive moments, my approach provides creativity, clarity, and consistency for clients across industries.",
    cards: [
      {
        title: "Brand Identity",
        items: ["Visual Systems", "User Experience", "Motion Design", "Design Strategy"],
        href: "#",
      },
      {
        title: "Web Development",
        items: ["React", "Webflow Sites", "Shopify", "Custom Builds"],
        href: "#",
      },
      {
        title: "UI/UX Design",
        items: ["Wireframing", "Prototyping", "User Research", "Design Systems"],
        href: "#",
      },
      {
        title: "Motion & Animation",
        items: ["GSAP Animations", "Micro-interactions", "Scroll Effects", "Video Editing"],
        href: "#",
      },
      {
        title: "Brand Strategy",
        items: ["Market Research", "Positioning", "Naming", "Brand Guidelines"],
        href: "#",
      },
    ] satisfies readonly ServiceCard[],
  },

  awards: {
    id: "awards",
    headingLines: ["Awards and Industry", "Recognition"] as const,
    headingFull: "Awards and Industry Recognition",
    items: [
      {
        title: "Honorable Mention",
        meta: "2026 - AWWARDS",
        imgSrc: "/portfolio-img-1.webp",
        imgWidth: 600,
        imgHeight: 400,
        imgAlt: "awards-image",
      },
      {
        title: "Site of the Day",
        meta: "2026 - AWWARDS",
        imgSrc: "/portfolio-img-2.webp",
        imgWidth: 600,
        imgHeight: 400,
        imgAlt: "awards-image",
      },
      {
        title: "The Webby Awards",
        meta: "2026 - OFFICIAL SELECTION",
        imgSrc: "/portfolio-img-3.webp",
        imgWidth: 600,
        imgHeight: 400,
        imgAlt: "awards-image",
      },
      {
        title: "FWA",
        meta: "2026 - FWA OF THE DAY",
        imgSrc: "/portfolio-img-4.webp",
        imgWidth: 600,
        imgHeight: 400,
        imgAlt: "awards-image",
      },
    ] satisfies readonly AwardItem[],
  },

  clients: {
    id: "clientblur",
    heading: "Trusted by Founders and Creatives, Built for Ambitious Brands.",
    logos: [
      {
        src: "/clients-1.webp",
        alt: "Google logo",
        width: 157,
        height: 53,
      },
      {
        src: "/clients-2.webp",
        alt: "Adobe logo",
        width: 76,
        height: 66,
      },
      {
        src: "/clients-3.webp",
        alt: "JP logo",
        width: 212,
        height: 45,
      },
      {
        src: "/clients-4.webp",
        alt: "Pinterest logo",
        width: 243,
        height: 93,
      },
      {
        src: "/clients-5.webp",
        alt: "IBM logo",
        width: 137,
        height: 137,
      },
      {
        src: "/clients-6.webp",
        alt: "Intel logo",
        width: 132,
        height: 52,
      },
    ] satisfies readonly ClientLogo[],
  },

  testimonials: {
    id: "testimonials",
    heading: "Don't Take It from Us, Take It from Our Clients",
    quoteOpenChar: "\u201c", // Left Double Quotation Mark “
    quoteCloseChar: "\u201d", // Right Double Quotation Mark ”
    prevAriaLabel: "Previous testimonial",
    nextAriaLabel: "Next testimonial",
    items: [
      {
        quote:
          "Working with Elena completely transformed our brand's digital presence. Our conversions jumped by 87%. Her thoughtful design approach and seamless communication made the collaboration effortless. Elena doesn't just design websites, she gives your entire brand a confident new voice.",
        renderedQuote:
          "\u201cWorking with Elena completely transformed our brand's digital presence. Our conversions jumped by 87%. Her thoughtful design approach and seamless communication made the collaboration effortless. Elena doesn't just design websites, she gives your entire brand a confident new voice.\u201d",
        name: "Maria Jones",
        role: "Head of Marketing, Adobe",
        image: "/testimonial-1.webp",
        imgWidth: 324,
        imgHeight: 425,
        buttonAriaLabel: "Show testimonial from Maria Jones",
      },
      {
        quote:
          "Elena has an incredible eye for detail. She took a rough brand brief and turned it into a site that finally feels like us. Every scroll, every hover - it all just clicks, and our team barely had to explain what we wanted twice.",
        renderedQuote:
          "\u201cElena has an incredible eye for detail. She took a rough brand brief and turned it into a site that finally feels like us. Every scroll, every hover - it all just clicks, and our team barely had to explain what we wanted twice.\u201d",
        name: "Marcus Reed",
        role: "Founder, Northline Studio",
        image: "/testimonial-5.webp",
        imgWidth: 892,
        imgHeight: 1172,
        buttonAriaLabel: "Show testimonial from Marcus Reed",
      },
      {
        quote:
          "We came in with a tight deadline and a messy set of assets. Elena organized everything, proposed a direction we hadn't considered, and shipped a site that outperformed every launch benchmark we set for the quarter.",
        renderedQuote:
          "\u201cWe came in with a tight deadline and a messy set of assets. Elena organized everything, proposed a direction we hadn't considered, and shipped a site that outperformed every launch benchmark we set for the quarter.\u201d",
        name: "Priya Nair",
        role: "VP Growth, Fielder",
        image: "/testimonial-3.webp",
        imgWidth: 892,
        imgHeight: 1172,
        buttonAriaLabel: "Show testimonial from Priya Nair",
      },
      {
        quote:
          "The best part of working with Elena wasn't even the final product - it was how clearly she communicated trade-offs along the way. We always knew why a decision was made, and the result speaks for itself.",
        renderedQuote:
          "\u201cThe best part of working with Elena wasn't even the final product - it was how clearly she communicated trade-offs along the way. We always knew why a decision was made, and the result speaks for itself.\u201d",
        name: "Daniel Ortiz",
        role: "Creative Director, Wolfframe",
        image: "/testimonial-4.webp",
        imgWidth: 892,
        imgHeight: 1172,
        buttonAriaLabel: "Show testimonial from Daniel Ortiz",
      },
      {
        quote:
          "Our old site felt like a brochure. What Elena built feels like a product. Session time is up, bounce rate is down, and for the first time our design and our positioning actually agree with each other.",
        renderedQuote:
          "\u201cOur old site felt like a brochure. What Elena built feels like a product. Session time is up, bounce rate is down, and for the first time our design and our positioning actually agree with each other.\u201d",
        name: "Hannah Kim",
        role: "CEO, Loop & Co",
        image: "/testimonial-2.webp",
        imgWidth: 892,
        imgHeight: 1172,
        buttonAriaLabel: "Show testimonial from Hannah Kim",
      },
    ] satisfies readonly TestimonialItem[],
  },

  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "Who is Johann and what kind of projects do you take?",
        answer:
          "I am an independent digital designer who helps businesses create, launch, and optimize digital experiences seamlessly. I specialize in responsive web design, modern UX principles, and conversion-driven visual strategies while ensuring accessibility, performance, and refined aesthetics.",
        defaultOpen: true,
      },
      {
        question: "How quickly can you deliver a complete website for my business?",
        answer:
          "Most projects launch in as little as 48 hours for smaller sites, with larger multi-page builds typically wrapping within two to three weeks depending on scope, content readiness, and how many revision rounds are needed.",
        defaultOpen: false,
      },
      {
        question: "Do you work with existing design systems and content management platforms?",
        answer:
          "Yes - I regularly work inside established design systems and popular CMS platforms alike, adapting to whatever your team already has in place rather than forcing a rebuild from scratch.",
        defaultOpen: false,
      },
      {
        question: "What design standards do you follow consistently?",
        answer:
          "Every project follows WCAG accessibility guidelines, semantic markup, and performance budgets from day one, alongside a consistent typographic and spacing system so the final product feels cohesive across every screen.",
        defaultOpen: false,
      },
      {
        question: "How do you stay current with emerging design trends and innovations each year?",
        answer:
          "I dedicate time each month to hands-on experimentation with new interaction patterns, tooling, and frameworks, plus regular study of award-winning work, so the craft behind every project keeps pace with where the web is heading.",
        defaultOpen: false,
      },
    ] satisfies readonly FaqItem[],
  },

  footer: {
    id: "footer",
    bgImage: {
      src: "/footer-bg.svg",
      alt: "Footer Background",
      width: 1920,
      height: 900,
    },
    logo: {
      src: "/johann.svg",
      alt: "Johann Logo",
      width: 338,
      height: 172,
    },
    ctaHeading: "Ready to Bring Your Vision to Life?",
    ctaButtonText: "Get in Touch",
    reachOutHeading: "Reach Out",
    contact: {
      phone: {
        label: "+1 (415) 309-8274",
        href: "tel:+1 (415) 309-8274",
      },
      email: {
        label: "hello@johann.design",
        href: "mailto:hello@johann.design",
      },
    },
    socials: [
      {
        label: "Facebook",
        href: "#",
        icon: "/facebook.svg",
        width: 10,
        height: 19,
      },
      {
        label: "Instagram",
        href: "#",
        icon: "/instagram.svg",
        width: 21,
        height: 21,
      },
      {
        label: "LinkedIn",
        href: "#",
        icon: "/linkedIn.svg",
        width: 18,
        height: 18,
      },
      {
        label: "Twitter",
        href: "#",
        icon: "/twitter.svg",
        width: 17,
        height: 17,
      },
    ] satisfies readonly SocialLinkItem[],
    copyright: {
      prefix: "Copyright",
      symbol: "\u00a9",
      symbolHref: "https://vault.hyperiux.com/",
      suffix: "Johann Design 2026",
      fullText: "Copyright \u00a9 Johann Design 2026",
    },
    credit: {
      prefix: "By: ",
      name: "Hyperiux",
      href: "https://www.hyperiux.com/",
      fullText: "By: Hyperiux",
    },
  },

  modal: {
    titleId: "get-in-touch-modal-title",
    heading: "Get in Touch",
    subtitle: "Drop me a message",
    closeAriaLabel: "Close",
    submitLabel: "Send",
    fields: [
      {
        type: "text",
        name: "name",
        label: "Your Name*",
        required: true,
      },
      {
        type: "email",
        name: "email",
        label: "Email Address*",
        required: true,
      },
      {
        type: "text",
        name: "subject",
        label: "Subject*",
        required: true,
      },
      {
        type: "text",
        name: "message",
        label: "Your Message*",
        required: true,
      },
      {
        type: "phone",
        name: "phone",
        label: "Phone Number*",
        required: true,
        defaultCountry: "AE",
      },
    ] satisfies readonly ContactFieldItem[],
  },
} as const;

export type SiteContent = typeof siteContent;
export default siteContent;
