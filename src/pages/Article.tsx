import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockArticles } from "@/data/mockData";
import { ArticleRenderer } from "@/components/ArticleRenderer";
import { getStoredData } from "@/utils/localStorage";
import { Clock, Download, ExternalLink } from "lucide-react";

const Article = () => {
  const { slug } = useParams();
  
  // Find article by slug from CMS articles first, then fallback to mock data
  const cmsArticles = getStoredData('cms_articles', []);
  const allArticles = [...cmsArticles, ...mockArticles];
  const article = allArticles.find(a => a.slug === slug);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Artykuł nie został znaleziony
            </h1>
            <Link 
              to="/" 
              className="text-gmina-primary hover:underline"
            >
              Wróć do strony głównej
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Mock attachments and sources for demonstration
  const mockAttachments = [
    { id: "1", name: "Załącznik nr 1 - harmonogram prac.pdf", url: "#", size: "1.2 MB" },
    { id: "2", name: "Mapa lokalizacji.jpg", url: "#", size: "890 KB" },
  ];

  const mockSources = [
    { id: "1", title: "Uchwała Rady Gminy nr 12/2025", url: "#" },
    { id: "2", title: "Protokół z konsultacji społecznych", url: "#" },
  ];

  const relatedArticles = mockArticles.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} />
      
      <main>
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-gmina-primary">Strona główna</Link>
              <span className="mx-2">→</span>
              <span className="hover:text-gmina-primary">{article.category}</span>
              <span className="mx-2">→</span>
              <span className="text-foreground">{article.title}</span>
            </nav>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header artykułu */}
          <header className="mb-8">
            <Badge className="bg-gmina-light text-gmina-primary border-gmina-primary mb-4">
              {article.category}
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <span>{formatDate(article.publishedAt)}</span>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{article.readTime} min</span>
              </div>
            </div>
          </header>

          {/* Zdjęcie główne */}
          {article.imageUrl && (
            <div className="mb-8">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full rounded-lg shadow-sm"
              />
            </div>
          )}

          {/* Lead */}
          <div className="text-lg text-foreground mb-8 leading-relaxed font-medium">
            {article.excerpt}
          </div>

          {/* Treść */}
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-foreground leading-relaxed mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-foreground leading-relaxed mb-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
              architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          {/* Załączniki */}
          {mockAttachments.length > 0 && (
            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Download className="w-5 h-5 mr-2" />
                  Załączniki
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAttachments.map((attachment) => (
                    <a
                      key={attachment.id}
                      href={attachment.url}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
                    >
                      <span className="font-medium text-foreground group-hover:text-gmina-primary">
                        {attachment.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {attachment.size}
                      </span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Źródła */}
          {mockSources.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Źródła
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSources.map((source) => (
                    <a
                      key={source.id}
                      href={source.url}
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
                    >
                      <span className="font-medium text-foreground group-hover:text-gmina-primary">
                        {source.title}
                      </span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Powiązane artykuły */}
          {relatedArticles.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Powiązane artykuły
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Article;