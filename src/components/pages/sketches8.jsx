import p5 from "p5";
import P5Wrapper from "../commons/p5Wrapper";

const sketch = (p) => {
  let lines = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);
    p.stroke(0);
    p.noFill();

    // Create lines
    for (let y = 0; y < p.height; y += 10) {
      lines.push(new FlowLine(p, y));
    }
  };

  p.draw = () => {
    p.background(255); // White background
    p.translate(0, 0);

    for (let line of lines) {
      line.update();
      line.display();
    }
  };

  class FlowLine {
    constructor(p, y) {
      this.p = p;
      this.y = y;
      this.offset = p.random(1000); // random start for noise
    }

    update() {
      this.offset += 0.005; // Slow wave movement
    }

    display() {
      const { p } = this;
      p.beginShape();
      for (let x = 0; x < p.width; x += 10) {
        let noiseVal = p.noise(x * 0.005, this.offset);
        let yOffset = p.map(noiseVal, 0, 1, -50, 50);

        // 🌊 Ripple effect based on distance to mouse
        let distanceToMouse = p.dist(x, this.y, p.mouseX, p.mouseY);
        let ripple = p.sin(distanceToMouse * 0.05 - p.frameCount * 0.1) * 20;
        // ^ distance wave + animated by frameCount
        ripple *= p.exp(-distanceToMouse * 0.005);
        // ^ make ripple fade farther away

        p.vertex(x, this.y + yOffset + ripple);
      }
      p.endShape();
    }
  }
};

new p5(sketch);

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};
export default Sketches;
