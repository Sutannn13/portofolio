import https from "https";
import fs from "fs";

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error("Failed: " + res.statusCode + " " + url));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", reject);
  });
}

// Copy zedai as zcode
fs.copyFileSync("public/ai-pure-icons/zedai.png", "public/tech-icons/zcode.png");
console.log("Copied zcode.png from zedai.png");

// Try official logos
const list = [
  { name: "opencode.svg", url: "https://api.iconify.design/vscode-icons:file-type-codekit.svg" },
  { name: "antigravity.svg", url: "https://api.iconify.design/fluent-emoji:rocket.svg" },
];

for (const item of list) {
  try {
    await download(item.url, "public/tech-icons/" + item.name);
    console.log("Downloaded " + item.name);
  } catch (err) {
    console.error(err.message);
  }
}

