const Contacto = require("../models/Contacto")
const { transporter } = require("../config/data/mailer")
const path = require('path')
const fs = require('fs')


const guardarContacto = async (req, res) => {

    console.log(req.body)

    try {
        const nuevoContacto = new Contacto(req.body)
        console.log(nuevoContacto)
        await nuevoContacto.save()

        //Ruta del archivo pdf
        const pdfPath = path.join(__dirname, '../assets/E-book_Gestión_de_Farmacia_Vol_I.pdf')

        // Verifica si el archivo existe antes de intentar enviarlo

        fs.access(pdfPath, fs.constants.F_OK, async (err) => {
            if (err) {
                console.error('El archivo no existe:', pdfPath);
                return res.status(500).json({ success: false, msg: "Error al enviar el correo, el archivo adjunto no existe." });
            }

            console.log('El archivo existe, procediendo a enviar el correo...');

            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"Equipo Charly Cloud" <contacto@charlycloud.cl>', // sender address
                to: `${nuevoContacto.email}`, // list of receivers
                subject: "E-book Gestión de Farmacias", // Subject line
                html: `<p>Hola ${nuevoContacto.nombre}</p>
                    <p>En el documento adjunto encuentras el E-Book de Charly Cloud.</p>
                    <p>Con este E-Book, potenciaras tus conocimientos en Gesti&oacute;n de Farmacia, con el fin de obtener eficiencia en t&eacute;rminos rentables y medio ambientales.</p>
                    <p>"Convierte la teor&iacute;a en acci&oacute;n con Charly Cloud, el software que convierte los contenidos de nuestro E-Book en funciones tecnol&oacute;gicas para hacer crecer tu Farmacia. &iexcl;Empieza a transformar tu negocio ahora!"</p>
                    <p>Recuerda, Charly Cloud es el software de la Farmacia dise&ntilde;ado por especialistas farmac&eacute;uticos.</p>
                    <p>Nos despedimos dese&aacute;ndote mucho &eacute;xito</p>
                    <p>Equipo Charly Cloud</p>`, // html body
                attachments: [
                    {   // file on disk as an attachment
                        filename: 'E-book_Gestión_de_Farmacia_Vol_I.pdf',
                        path: pdfPath // stream this file
                    },
                ],
            });

            console.log("se envió el correo", info);

            res.json({ success: true, msg: "Contacto Guardado", info: nuevoContacto });
        });

        } catch (error) {
            console.log(error)
            if (error.name === 'ValidationError') {
                //! ValidationError es un Error de validación de Mongoose
                const messages = Object.values(error.errors).map(val => val.message);
                return res.status(400).json({ success: false, msg: messages });
            }
            res.status(500).json({ success: false, msg: error.message })
        }
    }


module.exports = {
        guardarContacto
    }