import React, { useState } from "react";
import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import TreeList from "./TreeList";

const ManagmentOption = () => {
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
            treeName={`${intl.formatMessage({
              id: "Sector",
            })} 1`}
            treeData={[
              {
                name: `${intl.formatMessage({
                  id: "RealEstateOperations",
                })} 1`,
              },
              {
                name: `${intl.formatMessage({
                  id: "RealEstateOperations",
                })} 2`,
              },
            ]}
          />
          <TreeList
            setShowHierarchy={setShowHierarchy2}
            showHierarchy={showHierarchy2}
            treeName={`${intl.formatMessage({
              id: "Sector",
            })} 2`}
            treeData={[
              {
                name: `${intl.formatMessage({
                  id: "RealEstateOperations",
                })} 3`,
              },
              {
                name: `${intl.formatMessage({
                  id: "RealEstateOperations",
                })} 4`,
              },
              {
                name: `${intl.formatMessage({
                  id: "RealEstateOperations",
                })} 5`,
              },
            ]}
          />
          <TreeList
            setShowHierarchy={setShowHierarchy3}
            showHierarchy={showHierarchy3}
            treeName={`${intl.formatMessage({
              id: "Sector",
            })} 3`}
            treeData={[
              {
                name: `${intl.formatMessage({
                  id: "RealEstateOperations",
                })} 1`,
                children: {
                  setShowHierarchy: setShow1FromNested,
                  showHierarchy: show1FromNested,
                  treeData: [
                    {
                      name: `${intl.formatMessage({
                        id: "RealEstateOperations",
                      })} 1`,
                    },
                    {
                      name: `${intl.formatMessage({
                        id: "RealEstateOperations",
                      })} 1`,
                    },
                    {
                      name: `${intl.formatMessage({
                        id: "RealEstateOperations",
                      })} 1`,
                    },
                  ],
                },
              },
              {
                name: `${intl.formatMessage({
                  id: "RealEstateOperations",
                })} 1`,
              },
              {
                name: `${intl.formatMessage({
                  id: "RealEstateOperations",
                })} 1`,
              },
            ]}
          />
          <TreeList
            setShowHierarchy={setShowHierarchy4}
            showHierarchy={showHierarchy4}
            treeName={`${intl.formatMessage({
              id: "Sector",
            })} 5`}
            treeData={[
              {
                name: `${intl.formatMessage({
                  id: "RealEstateOperations",
                })} 1`,
              },
              {
                name: `${intl.formatMessage({
                  id: "RealEstateOperations",
                })} 1`,
              },
              {
                name: `${intl.formatMessage({
                  id: "RealEstateOperations",
                })} 1`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagmentOption;
