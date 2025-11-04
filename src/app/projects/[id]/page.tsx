"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { ArrowLeft, Clock, DollarSign, MapPin, User, Calendar } from "lucide-react";

interface ProjectDetailProps {
  params: {
    id: string;
  };
}

// Mock project data - in a real app, this would come from your backend
const project = {
  id: "1",
  title: "Modern E-commerce Website Development",
  description: "Looking for an experienced developer to build a full-stack e-commerce platform with payment integration and inventory management. The platform should support multiple vendors, have a robust admin panel, and provide excellent user experience across all devices.",
  fullDescription: `We are seeking a talented full-stack developer to create a comprehensive e-commerce platform from scratch. This project requires expertise in modern web technologies and e-commerce best practices.

**Key Requirements:**
- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart and checkout process
- Payment gateway integration (Stripe)
- Order management system
- Admin dashboard for managing products, orders, and users
- Responsive design for mobile and desktop
- SEO optimization

**Deliverables:**
- Fully functional e-commerce website
- Admin panel
- Documentation
- Source code with comments
- Post-launch support for 30 days

**Timeline:** 8-10 weeks

We value clear communication and regular updates. Please share your portfolio and relevant experience when applying.`,
  budget: "$5,000 - $10,000",
  location: "Remote",
  timePosted: "2 hours ago",
  skills: ["React", "Node.js", "MongoDB", "Stripe", "TypeScript", "Express"],
  category: "Web Development",
  duration: "2-3 months",
  experienceLevel: "Expert",
  client: {
    name: "TechCorp Inc.",
    rating: 4.8,
    projectsPosted: 12,
    hireRate: 85
  }
};

const ProjectDetail = ({ params }: ProjectDetailProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/projects">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary">{project.category}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {project.timePosted}
                  </span>
                </div>
                <CardTitle className="text-3xl mb-2">{project.title}</CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-line">
                    {project.fullDescription}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-border sticky top-24">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Budget
                  </span>
                  <span className="font-semibold text-primary">{project.budget}</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </span>
                  <span className="font-medium">{project.location}</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Duration
                  </span>
                  <span className="font-medium">{project.duration}</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Experience Level
                  </span>
                  <span className="font-medium">{project.experienceLevel}</span>
                </div>
                
                <Separator className="my-4" />
                
                <Button className="w-full" size="lg" variant="hero">
                  Apply for Project
                </Button>
                <Button className="w-full" variant="outline">
                  Save for Later
                </Button>
              </CardContent>
            </Card>

            {/* Client Info */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>About the Client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-foreground">{project.client.name}</p>
                  <p className="text-sm text-muted-foreground">Member since 2022</p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium">{project.client.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Projects Posted</span>
                    <span className="font-medium">{project.client.projectsPosted}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hire Rate</span>
                    <span className="font-medium">{project.client.hireRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;