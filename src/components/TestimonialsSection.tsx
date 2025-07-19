import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import sarahJohnson from "@/assets/sarah-johnson.jpg";
import michaelChen from "@/assets/michael-chen.jpg";
import emilyRodriguez from "@/assets/emily-rodriguez.jpg";
import davidThompson from "@/assets/david-thompson.jpg";
import lisaPark from "@/assets/lisa-park.jpg";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechStart Inc.",
    image: sarahJohnson,
    rating: 5,
    text: "The landing page design exceeded our expectations. Our conversion rate increased by 40% within the first month. The attention to detail and user experience is outstanding.",
    project: "SaaS Landing Page"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder & CEO",
    company: "GrowthLab",
    image: michaelChen,
    rating: 5,
    text: "Working with this designer was a game-changer for our business. The funnel optimization resulted in 65% more qualified leads and significantly improved our ROI.",
    project: "Lead Generation Funnel"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "InnovateCorp",
    image: emilyRodriguez,
    rating: 5,
    text: "The mobile app interface design was intuitive and beautiful. Our user engagement increased by 55% and app store ratings improved dramatically. Highly recommended!",
    project: "Mobile App UI/UX"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "E-commerce Director",
    company: "RetailMax",
    image: davidThompson,
    rating: 5,
    text: "The e-commerce redesign was phenomenal. Clean, modern design with exceptional user flow. Sales increased by 80% in the first quarter after launch.",
    project: "E-commerce Redesign"
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Marketing Head",
    company: "StartupVenture",
    image: lisaPark,
    rating: 5,
    text: "Professional, creative, and results-driven. The brand identity and website design perfectly captured our vision and helped us stand out in a competitive market.",
    project: "Brand Identity & Website"
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoplay(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoplay(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoplay(false);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-foreground mb-6">
            Client <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground font-montserrat max-w-3xl mx-auto">
            Don't just take my word for it. Here's what my clients say about working with me 
            and the results we've achieved together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="relative bg-card border border-border rounded-3xl p-8 md:p-12 hover-lift hover-glow mb-8">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                <Quote className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-8 items-center">
              {/* Client Info */}
              <div className="md:col-span-1 text-center md:text-left">
                <div className="relative mb-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full mx-auto md:mx-0 object-cover border-4 border-primary/20"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
                
                <h4 className="text-lg font-poppins font-bold text-foreground mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-muted-foreground font-montserrat mb-1">
                  {testimonials[currentIndex].role}
                </p>
                <p className="text-sm text-primary font-montserrat font-semibold">
                  {testimonials[currentIndex].company}
                </p>

                {/* Rating */}
                <div className="flex justify-center md:justify-start gap-1 mt-3">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="md:col-span-3">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-montserrat rounded-full border border-primary/20 mb-4">
                    {testimonials[currentIndex].project}
                  </span>
                </div>
                
                <blockquote className="text-xl md:text-2xl font-montserrat text-foreground leading-relaxed mb-6">
                  "{testimonials[currentIndex].text}"
                </blockquote>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="hover-lift"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-primary scale-125" 
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="hover-lift"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Autoplay Indicator */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="text-sm text-muted-foreground font-montserrat hover:text-foreground transition-colors"
            >
              {isAutoplay ? "Pause" : "Resume"} slideshow
            </button>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "100%", label: "Client Satisfaction" },
            { number: "50+", label: "Projects Delivered" },
            { number: "40%", label: "Average Conversion Boost" },
            { number: "24h", label: "Response Time" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-card border border-border rounded-xl hover-lift"
            >
              <div className="text-3xl md:text-4xl font-poppins font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-montserrat text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};