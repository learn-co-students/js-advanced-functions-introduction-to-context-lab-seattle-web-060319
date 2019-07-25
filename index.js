function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

let createEmployees = function (employees) {
  return employees.map(function (employee) {
    return createEmployeeRecord(employee)
  })
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour),
    date: date
  })
  return employee
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour),
    date: date
  })
  return employee
}

let hoursWorkedOnDate = function (employee, soughtDate) {
  let inEvent = employee.timeInEvents.find(function (d) {
    return d.date === soughtDate
  })

  let outEvent = employee.timeOutEvents.find(function (d) {
    return d.date === soughtDate
  })

  return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, soughtDate) {
  let totalWage = hoursWorkedOnDate(employee, soughtDate) * employee.payPerHour
  let formattedWage = parseInt(totalWage)
  return formattedWage
}

let allWagesFor = function (employee) {
  let eligibleDates = employee.timeInEvents.map(function (d) {
    return d.date
  })

  let payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(employee, d)
  }, 0)

  return payable
}

let createEmployeeRecords = function (employees) {
  return employees.map(function (employee) {
    return createEmployeeRecord(employee)
  })
}

let findEmployeebyFirstName = function (employees, firstName) {
  return employees.find(function (employee) {
    return employee.firstName === firstName
  })
}

let calculatePayroll = function (employees) {
  return employees.reduce(function (memo, employee) {
    return memo + allWagesFor(employee)
  }, 0)
}