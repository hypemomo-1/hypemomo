import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Navigation, ArrowRight, Heart, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { ASSETS } from '../data';
import { useNavigate } from 'react-router-dom';

export function Contact() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-deep-black -mt-20 md:-mt-24 px-6 pt-20 md:pt-24">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-transparent to-deep-black z-10"></div>
          <img
            src={ASSETS.heroHome}
            alt="Hype Momo contact"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-8"
          >
            <div className="inline-block px-4 py-1 bg-momo-gold/10 border border-momo-gold/30 rounded-full">
              <span className="text-momo-gold font-label-bold text-label-bold tracking-widest uppercase">
                Get In Touch
              </span>
            </div>
            <h1 className="text-headline-xl font-headline-xl text-pure-white uppercase italic">
              Let's <span className="text-spicy-red">Connect</span>
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-md">
              Got a craving? A question? Or just want to say hi? We're all ears and always ready to talk momos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-20 bg-charcoal-grey relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-momo-gold/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Phone className="w-8 h-8 text-spicy-red" />,
                label: 'Phone',
                value: '+91 9315795638',
                desc: 'Call us for orders & inquiries',
                bgClass: 'bg-spicy-red/10',
                borderClass: 'border-spicy-red/30',
              },
              {
                icon: <Mail className="w-8 h-8 text-momo-gold" />,
                label: 'Email',
                value: 'momoshype@gmail.com',
                desc: 'Drop us a message anytime',
                bgClass: 'bg-momo-gold/10',
                borderClass: 'border-momo-gold/30',
              },
              {
                icon: <MapPin className="w-8 h-8 text-spicy-red" />,
                label: 'Address',
                value: 'B-1/547 J J Colony, Phase-1, Madanpur Khadar, South Delhi - 110076',
                desc: 'Visit us for pickup',
                bgClass: 'bg-spicy-red/10',
                borderClass: 'border-spicy-red/30',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-deep-black p-8 rounded-2xl border ${item.borderClass} hover:border-momo-gold/50 transition-all group`}
              >
                <div className={`w-16 h-16 rounded-full ${item.bgClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-headline-md font-headline-md text-momo-gold uppercase mb-2">{item.label}</h3>
                <p className="text-body-lg font-body-lg text-pure-white mb-2">
                  {item.label === 'Phone' ? (
                    <a href="tel:+919315795638" className="hover:text-momo-gold transition-colors">{item.value}</a>
                  ) : item.label === 'Email' ? (
                    <a href="mailto:momoshype@gmail.com" className="hover:text-momo-gold transition-colors">{item.value}</a>
                  ) : item.label === 'Address' ? (
                    <a href="https://www.google.com/maps?q=28.530908584594727,77.31458282470703" target="_blank" rel="noopener noreferrer" className="hover:text-momo-gold transition-colors">{item.value}</a>
                  ) : (
                    item.value
                  )}
                </p>
                <p className="text-body-md font-body-md text-on-surface-variant">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Hours Section */}
      <section className="py-12 sm:py-20 bg-deep-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[400px] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-momo-gold/30 order-2 lg:order-1 relative"
            >
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

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 order-1 lg:order-2"
            >
              <div>
                <h2 className="text-headline-lg font-headline-lg text-pure-white uppercase italic">
                  Visit <span className="text-momo-gold">Us</span>
                </h2>
                <div className="h-1 w-20 bg-spicy-red rounded-full mt-4"></div>
                <p className="text-body-md font-body-md text-on-surface-variant mt-4">We'd love to see you — stop by or give us a call!</p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 group">
                  <MapPin className="text-spicy-red w-6 h-6 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-label-bold font-label-bold text-momo-gold uppercase">Address</p>
                    <a href="https://www.google.com/maps?q=28.530908584594727,77.31458282470703" target="_blank" rel="noopener noreferrer" className="text-body-lg font-body-lg text-on-surface hover:text-momo-gold transition-colors">
                      B-1/547 J J Colony, Phase-1, Madanpur Khadar, South Delhi - 110076
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <Clock className="text-momo-gold w-6 h-6 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-label-bold font-label-bold text-spicy-red uppercase">Hours</p>
                    <p className="text-body-lg font-body-lg text-on-surface">Open daily: 11:00 AM - 10:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <Phone className="text-spicy-red w-6 h-6 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-label-bold font-label-bold text-momo-gold uppercase">Order Now</p>
                    <a href="tel:+919315795638" className="text-body-lg font-body-lg text-on-surface hover:text-momo-gold transition-colors">+91 9315795638</a>
                  </div>
                </div>
              </div>

              <a href="https://www.google.com/maps/dir/?api=1&destination=28.530908584594727,77.31458282470703" target="_blank" rel="noopener noreferrer" className="inline-flex bg-momo-gold text-deep-black px-10 py-4 rounded-full font-headline-md text-headline-md font-bold active:scale-95 transition-all hover:bg-pure-white items-center gap-2 shadow-lg shadow-momo-gold/20 hover:shadow-momo-gold/40">
                Get Directions <Navigation className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="py-12 sm:py-20 bg-charcoal-grey relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-momo-gold/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-headline-lg font-headline-lg text-pure-white uppercase italic">
              Follow The <span className="text-spicy-red">Hype</span>
            </h2>
            <div className="h-1 w-24 bg-momo-gold mx-auto rounded-full"></div>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto">
              Stay connected with us on social media for the latest updates, drool-worthy photos, and exclusive offers.
            </p>

            <div className="flex justify-center gap-6">
              <a href="https://www.instagram.com/hypemomo" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full bg-deep-black border border-momo-gold/30 flex items-center justify-center text-momo-gold hover:bg-momo-gold hover:text-deep-black transition-all hover:scale-110">
                <Instagram className="w-7 h-7" />
              </a>
              <a href="https://www.facebook.com/share/18qyrHetDZ/" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full bg-deep-black border border-momo-gold/30 flex items-center justify-center text-spicy-red hover:bg-spicy-red hover:text-pure-white transition-all hover:scale-110">
                <Facebook className="w-7 h-7" />
              </a>
              <a href="https://www.youtube.com/@HYPEMOMO" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full bg-deep-black border border-momo-gold/30 flex items-center justify-center text-spicy-red hover:bg-spicy-red hover:text-pure-white transition-all hover:scale-110">
                <Youtube className="w-7 h-7" />
              </a>
              <a href="#" className="w-16 h-16 rounded-full bg-deep-black border border-momo-gold/30 flex items-center justify-center text-momo-gold hover:bg-momo-gold hover:text-deep-black transition-all hover:scale-110">
                <MessageCircle className="w-7 h-7" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 inline-block"
          >
            <button
              onClick={() => navigate('/menu')}
              className="bg-spicy-red text-pure-white px-10 py-4 rounded-full font-headline-md text-headline-md active:scale-95 transition-all shadow-xl shadow-spicy-red/30 flex items-center gap-2 hover:bg-red-700"
            >
              Explore Our Menu <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-2"
          >
            <Heart fill="currentColor" className="text-spicy-red w-5 h-5" />
            <span className="text-label-bold text-momo-gold italic lowercase">
              we'd love to hear from you
            </span>
            <Heart fill="currentColor" className="text-spicy-red w-5 h-5" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
