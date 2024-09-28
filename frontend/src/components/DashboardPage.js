import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaChartLine, FaUserCircle, FaDollarSign } from "react-icons/fa";

// Import Chart.js and register necessary components
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  //   Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  //   Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #172a45;
  color: white;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #1f3a60;
    border-radius: 10px;
    padding: 0.5rem;
  }

  svg {
    margin-right: 1rem;
  }
`;

const Header = styled.header`
  width: 100%;
  padding: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Title = styled.h1`
  color: #172a45;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  width: 30%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatIcon = styled.div`
  background-color: #64ffda;
  padding: 1rem;
  border-radius: 50%;
  color: white;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #172a45;
`;

const ChartContainer = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const DashboardPage = () => {
  const [portfolio, setPortfolio] = useState(["IBM"]); // Initial stock symbol
  const [stockData, setStockData] = useState({}); // Object to store multiple stock data
  const [stockInput, setStockInput] = useState(""); // Input for adding stock

  useEffect(() => {
    fetchMultipleStockData();
  }, [portfolio]); // Fetch data when portfolio changes

  // Function to fetch data for each stock in the portfolio
  const fetchMultipleStockData = async () => {
    const newStockData = {};
    for (let stock of portfolio) {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=demo`
        );
        const data = response.data["Time Series (Daily)"];
        newStockData[stock] = data;
      } catch (error) {
        console.error(`Error fetching data for ${stock}`, error);
      }
    }
    setStockData(newStockData);
  };

  // Function to handle adding stocks to the portfolio
  const handleAddStock = () => {
    if (stockInput && !portfolio.includes(stockInput)) {
      setPortfolio([...portfolio, stockInput]);
    }
    setStockInput(""); // Reset the input field
  };

  // Function to prepare chart data for each stock
  const prepareChartData = (data) => {
    return {
      labels: data ? Object.keys(data).slice(0, 7) : [],
      datasets: [
        {
          label: "Stock Price",
          data: data
            ? Object.keys(data)
                .slice(0, 7)
                .map((key) => parseFloat(data[key]["4. close"]))
            : [],
          borderColor: "#64ffda",
          fill: false,
        },
      ],
    };
  };

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <div>
          <SidebarItem>
            <FaChartLine size={24} /> <span>Dashboard</span>
          </SidebarItem>
          <SidebarItem>
            <FaUserCircle size={24} /> <span>Profile</span>
          </SidebarItem>
          <SidebarItem>
            <FaDollarSign size={24} /> <span>Portfolio</span>
          </SidebarItem>
        </div>
        <p>Market Tracker © 2024</p>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <Header>
          <Title>Dashboard</Title>
        </Header>

        {/* Statistics Section */}
        <StatsContainer>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <StatIcon>
              <FaDollarSign size={24} />
            </StatIcon>
            <StatValue>$45,000</StatValue>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <StatIcon>
              <FaChartLine size={24} />
            </StatIcon>
            <StatValue>120%</StatValue>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <StatIcon>
              <FaUserCircle size={24} />
            </StatIcon>
            <StatValue>350 Users</StatValue>
          </StatCard>
        </StatsContainer>

        {/* Input to Add Stock */}
        <input
          type="text"
          placeholder="Add stock symbol (e.g., AAPL)"
          value={stockInput}
          onChange={(e) => setStockInput(e.target.value)}
        />
        <button onClick={handleAddStock}>Add Stock</button>

        {/* Charts for Each Stock in the Portfolio */}
        {portfolio.map((stock, index) => (
          <ChartContainer key={index}>
            <h2>{stock} Stock Overview</h2>
            <Line data={prepareChartData(stockData[stock])} />
          </ChartContainer>
        ))}
      </MainContent>
    </Container>
  );
};

export default DashboardPage;
