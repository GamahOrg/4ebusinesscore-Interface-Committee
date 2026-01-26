import React, { FC, useState } from "react";

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
  setDestination?: any;
  arrayIndex: any;
  parentId?: string;
  itemParent?: any;
}

const TreeListAddRequestForEmployee: FC<Props> = ({
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
                      className="form-check-input widget-9-check xCheckBg mt-2"
                      type="radio"
                      name="treeRadioGroup"
                      id={`Checkboxes_${item.userId}`}
                      onClick={() => {
                        setShowHierarchy(!item.mebmers?.showHierarchy);
                        setSelectedIds(item?.userId);
                        setSelectedNames(item?.userNmae);
                        setDestination(item, 0, arrayIndex);
                      }}
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
                              name="treeRadioGroup"
                              id={`Checkboxes_${item.userId}`}
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

export default TreeListAddRequestForEmployee;
