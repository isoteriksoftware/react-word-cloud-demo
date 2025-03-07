"use client";

import { Footer } from "../Footer";
import { TextArea } from "../TextArea";
import { Button } from "../Button";
import { SpiralValue, WordCloud } from "@isoterik/react-word-cloud";
import { Toaster } from "react-hot-toast";
import { useDemoPage } from "@/common/hooks";

export const DemoPage = () => {
  const {
    text,
    svgRef,
    timeInterval,
    spiral,
    padding,
    font,
    fontStyle,
    transition,
    enableTooltip,
    sortedWords,
    resoleFontWeight,
    resolveRotate,
    resolveFill,
    resolveFontSize,
    resoleTooltipRenderer,
    resolveWordRenderer,
    handleWordClick,
    handleWordMouseOver,
    handleWordMouseOut,
    handleTextChange,
    handleGenerateCloud,
    GRADIENTS,
  } = useDemoPage();

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Toaster />

      <div
        style={{
          width: "100%",
          height: "90%",
          display: "flex",
          alignItems: "center",
          gap: "50px",
          padding: "30px",
        }}
      >
        <div
          style={{
            width: "30%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TextArea value={text} onChange={handleTextChange} placeholder="Type the words here..." />
          <Button label="Generate Cloud" onClick={handleGenerateCloud} />
        </div>

        <div
          style={{
            width: "70%",
            paddingRight: "5%",
            height: "70%",
          }}
        >
          <WordCloud
            ref={svgRef}
            words={sortedWords}
            width={1800}
            height={1000}
            gradients={GRADIENTS}
            timeInterval={timeInterval}
            spiral={spiral as SpiralValue}
            transition={transition}
            font={font}
            fontStyle={fontStyle}
            fontWeight={resoleFontWeight}
            fontSize={resolveFontSize}
            fill={resolveFill}
            padding={padding}
            rotate={resolveRotate}
            renderWord={resolveWordRenderer}
            renderTooltip={resoleTooltipRenderer}
            enableTooltip={enableTooltip}
            onWordClick={handleWordClick}
            onWordMouseOver={handleWordMouseOver}
            onWordMouseOut={handleWordMouseOut}
          />
        </div>
      </div>

      <div
        style={{
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Footer />
      </div>
    </main>
  );
};
