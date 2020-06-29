const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://avatars3.githubusercontent.com/u/64774085?s=460&u=9a5e85efc1713eef9761b0e7fd9f8dccec789568&v=4",
        name: "Estefani Klotz",
        role: "Aluna do curso da Rocketseat",
        description: 'Sempre buscando aprimorar meus conhecimentos. </br> Agora focada no curso da <a href="https://rocketseat.com.br" target="_blank"> Rocketseat.',
        links: [ 
            { name: "Github", url: "https://github.com/esklotz/"},
            { name: "Facebook", url: "https://www.facebook.com/estefani.joana.3/"},
            { name: "LinkedIn", url: "https://www.linkedin.com/in/estefani-joana-borchardt-klotz-864877153/"}
        ]
    }
    return res.render("about", {about: about}) 
})

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", { items: videos }) 
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })
    if(!video) {
        return res.send("Video not found!")
    }

    return res.render("video", {item: video})

})

server.listen(5000, function() {
    console.log("Server is running")
}) 