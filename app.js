$(document).ready(function(){
        $.get(baseURL)
        .then(getMakeup)
})
var baseURL = 'http://localhost:8080/'
var otherURL = 'https://rocky-beach-86199.herokuapp.com'

function getMakeup(data) {
  for (var i = 0; i < data.length; i++) {
  $("#inventory").append(`<div class="col-sm-6 col-md-4">
    <div class="thumbnail">
      <img src="https://placeimg.com/640/480/people" alt="makeup">
      <div class="caption">
        <h3>${data[i].type}</h3>
        <p> Price:$${data[i].price}</p><p>Brand:${data[i].brand}</p>
        <p><a href="#" class="btn btn-primary" role="button">Add</a> <a href="#" class="btn btn-default" role="button">Delete</a></p>
      </div>
    </div>
  </div>`)
}
}

$("button").click(function(event){
  event.preventDefault()
  var brandVal = $('#brand').val()
  var typeVal = $('#type').val()
  var priceVal = $('#price').val()
  //make into an object to send as data
  var resourceObject = {
    brand: brandVal,
    type: typeVal,
    price: priceVal
  }
  //posting
  $.post(baseURL, resourceObject)
    .then((data) =>
    data.json()
  )
})
