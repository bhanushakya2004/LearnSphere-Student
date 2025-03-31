
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Clock, Shield, Award, BookOpen, CheckCircle, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar transparent />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent -z-10" />
        <div className="container mx-auto max-w-5xl">
          <AnimatedTransition>
            <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight text-balance">
              Elevate Your Learning with <span className="text-primary">LearnSphere</span>
            </h1>
          </AnimatedTransition>
          
          <AnimatedTransition delay={100}>
            <p className="mt-6 text-xl text-muted-foreground text-center max-w-3xl mx-auto">
              A comprehensive platform for students to track progress, submit assignments, and excel in their academic journey.
            </p>
          </AnimatedTransition>
          
          <AnimatedTransition delay={200}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="px-8 rounded-full">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="px-8 rounded-full">
                  Login to Portal
                </Button>
              </Link>
            </div>
          </AnimatedTransition>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <AnimatedTransition>
            <h2 className="text-3xl font-bold text-center mb-4">Designed for Academic Success</h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-16">
              LearnSphere provides all the tools you need to track your academic journey and achieve your educational goals.
            </p>
          </AnimatedTransition>
          
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedTransition delay={100}>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow glass">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Simple Submissions</h3>
                  <p className="text-muted-foreground">Submit any assignment format easily with a few clicks</p>
                </CardContent>
              </Card>
            </AnimatedTransition>
            
            <AnimatedTransition delay={200}>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow glass">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Track Deadlines</h3>
                  <p className="text-muted-foreground">Stay on top of your assignments with deadline tracking</p>
                </CardContent>
              </Card>
            </AnimatedTransition>
            
            <AnimatedTransition delay={300}>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow glass">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure Submissions</h3>
                  <p className="text-muted-foreground">Your assignments are encrypted and securely stored</p>
                </CardContent>
              </Card>
            </AnimatedTransition>
          </div>
        </div>
      </section>
      
      {/* Features Grid Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <AnimatedTransition>
            <h2 className="text-3xl font-bold text-center mb-16">Everything You Need to Succeed</h2>
          </AnimatedTransition>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: CheckCircle, 
                title: "Track Progress", 
                description: "Monitor your grades and performance across all subjects" 
              },
              { 
                icon: Zap, 
                title: "Instant Feedback", 
                description: "Get immediate results and instructor comments" 
              },
              { 
                icon: Users, 
                title: "Collaborative Learning", 
                description: "Connect with classmates for group projects" 
              },
              { 
                icon: Award, 
                title: "Achievement System", 
                description: "Earn badges and rewards for academic milestones" 
              },
            ].map((feature, index) => (
              <AnimatedTransition key={index} delay={index * 100}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </AnimatedTransition>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <AnimatedTransition>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to transform your learning experience?</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of students who have improved their academic performance with LearnSphere
              </p>
              <Link to="/signup">
                <Button size="lg" className="px-8 py-6 rounded-full text-lg">
                  Start Your Journey Today
                </Button>
              </Link>
            </div>
          </AnimatedTransition>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">LearnSphere</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LearnSphere. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
