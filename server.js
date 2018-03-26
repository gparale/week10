const express = require("express")
const bodyparser = require("body-parser")
const hbs = require('hbs')
var app = express()

const port = process.env.PORT || 8080

const geocode = require("./private/week7stuff.js")


app.use(express.static(__dirname + "/public"))
app.set('view engine', 'hbs')

hbs.registerPartials(__dirname + "/views/partials")

hbs.registerHelper('getRandomYear', ()=> {
    rand_year = (Math.floor(Math.random()*99) + 1)
    if (rand_year < 10){
        return "190" + rand_year
    }
    else if (rand_year >= 10){
        return "19" + rand_year
    }
     
})

hbs.registerHelper('getRandomTitle', ()=>{
    name_id = (Math.floor(Math.random()*3) + 1)
    if (name_id === 1){
        return "an airhead"
    }
    else if (name_id === 2){
        return "an idiot"
    }
    else if (name_id === 3){
        return "an arsehole"
    }
})
app.use(bodyparser.json())

/*app.use((request,response,next)=>{
	var time = new Date().toString()
	console.log(request)
	console.log(`${time}: ${request.method} ${request.url}`) //Not quotations.
	next();
})*/


app.get("/", (request, response) => {
    response.render('front-end.hbs', {
        menu: "/info",
        menu_name: "Click here for me (or a lack of info thereof)"
    })
})

app.get("/mapnweather", (request, response) => {
    response.sendFile(__dirname + "/mapsnweather.html")
})

app.get('/info', (request, response) => {
    response.render('infome.hbs', {
        menu: "/",
        menu_name: "Click here to go back home",
        img_source: "https://i.pinimg.com/originals/04/6a/ea/046aea699f078f9a0f6065f7438504ad.jpg"
    })
})

app.get("/404", (request, response) => {
    response.send("This is a non-existent page, maybe in the Deep Web??")
})

app.post("/resources", (request, response) => {
    console.log(request.body)
    var body_content = []
    if (request.body['request-type'] == 'location') {
        location = geocode.getAddress(request.body.msg).then((result)=>{
        	body_content.push(result); })
        weather = location.then((result)=>geocode.getWeather(location.lng, location.lat)).then((result)=>{
        	body_content.push(result);
        	response.json({status:"OK", msg:body_content})
        }).catch((error)=>{response.json({status:"Error", msg:error})})
    }
    
})


app.listen(port, () => {
    console.log("Server Up in " + port)
});