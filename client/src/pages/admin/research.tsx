import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RESEARCH_AREAS } from "@/lib/data";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminResearch() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Research Areas</h2>
          <p className="text-muted-foreground">Manage key research themes and descriptions.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Area
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESEARCH_AREAS.map((area) => (
          <Card key={area.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden relative group">
              <img 
                src={area.image} 
                alt={area.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="secondary" size="sm">
                  <Pencil className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{area.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3">
                {area.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
