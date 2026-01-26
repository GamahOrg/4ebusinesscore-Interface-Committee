import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { NotificationList } from "./notification-list";
import { useDispatch, useSelector } from "react-redux";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { RootState } from "../../../store/store";
import {
  getNotifications,
  resetNewNotificationCount,
} from "../../../features/notifiactionsSlice";
import { fetchIncomingRequestsWithFilter } from "@4eplatform/committees/src/app/features/requests-slice";

export const NotificationComponent: FC = () => {
  const intl = useIntl();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  let [incomingRequests,setIncomingRequests]=useState([])

  let notifications:any = useSelector((state: RootState) => {
    return state?.notifications?.notifications;
  });
  let pagination = useSelector((state: RootState) => {
    return state?.notifications?.pagination;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotifications({ pageIndex, pageSize }) as any);
  }, [pageIndex, pageSize]);

  useEffect(() => {
    dispatch(resetNewNotificationCount(null) as any);
    dispatch(fetchIncomingRequestsWithFilter({
        params:  {pageIndex: 1, pageSize: 1000000},
        body: {},
      }) as any).then((res:any)=>{setIncomingRequests(res?.payload?.result)});
  }, []);

  return (
    <div
      id="kt_content_container"
      className="d-flex flex-column-fluid align-items-start container-xxl p-0"
    >
      <div className="content flex-row-fluid" id="kt_content">
        <div
          className="flex-lg-row-fluid"
          data-select2-id="select2-data-129-tmo1"
        >
          <div className="card mb-5 mb-xl-8">
            <div className="card-body py-3">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="all-cases"
                  role="tabpanel"
                >
                  <div className="table-responsive ">
                    {notifications?.length ? (
                      <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                          <tr className="fw-bolder text-muted">
                            <th className="w-25px"></th>
                            <th className="ps-4 min-w-200px">
                              {intl.formatMessage({ id: "Servicename" })}{" "}
                            </th>

                            <th className="min-w-150px text-center">
                              {intl.formatMessage({ id: "NotificationName" })}{" "}
                            </th>
                            <th className="min-w-150px text-center">
                              {intl.formatMessage({ id: "Date" })}
                            </th>
                            <th className="min-w-150px text-center">
                              {intl.formatMessage({ id: "Orders" })}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {notifications?.length &&
                            notifications.map((notification:any) => (
                              <tr
                                data-notification-id={notification.id}
                                key={notification.id}
                                className={`${notification?.readed ? "" : "bg-light-dark notification-not-readed"} `}
                              >
                                <td>
                                  <div className="form-check form-check-sm form-check-custom form-check-solid"></div>
                                </td>
                                <NotificationList notification={notification} {...{incomingRequests,setIncomingRequests}}/>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    ) : (
                      <span className="d-flex justify-content-center py-10 text-muted">
                        {intl.formatMessage({ id: "NotExist" })}{" "}
                        <i className="fa-solid fa-ban px-3 fs-4"></i>
                      </span>
                    )}

                    {notifications?.length ? (
                      <SystemPagination
                        totalItems={pagination?.totalItems}
                        totalPages={pagination?.totalPages}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        setPageIndex={setPageIndex}
                        setPageSize={setPageSize}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
