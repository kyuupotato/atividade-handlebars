const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const passport = require("passport")

require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

const router = express.Router()

router.get("/", (req, res) => res.render("index"))

router.get("/register", (req, res) => res.render("register"))
router.post("/register", (req, res) => {
  const novoUsuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    usuario: req.body.usuario,
    senha: req.body.senha
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
      if(erro) { req.flash("error_msg", "Erro ao salvar usuário"); res.redirect("/register") }
      novoUsuario.senha = hash
      novoUsuario.save().then(() => {
        req.flash("success_msg", "Cadastro realizado!")
        res.redirect("/login")
      }).catch(() => {
        req.flash("error_msg", "Erro ao criar usuário")
        res.redirect("/register")
      })
    })
  })
})

router.get("/login", (req, res) => res.render("login"))
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next)
})

router.get("/dashboard", (req, res) => {
  if(!req.user) {
    req.flash("error_msg", "Faça login")
    return res.redirect("/login")
  }
  res.render("dashboard", { usuario: req.user })
})

router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if(err) return next(err)
    req.flash("success_msg", "Deslogado com sucesso")
    res.redirect("/")
  })
})

module.exports = router