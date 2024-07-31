import { createElement } from "./utils.js";
import commentsContainer from "./Comments.js";
import audioScreen from "./Audio.js";
import "./reset.css";
import "./styles.css";

const app = createElement("main", { class: "main-content" });

app.append(audioScreen, commentsContainer);

export default app;
