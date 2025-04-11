/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLeaf,
    faSeedling,
    faTree,
    faCarrot
} from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    // Team members data with Font Awesome icons
    const teamMembers = [
        {
            name: 'Dan',
            icon: <FontAwesomeIcon icon={faSeedling} />,
            github: 'https://github.com/musserdn'
        },
        {
            name: 'Ike',
            icon: <FontAwesomeIcon icon={faTree} />,
            github: 'https://github.com/IkeAlmighty'
        },
        {
            name: 'Nat',
            icon: <FontAwesomeIcon icon={faCarrot} />,
            github: 'https://github.com/ngin2894'
        },
        {
            name: 'Lazuli',
            icon: <FontAwesomeIcon icon={faLeaf} />,
            github: 'https://github.com/kerriamber'
        },
    ];

    // Simplified CSS
    const footerStyle = css`
        background-color: #2c3e50;
        color: white;
        padding: 1rem 0;
        border-top: 3px solid #84b254;
    `;

    const containerStyle = css`
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        text-align: center;
    `;

    const footerContentStyle = css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        
        @media (min-width: 768px) {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    `;

    const logoStyle = css`
        h3 {
            color: #84b254;
            margin-bottom: 0.5rem;
        }
        
        p {
            margin-bottom: 0.5rem;
        }
    `;

    const teamGridStyle = css`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    `;

    const teamMemberStyle = css`
        text-align: center;
        
        .icon {
            background-color: rgba(132, 178, 84, 0.2);
            color: #84b254;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 0.5rem;
        }
        
        a {
            color: white;
            text-decoration: none;
            
            &:hover {
                color: #84b254;
            }
        }
    `;

    const githubButtonStyle = css`
        display: inline-flex;
        align-items: center;
        background-color: #84b254;
        color: white;
        padding: 0.4rem 0.75rem;
        border-radius: 4px;
        text-decoration: none;
        margin-top: 0.5rem;
        
        &:hover {
            background-color: #6b9242;
        }
    `;

    const copyrightStyle = css`
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.8rem;
    `;

    return (
        <footer css={footerStyle}>
            <div css={containerStyle}>
                <div css={footerContentStyle}>
                    <div css={logoStyle}>
                        <h3>SproutSwap</h3>
                        <p>A community platform for plant enthusiasts</p>
                        <p>to share knowledge and trade plants.</p>
                        <a
                            href="https://github.com/musserdn/SproutSwap"
                            target="_blank"
                            rel="noopener noreferrer"
                            css={githubButtonStyle}
                        >
                            <FontAwesomeIcon icon={faGithubAlt} style={{ marginRight: '0.4rem' }} /> GitHub
                        </a>
                    </div>

                    <div>
                        <h4 style={{ color: '#84b254', marginBottom: '0.5rem' }}>Our Team</h4>
                        <div css={teamGridStyle}>
                            {teamMembers.map((member, index) => (
                                <div key={index} css={teamMemberStyle}>
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="icon">
                                            {member.icon}
                                        </div>
                                        {member.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div css={copyrightStyle}>
                    <p>© {new Date().getFullYear()} SproutSwap. All rights reserved. Made with <FontAwesomeIcon icon={faLeaf} style={{ color: '#84b254' }} /> by plant lovers, for plant lovers</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
