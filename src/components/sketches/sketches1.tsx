import p5 from "p5";
import P5Wrapper from "../commons/p5Wrapper";

const helloSketch = (p: p5) => {
  const message = "Hello, Noppheera!";
  const waveAmplitude = 20;
  const waveFrequency = 0.2;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textSize(48);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(20);
    p.fill(255);
    p.noStroke();

    let startX = p.width / 2 - p.textWidth(message) / 2;
    let y = p.height / 2;

    for (let i = 0; i < message.length; i++) {
      let letter = message[i];
      let x = startX + p.textWidth(message.substring(0, i));
      let yOffset =
        p.sin(p.frameCount * 0.1 + i * waveFrequency + p.mouseX * 0.01) *
        waveAmplitude;
      p.text(letter, x, y + yOffset);
    }
  };
};

const HelloSketch = () => {
  return <P5Wrapper sketch={helloSketch} />;
};

export default HelloSketch;
