import { Link } from "react-router-dom";

/**
 * Welcome Page
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Welcome() {
  return (
    <>
      <div
        className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white bg-cover bg-[url('https://www.pension.gov.mv/asset/image/v2/housing.png')]"
      >
        <div className="max-w-7xl mx-auto p-6 lg:p-8 backdrop-blur-sm bg-white/10 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <img src="https://pension.gov.mv/asset/image/enlgish_website_logo.svg" alt="logo"
                 className="w-80" />

            <Link
              className="text-white mt-12 text-2xl px-3 py-2 rounded-xl shadow-sm bg-blue-900 border border-gray-300"
              to="/dashboard">Dashboard</Link>
          </div>
        </div>
      </div>
    </>
  );
}