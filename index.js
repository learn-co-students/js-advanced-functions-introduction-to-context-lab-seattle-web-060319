// Your code here
function createEmployeeRecord(arr) {
    const [firstName, familyName, title, payPerHour] = arr
    const newRecord = Object.assign({}, { firstName }, { familyName }, { title }, { payPerHour }, { timeInEvents: [] }, { timeOutEvents: [] })
    return newRecord
}

function createEmployees(arr) {
    const newEmployees = arr.map(createEmployeeRecord)
    return newEmployees
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    let newObj = {
        type: "TimeIn",
        hour: Number(hour),
        date: date
    }
    employeeRecord.timeInEvents.push(newObj)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    let newObj = {
        type: "TimeOut",
        hour: Number(hour),
        date: date
    }
    employeeRecord.timeOutEvents.push(newObj)
    return employeeRecord
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
    let employees_hours = employeesArray.map(record => allWagesFor(record))
    let rfx = (memo, value) => memo + value
    let payroll = employees_hours.reduce(rfx)
    return payroll
}