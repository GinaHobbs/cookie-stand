const shop = {
  location: '',
  averageCookiesPurchased: 0,
  customers: 0,
  minCustomers: 0,
  maxCustomers: 0,
  cookiesPerHour: 0,
  cookiesPerDay: [],
  totalCookies: 0,
  businessHours: 0,
  storeHours: ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'],
  getCustomers: function(min, max) {
    let customerCount = Math.floor(((Math.random() * (max - min)) + min) + 1);
    this.customers = customerCount;
  },
  getCookiesPerHour: function() {
    this.cookiesPerHour = this.customers * this.averageCookiesPurchased;
  },
  getCookiesPerDay: function() {
    console.log(this.businessHours)
    let cookiesArray = [];
    for (let i = this.businessHours; i > 1; i--) {
      this.getCustomers(23, 65);
      let totalCookies = this.getCookiesPerHour();
      totalCookies = Math.floor(this.cookiesPerHour);
      cookiesArray.push(totalCookies);
    }
    this.cookiesPerDay = Array.from(cookiesArray);
  },
  getTotalCookies: function() {
    let cookies = 0;
    for (let i = 0; i < this.cookiesPerDay.length; i++) {
      cookies += this.cookiesPerDay[i];
    }
    this.totalCookies = cookies;
  },
  //function takes military time only
  getBusinessHours: function(open, close) {
    this.businessHours = Math.floor((close - open)/100);
  }
}

function seattle() {
  shop.location = 'Seattle';
  shop.averageCookiesPurchased = 6.3;
  shop.minCustomers = 23;
  shop.maxCustomers = 65;
  shop.getCustomers(shop.minCustomers, shop.maxCustomers);
  shop.getBusinessHours(0600,2000);
  shop.getCookiesPerHour();
  shop.getCookiesPerDay();
  shop.getTotalCookies();
  return shop;
}

function tokyo() {
  shop.location = 'Tokyo';
  shop.averageCookiesPurchased = 1.2;
  shop.minCustomers = 3;
  shop.maxCustomers = 24;
  shop.getCustomers(shop.minCustomers, shop.maxCustomers);
  shop.getBusinessHours(0600,2000);
  shop.getCookiesPerHour();
  shop.getCookiesPerDay();
  shop.getTotalCookies();
  return shop;
}

function dubai() {
  shop.location = 'Dubai';
  shop.averageCookiesPurchased = 3.7;
  shop.minCustomers = 11;
  shop.maxCustomers = 38;
  shop.getCustomers(shop.minCustomers, shop.maxCustomers);
  shop.getBusinessHours(0600,2000);
  shop.getCookiesPerHour();
  shop.getCookiesPerDay();
  shop.getTotalCookies();
  return shop;
}

function paris() {
  shop.location = 'Paris';
  shop.averageCookiesPurchased = 2.3;
  shop.minCustomers = 20;
  shop.maxCustomers = 38;
  shop.getCustomers(shop.minCustomers, shop.maxCustomers);
  shop.getBusinessHours(0600,2000);
  shop.getCookiesPerHour();
  shop.getCookiesPerDay();
  shop.getTotalCookies();
  return shop;
}

function lima() {
  shop.location = 'Lima';
  shop.averageCookiesPurchased = .6;
  shop.minCustomers = 2;
  shop.maxCustomers = 16;
  shop.getCustomers(shop.minCustomers, shop.maxCustomers);
  shop.getBusinessHours(0600,2000);
  shop.getCookiesPerHour();
  shop.getCookiesPerDay();
  shop.getTotalCookies();
  return shop;
}

let shopArray = [];
shopArray.push(Object.assign({}, seattle()));
shopArray.push(Object.assign({}, tokyo()));
shopArray.push(Object.assign({}, dubai()));
shopArray.push(Object.assign({}, paris()));
shopArray.push(Object.assign({}, lima()));

console.log(shopArray);

const divElem = document.getElementById('list')

for (let i = 0; i < shopArray.length; i++) {
  const h2Elem = document.createElement('h2');
  h2Elem.textContent = shopArray[i].location;
  divElem.appendChild(h2Elem);

  const ulElem = document.createElement('ul');
  divElem.appendChild(ulElem);

  for (let j = 0; j < shopArray[i].cookiesPerDay.length; j++) {
    const liElem = document.createElement('li');
    liElem.textContent = `${shopArray[i].storeHours[j]}: ${shopArray[i].cookiesPerDay[j]}`;
    ulElem.appendChild(liElem);
  }
  const liElem = document.createElement('li');
  liElem.textContent = 'Total Cookies: ' + shopArray[i].totalCookies;
  ulElem.appendChild(liElem);
}

