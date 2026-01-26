import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

interface WorkSpaceToolbar1Props {
  workspace: any;
}

const WorkSpaceToolbar1: FC<WorkSpaceToolbar1Props> = ({ workspace }) => {
  const intl = useIntl();

  // let dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchUserView("") as any);
  // }, []);

  // let userBasicInfo = useSelector((state: RootState) => {
  //   return state?.userView?.data as any;
  // });

  // const checkUndefinedName = (name: any) => {    
  //   if (name == "undefined" || name == "null" || name == undefined || name ==null) {
  //     return "";
  //   } else {
  //     return name;
  //   }
  // };

// const [userData  , setUserData ] = useState({
//   firstName:"",
//   secondName:"", 
//   thirdName:"",
//   fourthName:"",
//   userName:"",
//   commonNameAD:""
// })

// useEffect(()=>{
//   setUserData({
//     firstName:checkUndefinedName(
//       userBasicInfo?.basicInformationDTO?.firstName
//     ),
//     secondName:checkUndefinedName(
//       userBasicInfo?.basicInformationDTO?.secondName
//     ), 
//     thirdName:checkUndefinedName(
//       userBasicInfo?.basicInformationDTO?.thirdName
//     ),
//     fourthName:checkUndefinedName(
//       userBasicInfo?.basicInformationDTO?.forthName
//     ),
//     userName:checkUndefinedName(
//       userBasicInfo?.basicInformationDTO?.userName
//     ),
//     commonNameAD:checkUndefinedName(
//       userBasicInfo?.basicInformationDTO?.commonNameAD
//     )
//   })
// },[userBasicInfo])


  const ClassificationName = localStorage.getItem("ClassificationName");
  const isSubSystem = localStorage.getItem("isSubSystem");

  return (
    <>
      <div className="page-title d-flex flex-column me-3">
        <h1 className="d-flex text-white fw-bolder my-1 fs-2">
          {/* {intl.formatMessage({ id: "DynamicWorkspace" })} */}
          {/* {firstName || secondName || thirdName || fourthName
            ? `${firstName} ${secondName} ${thirdName} ${fourthName}`.trim()
            : userName} */}
          {/* {userData.commonNameAD
            ? userData.commonNameAD
            : `${userData.firstName} ${userData.secondName} ${checkUndefinedName(userData.thirdName)} ${userData.fourthName}`.trim()} */}
            {isSubSystem == "true" ?
             intl.locale == "ar"
              ? workspace?.items?.[0]?.parentNoteNameAr
              : workspace?.items?.[0]?.parentNoteNameEn
              : ClassificationName
            }
        </h1>
        <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
          <li className="breadcrumb-item text-white opacity-75">
            <div
              // to="/home-workspace"
              onClick={() => {
                window.location.href =  
                (window as any)._env_.REACT_APP_Base_Url + "/home-workspace"
              }}
              className="text-white text-hover-primary cursor-pointer"
            >
              {intl.formatMessage({ id: "Home" })}
            </div>
          </li>
          <li className="breadcrumb-item">
            <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
          </li>
          <li className="breadcrumb-item text-white opacity-75">
            {intl.formatMessage({ id: "Workspace" })}
          </li>
        </ul>
      </div>
    </>
  );
};

export { WorkSpaceToolbar1 };
