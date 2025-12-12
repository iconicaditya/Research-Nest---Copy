import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, FlaskConical, Users, Calendar } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchResearchAreas, fetchActivities } from "@/lib/api";
import heroImage from "@assets/generated_images/modern_bright_science_laboratory_with_equipment.png";
import networkImage from "@assets/generated_images/abstract_blue_network_data_visualization.png";

export default function Home() {
  const { data: researchAreas = [] } = useQuery({
    queryKey: ["research-areas"],
    queryFn: fetchResearchAreas,
  });

  const { data: activities = [] } = useQuery({
    queryKey: ["activities"],
    queryFn: fetchActivities,
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Laboratory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-90" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-white">
          <div className="max-w-3xl animate-in slide-in-from-bottom-10 fade-in duration-700">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Pioneering the Future of <span className="text-accent italic">Quantum Science</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Our interdisciplinary team explores the fundamental properties of matter to develop next-generation technologies for energy, computing, and health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/research">
                <Button size="lg" className="text-base px-8 py-6 bg-accent text-white hover:bg-accent/90 border-none shadow-lg shadow-accent/20" data-testid="button-explore-research">
                  Explore Research
                </Button>
              </Link>
              <Link href="/team">
                <Button size="lg" variant="outline" className="text-base px-8 py-6 text-white border-white hover:bg-white/10 hover:text-white backdrop-blur-sm" data-testid="button-meet-team">
                  Meet the Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
                About Our Group
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Established in 2010, the Quantum Research Group is dedicated to solving some of the most pressing challenges in modern physics and engineering. We believe in a collaborative approach, bringing together experts from diverse fields to foster innovation.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                  <h3 className="font-bold text-3xl text-accent mb-1">50+</h3>
                  <p className="text-sm font-medium text-muted-foreground">Publications</p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                  <h3 className="font-bold text-3xl text-accent mb-1">12</h3>
                  <p className="text-sm font-medium text-muted-foreground">Ongoing Projects</p>
                </div>
              </div>
              <Link 
                href="/about" 
                className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors mt-4 group"
              >
                Learn more about our mission 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={networkImage} 
                  alt="Data Viz" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Research Areas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our work spans multiple disciplines, focusing on three core pillars of investigation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {researchAreas.slice(0, 3).map((area: any) => (
              <Link key={area.id} href="/research" className="block h-full">
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-none shadow-md overflow-hidden h-full flex flex-col" data-testid={`card-research-${area.id}`}>
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={area.image} 
                      alt={area.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl group-hover:text-accent transition-colors">
                      {area.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <span className="text-sm font-semibold text-primary flex items-center">
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activities & News */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">Latest Activities</h2>
              <p className="text-muted-foreground">News, events, and outreach from our lab.</p>
            </div>
            <Link href="/activities">
              <Button variant="outline" className="hidden md:flex" data-testid="button-view-activities">View All Activities</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {activities.slice(0, 2).map((activity: any) => (
              <div key={activity.id} className="group flex gap-6 items-start" data-testid={`activity-${activity.id}`}>
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden hidden sm:block">
                  <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-xs font-semibold text-accent uppercase tracking-wide">
                    <Calendar className="mr-2 h-3 w-3" />
                    {activity.date}
                  </div>
                  <h3 className="font-serif text-xl font-bold group-hover:text-primary/80 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {activity.description}
                  </p>
                  <Link 
                    href="/activities" 
                    className="inline-block text-sm font-medium text-primary underline decoration-accent/50 underline-offset-4 hover:decoration-accent transition-all"
                  >
                    Read full story
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/activities">
              <Button variant="outline" className="w-full">View All Activities</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links / CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <FileText className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">Publications</h3>
              <p className="text-primary-foreground/70 mb-4 text-sm">Browse our latest peer-reviewed papers and conference proceedings.</p>
              <Link href="/publications" className="text-sm font-semibold hover:text-accent transition-colors block">
                View Library &rarr;
              </Link>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <FlaskConical className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">Projects</h3>
              <p className="text-primary-foreground/70 mb-4 text-sm">Discover our funded research projects and collaborations.</p>
              <Link href="/projects" className="text-sm font-semibold hover:text-accent transition-colors block">
                See Projects &rarr;
              </Link>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Users className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">Join Us</h3>
              <p className="text-primary-foreground/70 mb-4 text-sm">Interested in joining the team? Check out open positions.</p>
              <Link href="/contact" className="text-sm font-semibold hover:text-accent transition-colors block">
                Get in Touch &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
