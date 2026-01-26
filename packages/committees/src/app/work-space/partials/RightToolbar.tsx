import { FC } from "react";
import { ToolsBoxToggleDrawer } from "./tools-box/ToolsBoxToggleDrawer";
import { useIntl } from "react-intl";

const RightToolbar: FC<any> = ({
  favorite,
  setFavourite,
  removeFromCardList,
  removeFromTableList,
  getMyToolsList,
  setMyToolsList,
  getFavouritesList,
  setFavouritesList,
}) => {
  const { locale } = useIntl();

  return (
    <>
      <div
        style={{
          left: locale == "ar" ? "0%" : "",
          right: locale == "en" ? "0%" : "",
          top: "40%",
        }}
        className="engage-toolbar d-flex position-fixed px-5 fw-bolder zindex-2 transform-90 mt-0 gap-2"
      >
        <ToolsBoxToggleDrawer
          removeFromCardList={removeFromCardList}
          removeFromTableList={removeFromTableList}
          getMyToolsList={getMyToolsList}
          setMyToolsList={setMyToolsList}
        />
        {/* <ToggleMyFavoriteDrawer
          getFavouritesList={getFavouritesList}
          setFavouritesList={setFavouritesList}
          favorite={favorite}
          setFavourite={setFavourite}
        /> */}
      </div>

      {/* <ToolsBoxDrawer removeFromCardList={removeFromCardList} removeFromTableList={removeFromTableList} /> */}
      {/* <MyFavoriteDrawer /> */}
    </>
  );
};

export { RightToolbar };
