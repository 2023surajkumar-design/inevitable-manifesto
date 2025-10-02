import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, User, MessageSquare } from "lucide-react";
import knowledgeImage from "@/assets/knowledge-network.jpg";
import { useState } from "react";
import { toast } from "sonner";

export const CallToAction = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show a toast. In production, this would send to a backend
    toast.success("Thank you for your interest! We'll be in touch soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="join" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-5 -z-10"
        style={{
          backgroundImage: `url(${knowledgeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Join the <span className="text-gradient">Movement</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We invite educators, innovators, visionaries, researchers, and dreamers 
              to join us in building a future where disruption is purposeful and education is limitless.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Vision Statement */}
            <div className="space-y-8 animate-fade-in-up">
              <Card className="p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20">
                <h3 className="text-2xl font-bold mb-4">Who We Seek</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✦</span>
                    <span><strong className="text-foreground">Educators</strong> who see teaching as transformation, not transmission</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✦</span>
                    <span><strong className="text-foreground">Researchers</strong> committed to solving planetary challenges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✦</span>
                    <span><strong className="text-foreground">Innovators</strong> who build systems, not just solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✦</span>
                    <span><strong className="text-foreground">Students</strong> who question, create, and refuse mediocrity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✦</span>
                    <span><strong className="text-foreground">Visionaries</strong> who understand that disruption is inevitable—our role is to guide it</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-secondary/20">
                <blockquote className="space-y-4">
                  <p className="text-lg italic text-muted-foreground">
                    "Disruption is inevitable. Purpose-driven disruption is our responsibility."
                  </p>
                  <p className="text-xl font-semibold text-gradient">
                    We are not here to fit into the future. We are here to build it.
                  </p>
                </blockquote>
              </Card>
            </div>

            {/* Right: Contact Form */}
            <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/30 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <h3 className="text-2xl font-bold mb-6">Get Involved</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Name
                  </label>
                  <Input
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us about yourself and how you'd like to contribute..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="bg-background/50 resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="cosmic" 
                  size="lg" 
                  className="w-full group"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
