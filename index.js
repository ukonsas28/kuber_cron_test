const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: "test_for_php@mail.ru",
    pass: "RM3tr5qiubxVt0wwahX0",
  },
});

const mailOptions = {
  from: "test_for_php@mail.ru",
  to: "prostoi213@yandex.ru",
  subject: "Sending Email using Node.js",
  text: `SEND EMAIL ${new Date()}`,
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
