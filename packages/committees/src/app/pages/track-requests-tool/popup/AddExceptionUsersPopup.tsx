import { ChangeEvent, FC, RefObject, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { exceptionUsersModel } from "../../../models//exceptionUsersModel";
import { getExceptionUsersRequestTemplate } from "../../../features/requestTemplateSlice";
import { RootState } from "../../../store/store";
import React from "react";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

type AddExceptionUsersPopupProps = {
  show: boolean;
  setExceptionActionTacker?: any;
  setExceptionUsers?: any;
  handleClose: () => void;
  index: number;
};
const AddExceptionUsersPopup: FC<AddExceptionUsersPopupProps> = ({
  show,
  setExceptionActionTacker,
  setExceptionUsers,
  handleClose,
  index,
}) => {
  const intl = useIntl();
  const selectAllRef: RefObject<HTMLInputElement> = useRef(null);
  const showAlert = (messageAddFail: boolean, text: string) => {
    Swal.fire({
      text: text,
      icon: messageAddFail ? "warning" : "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: `btn ${messageAddFail ? "btn-primary" : "btn-primary"}`,
      },
    }).then((result) => {
      if (!messageAddFail && result.isConfirmed) {
        handleClose();
      }
    });
  };

  const [recordsTableData, setRecordsTableData] = useState<
    exceptionUsersModel[]
  >([]);
  const [allRecordsTableData, setAllRecordsTableData] = useState<any>([]);

  const [checkedUserIds, setCheckedUserIds] = useState<string[]>([]);

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleReset = () => {
    setRecordsTableData([]);
    setAllRecordsTableData([]);
    setCheckedUserIds([]);
  };

  function selectAllRecord(e: ChangeEvent<HTMLInputElement>) {
    if (Array.isArray(recordsTableData) && recordsTableData?.length > 0) {
      const isChecked = e.target.checked;
      const newCheckedUserIds = isChecked
        ? recordsTableData?.map((item: exceptionUsersModel) => item?.userId)
        : [];

      const items: exceptionUsersModel[] = recordsTableData?.map(
        (item: exceptionUsersModel): exceptionUsersModel => {
          item.isChecked = isChecked;
          return item;
        }
      );

      setRecordsTableData([...items]);
      setCheckedUserIds(newCheckedUserIds);
    }
  }
  function handleSelectRecord(input: exceptionUsersModel) {
    const newCheckedUserIds = checkedUserIds?.includes(input?.userId)
      ? checkedUserIds?.filter((id) => id !== input?.userId)
      : [...checkedUserIds, input?.userId];
    setCheckedUserIds(newCheckedUserIds);
  }
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  let exceptionUsers = useSelector((state: RootState) => {
    return state?.requestTemplate?.exceptionUsers;
  });

  useEffect(() => {
    let params: any = {
      // pageSize: pageSize,
      // pageNumber: pageIndex,
      // Search: searchText,
    };
    dispatch(getExceptionUsersRequestTemplate(params) as any);
  }, [pageIndex, pageSize, searchText, dispatch]);

  const deepEqual = (obj1: any, obj2: any) => {
    if (obj1 === obj2) return true;

    if (
      typeof obj1 !== "object" ||
      obj1 === null ||
      typeof obj2 !== "object" ||
      obj2 === null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  };
  useEffect(() => {
    const updatedRecords = recordsTableData?.map((user) => ({
      ...user,
      isChecked: checkedUserIds?.includes(user?.userId),
    }));
    const updatedAllRecords = allRecordsTableData?.map((user: any) => ({
      ...user,
      isChecked: checkedUserIds?.includes(user?.userId),
    }));

    if (!deepEqual(updatedRecords, recordsTableData)) {
      setRecordsTableData(updatedRecords);
      setAllRecordsTableData(updatedAllRecords);
    }
  }, [checkedUserIds, recordsTableData]);

  useEffect(() => {
    if (recordsTableData?.length > 0) {
      setAllRecordsTableData([...recordsTableData, ...exceptionUsers]);
    } else {
      setAllRecordsTableData(exceptionUsers);
    }
    setRecordsTableData(exceptionUsers);
  }, [exceptionUsers]);
  useEffect(() => {
    setExceptionActionTacker(checkedUserIds, index);
  }, [checkedUserIds]);
  // useEffect(()=>{
  //  setCheckedUserIds(exceptionUsers?.map((user)=>{return user?.userId}))
  // },[exceptionUsers])
  useEffect(() => {
    return () => {
      handleReset();
    };
  }, []);

  return (
    <div className="modal-dialog modal-xl" style={{ width: "80%" }}>
      <Modal
        centered
        show={show}
        onHide={() => {
          handleClose();
        }}
        size="xl"
      >
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="fw-bolder  pb-8">
            <h1 className="mb-3 text-center ">
              {intl.formatMessage({ id: "AddUser" })}
            </h1>
          </div>

          <div className="mb-10">
            <div className="py-3"></div>
            <div className="table-responsive fs-6 ">
              <table className="table table-borderless align-middle">
                <thead className="p-2 text-center fw-bolder border">
                  <tr>
                    <td className="p-2">
                      <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                        <input
                          className="form-check-input widget-9-check xCheckBg"
                          type="checkbox"
                          defaultValue={0}
                          ref={selectAllRef}
                          onChange={selectAllRecord}
                          checked={
                            checkedUserIds?.length === recordsTableData?.length
                          } // Check if all checkboxes are checked
                        />
                      </div>
                    </td>
                    <td className="p-5">
                      {intl.formatMessage({
                        id: "Name",
                      })}
                    </td>
                  </tr>
                </thead>
                <tbody className="p-4  text-center border">
                  {Array.isArray(recordsTableData) &&
                    recordsTableData
                      // ?.filter((user) =>
                      //   user.name
                      //     .toLowerCase()
                      //     .includes(searchText.toLowerCase())
                      // )
                      ?.map((user, index: number) => (
                        <tr
                          key={user?.userId}
                          className="text-center fw-lighter"
                        >
                          <td className="p-2">
                            <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                              <input
                                className="form-check-input widget-9-check xCheckBg"
                                type="checkbox"
                                name={user?.userName}
                                checked={user?.isChecked}
                                onClick={() => handleSelectRecord(user)}
                              />
                            </div>
                          </td>
                          <td className="d-flex  py-4">
                            <div className="d-flex">
                              <div className="symbol symbol-45px symbol-circle ms-2">
                                <img
                                  alt="Pic"
                                  src={
                                    user?.imageUrl
                                      ? `${UserManagmentRootUrl}${user?.imageUrl}`
                                      : toAbsoluteUrl(`/media/avatars/user.jpg`)
                                  }
                                  onError={(e: any) =>
                                    (e.target.src = toAbsoluteUrl(`/media/avatars/user.jpg`))
                                  }
                                />
                              </div>
                              <div>
                                <div className="fs-5 fw-bolder mb-2 d-flex justify-content-start">
                                  {user?.userFullName}
                                </div>
                                <div className="fw-bold text-muted">
                                  {user?.email}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              {/* {exceptionUsers? (
                  <SystemPagination
                    totalItems={UserNOInRole?.UserNoInRoles?.totalItems}
                    totalPages={UserNOInRole?.UserNoInRoles?.totalPages}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    setPageIndex={setPageIndex}
                    setPageSize={setPageSize}
                  />
                ) : (
                  <div className="d-flex fw-bolder justify-content-center align-items-center">
                    {intl.formatMessage({ id: "No_data_yet" })}
                  </div>
                )} */}
              <div className="d-flex justify-content-center mt-5">
                <button
                  type="reset"
                  onClick={() => {
                    handleClose();
                  }}
                  className="btn btn-secondary px-15 me-5"
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button
                  disabled={checkedUserIds?.length === 0}
                  onClick={() => {
                    showAlert(
                      false,
                      intl.formatMessage({ id: "AddedSuccessfully" })
                    );
                    handleClose();
                  }}
                  className="btn btn-success px-15 ms-5"
                >
                  {intl.formatMessage({ id: "Add" })}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddExceptionUsersPopup;
