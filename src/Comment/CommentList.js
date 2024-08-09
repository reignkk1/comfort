import { createComment, createElement } from "../utils";

export class CommentList {
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
