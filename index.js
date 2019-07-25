function createEmployeeRecord(arr) {
    let record = {}
    record.firstName = arr[0]
    record.familyName = arr[1]
    record.title = arr[2]
    record.payPerHour = arr[3]
    record.timeInEvents = []
    record.timeOutEvents = []

    return record
}

function createEmployees(arr) {
    let newEmployee = arr.map(employee => createEmployeeRecord(employee))
    return newEmployee
}

function createTimeInEvent(obj, str) {
    let time = str.split(' ')
    const hour = parseInt(time[1])
    const date = time [0]
    obj.timeInEvents.push({type: "TimeIn", hour: hour, date: date })
    return obj
}

function createTimeOutEvent(obj, str) {
    let time = str.split(' ');
    const hour = parseInt([time[1]])
    const date = time[0]
    obj.timeOutEvents.push({type: "TimeOut", hour: hour, date: date})
    return obj
}

function hoursWorkedOnDate(obj, date) {
    let timeIn = obj.timeInEvents.find(obj => obj.date === date)
    let timeOut = obj.timeOutEvents.find(obj => obj.date === date)
    let hoursWorked = (timeOut.hour - timeIn.hour)/100
    return hoursWorked
}

function wagesEarnedOnDate(obj, date) {
    let hours = hoursWorkedOnDate(obj,date) 
    let pay = hours * obj.payPerHour
    return pay
    
}

allWagesFor = (employeeObj) => {
    let dateArr = []
    employeeObj.timeInEvents.forEach(event => dateArr.push(event.date))

    let wagesArr = []
    dateArr.forEach(date => wagesArr.push(wagesEarnedOnDate(employeeObj, date)))

    let reducer = (acc, curr) => acc + curr
    let totalWages = wagesArr.reduce(reducer)
    return totalWages 
}

function calculatePayroll(arr) {
    let rawWages = arr.map(employee => allWagesFor(employee))

    let reducer = (acc, curr) => acc + curr
    let totalWages = rawWages.reduce(reducer)
    return totalWages
}

function findEmployeebyFirstName(arr, firstName) {
        let employee = arr.find(employee => {
            return employee.firstName == firstName
        })

      return employee
    }


function createEmployeeRecords(arr) {
    let newEmployees = []
    arr.forEach(employee => newEmployees.push(createEmployeeRecord(employee)))
    return newEmployees
}
