import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";

// Mock data
const stats = [
  { title: "Total Reports", value: "12", icon: AlertCircle },
  { title: "Resolved Issues", value: "8", icon: CheckCircle },
  { title: "Active Reports", value: "4", icon: Clock },
];

const recentIssues = [
  {
    id: 1,
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues",
    status: "in-progress",
    location: "Main St & 5th Ave",
    createdAt: "2 hours ago",
    upvotes: 23,
  },
  {
    id: 2,
    title: "Broken Streetlight",
    description: "Street light not working, safety concern",
    status: "pending",
    location: "Park Ave",
    createdAt: "1 day ago",
    upvotes: 15,
  },
  {
    id: 3,
    title: "Garbage Collection Missed",
    description: "Trash bins not collected for 3 days",
    status: "resolved",
    location: "Oak Street",
    createdAt: "3 days ago",
    upvotes: 8,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "resolved":
      return "bg-green-100 text-green-800 border-green-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Good morning, John!
          </h1>
          <p className="text-muted-foreground">
            Track your reports and community issues
          </p>
        </div>

        {/* Quick Report Button */}
        <Button className="w-full" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Report New Issue
        </Button>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4 space-y-2">
                <stat.icon className="w-6 h-6 mx-auto text-primary" />
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.title}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search your reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Recent Issues */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Issues
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {recentIssues.map((issue) => (
              <Card key={issue.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {issue.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {issue.description}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={getStatusColor(issue.status)}
                      >
                        {issue.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {issue.location}
                      </div>
                      <div className="flex items-center gap-3">
                        <span>👍 {issue.upvotes}</span>
                        <span>{issue.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}