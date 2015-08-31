var Users = {
  fetch: function (cb) {
    $.ajax({
      contentType: 'application/json; charset=utf-8',
      crossDomain: true,
      dataType: 'json',
      url: 'http://srv3.hw.ca1.mesosphere.com:31335/api/users.json',
      success: cb,
      timeout: 2000,
      type: 'GET',
      xhrFields: {
        withCredentials: false
      }
    });
  }
};

module.exports = Users;
