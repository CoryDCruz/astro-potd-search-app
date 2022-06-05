let startDate, endDate
startDate = prompt("Start Date","2022-01-01")
endDate = prompt("End Date", "2022-05-01")
const url = `https://api.nasa.gov/planetary/apod?api_key=qqlQgdDqd0kHkZqkplnC0c3rylrZKAgYhsyXkH04&start_date=${startDate}&end_date=${endDate}`



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

