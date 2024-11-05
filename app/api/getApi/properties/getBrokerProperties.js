"use server";
import axios from "../../index";
import SingleProperty from "@/components/PropertyListing/SingleProperty";

export async function fetchBrokerProperties(page, params) {
  try {
    const res = await axios.get(`/admin/properties/${params}`, {
      timeout: 5000,
      params: {
        pageNumber: page,
      }
    });

    return {
      data: res.data.map(property => (
        <SingleProperty property={property} key={property._id} />
      )),
      error: ""
    };
  } catch (error) {
    console.error("Error fetching properties: ", error.message);
    return { data: [], error: error.message || "Something went wrong" };
  }
}
export async function fetchBrokerProperties2(page, params, user=true) {
  try {
    const res = await axios.get(`/broker/properties/${params}`, {
      timeout: 5000,
      params: {
        pageNumber: page,
      }
    });

    return {
      data: res.data.map(property => (
        <SingleProperty property={property} key={property._id} broker={true} user={user}/>
      )),
      error: ""
    };
  } catch (error) {
    console.error("Error fetching properties: ", error.message);
    return { data: [], error: error.message || "Something went wrong" };
  }
}