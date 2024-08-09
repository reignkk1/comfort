// Element 생성
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

// 댓글생성 로직
export function createComment(container, nickname, content) {
  const comment = createElement("li", { class: "comment" });
  const userNickname = createElement("div", { class: "nickname" });
  const commentContent = createElement("p", { class: "content" });

  userNickname.innerText = nickname;
  commentContent.innerText = content;

  comment.append(userNickname, commentContent);
  container.appendChild(comment);
}

// class 모듈 내에 Element select
export function getElement(module, element) {
  /** @type {class} */
  const classModule = new module();
  /** @type {Element|null} */
  const selectElement = classModule[element];
  return document.querySelector(`.${selectElement.className}`);
}

// 아이콘 ClassName 리턴함수
export function getIconClassName(icon, volume) {
  let className;

  if (icon === "pause") {
    className = "fas fa-pause fa-lg";
  } else if (icon === "play") {
    className = "fas fa-play fa-lg";
  } else if (icon === "muted") {
    className = "fas fa-volume-mute fa-lg";
  } else if (icon === "volume") {
    if (volume > 0.5) {
      className = "fas fa-volume-up fa-lg";
    } else {
      className = "fas fa-volume-down fa-lg";
    }
  }
  return className;
}
