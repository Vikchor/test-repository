const textElement = document.getElementById('1');
console.log(textElement);
textElement.style.fontSize = '88px';

textElement.addEventListener('click', () => {
  console.log(1);
  console.log(textElement.getAttributeNames());
  const newFontSize = String(Number(textElement.style.fontSize.slice(0, -2)) + 1) + "px";

  textElement.style.fontSize = newFontSize;
});