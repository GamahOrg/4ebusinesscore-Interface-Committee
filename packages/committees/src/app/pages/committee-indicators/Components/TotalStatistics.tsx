import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {  getIndicatorsOverAll, getMeetingIndicators, getMembersIndicator } from "../../../features/CommitteeIndicators/CommitteeIndicators";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@4eplatform/shared/store/storeRegistry";

interface StatisticsCard {
  icon: any;
  title: string;
  percentage: number;
  value: number;
  cardClass: string;
}

const TotalStatistics = () => {
  const intl = useIntl();
   const dispatch = useDispatch();

  // const EN_LANG = "en";
  let selectedLang = localStorage.getItem("i18nConfig");
  try {
    selectedLang = JSON.parse(selectedLang as string).selectedLang;
  } catch (err) { }



  useEffect(() =>{
    dispatch(getIndicatorsOverAll({}) as any )
  } , [dispatch])

  const IndicatorsOverAll = useSelector((state: RootState) => state?.committeesIndicatorsSlice?.IndicatorsOverAll)


  useEffect(() =>{
    dispatch(getMembersIndicator({}) as any )
  } , [dispatch])

  const MembersIndicator = useSelector((state: RootState) => state?.committeesIndicatorsSlice?.MembersIndicator)

  useEffect(() =>{
    dispatch(getMeetingIndicators({}) as any )
  } , [dispatch])

  const MeetingIndicators = useSelector((state: RootState) => state?.committeesIndicatorsSlice?.MeetingIndicators)



  
  const statisticsCards: StatisticsCard[] = [
    {
      icon: "fa-solid fa-folder-open fa-lg text-warning",
      title: intl.formatMessage({ id: "TotalCommissions" }),
      percentage: 50,
      value: IndicatorsOverAll?.allCommitteeCount,
      cardClass: "bg-primary",
    },
    {
      icon: "fas fa-check-square fa-lg text-success",
      title: intl.formatMessage({ id: "TotalMeetings" }),
      percentage: 50,
      value: MembersIndicator?.totalMembers,
      cardClass: "bg-warning",
    },
    {
      icon: "fa-solid fa-chart-simple fa-lg text-success",
      title: intl.formatMessage({ id: "TotalOutput" }),
      percentage: 50,
      value: MeetingIndicators?.countOfOutputs,
      cardClass: "bg-success",
    },

  ];

  return (
    <div>
      <div className="row d-flex flex-wrap">
        {statisticsCards.map((card, index) => (
          <div className=" col-md-4" key={index}>
            <div
              className="p-5 rounded d-flex align-items-center shadow-sm"
              key={index}
            >
              <div className="w-100">
                <div className="d-flex flex-row align-items-center">
                  <div
                    className={`${card.cardClass} bg-opacity-10 rounded-circle p-2 d-flex flex-column align-items-center justify-content-center w-40px h-40px`}
                  >
                    {card.icon.type === undefined ? (
                      <i className={card.icon}> </i>
                    ) : (
                      <span className="symbol-label bg-light-danger ">
                        <span className="svg-icon svg-icon-2 svg-icon-danger">
                          {card.icon}
                        </span>
                      </span>
                    )}
                  </div>
                  <span className="ms-3 fs-3">{card.title}</span>
                </div>
                <div className="d-flex align-items-center my-4">
                  <span className="h4 mb-0 fw-bolder">{card.value}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalStatistics;
