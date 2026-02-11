"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckSquare, ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCalendar, 
  faMapMarkerAlt, 
  faBullseye, 
  faPhoneAlt, 
  faCheckCircle, 
  faQuestionCircle,
  faFemale,
  faMale,
  faUserFriends
} from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from "motion/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const countries = [
  { code: "MA", name: "Morocco", flag: "🇲🇦", dialCode: "+212" },
  { code: "FR", name: "France", flag: "🇫🇷", dialCode: "+33" },
  { code: "BE", name: "Belgium", flag: "🇧🇪", dialCode: "+32" },
]

export default function StartForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [showSplash, setShowSplash] = useState(true)
  const [splashFading, setSplashFading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    countryCode: "MA",
    email: "",
    birthDate: { month: "", day: "", year: "" },
    center: "",
    goals: [] as string[],
    phoneConfirm: "",
    consent: false,
    source: "",
    coachGender: "",
    submittedAt: ""
  })
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [newPhone, setNewPhone] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Splash: video + logo play together, then fade out
  useEffect(() => {
    const fadeOut = () => {
      setSplashFading(true)
      setTimeout(() => setShowSplash(false), 1000)
    }
    const vid = videoRef.current
    if (vid) {
      vid.addEventListener('ended', fadeOut)
      const fallback = setTimeout(fadeOut, 3000)
      return () => { vid.removeEventListener('ended', fadeOut); clearTimeout(fallback) }
    }
    const fallback = setTimeout(fadeOut, 3000)
    return () => clearTimeout(fallback)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('shapeItFormData', JSON.stringify(formData))
  }, [formData])

  const goals = [
    { id: "weight-loss", label: "Perte de Poids" },
    { id: "muscle-gain", label: "Prendre du Muscle" },
    { id: "energy", label: "Plus d'énergie et de productivité" },
    { id: "confidence", label: "Reprendre Confiance en vous" },
    { id: "stress", label: "Réduire le Stress" },
    { id: "posture", label: "Améliorer votre posture et votre santé" },
    { id: "sleep", label: "Améliorer votre Sommeil" },
  ]

  const sources = [
    { id: "facebook-ads", label: "PUB Facebook/Instagram" },
    { id: "social", label: "Facebook/Instagram" },
    { id: "google-ads", label: "Annonce Google" },
    { id: "google-search", label: "Recherche Google" },
    { id: "word-of-mouth", label: "Bouche à Oreille" },
  ]

  const validateStep = (currentStep: number): boolean => {
    const newErrors: { [key: string]: string } = {}
    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis"
        if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis"
        if (!formData.phone.trim()) newErrors.phone = "Le numéro de téléphone est requis"
        else if (!/^\d{8,12}$/.test(formData.phone.trim())) newErrors.phone = "Veuillez entrer un numéro de téléphone valide"
        if (!formData.email.trim()) newErrors.email = "L'email est requis"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = "Veuillez entrer une adresse email valide"
        break
      case 3:
        if (!formData.birthDate.day || !formData.birthDate.month || !formData.birthDate.year) {
          newErrors.birthDate = "La date de naissance complète est requise"
        } else {
          const day = parseInt(formData.birthDate.day), month = parseInt(formData.birthDate.month), year = parseInt(formData.birthDate.year)
          if (isNaN(day) || day < 1 || day > 31) newErrors.birthDate = "Jour invalide"
          if (isNaN(month) || month < 1 || month > 12) newErrors.birthDate = "Mois invalide"
          if (isNaN(year) || year < 1940 || year > new Date().getFullYear() - 16) newErrors.birthDate = "Année invalide"
        }
        break
      case 4:
        if (!formData.center) newErrors.center = "Veuillez sélectionner une option"
        break
      case 5:
        if (formData.goals.length === 0) newErrors.goals = "Veuillez sélectionner au moins un objectif"
        break
      case 6:
        if (!formData.phoneConfirm && !isEditingPhone) newErrors.phoneConfirm = "Veuillez confirmer votre numéro de téléphone"
        break
      case 7:
        if (!formData.coachGender) newErrors.coachGender = "Veuillez sélectionner une préférence de coach"
        if (!formData.consent) newErrors.consent = "Vous devez accepter les conditions pour continuer"
        break
      case 8:
        if (!formData.source) newErrors.source = "Veuillez indiquer comment vous avez connu Shape It"
        break
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting && step === 9) return
    if (!validateStep(step)) {
      toast({ title: "Formulaire incomplet", description: "Veuillez remplir tous les champs requis.", variant: "destructive" })
      return
    }
    if (step < 9) {
      setDirection(1)
      setStep(step + 1)
    } else {
      setIsSubmitting(true)
      const finalFormData = { ...formData, submittedAt: new Date().toISOString() }
      try {
        const response = await fetch('/api/submit-form', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(finalFormData) })
        if (!response.ok) throw new Error('Failed')
        if (typeof window !== 'undefined') localStorage.setItem('shapeItFormData', JSON.stringify(finalFormData))
        setDirection(1)
        setStep(10)
      } catch {
        toast({ title: "Erreur", description: "Une erreur est survenue. Veuillez réessayer.", variant: "destructive" })
        setIsSubmitting(false)
      }
    }
  }

  const handleBack = () => { if (step > 1) { setDirection(-1); setStep(step - 1) } }

  const handlePhoneConfirmation = (value: string) => {
    setFormData(prev => ({ ...prev, phoneConfirm: value }))
    if (value === "yes") { setTimeout(() => { setDirection(1); setStep(prev => prev + 1) }, 300) }
    else { setIsEditingPhone(true); setNewPhone(formData.phone) }
  }

  const handlePhoneUpdate = () => {
    setFormData({ ...formData, phone: newPhone, phoneConfirm: "" })
    setIsEditingPhone(false)
  }

  const getDialCode = (code: string) => countries.find(c => c.code === code)?.dialCode || ""
  const getCountryDetails = (code: string) => countries.find(c => c.code === code) || countries[0]
  const progressPercentage = ((step - 1) / 8) * 100

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary-900">
      {/* Video + Splash intro */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
            animate={{ opacity: splashFading ? 0 : 1 }}
            transition={{ duration: 0.8 }}
          >
            <video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.3)' }}>
              <source src="/videos/form_bg.webm" type="video/webm" />
              <source src="/videos/form_bg.mp4" type="video/mp4" />
            </video>
            <motion.div
              className="relative z-10 flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image src="/logo1.png" alt="Shape It" width={200} height={80} className="h-20 md:h-24 w-auto brightness-0 invert" priority />
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <p className="text-[11px] tracking-[0.6em] text-white/50 uppercase font-light">No Limits</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-black" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour
            </Button>
          </Link>
          <Image src="/logo1.png" alt="Shape It" width={80} height={32} className="h-8 w-auto brightness-0 invert opacity-60" />
        </div>

        {step < 10 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg">
              {/* Price badge */}
              <motion.div className="flex justify-center mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-white/90 text-sm font-light tracking-wide">Consultation Bilan Forme</span>
                  <span className="text-white font-semibold text-sm">500 MAD</span>
                </div>
              </motion.div>

              {/* Progress */}
              <div className="mb-8 px-2">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-primary to-white/80 rounded-full" animate={{ width: `${progressPercentage}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-white/30 tracking-wider uppercase font-light">
                  <span>Début</span>
                  <span>Étape {step}/9</span>
                  <span>Fin</span>
                </div>
              </div>

              {/* Form card */}
              <div className="rounded-3xl bg-white/[0.07] backdrop-blur-2xl border border-white/10 p-6 md:p-8 shadow-2xl">
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: "easeInOut" }}>

                      {/* Step 1: Contact Info */}
                      {step === 1 && (
                        <div className="space-y-5">
                          <div className="text-center mb-6">
                            <h2 className="text-2xl font-extralight text-white tracking-wide">Commencez votre parcours</h2>
                            <p className="text-white/50 text-sm mt-2 font-light">Merci de nous laisser vos coordonnées</p>
                          </div>
                          <div className="grid gap-4">
                            <div>
                              <Label htmlFor="firstName" className="text-xs text-white/50 uppercase tracking-wider font-light">Prénom *</Label>
                              <Input id="firstName" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className={`mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 focus:ring-1 focus:ring-white/10 ${errors.firstName ? 'border-red-400/50' : ''}`} placeholder="Votre prénom" />
                              {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                              <Label htmlFor="lastName" className="text-xs text-white/50 uppercase tracking-wider font-light">Nom *</Label>
                              <Input id="lastName" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className={`mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 focus:ring-1 focus:ring-white/10 ${errors.lastName ? 'border-red-400/50' : ''}`} placeholder="Votre nom" />
                              {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                            <div>
                              <Label htmlFor="phone" className="text-xs text-white/50 uppercase tracking-wider font-light">Téléphone *</Label>
                              <div className="flex mt-1.5">
                                <Select value={formData.countryCode} onValueChange={(value) => setFormData({ ...formData, countryCode: value })}>
                                  <SelectTrigger className={`w-[110px] border-r-0 rounded-r-none bg-white/5 border-white/10 text-white focus:border-white/30 ${errors.phone ? 'border-red-400/50' : ''}`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-primary-900 border-white/10">
                                    {countries.map((c) => (
                                      <SelectItem key={c.code} value={c.code} className="text-white">
                                        <span className="flex items-center"><span className="mr-2">{c.flag}</span>{c.dialCode}</span>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Input id="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                  className={`flex-1 rounded-l-none bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 ${errors.phone ? 'border-red-400/50' : ''}`} placeholder="Votre téléphone" />
                              </div>
                              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                              <Label htmlFor="email" className="text-xs text-white/50 uppercase tracking-wider font-light">E-mail *</Label>
                              <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 focus:ring-1 focus:ring-white/10 ${errors.email ? 'border-red-400/50' : ''}`} placeholder="votre@email.com" />
                              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Bilan Forme details with 500 MAD */}
                      {step === 2 && (
                        <div className="space-y-5">
                          <div className="text-center mb-4">
                            <motion.div className="w-14 h-14 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}>
                              <FontAwesomeIcon icon={faCheckCircle} className="text-primary text-2xl" />
                            </motion.div>
                            <h2 className="text-2xl font-extralight text-white">Parfait {formData.firstName} !</h2>
                            <p className="text-white/50 text-sm mt-2 font-light">Votre Bilan Forme complet</p>
                          </div>
                          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                              <span className="text-white/70 text-sm font-light">Consultation complète</span>
                              <span className="text-white font-semibold text-lg">500 MAD</span>
                            </div>
                            <div className="grid gap-2">
                              {["1h dédiée pour votre scan de progression", "Tests avancés personnalisés", "Analyse masse grasse/masse musculaire", "Évaluation posturale détaillée", "Calcul métabolisme basal", "Test de condition physique", "Définition précise de vos objectifs", "Plan d'action sur mesure"].map((item, i) => (
                                <motion.div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                  <CheckSquare className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                  <span className="text-white/70 text-sm font-light">{item}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Birth date */}
                      {step === 3 && (
                        <div className="space-y-5">
                          <div className="text-center mb-4">
                            <motion.div className="w-14 h-14 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                              <FontAwesomeIcon icon={faCalendar} className="text-primary text-2xl" />
                            </motion.div>
                            <h2 className="text-2xl font-extralight text-white">Date de naissance</h2>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <Label className="text-xs text-white/50 uppercase tracking-wider font-light">Mois</Label>
                              <Input placeholder="MM" maxLength={2} value={formData.birthDate.month} onChange={(e) => setFormData({ ...formData, birthDate: { ...formData.birthDate, month: e.target.value } })}
                                className={`mt-1.5 text-center bg-white/5 border-white/10 text-white placeholder:text-white/20 ${errors.birthDate ? 'border-red-400/50' : ''}`} />
                            </div>
                            <div>
                              <Label className="text-xs text-white/50 uppercase tracking-wider font-light">Jour</Label>
                              <Input placeholder="JJ" maxLength={2} value={formData.birthDate.day} onChange={(e) => setFormData({ ...formData, birthDate: { ...formData.birthDate, day: e.target.value } })}
                                className={`mt-1.5 text-center bg-white/5 border-white/10 text-white placeholder:text-white/20 ${errors.birthDate ? 'border-red-400/50' : ''}`} />
                            </div>
                            <div>
                              <Label className="text-xs text-white/50 uppercase tracking-wider font-light">Année</Label>
                              <Input placeholder="AAAA" maxLength={4} value={formData.birthDate.year} onChange={(e) => setFormData({ ...formData, birthDate: { ...formData.birthDate, year: e.target.value } })}
                                className={`mt-1.5 text-center bg-white/5 border-white/10 text-white placeholder:text-white/20 ${errors.birthDate ? 'border-red-400/50' : ''}`} />
                            </div>
                          </div>
                          {errors.birthDate && <p className="text-red-400 text-xs text-center">{errors.birthDate}</p>}
                        </div>
                      )}

                      {/* Step 4: Location */}
                      {step === 4 && (
                        <div className="space-y-5">
                          <div className="text-center mb-4">
                            <motion.div className="w-14 h-14 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary text-2xl" />
                            </motion.div>
                            <h2 className="text-2xl font-extralight text-white">Merci {formData.firstName} 😊</h2>
                            <p className="text-white/50 text-sm mt-2 font-light">Connaissez-vous la localisation du centre?</p>
                          </div>
                          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                            <p className="text-white/50 text-xs uppercase tracking-wider mb-2 font-light">Notre centre</p>
                            <p className="text-white/90 font-light">SHAPE IT, boulevard de La grande ceinture, Ain Diab, Casablanca</p>
                          </div>
                          <div className="flex gap-3">
                            {[{ v: "ain-diab", l: "Oui" }, { v: "need-info", l: "Non" }].map(o => (
                              <button
                                type="button"
                                key={o.v}
                                onClick={() => { setFormData(prev => ({ ...prev, center: o.v })); setErrors({}); setTimeout(() => { setDirection(1); setStep(prev => prev + 1) }, 350) }}
                                className={`flex-1 p-4 rounded-2xl border transition-all cursor-pointer ${formData.center === o.v ? 'bg-white/10 border-white/30' : 'border-white/10 hover:bg-white/5'}`}
                              >
                                <span className="text-white/80 font-light">{o.l}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 5: Goals */}
                      {step === 5 && (
                        <div className="space-y-5">
                          <div className="text-center mb-4">
                            <motion.div className="w-14 h-14 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                              <FontAwesomeIcon icon={faBullseye} className="text-primary text-2xl" />
                            </motion.div>
                            <h2 className="text-2xl font-extralight text-white">Vos objectifs</h2>
                            <p className="text-white/50 text-sm mt-2 font-light">Sélectionnez un ou plusieurs objectifs</p>
                          </div>
                          <div className="grid gap-2">
                            {goals.map((goal, i) => (
                              <motion.div
                                key={goal.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${formData.goals.includes(goal.id) ? 'bg-white/10 border-white/30' : 'border-white/10 hover:bg-white/5'}`}
                                onClick={() => {
                                  const newGoals = formData.goals.includes(goal.id) ? formData.goals.filter(g => g !== goal.id) : [...formData.goals, goal.id]
                                  setFormData({ ...formData, goals: newGoals })
                                  setErrors({})
                                }}
                              >
                              <div className={`w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center ${formData.goals.includes(goal.id) ? 'bg-primary border-primary' : 'border-white/20'}`}>
                                {formData.goals.includes(goal.id) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                              </div>
                                <span className="text-white/80 text-sm font-light">{goal.label}</span>
                              </motion.div>
                            ))}
                          </div>
                          {errors.goals && <p className="text-red-400 text-xs text-center mt-2">{errors.goals}</p>}
                        </div>
                      )}

                      {/* Step 6: Phone confirmation */}
                      {step === 6 && (
                        <div className="space-y-5">
                          <div className="text-center mb-4">
                            <motion.div className="w-14 h-14 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                              <FontAwesomeIcon icon={faPhoneAlt} className="text-primary text-2xl" />
                            </motion.div>
                            <h2 className="text-2xl font-extralight text-white">Confirmation</h2>
                            <p className="text-white/50 text-sm mt-2 font-light">Votre numéro est-il correct ?</p>
                          </div>
                          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
                            <p className="text-white/50 text-xs uppercase tracking-wider mb-2 font-light">Numéro enregistré</p>
                            <p className="text-white text-xl font-light tracking-wide">{getDialCode(formData.countryCode)} {formData.phone}</p>
                          </div>
                          {!isEditingPhone ? (
                            <div className="flex gap-3">
                              {[{ v: "yes", l: "Oui, c'est correct" }, { v: "no", l: "Non, modifier" }].map(o => (
                                <button
                                  type="button"
                                  key={o.v}
                                  onClick={() => handlePhoneConfirmation(o.v)}
                                  className={`flex-1 p-4 rounded-2xl border transition-all cursor-pointer ${formData.phoneConfirm === o.v ? 'bg-white/10 border-white/30' : 'border-white/10 hover:bg-white/5'}`}
                                >
                                  <span className="text-white/80 text-sm font-light">{o.l}</span>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <Input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30" placeholder="Nouveau numéro" />
                              <Button type="button" onClick={handlePhoneUpdate} className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">Mettre à jour</Button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 7: Coach gender + consent */}
                      {step === 7 && (
                        <div className="space-y-5">
                          <div className="text-center mb-4">
                            <h2 className="text-2xl font-extralight text-white">Préférence de coach</h2>
                            <p className="text-white/50 text-sm mt-2 font-light">Avez-vous une préférence ?</p>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { v: "female", l: "Femme", icon: faFemale },
                              { v: "male", l: "Homme", icon: faMale },
                              { v: "no-preference", l: "Peu importe", icon: faUserFriends },
                            ].map(o => (
                              <button
                                type="button"
                                key={o.v}
                                onClick={() => { setFormData(prev => ({ ...prev, coachGender: o.v })); setErrors({}) }}
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all cursor-pointer ${formData.coachGender === o.v ? 'bg-white/10 border-white/30' : 'border-white/10 hover:bg-white/5'}`}
                              >
                                <FontAwesomeIcon icon={o.icon} className="text-primary text-xl" />
                                <span className="text-white/80 text-xs font-light">{o.l}</span>
                              </button>
                            ))}
                          </div>
                          {errors.coachGender && <p className="text-red-400 text-xs text-center">{errors.coachGender}</p>}
                          <div className="pt-3 border-t border-white/10">
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                              <Checkbox
                                id="consent"
                                checked={formData.consent}
                                onCheckedChange={(checked) => { setFormData({ ...formData, consent: checked as boolean }); setErrors({}) }}
                                className="mt-0.5 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                              <Label htmlFor="consent" className="text-white/60 text-xs font-light leading-relaxed cursor-pointer">
                                J&apos;accepte que mes données soient utilisées pour me contacter et planifier ma consultation Bilan Forme à 500 MAD.
                              </Label>
                            </div>
                            {errors.consent && <p className="text-red-400 text-xs mt-1">{errors.consent}</p>}
                          </div>
                        </div>
                      )}

                      {/* Step 8: Source */}
                      {step === 8 && (
                        <div className="space-y-5">
                          <div className="text-center mb-4">
                            <motion.div className="w-14 h-14 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                              <FontAwesomeIcon icon={faQuestionCircle} className="text-primary text-2xl" />
                            </motion.div>
                            <h2 className="text-2xl font-extralight text-white">Comment nous avez-vous connu ?</h2>
                          </div>
                          <div className="grid gap-2">
                            {sources.map((source, i) => (
                              <motion.div
                                key={source.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${formData.source === source.id ? 'bg-white/10 border-white/30' : 'border-white/10 hover:bg-white/5'}`}
                                onClick={() => { setFormData({ ...formData, source: source.id }); setErrors({}) }}
                              >
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.source === source.id ? 'border-primary' : 'border-white/20'}`}>
                                  {formData.source === source.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                                </div>
                                <span className="text-white/80 text-sm font-light">{source.label}</span>
                              </motion.div>
                            ))}
                          </div>
                          {errors.source && <p className="text-red-400 text-xs text-center mt-2">{errors.source}</p>}
                        </div>
                      )}

                      {/* Step 9: Final confirmation with 500 MAD reminder */}
                      {step === 9 && (
                        <div className="space-y-5">
                          <div className="text-center mb-4">
                            <motion.div className="w-14 h-14 bg-amber-500/20 rounded-2xl mx-auto flex items-center justify-center mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                              <Sparkles className="text-amber-400 w-6 h-6" />
                            </motion.div>
                            <h2 className="text-2xl font-extralight text-white">Dernière étape !</h2>
                            <p className="text-white/50 text-sm mt-2 font-light">Vérifiez vos informations avant de confirmer</p>
                          </div>
                          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/50 font-light">Nom</span>
                              <span className="text-white/90">{formData.firstName} {formData.lastName}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/50 font-light">Téléphone</span>
                              <span className="text-white/90">{getDialCode(formData.countryCode)} {formData.phone}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/50 font-light">Email</span>
                              <span className="text-white/90">{formData.email}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/50 font-light">Objectifs</span>
                              <span className="text-white/90 text-right max-w-[60%]">{formData.goals.map(g => goals.find(gl => gl.id === g)?.label).join(', ')}</span>
                            </div>
                          </div>
                          <motion.div
                            className="rounded-2xl bg-gradient-to-r from-amber-500/10 to-primary/10 border border-amber-500/20 p-5 text-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <p className="text-white/50 text-xs uppercase tracking-wider mb-1 font-light">Consultation Bilan Forme</p>
                            <p className="text-white text-3xl font-light">500 <span className="text-lg text-white/70">MAD</span></p>
                            <p className="text-white/40 text-xs mt-2 font-light">Payable au centre le jour du rendez-vous</p>
                          </motion.div>
                        </div>
                      )}

                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/10">
                    {step > 1 ? (
                      <Button type="button" variant="ghost" onClick={handleBack} className="text-white/50 hover:text-white hover:bg-white/10 text-sm">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Retour
                      </Button>
                    ) : <div />}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2.5 rounded-xl text-sm font-light transition-all ${step === 9 ? 'bg-gradient-to-r from-amber-500 to-primary hover:from-amber-600 hover:to-primary/90 text-white shadow-lg shadow-amber-500/20' : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi...</span>
                      ) : step === 9 ? (
                        <span className="flex items-center gap-2">Confirmer — 500 MAD <Sparkles className="w-4 h-4" /></span>
                      ) : (
                        <span className="flex items-center gap-2">Suivant <ArrowRight className="h-4 w-4" /></span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        ) : (
          /* Step 10: Thank you */
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              className="w-full max-w-lg text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-3xl bg-white/[0.07] backdrop-blur-2xl border border-white/10 p-8 md:p-12 shadow-2xl">
                <motion.div
                  className="w-20 h-20 bg-primary/20 rounded-3xl mx-auto flex items-center justify-center mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="text-primary text-4xl" />
                </motion.div>
                <h2 className="text-3xl font-extralight text-white mb-3">Merci {formData.firstName} !</h2>
                <p className="text-white/50 font-light mb-6">Votre demande de consultation a été envoyée avec succès.</p>
                <motion.div
                  className="rounded-2xl bg-gradient-to-r from-amber-500/10 to-primary/10 border border-amber-500/20 p-5 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1 font-light">Consultation Bilan Forme</p>
                  <p className="text-white text-3xl font-light">500 <span className="text-lg text-white/70">MAD</span></p>
                  <p className="text-white/40 text-xs mt-2 font-light">Payable au centre le jour du rendez-vous</p>
                </motion.div>
                <p className="text-white/40 text-sm font-light mb-8">Notre équipe vous contactera sous 24h pour planifier votre rendez-vous.</p>
                <Link href="/">
                  <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl px-8">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Retour à l&apos;accueil
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
