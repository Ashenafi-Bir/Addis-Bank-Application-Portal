import React from 'react';
import './Communication.css';
import ad from '../../../assets/communication/ad1.jfif';
import cont from '../../../assets/communication/cont.jfif';
import web from '../../../assets/communication/web.jfif';
import rms from '../../../assets/communication/rms.jfif';
import isu from '../../../assets/communication/isu.jfif';
import AnimatedTitle from '../../CommonPageLayouts/titles/AnimatedTitle';

function Communication() {
  const applications = [
    { name: 'Adib AD Manager', imgSrc: ad },
    { name: 'Contact Directory', imgSrc: cont },
    { name: '980 RMS', imgSrc: rms },
    { name: 'Adib Webmail', imgSrc: web },
    { name: 'Service Desk Portal (SDP)', imgSrc: isu },
  ];

  return (
    <div className="communication-container">
      <div className="communication-header">
  
      <AnimatedTitle
        titlePart1="Communication"
        titlePart2="Applications"
      />
        <p>This Category includes applications which are available in Communication and live environment.</p>
      </div>
      <div className="application-grid">
        {applications.map((app, index) => (
          <div key={index} className="application-card">
            <img src={app.imgSrc} alt={app.name} className="application-image" />
            <p className="application-title">{app.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Communication;
