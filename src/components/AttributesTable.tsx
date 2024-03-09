import { AttributesType } from "../types";

export default function AttributesTable({
  attributes,
}: {
  attributes: AttributesType;
}) {
  const attributesArr: JSX.Element[] = [];

  Object.keys(attributes).forEach((attributeKey, index) => {
    if (attributes[attributeKey]) {
      attributesArr.push(
        <tr
          key={attributeKey}
          className={`${index % 2 === 0 ? "bg-white" : "bg-slate-200"}`}
        >
          <th>{attributeKey}</th>
          <td>{attributes[attributeKey]}</td>
        </tr>
      );
    }
  });

  return (
    <table className="w-full table-fixed bg-white text-left">
      <caption className="caption-top mb-2 text-left">Specifications</caption>
      <tbody>{attributesArr}</tbody>
    </table>
  );
}
