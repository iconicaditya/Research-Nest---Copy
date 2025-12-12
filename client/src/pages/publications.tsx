import { Layout } from "@/components/layout";
import { PUBLICATIONS } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Publications() {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");

  const filteredPublications = PUBLICATIONS.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(search.toLowerCase()) || 
                          pub.authors.toLowerCase().includes(search.toLowerCase());
    const matchesYear = yearFilter === "all" || pub.year.toString() === yearFilter;
    return matchesSearch && matchesYear;
  });

  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl font-bold mb-4">Publications</h1>
          <p className="text-lg opacity-80">
            A collection of our peer-reviewed research articles and conference proceedings.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by title or author..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub) => (
              <div key={pub.id} className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-primary">{pub.title}</h3>
                    <p className="text-muted-foreground italic">{pub.authors}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="font-semibold text-accent">{pub.journal}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{pub.year}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" /> DOI
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" /> PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No publications found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
