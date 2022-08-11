cat = document.getElementById("cat")
index = 1

function changeImage(){
    cat.src = `./images/${index}.jpg`
    index == 5 ? index = 1: index++  
    setTimeout(changeImage,2500)
}

window.onload = changeImage()
