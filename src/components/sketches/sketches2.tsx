import p5 from "p5";
import P5Wrapper from "../commons/p5Wrapper";
import { Block } from "@/components/prefabs/block";

const sketch2 = (p: p5) => {
  let rotateAngle: number = 0;
  let distMouse: number = 50;
  let cols: number;
  let rows: number;
  let size: number = 50;
  let blocks: Block[][] = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode("center");
    p.angleMode("degrees");
    cols = p.width / size;
    rows = p.height / size;

    for (let i = 0; i < cols; i++) {
      blocks[i] = [];
      for (let j = 0; j < rows; j++) {
        blocks[i][j] = new Block(p, size / 2 + i * size, size / 2 + j * size);
      }
    }
  };

  p.draw = () => {
    p.background(220);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        blocks[i][j].move(distMouse);
        blocks[i][j].display();
      }
    }
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch2} />;
};

export default Sketches;
