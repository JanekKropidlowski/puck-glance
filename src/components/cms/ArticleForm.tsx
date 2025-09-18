import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RichTextEditor } from "./RichTextEditor";
import { Article, ArticleSection, User, Category } from "@/types";
import { X, Plus, Upload, Save, Eye } from "lucide-react";
import { getStoredData, saveToStorage } from "@/utils/localStorage";
import { slugify } from "@/lib/utils";

interface ArticleFormProps {
  article?: Article;
  currentUser: User;
  onSave: (article: Article) => void;
  onCancel: () => void;
}

const defaultCategories: Category[] = [
  { id: "1", name: "Inwestycje", slug: "inwestycje" },
  { id: "2", name: "Konsultacje", slug: "konsultacje" },
  { id: "3", name: "Transport", slug: "transport" },
  { id: "4", name: "Samorząd", slug: "samorzad" },
  { id: "5", name: "Zdrowie", slug: "zdrowie" },
  { id: "6", name: "Kultura", slug: "kultura" },
  { id: "7", name: "Urząd", slug: "urzad" },
  { id: "8", name: "Sport", slug: "sport" },
  { id: "9", name: "Edukacja", slug: "edukacja" },
  { id: "10", name: "Środowisko", slug: "srodowisko" }
];

export function ArticleForm({ article, currentUser, onSave, onCancel }: ArticleFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    imageUrl: "",
    slug: "",
    seoTitle: "",
    seoDescription: "",
    status: "draft" as Article['status'],
    tags: [] as string[],
  });
  
  const [sections, setSections] = useState<ArticleSection[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        imageUrl: article.imageUrl || "",
        slug: article.slug,
        seoTitle: article.seoTitle || "",
        seoDescription: article.seoDescription || "",
        status: article.status,
        tags: article.tags || [],
      });
      setSections(article.formattedContent || []);
    }
  }, [article]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title') {
      setFormData(prev => ({ ...prev, slug: slugify(value) }));
    }
    
    // Clear errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Tytuł jest wymagany";
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Zajawka jest wymagana";
    }
    
    if (!formData.category) {
      newErrors.category = "Kategoria jest wymagana";
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = "Slug jest wymagany";
    }
    
    // Check if content exists either in content field or sections
    if (!formData.content.trim() && sections.length === 0) {
      newErrors.content = "Treść artykułu jest wymagana";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateReadTime = (content: string, sections: ArticleSection[]) => {
    let wordCount = content.split(' ').length;
    
    sections.forEach(section => {
      if (section.content) {
        wordCount += section.content.split(' ').length;
      }
      if (section.listItems) {
        wordCount += section.listItems.join(' ').split(' ').length;
      }
    });
    
    return Math.max(1, Math.ceil(wordCount / 200)); // 200 words per minute
  };

  const handleSubmit = async (status: Article['status']) => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const now = new Date().toISOString();
      const articleData: Article = {
        id: article?.id || Date.now().toString(),
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        formattedContent: sections,
        category: formData.category,
        publishedAt: status === 'published' ? (article?.publishedAt || now) : "",
        readTime: calculateReadTime(formData.content, sections),
        imageUrl: formData.imageUrl || undefined,
        slug: formData.slug,
        seoTitle: formData.seoTitle || undefined,
        seoDescription: formData.seoDescription || undefined,
        status,
        tags: formData.tags,
        author: currentUser,
        createdAt: article?.createdAt || now,
        updatedAt: now,
        attachments: article?.attachments,
        sources: article?.sources,
        relatedArticles: article?.relatedArticles,
      };
      
      onSave(articleData);
    } catch (error) {
      console.error('Error saving article:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {article ? "Edytuj artykuł" : "Nowy artykuł"}
          </h1>
          <p className="text-muted-foreground">
            {article ? `Edytujesz: ${article.title}` : "Utwórz nowy artykuł"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Anuluj
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSubmit('draft')}
            disabled={isSubmitting}
          >
            <Save className="h-4 w-4 mr-2" />
            Zapisz jako szkic
          </Button>
          <Button
            onClick={() => handleSubmit('published')}
            disabled={isSubmitting}
          >
            <Eye className="h-4 w-4 mr-2" />
            {article?.status === 'published' ? 'Aktualizuj' : 'Opublikuj'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Treść</TabsTrigger>
          <TabsTrigger value="metadata">Metadane</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Podstawowe informacje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tytuł *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Wprowadź tytuł artykułu..."
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Zajawka *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Krótki opis artykułu (1-2 zdania)..."
                  className={errors.excerpt ? "border-red-500" : ""}
                />
                {errors.excerpt && (
                  <p className="text-sm text-red-600">{errors.excerpt}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategoria *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      {defaultCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-600">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL obrazu głównego</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Treść prosty edytor</CardTitle>
              <CardDescription>
                Wprowadź treść w prostym edytorze tekstowym
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Wprowadź treść artykułu..."
                className="min-h-40"
              />
              {errors.content && (
                <p className="text-sm text-red-600 mt-2">{errors.content}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Treść zaawansowany edytor</CardTitle>
              <CardDescription>
                Użyj zaawansowanego edytora do formatowania treści
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RichTextEditor sections={sections} onChange={setSections} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metadane artykułu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="slug-artykulu"
                  className={errors.slug ? "border-red-500" : ""}
                />
                {errors.slug && (
                  <p className="text-sm text-red-600">{errors.slug}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  URL: /artykul/{formData.slug}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Tagi</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Dodaj tag..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Optymalizacja SEO</CardTitle>
              <CardDescription>
                Dostosuj metadane dla wyszukiwarek
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">Tytuł SEO</Label>
                <Input
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  placeholder="Tytuł dla wyszukiwarek (max 60 znaków)"
                  maxLength={60}
                />
                <p className="text-sm text-muted-foreground">
                  {formData.seoTitle.length}/60 znaków
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">Opis SEO</Label>
                <Textarea
                  id="seoDescription"
                  value={formData.seoDescription}
                  onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                  placeholder="Opis dla wyszukiwarek (max 160 znaków)"
                  maxLength={160}
                />
                <p className="text-sm text-muted-foreground">
                  {formData.seoDescription.length}/160 znaków
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}