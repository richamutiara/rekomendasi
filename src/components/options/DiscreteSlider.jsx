/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: -7,
    label: "7",
  },
  {
    value: -5,
    label: "5",
  },
  {
    value: -3,
    label: "3",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 7,
    label: "7",
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSliderMarks({ left, right, onChange }) {
  return (
    <Box sx={{ width: 300, display: "flex", gap: "1rem" }}>
      <span>{left}</span>
      <Slider
        aria-label="Restricted values"
        defaultValue={3}
        getAriaValueText={valuetext}
        step={null}
        onChange={onChange}
        valueLabelDisplay="off"
        marks={marks}
        min={-7}
        max={7}
      />
      <span>{right}</span>
    </Box>
  );
}
