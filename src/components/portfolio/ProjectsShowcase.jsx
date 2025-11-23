import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
}

const projectVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function ProjectsShowcase() {
  const { t, language } = useLanguage()

  const projects = [
    {
      title: 'DMD Reciclados',
      description:
        language === 'es'
          ? 'Sitio web corporativo para empresa de reciclado de metales no ferrosos. Compra, venta y reciclado de metales con gestión de servicios integrada.'
          : 'Corporate website for non-ferrous metal recycling company. Metal buying, selling and recycling with integrated service management.',
      tags: ['WordPress', 'Elementor', 'JavaScript'],
      image:
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691bb39c9b88cfe41e99888f/321e58a7d_image.png',
      link: 'https://dmdreciclados.com/'
    },
    {
      title: 'LF Gym',
      description:
        language === 'es'
          ? 'Página web moderna para gimnasio con sistema de membresías. Diseño enfocado en motivación y conversión con clases online y planes personalizados.'
          : 'Modern gym website with membership system. Design focused on motivation and conversion with online classes and personalized plans.',
      tags: ['WordPress', 'Elementor', 'JavaScript'],
      image:
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691bb39c9b88cfe41e99888f/c79869770_image.png',
      link: 'https://dev-lfgym.pantheonsite.io/'
    }
  ]

  return (
    <section id="projects" className="py-8 md:py-24 px-4 relative scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            {t.projects.title}
          </h2>
        </motion.div>

        {/* Proyectos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-32"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={projectVariants}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Laptop mockup */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={idx % 2 === 1 ? 'md:order-2' : ''}
              >
                <div className="relative">
                  <div className="relative bg-gradient-to-br from-violet-500/20 to-purple-500/20 p-3 rounded-t-2xl border-4 border-gray-700">
                    <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>

                  <div className="relative h-6 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-2xl">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-32 h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl blur-3xl -z-10" />
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className={idx % 2 === 1 ? 'md:order-1' : ''}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {project.title}
                </h3>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full text-sm text-violet-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 rounded-full shadow-lg shadow-violet-500/30"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {language === 'es' ? 'Ver Proyecto' : 'View Project'}
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
