class Search {
  constructor() {
    this.data = null;
    this.substrSearch = this.substrSearch.bind(this);
    this.lengthSearch = this.lengthSearch.bind(this);
    this.eventsHandler();
    this.getData();
  }

  substrSearch(e) {
    e.preventDefault();
    const searchField = document.querySelector('.form__text-field');
    const searchValue = searchField.value;
    const registerFlag = document.getElementById('register-flag');
    const flag = registerFlag.checked ? 'i' : '';
    const reg = new RegExp(searchValue, `g${flag}`);
    const result = this.data.filter((item) => item.match(reg));
    const notFound = ['Ничего не найдено...'];
    if (result.length === 0) {
      this.dataLayout(notFound)
    } else {
      this.dataLayout(result);
    }
    
  }

  lengthSearch(e) {
    e.preventDefault();
    const searchField = document.querySelector('.form__text-field');
    const searchValue = searchField.value;
    if (typeof +searchValue !== 'number') return false;
    const result = this.data.filter((item) => item.length > +searchValue);
    const notFound = ['Ничего не найдено...'];
    if (result.length === 0) {
      this.dataLayout(notFound)
    } else {
      this.dataLayout(result);
    }
  }

  async getData() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'http://www.mrsoft.by/data.json';
    console.log(proxyurl + url);
    try {
      const request = await fetch(proxyurl + url);
      const result = await request.json();
      this.data = result.data;
    } catch (e) {

    }
  }

  dataLayout(data) {
    const result = `<p class="result__paragraph">${data.join(', ')}</p>`;
    const contentBlock = document.querySelector('.result__content');
    contentBlock.innerHTML = result;
  }

  formEvents(e) {
    e.preventDefault();
  }

  eventsHandler() {
    const substrBtn = document.querySelector('.form__substr-filter');
    const lengthBtn = document.querySelector('.form__length-filter');
    const form = document.querySelector('.form');
    form.addEventListener('submit', this.formEvents);
    substrBtn.addEventListener('click', this.substrSearch);
    lengthBtn.addEventListener('click', this.lengthSearch);
  }
}

new Search();