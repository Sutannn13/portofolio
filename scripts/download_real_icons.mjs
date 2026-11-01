import https from "https";
import fs from "fs";

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
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

const icons = [
  { name: "php.svg", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" },
  { name: "laravel.svg", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg" },
  { name: "nextjs.svg", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" },
  { name: "vuejs.svg", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" },
  { name: "javascript.svg", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
];

for (const icon of icons) {
  try {
    await download(icon.url, "public/tech-icons/" + icon.name);
    console.log("Downloaded " + icon.name);
  } catch (err) {
    console.error(err.message);
  }
}

