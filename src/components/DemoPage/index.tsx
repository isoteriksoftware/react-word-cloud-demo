"use client";

import { Footer } from "../Footer";
import { TextArea } from "../TextArea";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Button } from "../Button";
import { extractWords } from "@/common/utils";
import {
  Word,
  WordCloud,
  WordRendererData,
  AnimatedWordRenderer,
  TooltipRendererData,
  DefaultTooltipRenderer,
} from "react-word-cloud";

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

const MAX_FONT_SIZE = 200;
const MIN_FONT_SIZE = 30;
const MAX_FONT_WEIGHT = 700;
const MIN_FONT_WEIGHT = 400;
const MAX_WORDS = 300;
const rotationWeights = [0, 0, 90, 270];

export const DemoPage = () => {
  const [text, setText] = useState<string>(INITIAL_TEXT);
  const [textToUse, setTextToUse] = useState<string>(INITIAL_TEXT);

  const words = useMemo(() => extractWords(textToUse), [textToUse]);

  const sortedWords = useMemo(
    () => words.sort((a, b) => b.value - a.value).slice(0, MAX_WORDS),
    [words],
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
      const fontSize = MIN_FONT_SIZE + normalizedValue * (MAX_FONT_SIZE - MIN_FONT_SIZE);
      return Math.round(fontSize);
    },
    [maxOccurrences, minOccurrences],
  );

  const calculateFontWeight = useCallback(
    (wordOccurrences: number) => {
      const normalizedValue =
        (wordOccurrences - minOccurrences) / (maxOccurrences - minOccurrences);
      const fontWeight = MIN_FONT_WEIGHT + normalizedValue * (MAX_FONT_WEIGHT - MIN_FONT_WEIGHT);
      return Math.round(fontWeight);
    },
    [maxOccurrences, minOccurrences],
  );

  const resoleFontWeight = useCallback(
    (word: Word) => {
      return calculateFontWeight(word.value);
    },
    [calculateFontWeight],
  );

  const resolveRotate = useCallback(() => {
    return rotationWeights[Math.floor(Math.random() * rotationWeights.length)];
  }, []);

  const resolveFontSize = useCallback(
    (word: Word) => {
      return calculateFontSize(word.value);
    },
    [calculateFontSize],
  );

  const resolveWordRenderer = useCallback(
    (data: WordRendererData) => <AnimatedWordRenderer data={data} />,
    [],
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
          fontFamily: "Arial",
          fontSize: "16px",
        }}
      />
    ),
    [],
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
          gap: "30px",
          padding: "30px",
        }}
      >
        <div
          style={{
            width: "30%",
            height: "80%",
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
          }}
        >
          <WordCloud
            words={words}
            width={1800}
            height={1000}
            font={"Impact"}
            fontWeight={resoleFontWeight}
            padding={1}
            fontSize={resolveFontSize}
            rotate={resolveRotate}
            renderWord={resolveWordRenderer}
            renderTooltip={resoleTooltipRenderer}
            enableTooltip
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
