import { useIntl } from "react-intl";
import { MyFavoriteDrawer } from "./MyFavoriteDrawer";
import { useToolbar } from "@4eplatform/gateway/src/app/layout/core/ToolbarProvider";

const ToggleMyFavoriteDrawer = ({
  getFavouritesList,
  setFavouritesList,
  favorite,
  setFavourite,
}: any) => {
  const intl = useIntl();

  const { showMyFavorite: show, setShowMyFavorite: setShow } = useToolbar();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="engage-help-toggle btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm px-5 rounded-top-0"
      >
        {intl.formatMessage({ id: "MyFavourite" })}
      </button>
      <MyFavoriteDrawer
        show={show}
        handleClose={handleClose}
        getFavouritesList={getFavouritesList}
        setFavouritesList={setFavouritesList}
        favorite={favorite}
        setFavourite={setFavourite}
      />
    </>
  );
};
export { ToggleMyFavoriteDrawer };
