import { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import SkeletonLoader from '../components/SkeletonLoader';
import ParticleBackground from '../components/ParticleBackground';
import { MagicCard } from "../components/ui/magic-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second delay to show loading state
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    
    const serviceId = 'service_3ybzeml'; 
    const templateId = 'template_0s0b7vs';
    const publicKey = 'Jyb_YXQ2V87ZLZsMt'; 

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setIsSubmitting(false);
        setSubmitStatus('success');
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text);
        setIsSubmitting(false);
        setSubmitStatus('error');
        
        // Reset error status after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      });
  };
  
  const contactInfo = [
    {
      icon: <FiMail size={24} aria-hidden="true" />,
      title: 'Email',
      content: 'pamarthy.hemanth@gmail.com',
      link: 'mailto:pamarthy.hemanth@gmail.com',
    },
    {
      icon: <FiPhone size={24} aria-hidden="true" />,
      title: 'Phone',
      content: '+91 8688199855',
      link: 'tel:+918688199855',
    },
    {
      icon: <FiMapPin size={24} aria-hidden="true" />,
      title: 'Location',
      content: 'Nuzvid, Andhra Pradesh, India',
      link: 'https://maps.google.com/?q=Nuzvid,+Andhra+Pradesh,+India',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
      title: 'LinkedIn',
      content: 'Hemanth Srinivas Pamarthi',
      link: 'https://www.linkedin.com/in/hemanth-srinivas-pamarthi-417b5621a',
    },
  ];

  return (
    <section className="py-20 relative">
      {/* Interactive Particle Background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <ParticleBackground id="contact-particles" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 bg-black/25 p-8 rounded-xl shadow-lg backdrop-blur-sm text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-200 text-lg">
            Have a project in mind or want to discuss potential opportunities? 
            Feel free to reach out to me using the contact form below.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form Skeleton */}
            <div>
              <SkeletonLoader type="card" width="100%" height="500px" className="rounded-xl" />
            </div>
            
            {/* Contact Info Skeleton */}
            <div className="space-y-8">
              <SkeletonLoader type="card" width="100%" height="300px" className="rounded-xl" />
              <SkeletonLoader type="card" width="100%" height="180px" className="rounded-xl" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="w-full max-w-2xl border-none p-0 shadow-none">
              <MagicCard
                gradientColor={isDarkMode ? "#262626" : "#D9D9D955"}
                className="p-0"
              >
                <CardHeader className="border-border border-b p-6 [.border-b]:pb-6">
                  <CardTitle className="text-2xl font-bold">Send Me a Message</CardTitle>
                  <CardDescription>
                    Have a project in mind? Let's discuss how we can work together.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form ref={form} onSubmit={handleSubmit} aria-label="Contact form">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="Project Inquiry"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="message">Your Message</Label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="5"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                          placeholder="Hello, I'd like to discuss a project..."
                        />
                      </div>
                    </div>

                    {submitStatus === 'success' && (
                      <motion.div
                        className="mt-4 p-3 bg-green-100 text-green-700 rounded-md dark:bg-green-900 dark:text-green-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        role="alert"
                        aria-live="polite"
                      >
                        Your message has been sent successfully! I'll get back to you soon.
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        className="mt-4 p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        role="alert"
                        aria-live="assertive"
                      >
                        Failed to send your message. Please try again later.
                      </motion.div>
                    )}
                  </form>
                </CardContent>
                <CardFooter className="border-border border-t p-6 [.border-t]:pt-6">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend aria-hidden="true" /> Send Message
                      </>
                    )}
                  </Button>
                </CardFooter>
              </MagicCard>
            </Card>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-black/25 rounded-xl shadow-lg p-8 mb-8 backdrop-blur-sm text-white">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-2"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                    aria-label={`${info.title}: ${info.content}`}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{info.title}</h4>
                      <p className="text-gray-200 group-hover:text-primary transition-colors">
                        {info.content}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Availability */}
            <motion.div
              className="bg-black/25 rounded-xl shadow-lg p-8 backdrop-blur-sm text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">My Availability</h3>
              <p className="text-gray-200 mb-4">
                I'm currently available for frontend development opportunities.
                I'm passionate about creating responsive and user-friendly web applications.
              </p>
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-primary font-medium">
                  Looking forward to working with you on your next project!
                </p>
              </div>
            </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;