import { createElement, getIconClassName } from "./utils.js";

//플레이 리스트 데이터 가져오기
const playList = await import("../playList.json", {
  with: {
    type: "json",
  },
});

// 상태를 객체로 만든 후 class 모듈 인자로 넣는다.
// 클래스 모듈들은 각각 다른 파일로

// 뮤직 플레이어 초기 상태
let audio = new Audio();
let playState = false;
let mutedState = false;
let volumeState;

class asdf {
  constructor() {}
}

// 오디오 컨트롤러 element 모듈
class AudioController {
  constructor() {
    this.container = createElement("div", { class: "audio-controller" });
    this.leftControls = createElement("div", { class: "left-controls" });

    this.playButton = createElement("button");
    this.playIcon = createElement("i", { class: getIconClassName("play") });

    this.mutedButton = createElement("button");
    this.mutedIcon = createElement("i", { class: getIconClassName("volume") });

    this.volumeRangeSpan = createElement("span");
    this.volumeRangeInput = createElement("input", {
      class: "volume-range",
      type: "range",
      min: "0",
      max: "10",
      value: "3",
    });
  }

  init() {
    this.renderController();
    this.addEventListenerController();
    volumeState = this.volumeRangeInput.value / 10;
    this.audioMutedFalse();
  }

  addEventListenerController() {
    const { playButton, mutedButton, volumeRangeInput } = this;

    playButton.addEventListener("click", () => {
      playState = !playState;
      playState ? this.audioPlay() : this.audioPause();
    });

    mutedButton.addEventListener("click", () => {
      mutedState = !mutedState;
      mutedState ? this.audioMutedTrue() : this.audioMutedFalse();
    });

    volumeRangeInput.oninput = () => {
      volumeState = audio.volume = volumeRangeInput.value / 10;
      audio.volume === 0 ? this.audioMutedTrue() : this.audioMutedFalse();
    };
  }

  renderController() {
    const {
      leftControls,
      playButton,
      mutedButton,
      volumeRangeInput,
      container,
      playIcon,
      mutedIcon,
      volumeRangeSpan,
    } = this;

    playButton.append(playIcon);
    mutedButton.append(mutedIcon);
    volumeRangeSpan.append(volumeRangeInput);
    leftControls.append(playButton, mutedButton, volumeRangeSpan);
    container.append(leftControls);
  }

  audioPlay() {
    this.playIcon.className = getIconClassName("pause");
    audio.play();
  }

  // 음악 일시정지
  audioPause() {
    this.playIcon.className = getIconClassName("play");
    audio.pause();
  }

  // 음소거
  audioMutedTrue() {
    this.mutedIcon.className = getIconClassName("muted");
    audio.muted = true;
  }
  // 음소거 해제
  audioMutedFalse() {
    this.mutedIcon.className = getIconClassName("volume", volumeState);
    audio.muted = false;
  }
}

class AudioScreen extends AudioController {
  constructor() {
    super();
    this.audioScreen = createElement("section", { class: "music-screen" });
    this.backGroundImg = createElement("img", { class: "music-img" });
    this.musicTitle = createElement("span", { class: "music-title" });
  }

  init() {
    super.init();
    this.renderScreen();
    this.randomChoice();
    this.addEventListenerScreen();
    return this.audioScreen;
  }

  renderScreen() {
    const { audioScreen, backGroundImg, musicTitle, container } = this;
    audioScreen.append(backGroundImg, musicTitle, container);
  }

  addEventListenerScreen() {
    this.backGroundImg.addEventListener("click", () => {
      playState = !playState;
      if (playState) {
        this.audioPlay();
      } else {
        this.audioPause();
      }
    });

    this.audioScreen.addEventListener("mouseleave", () => {
      if (playState) {
        this.container.classList.add("no-show");
      }
    });
    this.audioScreen.addEventListener("mouseover", () => {
      this.container.classList.remove("no-show");
    });

    audio.addEventListener("ended", () => {
      this.randomChoice();
      this.audioPlay();
    });
  }

  randomChoice() {
    const playListArray = playList.default.data;
    const randomNumber = Math.floor(Math.random() * playListArray.length);
    const randomMusic = playListArray[randomNumber];

    audio.src = `./assets/mp3/${randomMusic.title}.mp3`;
    this.musicTitle.innerText = randomMusic.title;
    audio.volume = volumeState;
    this.backGroundImg.src = `./assets/img/${randomMusic.imgNumber}.png`;
  }
}

export default new AudioScreen().init();
