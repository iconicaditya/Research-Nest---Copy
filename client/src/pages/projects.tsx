import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import dnaImage from "@assets/generated_images/abstract_dna_double_helix_structure.png";
import robotImage from "@assets/generated_images/robotic_arm_in_a_lab_setting.png";

export default function Projects() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <Layout>
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl font-bold mb-4 text-primary">Research Projects</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore our ongoing and completed research initiatives funded by leading agencies.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any, index: number) => (
              <Card key={project.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300" data-testid={`project-${project.id}`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={index % 2 === 0 ? dnaImage : robotImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={project.status === "Ongoing" ? "default" : "secondary"} className="mb-2">
                      {project.status}
                    </Badge>
                    <span className="text-xs font-mono text-muted-foreground border px-2 py-0.5 rounded">{project.funding}</span>
                  </div>
                  <CardTitle className="font-serif text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.summary}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="p-0 h-auto font-semibold hover:bg-transparent hover:text-accent">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
