import { FC } from "react";

interface TreeItem {
  name: string;
  mebmers?: Props;
  userNmae?: string;
  userId?: string;
}

interface Props {
  setShowHierarchy: (showHierarchy: any) => void;
  showHierarchy: boolean;
  treeName?: string;
  treeData: TreeItem[];
  setSelectedIds?: any;
  setSelectedNames?: any;
  setActionType?: any;
  actionTakerId?: string;
}

const TreeListEmployee: FC<Props> = ({
  setShowHierarchy,
  showHierarchy,
  treeName,
  treeData,
  setSelectedIds,
  setSelectedNames,
  setActionType,
  actionTakerId,
}) => {
  return (
    <div className="tree_main mb-5">
      <ul id="tree1" className="tree list-unstyled">
        <p
          className="bg-light fs-5 py-4 mb-7"
          onClick={() => {
            setShowHierarchy(!showHierarchy);
          }}
        >
          <i className="bi bi-diagram-3 mx-3 fs-1"></i>
          <a className="basic-item" href="#" role="button">
            {treeName}
          </a>
        </p>
        {showHierarchy && (
          <li className="basic-branch branch">
            <ul className="list-unstyled">
              {treeData.map((item) => (
                <li
                  className="branch mb-3"
                  onClick={() => {
                    setShowHierarchy(!item.mebmers?.showHierarchy);
                  }}
                >
                  <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      className="form-check-input widget-9-check xCheckBg"
                      type="radio"
                      name="treeRadioGroup" // Add the name attribute for the radio group
                      id={`Checkboxes_${item.userId}`}
                      onChange={() => {
                        setShowHierarchy(!item.mebmers?.showHierarchy);
                        setSelectedIds(item?.userId); // Use an array for radio buttons
                        setSelectedNames(item?.userNmae);
                        setActionType(0);
                      }}
                      checked={item.userId === actionTakerId}
                    />
                  </div>
                  <label htmlFor={`Checkboxes_${item.userId}`}>
                    {item.userNmae}
                  </label>
                  {item.mebmers && item.mebmers.showHierarchy && (
                    <ul id="tree1" className="tree list-unstyled">
                      {item.mebmers.treeData.map((item) => (
                        <li className="branch mb-3">
                          <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                            <input
                              className="form-check-input widget-9-check xCheckBg"
                              type="radio"
                              name="treeRadioGroup" // Add the name attribute for the radio group
                              id={`Checkboxes_${item.userId}`}
                              checked={item.userId === actionTakerId}
                            />
                          </div>
                          <label htmlFor={`Checkboxes_${item.userId}`}>
                            {item.userNmae}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TreeListEmployee;
