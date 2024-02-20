import fetchJson from './utils/fetch-json.js';
import BaseColumnChart from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart extends BaseColumnChart {
	subElements = {}

	constructor({ url, range, ...props }) {
		super(props);
		this.url = url;
		this.value = this.calculateValue();
		this.selectSubElements();
		this.update(range?.from, range?.to);
	}

	selectSubElements() {
		this.element.querySelectorAll('[data-element]').forEach(element => {
			this.subElements[element.dataset.element] = element;
		});
	}

	calculateValue() {
		return Object.values(this.data).reduce((acc, i) => acc + i, 0);
	}

	viewLoader() {
		if (this.data.length === 0) {
			this.element.classList.add('column-chart_loading');
		} else {
			this.element.classList.remove('column-chart_loading');
		}
	}

	async getData(url, from, to) {
		const urlWithQuery = new URL(url, BACKEND_URL);
		urlWithQuery.searchParams.set('to', to);
		urlWithQuery.searchParams.set('from', from);
		return await fetchJson(urlWithQuery);
	}

	async update(from, to) {
		this.data = await this.getData(this.url, from, to);
		this.subElements.header.innerHTML = this.formatHeading(this.calculateValue());
		this.subElements.body.innerHTML = this.createColumnsTemplate(Object.values(this.data));
		this.viewLoader();
		return this.data;
	}
}
