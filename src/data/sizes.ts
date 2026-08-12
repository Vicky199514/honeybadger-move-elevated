/**
 * Size chart — all values are PLACEHOLDERS.
 * Replace the numbers with your measured values (inches).
 */
export type SizeRow = {
  size: string;
  waist: string;
  length: string;
  fit: string;
};

export const sizeChart: SizeRow[] = [
  { size: "S", waist: "28–30 in", length: "38 in", fit: "Slim frame" },
  { size: "M", waist: "30–32 in", length: "39 in", fit: "Regular frame" },
  { size: "L", waist: "32–34 in", length: "40 in", fit: "Regular to broad" },
  { size: "XL", waist: "34–36 in", length: "41 in", fit: "Broad frame" },
  { size: "XXL", waist: "36–38 in", length: "42 in", fit: "Relaxed fit" },
];

export const measureSteps = [
  {
    title: "Waist",
    copy: "Measure around the narrowest part of your waist, keeping the tape level and not pulled tight.",
  },
  {
    title: "Length",
    copy: "Measure from the top of the waistband straight down to the ankle cuff along the outer leg.",
  },
  {
    title: "Between sizes?",
    copy: "The lycra blend has generous stretch. If you are between two sizes, size up for a relaxed fit.",
  },
];
