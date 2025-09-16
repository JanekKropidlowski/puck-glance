import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { mockArticles } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const Categories = () => {
  const categories = [
    { 
      name: "O gminie", 
      slug: "o-gminie",
      description: "Informacje dotyczące działalności i rozwoju gminy"
    },
    { 
      name: "O wójcie", 
      slug: "o-wojcie",
      description: "Aktualności i komunikaty od wójta gminy"
    },
  ];

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
              <span className="text-foreground">Kategorie</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Kategorie
          </h1>

          {/* Lista kategorii */}
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {categories.map((category) => (
              <div 
                key={category.slug}
                className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {category.name}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                <Badge className="bg-gmina-light text-gmina-primary border-gmina-primary">
                  {mockArticles.filter(a => a.category.toLowerCase().includes(category.slug.split('-')[1] || category.slug)).length} artykułów
                </Badge>
              </div>
            ))}
          </div>

          {/* Przykładowe artykuły z wybranych kategorii */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              Ostatnie artykuły
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockArticles.slice(0, 6).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;