const mongoose = require("mongoose")

const PostagemSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
  date: { type: Date, default: Date.now }
})

mongoose.model("postagens", PostagemSchema)