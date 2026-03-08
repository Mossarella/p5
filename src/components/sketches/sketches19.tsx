import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
import { useParams } from "next/navigation";
const sketch = (p: p5) => {
  const pixelSize = 2;
  const palette = ["#FF595E", "#1982C4", "#6A4C93", "#8AC926"];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
  };

  p.draw = () => {
    p.background(20);

    for (let y = 0; y < p.height; y += pixelSize) {
      for (let x = 0; x < p.width; x += pixelSize) {
        if (p.random() > 0.5) {
          p.fill(p.random(palette));
          p.rect(x, y, pixelSize, pixelSize);
        }
      }
    }

    p.noLoop(); // Draw once
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
