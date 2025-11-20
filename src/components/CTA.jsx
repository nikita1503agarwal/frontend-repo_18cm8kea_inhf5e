import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(2,6,23,.05),transparent_50%)]" />
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl border bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white p-10 md:p-14 overflow-hidden relative">
          <motion.div initial={{opacity:0, scale:.96}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{duration:.5}}>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight">Join 100k+ happy shoppers</h3>
            <p className="mt-3 text-slate-300 max-w-2xl">Get insider-only drops, early access, and coupons that actually matter. No spam. Unsubscribe anytime.</p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3">
              <input required type="email" placeholder="you@awesome.com" className="flex-1 rounded-xl bg-white text-slate-900 px-4 py-3 placeholder:text-slate-400" />
              <button className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-semibold shadow-emerald-500/30 shadow-lg transition">Get updates</button>
            </form>
          </motion.div>
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
