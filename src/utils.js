export function createElement(tag, attr) {
  /** @type {Element|null} */
  const element = document.createElement(tag);

  if (attr) {
    for (const [prop, value] of Object.entries(attr)) {
      if (prop === "innerText") {
        element.innerText = value;
      } else if (prop === "append") {
        element.append(value[0]);
      } else {
        element.setAttribute(prop, value);
      }
    }
  }

  return element;
}

// 아이콘 ClassName 리턴함수
export function getIconClassName(icon) {
  let className;

  if (icon === "pause") {
    className = "fas fa-pause fa-lg";
  } else if (icon === "play") {
    className = "fas fa-play fa-lg";
  } else if (icon === "muted") {
    className = "fas fa-volume-mute fa-lg";
  } else if (icon === "volume") {
    if (volumeState > 0.5) {
      className = "fas fa-volume-up fa-lg";
    } else {
      className = "fas fa-volume-down fa-lg";
    }
  }
  return className;
}
