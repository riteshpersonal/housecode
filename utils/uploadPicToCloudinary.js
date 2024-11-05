const uploadPic = async (media) => {
  try {
    console.log("100010001", media);
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "ggvphxf1");
    form.append("cloud_name", "dhyhov5ut");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dhyhov5ut/image/upload",
      {
        method: "POST",
        body: form,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error(error);
    return;
  }
};

export default uploadPic;
