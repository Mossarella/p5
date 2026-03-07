import p5 from "p5";
import P5Wrapper from "../commons/p5Wrapper";

const sketch = (p: p5) => {
  let font: any;
  let fontPath: any;
  let rawPath: any;
  let path: any;
  let letterPoints: p5.Vector[][] = [];

  const fontSize = 200;
  const message = "WARP";

  const zFront = 200;
  let zBack = -100;
  let zSpeed = -3;
  const zBackMin = -1000;
  const zBackMax = -100;

  const opentype = window.opentype;
  const gjs = window.g;

  function getArea(points: p5.Vector[]) {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];
      area += p1.x * p2.y - p2.x * p1.y;
    }
    return area / 2;
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    opentype.load(
      "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf",
      (err, f) => {
        if (err) return console.error(err);
        font = f;

        fontPath = font.getPath(message, 0, 0, fontSize);
        rawPath = new gjs.Path(fontPath.commands);
        path = gjs.resampleByLength(rawPath, 8);

        // Convert path to p5.Vector points grouped by contour
        for (let cmd of path.commands) {
          if (cmd.type === "M") {
            letterPoints.push([]);
          }
          if (cmd.type !== "Z") {
            letterPoints[letterPoints.length - 1].push(
              p.createVector(cmd.x, cmd.y)
            );
          }
        }

        // Centering
        let minX = Infinity,
          maxX = -Infinity,
          minY = Infinity,
          maxY = -Infinity;

        for (let contour of letterPoints) {
          for (let pt of contour) {
            if (pt.x < minX) minX = pt.x;
            if (pt.x > maxX) maxX = pt.x;
            if (pt.y < minY) minY = pt.y;
            if (pt.y > maxY) maxY = pt.y;
          }
        }

        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        // Center the points
        for (let contour of letterPoints) {
          for (let pt of contour) {
            pt.x -= centerX;
            pt.y -= centerY;
          }
        }
      }
    );
  };

  p.draw = () => {
    p.background(20);
    p.orbitControl();
    p.noStroke();
    p.fill(255);

    zBack += zSpeed;
    if (zBack < zBackMin || zBack > zBackMax) zSpeed *= -1;

    // Draw extrusion sides
    for (let contour of letterPoints) {
      for (let i = 0; i < contour.length; i++) {
        const pt1 = contour[i];
        const pt2 = contour[(i + 1) % contour.length];

        p.beginShape();
        p.vertex(pt1.x, pt1.y, zFront);
        p.vertex(pt2.x, pt2.y, zFront);
        p.vertex(pt2.x, pt2.y, zBack);
        p.vertex(pt1.x, pt1.y, zBack);
        p.endShape(p.CLOSE);
      }
    }

    // // Draw front face with hole exclusion
    // for (let i = 0; i < letterPoints.length; i++) {
    //   const outer = letterPoints[i];
    //   if (getArea(outer) < 0) continue; // Skip holes

    //   p.beginShape();

    //   for (let pt of outer) {
    //     p.vertex(pt.x, pt.y, zFront);
    //   }

    //   for (let j = 0; j < letterPoints.length; j++) {
    //     if (i === j) continue;
    //     const hole = letterPoints[j];
    //     if (getArea(hole) > 0) continue; // Only process holes

    //     p.beginContour();
    //     for (let pt of hole) {
    //       p.vertex(pt.x, pt.y, zFront);
    //     }
    //     p.endContour();
    //   }

    //   p.endShape(p.CLOSE);
    // }
  };
};

const Sketches = () => <P5Wrapper sketch={sketch} />;

export default Sketches;
