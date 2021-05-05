import React, { useRef, useState } from "react";
import styled from "styled-components";
import { VscDebugStart } from "react-icons/vsc";
import { VscDebugRestart } from "react-icons/vsc";
import { ImPause } from "react-icons/im";
import { swapTime, setArrayForSorting, setSpeed } from "./config";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";

function convertInputToArrayData(value) {
  value = value.replaceAll(/\s/g, "");
  value = value.replaceAll(/\d{4}/g, "");
  value = value.replaceAll(/\s\s/g, " ");
  value = value.replaceAll(/\s,/g, ",");
  value = value.replaceAll(/,,/g, ",");
  value = value.replaceAll(/[^0-9,\s]/g, "");
  return value;
}

export function Controller({ array, setArray, progress, setProgress }) {
  const [timeSpeed, setTimeSpeed] = useState(3000 / swapTime);

  function startHandler() {
    setProgress("start");
  }

  function pauseHandler() {
    setProgress("pause");
  }

  function resetHandler() {
    setProgress("reset");
  }

  function arrayDataChangeHandler(value) {
    const filteredValue = convertInputToArrayData(value);
    setArrayForSorting([...filteredValue.split(",")]);
    setArray(filteredValue);
    setProgress("reset");
  }

  function speedHandler(value) {
    setSpeed(+value);
    setTimeSpeed(+value);
  }

  function generate(){
    const randomArray = Array.from(new Array(Math.floor(Math.random() * 20 + 10)), () => Math.floor(Math.random() * 999));
    setArrayForSorting(randomArray);
    setArray(randomArray);
    setProgress("reset");
  }

  return (
    <div
      style={{
        fontSize: "2rem",
        display: "flex",
        alignItems: "center",
        margin: "10px 0",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Input"
        variant="outlined"
        onChange={(event) => arrayDataChangeHandler(event.target.value)}
        value={array}
        size="small"
        widht="100px"
        style={{ flexBasis: "50%", flexGrow: 1 }}
      />

      <button onClick={generate}>Generate</button>

      <Slider
        key={`slider-${timeSpeed}`}
        defaultValue={timeSpeed}
        onChange={(event, value) => speedHandler(value)}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        style={{margin: '0 20px', flexBasis: "30%"}}
      />

      <div style={{display: "flex"}}>
        {progress === "start" ? (
          <ImPause onClick={pauseHandler} />
        ) : (
          <VscDebugStart onClick={startHandler} />
        )}
        <VscDebugRestart onClick={resetHandler} />
      </div>
    </div>
  );
}
