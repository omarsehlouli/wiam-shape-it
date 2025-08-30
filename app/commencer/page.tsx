"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckSquare, ThumbsUp, ArrowLeft, ArrowRight, Phone } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCalendar, 
  faMapMarkerAlt, 
  faBullseye, 
  faPhoneAlt, 
  faCheckCircle, 
  faQuestionCircle,
  faEnvelope,
  faFemale,
  faMale,
  faUserFriends
} from '@fortawesome/free-solid-svg-icons'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const countries = [
  { code: "MA", name: "Morocco", flag: "🇲🇦", dialCode: "+212" },
  { code: "FR", name: "France", flag: "🇫🇷", dialCode: "+33" },
  { code: "BE", name: "Belgium", flag: "🇧🇪", dialCode: "+32" },
  // Add more countries as needed
]

export default function StartForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    countryCode: "MA",
    email: "",
    birthDate: {
      month: "",
      day: "",
      year: "",
    },
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

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shapeItFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const centers = [
    {
      id: "ain-diab",
      name: "SHAPE IT",
      address: "boulevard de La grande ceinture, Ain Diab, Casablanca",
    },
  ]

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
    const newErrors: { [key: string]: string } = {};
    
    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) {
          newErrors.firstName = "Le prénom est requis";
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = "Le nom est requis";
        }
        if (!formData.phone.trim()) {
          newErrors.phone = "Le numéro de téléphone est requis";
        } else if (!/^\d{8,12}$/.test(formData.phone.trim())) {
          newErrors.phone = "Veuillez entrer un numéro de téléphone valide";
        }
        if (!formData.email.trim()) {
          newErrors.email = "L'email est requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
          newErrors.email = "Veuillez entrer une adresse email valide";
        }
        break;
      
      case 2:
        if (!formData.birthDate.day || !formData.birthDate.month || !formData.birthDate.year) {
          newErrors.birthDate = "La date de naissance complète est requise";
        } else {
          const day = parseInt(formData.birthDate.day);
          const month = parseInt(formData.birthDate.month);
          const year = parseInt(formData.birthDate.year);
          
          if (isNaN(day) || day < 1 || day > 31) {
            newErrors.birthDate = "Jour invalide";
          }
          if (isNaN(month) || month < 1 || month > 12) {
            newErrors.birthDate = "Mois invalide";
          }
          if (isNaN(year) || year < 1940 || year > new Date().getFullYear() - 16) {
            newErrors.birthDate = "Année invalide";
          }
        }
        break;
      
      case 3:
        if (!formData.center) {
          newErrors.center = "Veuillez sélectionner une option";
        }
        break;
        
      case 4:
        if (formData.goals.length === 0) {
          newErrors.goals = "Veuillez sélectionner au moins un objectif";
        }
        break;
        
      case 5:
        if (!formData.phoneConfirm && !isEditingPhone) {
          newErrors.phoneConfirm = "Veuillez confirmer votre numéro de téléphone";
        }
        break;
        
      case 6:
        if (!formData.coachGender) {
          newErrors.coachGender = "Veuillez sélectionner une préférence de coach";
        }
        if (!formData.consent) {
          newErrors.consent = "Vous devez accepter les conditions pour continuer";
        }
        break;
        
      case 7:
        if (!formData.source) {
          newErrors.source = "Veuillez indiquer comment vous avez connu Shape It";
        }
        break;
        
      case 8:
        // No validation needed for the reminder step
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting && step === 8) return; // Prevent multiple submissions on the final step

    // Validate current step
    if (!validateStep(step)) {
      // Display toast notification for error
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs requis pour continuer.",
        variant: "destructive",
      });
      return;
    }
    
    if (step < 8) {
      setStep(step + 1)
    } else {
      // Handle form submission
      setIsSubmitting(true); // Set loading state
      const finalFormData = {
        ...formData,
        submittedAt: new Date().toISOString()
      }
      console.log("Form Submitted:", finalFormData)
      
      try {
        // Send form data to API
        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalFormData)
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        // Save to localStorage for backup
        if (typeof window !== 'undefined') {
          localStorage.setItem('shapeItFormData', JSON.stringify(finalFormData));
        }
        
        setStep(9) // Show thank you page
      } catch (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.",
          variant: "destructive",
        });
        setIsSubmitting(false); // Reset loading state on error
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handlePhoneConfirmation = (value: string) => {
    setFormData({ ...formData, phoneConfirm: value });
    
    if (value === "yes") {
      // Auto-proceed to next step if 'Yes' is selected
      setTimeout(() => setStep(step + 1), 300);
    } else {
      // Show the edit phone UI if 'No' is selected
      setIsEditingPhone(true);
      setNewPhone(formData.phone);
    }
  }

  const handlePhoneUpdate = () => {
    setFormData({ ...formData, phone: newPhone, phoneConfirm: "" });
    setIsEditingPhone(false);
    // Don't auto-proceed, let them confirm the new number first
  }

  // Get country dial code from country code
  const getDialCode = (code: string) => {
    const country = countries.find(c => c.code === code);
    return country ? country.dialCode : "";
  }

  // Get country flag and details
  const getCountryDetails = (code: string) => {
    const country = countries.find(c => c.code === code);
    return country || countries[0]; // Default to first country if not found
  }

  // Calculate progress percentage
  const progressPercentage = ((step - 1) / 7) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/30 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2 text-white bg-primary/20 border-primary/30 hover:bg-primary/30 hover:text-white transition-all">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Button>
          </Link>
        </div>
        {step < 9 ? (
          <div className="mx-auto max-w-2xl">
            <div className="flex justify-center mb-8">
              <Image
                src="/logo3.png"
                alt="Shape It"
                width={120}
                height={50}
                className="h-20 w-auto"
              />
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="h-3 w-full bg-white/70 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-in-out" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-white font-medium">
                <span>Début</span>
                <span>Étape {step}/8</span>
                <span>Fin</span>
              </div>
            </div>
            
            <div className="rounded-xl bg-white/90 backdrop-blur-sm p-8 shadow-xl border border-primary/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-primary">
                        Commencez votre parcours Shape It
                      </h2>
                      <p className="text-primary-dark mt-2">Merci de nous laisser vos coordonnées ci-dessous</p>
                    </div>
                    
                    <div className="grid gap-5">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-primary-dark">Prénom *</Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={`mt-1 bg-white/70 border-primary/20 focus:border-primary transition-all focus:ring-2 focus:ring-primary/20 text-gray-800 font-medium ${errors.firstName ? 'border-red-500' : ''}`}
                          placeholder="Votre prénom"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-primary-dark">Nom *</Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={`mt-1 bg-white/70 border-primary/20 focus:border-primary transition-all focus:ring-2 focus:ring-primary/20 text-gray-800 font-medium ${errors.lastName ? 'border-red-500' : ''}`}
                          placeholder="Votre nom"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-primary-dark">Numéro de téléphone *</Label>
                        <div className="flex mt-1">
                          <Select
                            value={formData.countryCode}
                            onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                          >
                            <SelectTrigger className={`w-[120px] border-r-0 rounded-r-none bg-white/70 border-primary/20 focus:border-primary transition-all focus:ring-2 focus:ring-primary/20 text-gray-800 font-medium ${errors.phone ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder="Pays" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              {countries.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  <span className="flex items-center">
                                    <span className="mr-2">{country.flag}</span>
                                    <span>{country.dialCode}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`flex-1 rounded-l-none bg-white/70 border-primary/20 focus:border-primary transition-all focus:ring-2 focus:ring-primary/20 text-gray-800 font-medium ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="Votre téléphone"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-primary-dark">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`mt-1 bg-white/70 border-primary/20 focus:border-primary transition-all focus:ring-2 focus:ring-primary/20 text-gray-800 font-medium ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="votre@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                        <FontAwesomeIcon icon={faCalendar} className="text-primary text-3xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-primary">
                        D'accord {formData.firstName}, quelle est votre date de naissance ?
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="month" className="text-sm font-medium text-primary-dark">Mois</Label>
                        <Input
                          id="month"
                          placeholder="MM"
                          required
                          maxLength={2}
                          value={formData.birthDate.month}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              birthDate: { ...formData.birthDate, month: e.target.value },
                            })
                          }
                          className={`mt-1 text-center bg-white/70 border-primary/20 focus:border-primary transition-all focus:ring-2 focus:ring-primary/20 text-gray-800 font-medium ${errors.birthDate ? 'border-red-500' : ''}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="day" className="text-sm font-medium text-primary-dark">Jour</Label>
                        <Input
                          id="day"
                          placeholder="JJ"
                          required
                          maxLength={2}
                          value={formData.birthDate.day}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              birthDate: { ...formData.birthDate, day: e.target.value },
                            })
                          }
                          className={`mt-1 text-center bg-white/70 border-primary/20 focus:border-primary transition-all focus:ring-2 focus:ring-primary/20 text-gray-800 font-medium ${errors.birthDate ? 'border-red-500' : ''}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="year" className="text-sm font-medium text-primary-dark">Année</Label>
                        <Input
                          id="year"
                          placeholder="AAAA"
                          required
                          maxLength={4}
                          value={formData.birthDate.year}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              birthDate: { ...formData.birthDate, year: e.target.value },
                            })
                          }
                          className={`mt-1 text-center bg-white/70 border-primary/20 focus:border-primary transition-all focus:ring-2 focus:ring-primary/20 text-gray-800 font-medium ${errors.birthDate ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.birthDate && (
                        <div className="col-span-3">
                          <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary text-3xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-primary">
                        Merci {formData.firstName}. 😊
                      </h2>
                      <p className="text-primary-dark">Connaissez-vous la localisation du centre?</p>
                    </div>
                    
                    <div className="bg-primary/10 p-5 rounded-lg border border-primary/20 text-center mb-6">
                      <p className="text-lg font-medium text-primary">Notre centre se trouve à:</p>
                      <div className="flex items-center justify-center mt-3">
                        <div className="bg-white/80 px-4 py-3 rounded-lg border border-primary/30 inline-flex items-center shadow-sm">
                          <span className="font-bold text-xl text-primary-dark">SHAPE IT, boulevard de La grande ceinture, Ain Diab, Casablanca</span>
                        </div>
                      </div>
                    </div>
                    
                    <RadioGroup
                      value={formData.center}
                      onValueChange={(value) => {
                        setFormData({ ...formData, center: value });
                        // Auto-proceed to next step if value is selected and valid
                        if (value) {
                          const newErrors = { ...errors };
                          delete newErrors.center;
                          setErrors(newErrors);
                          setTimeout(() => setStep(step + 1), 300);
                        }
                      }}
                      className="flex justify-center gap-4"
                    >
                      <div className={`flex-1 flex items-center justify-center p-4 rounded-lg border ${errors.center ? 'border-red-500' : 'border-primary/30'} transition-all hover:bg-primary/10 ${formData.center === "ain-diab" ? 'bg-primary/10 border-primary shadow-sm' : ''}`}>
                        <RadioGroupItem value="ain-diab" id="confirm-yes" className="hidden" />
                        <Label htmlFor="confirm-yes" className="flex items-center justify-center cursor-pointer w-full">
                          <span className="font-medium text-primary-dark">Oui</span>
                        </Label>
                      </div>
                      <div className={`flex-1 flex items-center justify-center p-4 rounded-lg border ${errors.center ? 'border-red-500' : 'border-primary/30'} transition-all hover:bg-primary/10 ${formData.center === "need-info" ? 'bg-primary/10 border-primary shadow-sm' : ''}`}>
                        <RadioGroupItem value="need-info" id="confirm-no" className="hidden" />
                        <Label htmlFor="confirm-no" className="flex items-center justify-center cursor-pointer w-full">
                          <span className="font-medium text-primary-dark">Non</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.center && (
                      <p className="text-red-500 text-sm mt-2 text-center">{errors.center}</p>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                        <FontAwesomeIcon icon={faBullseye} className="text-primary text-3xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-primary">
                        Vos objectifs
                      </h2>
                      <p className="text-primary-dark">Est-ce que vous pouvez nous en dire plus sur ce que vous souhaitez accomplir ?</p>
                      <p className="text-sm text-primary-light italic">Choisissez-en autant que vous voulez</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      {goals.map((goal) => (
                        <div 
                          key={goal.id} 
                          className={`flex items-center space-x-3 p-4 rounded-lg border ${errors.goals ? 'border-red-500' : 'border-primary/30'} transition-all hover:bg-primary/10 ${formData.goals.includes(goal.id) ? 'bg-primary/10 border-primary shadow-sm' : ''}`}
                        >
                          <Checkbox
                            id={goal.id}
                            checked={formData.goals.includes(goal.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                const newGoals = [...formData.goals, goal.id];
                                setFormData({
                                  ...formData,
                                  goals: newGoals,
                                });
                                if (newGoals.length > 0) {
                                  const newErrors = { ...errors };
                                  delete newErrors.goals;
                                  setErrors(newErrors);
                                }
                              } else {
                                setFormData({
                                  ...formData,
                                  goals: formData.goals.filter((id) => id !== goal.id),
                                })
                              }
                            }}
                            className="text-primary data-[state=checked]:bg-primary border-primary/50"
                          />
                          <Label htmlFor={goal.id} className="flex-1 cursor-pointer text-primary-dark">
                            {goal.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.goals && (
                      <p className="text-red-500 text-sm mt-2 text-center">{errors.goals}</p>
                    )}
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                        <FontAwesomeIcon icon={faPhoneAlt} className="text-primary text-3xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-primary">
                        Confirmation de contact
                      </h2>
                      <p className="text-primary-dark">Pour accéder à votre Bilan Forme (500 DH qui seront déduits du tarifs si engagement), veuillez nous confirmer votre numéro</p>
                    </div>
                    
                    <div className="bg-primary/10 p-5 rounded-lg border border-primary/20 text-center mb-6">
                      <p className="text-lg font-medium text-primary">Est-ce bien votre numéro ?</p>
                      <div className="flex items-center justify-center mt-3">
                        <div className="bg-white/80 px-4 py-3 rounded-lg border border-primary/30 inline-flex items-center shadow-sm">
                          <span className="mr-2 text-lg">{getCountryDetails(formData.countryCode).flag}</span>
                          <span className="font-bold text-xl text-primary-dark">{getDialCode(formData.countryCode)} {formData.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    {!isEditingPhone ? (
                      <>
                        <RadioGroup
                          value={formData.phoneConfirm}
                          onValueChange={(value) => handlePhoneConfirmation(value)}
                          className="flex justify-center gap-4"
                        >
                          <div className={`flex-1 flex items-center justify-center p-4 rounded-lg border ${errors.phoneConfirm ? 'border-red-500' : 'border-primary/30'} transition-all hover:bg-primary/10 ${formData.phoneConfirm === "yes" ? 'bg-primary/10 border-primary shadow-sm' : ''}`}>
                            <RadioGroupItem value="yes" id="confirm-yes" className="hidden" />
                            <Label htmlFor="confirm-yes" className="flex items-center justify-center cursor-pointer w-full">
                              <span className="font-medium text-primary-dark">Oui</span>
                            </Label>
                          </div>
                          <div className={`flex-1 flex items-center justify-center p-4 rounded-lg border ${errors.phoneConfirm ? 'border-red-500' : 'border-primary/30'} transition-all hover:bg-primary/10 ${formData.phoneConfirm === "no" ? 'bg-primary/10 border-primary shadow-sm' : ''}`}>
                            <RadioGroupItem value="no" id="confirm-no" className="hidden" />
                            <Label htmlFor="confirm-no" className="flex items-center justify-center cursor-pointer w-full">
                              <span className="font-medium text-primary-dark">Non</span>
                            </Label>
                          </div>
                        </RadioGroup>
                        {errors.phoneConfirm && (
                          <p className="text-red-500 text-sm mt-2 text-center">{errors.phoneConfirm}</p>
                        )}
                      </>
                    ) : (
                      <div className="space-y-4 mt-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
                        <div className="bg-primary/10 p-5 rounded-lg border border-primary/20">
                          <h3 className="font-medium text-primary mb-3 flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            Modifiez votre numéro de téléphone
                          </h3>
                          <div className="flex">
                            <Select
                              value={formData.countryCode}
                              onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                            >
                              <SelectTrigger className="w-[120px] border-r-0 rounded-r-none bg-white/70 border-primary/20 focus:border-primary transition-all focus:ring-2 focus:ring-primary/20">
                                <SelectValue>
                                  <span className="flex items-center">
                                    <span className="mr-1">{getCountryDetails(formData.countryCode).flag}</span>
                                    <span>{getDialCode(formData.countryCode)}</span>
                                  </span>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                {countries.map((country) => (
                                  <SelectItem key={country.code} value={country.code}>
                                    <span className="flex items-center">
                                      <span className="mr-2">{country.flag}</span>
                                      <span>{country.dialCode}</span>
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Input
                              type="tel"
                              required
                              value={newPhone}
                              onChange={(e) => setNewPhone(e.target.value)}
                              className="flex-1 rounded-l-none bg-white/70 border-primary/20 focus:border-primary transition-all focus:ring-2 focus:ring-primary/20 text-gray-800 font-medium"
                              placeholder="Votre téléphone"
                            />
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button 
                              type="button"
                              onClick={handlePhoneUpdate}
                              className="bg-primary hover:bg-primary-dark text-white transition-all"
                            >
                              Mettre à jour pour confirmation
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-primary text-3xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-primary">
                        Presque terminé !
                      </h2>
                      <p className="text-primary-dark">Veuillez confirmer que vous autorisez l'utilisation des informations recueillies pour vous contacter</p>
                    </div>
                    
                    <div className="space-y-6 bg-primary/10 p-5 rounded-lg border border-primary/20">
                      <div>
                        <h3 className="font-medium text-primary mb-3 text-center">Vous préférez être coaché par :</h3>
                        <RadioGroup
                          value={formData.coachGender}
                          onValueChange={(value) => {
                            setFormData({ ...formData, coachGender: value });
                            if (value) {
                              const newErrors = { ...errors };
                              delete newErrors.coachGender;
                              setErrors(newErrors);
                            }
                          }}
                          className="grid grid-cols-3 gap-3"
                        >
                          <div className={`flex flex-col items-center justify-center p-4 rounded-lg border ${errors.coachGender ? 'border-red-500' : 'border-primary/30'} transition-all hover:bg-primary/10 ${formData.coachGender === "female" ? 'bg-primary/10 border-primary shadow-sm' : ''}`}>
                            <RadioGroupItem value="female" id="gender-female" className="hidden" />
                            <Label htmlFor="gender-female" className="flex flex-col items-center justify-center cursor-pointer w-full">
                              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                                <FontAwesomeIcon icon={faFemale} className="text-primary text-2xl" />
                              </div>
                              <span className="font-medium text-primary-dark">Une femme</span>
                            </Label>
                          </div>
                          <div className={`flex flex-col items-center justify-center p-4 rounded-lg border ${errors.coachGender ? 'border-red-500' : 'border-primary/30'} transition-all hover:bg-primary/10 ${formData.coachGender === "male" ? 'bg-primary/10 border-primary shadow-sm' : ''}`}>
                            <RadioGroupItem value="male" id="gender-male" className="hidden" />
                            <Label htmlFor="gender-male" className="flex flex-col items-center justify-center cursor-pointer w-full">
                              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                                <FontAwesomeIcon icon={faMale} className="text-primary text-2xl" />
                              </div>
                              <span className="font-medium text-primary-dark">Un homme</span>
                            </Label>
                          </div>
                          <div className={`flex flex-col items-center justify-center p-4 rounded-lg border ${errors.coachGender ? 'border-red-500' : 'border-primary/30'} transition-all hover:bg-primary/10 ${formData.coachGender === "any" ? 'bg-primary/10 border-primary shadow-sm' : ''}`}>
                            <RadioGroupItem value="any" id="gender-any" className="hidden" />
                            <Label htmlFor="gender-any" className="flex flex-col items-center justify-center cursor-pointer w-full">
                              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                                <FontAwesomeIcon icon={faUserFriends} className="text-primary text-2xl" />
                              </div>
                              <span className="font-medium text-primary-dark">Peu importe</span>
                            </Label>
                          </div>
                        </RadioGroup>
                        {errors.coachGender && (
                          <p className="text-red-500 text-sm mt-2 text-center">{errors.coachGender}</p>
                        )}
                      </div>
                      
                      <div className="flex items-start space-x-3 mt-4">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={(checked) => {
                            setFormData({ ...formData, consent: checked as boolean });
                            if (checked) {
                              const newErrors = { ...errors };
                              delete newErrors.consent;
                              setErrors(newErrors);
                            }
                          }}
                          required
                          className={`mt-1 text-primary border-primary/50 ${errors.consent ? 'border-red-500' : ''}`}
                        />
                        <div>
                          <Label htmlFor="consent" className="cursor-pointer font-medium text-primary">
                            J'accepte les conditions
                          </Label>
                          <p className="text-sm text-primary-dark mt-1">
                            En cochant cette case, vous acceptez que Shape It utilise vos informations pour vous contacter concernant votre demande de Bilan Forme et vous envoyer des informations pertinentes sur nos services.
                          </p>
                          {errors.consent && (
                            <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                        <FontAwesomeIcon icon={faQuestionCircle} className="text-primary text-3xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-primary">
                        Dernière question, {formData.firstName}
                      </h2>
                      <p className="text-primary-dark">Comment avez-vous entendu parler de nous ?</p>
                    </div>
                    
                    <RadioGroup
                      value={formData.source}
                      onValueChange={(value) => {
                        setFormData({ ...formData, source: value });
                        if (value) {
                          const newErrors = { ...errors };
                          delete newErrors.source;
                          setErrors(newErrors);
                        }
                      }}
                      className="space-y-3"
                    >
                      {sources.map((source) => (
                        <div 
                          key={source.id} 
                          className={`flex items-center space-x-3 p-4 rounded-lg border ${errors.source ? 'border-red-500' : 'border-primary/30'} transition-all hover:bg-primary/10 ${formData.source === source.id ? 'bg-primary/10 border-primary shadow-sm' : ''}`}
                        >
                          <RadioGroupItem value={source.id} id={source.id} className="text-primary" />
                          <Label htmlFor={source.id} className="cursor-pointer text-primary-dark">
                            {source.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.source && (
                      <p className="text-red-500 text-sm mt-2 text-center">{errors.source}</p>
                    )}
                  </div>
                )}

                {step === 8 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-primary text-3xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-primary">
                        Rappel important
                      </h2>
                      <p className="text-primary-dark">Veuillez prendre note des informations suivantes avant de finaliser votre demande</p>
                    </div>
                    
                    <div className="bg-primary/15 p-6 rounded-lg border-2 border-primary/30">
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-primary mb-2">💰 Information Tarification</h3>
                        <div className="bg-white/80 p-4 rounded-lg border border-primary/20">
                          <p className="text-lg font-medium text-primary-dark">
                            Cette consultation coûte <span className="font-bold text-primary">500 DH</span>
                          </p>
                          <p className="text-sm text-primary-dark mt-2">
                            ✨ Cette somme sera <span className="font-semibold">entièrement déduite</span> de vos tarifs si vous décidez de vous engager avec nous
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-primary-dark mb-4">
                          En cliquant sur "Confirmer", vous acceptez cette condition tarifaire pour votre Bilan Forme.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4 mt-6">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="flex items-center space-x-2 text-white bg-primary/20 border-primary/30 hover:bg-primary/30 hover:text-white transition-all"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Retour</span>
                    </Button>
                  ) : (
                    <div></div> // Empty div for spacing when no back button
                  )}
                  
                  {!(step === 5 && isEditingPhone) && (
                  <Button
                    type="submit"
                    disabled={isSubmitting && step === 8}
                    className={`bg-primary hover:bg-primary-dark text-white px-6 py-2 transition-all flex items-center ${step === 1 ? "w-full" : ""}`}
                  >
                    {isSubmitting && step === 8 ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <span>{step === 8 ? "Confirmer" : "Suivant"}</span>
                        {step !== 8 && <ArrowRight className="h-4 w-4 ml-2" />}
                      </>
                    )}
                  </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-xl bg-white/90 backdrop-blur-sm p-10 shadow-xl border border-primary/10">
              <div className="mb-6 text-center">
                <div className="h-20 w-20 bg-primary/20 rounded-full mx-auto flex items-center justify-center mb-4">
                  <ThumbsUp className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-primary">MERCI {formData.firstName.toUpperCase()}</h1>
                <p className="text-sm text-primary-dark mt-1">Votre formulaire a été envoyé avec succès</p>
              </div>
              
              <p className="mb-6 text-lg text-primary-dark">Un de nos coachs experts vous contactera au plus vite pour planifier votre Bilan Forme (500 DH qui seront déduits du tarifs si engagement).</p>
              
              <div className="flex items-center justify-center bg-primary/10 p-4 rounded-lg mb-8 border border-primary/20">
                <FontAwesomeIcon icon={faEnvelope} className="text-primary mr-3" />
                <p className="text-primary-dark">Une confirmation a été envoyée à {formData.email}</p>
              </div>
              
              <div className="mt-10 space-y-6 bg-primary/10 p-6 rounded-lg border border-primary/20 text-left">
                <h2 className="text-xl font-bold text-primary text-center">
                  Pour rappel, ce Bilan Forme, inclut :
                </h2>
                <div className="grid gap-3">
                  <div className="flex items-center space-x-3 bg-white/80 p-4 rounded-lg shadow-sm border border-primary/10">
                    <ThumbsUp className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-primary-dark">1h dédiée pour effectuer votre scan de progression accéléré</span>
                  </div>
                  
                  {[
                    "Tests avancés",
                    "Masse grasse / Masse musculaire",
                    "Analyse posturale",
                    "Métabolisme basal",
                    "Test de condition physique",
                    "Définition précise des objectifs",
                    "Création d'un plan d'action sur mesure",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-3 bg-white/80 p-4 rounded-lg shadow-sm border border-primary/10">
                      <CheckSquare className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-primary-dark">{item}</span>
                    </div>
                  ))}
                </div>
                
              </div>
              
              <div className="mt-8">
                <Link href="/">
                  <Button 
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-2 transition-all"
                  >
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

