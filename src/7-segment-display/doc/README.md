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
import sevenSegmentDisplay, {
	DIGITS,
} from 'fitbit-widgets/dist/7-segment-display';

const display = sevenSegmentDisplay(
	document.getElementById('display') as GraphicsElement,
	{
		charMap: DIGITS,
		classNames: { on: 'on', off: 'off' },
		height: 205,
		width: 110,
	},
);

display.value = '7';
```

# Screenshot

![The number 7](./screenshot.png)
