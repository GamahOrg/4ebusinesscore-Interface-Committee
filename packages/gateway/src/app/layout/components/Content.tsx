import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { DrawerComponent } from "../../assets/ts/components";

interface Iprop {
  children?: React.ReactNode;
}

const Content: React.FC<Iprop> = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    DrawerComponent.hideAll();
  }, [location]);

  return (
    <div
      id="kt_content_container"
      className={clsx("d-flex flex-column-fluid align-items-start container")}
      style={{ minHeight: "80vh" }}
    >
      {children}
    </div>
  );
};

export { Content };
