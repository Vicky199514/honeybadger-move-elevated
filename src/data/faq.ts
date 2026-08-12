export type FaqItem = { question: string; answer: string };

/**
 * Any answer that depends on policy we have not confirmed is marked
 * PLACEHOLDER — replace with your real terms before going live.
 */
export const faqs: FaqItem[] = [
  {
    question: "What fabric is used?",
    answer:
      "A 4-way stretch lycra blend, chosen for elasticity and a lightweight handfeel. PLACEHOLDER — exact composition and fabric weight to be confirmed.",
  },
  {
    question: "Does the track pant have stretch?",
    answer:
      "Yes. The fabric stretches in all four directions, so it moves with you instead of holding you back — through squats, strides or a long day of sitting and standing.",
  },
  {
    question: "What sizes are available?",
    answer: "S, M, L, XL and XXL. Detailed measurements are on the size guide page.",
  },
  {
    question: "How do I choose my size?",
    answer:
      "Measure your natural waist and compare it with the size guide. If you fall between two sizes, size up for a more relaxed fit.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Choose your colour and size, then tap Order on WhatsApp. Your product, colour, size and quantity are filled in automatically — send the message and we confirm the rest with you directly.",
  },
  {
    question: "Do you offer returns or exchanges?",
    answer: "PLACEHOLDER — return and exchange policy to be confirmed.",
  },
  {
    question: "How long does delivery take?",
    answer: "PLACEHOLDER — delivery timelines and shipping charges to be confirmed.",
  },
];
