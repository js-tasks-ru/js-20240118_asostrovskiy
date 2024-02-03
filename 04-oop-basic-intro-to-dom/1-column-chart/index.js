
export default class ColumnChart {
	chartHeight = 50;

	constructor({ data = [], label = '', value = 0, link = '', formatHeading = v => v } = {}) {
	  this.data = data;
	  this.label = label;
	  this.value = value;
	  this.link = link;
	  this.formatHeading = formatHeading;
	  this.element = this.createElement(this.defaultTemplate());
	}

	createElement(temp) {
	  const elem = document.createElement('div');
	  elem.innerHTML = temp;
	  return elem.firstElementChild;
	}

	destroy() {
	  this.remove();
	}

	remove() {
	  this.element.remove();
	}

	update(value) {
	  this.data = value;
	  this.element.querySelector('[data-element="body"]').innerHTML = this.createCharts(value);
	}

	createCharts(arr) {
	  if (!arr.length) { return ''; }
	  const maxValue = Math.max(...arr);
	  return arr.map(i => {
	    return `<div style="--value: ${Math.floor((i * this.chartHeight) / maxValue)}" data-tooltip="${((i * 100) / maxValue).toFixed(0)}%"></div>`;
	  }).join('');
	}

	defaultTemplate() {
	  console.log(this.data);
	  return `
		<div class="column-chart ${!this.data.length ? 'column-chart_loading' : ''}" style="--chart-height: ${this.chartHeight}">
		<div class="column-chart__title">
		  Total ${this.label}
		  ${this.link ? `<a href="/${this.link}" class="column-chart__link">Подробнее</a>` : ''}
		</div>
		<div class="column-chart__container">
		  <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
		  <div data-element="body" class="column-chart__chart">
		  	${this.createCharts(this.data)}
		  </div>
		</div>
	  </div>`;
	}

}

