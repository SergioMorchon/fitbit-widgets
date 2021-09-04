import { constructWidgets, getConfig } from './widget_utils';

export const constructTextRect = el => {
  el.class = el.class;    // bring forward (ie, trigger) application of CSS styles

  const textEl = el.getElementById('text');
  const rectEl = el.getElementById('rect');
  // Because the following attributes are set only when the widget is constructed, they won't respond to subsequent changes.
  let paddingLeft = 5, paddingRight = 5, paddingTop = 0, paddingBottom = 0;

  const config = getConfig(el);
  for (const name in config) {
    const value = Number(config[name]);   // convert to Number here because the only allowed values are numbers
    switch(name) {
      case 'padding-left':
        paddingLeft = value;
        break;
      case 'padding-right':
        paddingRight = value;
        break;
      case 'padding-top':
        paddingTop = value;
        break;
      case 'padding-bottom':
        paddingBottom = value;
        break;
    }
  }

  el.redraw = () => {
    // This function must be called when .style.display is changed from 'none'. This can be done directly or via some other API function.
    if (el.style.display === 'none') return;

    const bbox = textEl.getBBox();    // warning: this won't work if the element is rotated due to bug in Fitbit OS
    const anchorOffset = textEl.textAnchor==='start'? 0 : (textEl.textAnchor==='end'? bbox.width : bbox.width / 2);
    rectEl.x = -paddingLeft - anchorOffset;
    rectEl.width = bbox.width + paddingLeft + paddingRight;
    rectEl.y = bbox.top - el.y - paddingTop;
    rectEl.height = bbox.height + paddingTop + paddingBottom;
  }

  Object.defineProperty(el, 'text', {
    set: function(newValue) {
      textEl.text = newValue;
      el.redraw();
    }
  });

  el.redraw();
}
