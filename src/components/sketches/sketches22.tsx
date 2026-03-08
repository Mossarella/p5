import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
import { useParams } from "next/navigation";

const sketch = (p: p5) => {
  let font;
  let letterPoints = [];
  let fontPath;
  let fontSize = 200;
  let rawPath;
  let path;

  let message = "WARP";
  const opentype = window.opentype;
  const gjs = window.g;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    opentype.load(
      "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf",
      (err, f) => {
        if (err) console.error(err);
        else {
          font = f;
          fontPath = font.getPath(message, 0, 0, fontSize);

          const cmds = fontPath.commands;

          rawPath = new gjs.Path(cmds);
          path = gjs.resampleByLength(rawPath, 8);

          for (let i = 0; i < path.commands.length; i++) {
            if (path.commands[i].type == "M") {
              letterPoints.push([]);
            }

            if (path.commands[i].type != "Z") {
              letterPoints[letterPoints.length - 1].push(
                p.createVector(path.commands[i].x, path.commands[i].y)
              );
            }
          }
        }
      }
    );

    console.log(letterPoints);
  };

  p.draw = () => {
    p.orbitControl();
    p.background(20);
    p.noFill();
    p.translate(-200, 0);

    for (let i = 0; i < letterPoints.length; i++) {
      p.fill("red");
      for (let j = 0; j < letterPoints[i].length; j++) {
        p.ellipse(letterPoints[i][j].x, letterPoints[i][j].y, 10, 10);
      }
    }

    // p.push();
    // // Draw front faces (z = 0)
    // p.fill("red"); // White fill (or any color you want)
    // p.stroke(0); // Outline
    // for (let pts of letterPoints) {
    //   p.beginShape();
    //   for (let pt of pts) {
    //     p.vertex(pt.x, pt.y, zFront);
    //   }
    //   p.endShape(p.CLOSE);
    // }
    // p.pop();
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;

// desc: perlin pattern
