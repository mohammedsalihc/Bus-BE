const moment = require("moment");

const getCurrentDateandTime = () => {
  return moment().utc();
};

const getCurrentDateandTimeinUnix = () => {
  return moment().utc().unix();
};

const dateToUtc = (date) => {
  return moment(date).utc();
};

const EndofDay = (date) => {
  return date ? moment(date).endOf('day').utc() : null;
};

const startOfDay = (date) => {
  return date ? moment(date).startOf('day').utc() : null;
};

module.exports = {
  getCurrentDateandTime,
  getCurrentDateandTimeinUnix,
  dateToUtc,
  EndofDay,
  startOfDay,
};
