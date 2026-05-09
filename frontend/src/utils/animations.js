export const PRO_MAX_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 1,
};

// UI UX Pro Max Kinematics
export const SPRING_REVEAL = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...PRO_MAX_SPRING
    }
  }
};

export const SPRING_STAGGER = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const SPRING_HOVER = {
  scale: 1.05,
  y: -5,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};

export const KINETIC_TEXT = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 15
    }
  }
};

// Legacy AniGravity (kept for backward compatibility if needed)
export const GRAVITY_IN = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export const STAGGER = (staggerChildren = 0.1) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren } },
});

export const SLIDE_LEFT = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export const SLIDE_RIGHT = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export const SCALE_IN = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
