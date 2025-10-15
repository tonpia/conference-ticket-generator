import { useState } from "react";
import "./Form.css";
import uploadIcon from "/images/icon-upload.svg";
import infoIcon from "/images/icon-info.svg";

export default function Form({
  onSubmit,
}: {
  onSubmit: (data: {
    name: string;
    email: string;
    github: string;
    avatar: File | null;
  }) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: null as File | null,
    github: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    onSubmit(formData);
  }

  return (
    <>
      <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
      <p>Secure your spot at next year's biggest coding conference</p>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label className="upload-label">
            Upload Avatar
            <div className="upload-box">
              <div className="upload-icon-box">
                <img src={uploadIcon} alt="Upload" />
              </div>
              <p>Drag and drop or click to upload</p>
              <input
                type="file"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={handleChange}
              />
            </div>
            <div className="info-upload">
              <img src={infoIcon} alt="Info" />
              <span>Upload your photo (JPG or PNG. max size: 50MB)</span>
            </div>
          </label>
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Github Username
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="submit-btn">Generate Ticket</button>
        </form>
      </div>
    </>
  );
}
