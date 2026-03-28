import React, { useState } from "react";

function Order() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    orderItem: "",
    details: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({
          fullName: "",
          email: "",
          orderItem: "",
          details: "",
        });
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Server connection failed.");
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    {
      type: "text",
      name: "fullName",
      placeholder: "Your Full Name",
      value: formData.fullName,
    },
    {
      type: "email",
      name: "email",
      placeholder: "Your Email",
      value: formData.email,
    },
    {
      type: "text",
      name: "orderItem",
      placeholder: "What would you like to order?",
      value: formData.orderItem,
    },
  ];

  return (
    <section id="order" className="container-fluid order-section">
      <div className="container py-5">
        <h2 className="text-center mb-4">Place Your Order</h2>

        <form className="order-form mx-auto" onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <InputField
              key={index}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={field.value}
              onChange={handleChange}
            />
          ))}

          <TextAreaField
            name="details"
            rows="4"
            placeholder="Additional details"
            value={formData.details}
            onChange={handleChange}
          />

          <SubmitButton loading={loading} />

          {message && (
            <div className="alert alert-info mt-3 text-center">{message}</div>
          )}
        </form>
      </div>
    </section>
  );
}

function InputField({ type, name, placeholder, value, onChange }) {
  return (
    <div className="mb-3">
      <input
        type={type}
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function TextAreaField({ name, rows, placeholder, value, onChange }) {
  return (
    <div className="mb-3">
      <textarea
        name={name}
        className="form-control"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

function SubmitButton({ loading }) {
  return (
    <button type="submit" className="btn btn-warning w-100" disabled={loading}>
      {loading ? "Submitting..." : "Submit Order"}
    </button>
  );
}

export default Order;