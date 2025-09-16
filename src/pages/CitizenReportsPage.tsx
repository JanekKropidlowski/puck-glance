import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CitizenReports } from "@/components/CitizenReports";

const CitizenReportsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      <main>
        <CitizenReports />
      </main>
      <Footer />
    </div>
  );
};

export default CitizenReportsPage;