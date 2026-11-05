import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// ⬇️ টিম মেম্বারদের ছবি ইমপোর্ট
import majharul from "@/assets/team/majharul.jpg";
import minhaj from "@/assets/team/minhaj.jpg";
import niazur from "@/assets/team/niazur.jpg";
import manimatus from "@/assets/team/manimatus.jpg";
import srabanti from "@/assets/team/srabanti.jpg";

export const Route = createFileRoute("/presentation")({
  head: () => ({
    meta: [{ title: "Presentation — Student Management System" }],
  }),
  component: Deck,
});

/* ════════ TEAM DATA ════════ */
const TEAM = [
  { name: "মাঝারুল ইসলাম", roll: "৮৭৮৬৫৬", role: "টিম লিড + ব্যাকএন্ড", img: majharul, pos: "object-top" },
  { name: "মিনহাজ হোসেন", roll: "৮৭৮৬৬৮", role: "ফ্রন্টএন্ড: অথ ও ড্যাশবোর্ড", img: minhaj, pos: "object-[center_20%]" },
  { name: "নিয়াজুর রহমান", roll: "৮৭৮৬৭২", role: "ফ্রন্টএন্ড: স্টুডেন্ট ও ডিপার্টমেন্ট", img: niazur, pos: "object-center" },
  { name: "মনিমাতুস সাদিয়া", roll: "৮৭৮৬৭৪", role: "ফ্রন্টএন্ড: অ্যাটেনডেন্স ও রেজাল্ট", img: manimatus, pos: "object-top" },
  { name: "স্রাবন্তী রানী দাস", roll: "৮৭৮৬৭৫", role: "ইউআই/ইউএক্স + প্রেজেন্টেশন + কিউএ", img: srabanti, pos: "object-[center_30%]" },
];

/* ════════ 10 SLIDES (নতুন ফিচারসহ আপডেট করা) ════════ */
const SLIDES = [
  { 
    kicker: "ফেনী সরকারি পলিটেকনিক ইনস্টিটিউট", 
    title: "স্টুডেন্ট ম্যানেজমেন্ট সিস্টেম", 
    points: [
      "প্রজেক্ট: স্টুডেন্ট ম্যানেজমেন্ট সিস্টেম ওয়েবসাইট",
      "০৫ জনের টিম · কম্পিউটার সায়েন্স অ্যান্ড টেকনোলজি বিভাগ",
      "প্রজেক্ট টিম - ১১"
    ] 
  },
  { kicker: "সমস্যা", title: "কাগজে রেকর্ড রাখলে শিক্ষার্থীর তথ্য\nখুঁজে পাওয়া ও ম্যানেজ করা কঠিন", points: ["কাগজের রেকর্ড ধীরগতির এবং ভুল হওয়ার সম্ভাবনা বেশি", "উপস্থিতি এবং মার্কস আলাদা আলাদা রেজিস্টারে থাকে", "শিক্ষার্থীরা সহজে তাদের নিজেদের তথ্য দেখতে পারে না"] },
  { kicker: "কেন এটি গুরুত্বপূর্ণ", title: "একটি ওয়েবসাইট, তিনটি রোল,\nস্পষ্ট দায়িত্ব", points: ["অ্যাডমিন — শিক্ষার্থীর রেকর্ড, নোটিশ ও ফি ম্যানেজমেন্ট", "শিক্ষক — উপস্থিতি এবং মার্কস এন্ট্রি করা", "শিক্ষার্থী — নিজের প্রোফাইল, উপস্থিতি, ফলাফল ও ফি দেখা"] },
  { kicker: "সমাধান", title: "একটি ড্যাশবোর্ড সমস্ত শিক্ষার্থীর\nস্পষ্ট ধারণা দেয়", points: ["মোট শিক্ষার্থী · বিভাগ · পাসের হার", "বিভাগ অনুযায়ী শিক্ষার্থীদের চার্ট", "শিক্ষার্থীরা এর পরিবর্তে নিজেদের প্রোফাইল দেখে"] },
  { kicker: "শিক্ষার্থীর রেকর্ড", title: "সহজে শিক্ষার্থীর রেকর্ড\nযোগ, সম্পাদনা, মুছে ফেলা এবং খোঁজা", points: ["অ্যাডমিন শিক্ষার্থীর বিস্তারিত যোগ বা সম্পাদনা করতে পারে", "নাম, রোল, বিভাগ, সেমিস্টার দিয়ে খোঁজা", "ডুপ্লিকেট রোল স্বয়ংক্রিয়ভাবে ব্লক করা হয়"] },
  { kicker: "প্রধান ফিচারসমূহ", title: "উপস্থিতি, ফলাফল, ফি এবং\nনোটিশ বোর্ড", points: ["শিক্ষক দিন দিন উপস্থিতি মার্ক করেন এবং মার্কস দেন", "BTEB স্কেল অনুযায়ী অটোমেটিক গ্রেড ও জিপিএ হিসাব", "শিক্ষার্থীরা নিজেদের ফি স্ট্যাটাস দেখতে ও পরিশোধ করতে পারে", "ইনস্টিটিউটের জন্য নোটিশ বোর্ড"] },
  { kicker: "লাইভ ডেমো", title: "চলুন এটি লাইভ দেখি", points: ["অ্যাডমিন হিসেবে লগইন → স্টুডেন্ট, নোটিশ ও ফি যোগ করুন", "উপস্থিতি মার্ক করুন → একটি ফলাফল যোগ করুন", "শিক্ষার্থী হিসেবে লগইন → জিপিএ, নোটিশ ও ফি চেক করুন"] },
  { kicker: "প্রযুক্তি", title: "React এবং Cloud Database\n(Supabase) দিয়ে তৈরি", points: ["React + TanStack Start + Tailwind CSS", "ব্যাকএন্ড ও ডেটাবেজ: Supabase (PostgreSQL)", "ডেটা এখন ক্লাউডে সেভ হয়, যা সব ডিভাইসে দেখা যায়"] },
  { kicker: "আমাদের টিম", title: "টিম মেম্বার", points: [] },
  { kicker: "ধন্যবাদ", title: "ধন্যবাদ!\nপ্রশ্ন ও পরামর্শ", points: ["পরবর্তী পদক্ষেপ: আরও অ্যাডভান্স ফিচার যোগ করা", "সুরক্ষিত অথেনটিকেশন (JWT) এবং ব্যাকআপ", "কোনটি আগে করা উচিত: ফি পেমেন্ট গেটওয়ে, নাকি ট্রান্সক্রিপ্ট জেনারেশন?"] },
];

function Deck() {
  const [i, setI] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // কিবোর্ড দিয়ে স্লাইড চেঞ্জ করার ইভেন্ট
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (["ArrowRight", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        setI((x) => Math.min(x + 1, SLIDES.length - 1));
      }
      if (["ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        setI((x) => Math.max(x - 1, 0));
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  // ভিডিও অটোপ্লে করার জন্য ইফেক্ট
  useEffect(() => {
    if (i === 9 && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
    }
  }, [i]);

  const s = SLIDES[i]!;
  const isTitleOrEnd = i === 0 || i === SLIDES.length - 1;
  const isTeamSlide = i === 8;
  const isLastSlide = i === 9;

  return (
    <div className="h-screen flex flex-col bg-[#0b1118] overflow-hidden">
      
      {/* Top Bar */}
      <div className="flex gap-2 p-3 items-center bg-sidebar text-sidebar-foreground flex-shrink-0 z-50">
        <Button asChild variant="secondary" size="sm">
          <Link to="/dashboard">Back to Website</Link>
        </Button>
        <span className="text-sm font-mono ml-4">{i + 1} / {SLIDES.length}</span>
        
        <Button size="sm" variant="secondary" className="ml-auto" onClick={() => setI(Math.max(i - 1, 0))}>← Prev</Button>
        <Button size="sm" variant="secondary" onClick={() => setI(Math.min(i + 1, SLIDES.length - 1))}>Next →</Button>
        <Button size="sm" onClick={() => box.current?.requestFullscreen()}>Present Fullscreen</Button>
      </div>

      {/* Slide Area (Auto Fit 16:9) */}
      <div className="relative flex-1 flex items-center justify-center p-4">
        <div 
          ref={box}
          className="relative w-full max-w-[1600px] aspect-video bg-[#02140D] text-primary-foreground shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden border border-[#1A3A2A]"
        >
          {/* ─── Team Slide Special Layout ─── */}
          {isTeamSlide ? (
            <div className="h-full w-full flex flex-col items-center justify-center relative p-[4%]">
             <h1 className="text-[3.5vw] font-display font-bold text-gold mb-[5%] tracking-widest text-center">টিম মেম্বার</h1>
             <div className="flex gap-[2%] justify-center items-start w-full z-10">
               {TEAM.map((member, idx) => (
                 <div key={idx} className="flex flex-col items-center w-[18%]">
                   <div className="w-[10vw] h-[10vw] rounded-full border-4 border-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.2)] mb-[10%] overflow-hidden bg-primary/20">
                     <img 
                       src={member.img} 
                       alt={member.name} 
                       className={`w-full h-full object-cover ${member.pos}`}
                     />
                   </div>
                   <div className="text-center">
                     <div className="text-[1.2vw] font-bold text-white mb-1 leading-tight">{member.name}</div>
                     <div className="text-[1.2vw] font-bold text-gold mb-1">{member.roll}</div>
                     <div className="text-[0.8vw] text-gray-300/80 uppercase">{member.role}</div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
          ) : (
            /* ─── Other Slides Standard Layout ─── */
            <div className={`p-[6%] h-full flex ${isLastSlide ? "flex-row items-center gap-12" : "flex-col justify-center"}`}>
              
              <div className={isLastSlide ? "flex-1" : "w-full"}>
                <div className="text-[1.5vw] text-gold tracking-widest uppercase mb-4">{s.kicker}</div>
                <h1 className={`${isTitleOrEnd ? "text-[4.5vw]" : "text-[3.5vw]"} font-bold whitespace-pre-line leading-tight`}>
                  {s.title}
                </h1>
                {s.points.length > 0 && (
                  <ul className="mt-[5%] space-y-[2%]">
                    {s.points.map((p, idx) => (
                      <li key={idx} className="text-[1.8vw] flex gap-4 text-gray-200">
                        <span className="text-gold">■</span> {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ⬇️ ডান পাশের ভিডিও (অটোপ্লে) ⬇️ */}
              {isLastSlide && (
                <div className="flex-1 h-[75%] rounded-2xl overflow-hidden border-2 border-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.2)] bg-black relative">
                  <video 
                    ref={videoRef}
                    src="/my-video.mp4" 
                    autoPlay
                    muted
                    controls 
                    loop 
                    playsInline
                    className="w-full h-full object-contain" 
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Footer */}
          <div className="absolute bottom-4 right-8 text-[0.9vw] text-gray-400 opacity-70">
            FGPI · স্টুডেন্ট ম্যানেজমেন্ট সিস্টেম · {i + 1} / {SLIDES.length}
          </div>
        </div>
      </div>
    </div>
  );
}