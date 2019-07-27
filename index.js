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

function createEmployees(array) {
  return array.map(function(arr) {
    return createEmployeeRecord(arr);
  });
}

function createTimeInEvent(employeeRecord, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  let timeInEvent = {
    type: "TimeIn",
    date: date,
    hour: Number(hour)
  };
  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  let timeOutEvent = {
    type: "TimeOut",
    date: date,
    hour: Number(hour)
  };
  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
  let startHour = employeeRecord.timeInEvents.find(function(element) {
    return element.date === dateStamp;
  });

  let endHour = employeeRecord.timeOutEvents.find(function(element) {
    return element.date === dateStamp;
  });

  return (endHour.hour - startHour.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
  return (
    employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, dateStamp)
  );
}

function allWagesFor(employeeRecord) {
  let dates = employeeRecord.timeInEvents.map(function(element) {
    return element.date;
  });

  let pay = dates.reduce(function(memo, i) {
    return memo + wagesEarnedOnDate(employeeRecord, i);
  }, 0);

  return pay;
}

function createEmployeeRecords(array) {
  let newArr = [];
  newArr.map(function(array) {
    return array;
  });
}

function findEmployeeFirstName(array, firstName) {
  return array.find(function(element) {
    element.firstName === firstName;
  });
}
