// import p5 from "p5";

// export function centerGraphics(p: p5, pg: p5.Graphics) {
//   pg.loadPixels();

//   let minX = pg.width;
//   let maxX = 0;
//   let minY = pg.height;
//   let maxY = 0;
//   let found = false;

//   for (let y = 0; y < pg.height; y++) {
//     for (let x = 0; x < pg.width; x++) {
//       const index = (x + y * pg.width) * 4;
//       const alpha = pg.pixels[index + 3];
//       if (alpha > 0) {
//         found = true;
//         if (x < minX) minX = x;
//         if (x > maxX) maxX = x;
//         if (y < minY) minY = y;
//         if (y > maxY) maxY = y;
//       }
//     }
//   }

//   if (!found) return;

//   const contentWidth = maxX - minX + 1;
//   const contentHeight = maxY - minY + 1;
//   const offsetX = (p.width - contentWidth) / 2 - minX;
//   const offsetY = (p.height - contentHeight) / 2 - minY;

//   console.log(contentWidth);
//   console.log(contentHeight);
//   p.image(pg, offsetX, offsetY);
// }
