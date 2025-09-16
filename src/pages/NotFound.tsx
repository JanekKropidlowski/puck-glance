import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold text-gmina-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Strona nie została znaleziona
          </h2>
          <p className="text-muted-foreground mb-8">
            Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-gmina-primary text-white rounded-lg hover:bg-gmina-primary-hover transition-colors duration-200"
          >
            Wróć do strony głównej
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
