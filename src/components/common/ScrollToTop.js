import {useEffect} from "react";
import {useLocation} from "react-router-dom";

function ScrollToTop() {
  const location = useLocation()
  console.log()
  useEffect(() => {
    window.scrollTo(0,0)
  },[location.pathname])
}
export default ScrollToTop;