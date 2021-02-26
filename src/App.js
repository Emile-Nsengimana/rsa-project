import React, { useState, useEffect, useRef } from "react";
import CSVReader from "react-csv-reader";
import "./app.css";
import Chart from "chart.js";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
};

const App = () => {
  const [dataIn, setData] = useState([]);
  const [temp, setTemp] = useState([]);

  const handleUpload = (dataIn, fileInfo) => {
    setData(dataIn);
    setTemp(dataIn);
  };

  const male = dataIn.filter((dt) => dt.sex == "male");
  const female = dataIn.filter((dt) => dt.sex == "female");
  const pclass = dataIn.filter((dt) => dt.pclass == 1);
  const pclass2 = dataIn.filter((dt) => dt.pclass == 2);
  const pclass3 = dataIn.filter((dt) => dt.pclass == 3);
  const survived = dataIn.filter((dt) => dt.survived == true);
  const deaths = dataIn.filter((dt) => dt.survived == false);

  const handleAgeGroup = (from, to) => {
    return setData(dataIn.filter((dt) => dt.age >= from && dt.age <= to));
  };
  const handleReset = () => setData(temp);

  return (
    <>
      <div className="container">
        <div className="upload">
          <CSVReader
            cssClass="btn"
            label="Select Titanic data file"
            onFileLoaded={handleUpload}
            parserOptions={papaparseOptions}
          />
        </div>
        <div>
          <p>
            Choose age group(please use <b>Reset</b> button for the original
            data):{" "}
          </p>
          <button
            className="btn btn-primary ms-20"
            onClick={() => handleAgeGroup(0, 25)}
          >
            0 - 25
          </button>
          <button
            className="btn btn-primary ms-20"
            onClick={() => handleAgeGroup(25, 35)}
          >
            25 - 35
          </button>
          <button
            className="btn btn-primary ms-20"
            onClick={() => handleAgeGroup(35, 50)}
          >
            35 - 50
          </button>
          <button
            className="btn btn-primary ms-20"
            onClick={() => handleAgeGroup(50, 1000)}
          >
            {" "}
            50 and above
          </button>
          <button className="btn btn-primary ms-20" onClick={handleReset}>
            {" "}
            Reset
          </button>
        </div>
        <table>
          <tr>
            <td>
              Female: {female.length}{" "}
              <span class="badge bg-secondary">
                (
                {dataIn.length > 0
                  ? ((female.length * 100) / dataIn.length).toFixed(2)
                  : 0}
                %)
              </span>
            </td>
            <td>
              Survived: {female.filter((dt) => dt.survived == true).length}
              <span class="badge bg-secondary">
                (
                {dataIn.length > 0
                  ? (
                      (female.filter((dt) => dt.survived == true).length *
                        100) /
                      dataIn.length
                    ).toFixed(2)
                  : 0}
                %)
              </span>
            </td>
            <td>
              deaths: {deaths.filter((dt) => dt.sex == "female").length}
              <span class="badge bg-secondary">
                (
                {dataIn.length > 0
                  ? (
                      (deaths.filter((dt) => dt.sex == "female").length * 100) /
                      dataIn.length
                    ).toFixed(2)
                  : 0}
                %)
              </span>
            </td>
          </tr>
          <tr>
            <td>
              Male: {male.length}{" "}
              <span class="badge bg-secondary">
                (
                {dataIn.length > 0
                  ? ((male.length * 100) / dataIn.length).toFixed(2)
                  : 0}
                %)
              </span>
            </td>
            <td>
              Survived: {male.filter((dt) => dt.survived == true).length}
              <span class="badge bg-secondary">
                (
                {dataIn.length > 0
                  ? (
                      (male.filter((dt) => dt.survived == true).length * 100) /
                      dataIn.length
                    ).toFixed(2)
                  : 0}
                %)
              </span>
            </td>
            <td>
              deaths: {deaths.filter((dt) => dt.sex == "male").length}
              <span class="badge bg-secondary">
                (
                {dataIn.length > 0
                  ? (
                      (deaths.filter((dt) => dt.sex == "male").length * 100) /
                      dataIn.length
                    ).toFixed(2)
                  : 0}
                %)
              </span>
            </td>
          </tr>
          <tr>
            <td>Pclass 1</td>
            <td>
              {pclass.length}{" "}
              <span class="badge bg-secondary">
                (
                {dataIn.length > 0
                  ? ((pclass.length * 100) / dataIn.length).toFixed(2)
                  : 0}
                %)
              </span>
            </td>

            <td>
              survived: {pclass.filter((dt) => dt.survived == true).length}
              <span class="badge bg-secondary">
                (
                {dataIn.length > 0
                  ? ((survived.length * 100) / dataIn.length).toFixed(2)
                  : 0}
                %)
              </span>
            </td>
            <td>
              deaths: {pclass.filter((dt) => dt.survived == false).length}
              <span class="badge bg-secondary">
                (
                {dataIn.length > 0
                  ? ((deaths.length * 100) / dataIn.length).toFixed(2)
                  : 0}
                %)
              </span>
            </td>
          </tr>
          <tr>
            <td>Pclass 2</td>
            <td>
              {pclass2.length}{" "}
              <span class="badge bg-secondary">
                (
                {dataIn.length > 0
                  ? ((pclass2.length * 100) / dataIn.length).toFixed(2)
                  : 0}
                %)
              </span>
            </td>
            <td>
              survived: {pclass2.filter((dt) => dt.survived == true).length}
              <span class="badge bg-secondary">
                (
                {(
                  (pclass2.filter((dt) => dt.survived == true).length * 100) /
                  dataIn.length
                ).toFixed(2)}
                %)
              </span>
            </td>
            <td>
              deaths: {pclass2.filter((dt) => dt.survived == false).length}
              <span class="badge bg-secondary">
                ( (
                {(
                  (pclass2.filter((dt) => dt.survived == false).length * 100) /
                  dataIn.length
                ).toFixed(2)}
                %)
              </span>
            </td>
          </tr>
          <tr>
            <td>Pclass 3</td>
            <td>
              {pclass3.length}{" "}
              <span class="badge bg-secondary">
                (
                {dataIn.length > 0
                  ? ((pclass3.length * 100) / dataIn.length).toFixed(2)
                  : 0}
                %)
              </span>
            </td>
            <td>
              survived: {pclass3.filter((dt) => dt.survived == true).length}
              <span class="badge bg-secondary">
                (
                {dataIn.length > 0
                  ? (
                      (pclass3.filter((dt) => dt.survived == true).length *
                        100) /
                      dataIn.length
                    ).toFixed(2)
                  : 0}
                %)
              </span>
            </td>
            <td>
              deaths: {pclass3.filter((dt) => dt.survived == false).length}
              <span class="badge bg-secondary">
                ( (
                {dataIn.length > 0
                  ? (
                      (pclass3.filter((dt) => dt.survived == false).length *
                        100) /
                      dataIn.length
                    ).toFixed(2)
                  : 0}
                %)
              </span>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default App;
