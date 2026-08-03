import Link from "next/link";

export const metadata = {
  title: "Our Stores | CREED",
  description:
    "Visit CREED in person — Dhanmondi and Gulshan showrooms in Dhaka with full watch service counters, engraving and walk-in support.",
};

interface StoreLocation {
  name: string;
  tagline: string;
  address: string;
  area: string;
  phone: string;
  email: string;
  hours: { days: string; time: string }[];
  mapQuery: string;
  directions: string;
}

const stores: StoreLocation[] = [
  {
    name: "STORE 1 — DHANMONDI",
    tagline: "Flagship showroom & service counter",
    address:
      "Shimanto Shambhar Shopping Complex, Level-3, Shop 3100-3102, Dhanmondi 2, Dhaka 1205",
    area: "Dhanmondi, Dhaka",
    phone: "+880 1842-663432",
    email: "dhanmondi@creedwatches.com",
    hours: [
      { days: "Saturday – Thursday", time: "10:00 AM – 9:00 PM" },
      { days: "Friday", time: "3:00 PM – 9:00 PM" },
    ],
    mapQuery: "Shimanto Shambhar Shopping Complex, Dhanmondi, Dhaka",
    directions: "https://maps.google.com/?q=Shimanto+Shambhar+Shopping+Complex+Dhanmondi+Dhaka",
  },
  {
    name: "STORE 2 — GULSHAN",
    tagline: "Boutique & personal shopping",
    address:
      "Rangs FC Enclave, 8th Floor, Unit A, Plot 6/A, Road 32, Gulshan Avenue, Dhaka 1212",
    area: "Gulshan, Dhaka",
    phone: "+880 1332-114180",
    email: "gulshan@creedwatches.com",
    hours: [
      { days: "Saturday – Thursday", time: "10:00 AM – 9:00 PM" },
      { days: "Friday", time: "3:00 PM – 9:00 PM" },
    ],
    mapQuery: "Rangs FC Enclave, Gulshan Avenue, Dhaka",
    directions: "https://maps.google.com/?q=Rangs+FC+Enclave+Gulshan+Dhaka",
  },
];

function StoreCard({ store, index }: { store: StoreLocation; index: number }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}&output=embed`;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
          {store.area}
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-wide text-black sm:text-3xl">
          {store.name}
        </h2>
        <p className="mt-1 text-sm uppercase tracking-widest text-zinc-500">
          {store.tagline}
        </p>

        <dl className="mt-6 space-y-5">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Address
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-zinc-700">{store.address}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Opening Hours
            </dt>
            <dd className="mt-1 space-y-1">
              {store.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 text-sm text-zinc-700">
                  <span>{h.days}</span>
                  <span className="font-medium text-zinc-900">{h.time}</span>
                </div>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Phone
            </dt>
            <dd className="mt-1">
              <a href={`tel:${store.phone.replace(/\s+/g, "")}`} className="text-sm text-zinc-700 hover:text-black">
                {store.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Email
            </dt>
            <dd className="mt-1">
              <a href={`mailto:${store.email}`} className="text-sm text-zinc-700 hover:text-black">
                {store.email}
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={store.directions}
            target="_blank"
            rel="noreferrer"
            className="bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
          >
            Get directions
          </a>
          <a
            href={`tel:${store.phone.replace(/\s+/g, "")}`}
            className="border border-zinc-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            Call the store
          </a>
        </div>
      </div>

      <div className={index % 2 === 1 ? "lg:order-1" : ""}>
        <iframe
          src={mapSrc}
          title={`Map for ${store.name}`}
          loading="lazy"
          className="h-72 w-full border border-zinc-200 grayscale lg:h-full lg:min-h-[420px]"
        />
      </div>
    </div>
  );
}

export default function StoresPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
          Visit us in person
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-black sm:text-5xl">
          Our Stores.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          Two showrooms in Dhaka — with full watch service counters, free strap sizing,
          engraving and walk-in support. Come say hello, we always keep the coffee on.
        </p>
      </div>

      <div className="mt-14 space-y-16">
        {stores.map((store, i) => (
          <StoreCard key={store.name} store={store} index={i} />
        ))}
      </div>

      <div className="mt-16 border border-zinc-200 bg-zinc-50 p-6 text-center sm:p-8">
        <p className="font-display text-xl font-semibold text-black">
          Planning a visit from outside Dhaka?
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600">
          Call ahead and we&apos;ll hold a piece at the counter for you, prepare your sizing,
          and have everything gift-wrapped before you arrive.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
          >
            Contact us
          </Link>
          <Link
            href="/shop"
            className="border border-zinc-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            Shop online
          </Link>
        </div>
      </div>
    </div>
  );
}
