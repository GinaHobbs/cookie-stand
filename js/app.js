"use strict";

var name;


let storeHours = ["6am",'7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
let controlCurve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4];

function Shop(location, averageCookies, minCustomers, maxCustomers) {
  this.location = location;
  this.averageCookies = averageCookies;
  this.customers = [];
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.cookiesPerHour = [];
  this.totalCookies = 0;

  this.getCustomers = function(min, max) {
    let customerArray = [];
    for (let i = 0; i < storeHours.length; i++) {
      let customerCount = Math.floor(((Math.random() * (max - min)) + min) + 1);
      customerArray.push(customerCount);
    }
    this.customers = Array.from(customerArray);
    console.log(this.customers);

    //Apply control curve--------
    let tempArray = [];
    for (let i = 0; i < controlCurve.length; i++) {
      tempArray.push(this.customers[i] * controlCurve[i]);
    }
    this.customers = Array.from(tempArray);
    //---------------------------
  };
  this.getCookiesPerHour = function() {
    let cookiesArray = []
    for (let i = 0; i < this.customers.length; i++) {
      cookiesArray.push(Math.floor(this.customers[i] * this.averageCookies))
    }
    this.cookiesPerHour = Array.from(cookiesArray);
  };
  this.getTotalCookies = function() {
    let cookies = 0;
    for (let i = 0; i < this.cookiesPerHour.length; i++) {
      cookies += this.cookiesPerHour[i];
    }
    this.totalCookies = cookies;
  };
  this.init = function() {
    this.getCustomers(this.minCustomers, this.maxCustomers);
    this.getCookiesPerHour();
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

Shop.prototype.employees = []

Shop.prototype.staffing = function () {
  let tempEmployee = [];
  for (let i = 0; i < this.customers.length; i++) {
    let employeeCount = Math.ceil(this.customers[i]/20);
    if (employeeCount >= 2) {
      tempEmployee.push(employeeCount);
    } else {
      tempEmployee.push(2);
    }
  }
  this.employees = Array.from(tempEmployee);
}

seattle.staffing();
tokyo.staffing();
dubai.staffing();
paris.staffing();
lima.staffing();

function handleSubmit(event) {
  event.preventDefault();
  let location = event.target.location.value;
  let avgCookies = event.target.avgCookies.value;
  let minCustomers = event.target.minCustomers.value;
  let maxCustomers = event.target.maxCustomers.value;
  console.log(location, avgCookies, minCustomers, maxCustomers);

  for (let i = 0; i < Shop.prototype.shopArray.length; i++){
    let currentShop = Shop.prototype.shopArray[i];
    if (location === currentShop.location) {
      currentShop.averageCookies = event.target.avgCookies.value;
      currentShop.minCustomers = event.target.minCustomers.value;
      currentShop.maxCustomers = event.target.maxCustomers.value;
      currentShop.init();
      currentShop.staffing();
      break;
    }else if (Shop.prototype.shopArray.length === (i+1)){
      const newStore = new Shop(location, avgCookies, minCustomers, maxCustomers);
      newStore.staffing();
      break;
    }
  }


  console.log(Shop.prototype.shopArray);
  event.target.reset();

  clearSalesTable();
  renderSalesHeader();
  renderSalesTable();
  renderSalesFooter();

  clearEmployeeTable();
  renderEmployeeHeader();
  renderEmployeeTable();
}
const storeFormElem = document.getElementById('newStoreForm');
storeFormElem.addEventListener('submit', handleSubmit);


// console.log(Shop.prototype.shopArray);


const divElem = document.getElementById('sales');

let tableSalesElem = document.createElement('table');
divElem.appendChild(tableSalesElem);

function clearSalesTable() {
  divElem.removeChild(tableSalesElem);
  tableSalesElem = document.createElement('table');
  divElem.appendChild(tableSalesElem);
}

function renderSalesHeader() {
  const rowHoursElem = document.createElement('tr');
  tableSalesElem.appendChild(rowHoursElem);
  //Add a blank cell at the beginning of the row
  const rowHoursCellElem = document.createElement('th');
  rowHoursElem.appendChild(rowHoursCellElem);
  //--------------------------------------------
  for (let i = 0; i < storeHours.length; i++) { 
    const rowHoursCellElem = document.createElement('th');
    rowHoursCellElem.textContent = storeHours[i];
    rowHoursElem.appendChild(rowHoursCellElem);
  }
}

function renderSalesTable() {
  for (let i = 0; i < Shop.prototype.shopArray.length; i++) { 
    let currentShop = Shop.prototype.shopArray[i];
    const rowStoreElem = document.createElement('tr');
    tableSalesElem.appendChild(rowStoreElem);
    const rowCellElem = document.createElement('th');
    rowCellElem.textContent = currentShop.location;
    rowStoreElem.appendChild(rowCellElem);

    for (let j = 0; j < currentShop.cookiesPerHour.length; j++) {
      const rowCellElem2 = document.createElement('td');
      rowCellElem2.textContent = `${currentShop.cookiesPerHour[j]}`;
      rowStoreElem.appendChild(rowCellElem2);
    }

    const rowCellElem3 = document.createElement('td');
    rowCellElem3.textContent = 'Total Cookies: ' + currentShop.totalCookies;
    rowStoreElem.appendChild(rowCellElem3);

  }

}

function renderSalesFooter() {
    const rowHourlyTotalElem = document.createElement('tr');
    tableSalesElem.appendChild(rowHourlyTotalElem);
    const rowCellElem = document.createElement('th');
    rowCellElem.textContent = 'Totals';
    rowHourlyTotalElem.appendChild(rowCellElem);

    let totalCookiesPerDay = [];
    for (let h = 0; h < storeHours.length; h++) {
      let cookieHourlyTotal = 0;
      for (let i = 0; i < Shop.prototype.shopArray.length; i++) { 
        let currentStore = Shop.prototype.shopArray[i];
        cookieHourlyTotal += currentStore.cookiesPerHour[h];
      }
      const rowCellElem2 = document.createElement('td');
      rowCellElem2.textContent = `${cookieHourlyTotal}`;
      rowHourlyTotalElem.appendChild(rowCellElem2);
      totalCookiesPerDay.push(cookieHourlyTotal);
    }

    let totalDaily = 0;
    for (let i = 0; i < totalCookiesPerDay.length; i++) {
      totalDaily += totalCookiesPerDay[i];
    }
      const rowCellElem3 = document.createElement('td');
      rowCellElem3.textContent = 'Daily Total: ' + totalDaily;
      rowHourlyTotalElem.appendChild(rowCellElem3);

}

renderSalesHeader();
renderSalesTable();
renderSalesFooter();

const divElem2 = document.getElementById('employee');

let tableEmployeesElem = document.createElement('table');
divElem2.appendChild(tableEmployeesElem);

function clearEmployeeTable() {
  divElem2.removeChild(tableEmployeesElem);
  tableEmployeesElem = document.createElement('table');
  divElem2.appendChild(tableEmployeesElem);
}

function renderEmployeeHeader() {
  const rowHoursElem = document.createElement('tr');
  tableEmployeesElem.appendChild(rowHoursElem);
  const rowHoursCellElem = document.createElement('th');
  rowHoursElem.appendChild(rowHoursCellElem);
  for (let i = 0; i < storeHours.length; i++) { 
    const rowHoursCellElem = document.createElement('th');
    rowHoursCellElem.textContent = storeHours[i];
    rowHoursElem.appendChild(rowHoursCellElem);
  }
}

function renderEmployeeTable() {
  for (let i = 0; i < Shop.prototype.shopArray.length; i++) { 
    let currentShop = Shop.prototype.shopArray[i];
    const rowEmployeeElem = document.createElement('tr');
    tableEmployeesElem.appendChild(rowEmployeeElem);
    const rowEmployeeCellElem = document.createElement('th');
    rowEmployeeCellElem.textContent = currentShop.location;
    rowEmployeeElem.appendChild(rowEmployeeCellElem);

    for (let j = 0; j < currentShop.employees.length; j++) {
      const row2EmployeeCellElem = document.createElement('td');
      row2EmployeeCellElem.textContent = `${currentShop.employees[j]}`;
      rowEmployeeElem.appendChild(row2EmployeeCellElem);
    }
  }
}

renderEmployeeHeader();
renderEmployeeTable();
