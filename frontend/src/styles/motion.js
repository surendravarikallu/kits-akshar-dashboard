// High-stiffness spring motion standards for UI/UX Pro Max
export const SPRING_REVEAL = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  }
};

export const SPRING_HOVER = {
  scale: 1.02,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 10
  }
};

export const STAGGER_CONTAINER = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
