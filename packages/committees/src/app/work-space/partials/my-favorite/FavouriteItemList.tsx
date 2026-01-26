import React, { useEffect, useState } from "react";
import { CeoSystemTools } from "../tools-box/components/CeoSystemTools";
import {
  deleteFromFavourites,
  getFavouriteList,
} from "../../../../slices/favouritesListSlice";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { showSuccessAlert } from "@4eplatform/shared";
import { ResponseStatus } from "../../../../models/response-status";

interface FavouriteItemListProps {
  favourite: any;
  setFavouritesList: any;
}

const FavouriteItemList: React.FC<FavouriteItemListProps> = ({
  favourite,
  setFavouritesList,
}) => {
  let [isFavourite, setIsFavourite] = useState(true);
  const intl = useIntl();

  const dispatch = useDispatch();

  const removeFromFavHandler = async (id: string) => {
    const response = await dispatch(deleteFromFavourites(id) as any);
    if (response?.payload.statusEnum === ResponseStatus.Success) {
      showSuccessAlert(true, response?.payload?.message, intl);
      await dispatch(getFavouriteList() as any);
    } else {
      showSuccessAlert(false, "Failed to delete item.", intl);
      setIsFavourite(true);
    }
  };

  useEffect(() => {
    setIsFavourite(true);
  }, [favourite]);
  return (
    <div className="d-flex align-items-center mb-7">
      <div className="d-flex flex-stack flex-grow-1 me-5 ms-lg-6">
        <CeoSystemTools
          id={favourite.workspaceId}
          title={
            intl.locale == "ar" ? favourite.noteNameAr : favourite.noteNameEn
          }
          icon={favourite.icon as any}
          link={favourite.url}
          color={favourite.color}
          transition={favourite.transition}
        />

        <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-lg">
          <input
            id={`${favourite.workspaceId}`}
            className="form-check-input widget-9-check xCheckBg"
            type="checkbox"
            value={favourite.title}
            name="getMyToolsList"
            checked={isFavourite}
            onChange={(e) => {
              if (!e.target.checked) {
                setIsFavourite(false);
                removeFromFavHandler(favourite.workspaceId);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FavouriteItemList;
