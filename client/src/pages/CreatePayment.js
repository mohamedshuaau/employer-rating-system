import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "../components/Select";
import Input from "../components/Input";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { get, post } from "../services/axios";

/**
 * Create Payment Page
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function CreatePayment() {

  const [employers, setEmployers] = useState([]);
  const [employerId, setEmployerId] = useState(null);
  const [contributionMonth, setContributionMonth] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  // create payment
  const createPayment = () => {
    const data = {
      employer_id: parseInt(employerId),
      contribution_month: contributionMonth,
      due_date: dueDate
    }

    post('employers/create-payment', data, function(response) {
      toast.success(response.data);
      setEmployerId(null)
      setDueDate(null)
      setContributionMonth(null)
    });
  };

  // gets all the active employers
  const getAllActiveEmployers = () => {
    get("employers/all", function(response) {
      setEmployers(response.data);
    });
  };

  useEffect(() => {
    getAllActiveEmployers();
  }, []);

  return (
    <Layout>

      <div className="container">
        <div className="flex flex-col gap-1">
          <span className="page-heading text-2xl text-gray-600 font-semibold">Create Payment</span>
          <span className="page-sub-heading text-gray-500 text-xs">Create Payments for Employers</span>
        </div>

        <div className="content mt-12 flex flex-col gap-8">
          <Select
            selected={employerId}
            setSelected={setEmployerId}
            list={employers || []}
            label="Select an Employer"
          />

          <Input
            value={contributionMonth}
            setValue={setContributionMonth}
            label="Select the Contribution Date"
            type="date"
          />

          <Input
            value={dueDate}
            setValue={setDueDate}
            label="Select the Due Date"
            type="date"
          />

          <Button
            onClick={() => createPayment()}
            label="Create Payment"
          />
        </div>
      </div>

    </Layout>
  );
}