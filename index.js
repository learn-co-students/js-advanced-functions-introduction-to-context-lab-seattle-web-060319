function createEmployeeRecord(arr){
  return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
  }
}

function createEmployees(employeeArr){
  return employeeArr.map(function(arr){
    return createEmployeeRecord(arr)
  })
}

function createTimeInEvent(employee, dateStamp){
  let [date, time] = dateStamp.split(' ')

  let timeInObject = {
    type: "TimeIn",
    hour: parseInt(time, 10),
    date: date
  }

  employee.timeInEvents.push(timeInObject)
  return employee;
}

function createTimeOutEvent(employee, dateStamp){
  let [date, time] = dateStamp.split(' ')

  let timeOutObject = {
    type: "TimeOut",
    hour: parseInt(time, 10),
    date: date
  }

  employee.timeOutEvents.push(timeOutObject)
  return employee;
}


function hoursWorkedOnDate(employeeRecord, dateStamp) {
    let timeIn = employeeRecord.timeInEvents.find((event) => {
        return event.date == dateStamp
    })
    let timeOut = employeeRecord.timeOutEvents.find((event) => {
        return event.date == dateStamp
    })

    let hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    return (hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour)
}

function allWagesFor(employeeRecord) {
    let allHours = employeeRecord.timeInEvents.map((day) => {
        return wagesEarnedOnDate(employeeRecord, day.date)
    })
    let rfx = (memo, value) => memo + value
    let sum = allHours.reduce(rfx)
    return sum
}

function createEmployeeRecords(arr) {
    let allNew = arr.map(newEmployeeArr => createEmployeeRecord(newEmployeeArr));
    return allNew
}

function findEmployeebyFirstName(srcArray, firstName) {
    let employee = srcArray.find((employee) => {
        return employee.firstName == firstName
    })
    return employee
}

function calculatePayroll(employeesArray) {
    let p2 = 0
    let employees_hours = employeesArray.map(record => {
        p2 += allWagesFor(record)
        console.log(p2)
        return allWagesFor(record)
    })
    let rfx = (memo, value) => memo + value
    let payroll = employees_hours.reduce(rfx)
    console.log(p2)
    return payroll
}
