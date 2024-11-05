"use server"
import axios from "../index";

export async function submitBrokerForm(prevState,formData) {
  try {

    // Extract form data fields for the broker
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    // Validate form fields (you can extend this as needed)
    if (!name || !email || !password) {
      throw new Error("All fields (name, email, password) are required.");
    }

    // Make the POST request using axios to submit broker data
    const res = await axios.post(`/admin/broker`, {
      name,
      email,
      password
    });

      console.log('Broker created successfully:', res.data);
      return { success: true, data: res.data };
  } catch (error) {
    console.error('Error while submitting the broker form:', error.message);
    return { success: false, error: error.message|| 'An unknown error occurred' };
  }
}

export async function BrokerBlockStatus(brokerId, action) {
  try {
    // Make the PATCH request to block or unblock the broker
    const res = await axios.patch(`/admin/broker/${brokerId}/block`, {
      action
    });

    // Handle the response
      return { success: true, message: res.data.message };
  } catch (error) {
    console.error('Error toggling broker status:', error.message);
    return { success: false, error: error.response?.data || 'An unknown error occurred' };
  }
}

export async function UpdateBrokerForm(prevState,formData) {
    try {
  
      // Extract form data fields for the broker
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("new-password");
      const id = formData.get("user_id");
      // Validate form fields (you can extend this as needed)
      if (!name || !email || !id) {
        throw new Error("All fields (name, email) are required.");
      }

      // Make the Patch request using axios to update broker data
      const res = await axios.patch(`/admin/broker/${id}`, {
        name,
        email,
        password
      });
        console.log('Broker created successfully:', res.data);
        return { success: true, data: res.data.broker };
 
    } catch (error) {
      console.error('Error while submitting the broker form:', error.message);
      return { success: false, error: error.response?.data || 'An unknown error occurred' };
    }
  }

  export async function UpdateAdmin(prevState,formData) {
    try {
  
      // Extract form data fields for the broker
      const name = formData.get("name");
      const email = formData.get("email");
      const currentPassword = formData.get("current-password");
      const newPassword  = formData.get("new-password");
     
      // Make the Patch request using axios to update broker data
      const res = await axios.put(`/admin/update-profile`, {
        name,
        email,
        currentPassword,
        newPassword
      });
        console.log('Admin Updated successfully:', res.data);
        return { success: true, data: res.data.admin };
 
    } catch (error) {
      console.error('Error while submitting the broker form:', error.message);
      return { success: false, error: error.response?.data || 'An unknown error occurred' };
    }
  }
