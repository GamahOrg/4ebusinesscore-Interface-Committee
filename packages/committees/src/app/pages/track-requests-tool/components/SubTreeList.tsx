import React, { FC, useState } from "react";

interface TreeItem {
  name: string;
  children?: any;
  nameAr?: string;
  id?: string;
}

interface Props {
  treeName?: string;
  treeData?: TreeItem[];
  setSelectedIds?: any;
  setSelectedNames?: any;
  setDestination?:any;
  arrayIndex?:any;
  parentId?: string;
  itemParent?: any;
}

const SubTreeList: FC<Props> = ({
  treeData,
  setSelectedIds,
  setSelectedNames,
  setDestination,
  arrayIndex,

}) => {

  const [shoeTree , setShowTree] = useState(false)
  return (
    <div className="tree_main mb-5">
      <ul id="tree1" className="tree list-unstyled">
          <li className="basic-branch branch">
            <ul className="list-unstyled">
              {treeData?.map((item) => (
                <li
                  className="branch mb-3"
                  onClick={() => {
                    setShowTree(prev=>!prev);
                  }}
                >
                  <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      className="form-check-input widget-9-check xCheckBg mt-2"
                      type="radio"
                      name="treeRadioGroup"
                      id={`Checkboxes_${item.id}`}
                      onClick={() => {
                        setSelectedIds(item?.id);
                        setSelectedNames(item?.nameAr);
                        setDestination(item, 1, arrayIndex);
                      }}
                    />
                  </div>
                  <label htmlFor={`Checkboxes_${item.id}`}>{item.nameAr}</label>
                  {item.children?.length && (
                    <ul>
                        <SubTreeList 
                          treeData ={item.children} 
                          setSelectedIds = {setSelectedIds}
                          setSelectedNames = {setSelectedNames}
                          setDestination={setDestination}
                          arrayIndex={arrayIndex}
                        />
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
      </ul>
    </div>
  );
};

export default SubTreeList;
