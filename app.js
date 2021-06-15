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
    for (let i = this.businessHours; i > 0; i--) {
      this.getCustomers(23, 65);
      let totalCookies = this.getCookiesPerHour();
      totalCookies = Math.floor(this.cookiesPerHour);
      cookiesArray.push(totalCookies);
    }
    this.cookiesPerDay = Array.from(cookiesArray);
  },
  getTotalCookies: function() {
    for (let i = 0; i < this.cookiesPerDay.length; i++) {
      this.totalCookies += this.cookiesPerDay[i];
    }
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
  // console.log('customers: ' + shop.customers);
  // console.log('cookies per hour: ' + shop.cookiesPerHour);
  // console.log('cookies per day: ' + shop.cookiesPerDay);
  // console.log('total cookies per day: ' + shop.totalCookies);
  // console.log('total business hours: ' + shop.businessHours);
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
  // console.log('customers: ' + shop.customers);
  // console.log('cookies per hour: ' + shop.cookiesPerHour);
  // console.log('cookies per day: ' + shop.cookiesPerDay);
  // console.log('total cookies per day: ' + shop.totalCookies);
  // console.log('total business hours: ' + shop.businessHours);
  return shop;
}

function dubai() {
  shop.location = 'dubai';
  shop.averageCookiesPurchased = 3.7;
  shop.minCustomers = 11;
  shop.maxCustomers = 38;
  shop.getCustomers(shop.minCustomers, shop.maxCustomers);
  shop.getBusinessHours(0600,2000);
  shop.getCookiesPerHour();
  shop.getCookiesPerDay();
  shop.getTotalCookies();
  // console.log('customers: ' + shop.customers);
  // console.log('cookies per hour: ' + shop.cookiesPerHour);
  // console.log('cookies per day: ' + shop.cookiesPerDay);
  // console.log('total cookies per day: ' + shop.totalCookies);
  // console.log('total business hours: ' + shop.businessHours);
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
  // console.log('customers: ' + shop.customers);
  // console.log('cookies per hour: ' + shop.cookiesPerHour);
  // console.log('cookies per day: ' + shop.cookiesPerDay);
  // console.log('total cookies per day: ' + shop.totalCookies);
  // console.log('total business hours: ' + shop.businessHours);
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
  // console.log('customers: ' + shop.customers);
  // console.log('cookies per hour: ' + shop.cookiesPerHour);
  // console.log('cookies per day: ' + shop.cookiesPerDay);
  // console.log('total cookies per day: ' + shop.totalCookies);
  // console.log('total business hours: ' + shop.businessHours);
  return shop;
}

let shopArray = [];
shopArray.push(seattle());
shopArray.push(tokyo());
// shopArray.push(dubai());
// shopArray.push(paris());
// shopArray.push(lima());

// for (let i = 0; i < shopArray.length; i++) {
  console.log("shop name: " + shopArray[0].location)
// }

console.log(shopArray);


const divElem = document.getElementById('list')


  const h2Elem = document.createElement('h2');
  h2Elem.textContent = shop.location;
  divElem.appendChild(h2Elem);

  const ulElem = document.createElement('ul');
  divElem.appendChild(ulElem);


  for (let i = 0; i < shop.cookiesPerDay.length; i++) {
    const liElem = document.createElement('li');
    liElem.textContent = shop.cookiesPerDay[i];
    ulElem.appendChild(liElem);
  }
  const liElem = document.createElement('li');
  liElem.textContent = 'Total Cookies: ' + shop.totalCookies;
  ulElem.appendChild(liElem);


