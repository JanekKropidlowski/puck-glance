import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, User, UserX } from "lucide-react";
import { CitizenReport } from "@/types/modules";
import { storage, STORAGE_KEYS } from "@/utils/localStorage";
import { toast } from "sonner";

export const CitizenReports = () => {
  const [reports, setReports] = useState<CitizenReport[]>(() => 
    storage.get<CitizenReport>(STORAGE_KEYS.CITIZEN_REPORTS)
  );
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    isAnonymous: false,
    authorName: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReport: CitizenReport = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      location: {
        lat: 54.7244 + (Math.random() - 0.5) * 0.01, // Random location near Puck
        lng: 18.4039 + (Math.random() - 0.5) * 0.01,
        address: formData.address
      },
      isAnonymous: formData.isAnonymous,
      authorName: formData.isAnonymous ? undefined : formData.authorName,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    storage.add(STORAGE_KEYS.CITIZEN_REPORTS, newReport);
    setReports(prev => [...prev, newReport]);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      address: "",
      isAnonymous: false,
      authorName: ""
    });
    setShowForm(false);
    
    toast("Zgłoszenie zostało wysłane do moderacji");
  };

  const getStatusColor = (status: CitizenReport['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: CitizenReport['status']) => {
    switch (status) {
      case 'pending': return 'Oczekuje';
      case 'in_progress': return 'W realizacji';
      case 'resolved': return 'Rozwiązane';
      case 'rejected': return 'Odrzucone';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Zgłoszenia mieszkańców
        </h1>
        <p className="text-muted-foreground mb-6">
          Zgłoś problem w gminie. Twoje zgłoszenie zostanie przekazane do odpowiednich służb.
        </p>
        
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="mb-6"
        >
          {showForm ? 'Anuluj' : 'Zgłoś problem'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nowe zgłoszenie</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Tytuł zgłoszenia"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Opis problemu"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Input
                  placeholder="Adres lub lokalizacja"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      isAnonymous: e.target.checked,
                      authorName: e.target.checked ? "" : prev.authorName
                    }))}
                  />
                  <span className="text-sm">Zgłoś anonimowo</span>
                </label>
              </div>
              
              {!formData.isAnonymous && (
                <div>
                  <Input
                    placeholder="Twoje imię (opcjonalne)"
                    value={formData.authorName}
                    onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                  />
                </div>
              )}
              
              <Button type="submit" className="w-full">
                Wyślij zgłoszenie
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {reports.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Brak zgłoszeń</p>
            </CardContent>
          </Card>
        ) : (
          reports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                    <p className="text-muted-foreground mb-3">{report.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{report.location.address}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {report.isAnonymous ? (
                          <>
                            <UserX className="w-4 h-4" />
                            <span>Anonimowe</span>
                          </>
                        ) : (
                          <>
                            <User className="w-4 h-4" />
                            <span>{report.authorName || 'Mieszkaniec'}</span>
                          </>
                        )}
                      </div>
                      
                      <span>
                        {new Date(report.createdAt).toLocaleDateString('pl-PL')}
                      </span>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(report.status)}>
                    {getStatusText(report.status)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};