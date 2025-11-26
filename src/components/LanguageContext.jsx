import React, { createContext, useContext, useState } from 'react'

const translations = {
  es: {
    nav: {
      about: 'Sobre mí',
      skills: 'Habilidades',
      projects: 'Proyectos',
      experience: 'Experiencia',
      contact: 'Contacto'
    },
    hero: {
      greeting: 'Hola, soy',
      role: 'Desarrollador Web & Tester QA',
      subtitle: 'Estudiante de Licenciatura en Sistemas',
      description:
        'Apasionado por crear experiencias digitales excepcionales y garantizar la calidad del software a través de testing riguroso.',
      cta: 'Ver Proyectos',
      contact: 'Contactar'
    },
    about: {
      title: 'Sobre mí',
      text1:
        'Soy un desarrollador web y tester QA con una sólida formación técnica, actualmente cursando la Licenciatura en Sistemas.',
      text2:
        'Mi enfoque combina la creatividad del desarrollo frontend con la precisión del testing, asegurando productos digitales de alta calidad.',
      text3:
        'Me apasiona aprender nuevas tecnologías y aplicar las mejores prácticas tanto en desarrollo como en aseguramiento de calidad.'
    },
    skills: {
      title: 'Habilidades Técnicas',
      development: 'Desarrollo Web',
      testing: 'Testing QA',
      tools: 'Herramientas'
    },
    projects: {
      title: 'Proyectos Destacados',
      viewProject: 'Ver Proyecto',
      noProjects: 'Proyectos próximamente...'
    },
    certification: {
      title: 'Desarrollador en Wordpress',
      description: 'Certificación profesional que avala la excelencia en el desarrollo y diseño de sitios web con WordPress. Dominio avanzado de temas, plugins y personalización para crear experiencias digitales únicas y funcionales.',
      viewCertificate: 'Ver Certificado'
    },
    experience: {
      title: 'Experiencia & Educación',
      education: 'Educación',
      work: 'Experiencia Laboral',
      degree: 'Licenciatura en Sistemas',
      degreeStatus: 'En curso',
      present: 'Presente'
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Estoy disponible para nuevos proyectos y oportunidades',
      email: 'Email',
      phone: 'Teléfono',
      location: 'Ubicación',
      sendMessage: 'Enviar Mensaje',
      name: 'Nombre',
      message: 'Mensaje',
      send: 'Enviar',
      messageSent: 'Mensaje enviado con éxito'
    },
    footer: {
      rights: 'Todos los derechos reservados',
      made: 'Hecho con'
    }
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact'
    },
    hero: {
      greeting: "Hi, I'm",
      role: 'Web Developer & QA Tester',
      subtitle: 'Systems Engineering Student',
      description:
        'Passionate about creating exceptional digital experiences and ensuring software quality through rigorous testing.',
      cta: 'View Projects',
      contact: 'Get in Touch'
    },
    about: {
      title: 'About Me',
      text1:
        "I'm a web developer and QA tester with solid technical training, currently pursuing a degree in Systems Engineering.",
      text2:
        'My approach combines the creativity of frontend development with the precision of testing, ensuring high-quality digital products.',
      text3:
        'I am passionate about learning new technologies and applying best practices in both development and quality assurance.'
    },
    skills: {
      title: 'Technical Skills',
      development: 'Web Development',
      testing: 'QA Testing',
      tools: 'Tools'
    },
    projects: {
      title: 'Featured Projects',
      viewProject: 'View Project',
      noProjects: 'Projects coming soon...'
    },
    certification: {
      title: 'Wordpress Developer',
      description: 'Professional certification demonstrating excellence in WordPress website development and design. Advanced mastery of themes, plugins, and customization to create unique and functional digital experiences.',
      viewCertificate: 'View Certificate'
    },
    experience: {
      title: 'Experience & Education',
      education: 'Education',
      work: 'Work Experience',
      degree: 'Bachelor in Systems Engineering',
      degreeStatus: 'In Progress',
      present: 'Present'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Available for new projects and opportunities',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      sendMessage: 'Send Message',
      name: 'Name',
      message: 'Message',
      send: 'Send',
      messageSent: 'Message sent successfully'
    },
    footer: {
      rights: 'All rights reserved',
      made: 'Made with'
    }
  }
}

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es')

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'))
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
