"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANIMATION_DURATIONS = exports.VARIANT_THEMES = exports.SITE_VARIANTS = void 0;
// Site variants for theming
exports.SITE_VARIANTS = {
    DEFAULT: 'default',
    LUXURY: 'luxury',
    ADVENTURE: 'adventure',
    FAMILY: 'family',
};
// Theme configurations for different site variants
exports.VARIANT_THEMES = (_a = {},
    _a[exports.SITE_VARIANTS.DEFAULT] = {
        primary: '#3B82F6',
        secondary: '#1F2937',
        accent: '#F59E0B',
    },
    _a[exports.SITE_VARIANTS.LUXURY] = {
        primary: '#D4AF37',
        secondary: '#1A1A1A',
        accent: '#FFFFFF',
    },
    _a[exports.SITE_VARIANTS.ADVENTURE] = {
        primary: '#22C55E',
        secondary: '#1F2937',
        accent: '#F59E0B',
    },
    _a[exports.SITE_VARIANTS.FAMILY] = {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        accent: '#F472B6',
    },
    _a);
// Common animation durations
exports.ANIMATION_DURATIONS = {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
};
