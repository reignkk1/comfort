import { createElement } from "../utils";

export class LoginForm {
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
