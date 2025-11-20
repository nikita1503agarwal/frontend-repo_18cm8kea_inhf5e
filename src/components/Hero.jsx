import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

export default function Hero({ onCTAClick }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-blue-500/40 via-fuchsia-500/30 to-emerald-400/30 blur-3xl" />
        <div className="absolute top-20 -right-20 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-amber-400/40 to-pink-500/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,.15),transparent_35%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-20 pb-10 md:pt-28 md:pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/30 backdrop-blur px-3 py-1 text-xs text-slate-800 shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Just dropped: Spring Collection
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.7 }} className="mt-4 text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
            Shopping reinvented for humans who hate friction.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.7 }} className="mt-4 text-lg md:text-xl text-slate-600">
            ClickNCart — Smart shopping. Simplified. Discover products that spark joy, checkout in seconds, and love every tap.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.7 }} className="mt-8 flex flex-col sm:flex-row gap-3">
            <button onClick={onCTAClick} className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 hover:-translate-y-0.5 transition">
              Start shopping
            </button>
            <a href="#catalog" className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold border border-slate-200/70 hover:bg-slate-50 transition">
              Explore catalog
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }} className="mt-10 grid grid-cols-3 sm:grid-cols-6 gap-4 opacity-70">
            {[
              "Acme",
              "Nova",
              "Kairo",
              "Zenith",
              "Pulse",
              "Aster",
            ].map((b, i) => (
              <div key={i} className="text-center text-xs bg-white/50 backdrop-blur rounded-md py-2 border border-white/60">
                {b}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-3xl overflow-hidden border border-white/60 bg-white/50 backdrop-blur">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_60%_40%,rgba(99,102,241,.15),transparent_40%),radial-gradient(circle_at_30%_70%,rgba(16,185,129,.12),transparent_45%)]" />
          <div className="absolute inset-0">
            <Spline scene="https://prod.spline.design/FIw6tN6l2q3o2rQ3/scene.splinecode" />
          </div>
        </div>
      </div>
    </section>
  );
}
