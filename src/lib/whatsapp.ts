import { WHATSAPP_NUMBER, site } from "@/data/site";

export type WhatsAppOrder = {
  product?: string;
  pack?: string;
  colour?: string;
  size?: string;
  quantity?: number;
  payment?: string;
  total?: string;
  note?: string;
};

/** Keeps user-supplied values short and free of control characters. */
function clean(value: string, max = 120) {
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
}

/**
 * Builds a wa.me deep link with a pre-filled, human-readable order message.
 * Called from every CTA so the number lives in exactly one place.
 */
export function buildWhatsAppUrl(order: WhatsAppOrder = {}) {
  const lines = [`Hi ${site.name},`, ""];

  if (order.product) {
    lines.push("I would like to order:", "");
    lines.push(`Product: ${clean(order.product)}`);
    if (order.pack) lines.push(`Option: ${clean(order.pack, 40)}`);
    if (order.colour) lines.push(`Colour: ${clean(order.colour, 80)}`);
    if (order.size) lines.push(`Size: ${clean(order.size, 20)}`);
    lines.push(`Quantity: ${Math.min(Math.max(order.quantity ?? 1, 1), 99)}`);
    if (order.payment) lines.push(`Payment: ${clean(order.payment, 60)}`);
    if (order.total) lines.push(`Total: ${clean(order.total, 30)}`);
    lines.push("", "Please share the order details.");
  } else {
    lines.push(order.note ? clean(order.note, 300) : "I would like to know more about Honey Badger menswear.");
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
