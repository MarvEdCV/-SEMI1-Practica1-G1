import React, { Component, useEffect, useState } from 'react'




const Boot = () => {
  
    
  useEffect(() => {
    (function(d, m){
      var kommunicateSettings = 
        {"appId":"146dc23386a8e91b490834347cd3b769f","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return <div id="kommunicate-chat-widget-iframe-container"></div>;
};

export default Boot

