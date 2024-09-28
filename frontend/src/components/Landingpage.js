import React from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background: linear-gradient(45deg, #0a192f, #172a45);
  color: #ffffff;
  font-family: 'Arial', sans-serif';
`;

const Section = styled.section`
  padding: 4rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled(animated.h1)`
  font-size: 3rem;
  color: #64ffda;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled(animated.p)`
  font-size: 1.5rem;
  color: #ccd6f6;
  text-align: center;
  margin-bottom: 2rem;
`;

const GetStartedButton = styled(animated.button)`
  background: rgba(100, 255, 218, 0.2);
  color: #ffffff;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(100, 255, 218, 0.4);
  }
`;

const FactContainer = styled(animated.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  max-width: 600px;
  width: 100%;
`;

const FactTitle = styled.h3`
  color: #64ffda;
  margin-bottom: 0.5rem;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  z-index: -1;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const StockImage = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin: 1rem;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 2rem 0;
`;

const FeatureItem = styled.li`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &:before {
    content: "✓";
    color: #64ffda;
    margin-right: 0.5rem;
  }
`;

const LandingPage = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.slow,
  });
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle redirection to Signup page
  const handleGetStarted = () => {
    navigate("/signup"); // Redirect to the signup page
  };
  return (
    <Container>
      <Section>
        <BackgroundImage />
        <animated.div style={fadeIn}>
          <Title>Welcome to StockTrend</Title>
          <Subtitle>Unlock the Power of Stock Market Trends</Subtitle>
          <GetStartedButton onClick={handleGetStarted}>
            Get Started
          </GetStartedButton>
        </animated.div>
      </Section>

      <Section>
        <Title>Real-time Market Data</Title>
        <Subtitle>
          Stay updated with live stock prices and market movements
        </Subtitle>
        <ImageContainer>
          <StockImage
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Stock chart"
          />
          <StockImage
            src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Trading floor"
          />
        </ImageContainer>
        <FactContainer>
          <FactTitle>Did You Know?</FactTitle>
          <p>
            The New York Stock Exchange traces its origins to 1792 when 24
            stockbrokers signed the Buttonwood Agreement under a buttonwood tree
            on Wall Street.
          </p>
        </FactContainer>
      </Section>

      <Section>
        <Title>Advanced Analytics</Title>
        <Subtitle>
          Dive deep into market trends with our powerful analysis tools
        </Subtitle>
        <ImageContainer>
          <StockImage
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Data analysis"
          />
          <StockImage
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Stock trends"
          />
        </ImageContainer>
        <FeatureList>
          <FeatureItem>Technical Analysis Indicators</FeatureItem>
          <FeatureItem>Fundamental Data Integration</FeatureItem>
          <FeatureItem>Customizable Dashboards</FeatureItem>
          <FeatureItem>AI-Powered Predictions</FeatureItem>
        </FeatureList>
      </Section>

      <Section>
        <Title>Portfolio Management</Title>
        <Subtitle>
          Effortlessly manage and optimize your investment portfolio
        </Subtitle>
        <ImageContainer>
          <StockImage
            src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Portfolio management"
          />
          <StockImage
            src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Investment strategy"
          />
        </ImageContainer>
        <FactContainer>
          <FactTitle>Key Features</FactTitle>
          <FeatureList>
            <FeatureItem>Real-time Portfolio Tracking</FeatureItem>
            <FeatureItem>Risk Assessment Tools</FeatureItem>
            <FeatureItem>Automated Rebalancing</FeatureItem>
            <FeatureItem>Performance Reporting</FeatureItem>
          </FeatureList>
        </FactContainer>
      </Section>

      <Section>
        <Title>Join StockTrend Today</Title>
        <Subtitle>Start your journey to smarter investing</Subtitle>
        <GetStartedButton onClick={handleGetStarted}>
          Sign Up Now
        </GetStartedButton>
        <FactContainer>
          <FactTitle>Why Choose StockTrend?</FactTitle>
          <p>
            With our cutting-edge technology and user-friendly interface,
            StockTrend empowers investors of all levels to make informed
            decisions and maximize their returns in the dynamic world of stock
            markets.
          </p>
        </FactContainer>
      </Section>
    </Container>
  );
};

export default LandingPage;
