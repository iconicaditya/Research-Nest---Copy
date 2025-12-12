import { Layout } from "@/components/layout";
import { ACTIVITIES } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";

export default function Activities() {
  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl font-bold mb-4">Activities & News</h1>
          <p className="text-lg opacity-80">
            Seminars, workshops, and community outreach events.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <div className="space-y-12">
          {ACTIVITIES.map((activity) => (
            <div key={activity.id} className="group">
              <div className="grid md:grid-cols-3 gap-6 bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                <div className="md:col-span-1 h-48 md:h-full">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:col-span-2 p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs font-semibold text-accent uppercase tracking-wide mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {activity.date}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> Research Team</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                    {activity.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {activity.description}
                  </p>
                  <a href="#" className="inline-block text-sm font-semibold text-primary underline decoration-transparent group-hover:decoration-accent transition-all">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
