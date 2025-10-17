import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Convert filename or path to kebab-case react route.
 * Examples:
 *  "AddContract.html" -> "/addcontract" OR "/add-contract" (we keep non-alphanumeric => '-')
 *  "Info Menu.html" -> "/info-menu"
 *  "AddContract.html?foo=1" -> "/add-contract"
 */
function slugFromHref(href){
  if(!href) return null;
  // remove query/hash
  const pure = href.split('?')[0].split('#')[0];
  const last = pure.split('/').pop();
  const name = last.replace(/\.html$/i, '').trim();
  if(!name) return '/';
  // replace spaces and non-alphanumeric with '-'
  const slug = '/' + name
    .replace(/\s+/g,'-')
    .replace(/[^A-Za-z0-9\-]+/g,'-')
    .replace(/-+/g,'-')
    .replace(/(^-+|-+$)/g,'')
    .toLowerCase();
  return slug === '' ? '/' : slug;
}

export default function AnchorRouter(){
  const navigate = useNavigate();

  useEffect(()=>{
    function handler(e){
      // find the nearest anchor element (works if child clicked)
      const a = e.target.closest && e.target.closest('a');
      if(!a) return;
      const href = a.getAttribute('href') || '';
      // ignore external links, mailto, tel, hash-only
      if(/^(https?:|mailto:|tel:|#)/i.test(href)) return;
      // relative or .html local link -> intercept
      if(href.endsWith('.html') || /^[^\/].*\.html$/i.test(href) || (!href.includes('.') && !href.startsWith('/')) ){
        e.preventDefault();
        const route = slugFromHref(href);
        navigate(route);
      } else if(href.startsWith('/')) {
        // absolute path within app
        e.preventDefault();
        navigate(href);
      }
    }
    document.addEventListener('click', handler);
    return ()=> document.removeEventListener('click', handler);
  },[navigate]);

  return null;
}