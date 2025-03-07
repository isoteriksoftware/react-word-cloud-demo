"use client";

import { Footer } from "../Footer";
import { TextArea } from "../TextArea";
import { ChangeEvent, Ref, useCallback, useMemo, useState } from "react";
import { Button } from "../Button";
import { extractWords } from "@/common/utils";
import {
  DefaultTooltipRenderer,
  SpiralValue,
  TooltipRendererData,
  Word,
  WordCloud,
  WordRendererData,
  AnimatedWordRenderer,
  Gradient,
  defaultFill,
} from "react-word-cloud";
import { useDemoControls } from "@/common/hooks";
import toast, { Toaster } from "react-hot-toast";

const INITIAL_TEXT = `
THE MODERN WEB DEVELOPMENT LANDSCAPE: HARNESSING CUTTING-EDGE TOOLS FOR DYNAMIC APPLICATIONS

In today’s fast-paced digital world, web development has evolved into a multifaceted discipline where innovation, performance, and scalability are paramount. Modern web applications benefit from a combination of powerful libraries, build tools, and visualization frameworks that work together seamlessly. This article explores key technologies—React, Vite, D3, d3-cloud, and Next.js—that are shaping the future of fullstack development and discusses how they can be integrated to build dynamic, data-driven experiences.

REACT: THE FOUNDATION OF INTERACTIVE USER INTERFACES

React has transformed the way developers build user interfaces with its component-based architecture that enables the creation of reusable and modular UI components that update efficiently when data changes. Its declarative nature simplifies the process of managing complex state and ensures that the UI remains in sync with underlying data. Developers leverage hooks such as useState, useEffect, useCallback, and useMemo to encapsulate logic and optimize rendering performance. By applying memoization techniques and building pure functional components, applications built with React can handle high-frequency updates and dynamic content without sacrificing speed or responsiveness.

VITE: ACCELERATING DEVELOPMENT WITH NEXT-GENERATION BUILD TOOLS

Vite has emerged as a revolutionary build tool designed for modern web development. With near-instant hot module replacement and lightning-fast startup times, Vite significantly reduces the feedback loop during development. Unlike traditional bundlers that rely on complex configurations, Vite leverages native ES modules in the browser, making it ideal for rapid prototyping and iterative development. Its built-in TypeScript support, along with features such as code splitting and tree-shaking, enables developers to maintain a clean and efficient codebase. Vite’s streamlined configuration and focus on performance have made it indispensable in modern web development workflows.

D3 AND D3-CLOUD: TRANSFORMING DATA INTO INTERACTIVE VISUALIZATIONS

Data visualization plays a crucial role in modern applications, and D3.js is widely recognized as the leader in this area. D3 binds data to the DOM and applies data-driven transformations, enabling developers to create stunning, interactive visualizations that communicate complex information effectively. A particularly interesting application of D3 is the creation of word clouds using d3-cloud. This specialized layout algorithm dynamically computes positions, rotations, and sizes for words based on their frequency or importance, resulting in an engaging visual representation of textual data that adapts to various datasets. Integrating d3-cloud with D3’s visualization capabilities produces word clouds that are not only aesthetically pleasing but also rich in information, making them powerful tools for data analysis and storytelling.

NEXT.JS: BRIDGING THE GAP BETWEEN FRONTEND AND BACKEND

Next.js has redefined fullstack web development by seamlessly integrating server-side rendering, static site generation, and client-side interactivity. This robust framework enables developers to build high-performance, SEO-friendly web applications with minimal configuration. With its file-based routing, built-in API routes, and support for incremental static regeneration, Next.js simplifies the management of both frontend and backend logic within a single codebase. By combining Next.js with React, developers can create applications that render dynamic content quickly and reliably, whether serving pre-rendered pages or handling real-time data updates. Next.js offers the flexibility needed to deliver smooth, responsive user experiences across a variety of devices and network conditions.

INTEGRATING TECHNOLOGIES FOR A COHESIVE FULLSTACK EXPERIENCE

The true power of modern web development lies in the ability to integrate diverse technologies into a cohesive workflow. A single application can use React for its dynamic user interface, Vite for rapid development and fast builds, D3 and d3-cloud for compelling data visualizations, and Next.js to manage both client-side interactions and server-side logic. This integration allows developers to build applications that are visually engaging, robust, and scalable. For example, an application might display a dynamic word cloud generated from user-provided text. React components manage user interactions and state, d3-cloud calculates the layout asynchronously to avoid blocking the main thread, Vite accelerates the development process, and Next.js ensures the application is optimized for SEO and interactivity. Together, these technologies form a seamless ecosystem that empowers developers to create high-quality, innovative web applications.

BEST PRACTICES IN MODERN WEB DEVELOPMENT

Modern web development is not just about using the latest tools—it’s about applying best practices to ensure performance, maintainability, and user satisfaction. Developers today focus on:

Performance Optimization: Utilizing techniques like memoization, lazy loading, and code splitting to ensure smooth performance even with dynamic, data-intensive applications.
Responsive Design: Building interfaces that adapt to various screen sizes and devices, ensuring that visualizations like word clouds remain legible and well-organized.
Modular Architecture: Organizing code into reusable components and hooks to manage complexity and improve maintainability.
Continuous Learning: Staying updated with the latest frameworks and technologies, experimenting with new tools, and continuously refining one’s skills.
Seamless Integration: Combining different tools—React, Vite, D3, d3-cloud, and Next.js—into a unified development workflow to deliver efficient, scalable, and interactive applications.
CONCLUSION

The modern web development landscape is rich with powerful tools and frameworks that empower developers to create dynamic, interactive, and scalable applications. By harnessing React’s component model, Vite’s blazing-fast builds, D3’s data visualization prowess, d3-cloud’s specialized word layout algorithm, and Next.js’s fullstack capabilities, developers can build applications that are not only technically impressive but also deeply engaging for users. This harmonious integration of technologies, combined with best practices and a commitment to continuous learning, is defining the future of web development. As these tools continue to evolve, the journey of innovation will push the boundaries of what’s possible on the web, paving the way for increasingly sophisticated digital experiences.
` as const;

export const GRADIENTS: Gradient[] = [
  {
    id: "gradient1",
    type: "linear",
    angle: 45,
    stops: [
      { offset: "0%", color: "#ff7e5f" },
      { offset: "100%", color: "#feb47b" },
    ],
  },
  {
    id: "gradient2",
    type: "linear",
    angle: 90,
    stops: [
      { offset: "0%", color: "#43cea2" },
      { offset: "100%", color: "#185a9d" },
    ],
  },
  {
    id: "gradient3",
    type: "linear",
    angle: 135,
    stops: [
      { offset: "0%", color: "#f7971e" },
      { offset: "50%", color: "#ffd200" },
      { offset: "100%", color: "#ff7e5f" },
    ],
  },
  {
    id: "gradient4",
    type: "radial",
    stops: [
      { offset: "0%", color: "#6a11cb" },
      { offset: "100%", color: "#2575fc" },
    ],
  },
  {
    id: "gradient5",
    type: "linear",
    angle: 0,
    stops: [
      { offset: "0%", color: "#ff4e50" },
      { offset: "100%", color: "#f9d423" },
    ],
  },
  {
    id: "gradient6",
    type: "radial",
    stops: [
      { offset: "0%", color: "#1a2980" },
      { offset: "100%", color: "#26d0ce" },
    ],
  },
  {
    id: "gradient7",
    type: "linear",
    angle: 60,
    stops: [
      { offset: "0%", color: "#00c6ff" },
      { offset: "100%", color: "#0072ff" },
    ],
  },
  {
    id: "gradient8",
    type: "linear",
    angle: 120,
    stops: [
      { offset: "0%", color: "#f953c6" },
      { offset: "100%", color: "#b91d73" },
    ],
  },
  {
    id: "gradient9",
    type: "radial",
    stops: [
      { offset: "0%", color: "#43e97b" },
      { offset: "100%", color: "#38f9d7" },
    ],
  },
  {
    id: "gradient10",
    type: "linear",
    angle: 30,
    stops: [
      { offset: "0%", color: "#ee0979" },
      { offset: "50%", color: "#ff6a00" },
      { offset: "100%", color: "#f7971e" },
    ],
  },
  {
    id: "gradient11",
    type: "linear",
    angle: 75,
    stops: [
      { offset: "0%", color: "#2193b0" },
      { offset: "100%", color: "#6dd5ed" },
    ],
  },
  {
    id: "gradient12",
    type: "radial",
    stops: [
      { offset: "0%", color: "#cc2b5e" },
      { offset: "100%", color: "#753a88" },
    ],
  },
  {
    id: "gradient13",
    type: "linear",
    angle: 150,
    stops: [
      { offset: "0%", color: "#42275a" },
      { offset: "100%", color: "#734b6d" },
    ],
  },
  {
    id: "gradient14",
    type: "radial",
    stops: [
      { offset: "0%", color: "#ff0844" },
      { offset: "100%", color: "#ffb199" },
    ],
  },
  {
    id: "gradient15",
    type: "linear",
    angle: 90,
    stops: [
      { offset: "0%", color: "#00d2ff" },
      { offset: "100%", color: "#3a7bd5" },
    ],
  },
] as const;

export const DemoPage = () => {
  const [text, setText] = useState<string>(INITIAL_TEXT);
  const [textToUse, setTextToUse] = useState<string>(INITIAL_TEXT);

  const {
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
    useGradients,
  } = useDemoControls();

  const words = useMemo(() => extractWords(textToUse), [textToUse]);

  const sortedWords = useMemo(
    () => words.sort((a, b) => b.value - a.value).slice(0, maxWords),
    [maxWords, words],
  );

  const [minOccurrences, maxOccurrences] = useMemo(() => {
    const min = Math.min(...sortedWords.map((w) => w.value));
    const max = Math.max(...sortedWords.map((w) => w.value));
    return [min, max];
  }, [sortedWords]);

  const calculateFontSize = useCallback(
    (wordOccurrences: number) => {
      const normalizedValue =
        (wordOccurrences - minOccurrences) / (maxOccurrences - minOccurrences);
      const fontSize = minFontSize + normalizedValue * (maxFontSize - minFontSize);
      return Math.round(fontSize);
    },
    [maxFontSize, maxOccurrences, minFontSize, minOccurrences],
  );

  const calculateFontWeight = useCallback(
    (wordOccurrences: number) => {
      const normalizedValue =
        (wordOccurrences - minOccurrences) / (maxOccurrences - minOccurrences);
      const fontWeight = minFontWeight + normalizedValue * (maxFontWeight - minFontWeight);
      return Math.round(fontWeight);
    },
    [maxFontWeight, maxOccurrences, minFontWeight, minOccurrences],
  );

  const resoleFontWeight = useCallback(
    (word: Word) => {
      return calculateFontWeight(word.value);
    },
    [calculateFontWeight],
  );

  const resolveRotate = useCallback(() => {
    return Math.floor(Math.random() * (maxRotation - minRotation + 1) + minRotation);
  }, [maxRotation, minRotation]);

  const resolveGradientFill = useCallback(() => {
    const gradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
    return `url(#${gradient.id})`;
  }, []);

  const resolveFill = useCallback(
    (word: Word, index: number) => {
      if (useGradients) {
        return resolveGradientFill();
      } else {
        return typeof defaultFill === "function" ? defaultFill(word, index) : defaultFill;
      }
    },
    [resolveGradientFill, useGradients],
  );

  const resolveFontSize = useCallback(
    (word: Word) => {
      return calculateFontSize(word.value);
    },
    [calculateFontSize],
  );

  const resoleTooltipRenderer = useCallback(
    (data: TooltipRendererData) => (
      <DefaultTooltipRenderer
        data={data}
        containerStyle={{
          borderRadius: "10px",
          flexDirection: "column",
          minWidth: "100px",
          background: `${useGradients ? "rgba(0, 0, 0, .9)" : data.word?.fill}E6`,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
        textStyle={{
          fontFamily: data.word?.font,
          fontSize: "16px",
          fontWeight: data.word?.weight,
        }}
        valueStyle={{
          fontFamily: "Arial",
          fontSize: "16px",
          fontWeight: "normal",
        }}
      />
    ),
    [useGradients],
  );

  const resolveWordRenderer = useCallback(
    (data: WordRendererData, ref: Ref<SVGTextElement> | undefined) => (
      <AnimatedWordRenderer
        data={data}
        ref={ref}
        animationDelay={(_word, index) => index * animationDurationMultiplier}
      />
    ),
    [animationDurationMultiplier],
  );

  const handleWordClick = useCallback((word: Word) => {
    toast.success(`Clicked on word: ${word.text}`);
  }, []);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleGenerateCloud = () => {
    setTextToUse(text);
  };

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
