import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Clock, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  budget: string;
  location: string;
  timePosted: string;
  skills: string[];
  category: string;
  href?: string; // optional href — if provided the card will be wrapped with a Link
}

const ProjectCard = ({
  id,
  title,
  description,
  budget,
  location,
  timePosted,
  skills,
  category,
  href,
}: ProjectCardProps) => {
  const card = (
    <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-border bg-card hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="mb-2">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timePosted}
          </span>
        </div>
        <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 pb-1">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 font-semibold text-primary">
            <DollarSign className="h-4 w-4" />
            {budget}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {location}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  // If an href is provided, wrap the card with a Link. Otherwise return card as-is
  return href ? <Link href={href}>{card}</Link> : card;
};

export default ProjectCard;
