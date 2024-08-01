import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Plot from "react-plotlyjs";
import axios from "axios";
import "./Home.scss";

const HousePriceForecast = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [model, setModel] = useState("");
  const [modelParams, setModelParams] = useState({});
  const [features, setFeatures] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [performance, setPerformance] = useState({});

  const handleFeatureChange = (e) => {
    const { name, checked } = e.target;
    setFeatures((prev) => (checked ? [...prev, name] : prev.filter((f) => f !== name)));
  };

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setModelParams((prev) => ({ ...prev, [name]: value }));
  };

  // TODO: change url
  const handleSubmit = async () => {
    const response = await axios.post("/api/forecast", {
      startDate,
      endDate,
      model,
      modelParams,
      features,
    });
    setForecastData(response.data.forecast);
    setPerformance(response.data.performance);
  };

  return (
    <div className="home">
      <form className="homeForm">
        <h2>Machine Learning House Price Forecasting in East London</h2>
        <h3>Date Range Selection</h3>
        <div style={{ display: "flex", flexDirection: "column", rowGap: ".5rem" }}>
          <div>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </div>
        </div>
        <div>
          <h3>Model Selection</h3>

          <label>
            <input
              type="radio"
              value="linear"
              checked={model === "linear"}
              onChange={() => setModel("linear")}
            />
            Linear Regression
          </label>
          <label>
            <input type="radio" value="tree" checked={model === "tree"} onChange={() => setModel("tree")} />
            Decision Tree
          </label>
          <label>
            <input
              type="radio"
              value="forest"
              checked={model === "forest"}
              onChange={() => setModel("forest")}
            />
            Random Forest
          </label>
        </div>

        {model === "tree" && (
          <div>
            <h3>Decision Tree Parameters</h3>
            <label>
              Max Depth:
              <input type="number" name="max_depth" onChange={handleParamChange} />
            </label>
            <label>
              Min Samples Split:
              <input type="number" name="min_samples_split" onChange={handleParamChange} />
            </label>
          </div>
        )}
        {model === "forest" && (
          <div>
            <h3>Random Forest Parameters</h3>
            <label>
              Number of Estimators:
              <input type="number" name="n_estimators" onChange={handleParamChange} />
            </label>
            <label>
              Max Depth:
              <input type="number" name="max_depth" onChange={handleParamChange} />
            </label>
            <label>
              Min Samples Split:
              <input type="number" name="min_samples_split" onChange={handleParamChange} />
            </label>
          </div>
        )}

        <div>
          <h3>Feature Selection</h3>
          <label>
            <input type="checkbox" name="year" onChange={handleFeatureChange} />
            Year
          </label>
          <label>
            <input type="checkbox" name="month" onChange={handleFeatureChange} />
            Month
          </label>
          <label>
            <input type="checkbox" name="day" onChange={handleFeatureChange} />
            Day
          </label>
        </div>
        <button style={{ width: "10rem", borderRadius: ".3rem" }} onClick={handleSubmit}>
          Submit
        </button>
        <div>
          <h3>Results and Visualization</h3>
          <Plot data={forecastData} layout={{ title: "House Price Forecast" }} />
          <div>
            <p>MAE: {performance.mae}</p>
            <p>MSE: {performance.mse}</p>
            <p>RMSE: {performance.rmse}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HousePriceForecast;
