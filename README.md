<p align="center"><img src="https://cldup.com/1ATDf2JMtv.png"></p>

[![Build all versions and publish to NPM](https://github.com/hurdlegroup/robotjs/actions/workflows/build-all.yml/badge.svg)](https://github.com/hurdlegroup/robotjs/actions/workflows/build-all.yml)
<a href="https://www.npmjs.com/package/@hurdlegroup/robotjs"><img src="https://img.shields.io/npm/v/@hurdlegroup/robotjs.svg"></a>

> Node.js Desktop Automation. Control the mouse, keyboard, and read the screen.

**This is a fork of the original unmaintained RobotJS by OctalMage found here: [octalmage/robotjs](https://github.com/octalmage/robotjs)**

RobotJS supports Mac, [Windows](https://github.com/hurdlegroup/robotjs/issues/2), and [Linux](https://github.com/hurdlegroup/robotjs/issues/17).

This is a work in progress so the exported functions could change at any time before the first stable release (1.0.0). [Ideas?](https://github.com/hurdlegroup/robotjs/issues/4)

[Check out some of the cool things people are making with  RobotJS](https://github.com/hurdlegroup/robotjs/wiki/Projects-using-RobotJS)! Have your own rad RobotJS project? Feel free to add it!

## Contents

- [Installation](#installation)
- [Examples](#examples)
- [API](https://robotjs.io/docs/syntax)
- [Building](#building)
- [Plans](#plans)
- [Progress](#progress)
- [FAQ](#faq)
- [License](#license)

## Installation

Install RobotJS using npm:

```
npm install @hurdlegroup/robotjs
```
It's that easy! npm will download one of the prebuilt [binaries](https://github.com/hurdlegroup/robotjs/releases/latest) for your OS.

You can get npm [here](https://nodejs.org/en/download/) if you don't have it installed.

If you need to build RobotJS, see the [building](#building) section. Instructions for [Electron](https://github.com/hurdlegroup/robotjs/wiki/Electron).

## Examples

##### [Mouse](https://github.com/hurdlegroup/robotjs/wiki/Syntax#mouse)

<p align="center"><img src="https://cldup.com/lugVjjAkEi.gif"></p>

```JavaScript
// Move the mouse across the screen as a sine wave.
var robot = require("@hurdlegroup/robotjs");

// Speed up the mouse.
robot.setMouseDelay(2);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

for (var x = 0; x < width; x++)
{
	y = height * Math.sin((twoPI * x) / width) + height;
	robot.moveMouse(x, y);
}
```

##### [Keyboard](https://github.com/hurdlegroup/robotjs/wiki/Syntax#keyboard)

```JavaScript
// Type "Hello World" then press enter.
var robot = require("@hurdlegroup/robotjs");

// Type "Hello World".
robot.typeString("Hello World");

// Press enter.
robot.keyTap("enter");
```

##### [Screen](https://github.com/hurdlegroup/robotjs/wiki/Syntax#screen)

```JavaScript
// Get pixel color under the mouse.
var robot = require("@hurdlegroup/robotjs");

// Get mouse position.
var mouse = robot.getMousePos();

// Get pixel color in hex format.
var hex = robot.getPixelColor(mouse.x, mouse.y);
console.log("#" + hex + " at x:" + mouse.x + " y:" + mouse.y);
```
Read the [Wiki](https://github.com/hurdlegroup/robotjs/wiki) for more information!

## [API](http://robotjs.io/docs/syntax)

The RobotJS API is hosted at <https://robotjs.io/docs/syntax>.

## Building

Please ensure you have the required dependencies before installing:

* Windows
  * windows-build-tools npm package (`npm install --global --production windows-build-tools` from an elevated PowerShell or CMD.exe)
* Mac
  * Xcode Command Line Tools.
* Linux
  * Python (v2.7 recommended, v3.x.x is not supported).
  * make.
  * A C/C++ compiler like GCC.
  * libxtst-dev and libpng++-dev (`sudo apt-get install libxtst-dev libpng++-dev`).

Install node-gyp using npm:

```
npm install -g node-gyp
```

Then build:

```
node-gyp rebuild
```

See the [node-gyp readme](https://github.com/nodejs/node-gyp#installation) for more details.

## Plans

* √ Control the mouse by changing the mouse position, left/right clicking, and dragging.
* √ Control the keyboard by pressing keys, holding keys down, and typing words.
* √ Read pixel color from the screen and capture the screen.
* Find an image on screen, read pixels from an image.
* Possibly include window management?

## Progress

| Module        | Status        | Notes   |
| ------------- |-------------: | ------- |
| Mouse         | 100%           | All planned features implemented.       |
| Keyboard      | 100%           | All planned features implemented.       |
| Screen        | 85%            | Image search, pixel search. |
| Bitmap        | 0%             |  Saving/opening, png support.  |

## FAQ

#### Does RobotJS support global hotkeys? 

Not currently, and I don't know if it ever will. I personally use [Electron](http://electron.atom.io/)/[NW.js](http://nwjs.io/) for global hotkeys, and this works well. Later on I might add hotkey support or create a separate module. See [#55](https://github.com/hurdlegroup/robotjs/issues/55) for details. 

#### Can I take a screenshot with RobotJS? 

Soon! This is a bit more complicated than the rest of the features, so I saved it for last. Luckily the code is already there, I just need to write the bindings, and I've already started. Subscribe to [#13](https://github.com/hurdlegroup/robotjs/issues/13) for updates. 

#### Why is &#60;insert key&#62; missing from the keyboard functions? 

We've been implementing keys as we need them. Feel free to create an issue or submit a pull request!

#### How about multi-monitor support?

The library doesn't have explicit multi-monitor support, so anything that works is kind of on accident. Subscribe to [#88](https://github.com/hurdlegroup/robotjs/issues/88) for updates.

For any other questions please [submit an issue](https://github.com/hurdlegroup/robotjs/issues/new).

## Story

I'm a huge fan of [AutoHotkey](https://www.autohotkey.com/), and I've used it for a very long time. AutoHotkey is great for automation and it can do a bunch of things that are very difficult in other languages. For example, it's [imagesearch](https://www.autohotkey.com/docs/commands/ImageSearch.htm) and [pixel](https://www.autohotkey.com/docs/commands/PixelGetColor.htm) related functions are hard to reproduce on Mac, especially in scripting languages. These functions are great for automating apps that can't be automated like [Netflix](http://blueshirtdesign.com/apps/autoflix/). This has never been a big deal since I've always used Windows at work, but for the past few years I've been using Mac exclusively. 

I like AutoHotkey, but I like Node.js more. By developing RobotJS I get an AutoHotkey replacement on Mac (finally!), and I get to use my favorite language. 

**TLDR:** There's nothing like AutoHotkey on Mac, so I'm making it. 

## License

MIT

Based on [autopy](https://github.com/msanders/autopy). 
Maintained by [Daniel McAssey](https://glokon.me).
