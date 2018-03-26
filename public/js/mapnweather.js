document.addEventListener("keyup", (event)=>{
	if (event.keyCode === 13){
		fetch("/resources", {
			method:'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				"request-type": 'location',
				msg: document.getElementById('mapweather').value
			})
		}).then((response)=>{
				return response.json()
		}).then((json)=>{
			
			if (json.status === "OK"){
				ndiv = document.createElement("div")
				ndiv.innerHTML = "Current weather for " + document.getElementById('mapweather').value + "(" + json.msg[0].address + ") is " + json.msg[1]
				document.body.appendChild(ndiv)
			} else if (json.status === "Error"){
				ndiv = document.createElement("div")
				ndiv.innerHTML = "Cannot get weather for " + document.getElementById('mapweather').value + "(" + json.msg + ")"
				document.body.appendChild(ndiv)
			}

		})
	}
})