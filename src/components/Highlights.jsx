import { motion } from "framer-motion";
import { Sparkles, Zap, Lock, Truck, BadgePercent, CreditCard } from "lucide-react";

const items = [
  { icon: Sparkles, title: "Curated delight", text: "Handpicked products that feel premium without the premium price." },
  { icon: Zap, title: "Lightning checkout", text: "Go from cart to confirmed in seconds — no friction, no fuss." },
  { icon: Truck, title: "Fast delivery", text: "Nationwide shipping with real-time updates to your door." },
  { icon: BadgePercent, title: "Smart savings", text: "Coupons and bundles that actually save you money." },
  { icon: Lock, title: "Secure by design", text: "Bank‑grade encryption and PCI‑ready payments." },
  { icon: CreditCard, title: "Pay your way", text: "Cards, wallets, and one‑tap dummy or Stripe payments." },
];

export default function Highlights() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(2,6,23,.05),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="text-2xl md:text-3xl font-black text-slate-900 text-center">
          Why shoppers love us
        </motion.h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="group p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <it.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{it.title}</div>
                  <div className="text-sm text-slate-600 mt-1">{it.text}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
