import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Calendar } from "lucide-react";
import { PublicRequest } from "@/types/modules";
import { storage, STORAGE_KEYS } from "@/utils/localStorage";
import { toast } from "sonner";

export const PublicRegistry = () => {
  const [requests, setRequests] = useState<PublicRequest[]>(() => 
    storage.get<PublicRequest>(STORAGE_KEYS.PUBLIC_REQUESTS)
  );
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    details: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest: PublicRequest = {
      id: Date.now().toString(),
      submissionDate: new Date().toLocaleDateString('pl-PL'),
      topic: formData.topic,
      status: 'pending',
      daysWaiting: 0
    };

    storage.add(STORAGE_KEYS.PUBLIC_REQUESTS, newRequest);
    setRequests(prev => [...prev, newRequest]);
    
    setFormData({ topic: "", details: "" });
    setShowForm(false);
    
    toast("Wniosek został złożony");
  };

  const getStatusColor = (status: PublicRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: PublicRequest['status']) => {
    switch (status) {
      case 'pending': return 'Oczekuje';
      case 'processing': return 'W trakcie';
      case 'responded': return 'Odpowiedziano';
      case 'rejected': return 'Odrzucone';
    }
  };

  // Calculate days waiting for demo purposes
  const calculateDaysWaiting = (submissionDate: string) => {
    const submitted = new Date(submissionDate.split('.').reverse().join('-'));
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - submitted.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Publiczny rejestr wniosków
        </h1>
        <p className="text-muted-foreground mb-6">
          Wszystkie wnioski o udostępnienie informacji publicznej z ich statusem i odpowiedziami.
        </p>
        
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="mb-6"
        >
          {showForm ? 'Anuluj' : 'Złóż wniosek'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nowy wniosek o informację publiczną</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Temat wniosku"
                  value={formData.topic}
                  onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Szczegóły - czego dokładnie żądasz"
                  value={formData.details}
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="bg-muted p-4 rounded-lg text-sm">
                <p className="font-medium mb-2">Informacja prawna:</p>
                <p>Urząd ma 14 dni na odpowiedź. Jeśli nie zdąży, musi napisać dlaczego i podać nowy termin (max. 2 miesiące).</p>
              </div>
              
              <Button type="submit" className="w-full">
                Złóż wniosek
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Rejestr wniosków</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Brak wniosków w rejestrze</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data złożenia</TableHead>
                    <TableHead>Temat</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Dni oczekiwania</TableHead>
                    <TableHead>Odpowiedź</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{request.submissionDate}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {request.topic}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusText(request.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={calculateDaysWaiting(request.submissionDate) > 14 ? 'text-red-600 font-medium' : ''}>
                          {calculateDaysWaiting(request.submissionDate)} dni
                        </span>
                      </TableCell>
                      <TableCell>
                        {request.responseUrl ? (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                        ) : (
                          <span className="text-muted-foreground">Brak</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};