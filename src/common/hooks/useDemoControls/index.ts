import { SpiralValue } from "react-word-cloud";
import { useControls } from "leva";

type DemoControls = {
  width: number;
  height: number;
  timeInterval: number;
  spiral: string;
  padding: number;
  font: string;
  fontStyle: string;
  transition: string;
  minFontSize: number;
  maxFontSize: number;
  minFontWeight: number;
  maxFontWeight: number;
  minRotation: number;
  maxRotation: number;
  maxWords: number;
  animationDurationMultiplier: number;
  enableTooltip: boolean;
};

export function useDemoControls(): DemoControls {
  const {
    width,
    height,
    timeInterval,
    spiral,
    padding,
    font,
    fontStyle,
    transition,
    minFontSize,
    maxFontSize,
    minFontWeight,
    maxFontWeight,
    minRotation,
    maxRotation,
    maxWords,
    animationDurationMultiplier,
    enableTooltip,
  } = useControls({
    width: { value: 1800, min: 100, max: 3000, step: 10, label: "Width" },
    height: { value: 1000, min: 100, max: 3000, step: 10, label: "Height" },
    timeInterval: { value: 1, min: 0, max: 9999, step: 0.1, label: "Time Interval" },
    spiral: { value: "archimedean", options: ["archimedean", "rectangular"], label: "Spiral" },
    padding: { value: 1, min: 0, max: 1000, step: 1, label: "Padding" },
    font: {
      value: "Impact",
      options: [
        "Impact",
        "Inter",
        "Open Sans",
        "Lato",
        "Montserrat",
        "Oswald",
        "Raleway",
        "Roboto Condensed",
        "PT Sans",
        "Nunito",
        "Poppins",
        "Quicksand",
        "Ubuntu",
        "Merriweather",
        "Libre Baskerville",
        "Anton",
        "Bebas Neue",
        "Josefin Sans",
        "Courier New",
        "Cursive",
        "Arial",
        "Fantasy",
      ],
      label: "Font",
    },
    fontStyle: { value: "normal", options: ["normal", "italic", "oblique"], label: "Font Style" },
    transition: { value: "all .5s ease", label: "Transition" },
    minFontSize: { value: 30, min: 10, max: 1000, step: 10, label: "Min Font Size" },
    maxFontSize: { value: 100, min: 10, max: 1000, step: 10, label: "Max Font Size" },
    minFontWeight: { value: 400, min: 100, max: 900, step: 100, label: "Min Font Weight" },
    maxFontWeight: { value: 900, min: 100, max: 900, step: 100, label: "Max Font Weight" },
    minRotation: { value: -270, min: -360, max: 360, step: 10, label: "Min Rotation" },
    maxRotation: { value: 270, min: -360, max: 360, step: 10, label: "Max Rotation" },
    maxWords: { value: 300, min: 1, max: 1000, step: 1, label: "Max Words" },
    animationDurationMultiplier: {
      value: 10,
      min: 1,
      max: 1000,
      step: 1,
      label: "Entrance Delay Multiplier",
    },
    enableTooltip: { value: true, label: "Enable Tooltip" },
  });

  return {
    width,
    height,
    timeInterval,
    spiral,
    padding,
    font,
    fontStyle,
    transition,
    minFontSize,
    maxFontSize,
    minFontWeight,
    maxFontWeight,
    minRotation,
    maxRotation,
    maxWords,
    animationDurationMultiplier,
    enableTooltip,
  };
}
