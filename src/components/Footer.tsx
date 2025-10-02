export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gradient">The Inevitable</h3>
              <p className="text-sm text-muted-foreground">
                Reimagining education, redefining disruption—guiding humanity into a future 
                where knowledge, purpose, and consciousness drive every action.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#philosophy" className="text-muted-foreground hover:text-primary transition-colors">
                    Philosophy
                  </a>
                </li>
                <li>
                  <a href="#vision" className="text-muted-foreground hover:text-primary transition-colors">
                    Vision
                  </a>
                </li>
                <li>
                  <a href="#disruptions" className="text-muted-foreground hover:text-primary transition-colors">
                    Disruptions
                  </a>
                </li>
                <li>
                  <a href="#education" className="text-muted-foreground hover:text-primary transition-colors">
                    Education Reform
                  </a>
                </li>
                <li>
                  <a href="#join" className="text-muted-foreground hover:text-primary transition-colors">
                    Join Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Connect</h4>
              <p className="text-sm text-muted-foreground">
                Ready to be part of the disruption?
                <br />
                Reach out through the form above or find us on social media.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 The Inevitable. All rights reserved.</p>
            <p className="italic">
              <span className="text-accent">✨</span> Disruption is inevitable—purpose-driven disruption is our responsibility.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
