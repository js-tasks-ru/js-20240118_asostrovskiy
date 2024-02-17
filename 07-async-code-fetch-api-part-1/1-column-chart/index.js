import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart {
	chartHeight = 50;
	data = []
	subElements = {}

	constructor({ url = '', range = {}, label = '', link = '', formatHeading = v => v } = {}) {
	  this.url = url;
	  this.range = range;
	  this.label = label;
	  this.link = link;
	  this.formatHeading = formatHeading;
	  this.element = this.createElement(this.createTemplate());
	  this.selectSubElements();
	  this.update(range.from, range.to);
	}

	selectSubElements() {
		this.element.querySelectorAll('[data-element]').forEach(element => {
		  this.subElements[element.dataset.element] = element;
		});
	  }

	createElement(temp) {
	  const elem = document.createElement('div');
	  elem.innerHTML = temp;
	  return elem.firstElementChild;
	}

	createTemplate() {
	  return `
		<div class="column-chart ${!this.data.length ? 'column-chart_loading' : ''}" style="--chart-height: ${this.chartHeight}">
		<div class="column-chart__title">
		  Total ${this.label}
		  ${this.link ? `<a href="/${this.link}" class="column-chart__link">Подробнее</a>` : ''}
		</div>
		<div class="column-chart__container">
		  <div data-element="header" class="column-chart__header">${this.formatHeading(this.getTotalValue)}</div>
		  <div data-element="body" class="column-chart__chart">
		  	${this.createColumnsTemplate(this.data)}
		  </div>
		</div>
	  </div>`;
	}

	get getTotalValue() {
	  return Object.values(this.data).reduce((acc, i) => acc + i, 0);
	}

	viewLoader() {
	  this.data.length === 0
	    ? this.element.classList.add('column-chart_loading')
	    : this.element.classList.remove('column-chart_loading');
	}

	createColumnsTemplate(arr) {
	  if (!arr.length) {return '';}
	  const maxValue = Math.max(...arr);
	  return arr.map(i => {
	    return `<div style="--value: ${Math.floor((i * this.chartHeight) / maxValue)}" data-tooltip="${((i * 100) / maxValue).toFixed(0)}%"></div>`;
	  }).join('');
	}

	async getData(url, { to, from }) {
	  const urlWithQuery = new URL(url, BACKEND_URL);
	  urlWithQuery.searchParams.set('to', to);
	  urlWithQuery.searchParams.set('from', from);
	  return await fetchJson(urlWithQuery);
	}

	async update(from, to) {
	  this.range.to = to;
	  this.range.from = from;
	  this.data = await this.getData(this.url, this.range);
	  this.element.querySelector('[data-element="header"]').innerHTML = this.formatHeading(this.getTotalValue);
	  this.element.querySelector('[data-element="body"]').innerHTML = this.createColumnsTemplate(Object.values(this.data));
	  this.viewLoader();
	  return this.data;
	}


	destroy() {
	  this.remove();
	  this.subElements = {};
	}

	remove() {
	  this.element.remove();
	}
}
