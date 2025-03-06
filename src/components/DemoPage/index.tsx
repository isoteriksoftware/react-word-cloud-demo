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
} from "react-word-cloud";
import { useDemoControls } from "@/common/hooks";

const INITIAL_TEXT = `
In the rapidly evolving landscape of modern society, innovation stands as the lifeblood of progress. Over the past few decades, technological breakthroughs have redefined the way we communicate, work, and even think about our world. From the advent of the internet to the proliferation of smart devices, each development has woven a richer tapestry of opportunities and challenges.

At the heart of these advancements lies an insatiable human curiosity—a drive to explore, understand, and ultimately transform our environment. This inquisitive spirit has given rise to groundbreaking discoveries in science, medicine, and engineering. Researchers harness quantum mechanics to revolutionize computing, while medical professionals utilize genomic insights to create personalized treatments that defy conventional paradigms. The confluence of these disciplines has fostered an era of interdisciplinary synergy, where biology meets computer science, and physics blends with artificial intelligence.

Yet, innovation is not confined solely to technology. Artistic expression, too, has experienced a renaissance, catalyzed by digital tools that empower creators to push the boundaries of visual art, music, and literature. Contemporary artists leverage virtual reality to build immersive experiences that challenge the sensory perceptions of their audiences. Musicians experiment with algorithmically generated sounds, interlacing classical compositions with electronic beats to produce symphonies that transcend traditional genres. Writers and poets utilize digital platforms to share their narratives with a global audience, fostering cross-cultural dialogue and understanding.

The economic implications of such dynamic progress are equally profound. Global markets have shifted as entrepreneurial ventures harness the power of e-commerce, blockchain, and fintech to disrupt established industries. Startups emerge from bustling urban centers and remote rural hubs alike, each striving to solve persistent societal problems with novel solutions. Venture capital and crowdfunding have become integral in this ecosystem, channeling resources toward promising innovations while simultaneously challenging conventional financial models.

Education, another cornerstone of civilization, has undergone transformative change. Traditional classrooms are increasingly supplemented—or even replaced—by interactive, online learning environments. These platforms offer personalized learning experiences, adaptive testing, and real-time feedback, enabling students to acquire knowledge at their own pace. Such digital transformation is not only democratizing education but also equipping future generations with the critical skills necessary to thrive in an interconnected, digital economy.

Despite these positive trends, the journey is not without its hurdles. The acceleration of technological progress brings with it ethical dilemmas and regulatory challenges. Privacy concerns, cybersecurity threats, and the digital divide are just a few of the issues that require vigilant oversight. Policymakers and industry leaders must collaborate to establish frameworks that protect individual rights while encouraging innovation. The balance between innovation and regulation remains a delicate one—complex, yet essential for sustainable progress.

Environmental sustainability is another critical dimension of modern innovation. As global populations rise and resource consumption intensifies, the need for eco-friendly technologies becomes increasingly urgent. Renewable energy sources such as solar, wind, and geothermal power are transforming the global energy landscape, reducing reliance on fossil fuels and mitigating climate change. Innovations in waste management, water purification, and sustainable agriculture are equally important, as they aim to preserve the delicate equilibrium between human activity and the natural world.

Moreover, cultural shifts and social dynamics continue to shape the narrative of progress. The democratization of information via social media platforms has altered public discourse, challenging traditional media structures and giving voice to marginalized communities. In parallel, global connectivity fosters a multicultural dialogue that enriches the collective human experience. Social movements harness the power of digital networks to advocate for equality, environmental protection, and human rights, underscoring the pivotal role that technology plays in societal transformation.

In summary, the vibrant tapestry of modern innovation is an intricate blend of technological prowess, creative expression, economic dynamism, educational transformation, and environmental stewardship. Each thread in this tapestry is essential, contributing to a complex, interwoven narrative that defines our era. As we continue to navigate the challenges and opportunities of the 21st century, it is the collaborative spirit of humanity—its endless curiosity and resilience—that will ultimately guide us toward a brighter, more inclusive future.
` as const;

export const DemoPage = () => {
  const [text, setText] = useState<string>(INITIAL_TEXT);
  const [textToUse, setTextToUse] = useState<string>(INITIAL_TEXT);

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
          background: `${data.word?.fill}E6`, // 90% opacity
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
    [],
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
            width: "20%",
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
            flexGrow: 1,
            paddingRight: "5%",
            height: "90%",
          }}
        >
          <WordCloud
            words={sortedWords}
            width={width}
            height={height}
            timeInterval={timeInterval}
            spiral={spiral as SpiralValue}
            transition={transition}
            font={font}
            fontStyle={fontStyle}
            fontWeight={resoleFontWeight}
            fontSize={resolveFontSize}
            padding={padding}
            rotate={resolveRotate}
            renderWord={resolveWordRenderer}
            renderTooltip={resoleTooltipRenderer}
            enableTooltip={enableTooltip}
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
