# Happy Birthday Web Project

A festive birthday surprise page built with plain HTML, CSS, and JavaScript.

## What it does

- Displays an animated birthday intro with a gift box.
- Opens a birthday cake screen after the gift is opened.
- Plays a Happy Birthday tune when the candles are blown out.
- Shows a `Messages` page with birthday notes from friends.
- Includes background effects, fireworks, and confetti animations.

## Project structure

- `index.html` — the main page markup and content.
- `style.css` — all page styling, animations, and responsive layout.
- `script.js` — interactive behavior, screen transitions, sound, and message rendering.

## How to use

1. Open `index.html` in your browser.
2. Click the gift or the "Open Your Gift" button.
3. Blow into the microphone or use the fallback button to light the cake.
4. After the celebration, click the `Messages` button to view birthday notes.

## Customizing the messages

Friend messages are stored inside `script.js` in the `storedMessages` array.

Example entry:

```js
{
  name: "Ken",
  message: "Happy birthday!...",
  time: Date.now()
}
```

Add or edit entries in that array to display new friend messages.

## Notes

- The page is designed to work without a build step.
- If browser audio playback is blocked, the app falls back to a generated Happy Birthday tune.
- The current messages are hardcoded in `script.js`.

## License

This project is provided as-is for a birthday surprise demo.
