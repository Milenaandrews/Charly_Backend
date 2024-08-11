const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'smtppro.zoho.com',
    host: 'smtppro.zoho.com',
    secure: true, // Use `true` for port 465, `false` for all other ports
    port: 465,
    auth: {
        user: 'clau@charlycloud.cl',
        pass: process.env.PASS
        },
});

transporter.verify().then( ()=>{
    console.log('listo para enviar correo')
})

module.exports = {transporter}