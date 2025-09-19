const express = require("express")
const handlebars = require("express-handlebars")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")

require("./config/auth")(passport)

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
  secret: "meusegredo",
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash("error")
  res.locals.user = req.user || null
  next()
})

app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

mongoose.connect("mongodb://localhost/sistemapostagens")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err))

const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/postagens")
app.use("/", authRoutes)
app.use("/postagens", postRoutes)

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})