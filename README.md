# Konimate.js
### _Simple and elegant plugin for your site animation_

Konimate.js is builded with vanillajs with powerful functional

#### How to install
- Download this plugin
- add konimate.js script to your footer site
- lets do this

#### How to use
use attribute [konimate=type=""] for initiate animation, available type such as
- fade-up
- fade-down
- fade-left
- fade-right
- typing
```sh
<div konimate-type="fade-up"></div>
```
```sh
<div konimate-type="typing">Lorem, ipsum dolor sit amet</div>
```

if you want to animate DOM when triggering some button, you can do this:
- adding trigger button with attribute [id] and [konimate-button="{show/hide}"]
```sh
<div><a id="fade-up-button" konimate-button="show" href="javascript:void(0)">FADE UP</a></div>
```
- adding animation component with attribute [konimate-type] and [konimte-for]. You can fill aittribute konimate-for with [id] of trigger component in this case id is #fade-up-button
```sh
<div konimate-type="fade-up" konimate-for="#fade-up-button"></div>
```

