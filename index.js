// Your code here
let createEmployeeRecord = function (array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

let createEmployees = function (arrayOfArrays) {
  return arrayOfArrays.map(function (array) {
    return createEmployeeRecord(array);
  });
};

let createTimeInEvent = function (employeeRecord, dateStamp) {
      let [date, hour] = dateStamp.split(' ');
      let timeInEvent = {
          type: 'TimeIn',
          hour: Number(hour),
          date: date,
        };
      employeeRecord.timeInEvents.push(timeInEvent);
      return employeeRecord;
    };

let createTimeOutEvent = function (employeeRecord, dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  let timeOutEvent = {
    type: 'TimeOut',
    hour: Number(hour),
    date: date,
  };
  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
};

let hoursWorkedOnDate = function (employeeRecord, date) {
  let employeeStartTime = employeeRecord.timeInEvents.find(timeInEvent => timeInEvent.date == date).hour;
  let employeeEndTime = employeeRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date == date).hour;
  return (employeeEndTime - employeeStartTime) / 100;
};

let wagesEarnedOnDate = function (employeeRecord, date) {
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

let allWagesFor = function (employeeRecord) {
  return employeeRecord.timeInEvents.map(record => wagesEarnedOnDate(employeeRecord, record.date)).reduce((a, b) => a + b);
};

let createEmployeeRecords = function (arrayOfArrays) {
  return arrayOfArrays.map(array => createEmployeeRecord(array));
};

let findEmployeebyFirstName = function (arrayOfRecords, firstName) {
  return arrayOfRecords.find(record => record.firstName == firstName);
};

function calculatePayroll(array) {
  return array.map(employeeRecord => employeeRecord.timeInEvents.map(record => wagesEarnedOnDate(employeeRecord, record.date)).reduce((a, b) => a + b)).reduce((a, b) => a + b);
};
