import React, { useEffect } from "react";
import { FC } from "react";
import {
  useAppSelector,
  useAppDispatch,
  RootState,
} from "../../../store/store";
import { useParams } from "react-router-dom";
import { getCommitteeTimeTable } from "../../../features/committee/committeesSlice";
import moment from 'moment'
import 'moment-timezone'
import { useIntl } from "react-intl";
interface Props {
  setCommitteeDetails?: any;
}

const CommitteesReviewTabsSchedule: FC<Props> = ({setCommitteeDetails}) => {
  const intl = useIntl();
  let { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCommitteeTimeTable(id));
  }, [id]);
  const comitteeTimetable = useAppSelector((state: RootState) => {
    return state?.committees?.CommitteeTimeTable;
  });
  const committeeDetails = useAppSelector((state: RootState) => {
    return state?.committees?.committee;
  });
//   const sortedTimetable = [...comitteeTimetable].sort((a, b) => {
//     return new Date(a.date)?.getTime() - new Date(b.date)?.getTime();
// })?.map((item,index)=>{
//   if(index==0){
//     return {...item,date:committeeDetails?.committeeDate}
//   }
//   else {
//     return item
//   }
// });

const sortedTimetable = Array.isArray(comitteeTimetable)
  ? [...comitteeTimetable].sort((a, b) => {
      return new Date(a.date)?.getTime() - new Date(b.date)?.getTime();
    })?.map((item, index) => {
      if (index === 0) {
        return { ...item, date: committeeDetails?.committeeDate };
      } else {
        return item;
      }
    })
  : [];

  useEffect(() => {
    committeeDetails && setCommitteeDetails(committeeDetails);
  }, [committeeDetails]);

  return (
    <>
      <div className="card pb-5" style={{maxHeight:"500px",overflow:"auto"}}>
        <div className="card-body p-4 rounded-2">
          <div className="d-flex card-title flex-column align-items-start mt-2 mb-5">
            <span className="card-label fw-bolder fs-5 mb-1">
              {intl.formatMessage({ id: "Calender" })}
            </span>
            <span className="mt-1 fw-semibold fs-6 text-muted">
              {intl.formatMessage({ id: "TimetableForTheCommittees" })}
            </span>
          </div>
          <div className="timeline-label">
            {sortedTimetable?.map((ele: any , index: number) => {
              const dateTime = new Date(ele?.date);
              const formattedDate = dateTime?.toLocaleDateString();
              return (
                <div className="timeline-item" key={ele.id || index}>
                  <div className="timeline-label fw-bold text-gray-800 fs-6">
                    {ele?.date
                      ?moment.tz(ele?.date,'UTC').tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format("LT")
                      : null}
                  </div>
                  <div
                    className={`timeline-badge ${
                      intl.locale == "ar" ? "mx-0" : ""
                    }`}
                  >
                    <i className="far fa-circle text-gray-600 fs-3"></i>
                  </div>
                  <div className="d-flex flex-column align-items-start px-3">
                    <div className="timeline-content fw-bold text-gray-500">
                      {/* {moment(formattedDate).format("YYYY-MM-DD")} */}
                                              {moment
                          .tz(ele?.date, "UTC")
                          .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
                          .format("YYYY-MM-DD / hh:mm a")}
                    </div>
                    <span>{ele?.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export { CommitteesReviewTabsSchedule };
