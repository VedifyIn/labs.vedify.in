// Animation durations
export const ANIMATION_DURATIONS = {
  DRIFT_SLOW: "18s",
  DRIFT_MEDIUM: "14s",
  DRIFT_FAST: "16s",
  CAROUSEL_SLIDE: 5000, // milliseconds
  TAGLINE_ROTATION: 5000, // milliseconds
  BOND_PULSE: "4s",
  MOLECULE_ROTATE: "30s",
  STEAM_SLOW: "4s",
  STEAM_MEDIUM: "3.5s",
  STEAM_FAST: "3s",
} as const;

// Molecule positions for LabBackground
export const MOLECULE_POSITIONS = {
  MOLECULE_1: { top: "12%", left: "8%" },
  MOLECULE_2: { bottom: "18%", right: "10%" },
  MOLECULE_3: { top: "55%", right: "22%" },
} as const;

// Molecule sizes
export const MOLECULE_SIZES = {
  LARGE: 80,
  MEDIUM: 60,
  SMALL: 48,
} as const;

// Coffee cup position
export const COFFEE_POSITION = {
  bottom: "24px",
  right: "24px",
} as const;

// Grid spacing
export const GRID_SPACING = {
  GAP: "12px",
  MIN_COLUMN_WIDTH: "260px",
} as const;

// Transition durations
export const TRANSITION_DURATIONS = {
  FAST: "200ms",
  MEDIUM: "300ms",
  SLOW: "500ms",
} as const;
