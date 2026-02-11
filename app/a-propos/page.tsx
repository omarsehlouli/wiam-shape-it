"use client"

import { SiteHeader } from "@/components/site-header"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBullseye,
  faHandshake,
  faUserGroup,
  faDumbbell,
  faGem,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const } }),
}

export default function AProposPage() {
  return (
    <div className="relative min-h-screen bg-primary-900">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/gym_entrance.webp" alt="Shape It" fill className="object-cover" style={{ filter: "brightness(0.25)" }} priority />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 via-transparent to-primary-900" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[11px] tracking-[0.5em] text-white/40 uppercase font-light mb-4">Découvrez notre histoire</p>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            À Propos
          </motion.h1>
          <motion.div
            className="flex items-center justify-center gap-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/30" />
            <p className="text-[11px] tracking-[0.5em] text-white/40 uppercase font-light">Shape It — No Limits</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/30" />
          </motion.div>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-16 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              className="relative h-[300px] md:h-[480px] rounded-3xl overflow-hidden"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image src="/gym_entrance.webp" alt="Shape It No Limit" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
            </motion.div>
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-[11px] tracking-[0.4em] text-primary uppercase font-light">Bienvenue</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-wide">Bienvenue chez Shape It</h2>
              <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-transparent" />
              <p className="text-white/60 font-light leading-relaxed">
                Bienvenue chez Shape It, votre partenaire de confiance pour atteindre vos objectifs de forme et de
                bien-être. Nous sommes passionnés par l&apos;idée d&apos;aider nos clients à transformer leur vie grâce à un coaching
                personnalisé et des programmes d&apos;entraînement sur mesure.
              </p>
              <p className="text-white/60 font-light leading-relaxed">
                Ici, chaque détail est pensé pour vous offrir bien plus qu&apos;un simple entraînement : une expérience sur-mesure,
                dans un cadre intime, exclusif et motivant.
              </p>
              <p className="text-white/60 font-light leading-relaxed">
                Vous ne suivez pas un programme standard. Vous êtes accompagné(e), guidé(e), challengé(e) par des experts
                passionnés en coaching et en nutrition, qui s&apos;adaptent à vos besoins, votre rythme, et votre quotidien.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 md:py-28 relative">
        <div className="absolute inset-0 bg-white/[0.02]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[0.4em] text-primary uppercase font-light mb-3">Ce qui nous définit</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-wide">Notre Approche</h2>
            <p className="text-white/50 font-light mt-4 max-w-xl mx-auto">
              Une approche holistique du bien-être, centrée sur vos besoins et vos objectifs personnels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: faDumbbell, title: "Programmes personnalisés", desc: "Des programmes d'entraînement sur mesure adaptés à vos objectifs et votre niveau." },
              { icon: faHandshake, title: "Conseils nutritionnels", desc: "Des conseils nutritionnels adaptés à vos besoins pour optimiser vos résultats." },
              { icon: faBullseye, title: "Suivi régulier", desc: "Un suivi continu et personnalisé pour garantir votre progression et votre motivation." },
              { icon: faUserGroup, title: "Soutien motivationnel", desc: "Un accompagnement motivationnel constant pour vous aider à rester focalisé sur vos objectifs." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-6 md:p-8 text-center hover:bg-white/[0.08] transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/15 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/25 transition-colors">
                  <FontAwesomeIcon icon={item.icon} className="text-primary text-xl" />
                </div>
                <h3 className="text-white/90 font-light text-lg mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section className="py-16 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[0.4em] text-primary uppercase font-light mb-3">L&apos;équipe</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-wide">Nos Coachs</h2>
            <p className="text-white/50 font-light mt-4 max-w-2xl mx-auto">
              Des professionnels certifiés et expérimentés, passionnés par leur métier et dévoués à votre réussite.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              className="rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col md:flex-row group hover:bg-white/[0.08] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-[250px] md:w-1/2 md:h-auto overflow-hidden">
                <Image src="/home.webp" alt="Wiam Alibouch" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-primary-900/30" />
              </div>
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
                <h3 className="text-xl font-light text-white mb-1">Wiam Alibouch</h3>
                <p className="text-primary text-sm font-light mb-4">Coach en nutrition & Personal Trainer</p>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  Passionnée par la transformation humaine et le développement de soi, plus de trois ans d&apos;expérience
                  dans l&apos;accompagnement personnalisé.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col md:flex-row group hover:bg-white/[0.08] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="relative h-[250px] md:w-1/2 md:h-auto bg-white/[0.03] flex items-center justify-center overflow-hidden">
                <FontAwesomeIcon icon={faUserGroup} className="text-primary/30 text-6xl" />
              </div>
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
                <h3 className="text-xl font-light text-white mb-1">Notre Équipe</h3>
                <p className="text-primary text-sm font-light mb-4">Experts en fitness et bien-être</p>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  Une équipe de professionnels passionnés, formés aux meilleures méthodes d&apos;entraînement et de coaching
                  pour vous accompagner vers l&apos;excellence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Installations */}
      <section className="py-16 md:py-28 relative">
        <div className="absolute inset-0 bg-white/[0.02]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              className="order-2 md:order-1 space-y-5"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[11px] tracking-[0.4em] text-primary uppercase font-light">Notre espace</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-wide">Nos Installations</h2>
              <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-transparent" />
              <p className="text-white/60 font-light leading-relaxed">
                Nos centres sont équipés d&apos;installations modernes et de matériel de pointe pour vous offrir une expérience
                d&apos;entraînement optimale. Que vous préfériez les séances en groupe ou le coaching individuel, nous avons
                l&apos;environnement idéal pour vous.
              </p>
              <p className="text-white/60 font-light leading-relaxed">
                Shape It n&apos;est pas une salle de sport classique. C&apos;est un lieu confidentiel, moderne, inspirant,
                conçu pour vous offrir une parenthèse rien qu&apos;à vous.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faGem} className="text-primary text-sm" />
                </div>
                <p className="text-white/70 font-light text-sm">Un espace privé, chaleureux et motivant</p>
              </div>
            </motion.div>
            <motion.div
              className="order-1 md:order-2 relative h-[280px] md:h-[420px] rounded-3xl overflow-hidden"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image src="/gym_entrance.webp" alt="Nos installations" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary-900 to-primary-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-extralight text-white tracking-wide mb-5">Rejoignez-nous</h2>
            <p className="text-white/50 font-light leading-relaxed mb-10">
              Prêt à commencer votre transformation ? Contactez-nous dès aujourd&apos;hui pour un bilan forme
              et découvrez comment Shape It peut vous aider à atteindre vos objectifs.
            </p>
            <Link href="/commencer">
              <Button size="lg" className="relative group bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-primary-dark font-light tracking-[0.2em] uppercase text-[11px] rounded-full px-10 py-7 transition-all duration-500 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  Commencer Votre Parcours
                  <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
