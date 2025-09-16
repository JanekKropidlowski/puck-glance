import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PromiseTracker } from "@/components/PromiseTracker";

const PromiseTrackerPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      <main>
        <PromiseTracker />
      </main>
      <Footer />
    </div>
  );
};

export default PromiseTrackerPage;