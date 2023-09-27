/**
 * Employee Stacked list
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function EmployeeStackedList(props) {
  const { employees = [], label = '' } = props;

  return (
    <div className="flex flex-col gap-6">
      <span className="text-2xl text-gray-700">{label}</span>
      <div className="px-24 py-12 mt-2 border rounded-xl">
        <ul role="list" className="divide-y divide-gray-100">
          {employees.map((employee) => (
            <li key={employee.name} className="relative flex justify-between gap-x-6 py-5">
              <div className="flex items-center min-w-0 gap-x-4 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6 border rounded-full">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <div className="min-w-0 flex-auto">
                  <div className="text-sm font-semibold leading-6 text-gray-600">
                    <div>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {employee.name}
                    </div>
                  </div>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a href={`mailto:${employee.email}`} className="relative truncate hover:underline">
                      {employee.email}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{employee.point_rating}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {employee.star_rating}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
