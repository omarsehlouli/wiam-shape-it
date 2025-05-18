import { SiteHeader } from "@/components/site-header"
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBullseye,
  faHandshake,
  faUserGroup,
  faDumbbell,
  faBuilding,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative h-[30vh] md:h-[40vh] bg-primary/20 overflow-hidden">
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-6xl font-bold text-primary mb-2 md:mb-4">À Propos de Shape It</h1>
            <p className="text-lg md:text-xl text-primary-dark max-w-2xl mx-auto">
              Un studio privé dédié à votre évolution physique et mentale
            </p>
          </div>
        </div>
        <div className="absolute inset-0 -z-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-primary-light rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </section>
      
      {/* Welcome Section */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative h-[300px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/gym_entrance.webp"
                alt="Shape It No Limit"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Bienvenue chez Shape It</h2>
              <p className="text-base md:text-lg text-gray-700">
            Bienvenue chez Shape It, votre partenaire de confiance pour atteindre vos objectifs de forme et de
            bien-être. Nous sommes passionnés par l'idée d'aider nos clients à transformer leur vie grâce à un coaching
            personnalisé et des programmes d'entraînement sur mesure.
          </p>
              <p className="text-base md:text-lg text-gray-700">
                Ici, chaque détail est pensé pour vous offrir bien plus qu'un simple entraînement : une expérience sur-mesure, 
                dans un cadre intime, exclusif et motivant.
              </p>
              <p className="text-base md:text-lg text-gray-700">
                Vous ne suivez pas un programme standard. Vous êtes accompagné(e), guidé(e), challengé(e) par des experts 
                passionnés en coaching et en nutrition, qui s'adaptent à vos besoins, votre rythme, et votre quotidien.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-10 md:py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white bg-primary inline-block px-6 py-3 rounded-lg mb-3 md:mb-4">Notre Approche</h2>
            <p className="text-base md:text-lg text-gray-700 mt-4">
              Nous adoptons une approche holistique du bien-être, centrée sur vos besoins et vos objectifs personnels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <FontAwesomeIcon icon={faDumbbell} className="text-primary text-xl md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2 md:mb-4">Programmes personnalisés</h3>
              <p className="text-sm md:text-base text-gray-700">Des programmes d'entraînement sur mesure adaptés à vos objectifs et votre niveau.</p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <FontAwesomeIcon icon={faHandshake} className="text-primary text-xl md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2 md:mb-4">Conseils nutritionnels</h3>
              <p className="text-sm md:text-base text-gray-700">Des conseils nutritionnels adaptés à vos besoins pour optimiser vos résultats.</p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <FontAwesomeIcon icon={faBullseye} className="text-primary text-xl md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2 md:mb-4">Suivi régulier</h3>
              <p className="text-sm md:text-base text-gray-700">Un suivi continu et personnalisé pour garantir votre progression et votre motivation.</p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <FontAwesomeIcon icon={faUserGroup} className="text-primary text-xl md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2 md:mb-4">Soutien motivationnel</h3>
              <p className="text-sm md:text-base text-gray-700">Un accompagnement motivationnel constant pour vous aider à rester focalisé sur vos objectifs.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Coaches Section */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 md:mb-4 text-center">Nos Coachs</h2>
            <p className="text-base md:text-lg text-gray-700 text-center">
            Nos coachs sont des professionnels certifiés et expérimentés, passionnés par leur métier et dévoués à votre
            réussite. Ils sont là pour vous motiver, vous guider et vous pousser à dépasser vos limites en toute
            sécurité.
          </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">
              <div className="relative h-[250px] md:w-1/2 md:h-[300px]">
                <Image 
                  src="/home.webp"
                  alt="Wiam Alibouch"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 md:p-6 md:w-1/2 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-primary mb-2">Wiam Alibouch</h3>
                <p className="text-primary-light mb-3 md:mb-4">Coach en nutrition & Personal Trainer</p>
                <p className="text-sm md:text-base text-gray-700">
                  Passionnée par la transformation humaine et le développement de soi, plus de trois ans d'expérience 
                  dans l'accompagnement personnalisé.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">
              <div className="relative h-[250px] md:w-1/2 md:h-[300px] bg-primary/20 flex items-center justify-center">
                <FontAwesomeIcon icon={faUserGroup} className="text-primary text-5xl md:text-6xl" />
              </div>
              <div className="p-5 md:p-6 md:w-1/2 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-primary mb-2">Notre Équipe</h3>
                <p className="text-primary-light mb-3 md:mb-4">Experts en fitness et bien-être</p>
                <p className="text-sm md:text-base text-gray-700">
                  Une équipe de professionnels passionnés, formés aux meilleures méthodes d'entraînement et de coaching
                  pour vous accompagner vers l'excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Installations Section */}
      <section className="py-10 md:py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white bg-primary inline-block px-6 py-3 rounded-lg mb-4 md:mb-6">Nos Installations</h2>
              <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
            Nos centres sont équipés d'installations modernes et de matériel de pointe pour vous offrir une expérience
            d'entraînement optimale. Que vous préfériez les séances en groupe ou le coaching individuel, nous avons
            l'environnement idéal pour vous.
          </p>
              <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8">
                Shape It n'est pas une salle de sport classique. C'est un lieu confidentiel, moderne, inspirant, 
                conçu pour vous offrir une parenthèse rien qu'à vous.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faBuilding} className="text-primary text-xl" />
                </div>
                <p className="text-primary font-medium">Un espace privé, chaleureux et motivant</p>
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-[250px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/gym_entrance.webp"
                alt="Nos installations"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-10 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Rejoignez-nous</h2>
          <p className="text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
            Prêt à commencer votre transformation ? Contactez-nous dès aujourd'hui pour un bilan forme gratuit et
            découvrez comment Shape It peut vous aider à atteindre vos objectifs de santé et de forme.
          </p>
          <Link href="/commencer">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100 group w-full md:w-auto">
              Commencer Votre Parcours
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

