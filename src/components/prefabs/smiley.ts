import p5, { Vector } from "p5";

export class Smiley {
  p: p5;
  x: number;
  y: number;
  faceSize: number;
  xEye: number;
  yEye: number;
  eyeSize: number;
  pupilSize: number;
  randColor: string;
  xNose: number;
  yNose: number;
  xAnchor: number;
  yAnchor: number;
  xControl: number;
  yControl: number;
  pt1: Vector;
  pt2: Vector;
  pt3: Vector;
  pt4: Vector;

  constructor(p: p5, x: number, y: number, size: number) {
    this.p = p;
    this.x = x;
    this.y = y;

    //face
    this.faceSize = size - size / 5;
    //eye
    p.fill(255);
    this.xEye = p.map(p.random(35, 45), 0, 45, 0, (45 / 200) * this.faceSize);
    this.yEye = p.map(p.random(25, 35), 0, 35, 0, (35 / 200) * this.faceSize);
    this.eyeSize = p.map(
      p.random(25, 35),
      0,
      35,
      0,
      (35 / 200) * this.faceSize
    );
    this.pupilSize = p.random(this.eyeSize / 1.5, this.eyeSize / 1.2);

    //nose
    this.xNose = p.map(p.random(15, 20), 0, 20, 0, (20 / 200) * this.faceSize);
    this.yNose = p.map(p.random(30, 50), 0, 50, 0, (50 / 200) * this.faceSize);

    //mouth
    this.xAnchor = p.map(
      p.random(20, 50),
      0,
      50,
      0,
      (50 / 200) * this.faceSize
    );
    this.yAnchor = p.map(
      p.random(20, 40),
      0,
      40,
      0,
      (40 / 200) * this.faceSize
    );
    this.xControl = p.map(
      p.random(30, 40),
      0,
      40,
      0,
      (40 / 200) * this.faceSize
    );
    this.yControl = p.map(
      p.random(60, 70),
      0,
      70,
      0,
      (70 / 200) * this.faceSize
    );

    this.pt1 = p.createVector(-this.xAnchor, this.yAnchor);
    this.pt2 = p.createVector(-this.xControl, this.yControl);
    this.pt3 = p.createVector(this.xControl, this.yControl);
    this.pt4 = p.createVector(this.xAnchor, this.yAnchor);

    // Color
    let colors = [
      "#abcd5e",
      "#14976b",
      "#2b67af",
      "#62b6de",
      "#e09edd",
      "#eaabab",
      "#fc8405",
      "#f9d531",
    ];
    this.randColor = colors[p.floor(p.random(colors.length))];
  }

  display(mouseOffsetX: number, mouseOffsetY: number) {
    const { p } = this;

    p.push();
    p.noStroke();
    p.translate(this.x, this.y);
    p.fill(this.randColor);
    p.noStroke();
    p.push();
    // Face
    // p.fill(this.randColor);
    // p.ellipse(0, 0, this.faceSize, this.faceSize);

    p.beginShape();
    let points = 150;
    for (let a = 0; a < 360; a += 360 / points) {
      let baseRadius = this.faceSize / 2;
      let n = p.noise(
        p.cos(a) * 0.5 + p.frameCount * 0.01,
        p.sin(a) * 0.5 + p.frameCount * 0.01
      );
      let r = baseRadius + n * 15;
      let x = r * p.cos(a);
      let y = r * p.sin(a);
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);

    p.pop();

    let correctedMouseX = p.mouseX - mouseOffsetX;
    let correctedMouseY = p.mouseY - mouseOffsetY;

    p.push();
    p.translate(-this.xEye, -this.yEye); // Move to left eye position (relative to face center)

    // p.stroke("red");
    // p.line(0, 0, correctedMouseX - this.x, correctedMouseY - this.y);

    let angleLeft = p.atan2(correctedMouseY - this.y, correctedMouseX - this.x);
    p.rotate(angleLeft); // Rotate left eye toward mouse

    p.fill(255);
    p.ellipse(0, 0, this.eyeSize, this.eyeSize); // White part
    let perfectOffset = this.eyeSize / 2 - this.pupilSize / 2;
    p.fill(0);
    p.ellipse(perfectOffset, 0, this.pupilSize, this.pupilSize); // Pupil
    p.pop();

    // --- Right Eye ---
    p.push();
    p.translate(this.xEye, -this.yEye); // Move to right eye position (relative to face center)

    // p.stroke("red");
    // p.line(0, 0, correctedMouseX - this.x, correctedMouseY - this.y);

    let angleRight = p.atan2(
      correctedMouseY - this.y,
      correctedMouseX - this.x
    );

    p.rotate(angleRight); // Rotate right eye toward mouse

    p.fill(255);
    p.ellipse(0, 0, this.eyeSize, this.eyeSize); // White part
    p.fill(0);
    p.ellipse(perfectOffset, 0, this.pupilSize, this.pupilSize); // Pupil
    p.pop();

    // Nose

    p.fill("#ff4d4d");
    p.rect(0, 0, this.xNose, this.yNose, 20);

    // Mouth
    p.noFill();
    p.stroke(0);
    p.bezier(
      this.pt1.x,
      this.pt1.y,
      this.pt2.x,
      this.pt2.y,
      this.pt3.x,
      this.pt3.y,
      this.pt4.x,
      this.pt4.y
    );
    p.pop();
  }
}
