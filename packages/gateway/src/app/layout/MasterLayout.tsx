import React, { Fragment, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "./components/Footer";
import { HeaderWrapper, Content } from "@npm-react/react-redux-routing";
import { ScrollTop } from "./components/ScrollTop";
import { PageDataProvider, useLayout } from "./core";
import { useLocation } from "react-router-dom";
import { MenuComponent } from "../../app/assets/ts/components";
import { useLang } from "@npm-react/react-redux-routing";
import ChatBot from "./components/chatbot-layput";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatform } from "../features/platform-settings/platformSettings";
import { getToken } from "@4eplatform/shared/index";
import { RootState } from "../store/store";

interface Iprop {
  children?: React.ReactNode;
}

const MasterLayout: React.FC<Iprop> = ({ children }) => {
  const { classes } = useLayout();

  const location = useLocation();
  const navigate = useNavigate();

  const lang = useLang();

  useEffect(() => {
    if (lang === "ar") {
      require("../assets/sass/core/layout/ar/_base_ar.scss");
      require("../assets/sass/core/layout/Theme/_theme_style.scss");
      // @ts-ignore
      // import("../assets/sass/core/layout/ar/_base_ar.scss");
    } else if (lang === "en") {
      require("../assets/sass/core/layout/Theme/_theme_style.scss");
    }

    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }, []);

  let platformsettings: any = useSelector((state: RootState) => {
    return state?.Platform?.data;
  });

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }, [location.key]);

  const token = getToken();

  useEffect(() => {
    if (
      (location.pathname == "/auth/login" || location.pathname == "/auth") &&
      token
    ) {
      navigate("/");
    }
  }, [location, token]);

  let dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const platformData = await dispatch(fetchPlatform({}) as any);
        const chatBotVisibleFromAPI = platformData?.chatBotIsVisible;
        const chatBotIsVisible = localStorage.getItem("chatBotIsVisible");
        setIsVisible(
          chatBotIsVisible === "true" || chatBotVisibleFromAPI === true,
        );
      } catch (error) {
        console.error("Error fetching platform data:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <Fragment>
      <PageDataProvider>
        <div className="page d-flex flex-row flex-column-fluid">
          <div
            className="wrapper d-flex flex-column flex-row-fluid"
            id="kt_wrapper"
          >
            <HeaderWrapper platformsettings={platformsettings} />
            <Content>
              <div id="kt_content " className="content flex-row-fluid p-0">
                <Outlet />
              </div>
            </Content>
            <Footer />

            {/* {isVisible === "true" && (
              <ChatBot />
            )} */}
            {isVisible && <ChatBot />}
          </div>
        </div>

        {/* begin:: Drawers 
        <ActivityDrawer />
        <DrawerMessenger />
        {/* end:: Drawers */}

        {/* begin:: Modals
        <Main />
        <InviteUsers />
        <UpgradePlan /> */}
        <ScrollTop />
      </PageDataProvider>
    </Fragment>
  );
};

export { MasterLayout };
