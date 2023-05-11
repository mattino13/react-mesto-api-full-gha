import React from 'react';
import Footer from './Footer.js';
import Main from './Main.js';

function ProtectedContent(props) {
  return (
    <>
      <Main {...props} />
      <Footer />
    </>
  )
}

export default ProtectedContent;