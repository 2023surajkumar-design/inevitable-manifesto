import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, User, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const CallToActionPro = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual Supabase integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Thank you for your interest! We'll be in touch soon.", {
        description: "Your message has been received.",
        duration: 5000,
      });
      
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        description: "We couldn't submit your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const seekerTypes = [
    {
      title: "Educators",
      description: "Who see teaching as transformation, not transmission"
    },
    {
      title: "Researchers",
      description: "Committed to solving planetary challenges"
    },
    {
      title: "Innovators",
      description: "Who build systems, not just solutions"
    },
    {
      title: "Students",
      description: "Who question, create, and refuse mediocrity"
    },
    {
      title: "Visionaries",
      description: "Who understand that disruption is inevitable—our role is to guide it"
    },
  ];

  return (
    <section id="join" className="py-32 md:py-40 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-muted/30 to-background" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[180px]" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="px-6 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm">
                <span className="text-sm font-medium tracking-wider uppercase text-accent">Join the Movement</span>
              </div>
            </motion.div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 font-display tracking-tight">
              Build the{" "}
              <span className="text-gradient cosmic-glow-strong block mt-2">
                Inevitable Future
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              We invite educators, innovators, visionaries, researchers, and dreamers 
              to join us in building a future where disruption is purposeful and education is limitless.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Who We Seek */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <Card className="p-8 lg:p-10 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 backdrop-blur-2xl shadow-2xl">
                <h3 className="text-3xl font-bold mb-8 font-display">Who We Seek</h3>
                <ul className="space-y-5">
                  {seekerTypes.map((seeker, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                      <div>
                        <strong className="text-foreground text-lg font-semibold block mb-1">
                          {seeker.title}
                        </strong>
                        <span className="text-muted-foreground">
                          {seeker.description}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-2xl border-2 border-secondary/20 shadow-xl">
                <blockquote className="space-y-5">
                  <p className="text-lg lg:text-xl italic text-muted-foreground leading-relaxed">
                    "Disruption is inevitable. Purpose-driven disruption is our responsibility."
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-gradient font-display">
                    We are not here to fit into the future. We are here to build it.
                  </p>
                </blockquote>
              </Card>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="p-8 lg:p-10 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-2xl border-2 border-primary/30 shadow-2xl">
                <h3 className="text-3xl font-bold mb-8 font-display">Get Involved</h3>
                
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h4 className="text-2xl font-bold mb-3">Thank You!</h4>
                    <p className="text-muted-foreground">We'll be in touch soon.</p>
                  </motion.div>
                ) : (
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
                        className="bg-background/50 border-white/10 focus:border-primary/50 h-12 text-base"
                        disabled={isSubmitting}
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
                        className="bg-background/50 border-white/10 focus:border-primary/50 h-12 text-base"
                        disabled={isSubmitting}
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
                        className="bg-background/50 border-white/10 focus:border-primary/50 resize-none text-base"
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="cosmic" 
                      size="lg" 
                      className="w-full group h-14 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
