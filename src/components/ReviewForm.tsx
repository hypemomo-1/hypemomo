import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, MessageCircle } from 'lucide-react';

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewForm({ isOpen, onClose }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [feedback, setFeedback] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, rating, feedback }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setPhone('');
        setEmail('');
        setRating(0);
        setFeedback('');
        setSubmitted(false);
        setSubmitting(false);
        onClose();
      }, 2500);
    } catch {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center px-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-charcoal-grey border border-momo-gold/30 rounded-2xl w-full max-w-md p-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-momo-gold/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-momo-gold" />
              </div>
              <h2 className="text-headline-md font-headline-md text-momo-gold uppercase mb-3">Thank You!</h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant">
                Your review has been submitted!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center px-4 py-8"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-charcoal-grey border border-momo-gold/30 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-momo-gold/10 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-momo-gold" />
                    </div>
                    <div>
                      <h2 className="text-headline-md font-headline-md text-pure-white uppercase">
                        Submit Review
                      </h2>
                      <p className="text-body-md font-body-md text-on-surface-variant">
                        Share your Hype Momo experience
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-on-surface-variant hover:text-pure-white transition-colors p-1"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-label-bold font-label-bold text-momo-gold uppercase mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                      className="w-full bg-deep-black border border-momo-gold/20 rounded-xl px-5 py-4 text-body-md font-body-md text-pure-white placeholder-on-surface-variant/50 focus:outline-none focus:border-momo-gold/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-label-bold font-label-bold text-momo-gold uppercase mb-2">
                      Phone No.
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      required
                      className="w-full bg-deep-black border border-momo-gold/20 rounded-xl px-5 py-4 text-body-md font-body-md text-pure-white placeholder-on-surface-variant/50 focus:outline-none focus:border-momo-gold/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-label-bold font-label-bold text-momo-gold uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-deep-black border border-momo-gold/20 rounded-xl px-5 py-4 text-body-md font-body-md text-pure-white placeholder-on-surface-variant/50 focus:outline-none focus:border-momo-gold/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-label-bold font-label-bold text-momo-gold uppercase mb-3">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className="transition-transform hover:scale-110 active:scale-95"
                        >
                          <Star
                            fill={(hoveredStar || rating) >= star ? '#FFBA75' : 'none'}
                            className={`w-9 h-9 transition-colors ${
                              (hoveredStar || rating) >= star
                                ? 'text-momo-gold'
                                : 'text-on-surface-variant/40'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <p className="text-body-md font-body-md text-momo-gold mt-2">
                        {rating === 1 && 'Needs Improvement'}
                        {rating === 2 && 'Fair'}
                        {rating === 3 && 'Good'}
                        {rating === 4 && 'Great!'}
                        {rating === 5 && 'Absolutely Hype!'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-label-bold font-label-bold text-momo-gold uppercase mb-2">
                      Feedback
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Tell us about your experience..."
                      required
                      rows={4}
                      className="w-full bg-deep-black border border-momo-gold/20 rounded-xl px-5 py-4 text-body-md font-body-md text-pure-white placeholder-on-surface-variant/50 focus:outline-none focus:border-momo-gold/60 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-spicy-red text-pure-white px-8 py-4 rounded-full font-headline-md text-headline-md active:scale-95 transition-all shadow-xl shadow-spicy-red/30 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Submit Review'}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
