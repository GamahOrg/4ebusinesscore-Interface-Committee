import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";

interface Iprop {
  specialized: any[];
  setSelectedIds?: any;
  setSelectedNames?: any;
  setActionType?: any;
  actionTakerId?: string;
  searchTermForSpecified?: any;
}

const SpecificedOptionForEdit: FC<Iprop> = ({
  specialized,
  setSelectedIds,
  setSelectedNames,
  setActionType,
  actionTakerId,
  searchTermForSpecified,
}) => {
  const intl = useIntl();
  // let addedItem = {
  //   cssClasses: null,
  //   id: "2e552f8a-7b3c-4b56-a4d8-38086bd6c840",
  //   nameAr: "المدير المباشر",
  //   nameEn: "Direct Manager",
  // };

  let [searchedItems, setSearchedItems] = useState<any>([]);
  useEffect(() => {
    setSearchedItems(() => {
      if (searchTermForSpecified == "") {
        return [
          {
            cssClasses: null,
            id: "2e552f8a-7b3c-4b56-a4d8-38086bd6c840",
            nameAr: "المدير المباشر",
            nameEn: "Direct Manager",
          },
          {
            cssClasses: null,
            id: "2e255f8a-2b3c-6b56-a4d8-38086bd6c840",
            nameAr: "القائم بالطلب",
            nameEn: "Requester",
          },
          // ...specialized,
        ];
      } else {
        return [
          {
            cssClasses: null,
            id: "2e552f8a-7b3c-4b56-a4d8-38086bd6c840",
            nameAr: "المدير المباشر",
            nameEn: "Direct Manager",
          },
          {
            cssClasses: null,
            id: "2e255f8a-2b3c-6b56-a4d8-38086bd6c840",
            nameAr: "القائم بالطلب",
            nameEn: "Requester",
          },
          // ...specialized,
        ]?.filter((specialization) => {
          const nameAr = specialization.nameAr?.toLowerCase();
          return (
            typeof nameAr === "string" &&
            nameAr.includes(searchTermForSpecified.toLowerCase())
          );
        });
      }
    });
  }, [searchTermForSpecified]);
  return (
    <div className="row ">
      {searchedItems?.map((item: any) => (
        <div className="col-12 col-sm-4 my-5">
          <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
            <input
              className="form-check-input"
              type="radio"
              name="option"
              id={`Checkboxes_${item?.id}`}
              onChange={() => {
                setSelectedIds(item?.id); // Use an array for radio buttons
                setSelectedNames(item?.nameAr);
                setActionType(3);
              }}
              checked={item?.id === actionTakerId}
            />
          </div>
          <label htmlFor="option">
            {/* {intl.formatMessage({ id: "Managment" })} */}
             {/* {item?.nameAr} */}
            {item?.nameAr!="المدير المباشر" && item?.nameAr!="القائم بالطلب"?intl.formatMessage({ id: "Managment" }):""} {item?.nameAr}

          </label>
        </div>
      ))}
    </div>
  );
};

export default SpecificedOptionForEdit;
