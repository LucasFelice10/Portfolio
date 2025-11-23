import React from 'react'
import { motion } from 'framer-motion'
import { Code2, TestTube2, GraduationCap } from 'lucide-react'
import { useLanguage } from '../LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function About() {
  const { t } = useLanguage()

  const features = [
    { icon: Code2, color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { icon: TestTube2, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: GraduationCap, color: 'text-pink-400', bg: 'bg-pink-500/10' }
  ]

  return (
    <section id="about" className="py-8 md:py-24 px-4 relative scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            {t.about.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              {t.about.text1}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {t.about.text2}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {t.about.text3}
            </p>
          </motion.div>

          {/* Iconos */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-3 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${feature.bg} backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center aspect-square`}
              >
                <feature.icon
                  className={`w-12 h-12 ${feature.color} mb-2`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
