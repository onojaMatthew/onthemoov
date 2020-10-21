import React, { useEffect, useState } from 'react'
import {
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const SocialShare = (props) => {
  const [ orderData, setOrderData ] = useState("");
  useEffect(() => {
    setOrderData(props.share(props.orderId));
  }, [props]);

  
  const size = 20;

  return (
    <div style={{ display: "flex"}}>
      <li
        className="network"
        style={{ listStyle: "none", display: 'inline', }}
      >
        <WhatsappShareButton
          className="network__share-button"
          url={orderData}
        >
          <WhatsappIcon
            size={size}
          />
        </WhatsappShareButton>
      </li>
    </div>
  )
}

export default SocialShare