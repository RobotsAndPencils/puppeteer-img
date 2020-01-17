#!/usr/bin/env node

const cli = require("commander");
const puppeteer = require("puppeteer");

cli
  .version("1.0.4d")
  .option("-t, --type [type]", "The file type to generate. Options are jpeg or png. Defaults to png.")
  .option("-p, --path [path]", "The file path to save the image to.")
  .option("-w, --width [width]", "The width of the browser viewport. Default is 800")
  .option("-h, --height [height]", "The height of the browser viewport. Default is 600")
  .option(
    "-s, --scale-factor [scale-factor]",
    "Sets the device pixel scale factor when setting the viewport.  Defaults to 1."
  )
  .option("-x, --x [x]", "X coordinate for capturing a clip of the browser window")
  .option("-y, --y [y]", "Y coordinate for capturing a clip of the browser window")
  .option("--clip-width [clip-width]", "Width of image when capturing a clip of the browser window")
  .option("--clip-height [clip-height]", "Height of image when capturing a clip of the browser window")
  .parse(process.argv);

function _validateInteger(value) {
  const parsed = parseInt(value);
  if (value && !parsed) {
    console.error("Number values must be valid integer");
    return null;
  }
  return parsed;
}

(async () => {
  const location = cli.args[0];
  let screenshotOptions = {};
  let viewportOptions = {};

  if (!location) {
    console.error("URL required");
    return;
  }

  viewportOptions.width = _validateInteger(cli.width) || 800;
  viewportOptions.height = _validateInteger(cli.height) || 600;
  viewportOptions.deviceScaleFactor = _validateInteger(cli.scaleFactor) || 1;
  screenshotOptions.type = ["jpeg", "png"].includes(cli.type) ? cli.type : "png";
  screenshotOptions.path = cli.path || `./image.${screenshotOptions.type}`;

  const clipParams = ["x", "y", "clipWidth", "clipHeight"];
  const hasClipParams = clipParams.every(val => cli[val]);

  // If all clip params are present add to options
  if (hasClipParams) {
    screenshotOptions.clip = {};
    for (const param of clipParams) {
      const key = param.replace("clip", "").toLowerCase();
      screenshotOptions.clip[key] = _validateInteger(cli[param]);
    }
  }

  puppeteer
    .launch({
      devtools: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--single-process"],
      ignoreHTTPSErrors: true
    })
    .then(async function(browser) {
      const page = await browser.newPage();
      await page.setViewport(viewportOptions);
      await page.goto(location, { waitUntil: ["networkidle2"] });
      await page.screenshot(screenshotOptions);

      await page.close();
      await browser.close();
      process.stdout.write(screenshotOptions.path);
    });
})();
