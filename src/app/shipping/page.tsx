import { InfoPage } from "@/components/info-page";

export const metadata = {
  title: "Shipping Information | CREED",
  description:
    "Nationwide delivery across all 64 districts of Bangladesh within 72 hours. Cash-free options include bKash, Nagad and bank transfer.",
};

export default function ShippingPage() {
  return (
    <InfoPage
      eyebrow="Delivered nationwide"
      title="Shipping Information."
      intro="From Dhaka to every corner of Bangladesh — we deliver to all 64 districts within 72 hours, with tracking on every order."
      sections={[
        {
          heading: "Delivery timeframes",
          body: [
            "Dhaka metro orders typically arrive within 12–24 hours. Outside Dhaka, delivery takes between 24–72 hours depending on your district.",
            "Every order ships from our Dhanmondi store, fully insured and packed in a padded CREED box. You will receive a tracking update by SMS and WhatsApp once it leaves us.",
          ],
        },
        {
          heading: "Delivery charges",
          body: [
            "Delivery within Dhaka is free for orders over Tk 5,000, and a flat Tk 120 otherwise. Nationwide delivery outside Dhaka is Tk 180 for the first item and Tk 60 for each additional item.",
            "On selected promotional drops and flash sales, delivery is free everywhere in Bangladesh.",
          ],
        },
        {
          heading: "Payment options",
          body: [
            "Pay securely with bKash or Nagad at checkout, or choose a bank transfer and we'll share our account details on confirmation. Cash on delivery is available for Dhaka metro orders on request.",
          ],
        },
        {
          heading: "Ordering abroad",
          body: [
            "We currently ship within Bangladesh only. International customers are welcome to place orders through our WhatsApp hotline, and we'll arrange a trusted courier quote at cost.",
          ],
        },
      ]}
    />
  );
}
