import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Ensure all required fields are present
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // use environment variable
                pass: process.env.EMAIL_PASS, // use environment variable
            },
        });

        // Set up email data
        let mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, // your email address
            subject: 'Contact Form',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send mail
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
