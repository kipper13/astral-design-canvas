import { Code, Palette, TrendingUp, Zap, Wand2, Brush, Bot } from "lucide-react";

const skills = [
  {
    name: "UI/UX Design",
    level: "Advanced",
    icon: Palette,
    color: "from-cyan-400 to-blue-600",
    description: "Designing intuitive and engaging user interfaces for web and mobile applications. Specialized in responsive, user-centered dashboards and mobile-first designs."
  },
  {
    name: "Funnel Design",
    level: "Advanced",
    icon: TrendingUp,
    color: "from-emerald-400 to-teal-600",
    description: "Building conversion-focused funnels that maximize ROI. Proven record of increasing conversion rates by optimizing landing pages and sales flows."
  },
  {
    name: "HTML/CSS",
    level: "Proficient",
    icon: Code,
    color: "from-orange-400 to-red-600",
    description: "Developing clean, semantic, and scalable code with modern CSS techniques for responsive design."
  },
  {
    name: "JavaScript",
    level: "Proficient",
    icon: Zap,
    color: "from-violet-400 to-purple-600",
    description: "Creating interactive experiences and dynamic functionality using modern frameworks."
  },
  {
    name: "Motion Design",
    level: "Proficient",
    icon: Wand2,
    color: "from-pink-400 to-pink-600",
    description: "Creating engaging animations and motion graphics for web and mobile applications."
  },
  {
    name: "Branding",
    level: "Advanced",
    icon: Brush,
    color: "from-yellow-400 to-orange-600",
    description: "Developing cohesive brand identities that resonate with target audiences."
  },
  {
    name: "Automation Tools",
    level: "Proficient",
    icon: Bot,
    color: "from-green-400 to-green-600",
    description: "Implementing automation solutions to streamline workflows and improve efficiency."
  },
  {
    name: "Visual Design",
    level: "Advanced",
    icon: Palette,
    color: "from-indigo-400 to-purple-600",
    description: "Crafting visually compelling layouts, color schemes, and graphics to enhance brand identity and user engagement."
  }
];

const tools = [
  { name: "Figma", icon: "fab fa-figma", color: "text-purple-500" },
  { name: "Adobe XD", icon: "fas fa-vector-square", color: "text-pink-500" },
  { name: "Sketch", icon: "fas fa-pencil-ruler", color: "text-orange-500" },
  { name: "Webflow", icon: "fas fa-cube", color: "text-blue-500" },
  { name: "React", icon: "fab fa-react", color: "text-cyan-400" },
  { name: "Framer", icon: "fas fa-magic", color: "text-indigo-500" },
  { name: "Analytics", icon: "fas fa-chart-line", color: "text-green-500" },
  { name: "Motion Design", icon: "fas fa-wave-square", color: "text-pink-400" },
  { name: "GoHighLevel", icon: "fas fa-robot", color: "text-green-400" }
];

const strengths = [
  "Responsive Design",
  "Conversion Optimization",
  "Interactive Prototyping",
  "Data-Driven Design"
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            <span className="text-foreground">Skills&nbsp;</span>
            <span className="text-foreground font-bold" style={{color: 'transparent', backgroundImage: 'linear-gradient(90deg, #6D28D9 0%, #A78BFA 60%, #9333EA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
              Expertise
            </span>
          </h2>
          <p className="text-lg text-muted-foreground font-montserrat max-w-2xl mx-auto">
            A well-rounded skill set that combines design creativity with technical expertise.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {skills.map((skill, idx) => (
            <div
              key={skill.name}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform duration-300 group"
              style={{
                animation: `fadeInUp 0.6s cubic-bezier(.23,1.01,.32,1) ${idx * 0.1}s both`
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{boxShadow: `0 0 32px 8px rgba(56,189,248,0.25)`}}></div>
              <div className="mb-4 text-4xl relative z-10">
                <skill.icon className="text-white" />
              </div>
              <div className="mb-2 flex justify-center relative z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${skill.level === 'Advanced' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>{skill.level}</span>
              </div>
              <div className="font-poppins font-bold text-xl mb-1 text-foreground relative z-10">{skill.name}</div>
              <div className="text-muted-foreground font-montserrat mb-3 relative z-10">{skill.description}</div>
              {/* Animated progress bar */}
              <div className="w-full mt-2 relative z-10">
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: skill.level === 'Advanced' ? '90%' : '70%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Tools & Platforms */}
        <div className="mb-8">
          <h3 className="text-lg font-poppins font-bold text-foreground mb-4 text-center">Tools & Platforms</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {tools.map(tool => (
              <div key={tool.name} className="flex flex-col items-center justify-center mx-3 my-2" aria-label={tool.name}>
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-card grayscale hover:grayscale-0 hover:shadow-[0_0_16px_4px_rgba(56,189,248,0.4)] transition-all duration-300 text-3xl">
                  <i className={tool.icon}></i>
                </div>
                <span className="mt-2 text-xs text-foreground font-montserrat font-medium text-center px-2">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Strengths */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {strengths.map(strength => (
            <span key={strength} className="px-4 py-2 bg-primary/10 text-primary text-sm font-montserrat rounded-full border border-primary/20">
              {strength}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};