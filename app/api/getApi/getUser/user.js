"use server";
import axios from "../../index";
export async function fetchUser() {
  try {
    const res = await axios.get(`/admin/admin`, {
      timeout: 5000,
    });

    return { user: res.data, error: "" };
  } catch (error) {
    console.error("Error fetching brokers: ", error.message);
    return { user: [], error: error.message || "Something went wrong" };
  }
}

export async function fetchBrokerUser() {
  try {
    const res = await axios.get(`/broker/broker`, {
      timeout: 5000,
    });

    return { user: res.data, error: "" };
  } catch (error) {
    console.error("Error fetching brokers: ", error.message);
    return { user: [], error: error.message || "Something went wrong" };
  }
}