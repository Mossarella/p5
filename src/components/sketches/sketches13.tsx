import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
const sketch = (p: p5) => {
  let cols, rows;
  let spacing = 20;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    cols = Math.floor(p.width / spacing);
    rows = Math.floor(p.height / spacing);
    p.noStroke();
  };

  p.draw = () => {
    p.background(255);

    p.translate(
      p.width / 2 - (cols * spacing) / 2,
      p.height / 2 - (rows * spacing) / 2
    );

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        // Grid points
        let x1 = x * spacing;
        let y1 = y * spacing;
        let x2 = (x + 1) * spacing;
        let y2 = (y + 1) * spacing;

        // Apply heavy noise offset
        let offset1 = bigOffset(x1, y1);
        let offset2 = bigOffset(x2, y1);
        let offset3 = bigOffset(x2, y2);
        let offset4 = bigOffset(x1, y2);

        if ((x + y) % 2 == 0) {
          p.fill(0);
        } else {
          p.fill(255);
        }

        p.beginShape();
        p.vertex(x1 + offset1.x, y1 + offset1.y);
        p.vertex(x2 + offset2.x, y1 + offset2.y);
        p.vertex(x2 + offset3.x, y2 + offset3.y);
        p.vertex(x1 + offset4.x, y2 + offset4.y);
        p.endShape(p.CLOSE);
      }
    }
  };

  function bigOffset(x, y) {
    let scale = 0.002; // finer noise
    let t = p.frameCount * 0.005;

    let nX = p.noise(x * scale, y * scale, t);
    let nY = p.noise(x * scale + 1000, y * scale + 1000, t);

    return {
      x: p.map(nX, 0, 1, -100, 100), // 🔥 BIG offset
      y: p.map(nY, 0, 1, -100, 100),
    };
  }
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;

// desc: perlin pattern
