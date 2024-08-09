import { createElement } from "./utils.js";
import commentContainer from "./Comments.js";
import audioScreen from "./Audio.js";
import "./reset.css";
import "./styles.css";

const app = createElement("main", { class: "main-content" });

app.append(audioScreen, commentContainer);

export default app;
