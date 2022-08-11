function search(){
    var keyword = document.getElementById("search-box").value

    window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(keyword)

    return false
}