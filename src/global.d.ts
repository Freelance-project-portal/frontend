// Type declarations for non-code imports (css, images, etc.)
// Prevents: "Cannot find module or type declarations for side-effect import of './globals.css'"

declare module "*.css";
declare module "*.scss";
declare module "*.module.css";
declare module "*.module.scss";

export {};
