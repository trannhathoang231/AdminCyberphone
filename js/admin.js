import SanPham from "./SanPham.js";
import SpService from "./SanPhamServices.js";

const spService = new SpService();

let hienThiTable = (mangSP) => {
  let content = "";
  for (let index in mangSP) {
    let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
      mangSP[index];
    content += `
       <tr>
           <td>${id}</td>
           <td>${name}</td>
           <td>${price}</td>
           <td>${screen}</td>
           <td>${backCamera}</td>
           <td>${frontCamera}</td>
           <td>${img}</td>
           <td>${desc}</td>
           <td>${type}</td>
           <td>
               <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="xemChiTiet('${id}')">Xem</button>
               <button onclick="deleteProduct('${id}')" class="btn btn-danger">Xóa</button>
           </td>
       </tr>
   `;
  }

  document.querySelector("#tblDanhSachSP").innerHTML = content;
};

let getProductList = () => {
  //Pending
  let promise = spService.getListSp();

  promise.then((result) => {
    // resolve
    hienThiTable(result.data);
  });
  promise.catch(function (error) {
    // Reject
  });
};
getProductList();


let getFormValue = () => {
  let arrControl = document.querySelectorAll("#myModal .form-control");
  let formValue = {};
  for (let i = 0; i < arrControl.length; i++) {
    let { id, value } = arrControl[i];
    formValue = { ...formValue, [id]: value };
  }
  return formValue;
};
getFormValue();


document.querySelector("#btnThemSP").addEventListener("click", () => {
  document.querySelector("#myModal .modal-footer").innerHTML = `
      <button class="btn btn-success" onclick="addProduct()">Thêm</button>
  `;
  let controlELE = document.querySelectorAll("#myModal .form-control");
  for (let i = 0; i < controlELE.length; i++) {
    controlELE[i].value = "";
  }
});


let addProduct = () => {
  let formValue = getFormValue();

  let { backCamera, frontCamera, price, img, type, screen, desc, name } =
    formValue;
  let sp = new SanPham(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  let promise = spService.addSpAPI(sp);

  promise
    .then((result) => {
      getProductList();
      document.querySelector("#myModal .close").click();
    })
    .catch((error) => {
    });
};
window.addProduct = addProduct;

let deleteProduct = (id) => {
  let promise = spService.deleteSp(id);

  promise
    .then((result) => {
      getProductList();
    })
    .catch(function (error) {
    });
};
window.deleteProduct = deleteProduct;

let xemChiTiet = (id) => {
  let promise = spService.getSpDetail(id);

  promise
    .then((result) => {
      for (const key in result.data) {
        if (document.querySelector(`#${key}`) != null) {
          document.querySelector(`#${key}`).value = result.data[key];
        }
      }

      document.querySelector("#myModal .modal-footer").innerHTML = `
      <button class="btn btn-success" onclick="capNhat('${result.data.id}')">Cập Nhật</button>
    `;
    })
    .catch((error) => {

    });
};
window.xemChiTiet = xemChiTiet;

let capNhat = () => {
  let formValue = getFormValue();
  let { id, backCamera, frontCamera, price, img, type, screen, desc, name } =
    formValue;

  let sp = new SanPham(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  let promise = spService.updateSpAPI(id, sp);

  promise
    .then((result) => {
      getProductList();
      document.querySelector("#myModal .close").click();
    })
    .catch(function (error) {

    });
};
window.capNhat = capNhat;
