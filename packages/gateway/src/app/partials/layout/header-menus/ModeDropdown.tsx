/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "../../../helpers";
import { useDispatch } from "react-redux";
import { fetchUserHomeLanguageFormSettings } from "../../../features/header/user-profile-home-settings-language-form-slice";
import { patchHomeSettingLanguageForm } from "../../../features/header/user-profile-patch-language-form-slice";
import { HomeSettingsLanguageFormModel } from "../../../models/home/home-settings-model";

const ModeDropdown: FC = () => {
  let dispatch = useDispatch();
  let [languagesAndMode, setLanguagesAndMode] =
    useState<HomeSettingsLanguageFormModel>(
      new HomeSettingsLanguageFormModel("", "", "", false, "", "")
    );
  useEffect(() => {
    dispatch(fetchUserHomeLanguageFormSettings("") as any).then((res: any) => {
      setLanguagesAndMode(res?.payload?.result);
    });
  }, []);
  const [darkMode, setDarkMode] = useState<any>(
    (localStorage.getItem("Theme") == "dark" ? true : false) || false
  );

  useEffect(() => {
    setDarkMode(localStorage.getItem("Theme") == "dark" ? true : false);
  }, []);
  let handleChangeLanguageAndNightMode = async (mode: any) => {
    let body = {
      nightMode: mode,
      lookupId: languagesAndMode?.lookupId,
      imageUrl: languagesAndMode?.languageImage,
    };
    if (languagesAndMode?.lookupId) {
      return dispatch(patchHomeSettingLanguageForm(body) as any).then(() => {
        localStorage.setItem("Theme", mode ? "dark" : "light");
        window.location.reload();
      });
    }
  };

  // useEffect(() => {
  //   if (!darkMode) {
  //     import(`../../../../app/assets/sass/style${!darkMode ? "" : "dark"}.scss`)
  //       // .then(() => {
  //       //   localStorage.setItem("Theme", "light");
  //       // })
  //       .catch((error) => {
  //         console.error("Error importing SCSS:", error);
  //       });
  //   } else {
  //     import(`../../../../app/assets/sass/style.${darkMode ? "dark" : ""}.scss`)
  //       // .then(() => {
  //       //   localStorage.setItem("Theme", "dark");
  //       // })
  //       .catch((error) => {
  //         console.error("Error importing SCSS:", error);
  //       });
  //   }
  // }, [darkMode]);

  const handleDarkMode = async () => {
    window.dispatchEvent(new Event("themeChanged"));
    await handleChangeLanguageAndNightMode(true);
    setDarkMode(true);
  };

  const handleLightMode = async () => {
    await handleChangeLanguageAndNightMode(false);
    setDarkMode(false);
  };

  const intl = useIntl();

  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-200px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3 my-1">
        <div
          className="menu-link px-3"
          onClick={() => {
            // setIsDarkMode(false);
            handleLightMode();
          }}
        >
          <span className="menu-icon">
            <KTSVG path="/media/icons/duotune/general/gen062.svg" />
          </span>
          <span className="menu-title">
            {intl.formatMessage({ id: "Light" })}
          </span>
        </div>
      </div>
      <div className="menu-item px-3 my-1">
        <div
          className="menu-link px-3"
          onClick={() => {
            // setIsDarkMode(true);
            handleDarkMode();
          }}
        >
          <span className="menu-icon">
            <KTSVG path="/media/icons/duotune/general/gen063.svg" />
          </span>
          <span className="menu-title">
            {intl.formatMessage({ id: "Dark" })}
          </span>
        </div>
      </div>
    </div>
  );
};

export { ModeDropdown };
