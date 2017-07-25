$(document).ready(function(){
    // $("button").click(function(){
        $.get("https://rocky-beach-86199.herokuapp.com/")
        .then(getMakeup)
// })
})
// function getMakeup(data) {
//   for (var i = 0; i < data.length; i++) {
//   $(".inventory").append(`<li>${data[i].price}-${data[i].brand}-${data[i].type}</li>`)
// }
// }
function getMakeup(data) {
  for (var i = 0; i < data.length; i++) {
  $("#inventory").append(`<div class="col-sm-6 col-md-4">
    <div class="thumbnail">
      <img src="https://cdn2.tgdd.vn/Products/Images/1784/73132/YouCamMakeup-MakeoverStudio-icon.png" alt="makeup">
      <div class="caption">
        <h3>${data[i].type}</h3>
        <p> Price:$${data[i].price}</p><p>Brand:${data[i].brand}</p>
        <p><a href="#" class="btn btn-primary" role="button">Add</a> <a href="#" class="btn btn-default" role="button">Delete</a></p>
      </div>
    </div>
  </div>`)
}
}
