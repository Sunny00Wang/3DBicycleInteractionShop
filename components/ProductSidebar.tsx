'use client';

import { motion, AnimatePresence } from 'framer-motion';

import { productsByPart, type BikePart } from '@/data/products';

type ProductSidebarProps = {
  selectedPart: BikePart | null;
};

export default function ProductSidebar({ selectedPart }: ProductSidebarProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key={selectedPart ?? 'empty'}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{
          duration: 0.35,
          ease: 'easeOut',
        }}
        className="absolute right-6 top-6 w-80 rounded-2xl border border-white/10 bg-black/60 p-5 text-white shadow-2xl backdrop-blur"
      >
        {!selectedPart ? (
          <p className="text-sm text-white/60">点击自行车部件查看推荐配件</p>
        ) : (
          <>
            <p className="mb-1 text-xs uppercase tracking-widest text-cyan-300">Selected Part</p>

            <h2 className="mb-4 text-xl font-semibold">{selectedPart}</h2>

            <div className="space-y-4">
              {productsByPart[selectedPart].map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{
                    scale: 1.02,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 18,
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="mb-3 h-28 rounded-lg bg-white/10" />

                  <h3 className="font-medium">{product.name}</h3>

                  <p className="mt-1 text-sm text-white/60">{product.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold">€{product.price}</span>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-medium text-black"
                    >
                      加入购物车
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.aside>
    </AnimatePresence>
  );
}
