import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../LanguageContext'
import StarField from './StarField'

export default function Hero() {
  const { t } = useLanguage()

  const scrollToSection = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-purple-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />

      {/* Campo de estrellas */}
      <StarField />

      {/* Orbes flotantes */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-20 right-20 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Nombre y rol */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-violet-200 to-purple-400 bg-clip-text text-transparent">
            Lucas Felice
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-4 font-light">
            {t.hero.role}
          </h2>
          <p className="text-violet-300 text-lg md:text-xl mb-8">
            {t.hero.subtitle}
          </p>
        </motion.div>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        {/* Botones CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            size="lg"
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-violet-500/50 transition-all hover:shadow-violet-500/70"
          >
            {t.hero.cta}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('contact')}
            className="border-2 border-violet-500/50 hover:border-violet-400 text-violet-300 hover:text-violet-200 px-8 py-6 text-lg rounded-full bg-transparent hover:bg-violet-900/20"
          >
            {t.hero.contact}
          </Button>
        </motion.div>

        {/* Redes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex gap-6 justify-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-violet-400 transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-felice-08a998269/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-violet-400 transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:lfelice56@gmail.com"
            className="text-gray-400 hover:text-violet-400 transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>

        {/* Flecha hacia abajo */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 text-violet-400" />
        </motion.div>
      </div>
    </section>
  )
}
