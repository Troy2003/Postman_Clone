console.log('This is postman clone');

let jsonRadio = document.getElementById('jsoncontent');
let customRadio = document.getElementById('customcontent');

let parametersBox = document.getElementById('parametersBox');
let jsonRequestBox = document.getElementById('jsonRequestBox');

// function to get element from string 

function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// define a variable for parameter count 
let paramCount = 0;
// hide parametersBox in starting 
parametersBox.style.display = 'none';

// hide parameters box 
jsonRadio.addEventListener('click', hideParamBox);

function hideParamBox() {
    parametersBox.style.display = 'none';
    jsonRequestBox.style.display = 'block';
}

// hide json box 
customRadio.addEventListener('click', hideJsonBox);

function hideJsonBox() {
    jsonRequestBox.style.display = 'none';
    parametersBox.style.display = 'block';
}
// adding Parameters on click of button 
let addParam = document.getElementById('addParams');
let btnAdddParam = document.getElementById('btnAdddParam');
btnAdddParam.addEventListener('click', (e) => {
    e.preventDefault();
    let paramStr = `<form class="row g-3 my-1">
                  <label for="urlfield" class="col-sm-2 col-form-label">Parameter ${paramCount +2}</label>
                    <div class="col-md-3">
                         <input type="text" class="form-control" id="parameterKey${paramCount +2}" placeholder="Enter Parameter${paramCount+2} Key">
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="parameterValue${paramCount +2}" placeholder="Enter Parameter ${paramCount +2} Value">
                    </div>
                    <div class="col-md-3">
                        <button  class="btn btn-primary removeParam">-</button>
                    </div>
               </form>`;

    let paramElement = getElementFromString(paramStr);
    addParam.appendChild(paramElement);

    // working on remove Parameters Button 
    let removeParam = document.getElementsByClassName('removeParam');
    for (item of removeParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();
        });
    }

    paramCount++;

});

// user click on submit button 

let btnSubmit = document.getElementById('submit');
btnSubmit.addEventListener('click', () => {
    // changing text in textarea 
    let ResponceText = document.getElementById('ResponcePrism');
    ResponcePrism.value = "Please Wait..Fetching Responce"

    // fetch all the values user has enter 
    let url = document.getElementById('urlfield').value;
    let requestType = document.querySelector("input[name = requestType]:checked").value;
    let contentType = document.querySelector("input[name = contentType]:checked").value;

    // console.log('url is', url);
    // console.log('requestType is', requestType);
    // console.log('contentType is', contentType);

    if (url.length < 3) {
        document.getElementById('ResponcePrism').innerHTML = '';
    }

    if (contentType == "CUSTOM") {
        let data = {};
        for (let i = 0; i < paramCount + 1; i++) {
            if ((document.getElementById(`parameterKey${i+1}`)) != undefined) {
                let key = document.getElementById(`parameterKey${i+1}`).value;
                let value = document.getElementById(`parameterKey${i+1}`).value;
                data[key] = value;
            }
            data = JSON.stringify(data);
        }
    } else {
        data = document.getElementById('jsonRequestText').value;
    }
    console.log(data);

    // if request type is get so invoke fetch api to get request 

    if (requestType == 'GET') {
        fetch(url, {
            method: "GET"
        }).then(function(responce) {
            return responce.text();
        }).then(function(text) {
            // document.getElementById('ResponceText').value = text;
            document.getElementById('ResponcePrism').innerHTML = text;
            Prism.highlightAll();


        });
    } else {
        try {
            fetch(url, {
                method: "POST",
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }

            }).then(function(responce) {
                return responce.text();
            }).then(function(text) {
                // document.getElementById('ResponceText').value = text;
                document.getElementById('ResponcePrism').innerHTML = text;
                Prism.highlightAll();
            });

        } catch (error) {

        }
    }


});