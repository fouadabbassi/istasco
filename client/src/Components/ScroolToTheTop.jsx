// ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Scroll to the top of the page when pathname changes
        window.scrollTo(0, 0);

        // If there's a hash, scroll to the specified section
        if (hash) {
            const element = document.getElementById(hash.substring(1)); // Remove the '#' character
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
