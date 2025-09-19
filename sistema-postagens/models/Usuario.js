const mongoose = require("mongoose")

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  usuario: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

mongoose.model("usuarios", UsuarioSchema)