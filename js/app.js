storeHours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

function Shop(location, averageCookies, minCustomers, maxCustomers) {
  this.location = location;
  this.averageCookies = averageCookies;
  this.customers = 0;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.cookiesPerHour = 0;
  this.cookiesPerDay = [];
  this.totalCookies = 0;
  this.businessHours = 0;

  this.getCustomers = function(min, max) {
    let customerCount = Math.floor(((Math.random() * (max - min)) + min) + 1);
    this.customers = customerCount;
  };
  this.getCookiesPerHour = function() {
    this.cookiesPerHour = this.customers * this.averageCookies;
  };
  this.getCookiesPerDay = function() {
    console.log(this.businessHours)
    let cookiesArray = [];
    for (let i = this.businessHours; i > 1; i--) {
      this.getCustomers(23, 65);
      let totalCookies = this.getCookiesPerHour();
      totalCookies = Math.floor(this.cookiesPerHour);
      cookiesArray.push(totalCookies);
    }
    this.cookiesPerDay = Array.from(cookiesArray);
  };
  this.getTotalCookies = function() {
    let cookies = 0;
    for (let i = 0; i < this.cookiesPerDay.length; i++) {
      cookies += this.cookiesPerDay[i];
    }
    this.totalCookies = cookies;
  };
  //function takes military time only
  this.getBusinessHours = function(open, close) {
    this.businessHours = Math.floor((close - open)/100);
  }
  this.init = function() {
    this.getCustomers(minCustomers, maxCustomers);
    this.getBusinessHours(0600,2000);
    this.getCookiesPerHour();
    this.getCookiesPerDay();
    this.getTotalCookies();
  }

  this.init();
  this.shopArray.push(this);
}

Shop.prototype.shopArray = [];

const seattle = new Shop('Seattle', 6.3, 23, 65);
const tokyo = new Shop('Tokyo', 1.2, 3, 24);
const dubai = new Shop('Dubai', 3.7, 11, 38);
const paris = new Shop('Paris', 2.3, 20, 38);
const lima = new Shop('Lima', 0.6, 2, 16);

console.log(Shop.prototype.shopArray);

const divElem = document.getElementById('list')

const tableElem = document.createElement('table')
divElem.appendChild(tableElem);

function renderHeader() {
  const rowHoursElem = document.createElement('tr');
  tableElem.appendChild(rowHoursElem);
  const rowHoursCellElem = document.createElement('th');
  rowHoursElem.appendChild(rowHoursCellElem);
  for (let i = 0; i < storeHours.length; i++) { 
    const rowHoursCellElem = document.createElement('th');
    rowHoursCellElem.textContent = storeHours[i];
    rowHoursElem.appendChild(rowHoursCellElem);
  }
}

function renderTable() {
  for (let i = 0; i < Shop.prototype.shopArray.length; i++) { 
    currentShop = Shop.prototype.shopArray[i]
    const row1Elem = document.createElement('tr');
    tableElem.appendChild(row1Elem);
    const rowCellElem = document.createElement('th');
    rowCellElem.textContent = currentShop.location;
    row1Elem.appendChild(rowCellElem);

    for (let j = 0; j < currentShop.cookiesPerDay.length; j++) {
      const rowCellElem2 = document.createElement('td');
      rowCellElem2.textContent = `${currentShop.cookiesPerDay[j]}`;
      row1Elem.appendChild(rowCellElem2);
    }

    const rowCellElem3 = document.createElement('td');
    rowCellElem3.textContent = 'Total Cookies: ' + currentShop.totalCookies;
    row1Elem.appendChild(rowCellElem3);

  }
}

renderHeader();
renderTable();

