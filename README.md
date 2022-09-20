# watchface.js

[![Watchface.JS demo](https://raw.githubusercontent.com/ramon82/watchface.js/master/preview.gif)](https://on.ramon82.com/2k82hxi)

## A *useless* library to fill the gap between mobile and layout breaks
Or ***a cool easter egg for responsive perfectionists***. 

Live demo: https://on.ramon82.com/2k82hxi

## How to use
Just call when you're ready: 

	Watchface({options object});

## Options
* id: `Watch id, will be created if unexistent. Default: 'watchface'.`
* skin: `Watch class name, if you want to customize via CSS.`
* mode: `Watch style. Available options: 'digital' and 'analog'. Default: 'digital'`
* format: `12 or 24 hour format. Default: 12`
* band: `show digital clock on smaller screens (<80px). Default: true`
* seconds: `show seconds (digital and band clock). Default: false`
* icon: `icon html for digital clock, could be image, svg, FontAwesome, etc.`
* customCSS: `if true doesn't apply any CSS style`
* leadingZero: `show leading zero on hours. Default: true`
* media: `Values for media queries`
    - watch: 280
    - band: 100
* colors: `Values for colors, could be any CSS format`
    - background: #000 `Watch background`
    - text: #FFF `Digital clock text color`
    - analogBackground: #FFF `Analog clock background`
    - analogText: #333 `Analog clock text color`
    - pointers: #333 `Analog clock pointers color`
    - secPointer: #FC0505 `Analog clock second pointer color`

---

<a href="https://ramon82.com" target="_blank">
  <img src="https://utils.ramon82.com/hit.svg?referrer=github.com&title=GitHub%20/%20watchface.js&location=https://github.com/ramon82/watchface.js" width="24" height="24" />
</a>
