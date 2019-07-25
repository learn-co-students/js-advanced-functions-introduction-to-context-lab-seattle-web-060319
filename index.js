// Your code here
let createEmployeeRecord = (array) => {
    let [firstName, familyName, title, payPerHour] = array
    let employee = Object.assign({}, {firstName}, {familyName}, {title}, {payPerHour}, {timeInEvents: []}, {timeOutEvents: []})
    return employee
}

let createEmployees = (arrayOfArrays) => {
    let arrayOfObjects = arrayOfArrays.map(array => createEmployeeRecord(array))
    return arrayOfObjects
}

let createTimeInEvent = (employee, dateStamp) => {
    let date = dateStamp.split(" ")[0]
    let hour = dateStamp.split(" ")[1]
    hour = parseInt(hour)
    let timeObject = Object.assign({}, {date}, {hour}, {type: "TimeIn"})
    employee.timeInEvents.push(timeObject)
    return employee
}

let createTimeOutEvent = (employee, dateStamp) => {
    let date = dateStamp.split(" ")[0]
    let hour = dateStamp.split(" ")[1]
    hour = parseInt(hour)
    let timeObject = Object.assign({}, {date}, {hour}, {type: "TimeOut"})
    employee.timeOutEvents.push(timeObject)
    return employee
}

let hoursWorkedOnDate = (employee, date) => {
    let timeIn = employee.timeInEvents.find(event => event.date === date)
    let timeOut = employee.timeOutEvents.find(event => event.date === date)
    let timeWorked = (timeOut.hour - timeIn.hour)/100
    return timeWorked
}

let wagesEarnedOnDate = (employee, date) => {
    let hours = hoursWorkedOnDate(employee, date)
    return employee.payPerHour * hours
}

let allWagesFor = (employee) => {
    let dates = employee.timeInEvents.map(event => event.date)

    let pay = dates.reduce(function(time, timeDate){
        return time + wagesEarnedOnDate(employee, timeDate)
    }, 0)

    return pay
}

let createEmployeeRecords = (employees) => {
    let arrayOfObjects = employees.map((employee) => createEmployeeRecord(employee))
    return arrayOfObjects
}

let findEmployeebyFirstName = (employees, firstName) => {
    return employees.find((employee) => employee.firstName === firstName)
}

let calculatePayroll = (employees) => {
    // return employees.reduce(function(memo, rec){
    //     return memo + allWagesFor(rec)
    // }, 0)
    let payroll = 0
    employees.forEach((employee) => payroll = payroll + allWagesFor(employee))
    return payroll
}