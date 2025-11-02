import Hero from "@/src/components/Hero"
import { Briefcase, Rocket, Users } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"
import FeaturedProjects from "@/src/components/FeaturedProjects"

const page = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose ProjectHub?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The perfect platform for students to gain experience and businesses to find talent
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-colors" style={{ boxShadow: 'var(--shadow-card)' }}>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-World Projects</CardTitle>
                <CardDescription>
                  Access diverse projects from businesses and faculty members across various domains
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors" style={{ boxShadow: 'var(--shadow-card)' }}>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Talented Students</CardTitle>
                <CardDescription>
                  Connect with skilled students eager to apply their knowledge to real-world challenges
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors" style={{ boxShadow: 'var(--shadow-card)' }}>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Easy Management</CardTitle>
                <CardDescription>
                  Streamlined dashboard to post projects, review applications, and manage collaborations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      <FeaturedProjects />
    </div>
  )
}

export default page