import React from "react";
import {FacebookShareButton, EmailShareButton, FacebookMessengerShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, EmailIcon, FacebookMessengerIcon} from "react-share";

const Sharables = ({url}) => {
  return (
    <div className="flex px-4">
      <div className="pl-4">
        <FacebookShareButton url={url}>
          <FacebookIcon size={20} />
        </FacebookShareButton>
      </div>
      <div className="pl-4">
        <TwitterShareButton url={url}>
          <TwitterIcon size={20} />
        </TwitterShareButton>
      </div>
      <div className="pl-4">
        <EmailShareButton url={url}>
          <EmailIcon size={20} />
        </EmailShareButton>
      </div>
      <div className="pl-4">
        <FacebookMessengerShareButton url={url}>
          <FacebookMessengerIcon size={20} round />
        </FacebookMessengerShareButton>
      </div>
    </div>
  );
};

export default Sharables;
