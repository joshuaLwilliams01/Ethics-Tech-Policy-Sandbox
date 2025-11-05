# Stanford Logo Setup Instructions

## Adding the Stanford Logo

To complete the logo replacement, please add the Stanford University logo image file to the `public` folder:

1. **File Name**: `stanford-logo.png` (or `.jpg`, `.svg` if preferred)
2. **Location**: `/Users/cristenwilliams/ethics-lab-p3/public/stanford-logo.png`
3. **Recommended Size**: 
   - Header: 32x32px (currently set to h-8 w-8)
   - Decorative background: 96x96px (currently set to h-24 w-24)
   - Level selector: 24x24px (currently set to h-6 w-6)

4. **Format**: PNG with transparency is recommended for best results

## Current Implementation

The code has been updated to use the Stanford logo instead of the tree emoji:
- Header navigation (32x32px)
- Decorative background element above title (96x96px, 20% opacity)
- "Choose Your Level" section (24x24px on each side)

All instances maintain the bounce animation and drop shadow effects from the original tree styling.

## Testing

Once you add the logo file, you can test it at:
- http://localhost:3000 (homepage)
- The logo will appear in the header on all pages
