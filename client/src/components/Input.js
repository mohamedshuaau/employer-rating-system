/**
 * Input Component
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Input(props) {

  const { value, setValue, name = "list", label = "Input", type = "text" } = props;

  return (
    <div className="w-72 flex flex-col gap-1 justify-center">
      <span className="text-gray-600 font-semibold text-sm">{label}</span>
      <input type={type} className="rounded-xl border-blue-300 text-gray-600" name={name} id={name}
             onChange={(event) => setValue(event.target.value)} value={value || ""} />
    </div>
  );
}
