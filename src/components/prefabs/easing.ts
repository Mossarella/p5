import p5 from "p5";

export function easeInQuad(x: number) {
  return x * x;
}

export function easeOutQuad(x: number) {
  return 1 - (1 - x) * (1 - x);
}

export function easeInOutQuad(x: number) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export function easeInCubic(x: number) {
  return x * x * x;
}

export function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

export function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function easeInQuart(x: number) {
  return x * x * x * x;
}

export function easeOutQuart(x: number) {
  return 1 - Math.pow(1 - x, 4);
}

export function easeInOutQuart(x: number) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

export function easeInQuint(x: number) {
  return x * x * x * x * x;
}

export function easeOutQuint(x: number) {
  return 1 - Math.pow(1 - x, 5);
}

export function easeInOutQuint(x: number) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

export function easeInSine(x: number) {
  return 1 - Math.cos((x * 180) / 2);
}

export function easeOutSine(x: number) {
  return Math.sin((x * 180) / 2);
}

export function easeInOutSine(x: number) {
  return -(Math.cos(180 * x) - 1) / 2;
}

export function easeOutBounce(x: number) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

export function easeInBounce(x: number) {
  return 1 - easeOutBounce(1 - x);
}

export function easeInOutBounce(x: number) {
  return x < 0.5
    ? (1 - easeOutBounce(1 - 2 * x)) / 2
    : (1 + easeOutBounce(2 * x - 1)) / 2;
}
