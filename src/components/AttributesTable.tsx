import { AttributesType } from "../types";

export default function AttributesTable({
  attributes,
}: {
  attributes: AttributesType;
}) {
  const attributesArr: JSX.Element[] = [];

  Object.keys(attributes).forEach((attributeKey) => {
    if (attributes[attributeKey]) {
      attributesArr.push(
        <tr key={attributeKey}>
          <td>{attributeKey}</td>
          <td>{attributes[attributeKey]}</td>
        </tr>
      );
    }
  });

  return (
    <table className=" w-56">
      <tbody>{attributesArr}</tbody>
    </table>
  );
}
