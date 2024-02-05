export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplateElement());
  }


  createElement(cont) {
    const elem = document.createElement('div');
    elem.innerHTML = cont;
    return elem.firstElementChild;
  }

  createTemplateElement() {
    return `
			<div data-element="productsContainer" class="products-list__container">
				<div class="sortable-table">
					${this.createHeader(this.createColumsHeader())}
					${this.createBody(this.createRowsBody(this.data))}
				</div>
			</div>`;
  }

  // HEADER

  createHeader(cont) {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
			${cont}
		</div>`;
  }

  createColumsHeader() {
    return this.headerConfig.map(i => {
      return `
			<div
				class="sortable-table__cell"
				data-sortable="${i.sortable}"
				data-order="${this.order}"
			>
				<span>
					${i.title}
				</span>
		    </div>`;
    }).join('');
  }

  // BODY

  createBody(cont) {
    return `
		<div data-element="body" class="sortable-table__body">
			${cont}
		</div>`;
  }

  createColumsBody(elem) {
    return this.headerConfig.map(i => {
      if ('template' in i) {
        return i.template(elem[i.id]);
      }
      return `<div class="sortable-table__cell">${elem[i.id]}</div>`;
    }).join('');
  }

  createRowsBody(arr) {
    return arr.map(i => {
      return `
			<a href="/products/${i.id}" class="sortable-table__row">
				${this.createColumsBody(i)}
			</a>`;
    }).join('');
  }


  // METHODS

  sort(fieldValue, orderValue) {
    const arr = [...this.data].sort((a, b) => {
      if (orderValue === 'desc') {
		console.log(typeof a[fieldValue]);
        if (typeof a[fieldValue] === 'string') {
          return b[fieldValue].localeCompare(a[fieldValue], 'ru-en', { caseFirst: 'upper' });
        }

        return b[fieldValue] - a[fieldValue];
      }

      if (typeof a[fieldValue] === 'string') {
        return a[fieldValue].localeCompare(b[fieldValue], 'ru-en', { caseFirst: 'upper' });
      }
      return a[fieldValue] - b[fieldValue];
    });

    this.element.querySelector('[data-element="body"]').innerHTML = this.createRowsBody(arr);
  }


  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
    }

