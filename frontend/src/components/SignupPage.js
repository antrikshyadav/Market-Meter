import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // For animations

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #2b5876, #4e4376);
  color: #ffffff;
`;

const FormContainer = styled.div`
  background: #172a45;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #64ffda;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background: #0a192f;
  color: #ccd6f6;
  outline: none;

  &:focus {
    border: 2px solid #64ffda;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #64ffda;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  color: #0a192f;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #52e0c4;
  }
`;

const AltButton = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #64ffda;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      localStorage.setItem("token", response.data.token);
      setSuccess("Signup successful! Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit}>
          {error && (
            <p style={{ color: "#ff6b6b", textAlign: "center" }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "#4caf50", textAlign: "center" }}>{success}</p>
          )}
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit">Sign Up</Button>
        </form>
        {/* Add "Already a registered user?" button */}
        <AltButton onClick={() => navigate("/login")}>
          Already a registered user? LOGIN
        </AltButton>
      </FormContainer>
    </Container>
  );
};

export default SignupPage;
