import { ArticleSection } from "@/types";

interface ArticleRendererProps {
  sections: ArticleSection[];
}

export function ArticleRenderer({ sections }: ArticleRendererProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  const renderSection = (section: ArticleSection) => {
    switch (section.type) {
      case 'heading':
        const HeadingTag = `h${section.level}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          1: 'text-3xl font-bold text-foreground mb-6 mt-8',
          2: 'text-2xl font-semibold text-foreground mb-4 mt-6',
          3: 'text-xl font-semibold text-foreground mb-3 mt-5',
          4: 'text-lg font-semibold text-foreground mb-2 mt-4',
          5: 'text-base font-semibold text-foreground mb-2 mt-3',
          6: 'text-sm font-semibold text-foreground mb-1 mt-2',
        };
        
        return (
          <HeadingTag className={headingClasses[section.level || 2]}>
            {section.content}
          </HeadingTag>
        );
        
      case 'paragraph':
        return (
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {section.content}
          </p>
        );
        
      case 'quote':
        return (
          <blockquote className="border-l-4 border-gmina-primary pl-4 py-2 mb-4 italic text-muted-foreground bg-gray-50 rounded-r">
            {section.content}
          </blockquote>
        );
        
      case 'list':
        const ListTag = section.listType === 'numbered' ? 'ol' : 'ul';
        const listClasses = section.listType === 'numbered' 
          ? 'list-decimal list-inside mb-4 space-y-2 text-muted-foreground'
          : 'list-disc list-inside mb-4 space-y-2 text-muted-foreground';
          
        return (
          <ListTag className={listClasses}>
            {section.listItems?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ListTag>
        );
        
      case 'image':
        return (
          <div className="mb-6">
            {section.imageUrl && (
              <div className="text-center">
                <img 
                  src={section.imageUrl} 
                  alt={section.imageCaption || section.content}
                  className="max-w-full h-auto rounded-lg shadow-sm mx-auto"
                />
                {section.imageCaption && (
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    {section.imageCaption}
                  </p>
                )}
              </div>
            )}
          </div>
        );
        
      case 'divider':
        return (
          <hr className="border-gray-300 my-8" />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="prose prose-gray max-w-none">
      {sections.map((section) => (
        <div key={section.id}>
          {renderSection(section)}
        </div>
      ))}
    </div>
  );
}