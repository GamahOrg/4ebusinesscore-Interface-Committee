/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useMemo, useRef } from "react";
import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "../../../partials/functions/language";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { RootState } from "../../../store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AuthFooterNew from "./AuthFooterNew";
import { PlatformRootUrl } from "@4eplatform/shared/apis/system_setting";
import { toAbsoluteUrl } from "../../../../app/helpers";
import { setToken } from "@4eplatform/shared/index";
import RedirectLoginPopup from "./RedirectLoginPopup";
import { encryptUsingAES256 } from "../../../helpers/encrypt";
import { AuthUser } from "../../../features/user/auth";
import { Autoplay } from "swiper/modules";
import { useUser } from "@npm-react/react-redux-routing";

export function Login() {
  let { setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [finalSlides, setFinalSlides] = useState<any[]>([]);

  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [isNotValid, setIsNotValid] = useState(false);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const defaultIndexRef = useRef(0);

  const onSubmit = async (data: any) => {
    setIsNotValid(false);
    // data.domainId = checkUsername(data.username);
    // if (data?.domainId == null && data?.username?.includes("@4explain.com")) {
    //   data.username = data?.username?.replace("@4explain.com", "");
    // } else if (data?.username?.includes("@local.rega.sa.com")) {
    //   data.username = data?.username?.replace("@local.rega.sa.com", "");
    // }
    let loginUser = {
      username: data?.username?.split("@")[0],
      password: encryptUsingAES256(data?.password),
    };
    dispatch(AuthUser(loginUser) as any).then((response: any) => {
      if (response?.payload?.result && response?.payload?.statusEnum === 3) {
        const token = response?.payload?.result?.token;
        localStorage.removeItem("auto_logout_handled");
        localStorage.setItem(
          "bg_theme",
          response?.payload?.result?.languageImage
        );
        localStorage.setItem(
          "Theme",
          response?.payload?.result?.nightMode == true ? "dark" : "light"
        );
        localStorage.setItem(
          "i18nextLng",
          response?.payload?.result?.nameEn == "Arabic " ? "ar" : "en"
        );
        localStorage.setItem(
          "selectedLang",
          response?.payload?.result?.nameEn == "Arabic " ? "Ar" : "En"
        );
        localStorage.setItem("workspaceKey", "89");
        // localStorage.setItem(
        //   "i18nConfig",
        //   JSON.stringify({
        //     selectedLang:
        //       response?.payload?.result?.nameEn == "Arabic " ? "ar" : "en",
        //   })
        // );

        Swal.fire({
          title: intl.formatMessage({ id: "loginSuccessfully" }),
          text: intl.formatMessage({ id: "redirectToHomePage" }),
          icon: "success",
          showCancelButton: false,
          showConfirmButton: false,
        });

        var password = encryptUsingAES256(data?.password);
        const user = {
          username: data?.username?.split("@")[0],
          password: password,
        };
        setToken(token);
        setUser(user);

        setTimeout(() => {
          window.location.href = "/committee";
          // dispatch(fetchHomeSettings("") as any)
        }, 1000);
        localStorage.removeItem("hasSeenPopup");
      } else if (
        response?.payload?.result == null &&
        response?.payload?.statusEnum === 1 &&
        response?.payload?.message == "userAddedSuccessfully"
      ) {
        // else if(response?.payload?.result==null && response?.payload?.statusEnum === 1 ){
        setModalShow(true);
      } else if (response?.payload?.statusEnum === 4) {
        Swal.fire({
          title: intl.formatMessage({ id: response?.payload?.message }),
          text: "",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: intl.formatMessage({ id: "Ok" }),
        });
      } else if (response?.payload?.statusEnum === 5) {
        setIsNotValid(true);
      } else {
        setIsNotValid(true);
      }
    });
  };

  const [isLoading, setIsLoading] = useState(true);

  let platforms = useSelector((state: RootState) => {
    return state?.Platform?.data;
  });

  const baseURL = (window as any)._env_?.REACT_APP_API_PlatForm_Url + "/";

  const defaultSlides = [
    {
      id: "1",
      image: toAbsoluteUrl("/media/img/labtop.webp"),
      descriptionEn: "",
      descriptionAr: "",
    },
    {
      id: "2",
      image: toAbsoluteUrl("/media/img/man.webp"),
      descriptionEn: "",
      descriptionAr: "",
    },
    {
      id: "3",
      image: toAbsoluteUrl("/media/img/blue-slider.webp"),
      descriptionEn: "",
      descriptionAr: "",
    },
    {
      id: "4",
      image: toAbsoluteUrl("/media/img/earth.webp"),
      descriptionEn: "",
      descriptionAr: "",
    },
  ];

  const validSlides = useMemo(() => {
    return (
      platforms?.mainSettingLogins?.filter(
        (slide: any) => slide?.subSystemId
      ) ?? []
    );
  }, [platforms?.mainSettingLogins]);

  const slidesToShow = useMemo(() => {
    return validSlides.length > 0 ? validSlides : defaultSlides;
  }, [validSlides]);

  const testImageUrl = (url: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => {
        const fallback =
          defaultSlides[defaultIndexRef.current % defaultSlides.length].image;
        defaultIndexRef.current++;
        resolve(fallback);
      };
      img.src = url;
    });
  };

  useEffect(() => {
    if (slidesToShow?.length > 0) {
      const validateImages = async () => {
        const rawSlides = slidesToShow.map((slide) => {
          const rawUrl = slide?.image?.startsWith("www")
            ? `${baseURL}${slide.image}`
            : slide.image;
          return { ...slide, rawUrl };
        });

        const validatedSlides = await Promise.all(
          rawSlides.map(async (slide) => {
            const finalImage = await testImageUrl(slide.rawUrl);
            return { ...slide, image: finalImage };
          })
        );

        setFinalSlides(validatedSlides);
        setIsLoading(false);
      };

      validateImages();
    } else {
      setFinalSlides(defaultSlides);
      setIsLoading(false);
    }
  }, [slidesToShow, baseURL]);

  useEffect(() => {
    if (platforms) {
      document.title = platforms?.webTitle || "4eBcore";
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          platforms?.webDescription || ""
        );
      }

      document
        .querySelectorAll("link[rel='icon']")
        .forEach((el) => el.remove());

      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.type = "image/png";
      newFavicon.href =
        platforms?.iconTitle !== ""
          ? `${PlatformRootUrl}${platforms?.iconTitle}`
          : toAbsoluteUrl("/media/theme-img/iconTitle.webp");

      newFavicon.onerror = () => {
        newFavicon.remove();
        const fallbackFavicon = document.createElement("link");
        fallbackFavicon.rel = "icon";
        fallbackFavicon.type = "image/png";
        fallbackFavicon.href = toAbsoluteUrl("/media/theme-img/iconTitle.webp");
        document.head.appendChild(fallbackFavicon);
      };

      document.head.appendChild(newFavicon);
    }
  }, [platforms]);

  return (
    <>
      {platforms?.signInMode === 1 && (
        <div className="row g-0 vh-100 vw-100">
          <div className="col-12 col-md-5 col-lg-4 p-0 h-100">
            <div className="h-100 bg-light d-flex flex-column flex-center w-100 p-7">
              <div className="d-flex flex-center flex-column align-items-stretch h-100 w-100 px-0 px-lg-15 px-md-10">
                <div className="d-flex justify-content-between align-items-center">
                  <img
                    className="block"
                    src={
                      platforms?.logoSystemLogin
                        ? `${baseURL}${platforms?.logoSystemLogin}`
                        : toAbsoluteUrl("/media/img/4explain-logo.png")
                    }
                    onError={(
                      e: React.SyntheticEvent<HTMLDivElement, Event>
                    ) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = toAbsoluteUrl(
                        "/media/img/4explain-logo.png"
                      );
                    }}
                    alt="Platform Header"
                    width={120}
                    // height={60}
                    style={{
                      minHeight: "75px",
                      maxHeight: "70px",
                      maxWidth: "150px",
                    }}
                  />
                  <img
                    className="block"
                    // src={`${baseURL}${platforms?.logoWebCoverLogin}`}
                    src={
                      platforms?.logoWebCoverLogin
                        ? `${baseURL}${platforms.logoWebCoverLogin}`
                        : toAbsoluteUrl("/media/theme-img/footer.webp")
                    }
                    onError={(
                      e: React.SyntheticEvent<HTMLDivElement, Event>
                    ) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = toAbsoluteUrl(
                        "/media/theme-img/footer.webp"
                      );
                    }}
                    // src={`/media/theme-img/logo-header-col-ar.png`}
                    // onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    //   e.currentTarget.src = "/media/theme-img/logo-header-col-ar.png"
                    // }}
                    alt="Platform Header"
                    width={120}
                    // height={60}
                    style={{
                      minHeight: "75px",
                      maxHeight: "70px",
                      maxWidth: "150px",
                    }}
                  />
                </div>
                <div className="d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20">
                  <form
                    className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                    noValidate={true}
                    id="kt_sign_in_form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className=" mb-11">
                      <h1 className="text-dark fw-bolder mb-3">
                        {intl.formatMessage({ id: "SignIn" })}
                      </h1>
                      {/* <h4 className="text-primary fs-7">    {intl.formatMessage({ id: "PleaseEnterYourRealEstateGeneralAuthorityDetailsToSignIn" })}</h4> */}
                    </div>

                    <div className="fv-row mb-8 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                      <label
                        htmlFor="username"
                        className="form-label"
                        style={{
                          direction: `${
                            getCurrentSystemLanguage() == "ar" ? "rtl" : "ltr"
                          }`,
                        }}
                      >
                        {intl.formatMessage({ id: "Username" })}
                      </label>
                      <input
                        type="text"
                        //placeholder={intl.formatMessage({ id: "Username" })}
                        autoComplete="off"
                        className="form-control  w-100"
                        {...register("username", { required: true })}
                        style={{
                          direction: `${
                            getCurrentSystemLanguage() == "ar" ? "rtl" : "ltr"
                          }`,
                          backgroundColor: "white !important",
                        }}
                      />
                      {errors.username && (
                        <div className="text-danger my-3">
                          {intl.formatMessage({ id: "ThisFelidIsRequired" })}
                        </div>
                      )}

                      <div className="fv-plugins-message-container invalid-feedback"></div>
                    </div>

                    <div className="fv-row mb-3 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                      <label
                        htmlFor="password"
                        className="form-label"
                        style={{
                          direction: `${
                            getCurrentSystemLanguage() == "ar" ? "rtl" : "ltr"
                          }`,
                        }}
                      >
                        {intl.formatMessage({ id: "Password" })}
                      </label>
                      <div className="d-flex position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          autoComplete="off"
                          className="form-control bg-white"
                          {...register("password", { required: true })}
                          style={{
                            direction:
                              getCurrentSystemLanguage() === "ar"
                                ? "rtl"
                                : "ltr",
                          }}
                        />

                        <i
                          onClick={() => setShowPassword((prev) => !prev)}
                          className={`fa-solid ${
                            showPassword
                              ? "fa-eye-slash text-gray-700 eye-password"
                              : "fa-eye text-gray-500 eye-password"
                          }`}
                          style={{
                            position: "absolute",
                            [getCurrentSystemLanguage() === "ar"
                              ? "left"
                              : "right"]: 0,
                            margin: "auto",
                          }}
                        ></i>
                      </div>

                      {errors.password && (
                        <div className="text-danger my-3">
                          {intl.formatMessage({ id: "ThisFelidIsRequired" })}
                        </div>
                      )}
                      <div className="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                    <div className="mb-2 pt-2 pb-3"></div>
                    {isNotValid && (
                      <div className="text-danger my-3">
                        {intl.formatMessage({
                          id: "UsernameOrPasswordIsIncorrect",
                        })}
                      </div>
                    )}

                    <div className="d-grid mb-10">
                      <button type="submit" className="btn btn-primary">
                        <span className="indicator-label">
                          {intl.formatMessage({ id: "SignIn" })}
                        </span>

                        <span className="indicator-progress">
                          {intl.formatMessage({ id: "PleaseWait" })}
                          ...{" "}
                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <AuthFooterNew />
            </div>
          </div>
          <div className="d-none d-md-block col-md-7 col-lg-8 p-0 h-100">
            {!isLoading && finalSlides.length > 0 && (
              <Swiper
                className="mySwiper w-100 h-100"
                modules={[Autoplay]}
                autoplay={
                  platforms?.deurationSppinner &&
                  platforms.deurationSppinner > 0
                    ? {
                        delay: platforms.deurationSppinner * 1000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        stopOnLastSlide: false,
                        waitForTransition: false,
                      }
                    : {
                        delay: 5000, // fallback if platforms is missing or invalid
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        stopOnLastSlide: false,
                        waitForTransition: false,
                      }
                }
                speed={800}
                loop={true}
                initialSlide={0}
              >
                {finalSlides.map((slide, index) => (
                  <SwiperSlide key={slide.id || index} className="w-100 h-100">
                    <div className="position-relative h-100">
                      <div
                        className="position-absolute text-white"
                        style={{
                          fontSize: "60px",
                          fontWeight: "bold",
                          top: "50px",
                          right: intl.locale === "ar" ? "20px" : "unset",
                          left: intl.locale !== "ar" ? "20px" : "unset",
                        }}
                      >
                        {intl.locale === "ar"
                          ? slide.descriptionAr
                          : slide.descriptionEn}
                      </div>
                      <img
                        src={slide.image}
                        className="w-100 h-100 object-cover"
                        alt={`slide-${index}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      )}
      {(platforms?.signInMode === 0 ||
        platforms?.signInMode == null ||
        platforms?.signInMode == undefined) && (
        <div className="position-relative w-100 h-100">
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-none d-md-block"
            style={{
              backgroundImage: `url(${
                platforms?.webCoverLogin !== null
                  ? `${PlatformRootUrl}${platforms?.webCoverLogin}`
                  : toAbsoluteUrl("../media/img/0OtAa051u2t-mlVg7_TNMw3JJ.webp")
              })`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              zIndex: 0,
            }}
          ></div>
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-block d-md-none bg-light"
            style={{
              zIndex: 0,
            }}
          ></div>

          <div className="position-relative z-1 w-100 h-100 d-flex align-items-center align-items-lg-start">
            <div className="col-lg-5 col-md-6 col-sm-12 align-items-center p-10 mx-auto mx-lg-0">
              <div className="bg-body d-flex flex-column flex-center rounded-4 w-100 p-7">
                <div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-100 px-0 px-lg-15 px-md-5">
                  <div className="d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20">
                    <form
                      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                      noValidate={true}
                      id="kt_sign_in_form"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="text-center mb-11">
                        <h1 className="text-dark fw-bolder mb-3">
                          {intl.formatMessage({ id: "SignIn" })}
                        </h1>
                      </div>

                      <div className="fv-row mb-8 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                        <input
                          type="text"
                          placeholder={intl.formatMessage({ id: "Username" })}
                          autoComplete="off"
                          className="form-control bg-light w-100"
                          {...register("username", { required: true })}
                          style={{
                            direction: `${
                              getCurrentSystemLanguage() == "ar" ? "rtl" : "ltr"
                            }`,
                          }}
                        />
                        {errors.username && (
                          <div className="text-danger my-3">
                            {intl.formatMessage({ id: "ThisFelidIsRequired" })}
                          </div>
                        )}

                        <div className="fv-plugins-message-container invalid-feedback"></div>
                      </div>

                      <div className="fv-row mb-3 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                        <div className="d-flex position-relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder={intl.formatMessage({ id: "Password" })}
                            autoComplete="off"
                            className="form-control bg-light"
                            // onClick={()=>{setModalShow(true)}}
                            {...register("password", { required: true })}
                            style={{
                              direction: `${
                                getCurrentSystemLanguage() == "ar"
                                  ? "rtl"
                                  : "ltr"
                              }`,
                            }}
                          />
                          <i
                            onClick={() => setShowPassword((prev) => !prev)}
                            className={`fa-solid ${
                              showPassword
                                ? "fa-eye-slash text-gray-700"
                                : "fa-eye text-gray-500"
                            } ${
                              getCurrentSystemLanguage() == "ar"
                                ? "start-0"
                                : "end-0"
                            }  eye-password `}
                          ></i>
                        </div>

                        {errors.password && (
                          <div className="text-danger my-3">
                            {intl.formatMessage({ id: "ThisFelidIsRequired" })}
                          </div>
                        )}
                        <div className="fv-plugins-message-container invalid-feedback"></div>
                      </div>
                      <div className="mb-2 pt-2 pb-3">
                        {/* <label
                       htmlFor="domain"
                       className="form-label px-2 fontSz-6"
                     >
                       {intl.formatMessage({ id: "Domain" })}
                     </label>
      
                     <select
                       id="domain"
                       className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                       data-placeholder={intl.formatMessage({ id: "Choose" })}
                       onChange={(e) => {
                         setDomainId(e.target.value);
                       }}
                     >
                       <option disabled selected>
                         {intl.formatMessage({ id: "Choose" })}
                       </option>
                       <option value={""}>
                         {intl.formatMessage({ id: "SystemUser" })}
                       </option>
                       {domains?.map((domain: DomainsModel) => {
                         return (
                           <>
                             <option value={domain?.id}>
                               {domain?.domainNickName}
                             </option>
                           </>
                         );
                       })}
                     </select> */}
                      </div>
                      {isNotValid && (
                        <div className="text-danger my-3">
                          {intl.formatMessage({
                            id: "UsernameOrPasswordIsIncorrect",
                          })}
                        </div>
                      )}

                      <div className="d-grid mb-10">
                        <button type="submit" className="btn btn-primary">
                          <span className="indicator-label">
                            {intl.formatMessage({ id: "SignIn" })}
                          </span>

                          <span className="indicator-progress">
                            {intl.formatMessage({ id: "PleaseWait" })}
                            ...{" "}
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <AuthFooter />
              </div>
            </div>
          </div>
          {/* <div className="col-lg-7 col-md-6 col-sm-12 p-3 d-flex flex-center flex-column align-items-center align-items-center">
            <LoginLogoSide />
          </div> */}
        </div>
      )}

      <RedirectLoginPopup
        show={modalShow}
        handleClose={() => setModalShow(false)}
      />
    </>
  );
}
