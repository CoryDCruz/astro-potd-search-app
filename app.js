const startDate = "2022-01-01"
const endDate = "2022-02-01"

const url = `https://api.nasa.gov/planetary/apod?api_key=qqlQgdDqd0kHkZqkplnC0c3rylrZKAgYhsyXkH04&start_date=${startDate}&end_date=${endDate}`

//DOM selectors
let start = document.querySelector("#start")
console.log(start)
let end = document.querySelector("#end")

function getData(e){
    console.log(e)
fetch(url)
    .then(res => {
        return res.json()
    })
    .then (res => {

        let arr= []
        for(i=0; i < 10; i++){
            arr.push(res[i])
        }
        console.log(arr)
    })
    .catch (err => {
        console.log(err)
    })
}



//event listeners
start.addEventListener("input", getData)
end.addEventListener("input", getData)

