# Puppeteer Image CLI

Generate browser screenshots from the command line using Puppeteer.

## How to Use

```
puppeteer-img http://www.example.com --path example.jpeg --type jpeg
```

## Options

```
puppeteer-img --help
  Usage: puppeteer-img [options]

  Options:
    -V, --version                output the version number
    -t, --type [type]            The file type to generate. Options are jpeg or png. Defaults to png.
    -p, --path [path]            The file path to save the image to.
    -w, --width [width]          The width of the browser viewport. Default is 800
    -h, --height [height]        The height of the browser viewport. Default is 600
    -x, --x [x]                  X coordinate for capturing a clip of the browser window
    -y, --y [y]                  Y coordinate for capturing a clip of the browser window
    --clip-width [clip-width]    Width of image when capturing a clip of the browser window
    --clip-height [clip-height]  Height of image when capturing a clip of the browser window
    -h, --help                   output usage information
```
