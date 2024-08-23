# Chrome Legacy Shortcuts

Because the PMs at the giant f*cked up again and fixed something that wasn't broken!

### Installation

1. **Download and Unzip**: Download this project and unzip it to a directory of your choice.
2. **Enable Chrome Experiments**: Go to `chrome://flags/#extensions-on-chrome-urls` and enable `Extensions on chrome:// URLs`.
3. **Access Chrome Extensions**: Navigate to `chrome://extensions`. Make sure you have `Developer Mode` enabled.
4. **Load the Extension**: Click on `Load Unpacked` and select the directory where you unzipped the project.
5. **You're Done!**: Enjoy your restored multi-line shortcuts on the new tab page.
6. **Optional but Recommended**: Enable `Allow in Incognito` in the extension's settings.

### Note

1. If the grid styles don't apply quickly on a new tab, you can adjust the sleep delay in the extension's settings. The default is `10ms`, but you can increase it if needed for
   your setup. Some styles are added as per my linking, nothing major, feel free to tweak them in the [content.js](./content.js) file.


2. You may see a warning when you restart Chrome later on -\
   `You are using an unsupported command-line flag: --extensions-on-chrome-urls. Stability and security will suffer.`

   Just move ahead and click the `x` on the far right corner. This is only shown for the first tab on a cold-start.

---

This project exists because some decisions just don't make sense.