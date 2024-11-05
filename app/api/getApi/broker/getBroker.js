"use server";
import BrokersTable from "@/components/Admin/components/Brokers/BrokersTable";
import axios from "../../index";

export async function fetchBroker(page, params) {
  try {
    const searchQuery = (params?.filter && params.filter.length > 0)
      ? decodeURIComponent(params.filter[0]) // Decode the filter
      : '';
    const res = await axios.get(`/admin/broker`, {
      timeout: 5000,
      params: {
        pageNumber: page,
        search: searchQuery,
      }
    });
    return { data: res.data.map((val)=>(
      <tbody key={val._id} className=" divide-y gap-70 divide-gray-200 ">
      <BrokersTable  user={val} /> 
      </tbody>
    )), error: "" };
  } catch (error) {
    console.error("Error fetching brokers: ", error.message);
    return { data: [], error: error.message || "Something went wrong" };
  }
}
