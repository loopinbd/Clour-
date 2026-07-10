import { AbsoluteFill, Audio, useCurrentFrame, spring } from "remotion";

export const ColorMixer = ({ colors }) => {
  const frame = useCurrentFrame();
  const fps = 30;
  const duration = 1800; // ৬০ সেকেন্ড (১ মিনিট)
  const outroStart = duration - (3 * fps); // শেষ ৩ সেকেন্ড (১৭১০ নম্বর ফ্রেম থেকে শুরু)

  // কালার মিক্সিংয়ের লিকুইড মুভমেন্ট অ্যানিমেশন লজিক
  const rotate = frame * 0.15;
  const scale = 1.1 + Math.sin(frame * 0.04) * 0.15;

  // শেষ ৩ সেকেন্ডে সাবস্ক্রাইব বাটনের পপ-আপ (Spring) অ্যানিমেশন
  const subscribePop = spring({
    frame: frame - outroStart,
    fps,
    config: { damping: 11, mass: 0.5 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      
      {/* ১. লিকুইড কালার মিক্সিং ব্যাকগ্রাউন্ড ইফেক্ট */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(${rotate}deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
          transform: `scale(${scale})`,
          filter: "blur(60px)", // লিকুইড ও স্মুথ ব্লেন্ডিং ইফেক্ট দেওয়ার জন্য
          opacity: 0.9,
        }}
      />

      {/* ২. স্যাটিসফাইং ব্যাকগ্রাউন্ড সাউন্ড (public/sounds/lofi.mp3 থেকে বাজবে) */}
      <Audio src="/sounds/lofi.mp3" volume={0.7} />

      {/* ৩. শেষ ৩ সেকেন্ডের "SUBSCRIBE NOW" আউটরো */}
      {frame >= outroStart && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)", // স্ক্রিনটা হালকা ডার্ক হবে
            backdropFilter: "blur(12px)", // ব্যাকগ্রাউন্ড ঝাপসা হবে
          }}
        >
          <div
            style={{
              transform: `scale(${subscribePop})`,
              backgroundColor: "#ef4444", // লাল বাটন
              color: "white",
              padding: "25px 55px",
              borderRadius: "25px",
              fontSize: "55px",
              fontWeight: "900",
              fontFamily: "system-ui, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "2px",
              boxShadow: "0 25px 60px rgba(239, 68, 68, 0.5)",
              border: "4px solid rgba(255,255,255,0.2)",
            }}
          >
            🚨 Subscribe Now
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
