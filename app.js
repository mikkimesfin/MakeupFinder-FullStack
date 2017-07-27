$(document).ready(() => {
  $('.modal').modal()
})

$('#welcomeButton').click(function() {
  $.get('https://rocky-beach-86199.herokuapp.com/inventory')
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        $('#cards').append(`
	          <div id="card${data[i].id}" class="col s12 m6">
	            <div class="card blue-grey darken-1">
	              <div class="card-content white-text">
	                <span id="card${data[i].id}" class="card-title">${data[i].type}</span>
	                <p id="brand${data[i].id}">Type: ${data[i].brand}</p>
	                <p id="price${data[i].id}">Price: ${data[i].price}</p>
	                <p>ID: ${data[i].id} </p>
	              </div>
	            </div>
	          </div>
	      `)
      }
    })
  document.getElementById('welcome').style.display = 'none'
  document.getElementById('cards').style.display = 'block'
})

$('#specificButton').click(() => {
  var id = $('#searchBox').val()
  $.get(`https://rocky-beach-86199.herokuapp.com/inventory/${id}`).then((data) => {
    if (data.length != 0) {
      $('#cards').append(`
	          <div id="card${data[0].id}" class="col s12 m6">
	            <div class="card blue - grey darken-1">
	              <div class="card-content white-text">
	                <span class="card-title">${data[0].type}</span>
	                <p>Brand: ${data[0].brand}</p>
	                <p>Price: ${data[0].price}</p>
	                <p>ID: ${data[0].id} </p>
	              </div>
	            </div>
	          </div>
	      `)
      document.getElementById('welcome').style.display = 'none'
      document.getElementById('cards').style.display = 'block'
    } else {
      alert('No entries with that ID')
    }
  })
})


$('#addCard').click(function() {
  $('#modal1').modal('open')
})


$('#formSubmit').click(function() {
  var type = $('#formType').val()
  var brand = $('#formBrand').val()
  var price = $('#formPrice').val()
  //make into an object and send as data
  var postData = {
    type: type,
    brand: brand,
    price: price
  }


  if (type && brand && price) {
    $.post('https://rocky-beach-86199.herokuapp.com/inventory', postData)
    .then((id) => {
      $.get(`https://rocky-beach-86199.herokuapp.com/inventory/${id}`).then((data) => {
        $('#cards').append(`
	            <div id="card${data[0].id}" class="col s12 m6">
	              <div class="card blue-grey darken-1">
	                <div class="card-content white-text">
	                  <span class="card-title">${data[0].type}</span>
	                  <p>Brand: ${data[0].brand}</p>
	                  <p>Price: ${data[0].price}</p>
	                  <p>ID: ${data[0].id} </p>
	                </div>
	              </div>
	            </div>
	        `)
      })
    }).catch((data) => {
      alert(data.responseJSON.message)
    })
  } else {
    alert('Please don\'t leave any fields blank.')
  }
})


$('#editCard').click(function() {
  $('#modal2').modal('open')
})


$('#formSubmit2').click(function() {
  var id = $('#formId2').val()
  var type = $('#formType2').val()
  var brand = $('#formBrand2').val()
  var price = $('#formPrice2').val()
  var putData = {
    type: type,
    brand: brand,
    price: price
  }


  if (id && type && brand && price) {
    $.ajax({
      url: `https://rocky-beach-86199.herokuapp.com/inventory/${id}`,
      type: 'PUT',
      data: putData
    }).then((data) => {
      $(`#card${id}`).remove()
      $('#cards').append(`
	          <div id="card${data[0].id}" class="col s12 m6">
	            <div class="card blue-grey darken-1">
	              <div class="card-content white-text">
	                <span class="card-title">${data[0].type}</span>
	                <p>Brand: ${data[0].brand}</p>
	                <p>Price: ${data[0].price}</p>
	                <p>ID: ${data[0].id} </p>
	              </div>
	            </div>
	          </div>
	      `)
    })
  } else {
    alert('Please don\'t leave any fields blank.')
  }
})


$('#deleteCard').click(function() {
  $('#modal3').modal('open')
})


$('#formSubmit3').click(function() {
  var id = $('#formId3').val()
  if (id) {
    $.ajax({
      url: `https://rocky-beach-86199.herokuapp.com/inventory/${id}`,
      type: 'DELETE'
    })
    $(`#card${id}`).remove()
  } else {
    alert('Please enter an ID')
  }
})
