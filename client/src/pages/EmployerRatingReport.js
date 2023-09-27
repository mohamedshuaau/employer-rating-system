import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { get } from "../services/axios";
import Pagination from "./Pagination";
import { formatDate } from "../utils/date";
import StatusPill from "../components/StatusPill";

/**
 * Employer Rating Report Page
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function EmployerRatingReport() {

  const [data, setData] = useState({});
  const [pagination, setPagination] = useState({ page: 1 });

  // get dashboard content
  const getData = (withPage = false) => {
    let params = {};
    if (withPage) {
      params = {
        page: pagination?.page
      };
    }
    get("employers/reports/employer-rating-report", function(response) {
      setData(response.data);
    }, params);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData(true);
  }, [pagination]);

  return (
    <Layout>
      <div className="container">
        <div className="flex flex-col gap-1">
          <span className="page-heading text-2xl text-gray-600 font-semibold">Employer Rating Report</span>
          <span className="page-sub-heading text-gray-500 text-xs">Employer rating report (ordered by points descending)</span>
        </div>

        <div className="content mt-12 flex flex-col gap-8">

          {
            data?.data?.length > 0 ?

              <div>

                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Contact #
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Point Rating
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Star Rating
                    </th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  {data?.data?.map((datum) => (
                    <tr key={datum.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                        {datum.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{datum.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{datum.contact_number}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{datum.point_rating}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{datum.star_rating}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>

                <Pagination
                  meta={data?.meta}
                  pagination={pagination}
                  setPagination={setPagination}
                />

              </div>

              : null
          }

        </div>
      </div>
    </Layout>
  );
}