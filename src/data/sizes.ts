/**
 * Size chart — waist values taken from the official Honey Badger fit guide.
 * Lengths are still to be confirmed.
 */
export type SizeRow = {
  size: string;
  waist: string;
  fit: string;
};

export const sizeChart: SizeRow[] = [
  { size: "M", waist: '30 in', fit: "Regular frame" },
  { size: "L", waist: '32 in', fit: "Regular to broad" },
  { size: "XL", waist: '34 in', fit: "Broad frame" },
  { size: "XXL", waist: '36–38 in', fit: "Relaxed fit" },
];

export const measureSteps = [
  {
    title: "Waist",
    copy: "Measure around the narrowest part of your waist, keeping the tape level and not pulled tight. Waist sizes are unstretched — the drawstring waistband adjusts either way.",
  },
  {
    title: "4-way stretch",
    copy: "The lycra stretches in all four directions, so each size comfortably covers a range around its listed waist measurement.",
  },
  {
    title: "Between sizes?",
    copy: "Size up for a relaxed fit, or stay on your usual size for a closer tapered line.",
  },
];
