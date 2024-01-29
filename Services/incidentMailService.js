import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (from, to, subject, text, html, filename, downloadURL) => {
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html,
        attachments: [
            {   
                filename: filename,
                path: downloadURL
            }
        ]
    };

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.APP_PASSWORD,
        },
    });

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; 
    }
};