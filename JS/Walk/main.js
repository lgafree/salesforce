cap_guy = document.getElementById("cap-guy")
pageWidth = document.body.offsetWidth - cap_guy.offsetWidth
index = 1
pos = 0
speed = 10

function changeImage(){
    cap_guy.src = `./images/${index}.png`

    index == 8 ? index = 1: index++

    cap_guy.style.left = `${pos+=speed}px`
    pos >= pageWidth ? pos=0 : null
    
    setTimeout(changeImage, 100)
}

window.onload = changeImage()