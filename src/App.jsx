import { useEffect, useState } from "react";
import { apiGet, apiPost } from "./lib/api";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Marquee from "./components/Marquee";
import CTA from "./components/CTA";

function Header({ cartCount }) {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-white/60">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-black text-slate-900">ClickNCart</span>
          <span className="hidden sm:inline text-sm text-slate-500">Smart shopping. Simplified.</span>
        </a>
        <nav className="flex items-center gap-4 text-sm">
          <a href="#home" className="text-slate-700 hover:text-slate-900">Home</a>
          <a href="#catalog" className="text-slate-700 hover:text-slate-900">Shop</a>
          <a href="#cart" className="relative inline-flex items-center text-slate-700 hover:text-slate-900">
            <span>Cart</span>
            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-semibold bg-blue-600 text-white rounded-full">{cartCount}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function ProductCard({ p, onAdd }) {
  const price = p?.variants?.[0]?.price ?? 0;
  return (
    <div className="group border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      <img src={p.images?.[0] || "https://placehold.co/600x400"} alt={p.title} className="h-48 w-full object-cover"/>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{p.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2">{p.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold">${price}</span>
          <button onClick={() => onAdd(p)} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Add</button>
        </div>
      </div>
    </div>
  );
}

function Home({ onAdd }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    apiGet("/products?limit=8").then((d) => setProducts(d.items)).catch(() => setProducts([]));
  }, []);
  return (
    <section id="home" className="bg-gradient-to-b from-white to-slate-50">
      <Hero onCTAClick={() => {
        const el = document.querySelector('#catalog');
        el?.scrollIntoView({ behavior: 'smooth' });
      }} />
      <Marquee />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center">Featured this week</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} onAdd={onAdd} />
          ))}
        </div>
      </div>
      <Highlights />
      <CTA />
    </section>
  );
}

function Catalog({ onAdd }) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchItems = async () => {
    setLoading(true);
    try {
      const d = await apiGet(`/products?q=${encodeURIComponent(q)}`);
      setItems(d.items);
    } catch (e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchItems(); }, []);
  return (
    <section id="catalog" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search products" className="w-full border rounded-xl px-3 py-2"/>
          <button onClick={fetchItems} className="px-4 py-2 bg-slate-900 text-white rounded-xl">Search</button>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? Array.from({length:8}).map((_,i)=>(<div key={i} className="h-72 bg-slate-100 animate-pulse rounded-2xl"/>)) : items.map((p)=> (
            <ProductCard key={p.id} p={p} onAdd={onAdd}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cart({ cart, setCart }) {
  const totals = cart?.totals || { subtotal:0, discount:0, shipping:0, tax:0, total:0 };
  const updateQty = (idx, delta) => {
    const items = [...cart.items];
    items[idx].quantity = Math.max(1, items[idx].quantity + delta);
    setCart({ ...cart, items });
  };
  const sync = async () => {
    const d = await apiPost("/cart/update", { cart_key: cart.cart_key, items: cart.items, coupon_code: cart.coupon_code });
    setCart({ ...cart, totals: d.totals });
  };
  useEffect(()=>{ if(cart?.items) sync(); }, [cart.items?.length]);
  return (
    <section id="cart" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <div className="mt-4 divide-y">
            {cart.items?.map((it, i)=> (
              <div key={i} className="py-4 flex gap-4 items-center">
                <img src={it.image||"https://placehold.co/80"} className="w-20 h-20 object-cover rounded"/>
                <div className="flex-1">
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-slate-500">${it.price} • Qty {it.quantity}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>updateQty(i,-1)} className="px-2 py-1 border rounded">-</button>
                  <button onClick={()=>updateQty(i,1)} className="px-2 py-1 border rounded">+</button>
                </div>
              </div>
            ))}
            {(!cart.items || cart.items.length===0) && <p className="py-6 text-slate-500">Your cart is empty.</p>}
          </div>
          <button onClick={sync} className="mt-4 px-4 py-2 bg-slate-900 text-white rounded">Update</button>
        </div>
        <div>
          <h3 className="font-semibold">Summary</h3>
          <div className="mt-3 text-sm text-slate-700 space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>${totals.subtotal}</span></div>
            <div className="flex justify-between"><span>Discount</span><span>${totals.discount}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>${totals.shipping}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>${totals.tax}</span></div>
            <div className="pt-2 border-t flex justify-between font-bold"><span>Total</span><span>${totals.total}</span></div>
            <a href="#checkout" className="block mt-3 text-center px-4 py-2 bg-blue-600 text-white rounded">Checkout</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Checkout({ cart, setCart }) {
  const [email, setEmail] = useState("");
  const [addr, setAddr] = useState({ full_name:"", line1:"", city:"", state:"", postal_code:"", country:"US"});
  const [method, setMethod] = useState("standard");
  const [placing, setPlacing] = useState(false);
  const place = async () => {
    setPlacing(true);
    try {
      const d = await apiPost("/checkout", { cart_key: cart.cart_key, email, shipping_address: addr, shipping_method: method, payment_provider: "dummy" });
      alert(`Order placed! #${d.order_id}`);
      setCart({ cart_key: cart.cart_key, items: [], totals: { subtotal:0,discount:0,shipping:0,tax:0,total:0 } });
    } catch (e) { alert("Checkout failed"); }
    setPlacing(false);
  };
  return (
    <section id="checkout" className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold">Checkout</h2>
          <div className="mt-4 space-y-3">
            <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input className="w-full border rounded px-3 py-2" placeholder="Full name" value={addr.full_name} onChange={(e)=>setAddr({...addr, full_name:e.target.value})} />
            <input className="w-full border rounded px-3 py-2" placeholder="Address line 1" value={addr.line1} onChange={(e)=>setAddr({...addr, line1:e.target.value})} />
            <div className="grid grid-cols-2 gap-2">
              <input className="border rounded px-3 py-2" placeholder="City" value={addr.city} onChange={(e)=>setAddr({...addr, city:e.target.value})} />
              <input className="border rounded px-3 py-2" placeholder="State" value={addr.state} onChange={(e)=>setAddr({...addr, state:e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input className="border rounded px-3 py-2" placeholder="Postal code" value={addr.postal_code} onChange={(e)=>setAddr({...addr, postal_code:e.target.value})} />
              <select className="border rounded px-3 py-2" value={method} onChange={(e)=>setMethod(e.target.value)}>
                <option value="standard">Standard</option>
                <option value="express">Express</option>
              </select>
            </div>
            <button disabled={placing} onClick={place} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">Place order</button>
          </div>
        </div>
        <div>
          <div className="p-4 bg-slate-50 rounded border">
            <div className="font-semibold">Order Summary</div>
            <div className="mt-2 text-sm text-slate-700 space-y-1">
              <div className="flex justify-between"><span>Items</span><span>{cart.items?.length||0}</span></div>
              <div className="flex justify-between"><span>Total</span><span>${cart.totals?.total||0}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [cart, setCart] = useState({ cart_key: "guest-1", items: [], totals: { subtotal:0,discount:0,shipping:0,tax:0,total:0 } });
  const [count, setCount] = useState(0);
  useEffect(() => { apiPost("/dev/seed",{}).catch(()=>{}); }, []);
  useEffect(() => { setCount(cart.items?.reduce((a,b)=>a+b.quantity,0)||0); }, [cart]);

  const addToCart = async (p) => {
    const variant = p.variants?.[0];
    const item = { product_id: p.id, title: p.title, variant_sku: variant?.sku, quantity: 1, price: variant?.price || 0, image: p.images?.[0] };
    const newCart = { ...cart, items: [...(cart.items||[]), item] };
    setCart(newCart);
    try {
      await apiPost("/cart/update", { cart_key: newCart.cart_key, items: newCart.items, coupon_code: newCart.coupon_code });
      const fresh = await apiGet(`/cart?cart_key=${encodeURIComponent(newCart.cart_key)}`);
      setCart(fresh);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <Header cartCount={count} />
      <Home onAdd={addToCart} />
      <section id="catalog">
        <Catalog onAdd={addToCart} />
      </section>
      <Cart cart={cart} setCart={setCart} />
      <Checkout cart={cart} setCart={setCart} />
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-slate-600 flex items-center justify-between">
          <span>© {new Date().getFullYear()} ClickNCart</span>
          <span>Built for demo – secure checkout with Stripe optional</span>
        </div>
      </footer>
    </div>
  );
}
