# Fix: Blue Background Flicker on Reverse Scroll

## Problem
When scrolling **up** from below the hero, the device frame zooms back from ~2.35x scale. During that reverse animation the perspective grid lines (blue) and the core glow inside `#device` momentarily fill the whole viewport, which reads as a "blue glitch". Scrolling down feels fine because the grid is hidden behind hero copy/hands until late.

The root cause is in `src/components/landing/Hero.tsx`:
- Perspective grid uses `width: 200%`, `height: 130%` with `rgba(91,123,255,0.55)` lines. At 2.35x scale these lines become huge and bright.
- The radial mask (`60% 75% at 50% 100%`) is too soft, so faint blue still spreads to edges.
- The core glow (260px radial) also balloons when scaled, adding to the wash.

## Fix Plan (Hero.tsx only — visual only)

1. **Tame the perspective grid**
   - Reduce line opacity from `0.55 / 0.40` → `0.28 / 0.20`.
   - Tighten the radial mask to `45% 55% at 50% 100%` so blue fades out well before the edges (no spill at high scale).
   - Slightly reduce grid `width: 160%`, `height: 110%`.

2. **Constrain the core glow at scale**
   - Lower glow alpha from `0.55` → `0.35`.
   - Shrink size from 260px → 200px so it doesn't dominate when zoomed.

3. **Add an inner vignette inside `#device`**
   - A non-scaling dark radial overlay (`radial-gradient(circle at 50% 50%, transparent 55%, #04050a 100%)`) layered above the grid so edges always stay dark even at 2.35x.

4. **Smooth the scrub**
   - Change `scrub: 1` → `scrub: 0.6` so reverse motion tracks the wheel more tightly and feels less "laggy" (which is what amplifies the perception of glitching).

No changes to layout, copy, hands, or any other section. Pure visual polish to the hero background layers.
