import { useContext, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

const translations = {
  es: {
    // nav
    nav_about: "Sobre mí",
    nav_skills: "Skills",
    nav_projects: "Proyectos",
    nav_experience: "Experiencia",
    nav_contact: "Contacto",
    nav_hire: "Contratame",

    // hero
    hero_available: "DISPONIBLE PARA PROYECTOS",
    hero_description: "Full-Stack Developer especializado en construir productos digitales de alta performance. Buenos Aires, Argentina.",
    hero_stat_exp_val: "1+",
    hero_stat_exp_label: "Año de\nexperiencia",
    hero_stat_proj_val: "10+",
    hero_stat_proj_label: "Proyectos\ncompletados",
    hero_stat_clients_val: "100%",
    hero_stat_clients_label: "Clientes\nsatisfechos",

    // about
    about_label: "SOBRE MÍ",
    about_heading_1: "Construyo experiencias que",
    about_heading_accent: " importan.",
    about_badge: "LUCAS FELICE / FULL-STACK DEV",
    about_p1: "Soy un desarrollador Full-Stack con base en Buenos Aires, Argentina. Me especializo en crear aplicaciones web modernas, escalables y de alto rendimiento que combinan lógica técnica sólida con interfaces de usuario cuidadosamente diseñadas.",
    about_p2: "Trabajo principalmente con el ecosistema React y Node.js, pero disfruto explorar nuevas tecnologías y enfoques para resolver problemas complejos de la manera más elegante posible.",
    about_p3: "Cuando no estoy programando, me encuentro diseñando interfaces, contribuyendo a proyectos open-source, o tomando un café mientras leo sobre arquitectura de software.",
    about_field_name: "Nombre",
    about_field_location: "Ubicación",
    about_field_availability: "Disponibilidad",
    about_field_languages: "Idiomas",
    about_val_name: "Lucas Felice",
    about_val_location: "Buenos Aires, AR",
    about_val_availability: "Freelance / Full-time",
    about_val_languages: "ES / EN",

    // skills
    skills_label: "TECNOLOGÍAS",
    skills_heading: "Stack tecnológico",
    skills_pause: "Pasa el cursor para pausar",

    // projects
    projects_label: "PROYECTOS",
    projects_heading: "Trabajo seleccionado",
    projects_view_project: "Ver proyecto",
    project1_title: "Proyecto Recetas del Patrón",
    project1_desc:
      "Sitio web gastronómico desarrollado para presentar recetas, productos y contenido visual mediante una interfaz moderna, atractiva y completamente responsive.",
    project1_alt: "Captura de la página principal de Recetas del Patrón",
    project2_title: "Proyecto DMD Reciclados",
    project2_desc:
      "Sitio web institucional desarrollado para una empresa dedicada a la compra, venta y reciclaje de metales no ferrosos.",
    project2_alt: "Captura de la página principal de DMD Reciclados",
    project3_title: "Web App Pesadas DMD",
    project3_desc:
      "Aplicación web para registrar pesadas de materiales, calcular tara y peso neto, organizar operaciones y generar comprobantes.",
    project3_alt: "Captura de la aplicación web Pesadas DMD",
    project4_title: "Proyecto Gym UTN",
    project4_desc:
      "Sitio web desarrollado con WordPress para un gimnasio, con presentación de servicios, actividades, planes e información de contacto.",
    project4_alt: "Captura de la página principal del sitio Gym UTN",

    // experience
    exp_label: "EXPERIENCIA",
    exp_heading: "Trayectoria profesional",
    edu_label: "EDUCACIÓN",
    edu1_period: "2023 — 2027",
    edu1_degree: "Licenciatura en Sistemas",
    edu1_inst: "UADE · Buenos Aires",
    edu2_period: "2026",
    edu2_degree: "Fundamentos de Ciberseguridad",
    edu2_inst: "IBM",
    edu3_period: "2026",
    edu3_degree: "Desarrollo Web con WordPress",
    edu3_inst: "UTN Buenos Aires",
    edu4_period: "2023",
    edu4_degree: "QA Tester Manual",
    edu4_inst: "Coderhouse",
    exp1_period: "2026 — Presente",
    exp1_role: "Fundador y Desarrollador Web",
    exp1_company: "DVL Developer · Freelance / Remoto",
    exp1_desc:
      "Fundé DVL Developer para ofrecer servicios de diseño y desarrollo web a emprendimientos, profesionales y empresas. Me encargo de transformar requerimientos en sitios modernos, funcionales y completamente responsive, participando en las etapas de planificación, diseño, desarrollo, publicación y mantenimiento. También trabajo en la optimización de rendimiento, experiencia de usuario e integración de herramientas digitales.",
    exp1_tag1: "WordPress",
    exp1_tag2: "Elementor",
    exp1_tag3: "React",
    exp1_tag4: "JavaScript",
    exp1_tag5: "Responsive Design",
    exp2_period: "2025",
    exp2_role: "Pasante en Sistemas",
    exp2_company: "Servicom Global S.A. · Pasantía profesional",
    exp2_desc:
      "Brindé soporte técnico a los usuarios y gestioné tickets del área de Sistemas, diagnosticando y resolviendo incidentes relacionados con hardware, software, aplicaciones y sistemas internos. Realicé actualizaciones, mantenimiento y controles para garantizar el correcto funcionamiento y la seguridad de los equipos. También proporcioné asistencia y capacitación a usuarios, automaticé procesos mediante Power Automate y administré el sistema de control de asistencia CrossCheck.",
    exp2_tag1: "Soporte Técnico",
    exp2_tag2: "Gestión de Tickets",
    exp2_tag3: "Power Automate",
    exp2_tag4: "Hardware y Software",
    exp2_tag5: "CrossCheck",
    exp3_period: "2025",
    exp3_role: "Desarrollador Web",
    exp3_company: "DMD Reciclados · Proyecto profesional",
    exp3_desc:
      "Desarrollé soluciones digitales para optimizar la presencia online y las operaciones internas de DMD Reciclados. Realicé el sitio web institucional de la empresa y una aplicación web para registrar pesadas de materiales, calcular tara y peso neto, organizar operaciones y generar comprobantes. Las soluciones fueron diseñadas con una interfaz clara, responsive y adaptada a las necesidades reales del negocio.",
    exp3_tag1: "HTML",
    exp3_tag2: "CSS",
    exp3_tag3: "JavaScript",
    exp3_tag4: "Diseño Responsive",
    exp3_tag5: "Aplicaciones Web",
    exp4_period: "2023 — 2024",
    exp4_role: "QA Tester Freelance",
    exp4_company: "Table Club y Yukis Adventure · Freelance / Remoto",
    exp4_desc:
      "Participé en el aseguramiento de calidad de una plataforma de entretenimiento y de un videojuego accesible dirigido a niños con discapacidad. Diseñé y ejecuté casos de prueba funcionales, exploratorios y de regresión, documenté defectos con evidencia y colaboré con los equipos de desarrollo para validar las correcciones. También realicé pruebas de usabilidad y accesibilidad, verificando que las funcionalidades fueran claras, estables y adecuadas para los usuarios finales.",
    exp4_tag1: "Testing Funcional",
    exp4_tag2: "Casos de Prueba",
    exp4_tag3: "Reporte de Defectos",
    exp4_tag4: "Pruebas de Regresión",
    exp4_tag5: "Accesibilidad",

    // contact
    contact_label: "CONTACTO",
    contact_heading: "¿Hablamos?",
    contact_desc: "Estoy disponible para proyectos freelance, posiciones full-time y colaboraciones interesantes. Si tenés una idea, escribime.",
    contact_email_label: "EMAIL",
    contact_location_label: "UBICACIÓN",
    contact_location_val: "Buenos Aires, Argentina (UTC-3)",
    contact_field_name: "NOMBRE",
    contact_field_name_ph: "Lucas García",
    contact_field_email: "EMAIL",
    contact_field_email_ph: "lucas@empresa.com",
    contact_field_subject: "ASUNTO",
    contact_field_subject_ph: "Consulta sobre proyecto",
    contact_field_message: "MENSAJE",
    contact_field_message_ph: "Hola Lucas, me gustaría hablar sobre...",
    contact_submit: "Enviar mensaje",
    contact_sending: "Enviando...",
    contact_success: "Tu mensaje fue enviado correctamente. Me pondré en contacto contigo pronto.",
    contact_error: "Hubo un error al enviar el mensaje. Por favor intenta de nuevo.",
    contact_validation_name: "Por favor ingresá tu nombre.",
    contact_validation_email: "Por favor ingresá un email válido.",
    contact_validation_subject: "Por favor ingresá un asunto.",
    contact_validation_message: "Por favor ingresá tu mensaje.",

    // footer
    footer_back: "VOLVER ARRIBA ↑",
    footer_copy: "© 2026 LUCAS FELICE — DVL Developer",
  },
  en: {
    // nav
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_experience: "Experience",
    nav_contact: "Contact",
    nav_hire: "Hire me",

    // hero
    hero_available: "AVAILABLE FOR PROJECTS",
    hero_description: "Full-Stack Developer specialized in building high-performance digital products. Buenos Aires, Argentina.",
    hero_stat_exp_val: "1+",
    hero_stat_exp_label: "Year of\nexperience",
    hero_stat_proj_val: "10+",
    hero_stat_proj_label: "Completed\nprojects",
    hero_stat_clients_val: "100%",
    hero_stat_clients_label: "Happy\nclients",

    // about
    about_label: "ABOUT ME",
    about_heading_1: "I build experiences that",
    about_heading_accent: " matter.",
    about_badge: "LUCAS FELICE / FULL-STACK DEV",
    about_p1: "I'm a Full-Stack Developer based in Buenos Aires, Argentina. I specialize in building modern, scalable, high-performance web applications that combine solid technical logic with carefully designed user interfaces.",
    about_p2: "I mainly work with the React and Node.js ecosystem, but I enjoy exploring new technologies and approaches to solve complex problems as elegantly as possible.",
    about_p3: "When I'm not coding, I'm designing interfaces, contributing to open-source projects, or drinking coffee while reading about software architecture.",
    about_field_name: "Name",
    about_field_location: "Location",
    about_field_availability: "Availability",
    about_field_languages: "Languages",
    about_val_name: "Lucas Felice",
    about_val_location: "Buenos Aires, AR",
    about_val_availability: "Freelance / Full-time",
    about_val_languages: "ES / EN",

    // skills
    skills_label: "TECHNOLOGIES",
    skills_heading: "Tech stack",
    skills_pause: "Hover to pause",

    // projects
    projects_label: "PROJECTS",
    projects_heading: "Selected work",
    projects_view_project: "View project",
    project1_title: "Recetas del Patrón Project",
    project1_desc:
      "A modern and responsive food website developed to showcase recipes, products and visual content through an attractive user interface.",
    project1_alt: "Homepage screenshot of Recetas del Patrón",
    project2_title: "DMD Reciclados Project",
    project2_desc:
      "A corporate website developed for a company dedicated to buying, selling and recycling non-ferrous metals.",
    project2_alt: "Homepage screenshot of DMD Reciclados",
    project3_title: "DMD Weighing Web App",
    project3_desc:
      "A web application for recording material weights, calculating tare and net weight, organizing operations and generating receipts.",
    project3_alt: "Screenshot of the DMD Weighing web application",
    project4_title: "UTN Gym Project",
    project4_desc:
      "A WordPress website developed for a gym, including services, activities, membership plans and contact information.",
    project4_alt: "Homepage screenshot of the UTN Gym website",

    // experience
    exp_label: "EXPERIENCE",
    exp_heading: "Professional journey",
    edu_label: "EDUCATION",
    edu1_period: "2023 — 2027",
    edu1_degree: "Bachelor's Degree in Information Systems",
    edu1_inst: "UADE · Buenos Aires",
    edu2_period: "2026",
    edu2_degree: "Cybersecurity Fundamentals",
    edu2_inst: "IBM",
    edu3_period: "2026",
    edu3_degree: "WordPress Web Development",
    edu3_inst: "UTN Buenos Aires",
    edu4_period: "2023",
    edu4_degree: "Manual QA Testing",
    edu4_inst: "Coderhouse",
    exp1_period: "2026 — Present",
    exp1_role: "Founder and Web Developer",
    exp1_company: "DVL Developer · Freelance / Remote",
    exp1_desc:
      "I founded DVL Developer to provide web design and development services for businesses, professionals and companies. I transform requirements into modern, functional and fully responsive websites, working across planning, design, development, deployment and maintenance. I also focus on performance optimization, user experience and digital tool integration.",
    exp1_tag1: "WordPress",
    exp1_tag2: "Elementor",
    exp1_tag3: "React",
    exp1_tag4: "JavaScript",
    exp1_tag5: "Responsive Design",
    exp2_period: "2025",
    exp2_role: "IT Systems Intern",
    exp2_company: "Servicom Global S.A. · Professional internship",
    exp2_desc:
      "I provided technical support to users and managed IT support tickets, diagnosing and resolving incidents involving hardware, software, applications and internal systems. I performed updates, maintenance and system checks to ensure equipment reliability and security. I also assisted and trained users, automated internal processes with Power Automate and managed the CrossCheck attendance system.",
    exp2_tag1: "Technical Support",
    exp2_tag2: "Ticket Management",
    exp2_tag3: "Power Automate",
    exp2_tag4: "Hardware and Software",
    exp2_tag5: "CrossCheck",
    exp3_period: "2025",
    exp3_role: "Web Developer",
    exp3_company: "DMD Reciclados · Professional project",
    exp3_desc:
      "I developed digital solutions to improve DMD Reciclados' online presence and internal operations. I created the company's corporate website and a web application for recording material weights, calculating tare and net weight, organizing operations and generating receipts. Both solutions were designed with a clear, responsive interface adapted to the company's real operational requirements.",
    exp3_tag1: "HTML",
    exp3_tag2: "CSS",
    exp3_tag3: "JavaScript",
    exp3_tag4: "Responsive Design",
    exp3_tag5: "Web Applications",
    exp4_period: "2023 — 2024",
    exp4_role: "Freelance QA Tester",
    exp4_company: "Table Club and Yukis Adventure · Freelance / Remote",
    exp4_desc:
      "I participated in the quality assurance process of an entertainment platform and an accessible video game designed for children with disabilities. I created and executed functional, exploratory and regression test cases, documented defects with supporting evidence and collaborated with development teams to validate fixes. I also performed usability and accessibility testing to ensure that the products were stable, clear and suitable for their intended users.",
    exp4_tag1: "Functional Testing",
    exp4_tag2: "Test Cases",
    exp4_tag3: "Defect Reporting",
    exp4_tag4: "Regression Testing",
    exp4_tag5: "Accessibility",

    // contact
    contact_label: "CONTACT",
    contact_heading: "Let's talk?",
    contact_desc: "I'm available for freelance projects, full-time positions and interesting collaborations. If you have an idea, reach out.",
    contact_email_label: "EMAIL",
    contact_location_label: "LOCATION",
    contact_location_val: "Buenos Aires, Argentina (UTC-3)",
    contact_field_name: "NAME",
    contact_field_name_ph: "John Smith",
    contact_field_email: "EMAIL",
    contact_field_email_ph: "john@company.com",
    contact_field_subject: "SUBJECT",
    contact_field_subject_ph: "Project inquiry",
    contact_field_message: "MESSAGE",
    contact_field_message_ph: "Hi Lucas, I'd like to talk about...",
    contact_submit: "Send message",
    contact_sending: "Sending...",
    contact_success: "Your message was sent successfully. I will get back to you soon.",
    contact_error: "There was an error sending your message. Please try again.",
    contact_validation_name: "Please enter your name.",
    contact_validation_email: "Please enter a valid email address.",
    contact_validation_subject: "Please enter a subject.",
    contact_validation_message: "Please enter your message.",

    // footer
    footer_back: "BACK TO TOP ↑",
    footer_copy: "© 2026 LUCAS FELICE — DVL Developer",
  },
} as const;

export type TKey = keyof typeof translations.es;

type ContextShape = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
};

import { createContext } from "react";

const LanguageContext = createContext<ContextShape>({
  lang: "es",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const t = (key: TKey): string => translations[lang][key] as string;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
