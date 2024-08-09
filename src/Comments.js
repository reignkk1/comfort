import { createComment, createElement, getElement } from "./utils.js";

class LoginForm {
  constructor() {
    this.loginForm = createElement("div", { class: "input-container" });
    this.nicknameContainer = createElement("div");
    this.nicknameLabel = createElement("span", {
      class: "nickname-label",
      innerText: "닉네임: ",
    });
    this.nicknameInput = createElement("input", {
      class: "nickname-input",
      type: "text",
      maxlength: "20",
    });

    this.passWordContainer = createElement("div");
    this.passWordLabel = createElement("span", {
      class: "passWord-label",
      innerText: "비밀번호: ",
    });
    this.passWordInput = createElement("input", {
      class: "passWord-input",
      type: "password",
      maxlength: "6",
    });
  }

  init() {
    this.renderLoginForm();
    this.addEventListenerLoginForm();
    return this.loginForm;
  }

  addEventListenerLoginForm() {
    const { nicknameInput, passWordInput } = this;

    nicknameInput.oninput = () => {
      nickName = nicknameInput.value;
    };
    passWordInput.oninput = () => {
      passWord = passWordInput.value;
    };
  }

  renderLoginForm() {
    const {
      nicknameContainer,
      nicknameInput,
      nicknameLabel,
      passWordContainer,
      passWordInput,
      passWordLabel,
      loginForm,
    } = this;

    nicknameContainer.append(nicknameLabel, nicknameInput);
    passWordContainer.append(passWordLabel, passWordInput);
    loginForm.append(nicknameContainer, passWordContainer);
  }
}

class CommentList {
  constructor() {
    this.commentsList = createElement("ul", { class: "comments-list" });
  }

  init() {
    this.renderCommentList();
    return this.commentsList;
  }

  renderCommentList() {
    // 댓글 리스트 불러오기 => ajax
    createComment(this.commentsList, "김민겸", "노래가 너무 좋습니다!");
    createComment(this.commentsList, "김민겸", "노래가 너!");
  }
}

class CommentWrite {
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
      const nickName = getElement(LoginForm, "nicknameInput").value;
      const passWord = getElement(LoginForm, "passWordInput").value;
      const commentsUl = getElement(CommentList, "commentsList");
      const content = textarea.value;

      if (!nickName || !passWord) {
        return alert("닉네임 또는 비밀번호를 입력해주세요!");
      }

      createComment(commentsUl, nickName, content);

      nicknameInput.value = "";
      passWordInput.value = "";

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

class CommentContainer {
  constructor() {
    this.commentContainer = createElement("section", { class: "comments" });

    this.LoginForm = new LoginForm().init();
    this.CommentWrite = new CommentWrite().init();
    this.CommentList = new CommentList().init();
  }

  init() {
    this.renderCommentContainer();
    return this.commentContainer;
  }

  renderCommentContainer() {
    const { commentContainer, LoginForm, CommentWrite, CommentList } = this;

    commentContainer.append(LoginForm, CommentWrite, CommentList);
  }
}

export default new CommentContainer().init();
