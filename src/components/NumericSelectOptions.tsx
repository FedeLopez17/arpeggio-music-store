export default function NumericSelectOptions({ upTo = 10 }: { upTo?: number }) {
  const selectOptions = [];
  for (let i = 1; i <= upTo; i++) {
    selectOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return <>{selectOptions}</>;
}
