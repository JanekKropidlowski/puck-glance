import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Quote,
  Image,
  Minus,
  Trash2,
  Plus,
  MoveUp,
  MoveDown
} from "lucide-react";
import { ArticleSection } from "@/types";

interface RichTextEditorProps {
  sections: ArticleSection[];
  onChange: (sections: ArticleSection[]) => void;
}

export function RichTextEditor({ sections, onChange }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addSection = (type: ArticleSection['type']) => {
    const newSection: ArticleSection = {
      id: Date.now().toString(),
      type,
      content: "",
      level: type === 'heading' ? 2 : undefined,
      listType: type === 'list' ? 'bullet' : undefined,
      listItems: type === 'list' ? [""] : undefined,
    };
    
    onChange([...sections, newSection]);
  };

  const updateSection = (id: string, updates: Partial<ArticleSection>) => {
    const updated = sections.map(section => 
      section.id === id ? { ...section, ...updates } : section
    );
    onChange(updated);
  };

  const removeSection = (id: string) => {
    onChange(sections.filter(section => section.id !== id));
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(section => section.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;
    
    const newSections = [...sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    onChange(newSections);
  };

  const handleImageUpload = (sectionId: string, file: File) => {
    // In real app, upload to server and get URL
    // For demo, create object URL
    const imageUrl = URL.createObjectURL(file);
    updateSection(sectionId, { imageUrl });
  };

  const addListItem = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.listItems) {
      updateSection(sectionId, {
        listItems: [...section.listItems, ""]
      });
    }
  };

  const updateListItem = (sectionId: string, itemIndex: number, value: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.listItems) {
      const newItems = [...section.listItems];
      newItems[itemIndex] = value;
      updateSection(sectionId, { listItems: newItems });
    }
  };

  const removeListItem = (sectionId: string, itemIndex: number) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.listItems && section.listItems.length > 1) {
      const newItems = section.listItems.filter((_, i) => i !== itemIndex);
      updateSection(sectionId, { listItems: newItems });
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSection('heading')}
            >
              <Heading2 className="h-4 w-4 mr-1" />
              Nagłówek
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSection('paragraph')}
            >
              Akapit
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSection('list')}
            >
              <List className="h-4 w-4 mr-1" />
              Lista
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSection('quote')}
            >
              <Quote className="h-4 w-4 mr-1" />
              Cytat
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSection('image')}
            >
              <Image className="h-4 w-4 mr-1" />
              Obraz
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSection('divider')}
            >
              <Minus className="h-4 w-4 mr-1" />
              Separator
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <Card key={section.id} className="relative">
            <CardContent className="p-4">
              {/* Section controls */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium capitalize text-muted-foreground">
                    {section.type === 'paragraph' ? 'Akapit' : 
                     section.type === 'heading' ? 'Nagłówek' :
                     section.type === 'list' ? 'Lista' :
                     section.type === 'quote' ? 'Cytat' :
                     section.type === 'image' ? 'Obraz' : 'Separator'}
                  </span>
                  {section.type === 'heading' && (
                    <Select
                      value={section.level?.toString()}
                      onValueChange={(value) => updateSection(section.id, { level: parseInt(value) as any })}
                    >
                      <SelectTrigger className="w-20 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">H1</SelectItem>
                        <SelectItem value="2">H2</SelectItem>
                        <SelectItem value="3">H3</SelectItem>
                        <SelectItem value="4">H4</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  {section.type === 'list' && (
                    <Select
                      value={section.listType}
                      onValueChange={(value) => updateSection(section.id, { listType: value as any })}
                    >
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bullet">Punktowana</SelectItem>
                        <SelectItem value="numbered">Numerowana</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSection(section.id, 'up')}
                    disabled={index === 0}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSection(section.id, 'down')}
                    disabled={index === sections.length - 1}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(section.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Section content */}
              {section.type === 'heading' && (
                <Input
                  placeholder="Wprowadź nagłówek..."
                  value={section.content}
                  onChange={(e) => updateSection(section.id, { content: e.target.value })}
                  className="font-semibold"
                />
              )}

              {section.type === 'paragraph' && (
                <Textarea
                  placeholder="Wprowadź treść akapitu..."
                  value={section.content}
                  onChange={(e) => updateSection(section.id, { content: e.target.value })}
                  className="min-h-24"
                />
              )}

              {section.type === 'quote' && (
                <Textarea
                  placeholder="Wprowadź cytat..."
                  value={section.content}
                  onChange={(e) => updateSection(section.id, { content: e.target.value })}
                  className="min-h-20 italic"
                />
              )}

              {section.type === 'list' && (
                <div className="space-y-2">
                  {section.listItems?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <Input
                        placeholder="Element listy..."
                        value={item}
                        onChange={(e) => updateListItem(section.id, itemIndex, e.target.value)}
                      />
                      {section.listItems!.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeListItem(section.id, itemIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addListItem(section.id)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Dodaj element
                  </Button>
                </div>
              )}

              {section.type === 'image' && (
                <div className="space-y-3">
                  <div>
                    <Label>Obraz</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(section.id, file);
                      }}
                    />
                  </div>
                  {section.imageUrl && (
                    <div className="space-y-2">
                      <img
                        src={section.imageUrl}
                        alt="Preview"
                        className="max-h-40 rounded-lg border"
                      />
                      <Input
                        placeholder="Opis obrazu (alt text)..."
                        value={section.imageCaption || ''}
                        onChange={(e) => updateSection(section.id, { imageCaption: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              )}

              {section.type === 'divider' && (
                <div className="py-2">
                  <hr className="border-gray-300" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {sections.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Brak treści. Użyj przycisków powyżej, aby dodać sekcje.</p>
        </div>
      )}
    </div>
  );
}