import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PublicRegistry } from "@/components/PublicRegistry";

const PublicRegistryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      <main>
        <PublicRegistry />
      </main>
      <Footer />
    </div>
  );
};

export default PublicRegistryPage;