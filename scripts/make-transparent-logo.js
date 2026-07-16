const sharp = require("sharp");
const path = require("path");

async function main() {
  const inputPath = path.join(__dirname, "..", "public", "joja-logo.jpeg");
  const outputPath = path.join(__dirname, "..", "public", "joja-logo.png");

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const maxChannel = Math.max(r, g, b);

    // Near-black background -> transparent. Ramp alpha across ~10-45
    // so anti-aliased edges around the letterforms fade smoothly
    // instead of leaving a hard halo.
    const low = 10;
    const high = 45;
    let alpha;
    if (maxChannel <= low) {
      alpha = 0;
    } else if (maxChannel >= high) {
      alpha = 255;
    } else {
      alpha = Math.round(((maxChannel - low) / (high - low)) * 255);
    }
    data[i + 3] = alpha;
  }

  await sharp(data, { raw: { width, height, channels } })
    .trim({ threshold: 10 })
    .png()
    .toFile(outputPath);

  console.log(`Wrote transparent logo to ${outputPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
