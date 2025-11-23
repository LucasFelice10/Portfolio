import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function SkillsShowcase() {
  const { t } = useLanguage()

  const skills = ['Elementor', 'Python', 'CSS', 'JavaScript', 'Postman', 'GitHub', 'HTML']

  return (
    <section id="skills" className="py-8 md:py-24 px-4 relative overflow-hidden scroll-mt-28">
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
            {t.skills.title}
          </h2>
        </motion.div>

        {/* Chips de skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={skillVariants}
              whileHover={{
                scale: 1.05,
                y: -5
              }}
              className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:border-violet-500/50 transition-all cursor-default"
            >
              <span className="text-white font-medium text-base md:text-lg">
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
