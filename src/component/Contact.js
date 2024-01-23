import React from 'react';

const Contact = () => {
  const sectionStyle = {
    backgroundColor: '#007BFF', // Background color
    color: 'white', // Text color
    textAlign: 'center', // Centered text
    padding: '20px', // Padding for spacing
  };

  return (
    <section style={sectionStyle}>
      <div className="contact-info">
        <div className="phone">Email: nbflower@emirates.net.ae</div>
        <div className="location">Location: Al Barsha</div>
        <div className="address">Shop # 02, Street 2A, Al Barsha 2,P.O Box :32258, Dubai - UAE</div>
        <div className="company">Company: THE NATURE BEAUTY FLOWER</div>
      </div>
    </section>
  );
};

export default Contact;
