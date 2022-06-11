

let startDate, endDate
let apiKey = "Q5S3dbJQaQBWgPObnvktAYvLVi4U0saG1yelfuNG"



//DOM selectors
let start = document.getElementById("start")
let dataDisplay = document.getElementById("data-display")
let container = document.getElementById('container')
let spinner = document.querySelector("#spinner")

//setting default value and max value of date range picker to today's date
start.value = ""
start.max = getCurrentDate()

// function to find the end date of the search query
function getEndDate (start) {
    let startDateArr = start.split("-")
    let startMonth = parseInt(startDateArr[1])
    startMonth++
    let endMonth = String(startMonth).padStart(2,"0")
    let endYear = String(startDateArr[0])
    if(endMonth === "13"){
        endMonth = "01"
        endYear = parseInt(endYear)
        endYear++
        endYear = String(endYear)
        
        
    }
    return `${endYear}-${endMonth}-01`
}

//function to the current year and month,  returns a string formatted "YYYY-MM"
function getCurrentDate(){
    let currentMonthYear = new Date()
    let month = String(currentMonthYear.getMonth() + 1).padStart(2,"0")
    let year = currentMonthYear.getFullYear()
    return`${year}-${month}`
}

function displayDate (date){
    let dateArr = date.split("-")
    const day = dateArr[2]
    const month = dateArr[1]
    const year = dateArr[0]
    return `${month}-${day}-${year}`

}

function render(res){
    
    document.querySelectorAll(".col").forEach(col => col.remove())

    res.forEach(res => {

        //create html elements
        let row = document.getElementById("display")
        let divCol = document.createElement("div")
        let divCardBody = document.createElement("div")
        let divCard = document.createElement("div")
        let divEmbed = document.createElement("div")
        let img = document.createElement("img")
        let h5 = document.createElement("h5")
        let p = document.createElement("p")
        
        
        p.classList.add("card-text")
        if(res.copyright != null){
            p.innerText = `${res.title}. \n Copyright: ${res.copyright}.`
        }
        else{
            p.innerText = `${res.title}`
        }

        if(res.url.includes("youtube") === true || res.url.includes("vimeo") === true) {
            img = document.createElement("iframe")
            img.classList.add("card-img-top", "embed-responsive-item")
            img.setAttribute("src",res.url)
            img.setAttribute("width", "560")
            img.setAttribute("height", "315")
            img.setAttribute("allowfullscreen","")
        }
        else {
        img.classList.add("card-img-top")
        img.setAttribute("src",res.url)
        img.setAttribute("alt",res.title)
        }

        
        h5.classList.add("card-title")
        h5.innerText = displayDate(res.date)
       

        divCol.classList.add("col")
        divCard.classList.add("card", "shadow","shadow-lg", "shadow-intesity-sm", "rounded")
        divEmbed.classList.add("embed-responsive", "embed-responsive-16by9")
        divCardBody.classList.add("card-body")

        divCardBody.appendChild(h5)
        divCardBody.appendChild(p)
        divCard.appendChild(img)
        divCard.appendChild(divCardBody)
        divCol.appendChild(divCard)
        row.appendChild(divCol)

       
     
    })
}
// filters the results to remove any result that is outside the month that was selected by the user
function filterResults (res){

    let filteredRes = res.filter(res => {
        let date = res.date.split("-")
        let startDateArr = startDate.split("-")
        if(date[1] != startDateArr[1]){
            return
        }
        else{
            return res
        }

    })

    return filteredRes

}

function displaySpinner(){
    document.getElementById("display").classList.add("visually-hidden")
    spinner.classList.remove("visually-hidden")
}

function hideSpinner() {
    spinner.classList.add("visually-hidden")
    document.getElementById("display").classList.remove("visually-hidden")
}


function getData(e){
    displaySpinner()
    startDate = e.target.value
    startDate === start.max ? endDate = "" : endDate = getEndDate(e.target.value)
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}-01&end_date=${endDate}`
    fetch(url)
     .then(res => {
         
        return res.json()
        })
        .then (res => {
            let finalRes = filterResults(res)
           
            render(finalRes)
            hideSpinner()
            
        })
        .catch (err => {
            console.log(err)
        })
}



//event listeners
start.addEventListener("input", getData)

