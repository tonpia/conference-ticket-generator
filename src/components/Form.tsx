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

  const [errors, setErrors] = useState<{
    email?: string;
    avatar?: string;
  }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;
    const file = files?.[0];

    if (name === "avatar" && file) {
      const maxSize = 5 * 1024 * 1024;
      const validTypes = ["image/jpeg", "image/png"];
      if (file.size > maxSize) {
        setErrors({ ...errors, avatar: "File too large (max 5MB)" });
        setFormData({ ...formData, avatar: null });
        return;
      }
      if (!validTypes.includes(file.type)) {
        setErrors({ ...errors, avatar: "Invalid file type (JPG or PNG only)" });
        setFormData({ ...formData, avatar: null });
        return;
      }

      setErrors({ ...errors, avatar: undefined });
      setFormData({ ...formData, avatar: file });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: { email?: string; avatar?: string } = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    // console.log("Form submitted:", formData);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  }

  return (
    <>
      <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
      <p>Secure your spot at next year's biggest coding conference</p>
      <div className="form-container">
        <form onSubmit={handleSubmit} noValidate>
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
            {errors.avatar ? (
              <div className="error-text">
                <img src={infoIcon} alt="Error" />
                <span>{errors.avatar}</span>
              </div>
            ) : (
              <div className="info-upload">
                <img src={infoIcon} alt="Info" />
                <span>Upload your photo (JPG or PNG. max size: 5MB)</span>
              </div>
            )}
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
            {errors.email && (
              <div className="error-text">
                <img src={infoIcon} alt="Error" />
                <span>{errors.email}</span>
              </div>
            )}
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

          <button type="submit" className="submit-btn">
            Generate Ticket
          </button>
        </form>
      </div>
    </>
  );
}
