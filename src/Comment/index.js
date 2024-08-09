import { LoginForm } from "./LoginForm";
import { CommentList } from "./CommentList";
import { CommentWrite } from "./CommentWrite";
import { createElement } from "../utils";

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
