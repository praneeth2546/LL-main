import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, MoreVertical, MapPin, Clock, Users, TrendingUp } from "lucide-react";

// Mock data for authority dashboard
const metrics = [
  { title: "Pending Issues", value: "24", icon: Clock, change: "+3" },
  { title: "In Progress", value: "18", icon: TrendingUp, change: "-2" },
  { title: "Resolved Today", value: "12", icon: Users, change: "+8" },
  { title: "Avg Response Time", value: "2.4h", icon: Clock, change: "-0.3h" },
];

const priorityIssues = [
  {
    id: 1,
    title: "Major Water Main Break",
    description: "Water flooding on residential street affecting 50+ homes",
    priority: "high",
    category: "Water & Utilities",
    location: "Elm Street & Oak Avenue",
    reportedBy: "Multiple Citizens",
    upvotes: 47,
    timeAgo: "30 minutes ago",
    department: "Water Department",
    selected: false,
  },
  {
    id: 2,
    title: "Traffic Signal Malfunction",
    description: "Intersection signal stuck on red, causing major delays",
    priority: "high",
    category: "Roads & Traffic",
    location: "Main St & 1st Ave",
    reportedBy: "Sarah Johnson",
    upvotes: 32,
    timeAgo: "1 hour ago", 
    department: "Transportation",
    selected: false,
  },
  {
    id: 3,
    title: "Overflowing Dumpster",
    description: "Commercial dumpster overflowing, attracting pests",
    priority: "medium",
    category: "Sanitation",
    location: "Behind 123 Commerce St",
    reportedBy: "Mike Chen",
    upvotes: 15,
    timeAgo: "3 hours ago",
    department: "Sanitation",
    selected: false,
  },
  {
    id: 4,
    title: "Broken Playground Equipment",
    description: "Swing set chain broken, safety hazard for children",
    priority: "medium",
    category: "Parks & Recreation",
    location: "Central Park Playground",
    reportedBy: "Lisa Rodriguez",
    upvotes: 28,
    timeAgo: "5 hours ago",
    department: "Parks & Rec",
    selected: false,
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "low":
      return "bg-green-100 text-green-800 border-green-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export default function AuthorityDashboard() {
  const [selectedIssues, setSelectedIssues] = useState<number[]>([]);
  const [filterBy, setFilterBy] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectIssue = (issueId: number) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on issues:`, selectedIssues);
    // TODO: Implement bulk actions
  };

  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Authority Dashboard
          </h1>
          <p className="text-muted-foreground">
            City Infrastructure Department
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs text-green-600">{metric.change}</p>
                  </div>
                  <metric.icon className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Issues</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="roads">Roads & Traffic</SelectItem>
                <SelectItem value="utilities">Water & Utilities</SelectItem>
                <SelectItem value="sanitation">Sanitation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedIssues.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">
                {selectedIssues.length} selected
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleBulkAction("assign")}
              >
                Assign Department
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleBulkAction("in-progress")}
              >
                Mark In Progress
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleBulkAction("resolved")}
              >
                Mark Resolved
              </Button>
            </div>
          )}
        </div>

        {/* Priority Issues Queue */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Priority Issues Queue
          </h2>

          <div className="space-y-3">
            {priorityIssues.map((issue) => (
              <Card key={issue.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedIssues.includes(issue.id)}
                        onCheckedChange={() => handleSelectIssue(issue.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">
                              {issue.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {issue.description}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className={getPriorityColor(issue.priority)}
                          >
                            {issue.priority} priority
                          </Badge>
                          <Badge variant="secondary">
                            {issue.category}
                          </Badge>
                          <Badge variant="outline">
                            {issue.department}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {issue.location}
                            </div>
                            <span>by {issue.reportedBy}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span>👍 {issue.upvotes}</span>
                            <span>{issue.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12">
            Export Report
          </Button>
          <Button variant="outline" className="h-12">
            Analytics View
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}