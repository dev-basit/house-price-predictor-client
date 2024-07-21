import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.scss";
import { showFailureToaster } from "../../utils/toaster";
import { auth } from "../../services/authService";
import { userService } from "../../services/userService";
import { uploadImage } from "../../services/imageService";
import { cloudinary, imageUploadUrl } from "../../constants/config";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    experience: "1",
    userType: "",
    profilePicture: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.getCurrentUserDetails()) navigate("/");
  }, [user]);

  //
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();

    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinary.upload_preset);

    try {
      let uploadedImageUrl = await uploadImage(imageUploadUrl, formData);
      setUser((prev) => {
        return { ...prev, profilePicture: uploadedImageUrl };
      });
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = userService.newUserSchema.validate(user);
      if (error) return showFailureToaster(error.message);

      let { name, email, password, phoneNo, userType, profilePicture } = user;
      let userDetails = {
        name: name,
        email: email,
        password: password,
        phoneNo: phoneNo,
        userType: userType,
        profilePicture: profilePicture,
      };

      if (userDetails.userType === "seller") userDetails.experience = user.experience;

      const isSignup = await userService.addNewUser({ ...userDetails });
      if (isSignup) navigate("/");
      // setUser({ name: "", email: "", password: "", userType: "" });
    } catch (error) {}
  };

  return (
    <div className="registerScreen">
      <form className="registerForm" autoComplete="on" onSubmit={handleSubmit}>
        <span className="registerTitle">Register</span>
        <label htmlFor="name">Username</label>
        <input
          name="name"
          type="text"
          placeholder="Daniyal"
          className="registerInput"
          onChange={handleChange}
          autoComplete="name"
        />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Enter your email address."
          className="registerInput"
          onChange={handleChange}
          autoComplete="email"
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password."
          className="registerInput"
          onChange={handleChange}
          autoComplete="password"
        />

        <label htmlFor="phoneNo">Phone No:</label>
        <input
          name="phoneNo"
          type="text"
          placeholder="Enter your phone no."
          className="registerInput"
          onChange={handleChange}
          autoComplete="phoneNo"
        />

        <div className="fileInputContainer">
          <label for="upload" className="file-label">
            <span className="file-icon">📁</span>
            Upload Profile Pic
          </label>
          <input type="file" id="upload" className="file-input" onChange={handleUploadImage} />
        </div>

        <div style={{ margin: "1rem 1rem 1rem 0 " }}>
          <span style={{ marginRight: "1rem" }}>Are you Seller or Buyer?</span>
          <select value={user.userType} name="userType" onChange={handleChange}>
            <option value="">Select</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <h3>Selected Role: {user.userType}</h3>

        {user.userType === "seller" && (
          <>
            <label htmlFor="experience">Experience</label>
            <input
              name="experience"
              type="number"
              placeholder="Enter your experience."
              className="registerInput"
              onChange={handleChange}
              min="1"
              max="30"
              autoComplete="experience"
            />
          </>
        )}

        <button className="registerButton">Register</button>
      </form>

      <button className="registerLoginButton">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
    </div>
  );
}
