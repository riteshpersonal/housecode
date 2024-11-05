"use server"
import axios from "../index";

export async function addProperty(Data) {
    try {

      const res = await axios.post(`/admin/properties`,{ Data });
        console.log('Property added successfully:', res.data);
    } catch (error) {
      console.error('Error adding property:', error.response?.data || error.message);
    }
  }
  export async function addBrokerProperty(Data) {
    try {

      const res = await axios.post(`/broker/properties`,{ Data });
        console.log('Property added successfully:', res.data);
    } catch (error) {
      console.error('Error adding property:', error.response?.data || error.message);
    }
  }
export async function updateProperty(propertyId, updatedData) {
    try {
      const res = await axios.put(`/admin/properties/${propertyId}`, updatedData);
       return {data:res.data, error:''}
    } catch (error) {
      console.error('Error updating property:', error.response?.data || error.message);
      return {data:undefined, error:error.message}
    }
  }

  export async function updateBrokerProperty(propertyId, updatedData) {
    try {
      const res = await axios.put(`/broker/properties/${propertyId}`, updatedData);
        return {data:res.data, error:''}
    } catch (error) {
      console.error('Error updating property:', error.response?.data || error.message);
      return {data:undefined, error:error.message}
    }
  }
  export async function deleteProperty(propertyId) {
    try {
      const res = await axios.delete(`/admin/properties/${propertyId}`);
        console.log('Property deleted successfully:', res.data);
  
    } catch (error) {
      console.error('Error deleting property:', error.response?.data || error.message);
    }
  }

  export async function deleteBrokerProperty(propertyId) {
    try {
      const res = await axios.delete(`/broker/properties/${propertyId}`);
        console.log('Property deleted successfully:', res.data);
  
    } catch (error) {
      console.error('Error deleting property:', error.response?.data || error.message);
    }
  }
