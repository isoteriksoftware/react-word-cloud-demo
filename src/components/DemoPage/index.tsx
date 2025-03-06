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
How the Word Cloud Generator Works

The layout algorithm for positioning words without overlap is available on GitHub under an open source license as d3-cloud. Note that this is the only the layout algorithm and any code for converting text into words and rendering the final output requires additional development.

As word placement can be quite slow for more than a few hundred words, the layout algorithm can be run asynchronously, with a configurable time step size. This makes it possible to animate words as they are placed without stuttering. It is recommended to always use a time step even without animations as it prevents the browser’s event loop from blocking while placing the words.

The layout algorithm itself is incredibly simple. For each word, starting with the most “important”:

Attempt to place the word at some starting point: usually near the middle, or somewhere on a central horizontal line.
If the word intersects with any previously placed words, move it one step along an increasing spiral. Repeat until no intersections are found.
The hard part is making it perform efficiently! According to Jonathan Feinberg, Wordle uses a combination of hierarchical bounding boxes and quadtrees to achieve reasonable speeds.

Glyphs in JavaScript

There isn’t a way to retrieve precise glyph shapes via the DOM, except perhaps for SVG fonts. Instead, we draw each word to a hidden canvas element, and retrieve the pixel data.

Retrieving the pixel data separately for each word is expensive, so we draw as many words as possible and then retrieve their pixels in a batch operation.

Sprites and Masks

My initial implementation performed collision detection using sprite masks. Once a word is placed, it doesn't move, so we can copy it to the appropriate position in a larger sprite representing the whole placement area.

The advantage of this is that collision detection only involves comparing a candidate sprite with the relevant area of this larger sprite, rather than comparing with each previous word separately.

Somewhat surprisingly, a simple low-level hack made a tremendous difference: when constructing the sprite I compressed blocks of 32 1-bit pixels into 32-bit integers, thus reducing the number of checks (and memory) by 32 times.

In fact, this turned out to beat my hierarchical bounding box with quadtree implementation on everything I tried it on (even very large areas and font sizes). I think this is primarily because the sprite version only needs to perform a single collision test per candidate area, whereas the bounding box version has to compare with every other previously placed word that overlaps slightly with the candidate area.

Another possibility would be to merge a word’s tree with a single large tree once it is placed. I think this operation would be fairly expensive though compared with the analagous sprite mask operation, which is essentially ORing a whole block.
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
            width: "40%",
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
            paddingRight: "30px",
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
