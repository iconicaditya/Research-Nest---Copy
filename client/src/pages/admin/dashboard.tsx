import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, FlaskConical, Calendar, ArrowUpRight } from "lucide-react";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">Welcome back to the admin dashboard.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Publications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active researchers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 grants pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Seminar on Oct 15</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Mockup */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Content changes made in the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">
                      ED
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Dr. Eleanor Vance</p>
                      <p className="text-sm text-muted-foreground">Updated "Quantum Materials" project description</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">2h ago</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and management.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-between group">
              Add New Publication
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
            </Button>
            <Button variant="outline" className="w-full justify-between group">
              Post New Activity
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
            </Button>
            <Button variant="outline" className="w-full justify-between group">
              Update Team Profile
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
            </Button>
            <Button variant="outline" className="w-full justify-between group">
              Upload Gallery Image
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
