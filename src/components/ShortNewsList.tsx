import { Link } from "react-router-dom";
import { Article } from "@/types";

interface ShortNewsListProps {
  articles: Article[];
}

export function ShortNewsList({ articles }: ShortNewsListProps) {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-foreground mb-8">
          W skrócie
        </h2>
        <div className="space-y-4">
          {articles.slice(0, 6).map((article) => (
            <Link
              key={article.id}
              to={`/artykul/${article.slug}`}
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="font-medium text-foreground hover:text-gmina-primary transition-colors duration-200">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(article.publishedAt).toLocaleDateString('pl-PL', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}