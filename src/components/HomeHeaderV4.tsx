import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Menu, Phone, ShieldCheck, HeartHandshake, X } from 'lucide-react';
import PremiumLogoV4 from './PremiumLogoV4';

const items=[['/','Accueil'],['/#services','Services'],['/zones-desservies','Zones'],['/qui-sommes-nous','À propos'],['/faq','FAQ']];

export default function HomeHeaderV4(){
  const [open,setOpen]=useState(false);
  return <header className="v4-header">
    <div className="v4-topbar">
      <div className="v4-wrap v4-topbar-inner">
        <span><ShieldCheck size={14}/> Taxi conventionné CPAM</span>
        <span><HeartHandshake size={14}/> Accompagnement humain</span>
        <span>Paris · Île-de-France · 24h/24</span>
      </div>
    </div>
    <div className="v4-nav">
      <div className="v4-wrap v4-nav-inner">
        <Link to="/" className="v4-logo"><PremiumLogoV4 className="v4-logo-svg"/></Link>
        <nav className="v4-navlinks">
          {items.map(([p,l])=>p.startsWith('/#')?<a key={p} href={p.slice(1)}>{l}</a>:<Link key={p} to={p}>{l}</Link>)}
        </nav>
        <div className="v4-actions">
          <a href="tel:+33650366491" className="v4-call"><Phone size={16}/>06 50 36 64 91</a>
          <Link to="/reservation-taxi-vsl" className="v4-book"><CalendarDays size={16}/>Réserver</Link>
        </div>
        <button className="v4-menu" onClick={()=>setOpen(v=>!v)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
      </div>
    </div>
    {open&&<div className="v4-mobile"><div className="v4-wrap">{items.map(([p,l])=>p.startsWith('/#')?<a key={p} href={p.slice(1)} onClick={()=>setOpen(false)}>{l}</a>:<Link key={p} to={p} onClick={()=>setOpen(false)}>{l}</Link>)}<a href="tel:+33650366491">06 50 36 64 91</a></div></div>}
  </header>
}
