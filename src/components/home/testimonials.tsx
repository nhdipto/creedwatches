import { SectionHeader } from "@/components/section-header";
import { StarIcon } from "@/components/icons";

interface Review {
  name: string;
  location: string;
  text: string;
  featured?: boolean;
}

const reviews: Review[] = [
  {
    name: "Rafi Ahmed",
    location: "Dhaka",
    text: "Ordered a G-Shock and it arrived in perfect condition, fully authenticated with warranty. The packaging was premium — exactly what a watch lover expects.",
    featured: true,
  },
  {
    name: "Nusrat Jahan",
    location: "Chattogram",
    text: "Bought a couple watch set for our anniversary. Beautiful curation, genuine pieces, and the team helped us pick the perfect pair.",
  },
  {
    name: "Tanvir Hasan",
    location: "Sylhet",
    text: "The Seiko Prospex I got is stunning. Price was the best I found anywhere, and the delivery reached my district in under 48 hours.",
  },
  {
    name: "Mehzabin Rahman",
    location: "Gulshan, Dhaka",
    text: "Visited the flagship showroom and the experience was outstanding. Knowledgeable staff, honest advice, and zero pressure to buy.",
    featured: true,
  },
  {
    name: "Arif Chowdhury",
    location: "Rajshahi",
    text: "Legit store — verified my Longines with the brand and everything checked out. Will definitely order again.",
  },
  {
    name: "Fariha Islam",
    location: "Khulna",
    text: "Loved the engraving service. Gave a gift that felt truly personal. The quality of service matches the quality of the watches.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-zinc-50 py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          eyebrow="5-star reviews"
          title="On The Wrist!"
          sub="Real words from collectors and first-timers across the country."
        />

        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="mb-6 break-inside-avoid border border-zinc-200 bg-white p-6"
            >
              <div className="flex gap-1 text-zinc-900" aria-label="Rated 5 out of 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-zinc-700">
                {review.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                <div>
                  <p className="text-sm font-semibold text-black">
                    {review.name}
                  </p>
                  <p className="text-xs text-zinc-400">{review.location}</p>
                </div>
                {review.featured && (
                  <span className="border border-zinc-900 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-900">
                    Verified
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
