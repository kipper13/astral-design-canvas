import { useEffect, useRef } from "react";
import { Search, Palette, Code, Rocket } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    icon: Search,
    description: "Deep dive into your business goals, target audience, and market research to understand the foundation.",
    details: [
      "Business analysis & competitor research",
      "User persona development",
      "Goals & KPI definition",
      "Technical requirements gathering"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: "02",
    title: "Design",
    icon: Palette,
    description: "Create wireframes, prototypes, and high-fidelity designs that balance aesthetics with functionality.",
    details: [
      "Wireframing & user flow mapping",
      "Visual design & branding",
      "Interactive prototyping",
      "Design system creation"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    title: "Develop",
    icon: Code,
    description: "Transform designs into pixel-perfect, responsive, and optimized digital experiences.",
    details: [
      "Responsive development",
      "Performance optimization",
      "Cross-browser testing",
      "Analytics integration"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    number: "04",
    title: "Deliver",
    icon: Rocket,
    description: "Launch your project with ongoing support, monitoring, and optimization for maximum results.",
    details: [
      "Quality assurance testing",
      "Deployment & launch support",
      "Performance monitoring",
      "Continuous optimization"
    ],
    color: "from-orange-500 to-red-500"
  }
];

export const ProcessSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
          }
        });
      },
      { threshold: 0.2 }
    );

    const steps = document.querySelectorAll(".process-step");
    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="py-20 lg:py-32 relative overflow-hidden bg-muted/30">
      {/* Background Elements */}
      <div className="absolute top-32 right-20 w-56 h-56 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-foreground mb-6">
            My Design <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground font-montserrat max-w-3xl mx-auto">
            A proven methodology that ensures every project delivers exceptional results 
            through strategic thinking and meticulous execution.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Vertical Line - Hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform -translate-x-1/2"></div>

          <div className="space-y-12 lg:space-y-24">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className={`process-step flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {/* Content Card */}
                <div className="flex-1 max-w-lg">
                  <div className="bg-card border border-border rounded-2xl p-8 hover-lift hover-glow relative">
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-poppins font-bold text-lg shadow-lg">
                      {step.number}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <step.icon className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-3xl font-poppins font-bold text-foreground">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground font-montserrat leading-relaxed text-lg">
                        {step.description}
                      </p>

                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center text-muted-foreground font-montserrat">
                            <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full mr-3`}></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Decorative Element */}
                    <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${step.color} rounded-full opacity-10 blur-xl`}></div>
                  </div>
                </div>

                {/* Center Circle - Desktop Only */}
                <div className="hidden lg:block relative z-10">
                  <div className="w-16 h-16 bg-card border-4 border-primary rounded-full flex items-center justify-center shadow-lg hover-glow">
                    <div className={`w-6 h-6 bg-gradient-to-br ${step.color} rounded-full animate-pulse`}></div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 max-w-lg lg:block hidden"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-card border border-border rounded-2xl p-8 hover-lift max-w-2xl mx-auto">
            <h3 className="text-2xl font-poppins font-bold text-foreground mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-foreground font-montserrat mb-6">
              Let's discuss how my proven process can help bring your vision to life 
              and achieve your business goals.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-montserrat font-semibold hover:scale-105 transition-transform shadow-lg">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};