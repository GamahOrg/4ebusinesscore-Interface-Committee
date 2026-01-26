import React, { FC } from "react";

interface TreeItem {
  name: string;
  children?: Props;
}

interface Props {
  setShowHierarchy: (showHierarchy: any) => void;
  showHierarchy: boolean;
  treeName?: string;
  treeData: TreeItem[];
}

const TreeList: FC<Props> = ({
  setShowHierarchy,
  showHierarchy,
  treeName,
  treeData,
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
          <span className="basic-item" role="button">
            {treeName}
          </span>
        </p>
        {showHierarchy && (
          <li className="basic-branch branch">
            <ul className="list-unstyled">
              {treeData.map((item, index) => (
                <li
                  key={index}
                  className="branch mb-3"
                  onClick={() =>
                    item.children &&
                    item.children.setShowHierarchy(!item.children.showHierarchy)
                  }
                >
                  <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      className="form-check-input widget-9-check xCheckBg"
                      type="checkbox"
                      id="Checkboxes1"
                      onClick={() => {
                        item.children &&
                          item.children?.setShowHierarchy(
                            !item.children?.showHierarchy
                          );
                      }}
                    />
                  </div>
                  <label htmlFor="Checkboxes1">{item.name}</label>
                  {item.children && item.children.showHierarchy && (
                    <ul id="tree1" className="tree list-unstyled">
                      {item.children.treeData.map((item, index) => (
                        <li key={index} className="branch mb-3">
                          <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                            <input
                              className="form-check-input widget-9-check xCheckBg"
                              type="checkbox"
                              id="Checkboxes1"
                            />
                          </div>
                          <label htmlFor="Checkboxes1">{item.name}</label>
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

export default TreeList;
