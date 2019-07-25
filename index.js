// Your code here
// const argument = [firstName, familyName, title, payPerHour];
function createEmployeeRecord(argument) {
  return {
    firstName: argument[0],
    familyName: argument[1],
    title: argument[2],
    payPerHour: argument[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployees(array) {
  return array.map(arr => createEmployeeRecord(arr));
}

function createTimeInEvent(recordObject, dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  let timeInEvent = {
    type: 'TimeIn',
    hour: Number(hour),
    date: date
  };
  recordObject.timeInEvents.push(timeInEvent);
  return recordObject;
}

function createTimeOutEvent(recordObject, dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  let timeOutEvent = {
    type: 'TimeOut',
    hour: Number(hour),
    date: date
  };
  recordObject.timeOutEvents.push(timeOutEvent);
  return recordObject;
}

function hoursWorkedOnDate(recordObject, dateStamp) {
  const timeInHour = recordObject.timeInEvents.find(timeIn => timeIn.date == dateStamp).hour;
  const timeOutHour = recordObject.timeOutEvents.find(timeOut => timeOut.date == dateStamp).hour;
  return (timeOutHour - timeInHour)/100;
}

function wagesEarnedOnDate(recordObject, dateStamp) {
  return hoursWorkedOnDate(recordObject, dateStamp) * recordObject.payPerHour;
}

function allWagesFor(recordObject) {
  return recordObject.timeInEvents.map(record => wagesEarnedOnDate(recordObject, record.date)).reduce((a, b) => a + b);
}

function createEmployeeRecords(array) {
  return array.map(record => createEmployeeRecord(record));
}

function findEmployeebyFirstName(srcArray, firstName) {
  return srcArray.find(record => record.firstName == firstName);
}

function calculatePayroll(array) {
  return array.map(employeeRecord => employeeRecord.timeInEvents.map(record => wagesEarnedOnDate(employeeRecord, record.date)).reduce((a, b) => a + b)).reduce((a, b) => a + b);
}