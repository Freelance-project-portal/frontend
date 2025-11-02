import ProjectCard from "./ProjectCard";

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
  },
];

const FeaturedProjects = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover exciting opportunities from clients around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
