let index=0;
let allProduct = [];
 async function getData(){ 
    try {
            let response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) {
                throw new Error("Http Problem" + response.status)
            }
            let data = await response.json()
            allProduct = data;
            showData() 
    } catch (error) {
        console.log(error);  
    }
}
getData()
function showData(){
let cartona = ''
allProduct.forEach((product)=>{
  cartona +=  ` <div class="col-md-3 ">
             <div class="content position-relative">
                <img src="${product.image}" class="w-100 h-100" alt="">
                <div class="caption text-center bg-white text-black position-absolute top-50 ">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                </div>
             </div>
       </div>`
})
document.getElementById("row").innerHTML = cartona
}
const lightContainer = document.querySelector(".light-container")
const closeIcone = document.getElementById("close-imge")
const imgwBox = document.querySelector(".imge-box")
const prevIcon = document.getElementById("prev")
const nextIcon = document.getElementById("next")
const rowData = document.getElementById("row")

function showImge(){
 imgwBox.style.backgroundImage = `url(${allProduct[index].image})`
}
function openSlid(){
    lightContainer.classList.remove("d-none")
    showImge()
}
function closeSlide(){
   lightContainer.classList.add("d-none")
}
function Slide(step){
    index += step
    if (index == allProduct.length) {
        index = 0;
    }
    else if(index < 0){
        index = allProduct.length-1;
    }
   showImge()
}
rowData.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        index = allProduct.findIndex(p => p.image === e.target.getAttribute("src"));
        openSlid();
    }
});
closeIcone.addEventListener("click" , ()=>{
 closeSlide(1)
})
nextIcon.addEventListener("click",()=>{
 Slide(1)
     
})
prevIcon.addEventListener("click",()=>{
     Slide(-1)
})
document.addEventListener("keydown" , (e)=>{
if( !lightContainer.classList.contains("d-none"))
    if (e.key == "ArrowLeft") {
    Slide(-1)
}
else if(e.key == "ArrowRight"){
    Slide(1)
}
else if(e.key == "Escape"){
    closeSlide()
}
})
document.addEventListener("click",(e)=>{
    if (e.target == lightContainer) {
        closeSlide()
    }
})
