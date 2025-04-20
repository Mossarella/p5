import p5 from "p5";
import P5Wrapper from "../commons/p5Wrapper";

const sketch2 = (p: p5) => {
  let x;
  let y;
  let x2 = [];
  let y2 = [];
  let angle = 0;
  let shiftingAngle: number[] = [];
  let numAxis = 8;
  let r = 150;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode("center");
    p.angleMode("degrees");
    for (let i = 0; i < numAxis; i++) {
      shiftingAngle[i] = (i * 90) / numAxis;
    }
  };

  p.draw = () => {
    p.background(70, 148, 167);

    // angle = p.map(p.mouseX, 0, p.width, 0, 360);
    x = r * p.cos(angle);
    y = r * p.sin(angle);

    p.translate(p.width / 2, p.height / 2);
    p.noFill();
    p.ellipse(0, 0, r * 2, r * 2);
    p.noStroke();
    p.fill(255, 165, 0);
    p.ellipse(x, y, 20, 20);
    p.stroke(255, 100);
    for (let i = 0; i < numAxis; i++) {
      x2[i] = r * p.cos(angle + shiftingAngle[i]);
      y2[i] = r * p.sin(angle + shiftingAngle[i]);

      p.push();
      p.rotate(-shiftingAngle[i]);

      p.line(-r, 0, r, 0);
      p.line(0, -r, 0, r);
      p.fill(255);
      p.ellipse(x2[i], 0, 20, 20);
      p.ellipse(0, y2[i], 20, 20);
      p.pop();
    }
    angle += 1;
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch2} />;
};

export default Sketches;
