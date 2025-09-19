const express = require("express")
const mongoose = require("mongoose")

require("../models/Postagem")
const Postagem = mongoose.model("postagens")

const router = express.Router()

function autenticado(req, res, next) {
  if(req.isAuthenticated()) return next()
  req.flash("error_msg", "Você precisa estar logado")
  res.redirect("/login")
}

router.get("/", autenticado, (req, res) => {
  Postagem.find({ usuario: req.user._id })
    .populate("usuario")
    .then(postagens => res.render("postagens", { postagens }))
})

router.post("/nova", autenticado, (req, res) => {
  const novaPostagem = new Postagem({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
    usuario: req.user._id
  })
  novaPostagem.save().then(() => {
    req.flash("success_msg", "Postagem criada")
    res.redirect("/postagens")
  })
})

module.exports = router