/**
 * Centralized z-index management system
 * Ensures proper layering across all components
 */

export const zIndex = {
  // Base layers
  base: 0,
  dropdown: 10,

  // Sticky elements
  stickyHeader: 40,

  // Overlays and modals
  overlay: 100,
  modalBackdrop: 9998,
  modal: 9999,

  // Notifications and tooltips
  tooltip: 10000,
  notification: 10001,

  // Maximum (for critical alerts)
  maximum: 2147483647
} as const;

// Tailwind classes for z-index
export const zIndexClasses = {
  base: 'z-0',
  dropdown: 'z-10',
  stickyHeader: 'z-40',
  overlay: 'z-[100]',
  modalBackdrop: 'z-[9998]',
  modal: 'z-[9999]',
  tooltip: 'z-[10000]',
  notification: 'z-[10001]',
} as const;