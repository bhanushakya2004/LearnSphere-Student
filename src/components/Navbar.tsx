
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-300",
      transparent ? "bg-transparent" : "bg-white/90 backdrop-blur-md border-b shadow-sm"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary font-semibold">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">LearnSphere</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
