class Tooltip {
	element
	static lastElement
	static OFFSET_X = 10
	static OFFSET_Y = 10

	constructor() {
		if (Tooltip.lastElement) return Tooltip.lastElement;
		Tooltip.lastElement = this;
		this.element = this.createElement(this.createTemplate());
	}

	createElement(content) {
		const elem = document.createElement('div');
		elem.innerHTML = content;
		return elem.firstElementChild;
	}

	createTemplate(content = '') {
		return `<div class="tooltip">${content}</div>`
	}

	pointerover(e) {
		if (e.target.dataset?.tooltip) {
			this.element.innerHTML = e.target.dataset?.tooltip;
			this.render(e.target);
		}
	}

	handleMouseOver = (e) => {
		this.element.style.left = e.clientX + Tooltip.OFFSET_X + 'px';
		this.element.style.top = e.clientY + Tooltip.OFFSET_Y + 'px';
	}
	handlePointerout = (e) => {
		this.pointerout(e);
	}
	handlePointerover = (e) => {
		this.pointerover(e);
	}

	pointerout(e) {
		if (e.target.dataset?.tooltip) {
			this.remove();
			// document.body.removeEventListener('mousemove', this.handleMouseOver);
		}
	}

	render(conteiner) {
		conteiner.append(this.element);
	}

	initialize() {
		document.body.addEventListener('pointerout', this.handlePointerout);
		document.body.addEventListener('pointerover', this.handlePointerover);
		document.body.addEventListener('mousemove', this.handleMouseOver);
	}

	remove() {
		this.element?.remove();
	}

	destroy() {
		document.body.removeEventListener('pointerover', this.handlePointerover);
		document.body.removeEventListener('pointerout', this.handlePointerout);
		this.remove();
	}
}

export default Tooltip;
