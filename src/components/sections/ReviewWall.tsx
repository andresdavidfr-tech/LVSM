import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { fetchReviews, type Review } from '../../data/reviews';
import { ReviewCard } from '../trust/Trust';
import { Skeleton } from '../ui/Skeleton';
import { wa } from '../../lib/whatsapp';

export function ReviewWall() {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    fetchReviews().then(setReviews);
  }, []);

  return (
    <section className="py-24 bg-brand-paper/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 block">Experiencias LVSM</span>
          <h2 className="text-5xl font-serif">Muro de Reseñas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews === null
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48" />)
            : reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href={wa('Hola! Quisiera dejar mi reseña.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold border-b border-brand-ink pb-2 hover:text-brand-gold hover:border-brand-gold transition-all"
          >
            Dejanos tu experiencia <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
