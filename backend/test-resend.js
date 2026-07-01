const { Resend } = require('resend');
const resend = new Resend('re_8AoW5uCo_5VLSHLSwrer662BFY83kv4qe');

async function testMail() {
  console.log('Sending test email...');
  try {
    const { data, error } = await resend.emails.send({
      from: 'UltNexus <noreply@ultnexus.com>',
      to: ['ultnexus.dev@gmail.com'],
      subject: 'UltNexus Test Mail',
      html: '<p>This is a test mail from UltNexus.</p>'
    });
    
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Success:', data);
    }
  } catch (err) {
    console.error('Exception:', err);
  }
}

testMail();
