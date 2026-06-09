import { motion } from 'motion/react';
import { UtensilsCrossed, Award, Zap, ArrowRight, Star, Quote, MapPin, Phone, Mail, Navigation } from 'lucide-react';
import { ASSETS } from '../data';
import { useNavigate } from 'react-router-dom';

export function Home({ onOpenReview }: { onOpenReview?: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-deep-black -mt-20 md:-mt-24 px-6 pt-20 md:pt-24">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-transparent to-deep-black z-10"></div>
          <img
            src={ASSETS.heroHome}
            alt="Vibrant urban night market"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-1 bg-spicy-red/10 border border-spicy-red/30 rounded-full">
              <span className="text-spicy-red font-label-bold text-label-bold tracking-widest uppercase">
                The Original Hype
              </span>
            </div>
            <h1 className="text-headline-xl font-headline-xl text-pure-white uppercase italic">
              BOLD FLAVORS.<br />
              <span className="text-momo-gold">STREET VIBES.</span>
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-md">
              The ultimate destination for authentic street soul food in South Delhi. Experience the crunch,
              the spice, and the gold standard of momos.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/menu')}
                className="bg-spicy-red text-pure-white px-10 py-4 rounded-full font-headline-md text-headline-md active:scale-95 transition-all shadow-xl shadow-spicy-red/30 flex items-center gap-2 hover:bg-red-700"
              >
                View Menu <UtensilsCrossed className="w-6 h-6" />
              </button>
              <button
                onClick={onOpenReview}
                className="border-2 border-momo-gold text-momo-gold px-10 py-4 rounded-full font-headline-md text-headline-md active:scale-95 transition-all hover:bg-momo-gold hover:text-deep-black"
              >
                Submit Review
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-momo-gold/10 blur-3xl rounded-full translate-y-10"></div>
            <img
              src={ASSETS.mascot}
              alt="Hype Mascot"
              className="relative z-10 w-full max-w-xs sm:max-w-lg mx-auto drop-shadow-[0_20px_50px_rgba(255,186,117,0.3)]"
            />
            <motion.img
              src={ASSETS.logo}
              alt="Hype Momo Logo"
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 0.15, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 w-20 sm:w-32 h-auto object-contain z-0 pointer-events-none"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-16 bg-charcoal-grey relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-momo-gold/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-headline-lg font-headline-lg text-pure-white uppercase italic tracking-tighter">
              Why <span className="text-spicy-red">Hype Momo?</span>
            </h2>
            <div className="h-1 w-24 bg-momo-gold mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award fill="currentColor" className="w-10 h-10 text-spicy-red" />,
                title: 'Premium Quality',
                desc: 'We source only the finest ingredients, ensuring every bite is a gold-standard culinary experience.',
                bgClass: 'bg-spicy-red/10',
                scale: false,
              },
              {
                icon: <UtensilsCrossed fill="currentColor" className="w-10 h-10 text-momo-gold" />,
                title: 'Freshly Prepared',
                desc: 'No frozen shortcuts. Every momo is handcrafted and steamed to perfection just for your order.',
                bgClass: 'bg-momo-gold/10',
                scale: true,
              },
              {
                icon: <Zap fill="currentColor" className="w-10 h-10 text-spicy-red" />,
                title: 'Hype Speed',
                desc: 'Our delivery system is as fast as the urban heat. Fresh, hot food at your doorstep in record time.',
                bgClass: 'bg-spicy-red/10',
                scale: false,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 rounded-xl bg-deep-black border border-momo-gold/20 hover:border-spicy-red/50 transition-all group ${
                  feature.scale ? 'lg:scale-105 shadow-2xl shadow-spicy-red/5' : ''
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.bgClass}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-headline-md font-headline-md text-momo-gold mb-4 uppercase">
                  {feature.title}
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Section */}
      <section className="py-10 sm:py-16 bg-deep-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-pure-white uppercase italic">
                The <span className="text-momo-gold">Signature</span> Hype
              </h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">
                The crowd favorites that define our kitchen.
              </p>
            </div>
            <button
              onClick={() => navigate('/menu')}
              className="text-spicy-red font-label-bold text-label-bold flex items-center gap-2 hover:underline uppercase"
            >
              Explore Full Menu <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: 'Kurkure Paneer Momos',
                desc: 'Our top seller. Ultra-crunchy outer layer with a melt-in-mouth spiced paneer filling.',
                img: ASSETS.kurkureHome,
                tag: 'VEG',
              },
              {
                title: 'Chicken Momos',
                desc: 'Juicy chicken filling wrapped in delicate steamed momo dough, served with spicy dip.',
                img: ASSETS.panFriedHome,
                tag: 'NON-VEG',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="group relative bg-charcoal-grey rounded-2xl overflow-hidden flex flex-col md:flex-row items-center food-card-hover border border-momo-gold/10 hover:border-momo-gold/40 transition-all"
              >
                <div className="w-full md:w-1/2 h-64 overflow-hidden p-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-xl food-img transition-transform duration-500"
                  />
                </div>
                <div className="w-full md:w-1/2 p-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-headline-md font-headline-md text-pure-white uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <div className={`border ${item.tag === 'NON-VEG' ? 'border-red-500' : 'border-green-500'} p-0.5 rounded-sm`}>
                      <div className={`w-2 h-2 ${item.tag === 'NON-VEG' ? 'bg-red-500' : 'bg-green-500'} rounded-full`}></div>
                    </div>
                  </div>
                  <p className="text-body-md font-body-md text-on-surface-variant">{item.desc}</p>
                    <div className="mt-6">
                    <span className={`font-body-md ${item.tag === 'NON-VEG' ? 'text-red-500' : 'text-on-surface-variant'}`}>{item.tag === 'NON-VEG' ? 'NON-VEG' : 'VEG'}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 sm:py-16 bg-charcoal-grey">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-headline-lg font-headline-lg text-pure-white uppercase italic">
              Hype From <span className="text-spicy-red">The Streets</span>
            </h2>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" className="w-6 h-6 text-momo-gold" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Best Kurkure Momos in South Delhi, period. The crunch is real and the chutney is lethal. Definitely lives up to the hype!",
                initials: 'RK',
                name: 'Rahul Kapoor',
                sub: 'Local Guide • 5 Stars',
                border: 'border-spicy-red',
                iconColor: 'text-momo-gold/20',
                bgInitial: 'bg-momo-gold/20 text-momo-gold',
              },
              {
                quote: "I order from here twice a week. The Paneer Momos are consistently fresh and piping hot. Hype Speed delivery indeed!",
                initials: 'SS',
                name: 'Sneha Sharma',
                sub: 'Foodie • 5 Stars',
                border: 'border-momo-gold',
                iconColor: 'text-spicy-red/20',
                bgInitial: 'bg-spicy-red/20 text-spicy-red',
              },
              {
                quote: "The urban vibe of this place is amazing. Great food, great price, and the best mood. Good Food, Good Mood is true.",
                initials: 'AV',
                name: 'Arjun Varma',
                sub: 'Student • 4.8 Stars',
                border: 'border-spicy-red',
                iconColor: 'text-momo-gold/20',
                bgInitial: 'bg-momo-gold/20 text-momo-gold',
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-deep-black p-8 rounded-xl border-l-4 ${review.border} relative shadow-lg`}
              >
                <Quote fill="currentColor" className={`absolute top-4 right-4 w-12 h-12 ${review.iconColor} rotate-180`} />
                <p className="text-body-lg font-body-lg text-on-surface italic mb-6">"{review.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${review.bgInitial}`}>
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-label-bold font-label-bold text-pure-white">{review.name}</p>
                    <p className="text-xs text-on-surface-variant">{review.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 sm:py-16 bg-deep-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none grid grid-cols-12 h-full">
          <div className="border-r border-momo-gold h-full"></div>
          <div className="border-r border-momo-gold h-full"></div>
          <div className="border-r border-momo-gold h-full"></div>
          <div className="border-r border-momo-gold h-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-pure-white uppercase italic">
                Find The <span className="text-momo-gold">Heat</span>
              </h2>
              <div className="h-1 w-20 bg-spicy-red rounded-full mt-4"></div>
              <p className="text-body-md font-body-md text-on-surface-variant mt-4">Come visit us or order online — we're always ready to serve.</p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 group">
                <MapPin className="text-spicy-red w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-label-bold font-label-bold text-momo-gold uppercase">Address</p>
                  <a href="https://www.google.com/maps?q=28.530908584594727,77.31458282470703" target="_blank" rel="noopener noreferrer" className="text-body-lg font-body-lg text-on-surface hover:text-momo-gold transition-colors">
                    B-1/547 J J Colony, Phase-1, Madanpur Khadar, South Delhi - 110076
                  </a>
                </div>
              </div>
              <div className="flex gap-4 group">
                <Phone className="text-spicy-red w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-label-bold font-label-bold text-momo-gold uppercase">Contact</p>
                  <a href="tel:+919315795638" className="text-body-lg font-body-lg text-on-surface hover:text-momo-gold transition-colors">+91 9315795638</a>
                </div>
              </div>
              <div className="flex gap-4 group">
                <Mail className="text-spicy-red w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-label-bold font-label-bold text-momo-gold uppercase">Email</p>
                  <a href="mailto:momoshype@gmail.com" className="text-body-lg font-body-lg text-on-surface hover:text-momo-gold transition-colors">momoshype@gmail.com</a>
                </div>
              </div>
            </div>

            <a href="https://www.google.com/maps/dir/?api=1&destination=28.530908584594727,77.31458282470703" target="_blank" rel="noopener noreferrer" className="inline-flex bg-momo-gold text-deep-black px-10 py-4 rounded-full font-headline-md text-headline-md font-bold active:scale-95 transition-all hover:bg-pure-white items-center gap-2 shadow-lg shadow-momo-gold/20 hover:shadow-momo-gold/40">
              Get Directions <Navigation className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="h-[400px] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-momo-gold/30 relative">
            <iframe
              src="https://www.google.com/maps?q=28.530908584594727,77.31458282470703&output=embed"
              className="w-full h-full pointer-events-none"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a href="https://www.google.com/maps?q=28.530908584594727,77.31458282470703" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
