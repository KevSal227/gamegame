var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
//create a variable for thumbs down, using the examples for thumbs up

var thumbDown = document.getElementsByClassName("fa-thumbs-down");

// array for thumbs up
Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        // updating messages to messagesUp to match what was done in our server.js
        fetch('messagesUp', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
// array for thumb down
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messagesDown', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbDown':thumbDown
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

// array for trash
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
       const id = this.dataset.id
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'id': id
            
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

// review dropdown saves to the database
// okay so what is this ? 
// we need our data base to contain the information but we also need the drop down to connect
// array to review the drop down
//grabs the drop down and listens for when someone new picks a diff one 
var reviews = document.getElementsByClassName("review-select");
Array.from(reviews).forEach(function(element) {
  //using change not click cuz a dropdown only counts when u are picking something 
  element.addEventListener('change', function(){
    //sends for it to be reviewed in our server js 
    fetch('review', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 'id': this.dataset.id, 'Review': this.value })
    }).then(function () {
      // refreshes so that page shows waht got saved 
      window.location.reload()
    })
  });
});

// status dropdown saves to the database
// this is aslo the same thing as what is going on above but is for will play/ playing / finisehd 
var statuses = document.getElementsByClassName("status-select");
Array.from(statuses).forEach(function(element) {
  element.addEventListener('change', function(){
    fetch('status', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 'id': this.dataset.id, 'status': this.value })
    }).then(function () {
      window.location.reload()
    })
  });
});
