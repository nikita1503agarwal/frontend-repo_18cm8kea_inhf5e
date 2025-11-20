import { useEffect, useRef } from "react";

export default function Marquee() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = null;
    let x = 0;
    const speed = 50; // px/sec
    function step(ts) {
      if (!start) start = ts;
      const dt = (ts - start) / 1000;
      start = ts;
      x -= speed * dt;
      if (Math.abs(x) >= el.scrollWidth / 2) x = 0;
      el.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(step);
    }
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  const brands = [
    "Aether", "Nimbus", "Orbit", "Flux", "Quark", "Pulse", "Halo", "Nova", "Blitz", "Vanta", "Echo", "Kairo"
  ];

  return (
    <div className="relative py-10 overflow-hidden bg-gradient-to-r from-slate-50 to-white border-y">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,.08),transparent_50%)]" />
      <div className="whitespace-nowrap" ref={ref}>
        <div className="inline-flex gap-10 px-10">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="text-sm text-slate-500/80">Trusted by {b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
