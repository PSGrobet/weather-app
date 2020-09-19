document.addEventListener('DOMContentLoaded', ()=>{

  let timezones = [
    "America/Mexico_City",
    "America/New_York",
    "Europe/Amsterdam",
    "Japan"
  ]

  let locale
  let time = document.querySelector('.time')
  let timer
  let timerId
  let button = document.querySelector('.button')


  function checkCity() {
    document.querySelector('img').setAttribute('src', "")
    document.querySelector('.city').innerHTML = ""
    document.querySelector('.desc').innerHTML = ""
    document.querySelector('.temp').innerHTML = ""

    let checked
    let input = document.getElementsByName('city')
    console.log(input)
    
    for(let i = 0; i < input.length; i++  ) {
      if (input[i].checked == true) {
        checked = input[i].value
        locale = timezones[i]
        /* console.log(locale)
        console.log(input[i].value) */
      }
    }
    console.log(locale)
    
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + checked + "&units=metric&appid=ddd0bd620778096839aab0479aa8ada8&lang=es", (data)=>{
    console.log(data)

    let icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
    let city = data.name
    let temp = data.main.temp
    let description = data.weather[0].description

    if (city == "Mexico City") {
      city = "Ciudad de México"
    }    

    $('.icon').attr('src', icon)
    $('.city').append(city)
    $('.temp').append(Math.floor(temp) + "°C")
    $('.desc').append(description)    
    
    })
  }

  function setTime(loc) {
    time.innerHTML = ""
    clearInterval(timerId)
    timerId = setInterval(()=>{
      
      let timer = new Date().toLocaleString("en-US", {timeZone: loc})
      //console.log(timer)
      time.innerHTML = timer      
    }, 1000)
  }

  button.addEventListener('click', () =>{
    /* if (timer) {
      clearInterval(timer)
      timer = null
    } else {
      timer = setInterval(setTime(locale), 1000)
    } */
    console.log(locale)
    if(timer) clearInterval(timer)
    checkCity()
    setTime(locale)
  })

  checkCity()
  setTime(locale)


  //new Date().toLocaleString("en-US", {timeZone: "Japan"})


})  
