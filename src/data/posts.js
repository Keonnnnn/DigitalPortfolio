import j1 from "../assets/j1.jpeg";
import j2 from "../assets/j2.jpeg";

export const posts = [
  {
    slug: "graduation-trip-mono-no-aware",
    title: "Graduation Trip — 物の哀れ",
    date: "2026-04-30",
    excerpt: "A reflection on the fleeting beauty of our graduation trip.",
    // Plain string used for reading time calculation
    content: `
Our graduation trip felt like mono no aware (物の哀れ), a quiet awareness that beauty exists because it does not last. The days were full in a simple way. Late-night meals, long walks, small jokes that stayed between us. Beneath it all, we understood that this chapter was drawing to a close.

It felt like an owari (終わり), but not a sudden one. More like something gently fading. We were still in it, yet already looking back. The moments we lived were becoming memories at the same time.

Now, what lingers most is kansha (感謝). Gratitude for the people who filled these past three years. We grew through challenges, looked after one another, and shared in each other's small and big victories. And soon, we will graduate together.

There is something else I keep coming back to. We paid for this ourselves. Every one of us earned it — through late nights studying, through internships where we showed up and did real work, through years of quietly proving ourselves. That effort made every meal and every moment mean a little more. I am proud of what we have each become, and proud that we got to celebrate it together like this.

Japan held space for all of us. There was shizen (自然), quiet and grounding. There was kaimono (買い物), busy and bright. There was good food, familiar laughter, and unplanned stops at Hard-Off. Somewhere in between, I lived some of the best days of my life.

And yet, I know how rare this is. Seven people moving as one will not be easy to gather again. Life will unfold in different directions. Schedules will drift. Priorities will change. Still, I carry a small hope — that one day, mata itsuka (またいつか), we will find our way back to one another and set out again.

More than anything, this trip drew us closer. In the quiet routines of living together, we came to know each other a little more. A journey is never just about where you go. It is about who walks beside you. And thanks to my friends, I know I will never walk alone.
    `,
    // Blocks drive the rendered layout — text paragraphs interleaved with images
    blocks: [
      { type: "text", value: "Our graduation trip felt like mono no aware (物の哀れ), a quiet awareness that beauty exists because it does not last. The days were full in a simple way. Late-night meals, long walks, small jokes that stayed between us. Beneath it all, we understood that this chapter was drawing to a close." },
      { type: "text", value: "It felt like an owari (終わり), but not a sudden one. More like something gently fading. We were still in it, yet already looking back. The moments we lived were becoming memories at the same time." },
      { type: "image", src: j1, alt: "A moment from the graduation trip in Japan" },
      { type: "text", value: "Now, what lingers most is kansha (感謝). Gratitude for the people who filled these past three years. We grew through challenges, looked after one another, and shared in each other's small and big victories. And soon, we will graduate together." },
      { type: "text", value: "There is something else I keep coming back to. We paid for this ourselves. Every one of us earned it — through late nights studying, through internships where we showed up and did real work, through years of quietly proving ourselves. That effort made every meal and every moment mean a little more. I am proud of what we have each become, and proud that we got to celebrate it together like this." },
      { type: "text", value: "Japan held space for all of us. There was shizen (自然), quiet and grounding. There was kaimono (買い物), busy and bright. There was good food, familiar laughter, and unplanned stops at Hard-Off. Somewhere in between, I lived some of the best days of my life." },
      { type: "image", src: j2, alt: "Another memory from the graduation trip" },
      { type: "text", value: "And yet, I know how rare this is. Seven people moving as one will not be easy to gather again. Life will unfold in different directions. Schedules will drift. Priorities will change. Still, I carry a small hope — that one day, mata itsuka (またいつか), we will find our way back to one another and set out again." },
      { type: "text", value: "More than anything, this trip drew us closer. In the quiet routines of living together, we came to know each other a little more. A journey is never just about where you go. It is about who walks beside you. And thanks to my friends, I know I will never walk alone." },
    ],
  },
];