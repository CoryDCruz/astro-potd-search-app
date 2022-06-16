const apiKey = "Q5S3dbJQaQBWgPObnvktAYvLVi4U0saG1yelfuNG"



let startDate, endDate
let start = document.getElementById("start")
let dataDisplay = document.getElementById("data-display")
let container = document.getElementById('container')
let spinner = document.querySelector("#spinner")

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
//formats dates to display DD-MM-YYYY on the DOM
function displayDate (date){
    let dateArr = date.split("-")
    const day = dateArr[2]
    const month = dateArr[1]
    const year = dateArr[0]
    return `${month}-${day}-${year}`

}
// creates an iframe element for embed videos
function createVideoElement (data){

    element = document.createElement("iframe")
    element.classList.add("card-img-top", "embed-responsive-item")
    element.setAttribute("src",data.url)
    element.setAttribute("width", "560")
    element.setAttribute("height", "315")
    element.setAttribute("allowfullscreen","")

    return element

}
// creates image element
function createImageElement (element, data){

    element.classList.add("card-img-top")
    element.setAttribute("src",data.url)
    element.setAttribute("alt",data.title)
    return element

}

// creates html elements and appends them to display photos and text
function render(photoData){
    document.querySelectorAll(".col").forEach(col => col.remove())
    photoData.forEach(photoData => {
        //create html elements
        const row = document.getElementById("display")
        const divCol = document.createElement("div")
        const divCardBody = document.createElement("div")
        const divCard = document.createElement("div")
        const divEmbed = document.createElement("div")
        let img = document.createElement("img")
        const h5 = document.createElement("h5")
        const p = document.createElement("p")
        const a = document.createElement("a")
        p.classList.add("card-text")
        
        if(photoData.copyright != null){
                p.innerText = `${photoData.title}. \n Copyright: ${photoData.copyright}.`
            }
            else{
                p.innerText = `${photoData.title}`
            }

            if(photoData.media_type === "video") {
                img = createVideoElement(photoData)
            }
            else {
                createImageElement(img, photoData)
                a.setAttribute("href", photoData.hdurl)
                a.setAttribute("target", "_blank")
                a.classList.add("stretched-link")
            }

            
            h5.classList.add("card-title")
            h5.innerText = displayDate(photoData.date)
        

        divCol.classList.add("col")
        divCard.classList.add("card", "rounded")
        divEmbed.classList.add("embed-responsive", "embed-responsive-16by9")
        divCardBody.classList.add("card-body")

        divCardBody.appendChild(h5)
        divCardBody.appendChild(p)
        divCardBody.appendChild(a)
        divCard.appendChild(img)
        divCard.appendChild(divCardBody)
        divCol.appendChild(divCard)
        row.appendChild(divCol)


        hideSpinner()

       
     
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
// displays the loading spinnger
function displaySpinner(){
    document.getElementById("display").classList.add("visually-hidden")
    spinner.classList.remove("visually-hidden")
}
// hides loading spinner
function hideSpinner() {
    spinner.classList.add("visually-hidden")
    document.getElementById("display").classList.remove("visually-hidden")
}
// function triggered by event listener and executes fetch to API
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
            
        })
        .catch (err => {
            console.log(err)
        })
}



//event listeners

start.addEventListener("input", getData)

