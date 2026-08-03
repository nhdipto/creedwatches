export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  content: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "five-watches-to-wear-in-2026",
    title: "Five Watches We'd Wear Every Day in 2026",
    excerpt:
      "From glacier-blue divers to slim GMTs — the five pieces our buyers keep coming back to, and the ones you should have on your wrist this year.",
    category: "Buying Guide",
    date: "Jan 18, 2026",
    readTime: "6 min read",
    image: "/images/products/product-06.jpg",
    author: "CREED Editorial",
    content: [
      "Every year we take the whole CREED catalogue and ask one simple question: if we could only wear five of these for the next twelve months, which ones would they be? The list below is the honest answer — no marketing, just the watches our team actually reaches for.",
      "The Seiko Prospex 'Save the Ocean' SPB297 makes the cut for its ice-blue glacier dial. Photographs never quite capture how the texture shifts as light moves across it. It is a diver, an everyday piece and a conversation starter all at once.",
      "Next is the Tissot PRX Powermatic 80. The integrated bracelet from the 1970s still looks futuristic, and an 80-hour power reserve means it survives the weekend untouched and keeps perfect time by Monday.",
      "The Longines Spirit Zulu Time is our travel pick. A true GMT on a ceramic bezel with an automatic movement — set it to home time and forget about it. It punches far above what its price tag suggests.",
      "Then there is the SEVENFRIDAY P3-02. It is loud, it is square, and it never fails to make the room look twice. For evenings and weekends, nothing else we stock has the same presence.",
      "Finally, the Zeyron Origin with its eastern numerals. It proves an automatic dress watch does not need to cost a fortune — and that one small dial detail can make a piece feel entirely personal. Those are our five. What would be on yours?",
    ],
  },
  {
    slug: "care-for-automatic-watch",
    title: "How to Care for Your Automatic Watch",
    excerpt:
      "An automatic movement is a tiny engine of gears and springs. Here's how to keep it winding, accurate and beautiful for decades.",
    category: "Care & Maintenance",
    date: "Jan 04, 2026",
    readTime: "4 min read",
    image: "/images/products/product-03.jpg",
    author: "CREED Editorial",
    content: [
      "An automatic watch does not run on batteries — it runs on you. Every swing of your wrist winds a mainspring, which stores energy and powers the movement. Leave it still for a few days and it simply stops, which is normal, not a fault.",
      "The single best thing you can do is wear it regularly. If you rotate watches, invest in a winder box or simply wind it manually once a week when you put it back on.",
      "Water resistance degrades as gaskets age. We recommend a pressure test every two years — any CREED store does this free. Never operate the crown or pushers while underwater.",
      "Magnetic fields are the quiet enemy of accuracy. Keep your watch away from phone speakers, fridge magnets and laptop stands. If it starts running fast, a demagnetiser fixes it in seconds.",
      "Finally, bring it in for a service every three to five years. It is the difference between a watch that lasts five years and one that outlives you.",
    ],
  },
  {
    slug: "eastern-numerals-story",
    title: "Eastern Numerals: The Dial Design Everyone's Asking About",
    excerpt:
      "Why the bold bangles-and-blocks numerals on the Zeyron dials have become the most photographed detail in our stores.",
    category: "Design",
    date: "Dec 21, 2025",
    readTime: "5 min read",
    image: "/images/products/product-01.jpg",
    author: "CREED Editorial",
    content: [
      "Walk past the Zeyron display in any CREED store and you will notice the same thing: people stop, lean in, and reach for their phones. The reason is the eastern numeral dial — a design language that swaps thin Roman or stick indices for bold, hand-painted bangles.",
      "Eastern numerals are a celebration of a region's own counting system, rendered large enough to read at a glance. On a 41mm case they become the entire personality of the watch: confident, graphic, unmistakably different from everything else on the shelf.",
      "The graphite 'Origin' pairs them with a black dial and automatic movement for a modern, urban feel. The aqua 'Rosabella' does the same in a slim 32mm case for a softer, daily look.",
      "Designers love the versatility — eastern numerals work with formal wear precisely because they refuse to be subtle. Collectors love the story. Both reasons explain why it is the first detail customers ask about at the counter.",
      "Whether you choose graphite or aqua, the takeaway is the same: a single design choice can make a watch feel like it was made for you.",
    ],
  },
  {
    slug: "gift-guide-couple-watches",
    title: "The 2025 Gift Guide: Couple Watches That Say It All",
    excerpt:
      "Matched pairs, matching moments. Our guide to choosing couple watches that both of you will actually wear.",
    category: "Gifting",
    date: "Dec 08, 2025",
    readTime: "4 min read",
    image: "/images/products/product-12.jpg",
    author: "CREED Editorial",
    content: [
      "There are few gifts as romantic as a pair of matching watches — two pieces that move through life in the same second. The secret to a good couple set is that it never looks identical to a child's toy set; it looks like two great watches that happen to belong together.",
      "Start with the size difference. Most couple sets pair a 40mm+ men's case with a 28–34mm ladies' case, so both pieces sit proportionally on the wrist. The Zeyron Origin & Rosabella set does exactly this, sharing the same aqua tones and steel bracelets.",
      "Consider how often the watches will be worn. For daily use, pick an automatic like the Zeyron set — a little romance in the mechanics too. For occasional evenings, a slim quartz pair like the classic Casio V007 keeps things effortless.",
      "Finally, make the moment count. CREED gift boxes include the set, a matching presentation case and our engraving service, so you can add initials before it ever reaches the wrapping paper.",
      "A couple watch is a small promise worn on the wrist — and it will still be ticking long after the anniversary candles burn down.",
    ],
  },
  {
    slug: "gshock-mudmaster-field-test",
    title: "Mudmaster Field Test: 30 Days in Real Life",
    excerpt:
      "We wore the GG-1000 everywhere — monsoon rides, construction sites and one very muddy football pitch. Here's what survived.",
    category: "Reviews",
    date: "Nov 26, 2025",
    readTime: "6 min read",
    image: "/images/products/product-02.jpg",
    author: "CREED Editorial",
    content: [
      "Before we put the Casio G-Shock Mudmaster GG-1000 on a wrist, we set ourselves a challenge: thirty days, no taking it off, no cleaning it. Whatever Dhaka's monsoon threw at it, the watch had to take too.",
      "Week one was the test everyone talks about — the mud resistance. G-Shock's double-layer case seals the crown and buttons behind interlocking guard structures, and the design genuinely worked. After a ride through standing water, the digital displays read perfectly.",
      "The analog-digital layout is the standout. A large analog face keeps it readable at a glance while the digital windows handle the triple-sensor data: compass, barometer, thermometer and a very useful altimeter for anyone who hikes.",
      "Comfort is where most tough watches fail and the Mudmaster succeeds. The 51.9mm case is huge on paper but the weight sits so low that it disappears on the wrist. By week three we forgot we were wearing it — the highest compliment a G-Shock can earn.",
      "After thirty days of abuse, the strap showed honest scuffs, the glass had zero scratches and accuracy never drifted more than a second a month. If you need one watch that survives everything, this is the one.",
    ],
  },
  {
    slug: "green-dial-rise",
    title: "Why Green Dials Are Everywhere Right Now",
    excerpt:
      "From olive to emerald, the colour that used to be rare is now the fastest-selling finish on our shelves. Here's the why.",
    category: "Trends",
    date: "Nov 12, 2025",
    readTime: "4 min read",
    image: "/images/products/product-11.jpg",
    author: "CREED Editorial",
    content: [
      "Green was once the least common dial colour in any watch case — a rarity reserved for military pieces and a handful of field watches. Today it is the finish our customers ask for by name, and stock moves out the door within days of landing.",
      "Part of the appeal is practicality. Green is a neutral that still has personality. It pairs as easily with a navy suit as with a weekend jacket, which makes it the easiest way to own a statement watch without committing to something you cannot wear daily.",
      "The shade matters as much as the colour itself. Olive works best on sportier pieces like the Casio Pro-Trek, where it nods to the original military field watches. Deeper forest or emerald tones flatter dress pieces and steel bracelets equally.",
      "There is also the collector's instinct: rarity. A green dial is still scarcer than black or silver, so it holds its value and its novelty far longer than the safe choices.",
      "Our advice is simple — if a green dial catches your eye in the display case, buy it when you see it. This trend does not show any sign of slowing, but the good pieces sell out first.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
