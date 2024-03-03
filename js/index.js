var submitBtn = document.getElementById("submitBtn");
var nameInput = document.getElementById("name");
var websiteNameOutput = document.getElementById("websiteName");
var urlInput = document.getElementById("url");
var tableBody = document.getElementById("tableContent");
var inputsArr = [];
var errorMsg = document.getElementById("errorMsg");
var closeBtn = document.getElementById("close");

submitBtn.addEventListener("click", submitFun);

if(localStorage.getItem("websites") != null ){
    inputsArr = JSON.parse(localStorage.getItem("websites"));
    makeTable();
}

nameInput.addEventListener("input",inputTextValidation);
urlInput.addEventListener("input",urlValidation);

// nameInput.addEventListener("focus",()=>{
//     urlInput.style.boxShadow = "none";
//     inputTextValidation();
// });
// urlInput.addEventListener("focus",()=>{
//     nameInput.style.boxShadow = "none";
//     urlValidation();
// });

// nameInput.style.boxShadow = 'none';
// urlInput.style.boxShadow = 'none';

function submitFun(){
    var isValid = inputTextValidation() && urlValidation();

    if (!isValid) {
        // displayError();
        errorMsg.style.display = "flex";
        // window.location.reload();
    }else{
        errorMsg.style.display = "none";
        var website = {
            name: nameInput.value,
            url: urlInput.value
        };
        inputsArr.push(website);
        localStorage.setItem("websites", JSON.stringify(inputsArr));
        clearInputs();
        makeTable();
    }
}
function clearInputs(){
    nameInput.value = '';
    urlInput.value = '';
}

function makeTable(){
    tableBody.innerHTML =  '';
    var box = '';
    for(var i = 0; i < inputsArr.length; i++){
        box += 
        `
        <tr>
            <td id="index">${i+1}</td>
            <td id="websiteName">${inputsArr[i].name}</td>
        
            <td id="visit">
                <a href="${inputsArr[i].url}" class="btn btn-visit text-white">
                    <i class="fa-solid fa-eye"></i>
                    Visit
                </a>
            </td>

            <td id="delete">
                <button class="btn btn-danger" id="delete" onclick="deleteWebsite(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                </button>
            </td>
        </tr>
        `;
    }
    tableBody.innerHTML = box;
}

// document.getElementById("delete").addEventListener("click", deleteWebsite(id)); 
function deleteWebsite(id){
    // we need to delete the element from the array as the element is an index
    inputsArr.splice(id,1); // delete only the element from the array
    makeTable(); // show (element) websites on the document 
    localStorage.setItem("websites", JSON.stringify(inputsArr)); // work as over write
}

// input text validation
function inputTextValidation(){
    var wName = nameInput.value.trim();
    if(!/^[a-zA-Z0-9]{3,}$/.test(wName)){
        nameInput.classList.add("wrong");
        nameInput.classList.remove("correct");
        // remove correct and add wrong img sg (such as icon)
        nameInput.classList.remove("isValid");
        nameInput.classList.add("notValid");
    }
    else{
        nameInput.classList.add("correct");
        nameInput.classList.remove("wrong");
        // add correct and remove wrong img sg (such as icon)
        nameInput.classList.add("isValid");
        nameInput.classList.remove("notValid");
    }
    // nameInput.classList.add("valid")
}

// url validation
function urlValidation(){
    var pattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}\/?$/;
    var urlLink = urlInput.value.trim();
    if(!pattern.test(urlLink)){
        urlInput.classList.add("wrong");
        urlInput.classList.remove("correct");
        // remove correct and add wrong img sg (such as icon)
        urlInput.classList.remove("isValid");
        urlInput.classList.add("notValid");
    }else{
        urlInput.classList.add("correct");
        urlInput.classList.remove("wrong");
        // add correct and remove wrong img sg (such as icon)
        urlInput.classList.add("isValid");
        urlInput.classList.remove("notValid");
    }
}

// function displayError(){
    
//     document.querySelector("body").innerHTML += `
//         <div class="error  d-flex justify-content-center align-items-center z-2 position-absolute">
//         <div class="contect bg-white p-4 rounded-3 shadow">
//             <div class="icons d-flex justify-content-between py-3">
//                 <div class="circles">
//                     <i class="fa-solid fa-circle text-danger pe-2 fa-lg" ></i>
//                     <i class="fa-solid fa-circle text-warning pe-2 fa-lg"></i>
//                     <i class="fa-solid fa-circle text-success fa-lg"></i>
//                 </div>
//                 <button><i class="fa-solid fa-xmark fa-lg"></i></buton>
//             </div>
//             <h4 class="pt-3">
//                 Site Name or Url is not valid, Please follow the rules below :
//             </h4>
//             <div class="text my-3">
//                 <i class="fa-regular fa-circle-right text-danger"></i>
//                 <span>Site name must contain at least 3 characters</span>
//             </div>
//             <div class="text my-2">
//                 <i class="fa-regular fa-circle-right text-danger"></i>
//                 <span>Site URL must be a valid one</span>
//             </div>
//         </div>
//     </div>`;

// }

closeBtn.addEventListener("click",()=>{
    errorMsg.style.display = "none";
});


