import { Layout } from "@/components/layout";
import { TEAM_MEMBERS } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Linkedin, Twitter } from "lucide-react";

export default function Team() {
  const pi = TEAM_MEMBERS.filter(m => m.role.includes("Principal Investigator"));
  const others = TEAM_MEMBERS.filter(m => !m.role.includes("Principal Investigator"));

  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-lg opacity-80 max-w-2xl">
            Meet the brilliant minds behind our research. Our diverse team brings together expertise from physics, chemistry, biology, and computer science.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-2xl font-bold text-primary mb-8 border-b pb-2">Principal Investigator</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {pi.map((member) => (
              <div key={member.id} className="flex flex-col md:flex-row gap-8 bg-card rounded-xl p-6 border shadow-sm">
                <div className="w-48 h-48 shrink-0 mx-auto md:mx-0">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover rounded-full border-4 border-secondary shadow-inner"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-serif text-2xl font-bold text-primary mb-1">{member.name}</h3>
                  <p className="text-accent font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center md:justify-start gap-4">
                    <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-accent transition-colors">
                      <Mail className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl font-bold text-primary mb-8 border-b pb-2">Researchers & Students</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {others.map((member) => (
              <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pt-8 pb-4">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                     <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover rounded-full border-2 border-border"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary">{member.name}</h3>
                  <p className="text-sm text-accent font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  <a href={`mailto:${member.email}`} className="text-xs font-semibold text-primary hover:text-accent inline-flex items-center gap-1">
                    <Mail className="h-3 w-3" /> {member.email}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
