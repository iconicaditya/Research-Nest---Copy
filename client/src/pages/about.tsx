import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Globe, History } from "lucide-react";
import heroImage from "@assets/generated_images/modern_bright_science_laboratory_with_equipment.png";

export default function About() {
  return (
    <Layout>
      <div className="bg-muted/30 py-12 md:py-20 border-b">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">About Our Group</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The Quantum Research Group is an interdisciplinary team of physicists, engineers, and computer scientists dedicated to exploring the fundamental laws of nature and applying them to solve real-world problems.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-accent text-primary-foreground hover:bg-accent/80">
                Our Mission
              </div>
              <h2 className="font-serif text-3xl font-bold text-primary">Advancing Human Knowledge</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to push the boundaries of quantum mechanics and materials science. We aim to develop sustainable energy solutions, revolutionary computing paradigms, and advanced biomedical technologies. Through rigorous experimentation and theoretical modeling, we strive to uncover the hidden mechanisms that govern our universe.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to open science, collaborative research, and the training of the next generation of scientific leaders.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Lab Mission" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="bg-primary text-primary-foreground border-none">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-accent mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">Global Collaboration</h3>
                <p className="opacity-80">We partner with over 30 institutions worldwide to foster innovation and cross-cultural scientific exchange.</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary border-none">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2 text-primary">Excellence</h3>
                <p className="text-muted-foreground">Our team has received numerous grants and awards for groundbreaking contributions to physics.</p>
              </CardContent>
            </Card>
            <Card className="bg-white border border-border">
              <CardContent className="pt-6">
                <GraduationCap className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2 text-primary">Education</h3>
                <p className="text-muted-foreground">We are dedicated to mentorship, having graduated over 50 PhD and MSc students since our inception.</p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-bold text-primary flex items-center justify-center gap-3">
                <History className="h-8 w-8 text-accent" />
                Our History
              </h2>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-accent shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow">
                  <span className="w-3 h-3 bg-white rounded-full"></span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-lg border bg-card shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-primary">Founded</div>
                    <time className="font-mono text-sm text-muted-foreground">2010</time>
                  </div>
                  <div className="text-muted-foreground">The group was established by Dr. Eleanor Vance at the University of Innovation.</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow">
                  <span className="w-3 h-3 bg-white rounded-full"></span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-lg border bg-card shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-primary">First Major Grant</div>
                    <time className="font-mono text-sm text-muted-foreground">2013</time>
                  </div>
                  <div className="text-muted-foreground">Secured $2M funding from NSF for quantum materials research.</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow">
                  <span className="w-3 h-3 bg-white rounded-full"></span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-lg border bg-card shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-primary">Expansion</div>
                    <time className="font-mono text-sm text-muted-foreground">2018</time>
                  </div>
                  <div className="text-muted-foreground">Expanded laboratory facilities and added the Bio-Computation division.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
