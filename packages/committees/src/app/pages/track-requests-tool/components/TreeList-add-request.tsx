import { FC, useReducer } from "react";

interface TreeItem {
  name: string;
  children?: any;
  nameAr?: string;
  id?: string;
}

interface Props {
  setShowHierarchy: (showHierarchy: any) => void;
  showHierarchy: boolean;
  treeName?: string;
  treeData: TreeItem[];
  setSelectedIds?: any;
  setSelectedNames?: any;
  setDestination?: any;
  arrayIndex: any;
  parentId: string;
  itemParent?: any;
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

const TreeListAddRequest: FC<Props> = ({
  setShowHierarchy,
  showHierarchy,
  treeName,
  treeData,
  setSelectedIds,
  setSelectedNames,
  setDestination,
  arrayIndex,
  parentId,
  itemParent,
}) => {
  const [hierarchyState, dispatchHierarchy] = useReducer(hierarchyReducer, {});

  const handleToggleHierarchy = (itemId: string) => {
    dispatchHierarchy({ type: "TOGGLE_HIERARCHY", itemId });
  };
  return (
    <div className="tree_main mb-5">
      {/* <ul id="tree1" className="tree list-unstyled"> */}
      <p className="bg-light fs-5 py-4 mb-7">
        <i className="bi bi-diagram-3 mx-3 fs-1"></i>
        <input
          className="form-check-input widget-9-check xCheckBg mt-1 mx-2"
          type="radio"
          name="treeRadioGroup"
          id={`Checkboxes_${parentId}`}
          onClick={() => {
            setSelectedIds(parentId);
            setSelectedNames(treeName);
            setDestination(itemParent, 1, arrayIndex);
          }}
        />
        <a
          onClick={() => {
            setShowHierarchy(!showHierarchy);
          }}
          className="basic-item"
          href="#"
          role="button"
        >
          {treeName}
        </a>
      </p>
      {showHierarchy && (
        // <li className="basic-branch branch">
        <ul className="list-unstyled">
          {treeData.map((item) => (
            <li
              className="branch mb-3"
              onClick={() => {
                // setShowHierarchy(!item.children?.showHierarchy);
              }}
            >
              <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-md">
                <input
                  className="form-check-input widget-9-check xCheckBg mb-5"
                  type="radio"
                  name="treeRadioGroup" // Add the name attribute for the radio group
                  id={`Checkboxes_${item.id}`}
                  onClick={() => {
                    setSelectedIds(item?.id); // Use an array for radio buttons
                    setSelectedNames(item?.nameAr);
                    setDestination(item, 1, arrayIndex);
                  }}
                />
              </div>
              <label
                onClick={() => {
                  setShowHierarchy(!item.children?.showHierarchy);
                }}
                htmlFor={`Checkboxes_${item.id}`}
              >
                {item.nameAr}
              </label>
              {/* {item.children && item.children.showHierarchy && ( */}
              {item.children?.length ? (
                <ul>
                  {item.children.map((item: any) => (
                    <TreeListAddRequest
                      key={item?.id}
                      setShowHierarchy={() => handleToggleHierarchy(item.id)}
                      showHierarchy={hierarchyState[item.id] || false}
                      treeName={`${item.nameAr || item.nameEn}`}
                      treeData={item.children || []}
                      setSelectedIds={setSelectedIds}
                      setSelectedNames={setSelectedNames}
                      setDestination={setDestination}
                      arrayIndex={arrayIndex}
                      parentId={item.id}
                      itemParent={item}
                    />
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        // </li>
      )}
      {/* </ul> */}
    </div>
  );
};

export default TreeListAddRequest;
