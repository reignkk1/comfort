class MenuButtons extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class='header-right'>
                <button>
                    <i class="fas fa-ellipsis-v"></i>
                </button>
                <button>
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>

          `;
  }
}

export default MenuButtons;