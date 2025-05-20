'use client';

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

  const handleScrollToNextSection = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const elementId = href.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section
          className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url("/home.webp")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-primary/80 backdrop-blur-sm" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                Entrez dans un nouveau chapitre de votre vie
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Bienvenue chez Shape It, un studio privé dédié à votre évolution physique et mentale.
              </p>
              <Link href="/commencer">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-primary font-medium rounded-full px-8 py-6 mt-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  Commencez Votre Parcours
                </Button>
              </Link>
            </div>
          </div>
          
          <a 
            href="#coaching-redefined-section" 
            aria-label="Scroll to next section" 
            className="absolute bottom-8 w-full flex justify-center animate-bounce cursor-pointer"
            onClick={handleScrollToNextSection}
          >
            <div className="w-8 h-8 text-white">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </a>
        </section>

        {/* Coaching Redefined Section */}
        <section id="coaching-redefined-section" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center mb-16">
              <Image 
                src="/logo1.png" 
                alt="Shape It" 
                width={200} 
                height={80} 
                className="mx-auto mb-6"
              />
              <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-elegant transform md:translate-x-6 hover-lift">
                <Image
                  src="/home.webp"
                  alt="Wiam Alibouch"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6 md:space-y-8">
                <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                  Bienvenue chez Shape It, un studio privé dédié à votre évolution physique et mentale. Ici, chaque détail est pensé pour vous offrir bien plus qu'un simple entraînement : une expérience sur-mesure, dans un cadre intime, exclusif et motivant.
                </p>
                <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                  Vous ne suivez pas un programme standard. Vous êtes accompagné(e), guidé(e), challengé(e) par des experts passionnés en coaching et en nutrition, qui s'adaptent à vos besoins, votre rythme, et votre quotidien.
                </p>
                <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                  Que vous souhaitiez sculpter votre corps, perdre du poids durablement, retrouver votre énergie ou repousser vos limites sportives, notre méthode unique vous propulse vers des résultats concrets, profonds et durables.
                </p>
              </div>
            </div>
          </div>
          
          <a 
            href="#coaching-redefined-section" 
            aria-label="Scroll to next section" 
            className="absolute bottom-8 w-full flex justify-center animate-bounce cursor-pointer"
            onClick={handleScrollToNextSection}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </section>

        {/* Challenges Section */}
        <section className="py-20 md:py-28 bg-primary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="inline-block text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-2xl shadow-md">
                Vous allez vous reconnaître si…
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex gap-6 bg-white p-6 rounded-xl shadow-soft hover-lift">
                  <span className="text-4xl md:text-5xl font-bold text-primary-dark">{challenge.number}</span>
                  <p className="text-lg text-gray-700 self-center">{challenge.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Nos domaines d'expertise</h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {services.map((service, index) => (
                <Card key={index} className="bg-primary-50 overflow-hidden border-0 rounded-xl shadow-elegant hover-lift">
                  <CardContent className="p-8 md:p-10">
                    <div className="mb-6 md:mb-8 flex justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-50 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={service.icon} className="text-primary text-3xl md:text-4xl" />
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">{service.title}</h3>
                    <p className="text-base md:text-lg text-gray-700 text-center leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 bg-primary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="inline-block text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-2xl shadow-md">
                Ce que nous vous apportons
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {features.map((feature, index) => (
                <Card key={index} className="bg-primary-50 overflow-hidden border-0 rounded-xl shadow-soft hover-lift">
                  <CardContent className="p-8 md:p-10 flex flex-col items-center">
                    <div className="mb-6 md:mb-8">
                      <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={feature.icon} className="text-primary text-2xl md:text-3xl" />
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">{feature.title}</h3>
                    <p className="text-base md:text-lg text-gray-700 text-center leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Coach Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Notre Coach</h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-elegant transform md:translate-x-6 hover-lift order-1 md:order-1">
                <Image
                  src="/home.webp"
                  alt="Wiam Alibouch"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6 md:space-y-8 order-2 md:order-2">
                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">Wiam Alibouch</h3>
                <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                  Coach en nutrition supportive et personal trainer certifiée, passionnée par la transformation humaine et le développement de soi. Depuis plus de trois ans, elle a accompagné plus de 1 200 femmes en ligne à se reconnecter à leur corps, à comprendre la nutrition, à aimer le sport et à reprendre le pouvoir sur leur vie.
                </p>
                <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                  Forte de cette expérience et d'une écoute attentive des besoins réels de ses clientes, elle fonde Shape It : un espace pensé pour guider chacun vers une transformation durable, dans un cadre premium et profondément humain.
                </p>
                <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                  Sa mission ? Apporter un réel changement, utile et impactant, au cœur de la société marocaine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-10">La promesse Shape It</h2>
              <p className="text-xl md:text-2xl mb-8 md:mb-10 font-light leading-relaxed">
                Rejoindre Shape It, c'est faire le choix d'un coaching qui vous respecte, qui vous pousse à progresser, et qui vous donne enfin les résultats que vous méritez.
              </p>
              <p className="text-xl md:text-2xl mb-10 md:mb-12 font-light leading-relaxed">
                Et parce que nous croyons pleinement en notre méthode, nous vous offrons une garantie 100% satisfait ou remboursé : si vous suivez nos recommandations sans obtenir les résultats annoncés, nous vous restituons votre investissement. Sans condition.
              </p>
              <Link href="/commencer">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-primary-dark font-medium rounded-full px-10 py-7 text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  Commencer Maintenant
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-primary-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <Image 
            src="/logo1.png" 
            alt="Shape It" 
            width={120} 
            height={40} 
            className="h-10 w-auto mx-auto mb-4"
          />
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Shape It. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}

