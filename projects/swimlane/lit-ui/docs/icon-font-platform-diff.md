# Icon font: platform vs ngx-ui (root cause)

The font at **https://dev.swimlane.app/assets/ngx-icon-SWYRP4SX.woff2** was inspected and compared to the ngx-ui source of truth (`projects/swimlane/ngx-ui/src/lib/assets/icons/iconfont/scss/icons.scss` and `ngx-icon.svg`).

## Findings

1. **Platform font has no glyph at EA01**  
   Codepoints start at EA02. So the first glyph (3d-rotate) is at EA02 in the platform font but EA01 in ngx-ui.

2. **Glyph order differs in the “action” block**

   - **action**: ngx-ui = `ea02`, platform = `ea09`
   - **action-maximize** / **action-maximize-inverse**: swapped (platform has inverse at ea04, maximize at ea05; ngx-ui has the opposite).
   - **action-outline** / **action-outline-small**: swapped (platform has outline-small at ea07, outline at ea08; ngx-ui has the opposite).

3. **From ea0a onward**  
   After the “action” block, mapping realigns (e.g. add-circle-filled, add-circle-medium, add-circle-thin match), then shifts again because “action” at ea09 in the platform pushes add-circle and following glyphs one slot later until the block is past.

So the platform woff2 was **not** built from the same glyph order as `ngx-icon.svg` / `icons.scss`. Either a different source was used or the build pipeline reordered/swapped glyphs.

## Fix

**Option A – Use platform font mapping (generated):**  
Generate the glyph map from the platform’s woff2 so swim-icon uses the same codepoints:

```bash
# From a local font file
npm run generate:icon-glyphs:from-font -- demo/assets/ngx-icon-platform.woff2

# Or from URL (e.g. latest platform asset)
FONT_URL=https://dev.swimlane.app/assets/ngx-icon-SWYRP4SX.woff2 node scripts/generate-icon-glyphs-from-font.mjs
```

This writes `icon-font-glyphs-platform.ts`. In the platform app, alias the glyph module to this file so the icon component loads it (see README).

**Option B – Align font build with ngx-ui:**  
Build the platform’s icon font from the **same source** as ngx-ui:  
`projects/swimlane/ngx-ui/src/lib/assets/icons/iconfont/fonts/ngx-icon.svg`  
and use the same codepoint mapping as `icons.scss` (no reordering, first glyph at EA01). Then the default `icon-font-glyphs.ts` (from icons.scss) is correct and no platform-specific file is needed.

The local script that compared the platform font used `fontkit` and is the same logic that produced the table below.

## Comparison (first 15 codepoints)

| codepoint | icons.scss (ngx-ui)     | platform font           |
| --------- | ----------------------- | ----------------------- |
| ea01      | 3d-rotate               | (none)                  |
| ea02      | action                  | 3d-rotate               |
| ea03      | action-close            | action-close            |
| ea04      | action-maximize         | action-maximize-inverse |
| ea05      | action-maximize-inverse | action-maximize         |
| ea06      | action-minimize         | action-minimize         |
| ea07      | action-outline          | action-outline-small    |
| ea08      | action-outline-small    | action-outline          |
| ea09      | add-circle              | action                  |
| ea0a      | add-circle-filled       | add-circle-filled       |
| ea0b      | add-circle-medium       | add-circle-medium       |
| ea0c      | add-circle-thin         | add-circle-thin         |
| ea0d      | add-edge                | add-circle              |
| ea0e      | add-new                 | add-edge                |
| ea0f      | add-node                | add-new                 |
