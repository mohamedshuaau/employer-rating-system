/**
 * Select Component
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Select(props) {

  const { selected, setSelected, labelKey = "name", valueKey = "id", list = [], name = "list", label = 'Select'} = props;

  return (
    <div className="w-72 flex flex-col gap-1 justify-center">
      <span className="text-gray-600 font-semibold text-sm">{label}</span>
      <select className="rounded-xl border-blue-300 text-gray-600" value={selected || ""} name={name} id={name} onChange={(event) => setSelected(event.target.value)}>
        <option value="">Select an Option</option>
        {
          list.map((item, index) => (
            <option key={index} value={item[valueKey]}>{item[labelKey]}</option>
          ))
        }
      </select>
    </div>
  );
}
