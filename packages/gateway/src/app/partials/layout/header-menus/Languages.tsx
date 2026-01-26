/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { patchHomeSettingLanguageForm } from "../../../features/header/user-profile-patch-language-form-slice";
import { setLanguage, useLang } from "../../../i18n/Metronici18n";
import { toAbsoluteUrl } from "../../../helpers";

const languages = [
  {
    lang: "en",
    name: "English",
    flag: toAbsoluteUrl("/media/flags/united-states.svg"),
  },
  {
    lang: "ar",
    name: "العربية",
    flag: toAbsoluteUrl("/media/flags/saudi-arabia.svg"),
  },
];

const Languages: FC = () => {
  const lang = useLang();
  const intl = useIntl();
  let dispatch = useDispatch();

  const currentLanguage = languages.find((x) => x.lang === lang);

  let handleChangeLanguageAndNightMode = (l: string) => {
    let body;

    body = {
      nightMode: localStorage.getItem("Theme") === "dark" ? true : false,
      lookupId:
        l === "ar"
          ? "4d6bfe48-88e0-4c21-a848-2a36763d0610"
          : "4d6bfe48-88e0-4c21-a848-2a36763d0611",
      // mainImage: null,
      // imageUrl: `${languageFormVales?.languageImage}`,
      // imageUrl: imagePreview,
    };

    dispatch(patchHomeSettingLanguageForm(body) as any).then(() => {
      localStorage.setItem(
        "subSystemId",
        localStorage.getItem("subSystemId") || ""
      );
      localStorage.setItem(
        "mainClassificationId",
        localStorage.getItem("mainClassificationId") || ""
      );
      localStorage.setItem("i18nextLng", l);
      localStorage.setItem("selectedLang", l);
      setLanguage(l);
    });
  };

  return (
    <div
      className="menu-item px-5"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="bottom"
    >
      <a href="#" className="menu-link">
        <span className="d-flex align-items-center justify-content-between w-100 gap-2">
          {/* Left side: static label */}
          <span>{intl.formatMessage({ id: "Language" })}</span>

          {/* Right side: selected language */}
          <span className="fs-8 rounded bg-light px-3 py-1 d-flex align-items-center">
            <span>{currentLanguage?.name}</span>
            <img
              className="w-15px h-15px rounded-1 ms-2"
              src={currentLanguage?.flag}
              alt="4e Workspace"
            />
          </span>
        </span>
      </a>

      <div className="menu-sub menu-sub-dropdown w-175px py-4">
        {languages.map((l) => (
          <div
            className="menu-item px-3"
            key={l.lang}
            onClick={async () => {
              await handleChangeLanguageAndNightMode(l.lang);
            }}
            // onClick={() => {
            //   setLanguage(l.lang)
            //   localStorage.setItem('subSystemId', localStorage.getItem('subSystemId'))
            //   localStorage.setItem('mainClassificationId', localStorage.getItem('mainClassificationId'))
            //   localStorage.setItem('i18nextLng', l.lang)
            //   localStorage.setItem('selectedLang', l.lang)
            // }}
          >
            <a
              href="#"
              className={clsx("menu-link d-flex px-5", {
                active: l.lang === currentLanguage?.lang,
              })}
            >
              <span className="symbol symbol-20px me-4">
                <img className="rounded-1" src={l.flag} alt="4e Workspace" />
              </span>
              {l.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Languages };
