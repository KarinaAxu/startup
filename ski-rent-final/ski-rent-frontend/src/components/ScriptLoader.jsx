import { useEffect } from 'react';

/**
 * ScriptLoader: загружает original/script.js из публичной папки.
 * Использует process.env.PUBLIC_URL чтобы избежать прокси к backend.
 */
export default function ScriptLoader(){
  useEffect(()=>{
    // don't remove existing canvas; just ensure script is loaded once
    const src = (process.env.PUBLIC_URL || '') + '/original/script.js';
    if(document.querySelector('script[data-original-script]')) return;
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.setAttribute('data-original-script', '1');
    s.onload = ()=>{ 
      try{ if(window.__regBg && typeof window.__regBg.init === 'function'){ window.__regBg.init(); } }catch(e){}
    };
    s.onerror = (e)=>{
      console.warn('Failed to load original script', src, e);
    };
    document.body.appendChild(s);
    return ()=> {
      // keep script in DOM to avoid reloads
    };
  }, []);
  return null;
}