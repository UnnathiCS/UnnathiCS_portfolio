
import React, { useState, useEffect } from 'react';
import { Nav, Footer } from './components/Layout';
import { BackgroundEffect } from './components/Background';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight, 
  Code2, 
  BrainCircuit, 
  Database, 
  Terminal, 
  Trophy,
  ExternalLink,
  BookOpen,
  Send,
  X,
  User,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  SKILLS, 
  EXPERIENCES, 
  PROJECTS, 
  ACHIEVEMENTS,
  EDUCATION 
} from './constants';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hello! I'm an AI assistant trained on Unnathi's resume. Ask me anything about her experience or skills!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Form states
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatMessage("");
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an AI assistant for Unnathi C S's portfolio. 
        Context: ${JSON.stringify({ ...PERSONAL_INFO, EDUCATION, SKILLS, EXPERIENCES, PROJECTS, ACHIEVEMENTS })}
        Question: ${userMsg}
        Answer concisely as a professional recruiter/agent. Use a friendly but professional tone.`,
      });
      setChatHistory(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'bot', text: "Service unavailable. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen selection:bg-hotpink/30 text-white bg-[#030712] overflow-x-hidden">
      <BackgroundEffect />
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-hotpink/5 border border-hotpink/20 px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 bg-hotpink rounded-full animate-pulse" />
              <span className="text-xs font-medium text-hotpink tracking-wider uppercase font-mono">Available for AI Research Roles</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
              Hello! I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-hotpink to-rose-500">Unnathi</span>. I build intelligent AI systems.
            </h1>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-2xl">
              I'm a CS student specialized in LLMs, Computer Vision, and Generative systems. Currently building intelligent agents and exploring the intersection of data-driven methods and real-world scalability.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="bg-hotpink text-black px-8 py-3 rounded-lg font-semibold hover:bg-hotpink-400 transition-colors inline-flex items-center group">
                View Projects
                <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
              </a>
              <div className="flex items-center space-x-4 ml-2">
                <a href={PERSONAL_INFO.github} target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-hotpink/10 hover:border-hotpink/30 transition-all">
                  <Github size={20} />
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-hotpink/10 hover:border-hotpink/30 transition-all">
                  <Linkedin size={20} />
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-hotpink/10 hover:border-hotpink/30 transition-all">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-white/5 bg-[#030712]/50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-hotpink font-mono text-xl">01.</span> Profile Summary
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              {PERSONAL_INFO.summary}
            </p>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl border-l-4 border-l-hotpink">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-hotpink/10 rounded-lg text-hotpink">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{EDUCATION.degree}</h4>
                  <p className="text-sm text-gray-400">{EDUCATION.institution}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{EDUCATION.graduation}</span>
                <span className="text-hotpink font-mono font-bold">{EDUCATION.cgpa}</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative group flex justify-center">
             <div className="w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-gray-900/50 backdrop-blur-sm relative">
                {/* Profile Image with status checking */}
                {!imgError ? (
                  <img 
                    src={PERSONAL_INFO.profileImage} 
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#0a0f1d] border-2 border-dashed border-hotpink/20">
                     <div className="text-center">
                       <User size={64} className="text-hotpink/20 mx-auto mb-4" />
                       <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono">Sync Failure // Image Unreachable</p>
                     </div>
                  </div>
                )}
                
                {/* Visual Scanner/Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 border-2 border-hotpink/0 group-hover:border-hotpink/30 transition-all rounded-2xl pointer-events-none" />
                
                {/* Terminal Text Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
                  <div className="font-mono text-[9px] md:text-[10px] space-y-1 text-hotpink drop-shadow-[0_0_8px_rgba(255,105,180,0.5)]">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-hotpink rounded-full animate-ping shrink-0" />
                      SECURE_ACCESS: GRANTED
                    </p>
                    <p className="opacity-70 pl-3">USER: UNNATHI_C_S</p>
                    <p className="opacity-70 pl-3">CLASS: 2027_CSE_RVU</p>
                    <p className="opacity-70 pl-3">DOMAIN: AI_RESEARCH_DEV</p>
                    <div className="pt-2 flex gap-1">
                      <div className="h-1 w-8 bg-hotpink/40" />
                      <div className="h-1 w-12 bg-hotpink/20" />
                      <div className="h-1 w-4 bg-hotpink/60" />
                    </div>
                  </div>
                </div>
             </div>
             
             {/* Floating Achievement Card */}
             <div className="absolute -bottom-6 -left-6 bg-[#0a0f1d] border border-white/10 p-4 rounded-lg shadow-2xl hidden lg:block z-10 hover:border-hotpink transition-all group-hover:-translate-y-1">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-hotpink/10 rounded-full flex items-center justify-center text-hotpink ring-1 ring-hotpink/30">
                      <Trophy size={18} />
                   </div>
                   <div>
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">University Rank</p>
                      <p className="text-xs font-bold font-mono">TOP 5% OF CLASS</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 flex items-center gap-3">
            <span className="text-hotpink font-mono text-xl">02.</span> Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {SKILLS.map((cat, i) => (
              <div key={i} className="group">
                <h3 className="text-gray-300 text-sm font-bold mb-6 flex items-center gap-2 uppercase tracking-tighter">
                  {cat.category === 'Programming' && <Code2 size={16} className="text-hotpink" />}
                  {cat.category === 'AI/ML & Data Science' && <BrainCircuit size={16} className="text-hotpink" />}
                  {cat.category === 'Frameworks & Tools' && <Database size={16} className="text-hotpink" />}
                  {cat.category === 'Cloud & DevOps' && <Terminal size={16} className="text-hotpink" />}
                  {cat.category === 'Web & Services' && <ExternalLink size={16} className="text-hotpink" />}
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <span key={j} className="text-[10px] px-2 py-1 bg-white/[0.03] border border-white/5 rounded font-mono text-gray-400 group-hover:border-hotpink/40 group-hover:text-hotpink transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 border-t border-white/5 bg-[#030712]/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 flex items-center gap-3">
            <span className="text-hotpink font-mono text-xl">03.</span> Professional Journey
          </h2>
          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="relative pl-8 border-l border-white/10 group">
                <div className="absolute left-[-5px] top-2 w-[10px] h-[10px] bg-hotpink rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(255,105,180,0.8)]" />
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-hotpink transition-colors">{exp.role}</h3>
                    <p className="text-hotpink font-medium text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 md:mt-0 font-mono tracking-widest">{exp.period}</span>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((desc, j) => (
                    <li key={j} className="text-gray-400 text-sm flex items-start gap-3">
                      <span className="text-hotpink mt-1.5 shrink-0 text-xs">▹</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 flex items-center gap-3">
            <span className="text-hotpink font-mono text-xl">04.</span> Selected Research & Work
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((proj, i) => (
              <div key={i} className="group bg-[#0a0f1d] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] transition-all hover:-translate-y-1 hover:border-hotpink/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-hotpink/10 rounded-xl text-hotpink ring-1 ring-hotpink/20 group-hover:bg-hotpink group-hover:text-black transition-all">
                    <Terminal size={22} />
                  </div>
                  <div className="flex gap-4">
                    {proj.github && <a href={proj.github} target="_blank" className="text-gray-500 hover:text-hotpink transition-colors"><Github size={20} /></a>}
                    {proj.link && <a href={proj.link} target="_blank" className="text-gray-500 hover:text-hotpink transition-colors"><ExternalLink size={20} /></a>}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-hotpink transition-colors tracking-tight">{proj.title}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t, k) => (
                    <span key={k} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-hotpink/5 text-hotpink/80 border border-hotpink/20 rounded-full font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-[#030712] to-[#010309]">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold mb-16">Honors & Recognition</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACHIEVEMENTS.map((ach, i) => (
                <div key={i} className="p-6 bg-[#0a0f1d] border border-white/10 rounded-xl flex items-center gap-4 hover:border-hotpink/50 transition-all text-left group">
                  <Trophy className="text-hotpink shrink-0 group-hover:scale-110 transition-transform" size={20} />
                  <span className="text-xs text-gray-300 font-medium leading-tight">{ach}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-hotpink font-mono text-xs mb-4 block tracking-[0.3em] uppercase font-bold">What's Next?</span>
            <h2 className="text-5xl font-bold mb-8 tracking-tighter">Get In Touch</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              I'm currently seeking research and engineering opportunities for 2026/2027. Whether you have a specific role or just want to connect, my inbox is open.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Sidebar with Info */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-[#0a0f1d] border border-white/10 p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-hotpink/5 blur-3xl pointer-events-none" />
                <h3 className="text-xl font-bold mb-8 tracking-tight">Connect</h3>
                <div className="space-y-6">
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 bg-hotpink/10 rounded-lg flex items-center justify-center text-hotpink group-hover/item:bg-hotpink group-hover/item:text-black transition-all">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Email</p>
                      <p className="text-sm text-gray-300 group-hover/item:text-hotpink transition-colors truncate max-w-[150px]">{PERSONAL_INFO.email}</p>
                    </div>
                  </a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 bg-hotpink/10 rounded-lg flex items-center justify-center text-hotpink group-hover/item:bg-hotpink group-hover/item:text-black transition-all">
                      <Linkedin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">LinkedIn</p>
                      <p className="text-sm text-gray-300 group-hover/item:text-hotpink transition-colors">/in/unnathi-c-s</p>
                    </div>
                  </a>
                  <a href={PERSONAL_INFO.github} target="_blank" className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 bg-hotpink/10 rounded-lg flex items-center justify-center text-hotpink group-hover/item:bg-hotpink group-hover/item:text-black transition-all">
                      <Github size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">GitHub</p>
                      <p className="text-sm text-gray-300 group-hover/item:text-hotpink transition-colors">/UnnathiCS</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleFormSubmit} className="bg-[#0a0f1d] border border-white/10 p-8 rounded-2xl relative">
                {formStatus === 'success' ? (
                  <div className="py-12 text-center">
                    <div className="w-20 h-20 bg-hotpink/10 text-hotpink rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-hotpink/5">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-hotpink tracking-tight">Transmission Sent</h3>
                    <p className="text-gray-400 text-sm">Your message was delivered. I'll get back to you soon.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 font-mono">IDENTIFIER</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                          <input 
                            required
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Your Name"
                            className="w-full bg-[#030712]/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-hotpink focus:ring-1 focus:ring-hotpink/20 transition-all font-mono"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 font-mono">ENDPOINT</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                          <input 
                            required
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="Email Address"
                            className="w-full bg-[#030712]/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-hotpink focus:ring-1 focus:ring-hotpink/20 transition-all font-mono"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-8">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 font-mono">PAYLOAD</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-4 text-gray-600" size={16} />
                        <textarea 
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Your message details..."
                          className="w-full bg-[#030712]/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-hotpink focus:ring-1 focus:ring-hotpink/20 transition-all resize-none font-mono"
                        ></textarea>
                      </div>
                    </div>
                    <button 
                      disabled={formStatus === 'sending'}
                      className="w-full bg-hotpink text-black py-4 rounded-xl font-bold hover:bg-hotpink-400 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 active:scale-[0.98]"
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          PROCESSING...
                        </>
                      ) : (
                        <>
                          TRANSMIT DATA
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating AI Agent */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-black shadow-2xl transition-all active:scale-95 shadow-hotpink/20 border-4 border-[#030712] ${chatOpen ? 'bg-rose-500 rotate-90' : 'bg-hotpink hover:scale-110'}`}
        >
          {chatOpen ? <X size={22} /> : <BrainCircuit size={22} className="animate-pulse" />}
        </button>

        {chatOpen && (
          <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-[#0a0f1d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[500px] animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-hotpink p-4 text-black font-bold flex justify-between items-center">
               <span className="font-mono text-xs uppercase tracking-widest">RESUME_AI_v1.0</span>
               <div className="flex gap-1">
                 <div className="w-2 h-2 bg-black/20 rounded-full" />
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#030712]/50 scrollbar-thin scrollbar-thumb-hotpink/20">
              {chatHistory.map((chat, i) => (
                <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${chat.role === 'user' ? 'bg-hotpink text-black font-medium' : 'bg-white/5 border border-white/10 text-gray-300'}`}>
                    {chat.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-xl text-[10px] text-gray-400 font-mono italic flex items-center gap-2">
                    <span className="flex gap-0.5">
                      <span className="w-1 h-1 bg-hotpink rounded-full animate-bounce" />
                      <span className="w-1 h-1 bg-hotpink rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 bg-hotpink rounded-full animate-bounce [animation-delay:0.4s]" />
                    </span>
                    ANALYZING...
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleAskAI} className="p-4 border-t border-white/10 bg-[#0a0f1d]">
              <div className="relative">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask about my AI research..." 
                  className="w-full bg-[#030712] border border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-xs text-white focus:outline-none focus:border-hotpink transition-colors font-mono"
                />
                <button type="submit" className="absolute right-2 top-2 text-hotpink hover:scale-110 transition-transform">
                   <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
