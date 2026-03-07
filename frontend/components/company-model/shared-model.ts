export const chapters = [
  {
    id: 'who-we-are',
    label: 'Who We Are',
    heading: 'Who We Are',
    body: [
      `We are a husband and wife who teamed up thirteen years ago, stepped into the jewelry industry, and never looked back. Our journey led us to gemstones — and we fell in love with that world.`,
      `Over the years, that love turned into deep, hands-on expertise. We regularly sort upwards of 25,000 carats of breakout gemstones, evaluating their recutting potential — and we have been doing it for over five years. That kind of volume builds a calibrated eye that is difficult to replicate in a classroom. Michael has been cutting for over seven years, with the capacity to cut several stones a week — not as production work, but as deliberate, focused practice that continuously sharpens his craft.`,
      `His facette machine is one of the best on the market, built specifically for commercial cutting. As his experience deepened, his niche came into focus: sapphires, emeralds, beryl, and tourmaline. His approach is not precision cutting — it is intentional cutting. Color orientation, total internal reflection, critical angle positioning, color-change and axis orientation, inclusion hiding, inclusion management. And perhaps most distinctively, an exceptional skill for weight retention — particularly in stones that need a recut or repolish, where every fraction of a carat matters.`,
      `Thirteen years of experience, thousands of stones, and one shared passion — it all culminates here. The gemstone cutting community is full of talented, dedicated people, and we are proud to be part of it. What we are building with this platform is not a departure from that community, but an extension of it — a new kind of access point for clients who have never had a clear way in, a new kind of resource for the cutters and dealers who already know this world well, and a new kind of service that puts the client at the center of the cutting experience.`,
    ],
    stat: { value: '13', label: 'Years in the industry' },
  },
  {
    id: 'what-we-do',
    label: 'What We Do',
    heading: 'What We Do',
    body: [
      `We offer custom gemstone cutting, recutting, and repolishing services — built around the individual stone and the individual client.`,
      `Every service begins with an estimate. We provide several paths to obtain one, each designed for a different level of access and commitment. We also offer the CCG Cut Feasibility Report, a professional structural evaluation available as a standalone product or bundled with any cutting service.`,
      `Our shop carries finished gemstones available for purchase, with flexible options including pay now, pay later, and direct negotiation through the Client Connect Portal.`,
    ],
    stat: null,
  },
  {
    id: 'clients',
    label: 'Who We Serve',
    heading: 'Who We Serve',
    body: [
      `For over six years, we have worked primarily with professionals in the jewelry industry — dealers, jewelers, and gemologists who understand the language of lapidary and need a reliable, communicative cutting partner.`,
      `We now offer a direct pipeline to non-industry clients: collectors, inheritors, curious owners — anyone who has a gemstone and a question. Whether you want to understand what you have, explore whether recutting is an option, or simply get an honest estimate, there is a path here for you.`,
      `You don't need to know the terminology. You don't need to be certain. You just need a stone and a question.`,
    ],
    stat: { value: '6+', label: 'Years serving trade professionals' },
  },
  {
    id: 'how',
    label: 'How We Do It',
    heading: 'How We Do It',
    body: [
      `We offer several distinct paths for clients to obtain an estimate. Each path is designed for a different level of commitment, information, and access — and each will yield a different estimate as a result.`,
      `Be careful when comparing our estimates with other companies. An instant estimate based on submitted information is not the same as an in-person estimate based on physical examination. We are transparent about this distinction so you always know what you're comparing.`,
      `We always recommend sending your gemstone in for an in-person estimate. It is the most accurate, the most personalized, and the most likely to reflect the real potential of your stone. But we understand that isn't always ideal — which is why we built every other path that comes before it.`,
      `We also offer several types of CCG Cut Feasibility Reports, designed for different clients and situations: resale documentation, second opinions for cutting houses, initial intake diagnostics, and pre-cut structural evaluations. Reports are objective — they never include estimates. But once a report is complete, an estimate will be provided separately on the work order.`,
    ],
    stat: { value: '4', label: 'Estimate paths available' },
    link: { label: 'Estimate Types', href: '/estimates' },
  },
  {
    id: 'why',
    label: 'Why We Do It',
    heading: 'Why We Do It',
    body: [
      `We see the disconnect.`,
      `Unless you are an experienced cutter, it can be difficult to understand all the nuances of what makes a gemstone worth cutting, recutting, or leaving alone. Gemology and cutting overlap far more than most people realize — many gemologists are cutters. But the reverse is rarer, because cutting stands on its own as a discipline. You cannot learn it from a book. There is no degree that makes you a cutter. The only qualification is doing it, repeatedly, for years.`,
      `And let's face it: we are all busy. There is always something more pressing than trying to understand the intricate complexities of a gem cutting situation. But that busy schedule doesn't eliminate the desire clients have to understand. It simply narrows the time available.`,
      `So we want to meet you somewhere you feel comfortable. Somewhere that doesn't force commitment, but still enforces communication. Wherever you are in the process — curious, cautious, or ready — there is a place for you here.`,
    ],
    stat: null,
  },
];

export type Chapter = typeof chapters[0];
