import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ASSETS } from '../data';
import { Utensils, Star } from 'lucide-react';

const MENU_CATEGORIES = ['Veg Momo', 'Pizza', 'Burgers', 'Rolls', 'Sandwiches'] as const;
type Category = typeof MENU_CATEGORIES[number];

interface MenuItem {
  title: string;
  desc: string;
  img: string;
  tag?: 'VEG' | 'NON-VEG';
}

const VEG_MOMO: MenuItem[] = [
  { title: 'Classic Steamed Veg', desc: 'Thin-skin dumplings stuffed with fresh cabbage, carrots, and spring onions.', img: ASSETS.classicVeg },
  { title: 'Kurkure Paneer Momo', desc: 'Extra crunchy coating outside, spicy paneer filling inside. A fan favorite.', img: ASSETS.kurkureMenu },
];

const PIZZA: MenuItem[] = [
  { title: 'Margherita Pizza', desc: 'Classic cheese pizza with a crispy thin crust and tangy tomato sauce.', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop' },
  { title: 'Spicy Veggie Pizza', desc: 'Loaded with bell peppers, onions, olives, and a fiery peri peri drizzle.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop' },
];

const BURGERS: MenuItem[] = [
  { title: 'Crispy Veg Burger', desc: 'Crumb-fried patty with lettuce, tomato, and house special mayo.', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
  { title: 'Cheese Lava Burger', desc: 'Molten cheese core burger with caramelized onions and smoky sauce.', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop' },
];

const ROLLS: MenuItem[] = [
  { title: 'Paneer Tikka Roll', desc: 'Spicy grilled paneer wrapped in roomali roti with mint chutney.', img: 'https://thechutneylife.com/wp-content/uploads/2020/12/Paneerkatirolls-2-scaled.jpg' },
  { title: 'Egg Roll', desc: 'Spiced egg filling with crunchy onions and a squeeze of lime.', img: 'https://images.unsplash.com/photo-1562059390-a761a084768e?w=400&h=300&fit=crop', tag: 'NON-VEG' },
];

const SANDWICHES: MenuItem[] = [
  { title: 'Grilled Veg Sandwich', desc: 'Crispy grilled sandwich with fresh veggies and garlic butter.', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop' },
  { title: 'Club Sandwich', desc: 'Triple-layered with paneer, veggies, cheese, and herb mayo.', img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop' },
];

const SIDES: MenuItem[] = [
  { title: 'Peri Peri Fries', desc: 'Classic salted with a kick.', img: ASSETS.fries },
  { title: 'Aloo Tikki Burger', desc: 'Desi style with secret mayo.', img: ASSETS.burger },
  { title: 'Hazelnut Cold Coffee', desc: 'Thick, creamy & refreshing.', img: ASSETS.coffee },
];

const CATEGORY_DATA: Record<Category, { items: MenuItem[]; heading: string; sub: string; border: string; badge: 'VEG' | 'NON-VEG' }> = {
  'Veg Momo': { items: VEG_MOMO, heading: 'Veg Momo Special', sub: 'Freshly Steamed', border: 'border-spicy-red', badge: 'VEG' },
  'Pizza': { items: PIZZA, heading: 'Pizza', sub: 'Wood-Fired Style', border: 'border-spicy-red', badge: 'VEG' },
  'Burgers': { items: BURGERS, heading: 'Burgers', sub: 'Crispy & Juicy', border: 'border-momo-gold', badge: 'VEG' },
  'Rolls': { items: ROLLS, heading: 'Rolls', sub: 'Wrapped & Loaded', border: 'border-spicy-red', badge: 'VEG' },
  'Sandwiches': { items: SANDWICHES, heading: 'Sandwiches', sub: 'Grilled to Perfection', border: 'border-momo-gold', badge: 'VEG' },
};

export function Menu() {
  const [active, setActive] = useState<Category>('Veg Momo');
  const current = CATEGORY_DATA[active];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-20">
      <section className="relative h-[250px] sm:h-[400px] flex items-center overflow-hidden rounded-xl mb-8 mt-4">
        <img
          src={ASSETS.heroMenu}
          alt="Steaming Hot Momos"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 max-w-2xl px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline-xl text-headline-xl text-pure-white mb-4 uppercase italic"
          >
            BOLD FLAVORS.<br />
            <span className="text-spicy-red underline decoration-momo-gold">STREET VIBES.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-body-lg text-body-lg text-on-surface-variant"
          >
            The ultimate destination for authentic street soul food. Freshly prepared, fiercely flavored.
          </motion.p>
        </div>
      </section>

      <div className="sticky top-20 bg-deep-black z-40 py-4 border-b border-surface-variant overflow-x-auto no-scrollbar flex items-center gap-4 mb-12">
        {MENU_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-label-bold text-label-bold transition-all flex items-center gap-2 ${
              active === cat
                ? 'bg-momo-gold text-deep-black border border-momo-gold'
                : 'bg-charcoal-grey text-on-surface border border-momo-gold/30 hover:border-momo-gold'
            }`}
          >
            {cat === 'Veg Momo' && <Utensils className="w-4 h-4" />}
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-16">
          <AnimatePresence mode="wait">
            <motion.section
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className={`flex items-center justify-between mb-8 border-l-4 ${current.border} pl-4`}>
                <h2 className="font-headline-lg text-headline-lg text-pure-white">{current.heading}</h2>
                <span className="text-momo-gold font-label-bold">{current.sub}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {current.items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-charcoal-grey group rounded-xl p-4 transition-all duration-300 hover:bg-surface-container-high border border-transparent hover:border-momo-gold/20 relative overflow-hidden skew-hover"
                  >
                    <div className="h-48 rounded-lg overflow-hidden mb-4 bg-deep-black relative flex items-center justify-center">
                      {item.img ? (
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <span className="text-on-surface-variant font-body-md opacity-50">Image Coming Soon</span>
                      )}
                      <span className={`absolute top-2 left-2 ${(item.tag ?? current.badge) === 'NON-VEG' ? 'bg-red-600/90' : 'bg-green-600/90'} text-white text-[10px] px-2 py-0.5 rounded border border-momo-gold font-bold tracking-wider`}>
                        {(item.tag ?? current.badge) === 'NON-VEG' ? 'NON-VEG' : 'VEG'}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-pure-white tracking-tight mb-2">{item.title}</h3>
                    <p className="text-on-surface-variant font-body-md text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </AnimatePresence>

          <section className="pt-8 border-t border-surface-variant">
             <div className="flex items-center justify-between mb-8 border-l-4 border-momo-gold pl-4">
                <h2 className="font-headline-lg text-headline-lg text-pure-white">What People Say</h2>
                <div className="flex items-center gap-1 text-momo-gold hidden sm:flex">
                  <Star fill="currentColor" className="w-5 h-5"/>
                  <span className="font-label-bold">4.8/5 Rating</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { r: "Best momos in South Delhi! The thin skin and juicy filling are exactly what I was looking for.", a: "Rahul Sharma" },
                  { r: "The Schezwan Chicken is a must-try. Perfectly spicy and the urban vibe of the place is unmatched.", a: "Priya Kapoor" }
                ].map((testimonial, i) => (
                  <div key={i} className="bg-charcoal-grey p-6 rounded-2xl border border-surface-variant hover:border-momo-gold/30 transition-all">
                     <div className="flex text-momo-gold mb-4 gap-1">
                        {[...Array(5)].map((_,x)=><Star key={x} fill="currentColor" className="w-4 h-4"/>)}
                     </div>
                     <p className="text-on-surface font-body-md italic mb-4">"{testimonial.r}"</p>
                     <div className="font-label-bold text-spicy-red">- {testimonial.a}</div>
                  </div>
                ))}
              </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-low border border-momo-gold/20 rounded-2xl p-6">
            <h2 className="font-headline-md text-headline-md text-momo-gold mb-6 border-b border-momo-gold/20 pb-2">
              Sides & Quick Bites
            </h2>
            <div className="space-y-6">
              {SIDES.map((side) => (
                <div key={side.title} className="flex gap-4 group cursor-pointer">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={side.img}
                      alt={side.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-label-bold text-pure-white group-hover:text-spicy-red transition-colors">
                      {side.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant line-clamp-1">{side.desc}</p>

                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-transparent border-2 border-momo-gold text-momo-gold font-label-bold rounded-lg hover:bg-momo-gold hover:text-black transition-all uppercase active:scale-95">
              View All Sides
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
