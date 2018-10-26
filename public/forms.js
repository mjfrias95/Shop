
function editBut(){
   

    $("#updateProductForm").show();
    $("#addProductForm").hide();

}
function closeBut(){
  

    $("#updateProductForm").hide();
    $("#addProductForm").show();

}

document.getElementById("updateedit").addEventListener("click", function(event){
    event.preventDefault()
});