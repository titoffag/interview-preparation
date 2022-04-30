import { Component } from './component.js';

class StarRating extends Component {
  constructor(root) {
    super(root, { className: 'star-rating', listeners: ['click', 'mouseleave', 'mouseover'] });
    // state
    this.rating = 0;
    // event handlers
    this.onClick = this.onClick.bind(this);
    this.onMouseleave = this.onMouseleave.bind(this);
    this.onMouseover = this.onMouseover.bind(this);
  }

  afterRender() {
    this.stars = this.el.querySelectorAll('.star');
  }

  toHTML() {
    return this.generateStars();
  }

  generateStars() {
    return Array(5).fill(null).map((_, value) => {
      value = value + 1;
      const active = value <= this.rating ? 'star--active' : '';

      return `
        <div class="star ${active}"
          aria-label="Set rating to ${value}"
          title="Set rating to ${value}"
          aria-selected="${this.rating === value}"
          data-value="${value}">
        </div>
      `;
    }).join('').trim();
  }

  selectStars(value) {
    for (const star of this.stars) {
      const current = +star.dataset.value;
      if (current <= value) {
        star.classList.add('star--active');
      } else {
        star.classList.remove('star--active');
      }
    }
  }

  onClick(e) {
    const value = +e.target.dataset.value;
    if (value) {
      // setState
      this.rating = value;
      this.render();
    }
  }

  onMouseover(e) {
    const hovered = +e.target.dataset.value;
    if (hovered) {
      this.selectStars(hovered);
    }
  }

  onMouseleave(e) {
    this.selectStars(this.rating);
  }
}

const root = document.getElementById('star-rating-widget');
const component = new StarRating(root);
component.render();
