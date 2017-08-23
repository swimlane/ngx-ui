import { rgb } from 'd3-color';

export function getComputedStyle(elem, key) {
  let view = elem.ownerDocument.defaultView;
  if (!view || !view.opener) {
    view = window;
  }
  const computed = view.getComputedStyle(elem);
  return computed.getPropertyValue(key) || computed[key];
}

export function rgb2hex(color) {
  color = rgb(color).toString();
  color = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  color = (color && color.length === 4) ? '#' +
    ('0' + parseInt(color[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(color[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(color[3], 10).toString(16)).slice(-2) : '';
  return color.toUpperCase();
}
