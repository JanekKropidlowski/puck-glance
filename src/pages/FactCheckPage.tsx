import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FactCheck } from "@/components/FactCheck";

const FactCheckPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      <main>
        <FactCheck />
      </main>
      <Footer />
    </div>
  );
};

export default FactCheckPage;