const crypto = require("crypto");
const moment = require("moment");

const generateFileName = (categoryName, fileFullName) => {
  const nameArr = [];
  const getTimestamp = new Date().getTime();
  const date = moment().format("YYMMDD").toString();
  const fileName = fileNameObj(fileFullName);

  nameArr.push(categoryName.toLowerCase());
  nameArr.push(date);
  nameArr.push(stringHash(getTimestamp, 6));
  nameArr.push(stringHash(fileName.name, 16));

  return `${nameArr.join("-")}.${fileName.type}`;
};

const stringHash = (string, length) => {
  const saltLength = 8;
  const salt = crypto
    .randomBytes(Math.ceil(saltLength / 2))
    .toString("hex")
    .slice(0, saltLength);
  const hash = crypto
    .createHmac("sha256", salt)
    .update(string.toString())
    .digest("hex");

  return hash.slice(0, length);
};

const fileNameObj = (fileFullName) => {
  const tempArr = fileFullName.split(".");
  const fileType = tempArr[tempArr.length - 1];
  tempArr.pop();
  const fileName = tempArr.join("");

  return {
    name: fileName,
    type: fileType.toLowerCase(),
  };
};

module.exports = generateFileName;
