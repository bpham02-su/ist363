const url = "https://api.open-meteo.com/v1/forecast?latitude=43.0481&longitude=-76.1474&hourly=temperature_2m&current=precipitation,temperature_2m,cloud_cover&temperature_unit=fahrenheit&precipitation_unit=inch"
        async function getWeather(){
            const response = await fetch(url);
            const data = await response.json()
            console.log(data)
            console.log("Precipitation is " + data.current.precipitation+'"')
            let current_precipt = data.current.precipitation +'"'
            console.log("Temperature is " + data.current.temperature_2m+data.current_units.temperature_2m)
            let current_temp =  data.current.temperature_2m+data.current_units.temperature_2m
            console.log("Cloud Cover is "+ data.current.cloud_cover+data.current_units.cloud_cover)
            let current_cloud_cover = data.current.cloud_cover

            document.getElementById("precipt").innerText = current_precipt
            document.getElementById("temp").innerText = current_temp
            // document.getElementById("cloud").innerText = current_cloud_cover+data.current_units.cloud_cover

            if (current_cloud_cover <= 50){
                document.getElementById("sun_cloud").innerText = "🌞"
            } else{
                document.getElementById("sun_cloud").innerText = "☁️"

            }

        }

        getWeather();