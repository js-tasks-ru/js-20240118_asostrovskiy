class Tooltip {
	element
	lastElement

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

	render() {

	}

	pointerover(e) {
		if (e.target.dataset?.tooltip) {
			this.element = this.createElement(this.createTemplate(e.target.dataset?.tooltip));
			e.target.append(this.element);
		}

	}

	render(e) {
		if(this.element) {
			this.element.style.left = e.clientX + 'px';
			this.element.style.top = e.clientY + 'px';
		}
	}

	pointerout(e) {
		if (e.target.dataset?.tooltip) {
			this.remove();
			document.body.removeEventListener('mousemove', () => this.render());
		}
	}


	initialize() {
		document.addEventListener('mousemove', (e) => this.render(e));
		document.body.addEventListener('pointerover', (e) => this.pointerover(e));
		document.body.addEventListener('pointerout', (e) => this.pointerout(e));
	}

	remove() {
		this.element?.remove();
	}

	destroy() {
		document.body.removeEventListener('pointerover', () => this.pointerover());
		document.body.removeEventListener('pointerout', () => this.pointerout());
		this.remove();
	}
}

export default Tooltip;
