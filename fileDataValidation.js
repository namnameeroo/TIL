// 1. html의 input type=file 속성값 설정으로 파일 제한
let newInputLine = document.creatElement('input');
newInputLine.id = 'file-input'
newInputLine.type = 'file'
newInputLine.setAttribute('accept','image/*, .jpg, .gif')



let form = document.querySelector('#main-form')
form.appendChild(newInputLine)



// 🇰🇷🤪🤪🤪
// 2. data를 넘길 때 유효성 검사

let clickInput = document.querySelector('#file-input')
clickInput.addEventListener("click", function(e) => {
                         
                         
                         })

