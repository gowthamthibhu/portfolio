import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Create a transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gowthamthibhu@gmail.com', // replace with your email
                pass: 'glbxplvqjwwyslqc', // replace with your email password
            },
        });

        // Set up email data
        let mailOptions = {
            from: email,
            to: 'gowthamthibhu@gmail.com', // replace with your email
            subject: 'Contact Form',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send mail
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error sending email', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}