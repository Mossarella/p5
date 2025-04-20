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

    p.line(100, 100, 400, 400);

    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = p.lerp(100, 400, t);
      const y = p.lerp(100, 400, t) + p.sin(t * 20 + p.frameCount * 0.1) * 20;
      p.circle(x, y, 2);
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
