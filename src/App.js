import { createElement } from "./utils.js";
import CommentContainer from "./Comment";
import AudioScreanContainer from "./Audio";
import "./reset.css";
import "./styles.css";

const app = createElement("main", { class: "main-content" });

app.append(AudioScreanContainer, CommentContainer);

export default app;
