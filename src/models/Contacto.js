const mongoose = require('mongoose')

const contactoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            lowercase: true,
            minLength: 3,
            maxLength: 100,
            trim: true
        },

        farmacia:{
            
            type: String,
            required: true,
            lowercase: true,
            minLength: 3,
            maxLength: 100,
            trim: true
        },
            
        email: {
            type: String,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor escribir un correo de electronico válido']
            
        },




    }, {timestamps:true});

    const Contacto = mongoose.model("contacto", contactoSchema)

    module.exports = Contacto;