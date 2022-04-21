const nodemailer = require('nodemailer')


// const nodeoutlook = require('nodejs-nodemailer-outlook')
// nodeoutlook.sendEmail({
//     auth: {
//         user: 'malikimenov@outluok.com',
//         pass: '0159kb'
//     },
//     tls: {
//         //rejectUnauthorized: false,
//         //servername: "malikimenov@outluok.com"
//     },
//     secure: true,
//     from: process.env.SMTP_USER,
//     to: 'abdumalik.imenov@optimabank.kg',
//     subject: 'Hey you, awesome!',
//     html: '<b>This is bold text</b>',
//     text: 'This is text version!',
//     replyTo: 'abdumalik.imenov@optimabank.kg',
//     attachments: [{
//         filename: 'text1.txt',
//         content: 'hello world!'
//     }],
//     onError: (e) => console.log(e),
//     onSuccess: (i) => console.log(i)
// })
//------------------------------------------------------------------




//const transporter = nodemailer.createTransport('smtp://malikimenov@outluok.com%40outlook.com:0159kb@smtp-mail.outlook.com');

const transporter = nodemailer.createTransport({
    //service: "hotmail",
    host: 'smtp-mail.outlook.com',
    port: 587,
    // secure: false,
    secureConnection: false,
    tls: {
        //rejectUnauthorized: false,
        ciphers:'SSLv3'
    },
    auth: {
        user: 'malikimenov@outluok.com',
        pass: '0159kb'
    }
})



exports.mailSend = async function (toMail, message) {
    try {
        // console.log('transporter', transporter)
      return await transporter.sendMail({
            from: process.env.SMTP_USER,
            toMail,
            subject: `Optima bank ${process.env.API_URL_BACKEND}`,
            text: '',
            html:
                `
                <div>
                    <h1>Вам отправлено сообщение</h1>
                    <spna>${message}</spna>
                </div>
            `
        })
    }catch (e) {
        console.log(e)
    }

}




async function res(){
  const result = await mailSend( "abdumalik.imenov@optimabank.kg", "abdumalik.imenov@optimabank.kg")
  console.log('result', result)
  return result
}
















