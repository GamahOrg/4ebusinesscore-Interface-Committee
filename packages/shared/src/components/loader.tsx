import "./loader.css";
import Logo from "./logo";
export const Loader = () => {
  return (
    <div dir="ltr" className="app-loader">
      <div id="container">
        <Logo />
        <div id="point" className="point"></div>
        <div id="point2" className="point"></div>
        <div id="point3" className="point"></div>
        <div id="point4" className="point"></div>
        <div id="point5" className="point"></div>
        <div id="point6" className="point"></div>
      </div>
    </div>
  );
};
