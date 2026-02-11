'use client';

import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { PlayCircle, ChevronDown, Volume2, VolumeX } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faWeightScale, 
  faDumbbell, 
  faHeartPulse,
  faMedal,
  faUserGroup,
  faFlask,
  faGem
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

export default function Page() {
  const [introVisible, setIntroVisible] = useState(true)
  const [introFading, setIntroFading] = useState(false)
  const [heroMuted, setHeroMuted] = useState(true)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const showcaseRefs = useRef<(HTMLVideoElement | null)[]>([])

  const showcaseVideos = [
    { webm: "/videos/copy_0E8EA4DC-AD86-4592-BB0E-FD3EEC11C9FC.webm", mp4: "/videos/copy_0E8EA4DC-AD86-4592-BB0E-FD3EEC11C9FC.mp4", poster: "/videos/thumb_0E8EA4DC.jpg", label: "Entraînement" },
    { webm: "/videos/copy_9282FAA2-ECB2-4E09-9F87-EEA2DEB4EE54.webm", mp4: "/videos/copy_9282FAA2-ECB2-4E09-9F87-EEA2DEB4EE54.mp4", poster: "/videos/thumb_9282FAA2.jpg", label: "Coaching" },
    { webm: "/videos/copy_6B70F7FF-F698-469F-AE72-0B411112F19E.webm", mp4: "/videos/copy_6B70F7FF-F698-469F-AE72-0B411112F19E.mp4", poster: "/videos/thumb_6B70F7FF.jpg", label: "Transformation" },
    { webm: "/videos/copy_EFD42330-C1B8-42D8-B7BE-1EA668C8854A.webm", mp4: "/videos/copy_EFD42330-C1B8-42D8-B7BE-1EA668C8854A.mp4", poster: "/videos/thumb_EFD42330.jpg", label: "Résultats" },
  ]

  // Intro: show logo, then fade out (no lift)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fadeTimer = setTimeout(() => setIntroFading(true), 2000)
    const doneTimer = setTimeout(() => {
      setIntroVisible(false)
      document.body.style.overflow = ''
    }, 3000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [])

  const introDone = !introVisible

  const handleScrollDown = () => {
    document.getElementById('video-showcase')?.scrollIntoView({ behavior: 'smooth' })
  }

  const challenges = [
    { number: "01", text: "Vous avez déjà tout essayé sans résultats durables" },
    { number: "02", text: "Vous ne savez plus par où commencer" },
    { number: "03", text: "Vous rêvez de changement, mais vous manquez d'un vrai cadre" },
    { number: "04", text: "Vous cherchez une méthode sérieuse, humaine et efficace" },
    { number: "05", text: "Vous voulez comprendre votre corps pour mieux le transformer" },
    { number: "06", text: "Vous avez besoin d'un vrai déclic" },
  ]

  const services = [
    { title: "Remise en forme & perte de poids", description: "Stop aux méthodes temporaires et restrictives. Nous vous aidons à retrouver votre silhouette et votre énergie, avec une approche durable et respectueuse de votre corps.", icon: faWeightScale },
    { title: "Recomposition corporelle & prise de muscle", description: "Vous voulez gagner en force, en forme ou redessiner votre silhouette ? Nous combinons nutrition adaptée et entraînements intelligents pour des résultats visibles et solides.", icon: faDumbbell },
    { title: "Santé & bien-être global", description: "Réduire le stress, retrouver un sommeil réparateur, réapprendre à écouter votre corps… Shape It vous accompagne vers un mieux-être global et un mode de vie plus aligné.", icon: faHeartPulse },
    { title: "Performance sportive", description: "Vous êtes déjà sportif(ve) et vous souhaitez passer au niveau supérieur ? Nos coachs optimisent votre technique, votre récupération et votre mental.", icon: faMedal },
  ]

  const features = [
    { title: "Un accompagnement exclusif", description: "Chaque parcours est unique. Nos coachs créent pour vous des protocoles personnalisés qui allient précision, pédagogie et motivation.", icon: faUserGroup },
    { title: "Une méthode éprouvée", description: "Des centaines de personnes nous ont fait confiance pour transformer leur corps, leur mental et leur hygiène de vie.", icon: faFlask },
    { title: "Un espace pensé pour vous", description: "Shape It n'est pas une salle de sport classique. C'est un lieu confidentiel, moderne, inspirant, conçu pour vous offrir une parenthèse rien qu'à vous.", icon: faGem },
  ]

  return (
    <div className="relative min-h-screen bg-[#FAF8F6]">
      <SiteHeader />
      <main>

        {/* ===== INTRO SPLASH — FADE ONLY ===== */}
        {introVisible && (
          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-1000 ${introFading ? 'opacity-0' : 'opacity-100'}`}
          >
            <video
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'blur(30px) brightness(0.25)', transform: 'scale(1.2)' }}
            >
              <source src="/videos/03a00b5e-3baa-47a5-8114-4c9632194503.webm" type="video/webm" />
              <source src="/videos/03a00b5e-3baa-47a5-8114-4c9632194503.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50" />
            
            <motion.div
              className="relative z-10 flex flex-col items-center gap-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Image src="/logo1.png" alt="Shape It" width={240} height={100} className="h-24 md:h-32 w-auto brightness-0 invert" priority />
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
              />
              <motion.p
                className="text-[11px] md:text-xs tracking-[0.6em] text-white/40 uppercase font-light"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                No Limits
              </motion.p>
            </motion.div>
          </div>
        )}

        {/* ===== CINEMATIC HERO ===== */}
        <section className="relative h-screen w-full overflow-hidden">
          <video
            ref={heroVideoRef}
            autoPlay loop muted={heroMuted} playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105"
            style={{ filter: 'brightness(0.4)' }}
          >
            <source src="/videos/03a00b5e-3baa-47a5-8114-4c9632194503.webm" type="video/webm" />
            <source src="/videos/03a00b5e-3baa-47a5-8114-4c9632194503.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-primary-900/80" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
            <motion.div
              className="text-center space-y-6 max-w-4xl"
              initial={{ opacity: 0 }}
              animate={introDone ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={introDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Image src="/logo1.png" alt="Shape It" width={160} height={60} className="h-14 md:h-16 w-auto brightness-0 invert mx-auto mb-4" />
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-[6rem] font-extralight tracking-[0.15em] text-white uppercase leading-none"
                initial={{ opacity: 0, y: 40 }}
                animate={introDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Shape It
              </motion.h1>

              <motion.div
                className="flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={introDone ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/30" />
                <p className="text-[11px] md:text-xs tracking-[0.5em] text-white/50 uppercase font-light">No Limits</p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/30" />
              </motion.div>

              <motion.p
                className="text-base md:text-lg text-white/70 font-light max-w-xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={introDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                Un studio privé dédié à votre évolution physique et mentale
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={introDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="pt-4"
              >
                <Link href="/commencer">
                  <Button size="lg" className="relative group bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-primary-dark font-light tracking-[0.2em] uppercase text-[11px] rounded-full px-10 py-7 transition-all duration-500 overflow-hidden">
                    <span className="relative z-10">Commencer Votre Parcours</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <button
            onClick={() => setHeroMuted(!heroMuted)}
            className="absolute bottom-8 right-8 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
            aria-label={heroMuted ? "Unmute" : "Mute"}
          >
            {heroMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button onClick={handleScrollDown} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-white/40 hover:text-white/70 transition-colors cursor-pointer" aria-label="Scroll down">
            <span className="text-[9px] tracking-[0.4em] uppercase font-light">Découvrir</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </section>

        {/* ===== VIDEO SHOWCASE ===== */}
        <section id="video-showcase" className="relative py-28 md:py-36 bg-primary-900 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-5 font-light">L'expérience</p>
              <h2 className="text-3xl md:text-5xl font-extralight text-white tracking-wide">Votre Transformation</h2>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-8" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {showcaseVideos.map((video, index) => (
                <motion.div
                  key={index}
                  className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.12 }}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => showcaseRefs.current[index]?.play()}
                  onMouseLeave={() => showcaseRefs.current[index]?.pause()}
                >
                  <video
                    ref={(el) => { showcaseRefs.current[index] = el }}
                    muted loop playsInline preload="none"
                    poster={video.poster}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  >
                    <source src={video.webm} type="video/webm" />
                    <source src={video.mp4} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 group-hover:from-black/50 group-hover:via-transparent transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-0 transition-opacity duration-500">
                    <PlayCircle className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={0.8} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white/90 text-xs md:text-sm tracking-[0.25em] uppercase font-light">{video.label}</p>
                      <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-white/40 to-transparent mt-3 transition-all duration-700" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 md:top-6 md:left-6">
                    <span className="text-white/[0.08] text-5xl md:text-7xl font-extralight">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/10 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ABOUT SECTION ===== */}
        <section className="relative py-28 md:py-36 bg-white overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-[150px] -translate-y-1/2" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-md mx-auto text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image src="/logo1.png" alt="Shape It" width={180} height={70} className="mx-auto mb-6" />
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div
                className="relative h-[400px] md:h-[520px] rounded-3xl overflow-hidden shadow-elegant"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Image src="/home.webp" alt="Shape It Studio" fill className="object-cover" />
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                  Bienvenue chez Shape It, un studio privé dédié à votre évolution physique et mentale. Ici, chaque détail est pensé pour vous offrir bien plus qu'un simple entraînement : une expérience sur-mesure, dans un cadre intime, exclusif et motivant.
                </p>
                <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
                  Vous ne suivez pas un programme standard. Vous êtes accompagné(e), guidé(e), challengé(e) par des experts passionnés en coaching et en nutrition.
                </p>
                <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
                  Que vous souhaitiez sculpter votre corps, perdre du poids durablement, retrouver votre énergie ou repousser vos limites sportives, notre méthode unique vous propulse vers des résultats concrets et durables.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CHALLENGES ===== */}
        <section className="relative py-28 md:py-36 bg-primary-50 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary-200/30 rounded-full blur-[120px]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] tracking-[0.5em] text-primary/40 uppercase mb-5 font-light">Identifiez-vous</p>
              <h2 className="text-3xl md:text-5xl font-extralight text-primary-dark tracking-wide">
                Vous allez vous reconnaître si…
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/20 to-transparent mx-auto mt-8" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  className="group relative flex gap-5 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-primary-100 hover:border-primary-200 hover:shadow-soft transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <span className="text-3xl md:text-4xl font-extralight text-primary-200 group-hover:text-primary transition-colors duration-500">{challenge.number}</span>
                  <p className="text-base text-gray-600 group-hover:text-gray-800 self-center font-light transition-colors duration-500">{challenge.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section className="relative py-28 md:py-36 bg-white overflow-hidden">
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-[150px]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] tracking-[0.5em] text-primary/40 uppercase mb-5 font-light">Expertise</p>
              <h2 className="text-3xl md:text-5xl font-extralight text-primary-dark tracking-wide">Nos domaines d'expertise</h2>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/20 to-transparent mx-auto mt-8" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="group relative p-8 md:p-10 rounded-3xl bg-primary-50/50 backdrop-blur-sm border border-primary-100 hover:border-primary-200 hover:shadow-elegant transition-all duration-500 overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="mb-6 flex justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-primary-100 flex items-center justify-center group-hover:border-primary-200 group-hover:shadow-sm transition-all duration-500">
                      <FontAwesomeIcon icon={service.icon} className="text-primary/60 group-hover:text-primary text-xl transition-colors duration-500" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-light text-primary-dark mb-4 text-center tracking-wide">{service.title}</h3>
                  <p className="text-sm md:text-base text-gray-500 text-center leading-relaxed font-light">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="relative py-28 md:py-36 bg-primary-50 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary-200/30 rounded-full blur-[120px] -translate-y-1/2" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] tracking-[0.5em] text-primary/40 uppercase mb-5 font-light">Avantages</p>
              <h2 className="text-3xl md:text-5xl font-extralight text-primary-dark tracking-wide">Ce que nous vous apportons</h2>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/20 to-transparent mx-auto mt-8" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative p-8 md:p-10 rounded-3xl bg-white/80 backdrop-blur-sm border border-primary-100 hover:border-primary-200 hover:shadow-elegant transition-all duration-500 overflow-hidden text-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="mb-6 flex justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center group-hover:border-primary-200 group-hover:shadow-sm transition-all duration-500">
                      <FontAwesomeIcon icon={feature.icon} className="text-primary/60 group-hover:text-primary text-xl transition-colors duration-500" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-light text-primary-dark mb-4 tracking-wide">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed font-light">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COACH ===== */}
        <section className="relative py-28 md:py-36 bg-white overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-100/40 rounded-full blur-[150px]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] tracking-[0.5em] text-primary/40 uppercase mb-5 font-light">Fondatrice</p>
              <h2 className="text-3xl md:text-5xl font-extralight text-primary-dark tracking-wide">Notre Coach</h2>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/20 to-transparent mx-auto mt-8" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div
                className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-elegant"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Image src="/home.webp" alt="Wiam Alibouch" fill className="object-cover" />
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl md:text-3xl font-extralight text-primary-dark tracking-wide">Wiam Alibouch</h3>
                <div className="h-px w-12 bg-gradient-to-r from-primary/30 to-transparent" />
                <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
                  Coach en nutrition supportive et personal trainer certifiée, passionnée par la transformation humaine et le développement de soi. Depuis plus de trois ans, elle a accompagné plus de 1 200 femmes en ligne à se reconnecter à leur corps, à comprendre la nutrition, à aimer le sport et à reprendre le pouvoir sur leur vie.
                </p>
                <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
                  Forte de cette expérience, elle fonde Shape It : un espace pensé pour guider chacun vers une transformation durable, dans un cadre premium et profondément humain.
                </p>
                <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
                  Sa mission ? Apporter un réel changement, utile et impactant, au cœur de la société marocaine.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="relative py-28 md:py-36 overflow-hidden">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.2)' }}>
            <source src="/videos/copy_9282FAA2-ECB2-4E09-9F87-EEA2DEB4EE54.webm" type="video/webm" />
            <source src="/videos/copy_9282FAA2-ECB2-4E09-9F87-EEA2DEB4EE54.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 via-primary-800/40 to-primary-900/70" />
          
          <motion.div
            className="container relative z-10 mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-3xl mx-auto">
              <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-5 font-light">Engagement</p>
              <h2 className="text-3xl md:text-5xl font-extralight text-white mb-8 tracking-wide">La promesse Shape It</h2>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-10" />
              <p className="text-lg md:text-xl mb-8 font-light leading-relaxed text-white/70">
                Rejoindre Shape It, c'est faire le choix d'un coaching qui vous respecte, qui vous pousse à progresser, et qui vous donne enfin les résultats que vous méritez.
              </p>
              <p className="text-lg md:text-xl mb-12 font-light leading-relaxed text-white/60">
                Et parce que nous croyons pleinement en notre méthode, nous vous offrons une garantie 100% satisfait ou remboursé.
              </p>
              <Link href="/commencer">
                <Button size="lg" className="relative group bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-primary-dark font-light tracking-[0.2em] uppercase text-[11px] rounded-full px-10 py-7 transition-all duration-500 overflow-hidden">
                  <span className="relative z-10">Commencer Maintenant</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="relative bg-primary-900 py-16 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-700/30 to-transparent" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <Image src="/logo1.png" alt="Shape It" width={100} height={40} className="h-8 w-auto brightness-0 invert opacity-50" />
            
            <div className="flex items-center gap-5">
              {[
                { label: "Instagram", href: "#", icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                )},
                { label: "TikTok", href: "#", icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.17V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z"/></svg>
                )},
                { label: "WhatsApp", href: "#", icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                )},
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <p className="text-[11px] text-white/25 tracking-[0.2em] uppercase font-light">
              © {new Date().getFullYear()} Shape It. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
