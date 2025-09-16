import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { ShortNewsList } from "@/components/ShortNewsList";
import { DocumentsList } from "@/components/DocumentsList";
import { Footer } from "@/components/Footer";
import { mockArticles, mockDocuments } from "@/data/mockData";

const Index = () => {
  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log("Search query:", query);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} />
      
      <main>
        <Hero />
        
        {/* Najnowsze artykuły */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              Najnowsze artykuły
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockArticles.slice(0, 6).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        <ShortNewsList articles={mockArticles} />
        
        <DocumentsList documents={mockDocuments} />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
