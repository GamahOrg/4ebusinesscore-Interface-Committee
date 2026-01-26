import React from "react";
import { ItemsByRequestTemplateId } from "@4eplatform/technical-support/src/app/models/ItemsByRequestTemplateId";

interface TableRowProp {
  item: ItemsByRequestTemplateId;
}

const TableRow: React.FC<TableRowProp> = ({ item }) => {
  return (
    <>
      <tr className="align-middle">
        <td className="align-middle">
          <p className="text-center">{item?.itemName}</p>
        </td>
        <td className="align-middle">
          <p className="text-center">{item?.mainclassificationName}</p>
        </td>
        <td className="align-middle">
          <p className="text-center">{item?.serviceCatlogName}</p>
        </td>
        <td className="align-middle">
          <p className="text-center">{item?.categoryName}</p>
        </td>
      </tr>
    </>
  );
};

export { TableRow };
