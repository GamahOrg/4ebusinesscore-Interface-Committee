import React, { useState } from "react";
import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import TreeList from "./TreeList";

const EntityOption = () => {
  const intl = useIntl();
  const [showHierarchy1, setShowHierarchy1] = useState<boolean>(false);
  const [showHierarchy2, setShowHierarchy2] = useState<boolean>(false);
  const [showHierarchy3, setShowHierarchy3] = useState<boolean>(false);
  const [showHierarchy4, setShowHierarchy4] = useState<boolean>(false);
  const [show1FromNested, setShow1FromNested] = useState<boolean>(false);
  return (
    <div className="row h-100 w-100">
      <div className="col-md-12">
        <div
          className={`h-100 border  ${
            getCurrentSystemLanguage() === "ar"
              ? "border-start-1 border-end-0"
              : "border-end-1 border-start-0"
          }  border-bottom-0  border-top-0 border-secondary`}
        >
          <TreeList
            setShowHierarchy={setShowHierarchy1}
            showHierarchy={showHierarchy1}
            treeName={intl.formatMessage({
              id: "RealEstateOperations",
            })}
            treeData={[
              {
                name: intl.formatMessage({
                  id: "DigitalRealEstate",
                }),
              },
              {
                name: intl.formatMessage({
                  id: "Processes",
                }),
              },
            ]}
          />
          <TreeList
            setShowHierarchy={setShowHierarchy2}
            showHierarchy={showHierarchy2}
            treeName={intl.formatMessage({
              id: "OrganizingAndRecordingInKind",
            })}
            treeData={[
              {
                name: intl.formatMessage({
                  id: "CommitteeManagement",
                }),
              },
              {
                name: intl.formatMessage({
                  id: "SpecimenRegistration",
                }),
              },
              {
                name: intl.formatMessage({
                  id: "OrganizationAndLegalAffairs",
                }),
              },
            ]}
          />
          <TreeList
            setShowHierarchy={setShowHierarchy3}
            showHierarchy={showHierarchy3}
            treeName={intl.formatMessage({
              id: "StrategyAndBusinessDevelopment",
            })}
            treeData={[
              {
                name: intl.formatMessage({
                  id: "StrategicPlanning",
                }),
                children: {
                  setShowHierarchy: setShow1FromNested,
                  showHierarchy: show1FromNested,
                  treeData: [
                    {
                      name: intl.formatMessage({
                        id: "TheStrategy",
                      }),
                    },
                    {
                      name: intl.formatMessage({
                        id: "InstitutionalPerformance",
                      }),
                    },
                    {
                      name: intl.formatMessage({
                        id: "ProjectManagementOffice",
                      }),
                    },
                  ],
                },
              },
              {
                name: intl.formatMessage({
                  id: "SpecimenRegistration",
                }),
              },
              {
                name: intl.formatMessage({
                  id: "InstitutionalPerformance",
                }),
              },
            ]}
          />
          <TreeList
            setShowHierarchy={setShowHierarchy4}
            showHierarchy={showHierarchy4}
            treeName={intl.formatMessage({
              id: "SharedServices",
            })}
            treeData={[
              {
                name: intl.formatMessage({
                  id: "DocumentsAndArchivesCenter",
                }),
              },
              {
                name: intl.formatMessage({
                  id: "HumanCapital",
                }),
              },
              {
                name: intl.formatMessage({
                  id: "FinancialAffairs",
                }),
              },
              {
                name: intl.formatMessage({
                  id: "AdministrativeAffairs",
                }),
              },
              {
                name: intl.formatMessage({
                  id: "ProcurementAndContracts",
                }),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default EntityOption;
