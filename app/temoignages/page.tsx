import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, Star } from "lucide-react"
import { SiteHeader } from "@/components/site-header"

const testimonials = [
  {
    name: "Marie L.",
    age: 32,
    text: "Shape It a complètement transformé ma vie ! J'ai perdu 15 kg en 6 mois et je me sens plus énergique que jamais.",
    beforeImage: "/placeholder.svg?height=300&width=200",
    afterImage: "/placeholder.svg?height=300&width=200",
  },
  {
    name: "Thomas D.",
    age: 28,
    text: "Grâce à Shape It, j'ai enfin réussi à prendre du muscle de manière saine. Les coachs sont incroyables !",
    beforeImage: "/placeholder.svg?height=300&width=200",
    afterImage: "/placeholder.svg?height=300&width=200",
  },
  {
    name: "Sophie M.",
    age: 45,
    text: "Je pensais que c'était trop tard pour moi, mais Shape It m'a prouvé le contraire. Je suis en meilleure forme qu'à 30 ans !",
    beforeImage: "/placeholder.svg?height=300&width=200",
    afterImage: "/placeholder.svg?height=300&width=200",
  },
]

const videoTestimonials = [
  { name: "Julien", thumbnail: "/placeholder.svg?height=200&width=350" },
  { name: "Amélie", thumbnail: "/placeholder.svg?height=200&width=350" },
  { name: "François", thumbnail: "/placeholder.svg?height=200&width=350" },
]

const textTestimonials = [
  {
    name: "Camille R.",
    age: 35,
    text: "Le suivi personnalisé chez Shape It est exceptionnel. Chaque séance est adaptée à mes besoins et mes objectifs.",
    rating: 5,
  },
  {
    name: "Pierre L.",
    age: 42,
    text: "J'ai essayé de nombreuses salles de sport, mais aucune ne se compare à l'expérience Shape It. Les résultats parlent d'eux-mêmes !",
    rating: 5,
  },
  {
    name: "Émilie T.",
    age: 29,
    text: "Shape It m'a aidé à reprendre confiance en moi. Je me sens plus forte physiquement et mentalement.",
    rating: 5,
  },
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary text-center mb-12">Témoignages de nos clients</h1>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-primary mb-8">Transformations incroyables</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex justify-between mb-4">
                    <Image
                      src={testimonial.beforeImage || "/placeholder.svg"}
                      alt={`Avant - ${testimonial.name}`}
                      width={150}
                      height={200}
                      className="rounded-lg"
                    />
                    <Image
                      src={testimonial.afterImage || "/placeholder.svg"}
                      alt={`Après - ${testimonial.name}`}
                      width={150}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {testimonial.name}, {testimonial.age} ans
                  </h3>
                  <p className="text-gray-700">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-primary text-white py-12 rounded-lg">
          <h2 className="text-2xl font-semibold mb-8 text-center">Ils parlent de leur expérience</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {videoTestimonials.map((video, index) => (
              <div
                key={index}
                className="relative aspect-video bg-black/20 rounded-lg overflow-hidden group cursor-pointer"
              >
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={`Témoignage vidéo de ${video.name}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">{video.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-8">Ce qu'ils disent de nous</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {textTestimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#C4A24C] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.text}</p>
                  <p className="text-primary font-semibold">
                    {testimonial.name}, {testimonial.age} ans
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="text-center mt-16">
          <Link href="/commencer">
            <Button className="bg-[#C4A24C] hover:bg-[#B39241] text-white px-8 py-3 text-lg">
              Commencez Votre Transformation
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

