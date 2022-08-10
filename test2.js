(function () {
  const form = document.querySelector('form')
  const displayArea = document.querySelector('ul')
  const displayArea2 = document.querySelector('ol')
  const orderS = document.querySelector('select')
  const button = document.querySelectorAll("button")[0]
  const button2 = document.querySelectorAll("button")[1]
  const wishList2 = JSON.parse(localStorage.getItem('wishList2')) || []
  const priceList = JSON.parse(localStorage.getItem('priceList')) || []

var menu =["請選擇餐點","1號-大麥克","2號-雙層牛肉吉士堡","3號-安格斯黑牛堡","4號-嫩煎雞腿堡","5號-麥香雞","6號-麥克雞塊(6塊)","7號-麥克雞塊(10塊)",
          "8號-勁辣雞腿堡","9號-麥脆雞腿(2塊)","10號-麥脆雞翅(2塊)","11號-黃金起司豬排堡","12號-麥香魚","13號-千島黃金蝦堡","----極選系列----","14號-BLT安格斯黑牛堡",
          "15號-BLT辣脆雞腿堡","16號-BLT嫩煎雞腿堡","17號-BLT暈菇安格斯黑牛堡","18號-凱薩脆雞沙拉","19號-義式烤雞沙拉",];
//var price =["100元","95元","85元","95元"];

  crateMenulist()
  console.log(priceList);
  console.log(wishList2);

  function displayWishList() {
    wishList2.forEach(wish => displayWish(wish))
  }

  function displayWish(input) {
    displayArea.innerHTML += `
      <li>${input}<span>X</span></li>
    `
  }

  button.addEventListener("click",function(){
     var total= 0;
     for(i = 0 ; i < priceList.length ; i++){
      
     total += Number(priceList[i]);
     
     }
     updateLocalStorage2(total)
     displayArea2.innerHTML += `
      <li>總價:${total}元數量:${priceList.length}<span>X</span></li>
    `
 })
  
  function clearLocalSorage() {
    localStorage.removeItem("priceList");
    localStorage.removeItem("wishList2");
    location.reload();
  }


  function updateLocalStorage() {
    //store the list back to localStorage
    localStorage.setItem('wishList2', JSON.stringify(wishList2))
  }

  function updateLocalStorage2() {
    //store the list back to localStorage
    localStorage.setItem('priceList', JSON.stringify(priceList))
  }

  //display all the wish on the list from localStorage
  displayWishList()

  //add event listener to form
  form.addEventListener('submit', event => {
    //prevent auto send the form
    event.preventDefault()
    //get input value
    const input = document.querySelector('input[type="text"]')
    const input3 = document.querySelector('input[type="number"]')
    //get name value
    const input2 = document.querySelector('select')
    const allvalue = [input.value + "-"+ input2.value  + ":" + input3.value + "元"]  ;
    //add new wish to the list
    displayWish(allvalue)
    //add new wish to the list
    wishList2.push(allvalue)
    priceList.push(input3.value)
    //add the wish to localStorage
    updateLocalStorage(allvalue)
    const varfile=newFile([wishList2],"helloworld.txt",{type:"text/plain;charset=utf-8"});
    saveAs(file);
    //clear up the input
    console.log(priceList);
    console.log(wishList2);
    input.value = ''
    input3.value = ''
  })

  button2.addEventListener("click",clearLocalSorage);


  displayArea.addEventListener('click', event => {
    if (event.target.tagName !== 'SPAN') { return }
    const li = event.target.parentElement
    li.remove()
    wishList2.splice(wishList2.indexOf(li.textContent.slice(0, -1)), 1)
    priceList.splice(priceList.indexOf(li.textContent.slice(0, -1)), 1)
    updateLocalStorage()
    updateLocalStorage2()
  })

  displayArea2.addEventListener('click', event => {
    if (event.target.tagName !== 'SPAN') { return }
    const li = event.target.parentElement
    li.remove()
  })


  function crateMenulist(){
  for(i = 0 ;i < menu.length; i++){
   var op = document.createElement("option");
   op.appendChild(document.createTextNode(menu[i]));
   op.setAttribute("id","opm" + i );
   orderS.appendChild(op);
   

  }
}

  

})()


