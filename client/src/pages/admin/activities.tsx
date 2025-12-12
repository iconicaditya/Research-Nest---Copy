import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ACTIVITIES } from "@/lib/data";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";

export default function AdminActivities() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Activities</h2>
          <p className="text-muted-foreground">Manage news posts, events, and outreach.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Activity
        </Button>
      </div>

      <div className="space-y-4">
        {ACTIVITIES.map((activity) => (
          <Card key={activity.id} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48 h-48 sm:h-auto bg-muted relative">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="flex-1 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center text-sm text-accent font-semibold mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {activity.date}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                    <p className="text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
