import { getFormValue, renderData } from "./controller.js";
import { https } from "./server.js";
import { emptyCheck, existCheck } from "./validate.js";

function fetchData() {
  https
    .get("/phone")
    .then((res) => {
      renderData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
fetchData();
const getEle = (id) => document.getElementById(id);
window.sendToForm = (id) => {
  https
    .get(`/phone/${id}`)
    .then((res) => {
      let { name, price, screen, backCamera, frontCamera, img, desc, id } =
        res.data;
      getEle("name").value = name;
      getEle("id").value = id;
      getEle("price").value = price;
      getEle("screen").value = screen;
      getEle("name").value = name;
      getEle("backCam").value = backCamera;
      getEle("frontCam").value = frontCamera;
      getEle("desc").value = desc;

      $("#exampleModal").modal("show");
      getEle("id").disabled = true;
      getEle("updateBtn").disabled = false;
      getEle("addBtn").disabled = true;
    })
    .catch((err) => {
      console.log(err);
    });
};

window.updatePhone = () => {
  let phone = getFormValue();
  let ma = phone.id;
  console.log(phone);
  if (
    emptyCheck(phone.name, "invalidName") &&
    existCheck("name", "invalidName", phone.name)
  ) {
    https
      .put(`/phone/${ma}`, phone)
      .then((res) => {
        fetchData();

        $("#exampleModal").modal("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

window.deletePhone = (id) => {
  https
    .delete(`/phone/${id}`)
    .then((res) => {
      fetchData();
    })
    .catch((err) => {
      console.log(err);
    });
};
window.addNewPhone = () => {
  let newPhone = getFormValue();
  let { name, price, screen, backCamera, frontCamera, desc } = newPhone;
  if (
    emptyCheck(name, "invalidName") &&
    existCheck("name", "invalidName", name)
  ) {
    https
      .post("/phone", newPhone)
      .then((res) => {
        fetchData();
        $("#exampleModal").modal("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

window.addAndChange = () => {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  getEle("desc").value = "";
  getEle("updateBtn").disabled = true;
  getEle("addBtn").disabled = false;
};

getEle("search").addEventListener("keyup", (e) => {
  var search = e.target.value.toLowerCase();
  console.log(search);
  https
    .get("/phone")
    .then((res) => {
      var newArr = res.data.filter((item) => {
        if (
          item.name.toLowerCase().includes(search) ||
          item.price.toLowerCase().includes(search) ||
          item.screen.toLowerCase().includes(search) ||
          item.backCamera.toLowerCase().includes(search) ||
          item.frontCamera.toLowerCase().includes(search)
        ) {
          return item;
        }
      });
      renderData(newArr);
    })
    .catch((err) => {
      {
        console.log(err);
      }
    });
});
let myArray = [];
https.get("/phone").then((res) => {
  myArray = res.data;
});
$("th").on("click", function () {
  var column = $(this).data("column");
  var order = $(this).data("order");
  var text = $(this).html();
  text = text.substring(0, text.length - 1);
  console.log(text);
  console.log("column was clicked", column, order);
  if (order == "desc") {
    $(this).data("order", "asc");
    myArray = myArray.sort((a, b) => (a[column] > b[column] ? 1 : -1));
    text += "&#9660";
  } else {
    $(this).data("order", "desc");
    myArray = myArray.sort((a, b) => (a[column] < b[column] ? 1 : -1));
    text += "&#9650";
  }
  $(this).html(text);
  renderData(myArray);
});
