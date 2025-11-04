"use client";

import { useState } from "react";
import ProjectCard from "@/src/components/ProjectCard";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

const mockProjects = [
	{
		id: 1,
		title: "Modern E-commerce Website Development",
		description:
			"Looking for an experienced developer to build a full-stack e-commerce platform with payment integration and inventory management.",
		budget: "$5,000 - $10,000",
		location: "Remote",
		timePosted: "2 hours ago",
		skills: ["React", "Node.js", "MongoDB", "Stripe"],
		category: "Web Development",
		href: "/projects/1",
	},
	{
		id: 2,
		title: "Mobile App UI/UX Design",
		description:
			"Need a creative designer to design a modern, user-friendly interface for our fitness tracking mobile application.",
		budget: "$2,000 - $3,500",
		location: "USA",
		timePosted: "5 hours ago",
		skills: ["Figma", "UI/UX", "Mobile Design", "Prototyping"],
		category: "Design",
		href: "/projects/2",
	},
	{
		id: 3,
		title: "SEO & Content Marketing Strategy",
		description:
			"Seeking an SEO expert to improve our website ranking and develop a comprehensive content marketing strategy.",
		budget: "$1,500 - $2,500",
		location: "Remote",
		timePosted: "1 day ago",
		skills: ["SEO", "Content Writing", "Marketing", "Analytics"],
		category: "Marketing",
		href: "/projects/3",
	},
	{
		id: 4,
		title: "Python Data Analysis & Visualization",
		description:
			"Need a data scientist to analyze large datasets and create interactive visualizations for business insights.",
		budget: "$3,000 - $5,000",
		location: "Europe",
		timePosted: "3 hours ago",
		skills: ["Python", "Pandas", "Tableau", "SQL"],
		category: "Data Science",
		href: "/projects/4",
	},
	{
		id: 5,
		title: "Brand Identity Design Package",
		description:
			"Looking for a talented designer to create a complete brand identity including logo, color palette, and brand guidelines.",
		budget: "$1,000 - $2,000",
		location: "Remote",
		timePosted: "6 hours ago",
		skills: ["Illustrator", "Photoshop", "Branding", "Logo Design"],
		category: "Design",
		href: "/projects/5",
	},
	{
		id: 6,
		title: "WordPress Plugin Development",
		description:
			"Need an experienced WordPress developer to create a custom plugin for appointment scheduling and booking.",
		budget: "$2,500 - $4,000",
		location: "Remote",
		timePosted: "4 hours ago",
		skills: ["WordPress", "PHP", "JavaScript", "MySQL"],
		category: "Web Development",
		href: "/projects/6",
	},
	{
		id: 7,
		title: "Video Editing for YouTube Channel",
		description:
			"Seeking a skilled video editor for ongoing work on a tech review YouTube channel. Must have experience with transitions and effects.",
		budget: "$500 - $1,000/month",
		location: "Remote",
		timePosted: "8 hours ago",
		skills: ["Premiere Pro", "After Effects", "Video Editing"],
		category: "Video & Animation",
		href: "/projects/7",
	},
	{
		id: 8,
		title: "Social Media Management",
		description:
			"Looking for a social media manager to handle Instagram, Twitter, and LinkedIn accounts for a growing startup.",
		budget: "$1,200 - $2,000/month",
		location: "Remote",
		timePosted: "12 hours ago",
		skills: ["Social Media", "Content Creation", "Marketing"],
		category: "Marketing",
		href: "/projects/8",
	},
	{
		id: 9,
		title: "iOS App Development - Swift",
		description:
			"Need an iOS developer to build a native app for meal planning and recipe sharing with social features.",
		budget: "$8,000 - $12,000",
		location: "Remote",
		timePosted: "1 day ago",
		skills: ["Swift", "iOS", "Firebase", "UI Design"],
		category: "Mobile Development",
		href: "/projects/9",
	},
];

const Projects = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [category, setCategory] = useState("all");

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-foreground mb-2">
						Browse Projects
					</h1>
					<p className="text-muted-foreground">
						Find your next opportunity from thousands of projects
					</p>
				</div>

				{/* Filters */}
				<div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm">
					<div className="grid grid-cols-1 md:grid-cols-12 gap-4">
						<div className="md:col-span-6">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
								<Input
									placeholder="Search projects by keyword..."
									value={searchQuery}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setSearchQuery(e.target.value)
									}
									className="pl-10"
								/>
							</div>
						</div>

						<div className="md:col-span-3">
							<Select value={category} onValueChange={setCategory}>
								<SelectTrigger>
									<SelectValue placeholder="Category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Categories</SelectItem>
									<SelectItem value="web">Web Development</SelectItem>
									<SelectItem value="mobile">Mobile Development</SelectItem>
									<SelectItem value="design">Design</SelectItem>
									<SelectItem value="marketing">Marketing</SelectItem>
									<SelectItem value="data">Data Science</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="md:col-span-3">
							<Button variant="outline" className="w-full">
								<SlidersHorizontal className="h-4 w-4 mr-2" />
								More Filters
							</Button>
						</div>
					</div>
				</div>

				{/* Results Count */}
				<div className="mb-6">
					<p className="text-sm text-muted-foreground">
						Showing{" "}
						<span className="font-semibold text-foreground">
							{mockProjects.length}
						</span>{" "}
						projects
					</p>
				</div>

				{/* Project Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{mockProjects.map((project) => (
						<ProjectCard key={project.id} {...project} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Projects;