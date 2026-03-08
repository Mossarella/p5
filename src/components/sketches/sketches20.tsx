import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
import { useParams } from "next/navigation";

const sketch = (p: p5) => {
  let font;
  let letterPoints = [];

  let centerX = 0;
  let centerY = 0;
  let message = "DPAOB";
  const opentype = window.opentype;

  p.preload = () => {
    font = p.loadFont(
      "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
    );
  };

  // opentype.load("/fonts/Poppins-Bold.ttf", (err, f) => {
  //   if (err) console.error(err);
  //   else {
  //     console.log(f);
  //     font = f;
  //     letterPoints = font.getPath(message, 0, 0, 200);
  //     console.log(letterPoints);
  //   }
  // });

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    let offsetX = 0;

    for (let char of message) {
      let points = font.textToPoints(char, offsetX, 0, 400, {
        sampleFactor: 0.3,
      });
      letterPoints.push(points);

      offsetX += 250; // Adjust spacing manually
    }

    // 🔥 Calculate center AFTER points are ready
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (let item of letterPoints) {
      for (let pt of item) {
        if (pt.x < minX) minX = pt.x;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.y > maxY) maxY = pt.y;
      }
    }
    centerX = (minX + maxX) / 2;
    centerY = (minY + maxY) / 2;
  };

  p.draw = () => {
    p.background(20);

    // p.rotateY(p.frameCount * 0.01);
    // p.rotateX(p.frameCount * 0.005);

    const zFront = 0;
    const zBack = -100;

    // for (let pt of points) {
    //   p.push();
    //   p.translate(pt.x - centerX, pt.y - centerY, 0);
    //   p.stroke(255);
    //   p.strokeWeight(2);
    //   p.line(
    //     pt.x - centerX,
    //     pt.y - centerY,
    //     zFront,
    //     pt.x - centerX,
    //     pt.y - centerY,
    //     zBack
    //   );
    //   // p.point(0, 0, 0);
    //   p.pop();
    // }
    let maxAllowedDistance = 10;

    p.push();
    p.translate(-centerX, -centerY, 0); // Center the entire world
    p.noStroke();

    for (let pts of letterPoints) {
      for (let i = 0; i < pts.length; i++) {
        const pt = pts[i];
        const nextPt = pts[(i + 1) % pts.length];
        const dist = p.dist(pt.x, pt.y, nextPt.x, nextPt.y);

        if (dist < maxAllowedDistance) {
          // Only connect if distance is small enough

          p.beginShape();
          p.vertex(pt.x, pt.y, zFront);
          p.vertex(nextPt.x, nextPt.y, zFront);
          p.vertex(nextPt.x, nextPt.y, zBack);
          p.vertex(pt.x, pt.y, zBack);
          p.endShape(p.CLOSE);
        }
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

    // Draw back faces (z = -depth)
    // for (let pts of letterPoints) {
    //   p.beginShape();
    //   for (let i = pts.length - 1; i >= 0; i--) {
    //     // Reverse order
    //     const pt = pts[i];
    //     p.vertex(pt.x, pt.y, zBack);
    //   }
    //   p.endShape(p.CLOSE);
    // }
    p.pop();
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;

// desc: perlin pattern
