
var source   = $("#order-table").html();
var template = Handlebars.compile(source);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBMfwpDok1RAnBG-8S5EhifyP7UgPnkxM8",
  authDomain: "shutterstorm-60b9f.firebaseapp.com",
  databaseURL: "https://shutterstorm-60b9f.firebaseio.com",
  storageBucket: "shutterstorm-60b9f.appspot.com",
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
if (user) {

} else {

}
});

var database = firebase.database();


var orders = database.ref('orders');
var numberOfOrders;
orders.on('value',function(snapshot){

    var data = snapshot.val();
    numberOfOrders = Object.keys(data).length;
    console.log(numberOfOrders);

    $('#orders').empty();
    $.each(data, function(i, val){
      console.log(val);
      context={number:i,name:val.name,eventCity:val.eventCity,address:val.address,phoneNumber:val.phone,email:val.email,digitalDropboxLink:val.dropboxLink,trackingNumber:val.trackingNumber};
      html = template(context);
      $('#orders').append(html);
    });

    $('.delete-btn').click(function(){
        deleteOrder($(this).data().orderNumber);
    });
    $('.edit-button').click(function(){
      displayEditForm ($(this).data().orderNumber);
    });
});

function deleteOrder (orderToRemove){
  console.log(orderToRemove);
  confirm('This orders information will be permanently deleted, do you wish to continue?');
  database.ref('orders/' + orderToRemove).remove();
}

function addOrder (orderId){
    confirm('Are you Sure you want to add this order?');
  var orderListRef = database.ref('orders/');
  var newOrderRef= orderListRef.push();
    newOrderRef.set({
    name:$('#customer-name').val(),
    eventCity:$('#event-city').val(),
    address:$('#address').val(),
    phone:$('#phone-number').val(),
    email:$('#email').val(),
    trackingNumber:$('#tracking-numbers').val(),
    dropboxLink:$('#digital-dropbox').val()
  });
  document.getElementById('new-order-form').reset();
  $('#new-order-modal').modal('hide');
}
$('#new-order-form').submit(function(event){
  event.preventDefault();
  addOrder(numberOfOrders);
});

function displayEditForm (selectedOrderNum){
var orderToEdit = database.ref('orders/' + selectedOrderNum);
orderToEdit.once('value').then(function (snapshot){
  var data = snapshot.val();
  console.log(data);

  var orderToEditData = {name:data.name,eventCity:data.eventCity,address:data.address,phoneNumber:data.phone,email:data.email,digitalDropboxLink:data.dropboxLink,trackingNumber:data.trackingNumber};
  var editFormTemplate = Handlebars.compile($('#edit-order-form').html());
  var editForm = editFormTemplate(orderToEditData);
  $('#EditOrder').html(editForm);

  $('#edit-form').submit(function(event){
    event.preventDefault();
    editOrder(orderToEdit);
  });
});

}
function editOrder(order){
  console.log('edit button clicked');
  confirm('Do you want to update this order?');
  var newOrderData = {
  name:$('#customer-name').val(),
  eventCity:$('#event-city').val(),
  address:$('#address').val(),
  phone:$('#phone-number').val(),
  email:$('#email').val(),
  trackingNumber:$('#tracking-numbers').val(),
  dropboxLink:$('#digital-dropbox').val()};

  order.update(newOrderData);
  console.log('updated');
}

// $.fn.serializeObject = function() {
//   return this.serializeArray().reduce(function(acum, i) {
//     acum[i.name] = i.value;
//     return acum;
//   }, {});
// };

console.log('database js is working');
