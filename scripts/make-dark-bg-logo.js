const sharp = require("sharp");
const path = require("path");

// Recolors the logo's navy-blue portion to a lighter accent tone so it
// reads on the dark admin background (contrast ratio of the original
// navy #103c64 against bg-navy-950 #05070d is only ~1.78, well under
// WCAG's 3.0 minimum for graphics). Gray pixels are left untouched.
async function main() {
  const inputPath = path.join(__dirname, "..", "public", "joja-logo.png");
  const outputPath = path.join(__dirname, "..", "public", "joja-logo-dark-bg.png");

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const target = [112, 138, 162]; // accent-400 #708aa2

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isBlueDominant = b > r + 15 && b > g + 5;

    if (isBlueDominant) {
      data[i] = target[0];
      data[i + 1] = target[1];
      data[i + 2] = target[2];
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(outputPath);

  console.log(`Wrote dark-bg logo variant to ${outputPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
