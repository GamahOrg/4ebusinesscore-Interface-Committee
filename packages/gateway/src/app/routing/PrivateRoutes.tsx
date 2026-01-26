import { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../app/layout/MasterLayout";
import { Loader } from "@4eplatform/shared/src/components/loader";
import { PageNotFound } from "@4eplatform/shared/src/components/404";
import { committeeLoadRoutes } from "../services/dynamicRoutes/committeeLoadRoutes";
import { useIntl } from "react-intl";

const DynamicComponentsWrapper = lazy(
  () => import("./DynamicComponentsWrapper")
);

const PrivateRoutes = () => {
  const [components, setComponents] = useState<any>();
  let intl = useIntl();

  let languageData = intl.locale;
  useEffect(() => {
    document.documentElement.lang = languageData;
    document.documentElement.dir = languageData === "ar" ? "rtl" : "ltr";
  }, [languageData]);

  const fetchComponents = async () => {
    try {
      const loadedComponents = await committeeLoadRoutes();
      setComponents(loadedComponents);
    } catch (error) {
      console.error("Error loading components:", error);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);
  return (
    <Suspense
    // fallback={<Loader />}
    >
      <Routes>
        <Route element={<MasterLayout />}>
          <Route path="/loading" element={<Loader />} />
          <Route path="/404" element={<PageNotFound />} />

          <Route
            path="/*"
            element={<DynamicComponentsWrapper components={components} />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export { PrivateRoutes };
