# Jagan KK — scroll-led 3D portfolio

## Build
- Replace the blank home page with a personal software-engineering portfolio inspired by the supplied pagoda ink drawing: warm paper, fine dark linework, restrained red seal accents, and editorial typography.
- Create a single immersive 3D pagoda scene that progresses through portfolio chapters as the visitor scrolls: introduction, selected work, approach, and contact. Keep the reading content usable without WebGL and honor reduced-motion preferences.
- Use the verified CC0 pagoda model where practical, plus the generated ink illustration as a supporting visual; avoid inventing personal work history or contact details.
- Make the scene responsive and keep the initial 3D load within a reasonable budget.

## Technical approach
- Use React Three Fiber for the scene, isolating browser-only rendering from TanStack Start SSR.
- Use scroll progress to drive one camera/scene progression rather than separate unrelated scenes; keep 3D frame updates out of React state.
- Add a focused 3D verification pass and check route metadata and preview diagnostics.
- Record the reusable 3D scene architecture in `AGENTS.md`.
