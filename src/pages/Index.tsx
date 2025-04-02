
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Upload, Clock, Shield, Award, BookOpen, CheckCircle, Zap, Users } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import Navbar from '@/components/Navbar';
// import AnimatedTransition from '@/components/AnimatedTransition';

// const Index = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar transparent />
      
//       {/* Hero Section */}
//       <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4">
//         <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent -z-10" />
//         <div className="container mx-auto max-w-5xl">
//           <AnimatedTransition>
//             <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight text-balance">
//               Elevate Your Learning with <span className="text-primary">LearnSphere</span>
//             </h1>
//           </AnimatedTransition>
          
//           <AnimatedTransition delay={100}>
//             <p className="mt-6 text-xl text-muted-foreground text-center max-w-3xl mx-auto">
//               A comprehensive platform for students to track progress, submit assignments, and excel in their academic journey.
//             </p>
//           </AnimatedTransition>
          
//           <AnimatedTransition delay={200}>
//             <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
//               <Link to="/signup">
//                 <Button size="lg" className="px-8 rounded-full">
//                   Get Started <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </Link>
//               <Link to="/login">
//                 <Button variant="outline" size="lg" className="px-8 rounded-full">
//                   Login to Portal
//                 </Button>
//               </Link>
//             </div>
//           </AnimatedTransition>
//         </div>
//       </section>
      
//       {/* Features Section */}
//       <section className="py-20 px-4 bg-white">
//         <div className="container mx-auto max-w-6xl">
//           <AnimatedTransition>
//             <h2 className="text-3xl font-bold text-center mb-4">Designed for Academic Success</h2>
//             <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-16">
//               LearnSphere provides all the tools you need to track your academic journey and achieve your educational goals.
//             </p>
//           </AnimatedTransition>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             <AnimatedTransition delay={100}>
//               <Card className="border-none shadow-md hover:shadow-lg transition-shadow glass">
//                 <CardContent className="p-6 flex flex-col items-center text-center">
//                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
//                     <Upload className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">Simple Submissions</h3>
//                   <p className="text-muted-foreground">Submit any assignment format easily with a few clicks</p>
//                 </CardContent>
//               </Card>
//             </AnimatedTransition>
            
//             <AnimatedTransition delay={200}>
//               <Card className="border-none shadow-md hover:shadow-lg transition-shadow glass">
//                 <CardContent className="p-6 flex flex-col items-center text-center">
//                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
//                     <Clock className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">Track Deadlines</h3>
//                   <p className="text-muted-foreground">Stay on top of your assignments with deadline tracking</p>
//                 </CardContent>
//               </Card>
//             </AnimatedTransition>
            
//             <AnimatedTransition delay={300}>
//               <Card className="border-none shadow-md hover:shadow-lg transition-shadow glass">
//                 <CardContent className="p-6 flex flex-col items-center text-center">
//                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
//                     <Shield className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">Secure Submissions</h3>
//                   <p className="text-muted-foreground">Your assignments are encrypted and securely stored</p>
//                 </CardContent>
//               </Card>
//             </AnimatedTransition>
//           </div>
//         </div>
//       </section>
      
//       {/* Features Grid Section */}
//       <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
//         <div className="container mx-auto max-w-6xl">
//           <AnimatedTransition>
//             <h2 className="text-3xl font-bold text-center mb-16">Everything You Need to Succeed</h2>
//           </AnimatedTransition>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               { 
//                 icon: CheckCircle, 
//                 title: "Track Progress", 
//                 description: "Monitor your grades and performance across all subjects" 
//               },
//               { 
//                 icon: Zap, 
//                 title: "Instant Feedback", 
//                 description: "Get immediate results and instructor comments" 
//               },
//               { 
//                 icon: Users, 
//                 title: "Collaborative Learning", 
//                 description: "Connect with classmates for group projects" 
//               },
//               { 
//                 icon: Award, 
//                 title: "Achievement System", 
//                 description: "Earn badges and rewards for academic milestones" 
//               },
//             ].map((feature, index) => (
//               <AnimatedTransition key={index} delay={index * 100}>
//                 <div className="flex flex-col items-center text-center">
//                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
//                     <feature.icon className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                   <p className="text-muted-foreground">{feature.description}</p>
//                 </div>
//               </AnimatedTransition>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* Call to Action */}
//       <section className="py-20 px-4 bg-white">
//         <div className="container mx-auto max-w-4xl">
//           <AnimatedTransition>
//             <div className="text-center">
//               <h2 className="text-3xl font-bold mb-6">Ready to transform your learning experience?</h2>
//               <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
//                 Join thousands of students who have improved their academic performance with LearnSphere
//               </p>
//               <Link to="/signup">
//                 <Button size="lg" className="px-8 py-6 rounded-full text-lg">
//                   Start Your Journey Today
//                 </Button>
//               </Link>
//             </div>
//           </AnimatedTransition>
//         </div>
//       </section>
      
//       {/* Footer */}
//       <footer className="py-10 px-4 border-t">
//         <div className="container mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center gap-2 mb-4 md:mb-0">
//               <BookOpen className="h-5 w-5 text-primary" />
//               <span className="text-lg font-semibold">LearnSphere</span>
//             </div>
//             <p className="text-sm text-muted-foreground">
//               © {new Date().getFullYear()} LearnSphere. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Clock, Shield, Award, BookOpen, CheckCircle, Zap, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar transparent />
      
      {/* Hero Section with Enhanced Design */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/70 to-white -z-10" />
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/80 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <AnimatedTransition>
            <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tight text-balance leading-tight">
              Elevate Your Learning with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">LearnSphere</span>
            </h1>
          </AnimatedTransition>
          
          <AnimatedTransition delay={100}>
            <p className="mt-8 text-xl md:text-2xl text-slate-600 text-center max-w-3xl mx-auto font-light">
              A comprehensive platform for students to track progress, submit assignments, and excel in their academic journey.
            </p>
          </AnimatedTransition>
          
          <AnimatedTransition delay={200}>
            <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/signup">
                <Button size="lg" className="px-8 py-6 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-blue-600 hover:scale-105">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="px-8 py-6 rounded-full text-base font-medium border-2 hover:bg-slate-50 transition-all duration-300 hover:scale-105">
                  Login to Portal <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition delay={300}>
            <div className="mt-16 flex justify-center">
              <div className="relative w-full max-w-4xl h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center">
{/*                   <img 
                    src="/api/placeholder/800/600" 
                    alt="LearnSphere Dashboard Preview" 
                    className="object-cover opacity-70 mix-blend-overlay" 
                  /> */}

                      <img 
  src="https://c4.wallpaperflare.com/wallpaper/746/107/625/classroom-building-realistic-arsenixc-wallpaper-preview.jpg" 
  alt="LearnSphere Dashboard Preview" 
  className="object-cover opacity-70 mix-blend-overlay" 
/>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <BookOpen className="h-16 w-16 text-white opacity-90 mb-4" />
                    <p className="text-white text-xl font-medium">Powerful Learning Dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedTransition>
        </div>
      </section>
      
      {/* Enhanced Features Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="container mx-auto max-w-6xl">
          <AnimatedTransition>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Designed for Academic Success</h2>
            <p className="text-center text-slate-600 max-w-3xl mx-auto mb-20 text-lg">
              LearnSphere provides all the tools you need to track your academic journey and achieve your educational goals.
            </p>
          </AnimatedTransition>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <AnimatedTransition delay={100}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
                <div className="h-1 w-full bg-primary/80 group-hover:bg-primary transition-colors" />
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Upload className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Simple Submissions</h3>
                  <p className="text-slate-600">Submit any assignment format easily with our intuitive drag-and-drop interface</p>
                </CardContent>
              </Card>
            </AnimatedTransition>
            
            <AnimatedTransition delay={200}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
                <div className="h-1 w-full bg-blue-500/80 group-hover:bg-blue-500 transition-colors" />
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                    <Clock className="h-7 w-7 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Track Deadlines</h3>
                  <p className="text-slate-600">Stay on top of your assignments with intelligent deadline tracking and reminders</p>
                </CardContent>
              </Card>
            </AnimatedTransition>
            
            <AnimatedTransition delay={300}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
                <div className="h-1 w-full bg-indigo-500/80 group-hover:bg-indigo-500 transition-colors" />
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                    <Shield className="h-7 w-7 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Secure Submissions</h3>
                  <p className="text-slate-600">Your assignments are encrypted and securely stored with enterprise-grade protection</p>
                </CardContent>
              </Card>
            </AnimatedTransition>
          </div>
        </div>
      </section>
      
      {/* Enhanced Features Grid Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-slate-50 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="container mx-auto max-w-6xl">
          <AnimatedTransition>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">Everything You Need to Succeed</h2>
          </AnimatedTransition>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { 
                icon: CheckCircle, 
                title: "Track Progress", 
                description: "Monitor your grades and performance across all subjects with interactive charts",
                color: "text-green-500",
                bgColor: "bg-green-500/10",
                hoverBgColor: "group-hover:bg-green-500/20"
              },
              { 
                icon: Zap, 
                title: "Instant Feedback", 
                description: "Get immediate results and detailed instructor comments on your submissions",
                color: "text-amber-500",
                bgColor: "bg-amber-500/10",
                hoverBgColor: "group-hover:bg-amber-500/20"
              },
              { 
                icon: Users, 
                title: "Collaborative Learning", 
                description: "Connect with classmates for group projects and shared study resources",
                color: "text-purple-500",
                bgColor: "bg-purple-500/10",
                hoverBgColor: "group-hover:bg-purple-500/20"
              },
              
            ].map((feature, index) => (
              <AnimatedTransition key={index} delay={index * 100}>
                <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group hover:translate-y-1">
                  <div className={`w-14 h-14 rounded-full ${feature.bgColor} ${feature.hoverBgColor} flex items-center justify-center mb-5 transition-colors`}>
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </AnimatedTransition>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Testimonials Section (New) */}
      <section className="py-24 px-4 bg-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="container mx-auto max-w-6xl">
          <AnimatedTransition>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Trusted by Students</h2>
          </AnimatedTransition>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "LearnSphere has completely transformed how I organize my coursework. The deadline tracking alone saved me from missing several important assignments.",
                name: "Atul Sharma",
                role: "Cloud Computing"
              },
              {
                quote: "As a teaching assistant, I've seen a significant improvement in submission quality since my students started using LearnSphere. The platform is intuitive and powerful.",
                name: "Jhil Jain",
                role: "CA Article"
              },
              {
                quote: "The progress tracking features help me identify which subjects need more attention. My GPA has improved by 0.5 points since I started using LearnSphere!",
                name: "Arpit Sharma",
                role: "Engineering Student"
              }
            ].map((testimonial, index) => (
              <AnimatedTransition key={index} delay={index * 100}>
                <Card className="border-none shadow-lg rounded-xl overflow-hidden h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-6">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-amber-400 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-slate-600 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedTransition>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Call to Action */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/10 to-blue-500/10 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5 mix-blend-overlay" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <AnimatedTransition>
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to transform your learning experience?</h2>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                Join thousands of students who have improved their academic performance with LearnSphere
              </p>
              <Link to="/signup">
                <Button size="lg" className="px-10 py-7 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-primary to-blue-600 hover:scale-105">
                  Start Your Journey Today <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </AnimatedTransition>
        </div>
      </section>
      
      {/* Enhanced Footer */}
      <footer className="py-16 px-4 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">LearnSphere</span>
              </div>
              <p className="text-slate-500 text-sm">
                Empowering students to achieve academic excellence through innovative technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-slate-500 hover:text-primary text-sm">Features</Link></li>
                <li><Link to="/pricing" className="text-slate-500 hover:text-primary text-sm">Pricing</Link></li>
                <li><Link to="/testimonials" className="text-slate-500 hover:text-primary text-sm">Testimonials</Link></li>
                <li><Link to="/faq" className="text-slate-500 hover:text-primary text-sm">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-slate-500 hover:text-primary text-sm">About Us</Link></li>
                <li><Link to="/careers" className="text-slate-500 hover:text-primary text-sm">Careers</Link></li>
                <li><Link to="/blog" className="text-slate-500 hover:text-primary text-sm">Blog</Link></li>
                <li><Link to="/contact" className="text-slate-500 hover:text-primary text-sm">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-slate-500 hover:text-primary text-sm">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-slate-500 hover:text-primary text-sm">Privacy Policy</Link></li>
                <li><Link to="/security" className="text-slate-500 hover:text-primary text-sm">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} LearnSphere. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
//   );
// };

// export default Index;
