import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../LanguageContext'
import { Award } from 'lucide-react'
import certificateImage from '../../assets/images/wordpress-certificate.jpg'

export default function WordpressCertification() {
    const { t } = useLanguage()

    return (
        <section className="py-8 md:py-24 px-4 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    {/* Certificate Image */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative"
                    >
                        <div className="relative bg-gradient-to-br from-violet-500/20 to-purple-500/20 p-3 rounded-2xl border-4 border-gray-700">
                            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                                <img
                                    src={certificateImage}
                                    alt="Wordpress Developer Certificate"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl blur-3xl -z-10" />
                    </motion.div>

                    {/* Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
                                <Award className="w-8 h-8 text-violet-400" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                {t.certification.title}
                            </h2>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {t.certification.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {['WordPress', 'PHP', 'Themes', 'Plugins', 'SEO'].map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full text-sm text-violet-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
