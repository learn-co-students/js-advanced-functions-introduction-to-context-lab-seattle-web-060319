// Your code here
function createEmployeeRecord(arg){
    return {
    firstName : arg[0],
    familyName : arg[1],
    title : arg[2],
    payPerHour : arg[3],
    timeInEvents : [],
    timeOutEvents : [],
    }
}

function createEmployees(array){
    return array.map(arr => (createEmployeeRecord(arr)))
}

function createTimeInEvent(recorObj, dateStamp){
    let [date, hour] = dateStamp.split(' ');
    let timeInEvent = {
        type : 'TimeIn',
        date : date,
        hour : Number(hour)
    };
    recorObj.timeInEvents.push(timeInEvent)
    return recorObj
}

function createTimeOutEvent(recorObj, dateStamp){
    let [date, hour] = dateStamp.split(' ');
    let timeOutEvent = {
        type : 'TimeOut',
        date : date,
        hour : Number(hour)
    };
    recorObj.timeOutEvents.push(timeOutEvent)
    return recorObj
}
function hoursWorkedOnDate(recorObj, dateStamp){
    const TimeIn =  recorObj.timeInEvents.find(timeIn => timeIn.date == dateStamp).hour
    const TimeOut =  recorObj.timeOutEvents.find(timeOut => timeOut.date == dateStamp).hour
    return (TimeIn - TimeOut)/100
}
function wagesEarnedOnDate(recorObj, dateStamp){
    return hoursWorkedOnDate(recordObj, dateStamp) * recordObj.payPerHour;
}

function allWagesFor(recordObj) {
  return recordObj.timeInEvents.map(record => wagesEarnedOnDate(recordObj, record.date)).reduce((a, b) => a + b);
}