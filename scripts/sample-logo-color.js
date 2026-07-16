const sharp = require("sharp");
const path = require("path");

async function main() {
  const imgPath = path.join(__dirname, "..", "public", "joja-logo.jpeg");
  const { data, info } = await sharp(imgPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  let rSum = 0,
    gSum = 0,
    bSum = 0,
    count = 0;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Isolate blue-ish pixels (the "CAPITAL" text + emblem accent),
    // excluding black background and neutral gray "JOJA" text.
    const isBlueDominant = b > r + 15 && b > g + 5;
    const isNotTooDark = r + g + b > 60; // exclude near-black background
    const isNotTooLight = r + g + b < 650; // exclude blown highlights/antialiasing

    if (isBlueDominant && isNotTooDark && isNotTooLight) {
      rSum += r;
      gSum += g;
      bSum += b;
      count++;
    }
  }

  if (count === 0) {
    console.log("No matching pixels found");
    return;
  }

  const r = Math.round(rSum / count);
  const g = Math.round(gSum / count);
  const b = Math.round(bSum / count);
  const hex =
    "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");

  console.log(`Image: ${width}x${height}, ${channels} channels`);
  console.log(`Sampled ${count} blue-dominant pixels`);
  console.log(`Average RGB: rgb(${r}, ${g}, ${b})`);
  console.log(`Hex: ${hex}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
