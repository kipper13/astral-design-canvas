import React from 'react';
import { Download, Mail, Phone, MapPin, Calendar, Award, TrendingUp, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
export const Resume = () => {
  const handleDownloadPDF = () => {
    window.print();
  };
  return <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-accent text-white p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <img src="/lovable-uploads/d3f261eb-d56d-4140-9b02-ca942ef0049e.png" alt="Christian Kevin Flores" className="w-32 h-32 rounded-full border-4 border-white object-cover" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-poppins font-bold mb-2">Christian Kevin Flores</h1>
              <h2 className="text-xl font-montserrat mb-4 opacity-90">Creative Designer & UI/UX Specialist</h2>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>kevincreates13@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+63 (976) 459-4565</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Valencia City, Bukidnon, PH</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="p-6 border-b border-border text-center print:hidden">
          <Button onClick={handleDownloadPDF} className="hover-lift">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div className="p-8 space-y-8">
          {/* Professional Summary */}
          <section>
            <h3 className="text-2xl font-poppins font-bold text-foreground mb-4 border-b-2 border-primary pb-2">
              Professional Summary
            </h3>
            <p className="text-muted-foreground font-montserrat leading-relaxed">
              Passionate Creative Designer with 3+ years of experience specializing in high-converting landing pages, 
              funnel optimization, and intuitive UI/UX design. Proven track record of delivering exceptional results 
              with 98% client satisfaction rate and consistently improving conversion rates by an average of 25%. 
              Expert in combining data-driven strategies with creative excellence to drive business growth.
            </p>
          </section>

          {/* Core Competencies */}
          <section>
            <h3 className="text-2xl font-poppins font-bold text-foreground mb-4 border-b-2 border-primary pb-2">
              Core Competencies
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-poppins font-semibold text-foreground mb-3">Design Skills</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-montserrat">UI/UX Design</span>
                    <span className="text-primary font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{
                    width: '95%'
                  }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-montserrat">Funnel Design</span>
                    <span className="text-primary font-semibold">90%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{
                    width: '90%'
                  }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-montserrat">HTML/CSS</span>
                    <span className="text-primary font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{
                    width: '85%'
                  }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-montserrat">JavaScript</span>
                    <span className="text-primary font-semibold">75%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{
                    width: '75%'
                  }}></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-poppins font-semibold text-foreground mb-3">Tools & Technologies</h4>
                <div className="grid grid-cols-2 gap-2">
                  {["Figma", "Adobe XD", "Sketch", "Webflow", "React", "Analytics", "Photoshop", "Illustrator"].map(tool => <div key={tool} className="bg-muted rounded-lg p-2 text-center">
                      <span className="font-montserrat text-sm">{tool}</span>
                    </div>)}
                </div>
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section>
            <h3 className="text-2xl font-poppins font-bold text-foreground mb-4 border-b-2 border-primary pb-2">
              Professional Experience
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h4 className="text-xl font-poppins font-semibold text-foreground">Senior Creative Designer</h4>
                  <span className="text-muted-foreground font-montserrat flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    2021 - Present
                  </span>
                </div>
                <p className="text-primary font-montserrat font-medium mb-3">Freelance Designer</p>
                <ul className="space-y-2 text-muted-foreground font-montserrat">
                  <li>• Designed and delivered 50+ high-converting landing pages and funnels</li>
                  <li>• Achieved 98% client satisfaction rate with consistent 24-hour response time</li>
                  <li>• Improved client conversion rates by an average of 25% through strategic design optimization</li>
                  <li>• Specialized in e-commerce, SaaS, and mobile app UI/UX design solutions</li>
                  <li>• Collaborated with cross-functional teams to deliver pixel-perfect designs</li>
                </ul>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h4 className="text-xl font-poppins font-semibold text-foreground">Junior UI/UX Designer</h4>
                  <span className="text-muted-foreground font-montserrat flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    2019 - 2021
                  </span>
                </div>
                <p className="text-primary font-montserrat font-medium mb-3">Digital Agency</p>
                <ul className="space-y-2 text-muted-foreground font-montserrat">
                  <li>• Created user-centered designs for web and mobile applications</li>
                  <li>• Conducted user research and usability testing to inform design decisions</li>
                  <li>• Collaborated with development teams to ensure design implementation accuracy</li>
                  <li>• Developed wireframes, prototypes, and high-fidelity mockups</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Achievements */}
          <section>
            <h3 className="text-2xl font-poppins font-bold text-foreground mb-4 border-b-2 border-primary pb-2">
              Key Achievements
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-foreground">30+ Projects</p>
                    <p className="text-sm text-muted-foreground font-montserrat">Successfully Completed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-foreground">25% Average</p>
                    <p className="text-sm text-muted-foreground font-montserrat">Conversion Boost</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-foreground">87% Client</p>
                    <p className="text-sm text-muted-foreground font-montserrat">Satisfaction Rate</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-foreground">3+ Years</p>
                    <p className="text-sm text-muted-foreground font-montserrat">Professional Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Offered */}
          <section>
            <h3 className="text-2xl font-poppins font-bold text-foreground mb-4 border-b-2 border-primary pb-2">
              Services Offered
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[{
              title: "Landing Page Design",
              description: "High-converting landing pages with A/B testing and mobile-first approach"
            }, {
              title: "Funnel Optimization",
              description: "Strategic funnel design with analytics integration and CRO strategy"
            }, {
              title: "UI/UX Design",
              description: "User research, wireframing, prototyping, and usability testing"
            }, {
              title: "Branding",
              description: "Logo design, brand guidelines, visual identity, and brand strategy"
            }].map((service, index) => <div key={index} className="p-4 border border-border rounded-lg">
                  <h4 className="font-poppins font-semibold text-foreground mb-2">{service.title}</h4>
                  <p className="text-sm text-muted-foreground font-montserrat">{service.description}</p>
                </div>)}
            </div>
          </section>

          {/* Education & Certifications */}
          <section>
            <h3 className="text-2xl font-poppins font-bold text-foreground mb-4 border-b-2 border-primary pb-2">
              Education & Certifications
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-6">
                <h4 className="text-lg font-poppins font-semibold text-foreground">Bachelor of Science in Information Technology</h4>
                <p className="text-primary font-montserrat">ACLC COLLEGE of BUKIDNON - 2020</p>
                <p className="text-muted-foreground font-montserrat text-sm">Specialized in Web Development and User Interface Design</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {["Google UX Design Certificate", "Adobe Certified Expert (ACE)", "Figma Advanced Certification", "JavaScript ES6+ Certification"].map((cert, index) => <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="font-montserrat text-sm text-foreground">{cert}</p>
                  </div>)}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>;
};