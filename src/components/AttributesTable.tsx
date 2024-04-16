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
          className={`${index % 2 === 0 ? "bg-slate-100" : "bg-white"} py-2`}
        >
          <th>{attributeKey}</th>
          <td>{attributes[attributeKey]}</td>
        </tr>
      );
    }
  });

  return (
    <table className="w-full table-fixed bg-white text-left">
      <caption className="caption-top mb-4 text-left text-2xl">
        Specifications
      </caption>
      <tbody>{attributesArr}</tbody>
    </table>
  );
}
