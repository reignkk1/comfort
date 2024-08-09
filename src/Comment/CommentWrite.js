import { createComment, createElement, getElement } from "../utils";
import { CommentList } from "./CommentList";
import { LoginForm } from "./LoginForm";

export class CommentWrite {
  constructor() {
    this.commentWrite = createElement("div", { class: "comment-write" });
    this.textareaContainer = createElement("div", {
      class: "textarea-container",
    });
    this.textarea = createElement("textarea", {
      class: "textarea",
      placeholder: "댓글 추가..",
      rows: "1",
    });
    this.buttonsContainer = createElement("div", {
      class: "buttons-container no-show",
    });
    this.cancelButton = createElement("button", {
      class: "button-cancel",
      innerText: "취소",
    });

    this.submitButton = createElement("button", {
      class: "button-submit submit-disabled",
      innerText: "등록",
      disabled: "false",
    });
  }

  init() {
    this.renderCommentWrite();
    this.addEventListenerCommentWrite();
    return this.commentWrite;
  }

  addEventListenerCommentWrite() {
    const { textarea, cancelButton, submitButton, buttonsContainer } = this;

    textarea.addEventListener("focus", () => {
      buttonsContainer.classList.remove("no-show");
    });

    textarea.oninput = () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + 1 + "px";

      if (textarea.value) {
        this.activeSubmitButton(true);
      } else {
        this.activeSubmitButton(false);
      }
    };

    cancelButton.addEventListener("click", () => {
      textarea.value = "";
      buttonsContainer.classList.add("no-show");
      this.activeSubmitButton(false);
    });

    submitButton.addEventListener("click", () => {
      const nickName = getElement(LoginForm, "nicknameInput");
      const passWord = getElement(LoginForm, "passWordInput");
      const commentsUl = getElement(CommentList, "commentsList");

      if (!nickName.value || !passWord.value) {
        return alert("닉네임 또는 비밀번호를 입력해주세요!");
      }

      createComment(commentsUl, nickName.value, textarea.value);

      nickName.value = "";
      passWord.value = "";
      textarea.value = "";

      textarea.style.height = "auto";
      this.activeSubmitButton(false);
    });
  }
  renderCommentWrite() {
    const {
      commentWrite,
      textareaContainer,
      textarea,
      cancelButton,
      submitButton,
      buttonsContainer,
    } = this;

    textareaContainer.append(textarea);
    buttonsContainer.append(cancelButton, submitButton);
    commentWrite.append(textareaContainer, buttonsContainer);
  }

  activeSubmitButton(active) {
    const { submitButton } = this;
    if (active) {
      submitButton.classList.remove("submit-disabled");
      submitButton.classList.add("submit-active");
      submitButton.disabled = false;
    } else {
      submitButton.classList.remove("submit-active");
      submitButton.classList.add("submit-disabled");
      submitButton.disabled = true;
    }
  }
}
