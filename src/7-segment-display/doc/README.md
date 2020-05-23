# Confirm dialog

A classic 7-display component.
You can pass it a char map to a combination of activated segments.

**index.gui**

```
<svg>
  <defs>
    <link rel="stylesheet" href="fitbit-widgets/7-segment-display/index.css" />
    <link rel="import" href="fitbit-widgets/7-segment-display/index.gui" />
  </defs>
  <use id="display" href="#7-segment-display" />
</svg>
```

**index.css**

```css
.on {
	fill: #c00000;
}

.off {
	fill: #400000;
}
```

```typescript
import document from 'document';
import * as sevenSegmentDisplay from 'fitbit-widgets/dist/7-segment-display';
import { byId } from 'fitbit-widgets/dist/document';

const displayElement = byId('display');
const display = sevenSegmentDisplay.resize(displayElement, {
	height: 205,
	width: 110,
});
sevenSegmentDisplay.print(displayElement, '7', {
	charMap: sevenSegmentDisplay.DIGITS,
	classNames: { on: 'on', off: 'off' },
});
```

# Screenshot

![The number 7](./screenshot.png)
