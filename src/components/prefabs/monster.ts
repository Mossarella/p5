import p5, { Vector } from "p5";

export class Monster {
  p: p5;
  x: number;
  y: number;
  gridSize: number;
  palette: any;
  monsterPixels: (number | null)[][];
  pixelSize: number;

  constructor(
    p: p5,
    x: number,
    y: number,
    palette: string[],
    gridSize: number,
    pixelSize: number
  ) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.gridSize = gridSize;
    this.pixelSize = pixelSize;

    this.palette = palette;

    this.monsterPixels = [];
    // for (let y = 0; y < gridSize; y++) {
    //   let row: any = [];
    //   for (let x = 0; x < gridSize / 2; x++) {
    //     const filled = p.random() > 0.5;
    //     const colorIndex = p.floor(p.random(palette.length));
    //     row.push(filled ? colorIndex : null);
    //   }
    //   this.monsterPixels.push(row);
    // }
    this.regenerate();
  }

  display() {
    const { p } = this;

    p.push();
    p.translate(this.x, this.y);

    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize / 2; x++) {
        const colorIndex: any = this.monsterPixels[y][x];
        if (colorIndex !== null) {
          p.fill(this.palette[colorIndex]);
          // Left side
          p.rect(
            x * this.pixelSize,
            y * this.pixelSize,
            this.pixelSize,
            this.pixelSize
          );
          // Right mirror
          p.rect(
            (this.gridSize - x - 1) * this.pixelSize,
            y * this.pixelSize,
            this.pixelSize,
            this.pixelSize
          );
        }
      }
    }
    p.pop();
  }

  regenerate() {
    this.monsterPixels = [];

    for (let y = 0; y < this.gridSize; y++) {
      let row: any = [];
      for (let x = 0; x < this.gridSize / 2; x++) {
        const filled = this.p.random() > 0.5;
        let colorIndex = this.p.floor(this.p.random(this.palette.length));
        if (colorIndex === this.palette.length - 1) {
          // 30% chance to keep it, else reroll to non-special
          if (this.p.random() > 0.3) {
            colorIndex = this.p.floor(this.p.random(this.palette.length - 1)); // pick 0 to last-2
          }
        }
        row.push(filled ? colorIndex : null);
      }
      this.monsterPixels.push(row);
    }
  }

  contains(mx: number, my: number): boolean {
    const width = this.gridSize * this.pixelSize;
    const height = this.gridSize * this.pixelSize;

    return (
      mx >= this.x &&
      mx <= this.x + width &&
      my >= this.y &&
      my <= this.y + height
    );
  }
}
