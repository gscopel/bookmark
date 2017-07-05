//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
//save Bookmark
function saveBookmark(e){
//get form values
var siteName = document.getElementById('siteName').value;
var siteUrl = document.getElementById('siteUrl').value;

if (!validateForm(siteName, siteUrl)) {
  return false;
}

var bookmark = {
  name: siteName,
  url: siteUrl
}

//local storage test
//localStorage.setItem('test', 'Hello world');
//console.log(localStorage.getItem('test'));

//test if bookmarks is null
if (localStorage.getItem('bookmarks') === null) {
//init array
var bookmarks = [];
//add to bookmark array
bookmarks.push(bookmark);
//set to local storage, because it is just in local array state
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//if there is something in bookmarks
} else {
  //get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //add bookmark to array
  bookmarks.push(bookmark);
  //reset to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


}
fetchBookmarks();
//prevent form from submitting
  e.preventDefault();
}
//delete bookmark function
function deleteBookmark(url){
  //get bookmarks from local storage
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop through bookmarks to look for what to reset
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
   //reset to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //fetch bookmarks to get item deleted from screen without reloading
  fetchBookmarks();
}


//fetch bookmarks to display on webpage
function fetchBookmarks(){
  //get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //get output id and actually display the websites to a div
  var bookmarksResults = document.getElementById('bookmarksResults');
  //build output
  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                    '<h3>' +name+
                    ' <a class="btn btn-default" traget="_blank" href="'+url+'">Visit</a> ' +
                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                    '</h3>'+
                    '</div>'; 


  }
}
//validate the form to check for website authentication 
function validateForm(siteName, siteUrl){
  if (!siteName || !siteUrl) {
  alert('please fill in the form')
  return flase;
}
//regular expression used to identify websites
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if (!siteUrl.match(regex)) {
  alert('That is not a valid url');
  return false;
  }

  return true;
}
