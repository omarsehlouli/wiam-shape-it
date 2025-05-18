"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckSquare, ThumbsUp, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    goals: [],
    phoneConfirm: "",
    consent: false,
    source: "",
  })

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
      console.log(formData)
      setStep(8) // Show thank you page
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2 text-primary hover:text-primary-light">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Button>
          </Link>
        </div>
        {step < 8 ? (
          <div className="mx-auto max-w-2xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20V4@2x(1)-7MqDbwioSXfxQnxDIUxfqSYm6krRt8.png"
              alt="Shape It"
              width={200}
              height={60}
              className="mx-auto mb-8"
            />
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                      Merci de nous laisser vos coordonnées ci-dessous :
                    </h2>
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Numéro de téléphone *</Label>
                        <div className="flex mt-1">
                          <Select
                            value={formData.countryCode}
                            onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                          >
                            <SelectTrigger className="w-[120px]">
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
                            className="flex-1 ml-2"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                      D'accord {formData.firstName}, quelle est votre date de naissance ?
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="month">Mois</Label>
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
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="day">Jour</Label>
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
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="year">Année</Label>
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
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                      Merci {formData.firstName}. 😊 Pouvez-vous nous dire où vous préférez venir vous entraîner ?
                    </h2>
                    <RadioGroup
                      value={formData.center}
                      onValueChange={(value) => setFormData({ ...formData, center: value })}
                      className="space-y-2"
                    >
                      {centers.map((center) => (
                        <div key={center.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                          <RadioGroupItem value={center.id} id={center.id} />
                          <Label htmlFor={center.id} className="flex-1 cursor-pointer">
                            <span className="font-semibold">{center.name}</span>
                            <span className="block text-sm text-gray-500">{center.address}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                      Est-ce que vous pouvez nous en dire plus sur votre/vos objectifs ?
                    </h2>
                    <p className="text-sm text-muted-foreground">Choisissez-en autant que vous voulez</p>
                    <div className="space-y-2">
                      {goals.map((goal) => (
                        <div key={goal.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
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
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                      Pour accéder à votre Bilan Forme gratuit, veuillez nous confirmer votre numéro de téléphone
                    </h2>
                    <div className="space-y-2">
                      <p className="text-lg">Est-ce bien votre numéro ? {formData.phone}</p>
                      <RadioGroup
                        value={formData.phoneConfirm}
                        onValueChange={(value) => setFormData({ ...formData, phoneConfirm: value })}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                          <RadioGroupItem value="yes" id="confirm-yes" />
                          <Label htmlFor="confirm-yes">Oui</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                          <RadioGroupItem value="no" id="confirm-no" />
                          <Label htmlFor="confirm-no">Non</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                      Très bien {formData.firstName}, pourriez-vous nous confirmer que vous autorisez l'utilisation des
                      informations recueillies via ce questionnaire pour vous contacter ?
                    </h2>
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                        required
                      />
                      <Label htmlFor="consent" className="cursor-pointer">
                        J'accepte
                      </Label>
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-primary">
                      Merci {formData.firstName}, comment avez-vous entendu parler de nous ?
                    </h2>
                    <RadioGroup
                      value={formData.source}
                      onValueChange={(value) => setFormData({ ...formData, source: value })}
                      className="space-y-2"
                    >
                      {sources.map((source) => (
                        <div key={source.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                          <RadioGroupItem value={source.id} id={source.id} />
                          <Label htmlFor={source.id} className="cursor-pointer">
                            {source.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="flex items-center space-x-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Retour</span>
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className={`bg-primary hover:bg-primary-light text-white ${step === 1 ? "w-full" : ""}`}
                  >
                    {step === 7 ? "Envoyer" : "Suivant"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h1 className="mb-6 text-3xl font-bold text-primary">MERCI D'AVOIR REMPLI CE FORMULAIRE.</h1>
              <p className="mb-4 text-lg text-gray-600">Un de nos coachs experts vous contactera au plus vite</p>
              <p className="text-lg text-gray-600">
                En attendant, nous vous invitons à regarder les témoignages des clients qui nous ont fait confiance.
              </p>
              <div className="mt-8 space-y-4">
                <h2 className="text-xl font-semibold text-primary">
                  Pour rappel, ce Bilan Forme, d'une valeur de 90 €, inclut :
                </h2>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center space-x-2">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                    <span>1h dédiée pour effectuer votre scan de progression accéléré</span>
                  </li>
                  {[
                    "Tests avancés",
                    "Masse grasse / Masse musculaire",
                    "Analyse posturale",
                    "Métabolisme basal",
                    "Test de condition physique personnalisé",
                    "Définition précise des objectifs",
                    "Création d'un plan d'action sur mesure",
                  ].map((item) => (
                    <li key={item} className="flex items-center space-x-2">
                      <CheckSquare className="h-5 w-5 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center space-x-2 text-left">
                  <span className="text-orange-500">🎁</span>
                  <span>
                    EN BONUS : repartez avec un programme starter, adapté à vos objectifs{" "}
                    <CheckSquare className="inline-block h-5 w-5 text-green-600" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

