import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
import { Word } from "@/components/prefabs/word";

const sketch = (p: p5) => {
  let sentenceOriginal = "HELLO";
  let sentence = "";
  let ringsCount = 8;

  let r0 = 30;

  let rings: any = [];
  let rIncrement: number = 25;

  let font: Font;

  p.preload = () => {
    font = p.loadFont("/fonts/Roboto-Medium.ttf");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode("center");
    p.angleMode("degrees");

    for (let i = 0; i < ringsCount; i++) {
      sentence = sentence.concat(sentenceOriginal);
      let r = r0 + rIncrement * (i + 1);
      let dir = i % 2 == 0 ? 1 : -1;
      let angleInc = 90 / (i + 1);
      let a = 255 - (255 / ringsCount) * i;
      let s = (i + 1) * 6;
      rings[i] = new Word(p, r, sentence, dir, angleInc, a, s, font);
    }
  };

  p.draw = () => {
    p.background(0, 0, 100);
    p.translate(p.width / 2, p.height / 2);

    for (let i = 0; i < ringsCount; i++) {
      rings[i].display();
      rings[i].update();
    }
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;
