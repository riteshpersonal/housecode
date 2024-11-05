"use server";
import SingleProperty from "@/components/PropertyListing/SingleProperty";
import axios from "../../index";

export async function fetchProperties(page, urlParams, user=true) {
  try {
    // Decode the URL parameters into an object
    const params = {};

    const paramSegments = urlParams?.map(segment => decodeURIComponent(segment));
    
    paramSegments?.forEach(segment => {
      const [key, value] = segment.split('=');
      if (key && value) {
        params[key] = value;
      }
    });

    // Include pageNumber in the parameters
    // Make the API request with the decoded parameters
    const res = await axios.get(`/properties/properties`, {
      timeout: 5000,
      params: {
        ...params,
        pageNumber: page,
      }
    });

    return {
      data: res.data.map(property => (
        <SingleProperty property={property} key={property._id} user={user} />
      )),
      error: ""
    };
  } catch (error) {

    return { data: [], error: error.message || "Something went wrong" };
  }
}

export async function fetchSingleProperty(propertyId) {
  try {
    const res = await axios.get(`/properties/${propertyId}`);
    return { properties: res.data.properties, error: "" };
  } catch (error) {

    return { properties: [], error: error.message || "Something went wrong" };
  }
}

export async function fetchAddresses() {
  try {
    const res = await axios.get(`/properties/address/filter`);
    return { address: res.data, Addresserror: "" };
  } catch (error) {

    return { address: [], Addresserror: error.message || "Something went wrong" };
  }
}