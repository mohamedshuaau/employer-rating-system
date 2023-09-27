/**
 * Button Component
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Button(props) {

  const { onClick, label = 'Button', disabled = false} = props;

  return (
    <button disabled={disabled} onClick={onClick} className="w-auto bg-blue-900 px-3 py-2 rounded-xl text-white shadow-sm hover:bg-blue-950 transition duration-300 flex self-start">{label}</button>
  );
}
