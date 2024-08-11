const Contacto = require("../models/Contacto")
const { transporter } = require("../config/data/mailer")


const guardarContacto = async (req, res) => {
    console.log(req.body)
    try {
        const nuevoContacto = new Contacto(req.body)
        console.log(nuevoContacto)
        await nuevoContacto.save()
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'Correo de pba" <contacto@charlycloud.cl>', // sender address
            to: `${nuevoContacto.email}`, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        console.log("se envio el correo", info)

        res.json({ success: true, msg: "Contacto Guardado", info: nuevoContacto })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: error.message })
    }
}


module.exports = {
    guardarContacto
}