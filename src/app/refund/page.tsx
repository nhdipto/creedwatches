import { InfoPage } from "@/components/info-page";

export const metadata = {
  title: "Refund Policy | CREED",
  description:
    "CREED's 7-day exchange and refund policy — unworn watches with original packaging can be exchanged or returned within a week of delivery.",
};

export default function RefundPage() {
  return (
    <InfoPage
      eyebrow="Shop with confidence"
      title="Refund & Exchange."
      intro="If something isn't right, we'll make it right. Our exchange and refund policy covers every watch sold in store and online."
      sections={[
        {
          heading: "7-day exchange",
          body: [
            "You may exchange an unworn watch within 7 days of delivery for a different model or size, provided it is in its original condition with all tags, papers and packaging intact.",
            "To start an exchange, message our customer care team with your order number. We'll arrange a return pickup or an in-store swap at either showroom.",
          ],
        },
        {
          heading: "Refunds",
          body: [
            "Refunds are issued to the same payment method used at purchase: bKash, Nagad or bank transfer. Refunds are processed within 3–5 business days after the returned watch passes our quality inspection.",
            "Courier charges are refundable only when the return is due to an error on our side — a damaged, incorrect or faulty item.",
          ],
        },
        {
          heading: "Warranty claims",
          body: [
            "Manufacturing defects covered by the manufacturer's warranty or CREED's 12-month store warranty are repaired at no cost. In the rare case a watch cannot be repaired, we will replace it or refund the purchase price.",
            "Warranty does not cover damage from accidents, water ingress beyond the rated resistance, or normal wear to the strap, glass or case.",
          ],
        },
        {
          heading: "Need help?",
          body: [
            "Contact care@creedwatches.com or call our hotline — we reply within store hours and typically resolve exchanges within two days.",
          ],
        },
      ]}
    />
  );
}
