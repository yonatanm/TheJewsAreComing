import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from 'react-share';
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"

import './share.scss';

const Share = ({ socialConfig, tags }) => (
	<div className="post-social">
		<FacebookShareButton resetButtonStyle={false} url={socialConfig.config.url} className="button is-outlined is-rounded facebook" >
			<span className="icon">
				<FontAwesomeIcon icon={faFacebook} />
			</span>
		</FacebookShareButton>
		<TwitterShareButton resetButtonStyle={false} url={socialConfig.config.url} className="button is-outlined is-rounded twitter" title={socialConfig.config.title}  hashtags={tags} >
			<span className="icon">
				<FontAwesomeIcon icon={faTwitter} />
			</span>
		</TwitterShareButton>
		<WhatsappShareButton resetButtonStyle={false} url={socialConfig.config.url} className="button is-outlined is-rounded whatsapp" title={socialConfig.config.title} >
			<span className="icon">
				<FontAwesomeIcon icon={faWhatsapp} />
			</span>
			</WhatsappShareButton>
	</div>
);

Share.propTypes = {
	socialConfig: PropTypes.shape({
		twitterHandle: PropTypes.string.isRequired,
		config: PropTypes.shape({
			url: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		}),
	}).isRequired,
	tags: PropTypes.arrayOf(PropTypes.string),
};
Share.defaultProps = {
	tags: [],
};

export default Share;