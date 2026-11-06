const themeInit = `(function(){try{var t=localStorage.getItem("theme");var root=document.documentElement;if(t==="light"){root.classList.add("light");root.style.colorScheme="light"}else{root.classList.remove("light");root.style.colorScheme="dark"}}catch(e){}})()`;

export function ThemeScript() {
  return <script>{themeInit}</script>;
}
