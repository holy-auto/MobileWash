# Splash Animation (Lottie)

The splash screen on iOS / Android plays the Lottie file at:

```
mobile/assets/splash-animation.json
```

To change the opening animation, replace this file with a Lottie JSON of your
choice. No code changes required.

## Where to get a Lottie file

- **LottieFiles marketplace** — https://lottiefiles.com (huge library, many free)
- **Bodymovin** — export from After Effects via the Bodymovin plugin
- **Rive Studio** — export to Lottie format
- **AI tools** — LottieFiles AI / Rive Studio (AI-assisted) can generate one
  from a prompt

## Recommended specs

- Duration: **3 to 4 seconds** (the splash auto-fades after ~4.2s).
  If your animation loops, that's fine — it'll just loop until the splash
  finishes.
- Aspect ratio: square (1:1) — the player is centered and ~90% of screen width.
- Theme: dark backgrounds work best (the splash gradient is deep purple/navy).
  If your animation has its own background, that will fully cover the gradient.
- File size: keep under 1 MB if possible (most production Lotties are 30–300 KB).
- Avoid features Lottie can't render reliably (image layers, complex masks).
  Vector shapes and text expressions are safe.

## Web preview

`npm run web` uses `app/splash.web.tsx` (a hand-coded cinematic neon scene)
because the Lottie web bundle is heavier and has occasional rendering quirks.
Native builds (Expo Go / EAS) play the Lottie file instead.

## Test it

After dropping in a new file:

```
cd mobile
npx expo start --clear
```

Open Expo Go → the splash will play your animation.
