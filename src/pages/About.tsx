import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} />
      
      <main>
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-muted-foreground">
              <span>Strona główna</span>
              <span className="mx-2">→</span>
              <span className="text-foreground">O nas</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            O serwisie
          </h1>

          <div className="prose prose-lg max-w-none">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-gmina-primary">
                  Misja serwisu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  Serwis "Wiadomości Gmina Puck" został utworzony z myślą o mieszkańcach, 
                  którzy chcą być na bieżąco z najważniejszymi wydarzeniami w swojej gminie. 
                  Naszym celem jest transparentność i łatwy dostęp do informacji publicznych.
                </p>
                <p className="text-foreground leading-relaxed">
                  W jednym miejscu znajdziesz aktualne wiadomości, dokumenty urzędowe, 
                  informacje o planowanych inwestycjach oraz możliwość kontaktu z urzędem. 
                  Wszystko zostało zaprojektowane tak, aby być przystępne i czytelne 
                  dla każdego użytkownika.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-gmina-primary">
                  Co znajdziesz na stronie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gmina-primary rounded-full mt-3 mr-3 flex-shrink-0"></span>
                    <span>Najświeższe aktualności z życia gminy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gmina-primary rounded-full mt-3 mr-3 flex-shrink-0"></span>
                    <span>Dokumenty urzędowe dostępne do pobrania</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gmina-primary rounded-full mt-3 mr-3 flex-shrink-0"></span>
                    <span>Informacje o inwestycjach i planach rozwoju</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gmina-primary rounded-full mt-3 mr-3 flex-shrink-0"></span>
                    <span>Wyszukiwarkę ułatwiającą znajdowanie konkretnych treści</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gmina-primary rounded-full mt-3 mr-3 flex-shrink-0"></span>
                    <span>Źródła i załączniki do każdego artykułu</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gmina-primary">
                  Kontakt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  Masz pytania dotyczące treści na stronie lub chcesz zgłosić problem? 
                  Skontaktuj się z nami przez urząd gminy lub skorzystaj z formularza 
                  zgłaszania spraw (dostępnego wkrótce).
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Urząd Gminy Puck</h4>
                  <p className="text-muted-foreground text-sm">
                    Szczegółowe informacje kontaktowe dostępne na oficjalnej stronie urzędu.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;