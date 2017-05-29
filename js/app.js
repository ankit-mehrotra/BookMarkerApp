document.getElementById("myForm").addEventListener("submit", saveBookMark);

function saveBookMark(e) {

    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;
    var bookmark = {
        name: siteName,
        url: siteUrl
    };
    if (!siteName || !siteUrl) {
        alert("Please fill in the form");
        return false;
    }
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    document.getElementById("myForm").reset();
    fetchBookMarks();
    e.preventDefault();

}

function deleteBookMark(url) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {

            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookMarks();
}

function fetchBookMarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarksResult = document.getElementById("bookmarksResult");
    bookmarksResult.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResult.innerHTML += '<div class="well"' + '<h1>' + name + '<a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
            '<a onclick ="deleteBookMark(\'' + url + '\')" class="btn btn-danger"">Delete</a>' + "</div > ";
    }

}