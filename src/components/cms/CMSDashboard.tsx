import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  FileText,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";
import { ArticleForm } from "./ArticleForm";
import { Article, User } from "@/types";
import { getStoredData, saveToStorage } from "@/utils/localStorage";
import { mockArticles } from "@/data/mockData";

interface CMSDashboardProps {
  currentUser: User;
  onLogout: () => void;
}

export function CMSDashboard({ currentUser, onLogout }: CMSDashboardProps) {
  const [activeTab, setActiveTab] = useState("articles");
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | undefined>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    // Load articles from localStorage or use mock data
    const storedArticles = getStoredData<Article[]>('cms_articles', []);
    if (storedArticles.length === 0) {
      // Initialize with mock data, adding required CMS fields
      const initialArticles = mockArticles.map(article => ({
        ...article,
        author: currentUser,
        status: 'published' as const,
        createdAt: article.publishedAt,
        updatedAt: article.publishedAt,
        formattedContent: [],
        tags: [],
      }));
      setArticles(initialArticles);
      saveToStorage('cms_articles', initialArticles);
    } else {
      setArticles(storedArticles);
    }
  }, [currentUser]);

  const handleSaveArticle = (articleData: Article) => {
    const updatedArticles = editingArticle
      ? articles.map(a => a.id === editingArticle.id ? articleData : a)
      : [...articles, articleData];
    
    setArticles(updatedArticles);
    saveToStorage('cms_articles', updatedArticles);
    
    setShowArticleForm(false);
    setEditingArticle(undefined);
  };

  const handleDeleteArticle = (articleId: string) => {
    if (confirm('Czy na pewno chcesz usunąć ten artykuł?')) {
      const updatedArticles = articles.filter(a => a.id !== articleId);
      setArticles(updatedArticles);
      saveToStorage('cms_articles', updatedArticles);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: Article['status']) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'archived': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: Article['status']) => {
    switch (status) {
      case 'published': return 'Opublikowane';
      case 'draft': return 'Szkic';
      case 'archived': return 'Archiwum';
      default: return status;
    }
  };

  const stats = {
    totalArticles: articles.length,
    publishedArticles: articles.filter(a => a.status === 'published').length,
    draftArticles: articles.filter(a => a.status === 'draft').length,
    archivedArticles: articles.filter(a => a.status === 'archived').length,
  };

  if (showArticleForm) {
    return (
      <ArticleForm
        article={editingArticle}
        currentUser={currentUser}
        onSave={handleSaveArticle}
        onCancel={() => {
          setShowArticleForm(false);
          setEditingArticle(undefined);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Panel CMS</h1>
              <p className="text-muted-foreground">Zarządzanie treścią strony</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-muted-foreground">{currentUser.role}</p>
              </div>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Wyloguj
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wszystkie artykuły</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalArticles}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Opublikowane</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.publishedArticles}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Szkice</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.draftArticles}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Archiwum</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.archivedArticles}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="articles">Artykuły</TabsTrigger>
            <TabsTrigger value="reports">Zgłoszenia</TabsTrigger>
            <TabsTrigger value="users">Użytkownicy</TabsTrigger>
            <TabsTrigger value="settings">Ustawienia</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Zarządzanie artykułami</CardTitle>
                    <CardDescription>
                      Twórz, edytuj i publikuj artykuły
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowArticleForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nowy artykuł
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Szukaj artykułów..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="published">Opublikowane</SelectItem>
                      <SelectItem value="draft">Szkice</SelectItem>
                      <SelectItem value="archived">Archiwum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Articles Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tytuł</TableHead>
                        <TableHead>Kategoria</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Data aktualizacji</TableHead>
                        <TableHead className="text-right">Akcje</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredArticles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{article.title}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {article.excerpt}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{article.category}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(article.status)}>
                              {getStatusLabel(article.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>{article.author.name}</TableCell>
                          <TableCell>
                            {new Date(article.updatedAt).toLocaleDateString('pl-PL')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingArticle(article);
                                  setShowArticleForm(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteArticle(article.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredArticles.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Brak artykułów spełniających kryteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Zgłoszenia mieszkańców</CardTitle>
                <CardDescription>
                  Moderuj zgłoszenia od mieszkańców
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Funkcja w przygotowaniu</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Zarządzanie użytkownikami</CardTitle>
                <CardDescription>
                  Zarządzaj kontami administratorów i redaktorów
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Funkcja w przygotowaniu</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Ustawienia systemu</CardTitle>
                <CardDescription>
                  Konfiguruj ustawienia CMS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Funkcja w przygotowaniu</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}