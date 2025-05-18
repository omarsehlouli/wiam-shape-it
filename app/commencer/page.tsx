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
  faEnvelope 
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
    submittedAt: ""
  })
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [newPhone, setNewPhone] = useState("")

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shapeItFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const centers = [
    {
      id: "casablanca",
      name: "Casablanca",
      address: "123 Boulevard Mohammed V, 20000 Casablanca",
    },
    {
      id: "rabat",
      name: "Rabat",
      address: "45 Avenue Hassan II, 10000 Rabat",
    },
    {
      id: "marrakech",
      name: "Marrakech",
      address: "78 Rue de la Kasbah, 40000 Marrakech",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 7) {
      setStep(step + 1)
    } else {
      // Handle form submission
      const finalFormData = {
        ...formData,
        submittedAt: new Date().toISOString()
      }
      console.log(finalFormData)
      
      // Save to localStorage for later email sending
      if (typeof window !== 'undefined') {
        localStorage.setItem('shapeItFormData', JSON.stringify(finalFormData));
        
        // This could later be replaced with an actual API call to send the data to the server
        // fetch('/api/submit-form', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(finalFormData)
        // })
      }
      
      setStep(8) // Show thank you page
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
    setFormData({ ...formData, phone: newPhone, phoneConfirm: "yes" });
    setIsEditingPhone(false);
    setTimeout(() => setStep(step + 1), 300);
  }

  // Calculate progress percentage
  const progressPercentage = ((step - 1) / 6) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2 text-primary hover:text-primary-light transition-all">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Button>
          </Link>
        </div>
        {step < 8 ? (
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
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-in-out" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Début</span>
                <span>Étape {step}/7</span>
                <span>Fin</span>
              </div>
            </div>
            
            <div className="rounded-xl bg-white p-8 shadow-xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-primary">
                        Commencez votre parcours Shape It
                      </h2>
                      <p className="text-gray-600 mt-2">Merci de nous laisser vos coordonnées ci-dessous</p>
                    </div>
                    
                    <div className="grid gap-5">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">Prénom *</Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="mt-1 transition-all focus:ring-2 focus:ring-primary/20"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Nom *</Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="mt-1 transition-all focus:ring-2 focus:ring-primary/20"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Numéro de téléphone *</Label>
                        <div className="flex mt-1">
                          <Select
                            value={formData.countryCode}
                            onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                          >
                            <SelectTrigger className="w-[120px] border-r-0 rounded-r-none transition-all focus:ring-2 focus:ring-primary/20">
                              <SelectValue placeholder="Pays" />
                            </SelectTrigger>
                            <SelectContent>
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
                            className="flex-1 rounded-l-none transition-all focus:ring-2 focus:ring-primary/20"
                            placeholder="Votre téléphone"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1 transition-all focus:ring-2 focus:ring-primary/20"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <FontAwesomeIcon icon={faCalendar} className="text-primary text-3xl mb-3" />
                      <h2 className="text-2xl font-bold text-primary">
                        D'accord {formData.firstName}, quelle est votre date de naissance ?
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="month" className="text-sm font-medium text-gray-700">Mois</Label>
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
                          className="mt-1 text-center transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="day" className="text-sm font-medium text-gray-700">Jour</Label>
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
                          className="mt-1 text-center transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="year" className="text-sm font-medium text-gray-700">Année</Label>
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
                          className="mt-1 text-center transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary text-3xl mb-3" />
                      <h2 className="text-2xl font-bold text-primary">
                        Merci {formData.firstName}. 😊
                      </h2>
                      <p className="text-gray-600">Pouvez-vous nous dire où vous préférez venir vous entraîner ?</p>
                    </div>
                    
                    <RadioGroup
                      value={formData.center}
                      onValueChange={(value) => setFormData({ ...formData, center: value })}
                      className="space-y-3"
                    >
                      {centers.map((center) => (
                        <div 
                          key={center.id} 
                          className={`flex items-center space-x-3 p-4 rounded-lg border border-gray-200 transition-all hover:border-primary/30 hover:bg-primary/5 ${formData.center === center.id ? 'bg-primary/5 border-primary/30 shadow-sm' : ''}`}
                        >
                          <RadioGroupItem value={center.id} id={center.id} className="text-primary" />
                          <Label htmlFor={center.id} className="flex-1 cursor-pointer">
                            <span className="font-semibold text-primary">{center.name}</span>
                            <span className="block text-sm text-gray-500 mt-1">{center.address}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <FontAwesomeIcon icon={faBullseye} className="text-primary text-3xl mb-3" />
                      <h2 className="text-2xl font-bold text-primary">
                        Vos objectifs
                      </h2>
                      <p className="text-gray-600">Est-ce que vous pouvez nous en dire plus sur ce que vous souhaitez accomplir ?</p>
                      <p className="text-sm text-gray-500 italic">Choisissez-en autant que vous voulez</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      {goals.map((goal) => (
                        <div 
                          key={goal.id} 
                          className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-200 transition-all hover:border-primary/30 hover:bg-primary/5 ${formData.goals.includes(goal.id) ? 'bg-primary/5 border-primary/30 shadow-sm' : ''}`}
                        >
                          <Checkbox
                            id={goal.id}
                            checked={formData.goals.includes(goal.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({
                                  ...formData,
                                  goals: [...formData.goals, goal.id],
                                })
                              } else {
                                setFormData({
                                  ...formData,
                                  goals: formData.goals.filter((id) => id !== goal.id),
                                })
                              }
                            }}
                            className="text-primary data-[state=checked]:bg-primary"
                          />
                          <Label htmlFor={goal.id} className="flex-1 cursor-pointer">
                            {goal.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <FontAwesomeIcon icon={faPhoneAlt} className="text-primary text-3xl mb-3" />
                      <h2 className="text-2xl font-bold text-primary">
                        Confirmation de contact
                      </h2>
                      <p className="text-gray-600">Pour accéder à votre Bilan Forme gratuit, veuillez nous confirmer votre numéro</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center mb-4">
                      <p className="text-lg font-medium text-primary">Est-ce bien votre numéro ?</p>
                      <p className="text-xl font-bold">{formData.phone}</p>
                    </div>
                    
                    {!isEditingPhone ? (
                      <RadioGroup
                        value={formData.phoneConfirm}
                        onValueChange={(value) => handlePhoneConfirmation(value)}
                        className="flex justify-center gap-4"
                      >
                        <div className={`flex-1 flex items-center justify-center p-3 rounded-lg border border-gray-200 transition-all hover:border-primary/30 hover:bg-primary/5 ${formData.phoneConfirm === "yes" ? 'bg-primary/5 border-primary/30 shadow-sm' : ''}`}>
                          <RadioGroupItem value="yes" id="confirm-yes" className="hidden" />
                          <Label htmlFor="confirm-yes" className="flex items-center justify-center cursor-pointer w-full">
                            <span className="font-medium">Oui</span>
                          </Label>
                        </div>
                        <div className={`flex-1 flex items-center justify-center p-3 rounded-lg border border-gray-200 transition-all hover:border-primary/30 hover:bg-primary/5 ${formData.phoneConfirm === "no" ? 'bg-primary/5 border-primary/30 shadow-sm' : ''}`}>
                          <RadioGroupItem value="no" id="confirm-no" className="hidden" />
                          <Label htmlFor="confirm-no" className="flex items-center justify-center cursor-pointer w-full">
                            <span className="font-medium">Non</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    ) : (
                      <div className="space-y-4 mt-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                          <h3 className="font-medium text-primary mb-3 flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            Modifiez votre numéro de téléphone
                          </h3>
                          <div className="flex">
                            <Select
                              value={formData.countryCode}
                              onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                            >
                              <SelectTrigger className="w-[120px] border-r-0 rounded-r-none transition-all focus:ring-2 focus:ring-primary/20">
                                <SelectValue placeholder="Pays" />
                              </SelectTrigger>
                              <SelectContent>
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
                              className="flex-1 rounded-l-none transition-all focus:ring-2 focus:ring-primary/20"
                              placeholder="Votre téléphone"
                            />
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button 
                              type="button"
                              onClick={handlePhoneUpdate}
                              className="bg-primary hover:bg-primary-light text-white transition-all"
                            >
                              Confirmer
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
                      <FontAwesomeIcon icon={faCheckCircle} className="text-primary text-3xl mb-3" />
                      <h2 className="text-2xl font-bold text-primary">
                        Presque terminé !
                      </h2>
                      <p className="text-gray-600">Veuillez confirmer que vous autorisez l'utilisation des informations recueillies pour vous contacter</p>
                    </div>
                    
                    <div className="bg-primary/5 p-5 rounded-lg border border-primary/20 flex items-start space-x-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                        required
                        className="mt-1 text-primary"
                      />
                      <div>
                        <Label htmlFor="consent" className="cursor-pointer font-medium text-primary">
                          J'accepte les conditions
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          En cochant cette case, vous acceptez que Shape It utilise vos informations pour vous contacter concernant votre demande de Bilan Forme et vous envoyer des informations pertinentes sur nos services.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <FontAwesomeIcon icon={faQuestionCircle} className="text-primary text-3xl mb-3" />
                      <h2 className="text-2xl font-bold text-primary">
                        Dernière question, {formData.firstName}
                      </h2>
                      <p className="text-gray-600">Comment avez-vous entendu parler de nous ?</p>
                    </div>
                    
                    <RadioGroup
                      value={formData.source}
                      onValueChange={(value) => setFormData({ ...formData, source: value })}
                      className="space-y-3"
                    >
                      {sources.map((source) => (
                        <div 
                          key={source.id} 
                          className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-200 transition-all hover:border-primary/30 hover:bg-primary/5 ${formData.source === source.id ? 'bg-primary/5 border-primary/30 shadow-sm' : ''}`}
                        >
                          <RadioGroupItem value={source.id} id={source.id} className="text-primary" />
                          <Label htmlFor={source.id} className="cursor-pointer">
                            {source.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                <div className="flex justify-between pt-4 mt-6">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="flex items-center space-x-2 transition-all"
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
                      className={`bg-primary hover:bg-primary-light text-white px-6 py-2 transition-all flex items-center ${step === 1 ? "w-full" : ""}`}
                    >
                      <span>{step === 7 ? "Envoyer" : "Suivant"}</span>
                      {step !== 7 && <ArrowRight className="h-4 w-4 ml-2" />}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-xl bg-white p-10 shadow-xl border border-gray-100">
              <div className="mb-6 text-center">
                <div className="h-20 w-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <ThumbsUp className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-primary">MERCI {formData.firstName.toUpperCase()}</h1>
                <p className="text-sm text-gray-500 mt-1">Votre formulaire a été envoyé avec succès</p>
              </div>
              
              <p className="mb-6 text-lg text-gray-700">Un de nos coachs experts vous contactera au plus vite pour planifier votre Bilan Forme gratuit.</p>
              <p className="text-gray-700 mb-8">
                En attendant, nous vous invitons à découvrir les témoignages des clients qui nous ont fait confiance.
              </p>
              
              <div className="flex items-center justify-center bg-primary/5 p-3 rounded-lg mb-8">
                <FontAwesomeIcon icon={faEnvelope} className="text-primary mr-3" />
                <p className="text-primary-light">Une confirmation a été envoyée à {formData.email}</p>
              </div>
              
              <div className="mt-10 space-y-6 bg-primary/5 p-6 rounded-lg border border-primary/20 text-left">
                <h2 className="text-xl font-bold text-primary text-center">
                  Pour rappel, ce Bilan Forme, d'une valeur de 90 €, inclut :
                </h2>
                <div className="grid gap-3">
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                    <ThumbsUp className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>1h dédiée pour effectuer votre scan de progression accéléré</span>
                  </div>
                  
                  {[
                    "Tests avancés",
                    "Masse grasse / Masse musculaire",
                    "Analyse posturale",
                    "Métabolisme basal",
                    "Test de condition physique personnalisé",
                    "Définition précise des objectifs",
                    "Création d'un plan d'action sur mesure",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                      <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex items-center space-x-3 bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <span className="text-orange-500 text-2xl">🎁</span>
                  <span className="font-medium">
                    EN BONUS : repartez avec un programme starter, adapté à vos objectifs
                  </span>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/">
                  <Button 
                    className="bg-primary hover:bg-primary-light text-white transition-all"
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

