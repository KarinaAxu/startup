import { useEffect } from 'react';

/**
 * Background: ensure <canvas id="bgCanvas"> exists
 * and is placed under the content. Do not remove it on navigation.
 */
export default function Background(){
  useEffect(()=>{
    let canvas = document.getElementById('bgCanvas');
    if(!canvas){
      canvas = document.createElement('canvas');
      canvas.id = 'bgCanvas';
      canvas.style.position = 'fixed';
      canvas.style.left = '0';
      canvas.style.top = '0';
      canvas.style.zIndex = '-2';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      document.body.appendChild(canvas);
    }
    try{ if(window.__regBg && typeof window.__regBg.init === 'function'){ window.__regBg.init(); } }catch(e){ console.warn(e); }
    return ()=>{};
  }, []);
  return null;
}