class Tooltip {
	element
	static lastElement
	static OFFSET_X = 10
	static OFFSET_Y = 10

	constructor() {
		if (Tooltip.lastElement) return Tooltip.lastElement;
		Tooltip.lastElement = this;
	}

	createElement(content) {
		const elem = document.createElement('div');
		elem.innerHTML = content;
		return elem.firstElementChild;
	}

	createTemplate(content) {
		return `<div class="tooltip">${content}</div>`
	}

	pointerover(e) {
		if (e.target.dataset?.tooltip) {
			this.element = this.createElement(this.createTemplate(e.target.dataset?.tooltip));
			e.target.append(this.element);
			document.addEventListener('mousemove', this.handleMouseOver);
		}
	}

	handleMouseOver = (e) => {
		this.render(e);
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
			document.body.removeEventListener('mousemove', this.handleMouseOver);
		}
	}

	render(e) {
		if (this.element) {
			this.element.style.left = e.clientX + Tooltip.OFFSET_X + 'px';
			this.element.style.top = e.clientY + Tooltip.OFFSET_Y + 'px';
		}
	}

	initialize() {
		document.body.addEventListener('pointerout', this.handlePointerout);
		document.body.addEventListener('pointerover', this.handlePointerover);
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
