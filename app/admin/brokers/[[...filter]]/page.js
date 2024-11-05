import { fetchBroker } from "@/app/api/getApi/broker/getBroker";
import LoadMore from "@/app/api/getApi/LoadMore";
import BrokersTable from "@/components/Admin/components/Brokers/BrokersTable";
import Brokers from "@/components/Admin/components/pages/Brokers";
import React from "react";

export default async function Page({ params }) {
  const { error, data } = await fetchBroker(1, params);
  return (
    <section className="flex flex-col  pb-10">
      <Brokers  />
      <div className="flex flex-col ">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                {data}
              </table>
            </div>
          </div>
        </div>
      </div>
      <LoadMore  params={params} fetchfun={fetchBroker} />
    </section>
  );
}
