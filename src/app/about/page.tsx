import { InfoPage } from "@/components/info-page";

export const metadata = {
  title: "About CREED | Premium Watch Retailer in Bangladesh",
  description:
    "CREED is a premium watch retailer in Dhaka carrying heritage brands and modern microbrands — authentic, original and backed by a store warranty.",
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="Our story"
      title="About CREED."
      intro="From a single display case to a two-store flagship — CREED exists to bring genuine, beautifully curated watches to the people of Bangladesh."
      sections={[
        {
          heading: "Why CREED?",
          body: [
            "The watch industry in Bangladesh has long been a gamble. Grey-market imports, missing papers, and prices that change depending on who you ask. CREED was founded to end that gamble — with every watch sourced directly from the brand or its authorised distributor, and every box opened, inspected and serialised by hand before it reaches the shelf.",
            "Our name says it all. We believe in authenticity the way a movement believes in a mainspring — it's not a feature, it's the reason we exist.",
          ],
        },
        {
          heading: "Our promise",
          body: [
            "Every watch at CREED is 100% original, carries the manufacturer's international warranty, and arrives with a CREED warranty card and serialised invoice. If a piece is ever found not to be genuine, we refund it in full — no questions asked.",
            "We also handle the parts most retailers skip: free strap sizing, in-store engraving, battery replacement for quartz models, and a service counter staffed by trained watchmakers.",
          ],
        },
        {
          heading: "The stores",
          body: [
            "Our Dhanmondi flagship opened in 2017 as a single shop inside Shimanto Shambhar. Today we run two showrooms in Dhaka — Dhanmondi and Gulshan — with more than a thousand watches on display and a nationwide delivery network covering all 64 districts within 72 hours.",
          ],
        },
        {
          heading: "Join the crew",
          body: [
            "Beyond the Dial is our editorial home — honest reviews, care guides and the stories behind the dials. Follow us on Facebook, Instagram and YouTube for new drops, restocks and store events.",
          ],
        },
      ]}
    />
  );
}
