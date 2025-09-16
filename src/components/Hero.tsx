import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Centrum informacji Gminy Puck
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Najważniejsze informacje, dokumenty i aktualności z życia gminy w jednym miejscu. 
          Bądź na bieżąco z decyzjami, które wpływają na Twoją społeczność.
        </p>
        <Button 
          size="lg" 
          className="bg-gmina-primary hover:bg-gmina-primary-hover text-white px-8 py-3"
          disabled
        >
          Prześlij sprawę
        </Button>
        <p className="text-sm text-muted-foreground mt-3">
          Funkcja dostępna wkrótce
        </p>
      </div>
    </section>
  );
}