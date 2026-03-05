  /**
   * @license
   * SPDX-License-Identifier: Apache-2.0
   */

  import React, { useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'motion/react';
  import { 
    Menu, 
    X, 
    MapPin, 
    Phone, 
    Mail, 
    ShieldCheck,
    Linkedin,
    Twitter,
    Instagram,
    ArrowRight,
    Award,
    Truck,
    ChevronRight,
    Globe
  } from 'lucide-react';
  import { Link as ScrollLink } from 'react-scroll';
  import { cn } from './lib/utils';

  
  import logofinl from './assets/logofinal.png'

  // --- Components ---


    
  const Logo = ({ className, light = false }: { className?: string, light?: boolean }) => {
    return (
      <div className={className}>
        <img
          src={logofinl}
          alt="Orbis Overseas Logo"
          className="w-full h-auto object-contain"
        />
      </div>
    );
  };


  const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
      { name: 'Home', to: 'home' },
      { name: 'About', to: 'about' },
      { name: 'Products', to: 'products' },
      { name: 'Why Us', to: 'why-us' },
      { name: 'Contact', to: 'contact' },
    ];

    return (
      <header className="fixed top-0 left-0 w-full z-50">
        <nav className={cn(
          "transition-all duration-500 px-8 py-6",
          isScrolled ? "bg-white/95 backdrop-blur-md border-b border-brand-light-grey py-4" : "bg-transparent"
        )}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Logo className="w-44" />

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={1000}
                  offset={-80}
                  className="nav-link"
                >
                  {link.name}
                </ScrollLink>
              ))}
              <div className="h-4 w-[1px] bg-brand-light-grey mx-2" />
              <div className="flex items-center gap-2 text-brand-dark">
                <Phone className="w-4 h-4 text-brand-gold" />
                <span className="text-[12px] font-bold tracking-widest">+91 7276864194</span>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden text-brand-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 w-full bg-white border-b border-brand-light-grey p-8 flex flex-col gap-6 shadow-xl"
              >
                {navLinks.map((link) => (
                  <ScrollLink
                    key={link.name}
                    to={link.to}
                    smooth={true}
                    duration={800}
                    offset={-80}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link text-sm"
                  >
                    {link.name}
                  </ScrollLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    );
  };

  const Hero = () => {
    return (
      <section id="home" className="relative h-screen w-full flex items-center bg-brand-light-grey overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=2070" 
            alt="Premium Rice Grains" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-white" />
        </div>

        <div className="relative z-10 px-8 lg:px-24 w-full max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <span className="text-subheading">Exporters of Distinction</span>
            <h1 className="text-heading mb-8">
              The Finest Indian <br />
              <span className="italic text-brand-gold">Rice Collections</span>
            </h1>
            <p className="text-brand-grey text-lg max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Orbis Overseas represents the pinnacle of agricultural export. We source, refine, and deliver the most exceptional rice varieties to global markets with absolute integrity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <ScrollLink 
                to="products" 
                smooth={true} 
                className="btn-minimal-gold cursor-pointer"
              >
                View Collections
              </ScrollLink>
              <ScrollLink 
                to="contact" 
                smooth={true} 
                className="btn-minimal cursor-pointer"
              >
                Contact Concierge
              </ScrollLink>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  const AboutSection = () => {
    return (
      <section id="about" className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=2070" 
                alt="Premium Rice Plantation" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-brand-light-grey p-12 hidden xl:block border border-brand-gold/20">
              <p className="text-5xl font-serif italic text-brand-dark mb-1">15+</p>
              <p className="text-[9px] uppercase tracking-widest font-bold text-brand-gold">Years of Heritage</p>
            </div>
          </div>

          <div>
            <span className="text-subheading">Our Heritage</span>
            <h2 className="text-heading mb-8">
              A Legacy of <br /><span className="italic text-brand-gold">Uncompromising Quality.</span>
            </h2>
            <div className="space-y-6 text-brand-grey text-lg leading-relaxed font-light">
              <p>
                Orbis Overseas was established with a singular vision: to bring the authentic taste of premium Indian rice to the world. Our journey began in the fertile plains of India, where we forged lasting partnerships with traditional mills.
              </p>
              <p>
                Today, we are recognized as a premier export house, known for our rigorous quality standards and our commitment to delivering only the finest grains to our international clientele.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              {[
                { icon: ShieldCheck, text: "SGS Certified" },
                { icon: Globe, text: "Global Reach" },
                { icon: Truck, text: "Bespoke Logistics" },
                { icon: Award, text: "Industry Leader" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-light-grey flex items-center justify-center text-brand-gold">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-dark">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const ProductCard = ({ title, description, image }: any) => (
    <div className="bg-brand-light-grey/50 border border-brand-light-grey rounded-sm overflow-hidden flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
      <div className="w-full md:w-1/2 space-y-6">
        <h3 className="text-4xl font-bold text-brand-dark">{title}</h3>
        <p className="text-brand-grey text-base leading-relaxed font-light">
          {description}
        </p>
        <ScrollLink 
          to="contact" 
          smooth={true} 
          className="inline-block bg-[#3b5998] hover:bg-[#2d4373] text-white px-10 py-4 rounded-full text-sm font-medium transition-all cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Enquire Now
        </ScrollLink>
      </div>
      <div className="w-full md:w-1/2 aspect-video md:aspect-square overflow-hidden rounded-sm border-4 border-brand-dark/10">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );

  const ProductsSection = () => {
    const products = [
      {
        title: "Rice",
        description: "Our rice range includes both premium Basmati Rice and quality-tested Non-Basmati Rice varieties. Known for their superior grain structure, pleasant aroma, and excellent cooking properties, our rice products are processed in hygienic facilities and packed to preserve freshness. With reliable sourcing and strict quality control, we deliver rice that meets international standards and satisfies diverse global market requirements.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=2070"
      }
    ];

    return (
      <section id="products" className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {products.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  const WhyUsSection = () => {
    return (
      <section id="why-us" className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-subheading">Excellence</span>
              <h2 className="text-heading mb-8">Why Partners <br /><span className="italic text-brand-gold">Choose Orbis.</span></h2>
              <p className="text-brand-grey text-lg mb-12 font-light leading-relaxed">
                We provide a seamless bridge for global trade, combining traditional sourcing with modern supply chain management.
              </p>
              
              <div className="space-y-10">
                {[
                  { title: "Direct Sourcing", desc: "We work directly with established mills to ensure competitive pricing and quality control." },
                  { title: "Quality Assurance", desc: "Every shipment undergoes rigorous testing to meet international food safety standards." },
                  { title: "Global Network", desc: "Strategic logistics partnerships ensuring timely delivery to any port worldwide." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 border border-brand-gold/30 flex items-center justify-center font-serif italic text-brand-gold">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-serif italic mb-2">{item.title}</h4>
                      <p className="text-brand-grey text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" className="rounded-sm aspect-[3/4] object-cover" alt="Lush Rice Fields" />
              <img src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=1000" className="rounded-sm aspect-square object-cover mt-12" alt="Global Logistics" />
            </div>
          </div>
        </div>
      </section>
    );
  };

  const ContactSection = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('submitting');
      try {
        const response = await fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          setTimeout(() => setStatus('idle'), 5000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };

    return (
      <section id="contact" className="py-32 px-8 bg-brand-light-grey">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-subheading">Concierge</span>
            <h2 className="text-heading mb-8">Global Trade <br /><span className="italic text-brand-gold">Inquiries.</span></h2>
            <p className="text-brand-grey text-lg mb-12 font-light">
              Our trade desk is available to discuss bulk requirements and strategic partnerships.
            </p>
            
            <div className="space-y-8">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=123+Trade+Center+BKC+Mumbai+India" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-white border border-brand-light-grey flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-brand-grey mb-1">Global HQ</p>
                  <p className="text-lg font-serif italic">123 Trade Center, BKC, Mumbai, India</p>
                </div>
              </a>
              <a 
                href="tel:+917276864194" 
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-white border border-brand-light-grey flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-brand-grey mb-1">Direct Line</p>
                  <p className="text-lg font-serif italic">+91 7276864194</p>
                </div>
              </a>
              <a 
                href="mailto:orbisoverseas00@gmail.com" 
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-white border border-brand-light-grey flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-brand-grey mb-1">Email Desk</p>
                  <p className="text-lg font-serif italic">orbisoverseas00@gmail.com</p>
                </div>
              </a>
              <a 
                href="https://wa.me/917276864194" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-white border border-brand-light-grey flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-brand-grey mb-1">WhatsApp Business</p>
                  <p className="text-lg font-serif italic">+91 7276864194</p>
                </div>
              </a>
            </div>
          </div>
          
          <div className="bg-white p-12 border border-brand-light-grey">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-brand-grey">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-b border-brand-light-grey py-3 focus:outline-none focus:border-brand-gold transition-all font-light" 
                    placeholder="Alexander Pierce" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-brand-grey">Business Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-b border-brand-light-grey py-3 focus:outline-none focus:border-brand-gold transition-all font-light" 
                    placeholder="alex@globaltrade.com" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest font-bold text-brand-grey">Subject</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border-b border-brand-light-grey py-3 focus:outline-none focus:border-brand-gold transition-all font-light" 
                  placeholder="Bulk Inquiry" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest font-bold text-brand-grey">Message</label>
                <textarea 
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border-b border-brand-light-grey py-3 focus:outline-none focus:border-brand-gold transition-all font-light resize-none" 
                  placeholder="Detail your requirements..."
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className={cn(
                  "w-full btn-minimal-gold py-5 transition-all",
                  status === 'submitting' && "opacity-50 cursor-not-allowed"
                )}
              >
                {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Inquiry Sent!' : 'Send Inquiry'}
              </button>
              {status === 'error' && (
                <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </section>
    );
  };

  const Footer = () => {
    return (
      <footer className="bg-brand-light-grey py-24 px-8 border-t border-brand-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <Logo className="w-48 mb-8 !items-start" light={false} />
              <p className="text-brand-grey text-sm leading-relaxed font-light italic max-w-xs">
                "A global legacy of agricultural excellence, delivering the finest Indian grains to the world's most discerning markets."
              </p>
            </div>
            
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-brand-dark mb-8 border-b border-brand-gold/20 pb-2 inline-block">Navigation</h4>
              <ul className="space-y-4 text-sm text-brand-grey font-light">
                <li><ScrollLink to="home" smooth={true} className="hover:text-brand-gold cursor-pointer transition-all duration-300 flex items-center gap-2 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> Home</ScrollLink></li>
                <li><ScrollLink to="about" smooth={true} className="hover:text-brand-gold cursor-pointer transition-all duration-300 flex items-center gap-2 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> Our Heritage</ScrollLink></li>
                <li><ScrollLink to="products" smooth={true} className="hover:text-brand-gold cursor-pointer transition-all duration-300 flex items-center gap-2 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> Collections</ScrollLink></li>
                <li><ScrollLink to="why-us" smooth={true} className="hover:text-brand-gold cursor-pointer transition-all duration-300 flex items-center gap-2 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> Why Orbis</ScrollLink></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-brand-dark mb-8 border-b border-brand-gold/20 pb-2 inline-block">Contact Desk</h4>
              <ul className="space-y-6 text-sm text-brand-grey font-light">
                <li>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=123+Trade+Center+BKC+Mumbai+India" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 hover:text-brand-gold transition-colors group"
                  >
                    <MapPin className="w-4 h-4 text-brand-gold mt-1 flex-shrink-0" />
                    <span className="text-brand-dark group-hover:text-brand-gold transition-colors">123 Trade Center, BKC,<br />Mumbai, MH 400051, India</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+917276864194" 
                    className="flex items-center gap-4 hover:text-brand-gold transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <span className="text-brand-dark group-hover:text-brand-gold transition-colors">+91 7276864194</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:orbisoverseas00@gmail.com" 
                    className="flex items-center gap-4 hover:text-brand-gold transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <span className="text-brand-dark group-hover:text-brand-gold transition-colors">orbisoverseas00@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-brand-dark mb-8 border-b border-brand-gold/20 pb-2 inline-block">Connect</h4>
              <p className="text-brand-grey text-xs mb-8 font-light leading-relaxed">
                Follow our global trade updates and industry insights.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/orbis-overseas-8b97653b4" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-grey hover:text-brand-gold hover:border-brand-gold transition-all duration-500"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.instagram.com/orbisoverseas00?igsh=MWt4N2NldW5weWV5MQ==" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-grey hover:text-brand-gold hover:border-brand-gold transition-all duration-500"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-brand-gold/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark/40">© 2026 Orbis Overseas Private Limited.</p>
              <p className="text-[9px] uppercase tracking-[0.2em] font-medium text-brand-gold/60">Exporters of Distinction since 2011</p>
            </div>
            <div className="flex gap-12 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-dark/40">
              <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-gold transition-colors">Terms of Trade</a>
              <a href="#" className="hover:text-brand-gold transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  

  // --- Main App ---

  export default function App() {
    const [showAdmin, setShowAdmin] = useState(false);

    return (
      <div className="min-h-screen selection:bg-brand-gold selection:text-white">
        <Navbar />
        
        <main>
        
              <Hero />
              <AboutSection />
              <ProductsSection />
              <WhyUsSection />
              <ContactSection />
           
        </main>
        
       

        <Footer />
      </div>
    );
  }
