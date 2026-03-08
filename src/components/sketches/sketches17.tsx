import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
import { useParams } from "next/navigation";
const sketch = (p: p5) => {
  p.preload = () => {
    // font = p.loadFont(
    //   "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
    // );
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    // p.rectMode("center");
    p.angleMode("degrees");
    // p.noLoop();
  };

  p.draw = () => {
    // p.background(255, 10);
    p.background(255);
    p.noFill();

    for (let a = 0; a < 360; a += 5) {
      const r = a * 0.5;
      const x = p.width / 2 + r * p.cos(a);
      const y = p.height / 2 + r * p.sin(a);
      p.circle(x, y, 5);
    }
  };
};

const Sketches = () => {
  const params = useParams();
  const slug = params.sketch as string;

  console.log(slug);
  return (
    <P5Wrapper
      name={slug}
      sketch={sketch}
    />
  );
};

export default Sketches;

// desc: perlin pattern
