import { Download, FileText, Image, FileIcon } from "lucide-react";
import { Document } from "@/types";

interface DocumentsListProps {
  documents: Document[];
}

const getFileIcon = (type: Document['type']) => {
  switch (type) {
    case 'pdf':
      return <FileText className="w-5 h-5 text-red-500" />;
    case 'doc':
    case 'docx':
      return <FileText className="w-5 h-5 text-blue-500" />;
    case 'jpg':
    case 'png':
      return <Image className="w-5 h-5 text-green-500" />;
    default:
      return <FileIcon className="w-5 h-5 text-gray-500" />;
  }
};

export function DocumentsList({ documents }: DocumentsListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-foreground mb-8">
          Ostatnie dokumenty
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documents.slice(0, 5).map((document) => (
            <a
              key={document.id}
              href={document.url}
              download
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
            >
              <div className="flex-shrink-0 mr-3">
                {getFileIcon(document.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-gmina-primary transition-colors duration-200 line-clamp-2">
                  {document.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                  <span>{formatDate(document.publishedAt)}</span>
                  <span>{document.size}</span>
                </div>
              </div>
              <Download className="w-4 h-4 text-muted-foreground group-hover:text-gmina-primary transition-colors duration-200 ml-2 flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}