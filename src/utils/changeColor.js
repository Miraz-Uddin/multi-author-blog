function changeColor(selector, slice, attr = "color") {
  const el = document.querySelectorAll(selector);
  const arr = Array.prototype.slice.call(el);
  arr.map((el) => (el.style[attr] = slice));
  return;
}

export default changeColor;
