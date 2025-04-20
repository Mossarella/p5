import P5Wrapper from "../commons/p5Wrapper";
const sketch = (p: any) => {
  let size = 130;
  let cols = 5;
  let rows = 5;
  let smiley: any = [];
  let font: any;

  p.preload = () => {
    font = p.loadFont("/fonts/Poppins-Bold.ttf");
    // font = p.loadFont(
    //   "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
    // );
  };
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode("center");
    p.angleMode("degrees");
  };

  p.draw = () => {
    p.background(70, 148, 167);
    p.translate(p.width / 2, p.height / 2);

    p.fill("blue");
    p.noStroke();

    let bounds = font.textBounds("FUCK", 60, 60);

    p;
    p.rect(bounds.x, bounds.y, bounds.w, bounds.h);

    p.ellipse(0, 0, 10, 10); // Center point

    p.beginShape();
    let points = 10;
    let baseRadius = 100;
    for (let i = 0; i < points; i++) {
      // 🔥 POINTS, not radians
      let angle = 360 * (i / points); // 🔥 Calculate angle based on index
      let x = (baseRadius / 2) * p.cos(angle);
      let y = (baseRadius / 2) * p.sin(angle);
      p.vertex(x, y);

      // Debug red dots
      p.fill("red");
      p.noStroke();
      p.ellipse(x, y, 4, 4);
    }
    p.endShape(p.CLOSE);
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;
