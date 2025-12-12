import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchResearchAreas } from "@/lib/api";

export default function Research() {
  const { data: researchAreas = [], isLoading } = useQuery({
    queryKey: ["research-areas"],
    queryFn: fetchResearchAreas,
  });

  return (
    <Layout>
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-primary">Research Areas</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            We employ a multi-faceted approach to investigate complex systems, combining experimental techniques with advanced theoretical modeling.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="container mx-auto px-4 md:px-6 py-16">
          <p className="text-center text-muted-foreground">Loading research areas...</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 md:px-6 py-16 space-y-24">
          {researchAreas.map((area: any, index: number) => (
            <section key={area.id} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`} data-testid={`research-area-${area.id}`}>
               <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                <div className="text-accent text-sm font-bold uppercase tracking-wider mb-2">Research Theme {index + 1}</div>
                <h2 className="font-serif text-3xl font-bold text-primary mb-6">{area.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {area.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                <div className="space-y-4">
                  <h3 className="font-bold text-primary">Key Focus Areas:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {["Material Synthesis", "Characterization", "Theoretical Modeling", "Device Fabrication"].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                   <Link href="/publications">
                    <Button variant="outline">View Related Publications</Button>
                   </Link>
                </div>
              </div>
              <div className={index % 2 === 1 ? 'md:col-start-1' : ''}>
                <div className="rounded-2xl overflow-hidden shadow-2xl relative group">
                  <img 
                    src={area.image} 
                    alt={area.title} 
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </Layout>
  );
}
