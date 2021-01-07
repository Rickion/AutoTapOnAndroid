# AutoTap-Android
Record your action, and replay it.
## Usage
Plugin your device, and make sure `adb devices` command runs good.

1. `npm run record`
1. Make some action on your device, ie: tap, press buttons
1. Ctrl + C to end
1. `npm run replay`
1. 🎉

## Known issues
Actions like `panning` or `zooming` has some slow motion
## Refs
[adbcommand.com](http://adbcommand.com/articles/adb%20shell%EF%BC%9Agetevent%20and%20sendevent/)

