# maloha

Simple wrapper around [squoosh](https://github.com/GoogleChromeLabs/squoosh) to compress images down to a specific target size.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/maloha.svg)](https://npmjs.org/package/maloha)
[![Downloads/week](https://img.shields.io/npm/dw/maloha.svg)](https://npmjs.org/package/maloha)
[![License](https://img.shields.io/npm/l/maloha.svg)](https://github.com/gnerzhin/maloha/blob/master/package.json)

# Usage

```sh-session
$ npm install -g maloha
$ maloha --help
USAGE
  $ maloha [FOLDER]

OPTIONS
  -h, --help         show CLI help
  -s, --size=size    target size in kb
  -v, --version      show CLI version
  -w, --width=width  maximum width in pixels
```

If no folder argument is provided, the current working directory will be used.  
Converts all image files in the given folder to jpg and saves them in a new folder.  
If a size argument is provided, the images will be compressed to that size  
while keeping the quality as high as possible.  
The width argument can be used to additionally resize all images with a width above  
the given value while maintaining the aspect ratio.
