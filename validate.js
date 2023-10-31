import { https } from "./server.js";

export let emptyCheck = (val, id) => {
  if (val == "") {
    document.getElementById(id).innerHTML = "Không được để trống";
    return false;
  } else {
    document.getElementById(id).innerHTML = "";
    return true;
  }
};
let array = [];
https.get("/phone").then((res) => {
  array = res.data;
});
export let existCheck = (val, id, valCheck) => {
  let objectFind = array.find((item) => item[val] === valCheck);
  if (objectFind != undefined) {
    document.getElementById(id).innerHTML = "Giá trị đã tồn tại";
    return false;
  } else {
    document.getElementById(id).innerHTML = "";
    return true;
  }
};
