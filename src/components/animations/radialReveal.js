import { gsap } from "gsap";

export function radialReveal(target, options = {}) {
  const {
    duration = 0.4,
    delay = 0,
    scale = 1,
    ease = "power2.out",
    opacity = 1,
  } = options;

  gsap.fromTo(
    target,
    {
      scale: 0,
      opacity: 0,
      transformOrigin: "50% 50%", // ✅ center origin
    },
    {
      scale,
      opacity,
      duration,
      delay,
      ease,
      transformOrigin: "50% 50%", // ✅ ensure consistency
    }
  );
}

export function radialHide(target, options = {}) {
  const {
    duration = 0.3,
    delay = 0,
    scale = 0,
    ease = "power2.in",
    opacity = 0,
  } = options;

  gsap.to(target, {
    scale,
    opacity,
    duration,
    delay,
    ease,
    transformOrigin: "50% 50%", // ✅ center origin
  });
}
