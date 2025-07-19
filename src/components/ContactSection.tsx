import { useState } from "react";
import { Send, Mail, Phone, MapPin, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    toast
  } = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. I'll get back to you within 24 hours."
    });

    // Reset form after animation
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitted(false);
    }, 3000);
  };
  const socialLinks = [{
    icon: "fab fa-dribbble",
    label: "Dribbble",
    href: "#",
    color: "hover:text-pink-500"
  }, {
    icon: "fab fa-behance",
    label: "Behance",
    href: "#",
    color: "hover:text-blue-600"
  }, {
    icon: "fab fa-instagram",
    label: "Instagram",
    href: "#",
    color: "hover:text-pink-600"
  }, {
    icon: "fab fa-linkedin",
    label: "LinkedIn",
    href: "#",
    color: "hover:text-blue-700"
  }, {
    icon: "fab fa-twitter",
    label: "Twitter",
    href: "#",
    color: "hover:text-blue-500"
  }, {
    icon: "fab fa-github",
    label: "GitHub",
    href: "#",
    color: "hover:text-gray-800"
  }];
  return <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-32 right-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-foreground mb-6">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-xl text-muted-foreground font-montserrat max-w-3xl mx-auto">
            Ready to transform your digital presence? Let's discuss your project and create 
            something amazing together.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-3xl p-8 hover-lift hover-glow relative overflow-hidden">
            {/* Success Animation Overlay */}
            {isSubmitted && <div className="absolute inset-0 bg-card flex items-center justify-center z-10 animate-slide-up">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-poppins font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground font-montserrat">
                    Thanks for reaching out. I'll get back to you soon!
                  </p>
                </div>
              </div>}

            <div className="mb-8">
              <h3 className="text-2xl font-poppins font-bold text-foreground mb-2">
                Send Me a Message
              </h3>
              <p className="text-muted-foreground font-montserrat">
                Tell me about your project and let's make it happen.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required className="h-12 border-2 focus:border-primary transition-colors" />
                </div>
                <div>
                  <Input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} required className="h-12 border-2 focus:border-primary transition-colors" />
                </div>
              </div>

              <div>
                <Input name="subject" placeholder="Subject" value={formData.subject} onChange={handleInputChange} required className="h-12 border-2 focus:border-primary transition-colors" />
              </div>

              <div>
                <Textarea name="message" placeholder="Tell me about your project..." value={formData.message} onChange={handleInputChange} required rows={6} className="border-2 focus:border-primary transition-colors resize-none" />
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full hover-lift font-montserrat font-semibold h-12">
                {isSubmitting ? <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </> : <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-card border border-border rounded-3xl p-8 hover-lift hover-glow">
              <h3 className="text-2xl font-poppins font-bold text-foreground mb-6">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-montserrat">Email</p>
                    <p className="text-foreground font-montserrat font-semibold">kevincreates13@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-montserrat">Phone</p>
                    <p className="text-foreground font-montserrat font-semibold">+63 (976) 459-4565</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-montserrat">Location</p>
                    <p className="text-foreground font-montserrat font-semibold">Valencia City, Bukidnon, PH</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Resume */}
            <div className="bg-card border border-border rounded-3xl p-8 hover-lift hover-glow text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-foreground mb-2">
                Download Resume
              </h3>
              <p className="text-muted-foreground font-montserrat mb-6">
                Get a detailed overview of my experience and skills.
              </p>
              <Button variant="outline" className="hover-lift font-montserrat font-semibold">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>

            {/* Social Links */}
            <div className="bg-card border border-border rounded-3xl p-8 hover-lift hover-glow">
              <h3 className="text-xl font-poppins font-bold text-foreground mb-6 text-center">
                Follow Me
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map(social => <a key={social.label} href={social.href} className={`w-full h-12 bg-muted border border-border rounded-xl flex items-center justify-center hover-lift transition-all group ${social.color}`}>
                    <i className={`${social.icon} text-xl text-muted-foreground group-hover:scale-110 transition-transform`}></i>
                  </a>)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground font-montserrat mb-4">
            © 2024 Creative Designer Portfolio. Crafted with passion and precision.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-montserrat">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-montserrat">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-montserrat">Sitemap</a>
          </div>
        </div>
      </div>
    </section>;
};