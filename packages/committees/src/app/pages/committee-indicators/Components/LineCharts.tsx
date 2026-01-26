import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getAllCommitteeDataIndicators } from "../../../features/CommitteeIndicators/CommitteeIndicators";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { RootState } from "@4eplatform/shared/store/storeRegistry";
import { Spinner } from 'react-bootstrap';
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import moment from "moment";

const CustomLineChart = () => {
     const dispatch = useDispatch();
  const intl = useIntl();

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

      const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  

  useEffect(() =>{
    let paramter = {
      PageNumber: pageIndex,
      pageSize: pageSize
    }
    dispatch(getAllCommitteeDataIndicators(paramter) as any )
  } , [dispatch , pageSize , pageIndex])

  const {allCommittee} = useSelector((state: RootState) => state?.committeesIndicatorsSlice?.AllCommitteeDataIndicators || {})
  const AllCommitteeDataIndicatorsStatus = useSelector((state: RootState) => state?.committeesIndicatorsSlice?.status?.getAllCommitteeDataIndicatorsStatus)
 const {totalItems , totalPages} = useSelector((state: RootState) => state?.committeesIndicatorsSlice?.pagination)
 

  return <>
  <div className="card card-xl-stretch mb-xl-0">
           {AllCommitteeDataIndicatorsStatus === 2 ? ( 
           
              <> 
             
                <div className="card-body py-3 px-3 mx-8">
                  <div className="tab-content">
                    <div
                      className="tab-pane fade active show"
                      id="REGA_table_widget_5_tab_1"
                    >
                      <div className="table-responsive mt-4">
                        <table
                          className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-7"
                          id="REGA-WS-caseList"
                        >
                          <thead>
                            <tr className="fw-bolder text-muted">
                              <th className="min-w-50px text-center">
                                {intl.formatMessage({ id: "committeeName" })}
                              </th>
                              <th className="min-w-150px text-center">
                                {intl.formatMessage({ id: "committeeNumber" })}
                              </th>
                              <th className="min-w-150px text-center">
                                {intl.formatMessage({ id: "requestStatus" })}
                              </th>
                              <th className="min-w-150px text-center">
                                {intl.formatMessage({ id: "committeeType" })}
                              </th>
                              <th className="min-w-150px text-center">
                                {intl.formatMessage({ id: "lecturersCountting" })}
                              </th>
                              <th className="min-w-100px text-center">
                                {intl.formatMessage({ id: "meetingCount" })}
                              </th>
                              <th className="min-w-100px text-center">
                                {intl.formatMessage({ id: "outputCount" })}
                              </th>
                              <th className="min-w-100px text-center">
                                {intl.formatMessage({ id: "membersCount" })}
                              </th>
                              <th className="min-w-100px text-center">
                                {intl.formatMessage({ id: "committeeChairmanName" })}
                              </th>
                              <th className="min-w-100px text-center">
                                {intl.formatMessage({ id: "committeeSecretaryName" })}
                              </th>
                              <th className="min-w-100px text-center">
                                {intl.formatMessage({ id: "lastMeetingDate" })}
                              </th>
                              {/* <th className="min-w-100px text-center">
                                {intl.formatMessage({ id: "missions" })}
                              </th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {allCommittee?.map((committee: any) => {                              
                              return (
                                <tr >

        <td className="align-middle">
            <p className="text-center text-primary">{committee?.committeeName}</p>
        </td>

        <td className="align-middle">
          <p className="text-center">{committee?.committeeNumber}</p>
        </td>



        <td className="align-middle">
          <p className="text-center">
            {committee?.requestStatus === 0 && (
              <span className="badgex badge-light-primary">
                {intl.formatMessage({ id: "UnderStudying" })}
              </span>
            )}
            {committee?.requestStatus === 1 && (
              <span className="badgex badge-light-success">
                {intl.formatMessage({ id: "Accepted" })}
              </span>
            )}
            {committee?.requestStatus === 2 && (
              <span className="badgex badge-light-danger">
                {intl.formatMessage({ id: "Rejected" })}
              </span>
            )}
            {committee?.requestStatus === 3 && (
              <span className="badgex badge-light-danger">
                {intl.formatMessage({ id: "RequireEdit" })}
              </span>
            )}
            {committee?.requestStatus === 4 && (
              <span className="badgex badge-light-danger">
                {intl.formatMessage({ id: "Redirected" })}
              </span>
            )}
          </p>
        </td>

        <td className="align-middle">
          <p className="text-center">
             {committee?.committeeType === 0 && (
              <span className="badgex badge-light-primary">
                {intl.formatMessage({ id: "Always" })}
              </span>
            )}
            {committee?.committeeType === 1 && (
              <span className="badgex badge-light-success">
                {intl.formatMessage({ id: "Temporary" })}
              </span>
            )}
            {committee?.committeeType === 2 && (
              <span className="badgex badge-light-danger">
                {intl.formatMessage({ id: "ProjectTemporary" })}
              </span>
            )}
        
          </p>
        </td>

        <td className="align-middle">
          <p className="text-center">{committee?.proceedingCount}</p>
        </td>

        
        <td className="align-middle">
          <p className="text-center">
            {committee?.meetingCount }
          </p>
        </td>
        
        <td className="align-middle">
          <p className="text-center">
            {committee?.outputCount }
          </p>
        </td>
        
        <td className="align-middle">
          <p className="text-center">
            {committee?.membersCount }
          </p>
        </td>


        <td className="align-middle">
          <p className="text-center">
            {committee?.committeeChairmanName }
          </p>
        </td>


        <td className="align-middle">
          <p className="text-center">
            {committee?.committeeSecretaryName }
          </p>
        </td>

        <td className="align-middle">
          <p className="text-center">
            {committee?.lastMeetingDate === null? <p>------------</p>  :moment(committee?.lastMeetingDate).format("YYYY-MM-DD")}
          </p>
        </td>

        {/* <td className="align-middle">
          <p className="text-center">{committee?.missions}</p>
        </td> */}

      </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <SystemPagination
                       totalPages={totalPages}
                       totalItems={totalItems}
                       pageIndex={pageIndex}
                       pageSize={pageSize}
                       setPageIndex={setPageIndex}
                       setPageSize={setPageSize}
                      />
                    </div>
                  </div>
                </div>
               </>
            ) : (
               <div className="d-flex gap-4 justify-content-center align-items-center py-4">
          {intl.formatMessage({ id: "LoadingData" })}
          <Spinner animation="border" variant="primary" />
        </div>
            )  
       
        } 
          
        </div> 

  </>
};

export default CustomLineChart;
