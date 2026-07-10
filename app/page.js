"use client";
import { useState } from "react";
import { Player } from "@remotion/player";
import { ColorMixer } from "../remotion/ColorMixer";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [colors, setColors] = useState(["#ff0055", "#00d2ff"]); // ডিফল্ট কালার কম্বিনেশন
  const [isDownloading, setIsDownloading] = useState(false);

  // অটো জেনারেট লজিক (বিভিন্ন আকর্ষণীয় কালার কম্বিনেশন)
  const handleAutoGenerate = () => {
    const presets = [
      { p: "✨ Neon Cyberpunk Liquid Splash", c: ["#00ffff", "#ff00ff"] },
      { p: "🏆 Royal Gold and Midnight Black Silk", c: ["#ffd700", "#111111"] },
      { p: "🧪 Toxic Mint Slime Blending", c: ["#00ff87", "#60efff"] },
      { p: "🌋 Sunset Lava Fluid Mixing", c: ["#ff512f", "#dd2476"] },
      { p: "🔮 Cosmic Purple and Mystic Blue Galaxy", c: ["#4e54c8", "#8f94fb"] },
      { p: "🌸 Pastel Pink and Matcha Green Cream", c: ["#ff9a9e", "#fecfef"] }
    ];
    const random = presets[Math.floor(Math.random() * presets.length)];
    setPrompt(random.p);
    setColors(random.c);
    setIsPlaying(true);
  };

  const handleGenerate = () => {
    if (!prompt) {
      alert("Please write a prompt first! (অথবা Auto Magic বাটনে ক্লিক করুন)");
      return;
    }
    setIsPlaying(true);
  };

  // গ্যালারিতে সরাসরি ডাউনলোডের লজিক
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ colors }),
      });
      const data = await response.json();
      if (data.success) {
        // ব্রাউজারে ফাইল ডাউনলোড ট্রিগার করা
        const link = document.createElement("a");
        link.href = data.url;
        link.setAttribute("download", "color-mixing-video.mp4");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        alert("ভিডিও তৈরি করতে সমস্যা হয়েছে!");
      }
    } catch (err) {
      console.error(err);
      alert("ডাউনলোড লিংকে সমস্যা দেখা দিয়েছে।");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
      {/* গ্লাস-মরফিজম মেইন কার্ড */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-2xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent mb-2">
          AI Color Mixing Studio
        </h1>
        <p className="text-zinc-400 text-sm mb-6">Create satisfying 1-minute color videos with automatic outros</p>

        {/* প্রম্পট ইনপুট বক্স */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your color mixing... (e.g., Deep red and neon blue liquid paint mixing together smoothly, 4k resolution)"
          className="w-full h-28 p-4 rounded-xl bg-zinc-900/80 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none mb-4 transition"
        />

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleGenerate}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 rounded-xl font-bold transition shadow-lg视觉 shadow-cyan-900/30"
          >
            🎬 Generate Video
          </button>
          <button
            onClick={handleAutoGenerate}
            className="bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold transition border border-zinc-700"
          >
            🎲 Auto Magic
          </button>
        </div>

        {/* Remotion Player - যেখানে ১ মিনিটের রিয়েল-টাইম ভিডিও জেনারেশন দেখা যাবে */}
        {isPlaying && (
          <div className="border-t border-white/10 pt-6 flex flex-col items-center animate-fade-in">
            <p className="text-xs text-zinc-400 mb-3 uppercase tracking-wider">Video Preview (1 Minute)</p>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full max-w-sm aspect-[9/16]">
              <Player
                component={ColorMixer}
                inputProps={{ colors }} 
                durationInFrames={1800} // ১ মিনিট (৩০ fps * ৬০ সেকেন্ড)
                fps={30}
                compositionWidth={1080} // 9:16 টিকটক/রিলস রেশিও
                compositionHeight={1920}
                style={{ width: "100%", height: "100%" }}
                controls
                loop
              />
            </div>
            
            {/* ডাউনলোড বাটন */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="mt-6 w-full max-w-sm bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-emerald-900/40 disabled:opacity-50"
            >
              {isDownloading ? "Preparing Video..." : "📥 Download to Gallery"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
  }
