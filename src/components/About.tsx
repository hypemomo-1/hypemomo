import { motion } from 'motion/react';
import { Award, Users, Clock, Heart, Quote, Sparkles, Target, Eye } from 'lucide-react';
import { ASSETS } from '../data';

export function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-deep-black -mt-20 md:-mt-24 px-6 pt-20 md:pt-24">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-transparent to-deep-black z-10"></div>
          <img
            src={ASSETS.heroHome}
            alt="Hype Momo kitchen"
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
            <div className="inline-block px-4 py-1 bg-momo-gold/10 border border-momo-gold/30 rounded-full">
              <span className="text-momo-gold font-label-bold text-label-bold tracking-widest uppercase">
                Our Story
              </span>
            </div>
            <h1 className="text-headline-xl font-headline-xl text-pure-white uppercase italic">
              MORE THAN<br />
              <span className="text-spicy-red">JUST MOMOS.</span>
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-md">
              From a tiny kitchen in South Delhi to the city's most talked-about street food brand.
              This is the story of Hype Momo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 bg-spicy-red/10 blur-3xl rounded-full translate-y-10"></div>
            <img
              src={ASSETS.mascot}
              alt="Hype Mascot"
              className="relative z-10 w-full max-w-lg mx-auto drop-shadow-[0_20px_50px_rgba(237,28,36,0.3)]"
            />
            <motion.img
              src={ASSETS.logo}
              alt="Hype Momo Logo"
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 0.15, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="absolute -top-8 -right-8 w-32 h-auto object-contain z-0 pointer-events-none"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative bg-charcoal-grey py-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-momo-gold/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '15+', label: 'Signature Dishes', icon: <Award className="w-6 h-6 text-momo-gold" /> },
            { number: '10K+', label: 'Happy Customers', icon: <Users className="w-6 h-6 text-spicy-red" /> },
            { number: '3+', label: 'Years of Hype', icon: <Clock className="w-6 h-6 text-momo-gold" /> },
            { number: '4.8', label: 'Rating on Google', icon: <Star className="w-6 h-6 text-spicy-red" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-headline-lg font-headline-lg text-pure-white font-black">{stat.number}</div>
              <div className="text-label-bold font-label-bold text-on-surface-variant uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-20 bg-deep-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-headline-lg font-headline-lg text-pure-white uppercase italic">
                Where It <span className="text-momo-gold">All Began</span>
              </h2>
              <div className="h-1 w-20 bg-spicy-red rounded-full"></div>
              <p className="text-body-lg font-body-lg text-on-surface-variant">
                Hype Momo was born in a modest kitchen in Madanpur Khadar, South Delhi, with one simple belief —
                that great food doesn't need a fancy address. It needs passion, quality ingredients, and a whole lot of spice.
              </p>
              <p className="text-body-md font-body-md text-on-surface-variant">
                What started as a small delivery-only experiment quickly became a local sensation. Word spread.
                The orders piled up. Soon, we weren't just making momos — we were building a movement.
              </p>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Today, Hype Momo is the go-to destination for anyone craving bold, authentic street food in South Delhi.
                Every momo is handcrafted, every sauce is made from scratch, and every order comes with a side of hype.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-momo-gold/5 blur-3xl rounded-full"></div>
              <div className="relative bg-charcoal-grey rounded-2xl p-8 border border-momo-gold/20 space-y-6">
                <Quote fill="currentColor" className="w-10 h-10 text-momo-gold/30" />
                <p className="text-body-lg font-body-lg text-pure-white italic leading-relaxed">
                  "We don't just serve food. We serve an experience. Every bite should hit different —
                  that's the Hype Momo promise."
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-momo-gold/10">
                  <img src={ASSETS.logo} alt="Hype Momo" className="w-12 h-12 rounded-full object-cover bg-deep-black" />
                  <div>
                    <p className="text-label-bold font-label-bold text-pure-white">Sandeep Kamat And Raju Kamat</p>
                    <p className="text-sm text-on-surface-variant">Founders & Operators</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-20 bg-charcoal-grey relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-momo-gold/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-headline-lg font-headline-lg text-pure-white uppercase italic">
              What Drives <span className="text-spicy-red">Us</span>
            </h2>
            <div className="h-1 w-24 bg-momo-gold mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-deep-black p-10 rounded-2xl border border-momo-gold/20 hover:border-spicy-red/40 transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-momo-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-momo-gold" />
              </div>
              <h3 className="text-headline-md font-headline-md text-momo-gold uppercase mb-4">Our Mission</h3>
              <p className="text-body-md font-body-md text-on-surface-variant">
                To bring authentic, high-quality street food to every corner of South Delhi — made fresh,
                packed with flavor, and delivered with the speed and energy the city deserves.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-deep-black p-10 rounded-2xl border border-momo-gold/20 hover:border-momo-gold/40 transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-spicy-red/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-8 h-8 text-spicy-red" />
              </div>
              <h3 className="text-headline-md font-headline-md text-spicy-red uppercase mb-4">Our Vision</h3>
              <p className="text-body-md font-body-md text-on-surface-variant">
                To become Delhi's most loved street food brand — known not just for incredible taste,
                but for quality, consistency, and the culture of good food, good mood.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-12 sm:py-20 bg-deep-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-headline-lg font-headline-lg text-pure-white uppercase italic">
              The <span className="text-momo-gold">Hype</span> Difference
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mt-4 max-w-2xl mx-auto">
              We don't cut corners. Here's what makes every order from Hype Momo worth the hype.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award fill="currentColor" className="w-10 h-10 text-momo-gold" />,
                title: 'Quality First',
                desc: 'Only the freshest vegetables, premium paneer, and high-quality meats make it into our kitchen. No shortcuts, no compromises.',
                bgClass: 'bg-momo-gold/10',
              },
              {
                icon: <Sparkles className="w-10 h-10 text-spicy-red" />,
                title: 'Made Fresh Daily',
                desc: 'Every momo is hand-folded, steamed to order, and served hot. We prep in small batches to ensure peak freshness in every box.',
                bgClass: 'bg-spicy-red/10',
              },
              {
                icon: <Heart fill="currentColor" className="w-10 h-10 text-momo-gold" />,
                title: 'Made With Love',
                desc: 'Cooking is personal for us. Every recipe is tested, every spice blend is perfected, and every order is packed with care.',
                bgClass: 'bg-momo-gold/10',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-xl bg-charcoal-grey border border-momo-gold/20 hover:border-spicy-red/50 transition-all group"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.bgClass}`}>
                  {item.icon}
                </div>
                <h3 className="text-headline-md font-headline-md text-pure-white mb-4 uppercase">{item.title}</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Star(props: { className?: string; fill?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={props.className} fill={props.fill || 'currentColor'}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
