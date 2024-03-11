const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title, body)=>{

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS
            }
        });
        let info = await transporter.sendMail({
            from:`Vitern || Learning Made Easy`,
            to: email,
            
        });
        console.log('Message sent: %s', info);
        return info;
    } catch (error) {
        console.log(error);
    }
}

module.exports = mailSender;