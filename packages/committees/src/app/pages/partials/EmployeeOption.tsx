import { FC, useReducer } from "react";
import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import TreeListEmployee from "./TreeListEmployee";

interface Iprop {
  employee: any[];
  setSelectedIds?: any;
  setSelectedNames?: any;
  setActionType?: any;
  actionTakerId?: string;
}

interface HierarchyState {
  [itemId: string]: boolean;
}

type HierarchyAction =
  | { type: "TOGGLE_HIERARCHY"; itemId: string }
  | { type: "RESET_HIERARCHY" };

const hierarchyReducer = (
  state: HierarchyState,
  action: HierarchyAction
): HierarchyState => {
  switch (action.type) {
    case "TOGGLE_HIERARCHY":
      return {
        ...state,
        [action.itemId]: !state[action.itemId] || false,
      };
    case "RESET_HIERARCHY":
      return {};
    default:
      return state;
  }
};

const EmployeeOption: FC<Iprop> = ({
  employee,
  setSelectedIds,
  setSelectedNames,
  setActionType,
  actionTakerId,
}) => {
  const intl = useIntl();
  const [hierarchyState, dispatchHierarchy] = useReducer(hierarchyReducer, {});

  const handleToggleHierarchy = (itemId: string) => {
    dispatchHierarchy({ type: "TOGGLE_HIERARCHY", itemId });
  };

  return (
    <div className="row h-100 w-100">
      <div className="col-md-12">
        <div
          className={`h-100 border  ${
            getCurrentSystemLanguage() == "ar"
              ? "border-start-1 border-end-0"
              : "border-end-1 border-start-0"
          }  border-bottom-0  border-top-0 border-secondary`}
        >
          {employee
            ?.filter((ele) => {
              return ele?.mebmers?.length > 0;
            })
            ?.map((item) => (
              <TreeListEmployee
                key={item?.id}
                setShowHierarchy={() => handleToggleHierarchy(item.id)}
                showHierarchy={hierarchyState[item.id] || false}
                treeName={`${item.nameAr || item.nameEn}`}
                treeData={item.mebmers || []}
                setSelectedIds={setSelectedIds}
                setSelectedNames={setSelectedNames}
                setActionType={setActionType}
                actionTakerId={actionTakerId}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeOption;
