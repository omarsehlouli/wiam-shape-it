import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"
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

export default function Page() {
  const challenges = [
    {
      number: "1",
      text: "Vous avez déjà tout essayé sans résultats durables",
    },
    {
      number: "2",
      text: "Vous ne savez plus par où commencer",
    },
    {
      number: "3",
      text: "Vous rêvez de changement, mais vous manquez d'un vrai cadre",
    },
    {
      number: "4",
      text: "Vous cherchez une méthode sérieuse, humaine et efficace",
    },
    {
      number: "5",
      text: "Vous voulez comprendre votre corps pour mieux le transformer",
    },
    {
      number: "6",
      text: "Vous avez besoin d'un vrai déclic",
    },
  ]

  const services = [
    {
      title: "Remise en forme & perte de poids",
      description: "Stop aux méthodes temporaires et restrictives. Nous vous aidons à retrouver votre silhouette et votre énergie, avec une approche durable et respectueuse de votre corps.",
      icon: faWeightScale,
    },
    {
      title: "Recomposition corporelle & prise de muscle",
      description: "Vous voulez gagner en force, en forme ou redessiner votre silhouette ? Nous combinons nutrition adaptée et entraînements intelligents pour des résultats visibles et solides.",
      icon: faDumbbell,
    },
    {
      title: "Santé & bien-être global",
      description: "Réduire le stress, retrouver un sommeil réparateur, réapprendre à écouter votre corps… Shape It vous accompagne vers un mieux-être global et un mode de vie plus aligné.",
      icon: faHeartPulse,
    },
    {
      title: "Performance sportive",
      description: "Vous êtes déjà sportif(ve) et vous souhaitez passer au niveau supérieur ? Nos coachs optimisent votre technique, votre récupération et votre mental pour des performances à la hauteur de votre ambition.",
      icon: faMedal,
    },
  ]

  const features = [
    {
      title: "Un accompagnement exclusif",
      description: "Chaque parcours est unique. Nos coachs créent pour vous des protocoles personnalisés qui allient précision, pédagogie et motivation. Leur objectif : révéler votre potentiel et vous aider à maintenir vos résultats dans le temps.",
      icon: faUserGroup,
    },
    {
      title: "Une méthode éprouvée",
      description: "Des centaines de personnes nous ont fait confiance pour transformer leur corps, leur mental et leur hygiène de vie. Notre approche repose sur la science, l'expérience terrain et une vraie écoute de vos besoins.",
      icon: faFlask,
    },
    {
      title: "Un espace pensé pour vous",
      description: "Shape It n'est pas une salle de sport classique. C'est un lieu confidentiel, moderne, inspirant, conçu pour vous offrir une parenthèse rien qu'à vous.",
      icon: faGem,
    },
  ]

  return (
    <div className="relative min-h-screen">
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section
          className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url("/home.webp")`,
          }}
        >
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary">
                Entrez dans un nouveau chapitre de votre vie
              </h1>
              <p className="text-xl text-primary-light">
                Bienvenue chez Shape It, un studio privé dédié à votre évolution physique et mentale.
              </p>
              <Link href="/commencer">
                <Button size="lg" className="bg-primary hover:bg-primary-light text-white px-8">
                  Commencez Votre Parcours
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Coaching Redefined Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
              <span className="text-primary">Shape</span> <span className="text-primary">It</span> <span className="text-primary-light text-sm">no limits.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px]">
                <Image
                  src="/home.webp"
                  alt="Wiam Alibouch"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-700">
                  Bienvenue chez Shape It, un studio privé dédié à votre évolution physique et mentale. Ici, chaque détail est pensé pour vous offrir bien plus qu'un simple entraînement : une expérience sur-mesure, dans un cadre intime, exclusif et motivant.
                </p>
                <p className="text-lg text-gray-700">
                  Vous ne suivez pas un programme standard. Vous êtes accompagné(e), guidé(e), challengé(e) par des experts passionnés en coaching et en nutrition, qui s'adaptent à vos besoins, votre rythme, et votre quotidien.
                </p>
                <p className="text-lg text-gray-700">
                  Que vous souhaitiez sculpter votre corps, perdre du poids durablement, retrouver votre énergie ou repousser vos limites sportives, notre méthode unique vous propulse vers des résultats concrets, profonds et durables.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
              Vous allez vous reconnaître si…
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex gap-4">
                  <span className="text-4xl font-bold text-primary">{challenge.number}</span>
                  <p className="text-lg text-gray-700">{challenge.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Nos domaines d'expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className="mb-6 flex justify-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={service.icon} className="text-primary text-3xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-4 text-center">{service.title}</h3>
                    <p className="text-gray-700 text-center">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
              Ce que nous vous apportons
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-8 flex flex-col items-center">
                    <div className="mb-6">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={feature.icon} className="text-primary text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-4 text-center">{feature.title}</h3>
                    <p className="text-gray-700 text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Coach Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Notre Coach</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[500px]">
                <Image
                  src="/home.webp"
                  alt="Wiam Alibouch"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-primary">Wiam Alibouch</h3>
                <p className="text-lg text-gray-700">
                  Coach en nutrition supportive et personal trainer certifiée, passionnée par la transformation humaine et le développement de soi. Depuis plus de trois ans, elle a accompagné plus de 1 200 femmes en ligne à se reconnecter à leur corps, à comprendre la nutrition, à aimer le sport et à reprendre le pouvoir sur leur vie.
                </p>
                <p className="text-lg text-gray-700">
                  Forte de cette expérience et d'une écoute attentive des besoins réels de ses clientes, elle fonde Shape It : un espace pensé pour guider chacun vers une transformation durable, dans un cadre premium et profondément humain.
                </p>
                <p className="text-lg text-gray-700">
                  Sa mission ? Apporter un réel changement, utile et impactant, au cœur de la société marocaine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">La promesse Shape It</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoindre Shape It, c'est faire le choix d'un coaching qui vous respecte, qui vous pousse à progresser, et qui vous donne enfin les résultats que vous méritez.
            </p>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Et parce que nous croyons pleinement en notre méthode, nous vous offrons une garantie 100% satisfait ou remboursé : si vous suivez nos recommandations sans obtenir les résultats annoncés, nous vous restituons votre investissement. Sans condition.
            </p>
            <Link href="/commencer">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Commencer Maintenant
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

