import { removeStopwords } from "stopword";
import nlp from "compromise";
import { Word } from "@isoterik/react-word-cloud";

export const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

export const getTokens = (text: string): string[] => {
  const doc = nlp(text);
  let tokens: string[] = doc.terms().out("array");

  tokens = tokens.map((token) => token.replace(/\W/g, "").toLowerCase());

  return removeStopwords(tokens).filter((token) => token.length > 1);
};

export const extractWords = (text: string): Word[] => {
  const tokens = getTokens(text);
  const wordMap = new Map<string, number>();

  tokens.forEach((token) => {
    const count = wordMap.get(token) || 0;
    wordMap.set(token, count + 1);
  });

  return Array.from(wordMap.entries()).map(([text, value]) => ({ text: capitalize(text), value }));
};
