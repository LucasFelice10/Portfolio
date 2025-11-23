import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { useLanguage } from '../LanguageContext'

export default function Experience() {
  const { t, language } = useLanguage()

  const education = [
    {
      title: language === 'es' ? 'Ingeniero Informático' : 'Computer Engineering',
      institution: 'UADE',
      period: '2022 - 2027',
      status: t.experience.degreeStatus,
      description:
        language === 'es'
          ? 'Trabajo en equipo, Resolución de problemas y 14 aptitudes más'
          : 'Teamwork, Problem Solving and 14+ more skills'
    },
    {
      title:
        language === 'es'
          ? 'Curso de Diseño web con WordPress'
          : 'WordPress Web Design Course',
      institution: 'UTN.BA - Centro de e-Learning',
      period: language === 'es' ? 'Nov 2025 (75 horas)' : 'Nov 2025 (75 hours)',
      status: language === 'es' ? 'Certificado' : 'Certified',
      description:
        language === 'es'
          ? 'Diseño y desarrollo de sitios web profesionales con WordPress, integrados con redes sociales. Desarrollo de tiendas online, blogs y sitios corporativos.'
          : 'Design and development of professional websites with WordPress, integrated with social networks. Development of online stores, blogs and corporate sites.'
    },
    {
      title: 'Testing QA Manual',
      institution: 'CoderHouse',
      period: language === 'es' ? 'Dic 2023' : 'Dec 2023',
      status: language === 'es' ? 'Certificado' : 'Certified',
      description:
        language === 'es'
          ? 'Curso de 26 horas enfocado en testing manual, metodologías de QA, identificación de bugs y aseguramiento de calidad de software.'
          : '26-hour course focused on manual testing, QA methodologies, bug identification and software quality assurance.'
    }
  ]

  const work = [
    {
      title: language === 'es' ? 'Pasante en Sistemas' : 'Systems Intern',
      company: 'SERVICOM GLOBAL S.A.',
      period: language === 'es' ? 'Jul 2024 - Nov 2024' : 'Jul 2024 - Nov 2024',
      location:
        language === 'es'
          ? 'Vicente López, Buenos Aires, Argentina'
          : 'Vicente López, Buenos Aires, Argentina',
      description:
        language === 'es'
          ? 'Atención de consultas mediante sistema de tickets. Diagnóstico y solución de problemas en sistemas y aplicaciones. Garantía de funcionamiento correcto de hardware y software. Automatización de procesos con Power Automate. Gestión de asistencias mediante CrossCheck.'
          : 'User support through ticket system. Diagnosis and troubleshooting of systems and applications. Ensuring proper hardware and software operation. Process automation with Power Automate. Attendance management using CrossCheck.'
    },
    {
      title: 'Quality Assurance Tester',
      company: 'Table Club',
      period: language === 'es' ? 'Jun 2023 - Ene 2024' : 'Jun 2023 - Jan 2024',
      location: 'Argentina',
      description:
        language === 'es'
          ? 'Tester QA asegurando el correcto funcionamiento de aplicaciones y sistemas de gestión. Colaboración estrecha con el equipo de desarrollo para identificar y resolver defectos antes del lanzamiento. Garantía de experiencia sin contratiempos para los usuarios.'
          : 'QA Tester ensuring proper functionality of management applications and systems. Close collaboration with development team to identify and resolve defects before launch. Ensuring seamless user experience.'
    },
    {
      title: 'Game Quality Assurance',
      company: 'Fiverr',
      period: language === 'es' ? 'May 2023' : 'May 2023',
      location: language === 'es' ? 'España' : 'Spain',
      description:
        language === 'es'
          ? 'Tester para videojuego diseñado para niños con discapacidad ("Yukis Adventure"). Aseguramiento de accesibilidad y adaptación del juego. Identificación y resolución de barreras de accesibilidad para una experiencia inclusiva.'
          : 'Tester for video game designed for children with disabilities ("Yukis Adventure"). Ensuring game accessibility and adaptation. Identifying and resolving accessibility barriers for an inclusive experience.'
    },
    {
      title: language === 'es' ? 'Administración' : 'Administration',
      company: 'DMD Reciclados SRL',
      period: language === 'es' ? 'Ene 2019 - Ene 2020' : 'Jan 2019 - Jan 2020',
      location:
        language === 'es'
          ? 'Avellaneda, Buenos Aires, Argentina'
          : 'Avellaneda, Buenos Aires, Argentina',
      description:
        language === 'es'
          ? 'Gestión y supervisión de áreas de recursos humanos, finanzas, logística y tareas administrativas. Aseguramiento del funcionamiento eficiente de operaciones diarias.'
          : 'Management and supervision of human resources, finance, logistics and administrative areas. Ensuring efficient daily operations.'
    }
  ]

  return (
    <section id="experience" className="py-8 md:py-24 px-4 relative scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            {t.experience.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Educación */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="p-2 md:p-3 bg-violet-500/20 rounded-xl">
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                {t.experience.education}
              </h3>
            </div>

            <div className="space-y-6">
              {education.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="relative pl-6 md:pl-8 border-l-2 border-violet-500/30 hover:border-violet-500 transition-colors"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-violet-500" />
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 hover:border-violet-500/50 transition-all">
                    <h4 className="text-lg md:text-xl font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm md:text-base text-violet-400 mb-2">
                      {item.institution}
                    </p>
                    <p className="text-xs md:text-sm text-gray-400 mb-2">
                      {item.period}
                    </p>
                    {item.status && (
                      <span className="inline-block px-3 py-1 bg-violet-500/20 border border-violet-500/50 rounded-full text-xs text-violet-300 mb-3">
                        {item.status}
                      </span>
                    )}
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experiencia laboral */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="p-2 md:p-3 bg-purple-500/20 rounded-xl">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                {t.experience.work}
              </h3>
            </div>

            <div className="space-y-6">
              {work.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="relative pl-6 md:pl-8 border-l-2 border-purple-500/30 hover:border-purple-500 transition-colors"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500" />
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 hover:border-purple-500/50 transition-all">
                    <h4 className="text-lg md:text-xl font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm md:text-base text-purple-400 mb-1">
                      {item.company}
                    </p>
                    <p className="text-xs md:text-sm text-gray-400 mb-1">
                      {item.period}
                    </p>
                    {item.location && (
                      <p className="text-xs text-gray-500 mb-3">
                        {item.location}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
