import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '../LanguageContext'
import { toast } from 'sonner'
import { base44 } from '@/api/base44Client'

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

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function Contact() {
  const { t, language } = useLanguage()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await fetch('https://formsubmit.co/ajax/lfelice56@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })

      if (response.ok) {
        toast.success(t.contact.messageSent)
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast.error(
        language === 'es'
          ? 'Error al enviar el mensaje'
          : 'Error sending message'
      )
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: t.contact.email,
      value: 'lfelice56@gmail.com',
      href: 'mailto:lfelice56@gmail.com'
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: '+54 911 3339-3228',
      href: 'tel:+5491133393228'
    },
    {
      icon: MapPin,
      label: t.contact.location,
      value: 'Buenos Aires, Argentina',
      href: null
    }
  ]

  return (
    <section id="contact" className="py-24 px-4 relative">
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
            {t.contact.title}
          </h2>
          <p className="text-gray-400 text-lg">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info de contacto */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-6"
          >
            {contactInfo.map((item, idx) => (
              <motion.a
                key={idx}
                variants={itemVariants}
                href={item.href || '#'}
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-violet-500/50 transition-all group"
              >
                <div className="p-3 bg-violet-500/20 rounded-xl group-hover:bg-violet-500/30 transition-colors">
                  <item.icon className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    {item.label}
                  </p>
                  <p className="text-white font-medium">
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2
            }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder={t.contact.name}
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-violet-500 h-12"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder={t.contact.email}
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-violet-500 h-12"
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder={t.contact.message}
                  value={formData.message}
                  onChange={e =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-violet-500 min-h-[150px]"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white h-12 text-lg rounded-xl shadow-lg shadow-violet-500/30"
              >
                <Send className="w-5 h-5 mr-2" />
                {t.contact.send}
              </Button>

              <a
                href="https://api.whatsapp.com/send/?phone=5491133393228&text=Hola%20buenos%20dias%20me%20encantaria%20obtener%20sus%20servicios!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg rounded-xl shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
