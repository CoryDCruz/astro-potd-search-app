let startDate, endDate


//DOM selectors
let start = document.getElementById("start")
let dataDisplay = document.getElementById("data-display")
let container = document.getElementById('container')

//setting default value and max value of date range picker to today's date
start.value = ""
start.max = getCurrentDate()

// function to add the end date of the search query
function getEndDate (start) {
    let startDateArr = start.split("-")
    let startMonth = parseInt(startDateArr[1])
    startMonth++
    let endMonth = String(startMonth).padStart(2,"0")
    let endYear = String(startDateArr[0])
    return `${endYear}-${endMonth}-01`
}

//function to the current year and month,  returns a string formatted "YYYY-MM"
function getCurrentDate(){
    let currentMonthYear = new Date()
    let month = String(currentMonthYear.getMonth() + 1).padStart(2,"0")
    let year = currentMonthYear.getFullYear()
    return`${year}-${month}`
}


function render(res){
    document.querySelectorAll(".col").forEach(col => col.remove())

    res.forEach(res => {

        let row = document.querySelector(".row")
        let divCol = document.createElement("div")
        let divCardBody = document.createElement("div")
        let divCard = document.createElement("div")
        let img = document.createElement("img")
        let h5 = document.createElement("h5")
        let p = document.createElement("p")
        
        p.classList.add("card-text")
        if(res.copyright != null){
            p.innerText = `${res.title}. Copyright: ${res.copyright}`
        }
        else{
            p.innerText = `${res.title}`
        }
        
        h5.classList.add("card-title")
        h5.innerText = res.date
        img.classList.add("card-img-top")
        img.setAttribute("src",res.url)
        img.setAttribute("alt",res.title)
        divCol.classList.add("col")
        divCard.classList.add("card", "shadow-sm")
        divCardBody.classList.add("card-body")

        divCardBody.appendChild(h5)
        divCardBody.appendChild(p)
        divCard.appendChild(img)
        divCard.appendChild(divCardBody)
        divCol.appendChild(divCard)
        row.appendChild(divCol)

        

    })
}

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

function getData(e){
    startDate = e.target.value
    startDate === start.max ? endDate = "" : endDate = getEndDate(e.target.value)
    const url = `https://api.nasa.gov/planetary/apod?api_key=Q5S3dbJQaQBWgPObnvktAYvLVi4U0saG1yelfuNG&start_date=${startDate}-01&end_date=${endDate}`
    console.log(url)
    fetch(url)
     .then(res => {
        return res.json()
        })
        .then (res => {
            let finalRes = filterResults(res)
            render(finalRes)
        })
        .catch (err => {
            console.log(err)
        })
}



//event listeners
start.addEventListener("input", getData)

//TODO 
// Need to ensure that if today's month/year is chosen the URL should not include an endDate