$(document).ready(function() {
  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/users';

  if(location.pathname === '/') {
    $.ajax({
      url: baseUrl,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        var tbody = $('#users');
        data.users.forEach(function(user) {
          var firstName = user.first_name;
          var lastName = user.last_name;
          var phoneNumber = user.phone_number;
          var row = '<tr><td>' + firstName + '</td>';
          row += '<td>' + lastName + '</td>';
          row += '<td>' + phoneNumber + '</td>';
          row += '<td><button data-id="' + user.id + '"class="btn">Show</button></td></tr>';
          tbody.append(row);
        });
      },
      error: function(error) {
        console.log(error);
      }
    });

    $(document).on('click', '.btn', function () {
      var id = this.dataset.id;
      location.href = '/users/' + id;
    });
  }

  var reg = /\/users\/\d+/;
  if(location.pathname.match(reg)) {
    var panel = $('#panel');
    var id = panel.data('id');
    $.ajax({
      url: baseUrl + '/' + id,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        var user = data.user;
        panel.children('#heading').html();
        var list = $('#user');
        var firstName = '<li>First Name: ' + user.first_name + '</li>';
        var lastName = '<li>Last Name: ' + user.last_name + '</li>';
        var phoneNumber = '<li>Phone Number: ' + user.phone_number + '</li>';
        var remove = '<br/><li><button class="btn" id="remove">Delete</button></li>';
        var edit = '<br/><li><button class="btn" id="edit">Edit(BORKED)</button></li>';
        list.append(firstName);
        list.append(lastName);
        list.append(phoneNumber);
        list.append(remove);
        list.append(edit);
      }
    });

    $(document).on('click', '#remove', function() {
      $.ajax({
        url: baseUrl + '/' + id,
        type: 'DELETE',
        success: function() {
          location.href = '/';
        }
      });
    });
  }

  $('#new_user').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: baseUrl,
      type: 'POST',
      dataType: 'JSON',
      data: $(this).serializeArray(),
      success: function(data) {
        location.href = '/';
      }
    });
  });

  $('#edit').on('click', function() {
    $.ajax({
      url: baseUrl + '/' + id,
      type: 'PUT',
      dataType: 'JSON',
      data: $(this),
      success: function() {
        location.href = '/' + id;
      }
    });
  });
});