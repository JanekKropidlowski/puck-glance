import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react";
import { FactCheck as FactCheckType } from "@/types/modules";

// Mock data for demo
const mockFactChecks: FactCheckType[] = [
  {
    id: "1",
    title: "Weryfikacja: Czy nowy plac zabaw kosztował rzeczywiście 120 tys. zł?",
    claim: "Nowy plac zabaw przy ul. Żeromskiego kosztował 120 tysięcy złotych",
    verdict: "true",
    explanation: "Sprawdziliśmy dokumenty przetargowe i faktury. Koszt całkowity wyniósł 119 847 zł, co potwierdza podaną przez urząd kwotę.",
    sources: [
      { title: "Protokół z przetargu", url: "/documents/przetarg-plac-zabaw.pdf" },
      { title: "Faktura końcowa", url: "/documents/faktura-plac.pdf" }
    ],
    publishedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "2", 
    title: "Weryfikacja: Ścieżka rowerowa - czy projekt jest gotowy?",
    claim: "Projekt ścieżki rowerowej jest kompletny i gotowy do realizacji",
    verdict: "partly_true",
    explanation: "Projekt techniczny jest gotowy, ale brakuje jeszcze pozwolenia na budowę oraz uzgodnień z właścicielami gruntów prywatnych.",
    sources: [
      { title: "Projekt techniczny", url: "/documents/projekt-sciezka.pdf" },
      { title: "Status pozwoleń - styczeń 2025", url: "/documents/pozwolenia-status.pdf" }
    ],
    publishedAt: "2025-01-14T14:30:00Z"
  },
  {
    id: "3",
    title: "Weryfikacja: Czy autobusy rzeczywiście kursują zgodnie z rozkładem?",
    claim: "Autobusy linii 12 i 15 kursują punktualnie według nowego rozkładu",
    verdict: "false",
    explanation: "Analiza opóźnień z ostatniego tygodnia pokazuje średnie opóźnienia 8-12 minut w godzinach szczytu.",
    sources: [
      { title: "Raport punktualności", url: "/documents/punktualnosc-autobusy.pdf" }
    ],
    publishedAt: "2025-01-13T12:00:00Z"
  }
];

export const FactCheck = () => {
  const [factChecks] = useState<FactCheckType[]>(mockFactChecks);

  const getVerdictIcon = (verdict: FactCheckType['verdict']) => {
    switch (verdict) {
      case 'true':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'false':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'partly_true':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'misleading':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
    }
  };

  const getVerdictColor = (verdict: FactCheckType['verdict']) => {
    switch (verdict) {
      case 'true': return 'bg-green-100 text-green-800';
      case 'false': return 'bg-red-100 text-red-800';
      case 'partly_true': return 'bg-yellow-100 text-yellow-800';
      case 'misleading': return 'bg-orange-100 text-orange-800';
    }
  };

  const getVerdictText = (verdict: FactCheckType['verdict']) => {
    switch (verdict) {
      case 'true': return 'Prawda';
      case 'false': return 'Fałsz';
      case 'partly_true': return 'Częściowo prawda';
      case 'misleading': return 'Mylące';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Sprawdź fakty
        </h1>
        <p className="text-muted-foreground">
          Weryfikujemy wypowiedzi i obietnice z jasnym werdyktem i źródłami.
        </p>
      </div>

      <div className="grid gap-6">
        {factChecks.map((factCheck) => (
          <Card key={factCheck.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl mb-2">
                  {factCheck.title}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {getVerdictIcon(factCheck.verdict)}
                  <Badge className={getVerdictColor(factCheck.verdict)}>
                    {getVerdictText(factCheck.verdict)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Sprawdzane twierdzenie:</h4>
                <p className="italic">"{factCheck.claim}"</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">Wyjaśnienie:</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {factCheck.explanation}
                </p>
              </div>

              {factCheck.sources.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-3">Źródła:</h4>
                  <div className="space-y-2">
                    {factCheck.sources.map((source, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        size="sm"
                        className="justify-start h-auto p-3 w-full"
                        asChild
                      >
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="text-left">{source.title}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                Opublikowano: {new Date(factCheck.publishedAt).toLocaleDateString('pl-PL')}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};