import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, Play, ExternalLink } from "lucide-react";
import { Promise as PromiseType } from "@/types/modules";

// Mock data for demo
const mockPromises: PromiseType[] = [
  {
    id: "1",
    title: "Budowa nowego placu zabaw",
    description: "Obiecano budowę nowoczesnego placu zabaw przy ul. Żeromskiego do końca 2024 roku.",
    status: "completed",
    evidence: "Plac zabaw został otwarty 15 stycznia 2025",
    evidenceUrl: "/artykul/nowy-plac-zabaw-zeromskiego",
    category: "Infrastruktura"
  },
  {
    id: "2",
    title: "Ścieżka rowerowa łącząca centrum z dzielnicą mieszkaniową", 
    description: "Budowa 2,5 km ścieżki rowerowej planowana na 2025 rok.",
    status: "in_progress",
    evidence: "Trwają konsultacje społeczne, projekt techniczny gotowy",
    evidenceUrl: "/artykul/konsultacje-sciezka-rowerowa",
    category: "Transport"
  },
  {
    id: "3",
    title: "Poprawa punktualności komunikacji publicznej",
    description: "Obiecano optymalizację tras autobusowych dla lepszej punktualności.",
    status: "broken",
    evidence: "Pomimo zmian w rozkładzie, punktualność pogorszyła się",
    category: "Transport"
  },
  {
    id: "4",
    title: "Program bezpłatnych badań dla seniorów",
    description: "Uruchomienie programu zdrowotnego dla mieszkańców 65+.",
    status: "completed",
    evidence: "Program uruchomiony, harmonogram dostępny",
    evidenceUrl: "/artykul/badania-profilaktyczne-seniorzy",
    category: "Zdrowie"
  },
  {
    id: "5",
    title: "Modernizacja oświetlenia LED",
    description: "Wymiana 300 punktów świetlnych na energooszczędne LED do 2025.",
    status: "in_progress", 
    evidence: "Zrealizowano 150 punktów, trwa II etap",
    evidenceUrl: "/artykul/modernizacja-oswietlenie-etap-2",
    category: "Infrastruktura"
  },
  {
    id: "6",
    title: "Cyfryzacja usług urzędowych",
    description: "Wprowadzenie pełnej obsługi online do końca 2024.",
    status: "not_started",
    evidence: "Brak widocznych postępów w digitalizacji",
    category: "Urząd"
  }
];

export const PromiseTracker = () => {
  const [promises] = useState<PromiseType[]>(mockPromises);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = Array.from(new Set(promises.map(p => p.category)));
  const filteredPromises = selectedCategory === 'all' 
    ? promises 
    : promises.filter(p => p.category === selectedCategory);

  const getStatusIcon = (status: PromiseType['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'not_started':
        return <Play className="w-5 h-5 text-gray-600" />;
      case 'broken':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: PromiseType['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'not_started': return 'bg-gray-100 text-gray-800';
      case 'broken': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: PromiseType['status']) => {
    switch (status) {
      case 'completed': return 'Zrealizowane';
      case 'in_progress': return 'W trakcie';
      case 'not_started': return 'Nierozpoczęte';
      case 'broken': return 'Niespełnione';
    }
  };

  const getStats = () => {
    const completed = promises.filter(p => p.status === 'completed').length;
    const inProgress = promises.filter(p => p.status === 'in_progress').length;
    const notStarted = promises.filter(p => p.status === 'not_started').length;
    const broken = promises.filter(p => p.status === 'broken').length;
    
    return { completed, inProgress, notStarted, broken, total: promises.length };
  };

  const stats = getStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Ranking obietnic wyborczych
        </h1>
        <p className="text-muted-foreground">
          Monitorujemy realizację obietnic wyborczych z dowodami i źródłami.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm text-muted-foreground">Zrealizowane</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              <p className="text-sm text-muted-foreground">W trakcie</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold text-gray-600">{stats.notStarted}</p>
              <p className="text-sm text-muted-foreground">Nierozpoczęte</p>
            </div>
            <Play className="w-8 h-8 text-gray-600" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.broken}</p>
              <p className="text-sm text-muted-foreground">Niespełnione</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </CardContent>
        </Card>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={selectedCategory === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          Wszystkie
        </Button>
        {categories.map(category => (
          <Button 
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Promises list */}
      <div className="space-y-6">
        {filteredPromises.map((promise) => (
          <Card key={promise.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">
                    {promise.title}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {promise.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {getStatusIcon(promise.status)}
                  <Badge className={getStatusColor(promise.status)}>
                    {getStatusText(promise.status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Badge variant="secondary">
                  {promise.category}
                </Badge>
              </div>
              
              {promise.evidence && (
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">Stan realizacji:</h4>
                  <p className="text-sm">{promise.evidence}</p>
                </div>
              )}
              
              {promise.evidenceUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={promise.evidenceUrl}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Zobacz dowody
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};