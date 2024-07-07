const mixWithAnotherColor = (color) => {
  let mixingColor = "#FF0000"
    let r1 = parseInt(color.slice(1, 3), 16);
    let g1 = parseInt(color.slice(3, 5), 16);
    let b1 = parseInt(color.slice(5, 7), 16);

    let r2 = parseInt(mixingColor.slice(1, 3), 16);
    let g2 = parseInt(mixingColor.slice(3, 5), 16);
    let b2 = parseInt(mixingColor.slice(5, 7), 16);

    const mixedColor = `rgb(${Math.floor((r1 + r2) / 2)}, ${Math.floor((g1 + g2) / 2)}, ${Math.floor((b1 + b2) / 2)})`;
    return mixedColor;
  };
const decreaseBrightness = (color) => {
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  r = Math.max(r - 50, 0);
  g = Math.max(g - 50, 0);
  b = Math.max(b - 50, 0);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};
const increaseBrightness = (color) => {
let r = parseInt(color.slice(1, 3), 16);
let g = parseInt(color.slice(3, 5), 16);
let b = parseInt(color.slice(5, 7), 16);

r = Math.min(r + 50, 255);
g = Math.min(g + 50, 255);
b = Math.min(b + 50, 255);

return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};
const addTransparency = (color) => {
  const rgbaColor = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.5)`;
  return rgbaColor;
};

export { mixWithAnotherColor, decreaseBrightness, increaseBrightness, addTransparency };