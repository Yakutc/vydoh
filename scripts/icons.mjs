import sharp from "sharp";

const mark =
  "M13.1 12C13.14 12.11 13.32 12.4 13.33 12.64C13.33 12.88 13.29 13.19 13.15 13.44C13.01 13.69 12.78 13.98 12.49 14.16C12.21 14.34 11.81 14.5 11.42 14.52C11.04 14.55 10.56 14.49 10.16 14.31C9.75 14.13 9.31 13.83 9 13.44C8.69 13.06 8.41 12.54 8.3 12C8.19 11.46 8.18 10.81 8.33 10.23C8.49 9.65 8.8 9.01 9.23 8.53C9.66 8.04 10.27 7.57 10.93 7.31C11.58 7.04 12.4 6.89 13.15 6.94C13.91 7 14.77 7.24 15.46 7.66C16.16 8.07 16.87 8.7 17.34 9.43C17.81 10.15 18.14 11.57 18.3 12L22.4 12";

const apple = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#FAF6EF"/>
  <g transform="translate(9.5 28) scale(5.5)" fill="none" stroke="#2E5A45" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="${mark}"/>
  </g>
</svg>`;

await sharp(Buffer.from(apple)).png().toFile("src/app/apple-icon.png");
await sharp("src/app/icon.svg").resize(16, 16).png().toFile("shots/icon-16.png");
await sharp("src/app/icon.svg").resize(32, 32).png().toFile("shots/icon-32.png");
await sharp("src/app/icon.svg").resize(512, 512).png().toFile("shots/icon-512.png");
console.log("icons written");
