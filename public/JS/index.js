let invoice_data;
let senderAddress;
let clientAddress;
var displayImage = document.getElementById("sun");
var sunImg = "Assets/icon-sun.svg";
var moonImg = "Assets/icon-moon.svg";
let themeVar = 0;
let theme = document.getElementById("displayMode");
let item = document.getElementById('sun');
function changeTheme() 
{
  if (themeVar == 1) 
  {
       theme.attributes.href.value = "CSS/index.css";
        item.attributes.src.value = moonImg;
        themeVar = 0;
  }
  else
  {
        theme.attributes.href.value = "CSS/index2.css";
        item.attributes.src.value = sunImg;
        themeVar++;
  }
  localStorage.setItem('themeVar',themeVar);
}
window.addEventListener('load',()=>{
 let themeLocal  = localStorage.getItem('themeVar');
 console.log(themeLocal)
 if(themeLocal == 0){
        theme.attributes.href.value = "CSS/index.css";
        item.attributes.src.value = moonImg;
        themeVar = 0;
 }
  else{
    theme.attributes.href.value = "CSS/index2.css";
    item.attributes.src.value = sunImg;
    themeVar++;
  }
})
const getValue = (ele) => {
 window.location.href= `/status?id=${ele.getAttribute('data-value')}`
}
let i = 0;
const saveInvoice  = ()=>{
  window.location.reload();
}
const partialContainerLoad = () => {
  let new_invoice_whole_container = document.getElementById(
    "new_invoice_whole_container"
  );
  new_invoice_whole_container.style.marginLeft = "2150px";
};
const createItem = () =>{
  let navibar = document.getElementById('navi_bar');
  let newinvoicewholecontainer = document.getElementById('new_invoice_container');
  console.log(newinvoicewholecontainer)
  let item_list = document.getElementsByClassName("item_list")[0];
  console.log(item_list);
  let item = ` <div class="item1"><input type="text" name="name"/><input type="number" name="quantity"/><input type="number" name="price"/><input type="number" name="total"/><img src="Assets/icon-delete.svg"onclick="deleteItem(this)"/></div>`;
  item_list.insertAdjacentHTML("beforeend", item);
};

const deleteItem = (elem) => {
  $(elem).parent().remove();
};
const discardInvoice = () => {
  let new_invoice_whole_container = document.getElementById(
    "new_invoice_whole_container"
  );
  new_invoice_whole_container.style.marginLeft = "-2150px";
};
//#FF8F00
//server js code for need
// let keyvalues = [];
//    console.log(json[0])
//  json.forEach(element=>{
// for(let i =0 ; i < keysArray.length;i++){
//     if( i >= 0 || i <= 7|| i == 11){
//         keyvalues.push(element[keysArray[i]])
//     }
//     else{
//         keyvalues.push(element[keysArray[i]])
//     }

// }

//     let sql = `insert into invoiceDataTable (${keysArray[0]},${keysArray[1]},${keysArray[2]},${keysArray[3]},${keysArray[4]},${keysArray[5]},${keysArray[6]},${keysArray[7]},senderAddrerss,${keysArray[9]},${keysArray[10]},${keysArray[11]}) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
//    let keyvalues = [element.id,element.createdAt,element.paymentDue,element.description,element.paymentTerms,element.clientName,element.clientEmail,element.status,JSON.stringify(element.senderAddress),JSON.stringify(element.clientAddress),JSON.stringify(element.items),element.total];
//         connection.query(sql,keyvalues,(err,result)=>{
//          if(err){
//              console.log(err)
//              console.log(keyvalues)
//          }
//          else{
//              console.log(result)
//          }
//       })
//})
//  const renderInvoiceData = ((invoice_data)=>{
//   invoice_data.forEach(element => {
//     let date = element.paymentDue.replaceAll('-'," ").split(" ").reverse().join(" ");
//   // invoice_list_div.innerHTML +=
//   });
//    });
/* fetch('/server',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(invoice_element)
  }).then(res =>{
    res.json();
  }).then(data=>{
    console.log(data)
  }).catch((err)=>{
    console.log(err);
  })*/
