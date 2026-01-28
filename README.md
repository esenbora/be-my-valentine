# Be My Valentine 💕

> A meme-y Valentine's Day website where the "No" button runs away from your cursor!

Try to say no... if you can 😏

## Features

- **Escaping "No" Button** - The button smoothly runs away from your cursor/finger
- **Personalization** - Use URL parameters to customize the message
- **Confetti Celebration** - When they click "Yes"!
- **Mobile Support** - Works with touch events
- **No Dependencies** - Pure vanilla HTML/CSS/JS
- **Easy to Fork** - Clone and customize for your valentine!

## Demo

Open `index.html` in your browser!

## Personalization

Use URL parameters to customize:

```
?to=Sarah            → "Hey Sarah! 💕"
?from=John           → "Love, John 💝"
?msg=Custom message  → Shows after "Yes"
```

**Example:**
```
index.html?to=Sarah&from=John&msg=You make me so happy!
```

## Quick Start

1. Clone or download this repository
2. Open `index.html` in a browser
3. Share the link with your valentine!

### Deploy to GitHub Pages

1. Fork this repository
2. Go to Settings → Pages
3. Select "main" branch
4. Your site is live at `https://yourusername.github.io/be-my-valentine/`

### Deploy to Vercel/Netlify

Just drag and drop the folder - no build step needed!

## Customization

### Colors
Edit the CSS variables in `css/style.css`:

```css
:root {
    --bg-gradient: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%);
    --yes-btn: #4ade80;
    --no-btn: #f87171;
}
```

### Messages
Edit the text in `index.html` or use URL parameters.

### Memes
Replace the emoji text in `index.html` with your own images or emojis!

## Tech Stack

- HTML5
- CSS3 (Animations, Flexbox)
- Vanilla JavaScript
- Google Fonts (Pacifico, Inter)

## Browser Support

- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome for Android)

## License

MIT License - Feel free to use, modify, and share!

---

Made with 💕 for Valentine's Day
