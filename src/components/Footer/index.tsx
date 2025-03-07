/* eslint-disable @next/next/no-img-element */
import githubIcon from "@/assets/github.svg";

const GITHUB_USERNAME = "isoteriksoftware";
const NPM_USERNAME = "isoterik";
const LIBRARY_NAME = "react-word-cloud";
const DEMO_REPO = "react-word-cloud-demo";

export const Footer = () => {
  return (
    <footer
      style={{
        background: "#292828",
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        paddingTop: "16px",
      }}
    >
      <a href={`https://github.com/${GITHUB_USERNAME}/${DEMO_REPO}`} target="_blank">
        <img src={githubIcon.src} alt="Demo repo" width="40" height="40" />
      </a>

      <div
        style={{
          display: "flex",
          columnGap: "10px",
          justifyContent: "center",
          alignItems: "flex-start",
          flexGrow: 1,
        }}
      >
        <a href={`https://www.npmjs.com/package/@${NPM_USERNAME}/${LIBRARY_NAME}`} target="_blank">
          <img
            src={`https://img.shields.io/npm/v/@${NPM_USERNAME}/${LIBRARY_NAME}.svg`}
            alt="NPM"
          />
        </a>

        <img src={`https://img.shields.io/npm/dt/@${NPM_USERNAME}/${LIBRARY_NAME}.svg`} alt="NPM" />

        <a href={`https://github.com/${GITHUB_USERNAME}/${LIBRARY_NAME}`} target="_blank">
          <img
            src={`https://img.shields.io/github/stars/${GITHUB_USERNAME}/${LIBRARY_NAME}?style=social`}
            alt="GitHub stars"
          />
        </a>
      </div>
    </footer>
  );
};
