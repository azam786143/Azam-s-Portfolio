import React, { useState } from 'react';
import { Mail, Linkedin, Github, Phone, MapPin, Send, ExternalLink, Copy, Check } from 'lucide-react';
import GlassCard from './GlassCard';

export default function ContactSection() {
  const [isCopied, setIsCopied] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const emailAddress = 'noorazam786143@gmail.com';
  const phoneNumber = '9390285197';

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setCopiedText(type);
    setTimeout(() => {
      setIsCopied(false);
      setCopiedText('');
    }, 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-12 z-10 py-12">
      
      {/* 3D Envelope Interactive Block */}
      <div className="relative w-full max-w-md h-[300px] flex items-center justify-center group cursor-pointer perspective-1000 select-none">
        
        {/* Envelope body structure */}
        <div className="relative w-[340px] h-[200px] bg-[#1a232c] border border-lemon/20 rounded-b-lg shadow-[0_15px_35px_rgba(0,0,0,0.6)] duration-700 transform-style-3d group-hover:translate-y-8">
          
          {/* Letters inserts (Moves upwards on hover) */}
          <div className="absolute left-[15px] right-[15px] bottom-2 h-[170px] bg-[#101820] border-2 border-lemon p-4 rounded flex flex-col justify-between transition-all duration-500 ease-out z-10 group-hover:-translate-y-28 shadow-[0_0_20px_rgba(254,231,21,0.15)]">
            <div className="space-y-2">
              <span className="block text-[8px] font-mono font-bold text-lemon tracking-widest uppercase">
                CORESYNC SECURE // INBOUND_MSG
              </span>
              <div className="border-b border-lemon/20 pb-2">
                <h4 className="text-sm font-display font-bold text-white uppercase">SK. NOOR AZAM</h4>
                <p className="text-[10px] font-mono text-lemon mt-0.5">Visakhapatnam, Andhra Pradesh, IN</p>
              </div>
              
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-mono text-white/80 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-lemon shrink-0" /> {emailAddress}
                </p>
                <p className="text-[11px] font-mono text-white/80 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-lemon shrink-0" /> +91-9390285197
                </p>
              </div>
            </div>

            <div className="text-[9px] font-mono text-lemon/40 flex justify-between items-center bg-midnight/50 px-2 py-0.5 rounded">
              <span>REF_NOOR_PORTFOLIO_LETTER</span>
              <span className="text-white">Active</span>
            </div>
          </div>

          {/* Envelope Pocket back wall inside shadow */}
          <div className="absolute inset-x-0 bottom-0 top-0 bg-[#0d141b] rounded-b-lg overflow-hidden z-0 border-t border-lemon/10" />

          {/* Left Flap */}
          <div
            className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#1b2530] border-l border-lemon/15 select-none z-20"
            style={{
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
            }}
          />
          {/* Right Flap */}
          <div
            className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#1b2530] border-r border-lemon/15 select-none z-20"
            style={{
              clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
            }}
          />
          {/* Bottom Flap overlay */}
          <div
            className="absolute left-0 right-0 bottom-0 h-2/3 bg-[#131b23] border-b border-lemon/15 select-none z-25"
            style={{
              clipPath: 'polygon(0 100%, 50% 30%, 100% 100%)',
            }}
          />

          {/* Top cover flap (Animates open on envelope hover) */}
          <div
            className="absolute left-0 right-0 top-0 h-[100px] bg-[#19242f] border-t border-lemon/20 origin-top duration-500 group-hover:rotateX(180deg) z-30"
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              transformOrigin: 'top',
            }}
          />

          {/* Glowing Front Seal Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-midnight border border-lemon flex items-center justify-center z-35 shadow-[0_0_15px_rgba(254,231,21,0.4)] transition-opacity duration-300 group-hover:opacity-10">
            <span className="text-lemon font-mono font-bold text-xs">SK</span>
          </div>
        </div>

        {/* Floating instructions text for envelope */}
        <div className="absolute bottom-1 right-1/2 transform translate-x-1/2 text-[10px] font-mono text-lemon/40 group-hover:opacity-0 transition-opacity duration-300 animate-pulse">
          HOVER ENVELOPE TO UNSEAL
        </div>
      </div>

      {/* Grid of contact links as floating yellow glass pills */}
      <div className="flex flex-wrap items-center justify-center gap-4 w-full px-4">
        {/* Email Pill */}
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${emailAddress}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-glass-bg border border-glass-border hover:border-lemon hover:text-midnight hover:bg-lemon rounded-full text-xs font-mono font-bold text-lemon tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(254,231,21,0.02)] hover:shadow-[0_0_20px_rgba(254,231,21,0.4)] pointer-events-auto"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>EMAIL</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          <button
            onClick={() => handleCopy(emailAddress, 'email')}
            className="p-2.5 bg-glass-bg border border-glass-border hover:border-lemon hover:text-lemon rounded-full transition-all duration-300 pointer-events-auto"
            title="Copy Email"
          >
            {isCopied && copiedText === 'email' ? <Check className="w-3.5 h-3.5 text-lemon animate-bounce" /> : <Copy className="w-3.5 h-3.5 text-white/80" />}
          </button>
        </div>

        {/* LinkedIn Pill */}
        <a
          href="https://linkedin.com/in/sk-noor-azam-068576371"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-glass-bg border border-glass-border hover:border-lemon hover:text-midnight hover:bg-lemon rounded-full text-xs font-mono font-bold text-lemon tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(254,231,21,0.02)] hover:shadow-[0_0_20px_rgba(254,231,21,0.4)] pointer-events-auto"
        >
          <Linkedin className="w-3.5 h-3.5" />
          <span>LINKEDIN</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        {/* GitHub Pill */}
        <a
          href="https://github.com/azam786143"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 bg-glass-bg border border-glass-border hover:border-lemon hover:text-midnight hover:bg-lemon rounded-full text-xs font-mono font-bold text-lemon tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(254,231,21,0.02)] hover:shadow-[0_0_20px_rgba(254,231,21,0.4)] pointer-events-auto"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GITHUB</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        {/* Phone Pill */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-glass-bg border border-glass-border hover:border-lemon hover:text-midnight hover:bg-lemon rounded-full text-xs font-mono font-bold text-lemon tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(254,231,21,0.02)] hover:shadow-[0_0_20px_rgba(254,231,21,0.4)] pointer-events-auto"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>PHONE</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          <button
            onClick={() => handleCopy(phoneNumber, 'phone')}
            className="p-2.5 bg-glass-bg border border-glass-border hover:border-lemon hover:text-lemon rounded-full transition-all duration-300 pointer-events-auto"
            title="Copy Phone Number"
          >
            {isCopied && copiedText === 'phone' ? <Check className="w-3.5 h-3.5 text-lemon animate-bounce" /> : <Copy className="w-3.5 h-3.5 text-white/80" />}
          </button>
        </div>
      </div>

      {/* Copy notification badge */}
      {isCopied && (
        <div className="text-xs font-mono text-lemon bg-lemon/10 border border-lemon/30 px-4 py-1.5 rounded-full animate-pulse">
          Copied {copiedText === 'email' ? 'Email Address' : 'Phone Number'} to Clipboard!
        </div>
      )}
    </div>
  );
}
