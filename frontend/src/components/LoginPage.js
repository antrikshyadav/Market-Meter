import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSpring, animated } from "react-spring"; // For motion and animation

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #2b5876, #4e4376);
  color: #ffffff;
`;

const FormContainer = styled(animated.div)`
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

const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 1rem;
`;

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const springProps = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.9)" },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <Container>
      <FormContainer style={springProps}>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
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
          <Button type="submit">Log In</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
