
import React from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

export const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#030712]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold tracking-tighter text-white mono">
              UNNATHI<span className="text-pink-500">.AI</span>
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#030712] border-b border-white/5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-[#030712] border-t border-white/5 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-gray-500 text-sm">
        © {new Date().getFullYear()} Unnathi C S. Built with passion & AI.
      </div>
      <div className="flex space-x-6">
        <a href="https://github.com/UnnathiCS" target="_blank" className="text-gray-500 hover:text-pink-500 transition-colors">
          <Github size={20} />
        </a>
        <a href="https://linkedin.com/in/unnathi-c-s-3498502a1" target="_blank" className="text-gray-500 hover:text-pink-500 transition-colors">
          <Linkedin size={20} />
        </a>
        <a href="mailto:65.unnathics@gmail.com" className="text-gray-500 hover:text-pink-500 transition-colors">
          <Mail size={20} />
        </a>
      </div>
    </div>
  </footer>
);
