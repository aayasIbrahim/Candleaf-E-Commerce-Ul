import { useEffect } from "react";
import { useLocation } from "react-router-dom";


function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
  return null // This component does not render anything it use only for side effects when routing scrolls to top
  
}

export default ScrollToTop