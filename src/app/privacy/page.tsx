import { InfoPage } from "@/components/info-page";

export const metadata = {
  title: "Privacy Policy | CREED",
  description:
    "How CREED collects, uses and protects your personal information when you shop with us online or in store.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Your data, protected"
      title="Privacy Policy."
      intro="CREED takes your privacy seriously. This policy explains what we collect, why we collect it, and the choices you have."
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you place an order, we collect your name, phone number, delivery address, email and order details. When you contact our customer care team, we keep a record of that conversation so we can help you accurately.",
            "We do not collect payment card details — payments through bKash, Nagad or bank transfer are handled entirely by those providers.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your information to process and deliver orders, respond to enquiries, confirm warranty registrations, and — only if you opt in — send you news about new arrivals and promotions.",
            "We never sell your personal information to third parties. We share only what is necessary to deliver your order, such as your name, phone and address with our delivery partners.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You may ask us to correct, export or delete your personal data at any time by emailing care@creedwatches.com. You can unsubscribe from marketing messages at any time using the link in the email.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "Our website uses cookies to keep your shopping cart working and to remember preferences such as your language and currency. You can disable cookies in your browser, though some parts of the site may then not work correctly.",
          ],
        },
      ]}
    />
  );
}
