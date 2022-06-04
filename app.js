let startDate, endDate
startDate = prompt("Start Date","YYYY-MM-DD")
endDate = prompt("End Date")
const url = `https://api.nasa.gov/planetary/apod?api_key=qqlQgdDqd0kHkZqkplnC0c3rylrZKAgYhsyXkH04&start_date=${startDate}&end_date=${endDate}`
console.log(url)

fetch(url)
    .then(res => {
        return res.json()
    })
    .then (res => {
        console.log(res)
    })
    .catch (err => {
        console.log(err)
    })

