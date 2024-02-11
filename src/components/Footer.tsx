import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

interface FooterContainerProps {
	isVisible: boolean;
}

const FooterContainer = styled.footer<FooterContainerProps>`
	background-color: #f8f9fa;
	color: #333;
	text-align: center;
	padding: 10px 0;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
	transform: translateY(${props => (props.isVisible ? "0" : "100%")});
	opacity: ${props => (props.isVisible ? 0.9 : 0)};
    // opacity: 0.9; /* Przykładowa przezroczystość */

`;

const FooterText = styled.p`
	margin: 0;
	padding: 0;
`;

const FooterLink = styled.a`
	color: #007bff;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

const Footer = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 150) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);

		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	return (
		<FooterContainer isVisible={isVisible}>
			<FooterText>
				<FooterLink
					href='https://github.com/WojciechCholewinski'
					target='_blank'
					rel='noopener noreferrer'>
					<div>
						<FontAwesomeIcon icon={faGithub} /> Wojciech Cholewiński
					</div>
				</FooterLink>
			</FooterText>
		</FooterContainer>
	);
};

export default Footer;
