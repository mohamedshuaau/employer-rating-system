/**
 * Status Pill Component
 *
 * @param text
 * @param className
 * @param status
 * @param props
 * @returns {JSX.Element|null}
 * @constructor
 */
export default function StatusPill({ className = '', status = 'error', ...props}) {
    return status ? (
        <div
            className={`flex items-center justify-center w-20 px-1 py-2 rounded-md ${status == 101 ? `bg-yellow-200` : status == 102 ? `bg-red-200` : `bg-green-200`}`}>
            <span {...props}
                  className={`w-auto text-sm ${status == 101 ? `text-yellow-600` : status == 102 ? `text-red-600` : `text-green-600`}` + className}>
                {status == 100 ? 'Paid' : status == 101 ? 'Pending' : 'Cancelled'}
            </span>
        </div>
    ) : null;
}
