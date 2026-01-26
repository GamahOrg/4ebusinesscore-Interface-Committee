import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { getAllLookUps } from "../../../features/requestTemplateSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface Iprop {
  specialized: any[];
  selectedIds?: any;
  setSelectedIds?: any;
  selectedNames?: any;
  setSelectedNames?: any;
  arrayIndex: any;
  setDestination?: any;
  searchTermForSpecified?: any;
  alterSelectedIds?: string;
  setAlterSelectedIds?: any;
}

const SpecifiedOption: FC<Iprop> = ({
  specialized,
  selectedIds,
  setSelectedIds,
  selectedNames,
  setSelectedNames,
  arrayIndex,
  setDestination,
  searchTermForSpecified,
  alterSelectedIds,
  setAlterSelectedIds,
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  let lookups = useSelector(
    (state: RootState) => state?.requestTemplate2?.lookups,
  );
  useEffect(() => {
    dispatch(getAllLookUps() as any);
  }, [dispatch]);
  // let addedItem={
  //   cssClasses: null,
  //   id: "2e552f8a-7b3c-4b56-a4d8-38086bd6c840",
  //   nameAr: "المدير المباشر",
  //   nameEn: "Direct Manager"}

  // let [allSpecializations,setAllSpecializations]=useState<any>([])
  // useEffect(()=>{
  //   setAllSpecializations([
  //     {
  //       cssClasses: null,
  //       id: "2e552f8a-7b3c-4b56-a4d8-38086bd6c840",
  //       nameAr: "المدير المباشر",
  //       nameEn: "Direct Manager"
  //     },
  //     ...specialized
  //   ])
  // },[specialized])
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
  const [isCareerProgressionVisible, setIsCareerProgressionVisible] =
    useState(false);
  // const handleCheckboxChange = (e: any) => {
  //   setIsCareerProgressionVisible(!isCareerProgressionVisible);
  // };

  const handleCheckboxChange = () => {
    setIsCareerProgressionVisible((prev) => {
      const newState = !prev;
      // if (newState) {
      //   setSelectedIds("");
      //   setSelectedNames("");
      //   setActionType(3);
      // }
      return newState;
    });
  };

  return (
    <div className="row align-items-center mb-3">
      {searchedItems?.map((item: any) => (
        <div className="col-12 col-sm-3 my-5">
          <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
            <input
              className="form-check-input"
              type="radio"
              name="option"
              id={`Checkboxes_${item?.id}`}
              onClick={() => {
                setSelectedIds(item?.id); // Use an array for radio buttons
                setSelectedNames(item?.nameAr);
                setDestination(item, 3, arrayIndex);
                setIsCareerProgressionVisible(false);
              }}
            />
          </div>
          <label htmlFor={`Checkboxes_${item.id}`}>
            {item?.nameAr != "المدير المباشر" && item?.nameAr != "القائم بالطلب"
              ? intl.formatMessage({ id: "Managment" })
              : ""}{" "}
            {item?.nameAr}
          </label>
        </div>
      ))}

      <div className="col-12 d-flex gap-2">
        <div className="d-flex align-items-center">
          <input
            className="form-check-input mx-1"
            type="radio"
            name="option"
            id={`Checkboxes_CareerProgression`}
            onChange={handleCheckboxChange}
            checked={isCareerProgressionVisible}
          />
          <label className="fs-6 fw-bold mx-1" htmlFor="CareerProgression">
            {intl.formatMessage({
              id: "CareerProgression",
            })}{" "}
          </label>
        </div>
        {isCareerProgressionVisible && (
          <div className="d-flex gap-3">
            <select
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedName =
                  e.target.options[e.target.selectedIndex].text;
                setSelectedIds(selectedId);
                setSelectedNames(selectedName);
                setDestination(
                  {
                    id: e.target.value,
                    nameAr: e.target.options[e.target.selectedIndex].text,
                    nameEn: e.target.options[e.target.selectedIndex].text,
                  },
                  3,
                  arrayIndex,
                  alterSelectedIds,
                );
              }}
              className="form-select form-select-solid"
              name="CareerProgression"
            >
              <option value="">
                {intl.formatMessage({
                  id: "Choose",
                })}
              </option>
              {lookups?.map((lookup: any) => (
                <option key={lookup?.id} value={lookup?.id}>
                  {intl.locale == "ar" ? lookup?.nameAr : lookup?.nameEn}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => {
                const alterSelectedId = e.target.value;
                setAlterSelectedIds(alterSelectedId);
                // setActionType(3);
                setDestination(
                  {
                    id: selectedIds,
                    nameAr: selectedNames,
                    nameEn: selectedNames,
                  },
                  3,
                  arrayIndex,
                  alterSelectedId,
                );
              }}
              defaultValue={alterSelectedIds}
              className="form-select form-select-solid"
              name="CareerProgression2"
            >
              <option value="">
                {intl.formatMessage({
                  id: "Choose",
                })}
              </option>
              {lookups?.map((lookup: any) => (
                <option key={lookup?.id} value={lookup?.id}>
                  {intl.locale == "ar" ? lookup?.nameAr : lookup?.nameEn}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecifiedOption;
