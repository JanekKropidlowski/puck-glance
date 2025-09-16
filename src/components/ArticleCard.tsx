import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Article } from "@/types";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Link to={`/artykul/${article.slug}`}>
      <Card className="h-full hover:shadow-md transition-shadow duration-200 cursor-pointer">
        {article.imageUrl && (
          <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader className="pb-3">
          <Badge 
            variant="secondary" 
            className="w-fit mb-2 bg-gmina-light text-gmina-primary border-gmina-primary"
          >
            {article.category}
          </Badge>
          <h3 className="font-semibold text-lg leading-tight text-foreground line-clamp-2">
            {article.title}
          </h3>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-muted-foreground line-clamp-3 mb-3">
            {article.excerpt}
          </p>
          <div className="text-sm text-muted-foreground">
            {formatDate(article.publishedAt)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}