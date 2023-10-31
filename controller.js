import { emptyCheck } from "./validate.js";

export let renderData = (products) => {
  let result = "";
  products.forEach((product) => {
    let { id, name, price, screen, backCamera, frontCamera } = product;
    result += `<tr><td>${id}</td>
    <td>${name}</td>
    <td>${price}</td>
    <td>${screen}</td>
    <td>${backCamera}</td>
    <td>${frontCamera}</td>
    <td>
    <button class="btn btn-success" onclick="sendToForm(${id})">Update</button>
    <button class="btn btn-danger" onclick="deletePhone(${id})">Delete</button>
    </td></tr>`;
  });
  document.querySelector("#tableBody").innerHTML = result;
};
let getEle = (id) => document.getElementById(id);
export let getFormValue = () => {
  let ma = getEle("id").value;
  let gia = getEle("price").value;
  let manHinh = getEle("screen").value;
  let camTruoc = getEle("frontCam").value;
  let camSau = getEle("backCam").value;
  let moTa = getEle("desc").value;
  let ten = getEle("name").value;
  return {
    name: ten,
    price: gia,
    screen: manHinh,
    backCamera: camSau,
    frontCamera: camTruoc,
    desc: moTa,
    id: ma,
  };
};
