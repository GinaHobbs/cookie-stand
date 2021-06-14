const shop = {
  averageCookiesPurchased: 2.5,
  customers: 0,
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
    // this.businessHours = this.getBusinessHours(6,20);
    console.log(this.businessHours)
    let cookiesArray = [];
    for (let i = this.businessHours; i > 0; i--) {
      this.getCustomers(3, 12);
      this.getCookiesPerHour();
      let totalCookies = Math.floor(this.customers * this.cookiesPerHour);
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
    this.businessHours = (close - open)/100;
  }
}

shop.getCustomers(3,12);
shop.getBusinessHours(0600,2000);
shop.getCookiesPerHour();
shop.getCookiesPerDay();
shop.getTotalCookies();
console.log('customers: ' + shop.customers);
console.log('cookies per hour: ' + shop.cookiesPerHour);
console.log('cookies per day: ' + shop.cookiesPerDay);
console.log('total cookies per day: ' + shop.totalCookies);
console.log('total business hours: ' + shop.businessHours);


const divElem = document.getElementById('list')

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

