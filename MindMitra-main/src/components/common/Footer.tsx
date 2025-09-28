import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, Shield, FileText, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerLinks = {
    support: [
      { name: 'Help Center', href: '/help', icon: HelpCircle },
      { name: 'Crisis Resources', href: '/crisis', icon: Phone },
      { name: 'Contact Support', href: '/contact', icon: Mail },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy', icon: Shield },
      { name: 'Terms of Service', href: '/terms', icon: FileText },
      { name: 'Cookie Policy', href: '/cookies', icon: FileText },
    ],
    resources: [
      { name: 'Mental Health Guide', href: '/resources', icon: Heart },
      { name: 'Emergency Contacts', href: '/emergency', icon: Phone },
      { name: 'Campus Locations', href: '/locations', icon: MapPin },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-2">
              <motion.div
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-trust"
                whileHover={{ scale: 1.1 }}
              >
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </motion.div>
              <span className="text-xl font-bold text-gradient-primary">
                MindMitra
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Providing stigma-free mental health support for college students. 
              Your well-being is our priority.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Confidential & Secure</span>
            </div>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Emergency Notice */}
        <motion.div
          className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-destructive mt-0.5" />
            <div>
              <h4 className="font-medium text-destructive">Emergency Support</h4>
              <p className="text-sm text-muted-foreground mt-1">
                If you are in immediate danger or having thoughts of self-harm, please contact emergency services (112) 
                or call the National Crisis Text Line: Text HOME to 741741
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            © 2025 MindMitra. All rights reserved. Made with ❤️ for student well-being.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>🌱 Promoting Mental Wellness</span>
            <span>🤝 Stigma-Free Support</span>
            <span>🔒 DPDPA Compliant</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};