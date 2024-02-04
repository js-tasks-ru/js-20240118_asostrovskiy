export default class NotificationMessage {
	constructor(message = 'no', { duration = 2000, type = 'success' } = {}) {
		this.message = message;
		this.duration = duration;
		this.type = type;
		this.element = this.createElement(this.createTemplate());
	}

	createElement(cont) {
		const elem = document.createElement('div');
		elem.innerHTML = cont;
		return elem.firstElementChild;
	}

	createTemplate() {
		return `
		<div class="notification ${this.type}" style="--value:${this.duration}ms">
			<div class="timer"></div>
			<div class="inner-wrapper">
			<div class="notification-header">success</div>
			<div class="notification-body">
				${this.message}
			</div>
			</div>
	  </div>`
	}

	show() {
		if (window.notice_id) {
			delete window.notice_id.remove();
		}

		document.body.append(this.element);
		setTimeout(() => this.destroy(), this.duration);
	}

	remove() {
		this.element.remove();
	}

	destroy() {
		this.remove();
	}
}
