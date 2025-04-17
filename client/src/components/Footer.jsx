import { useState } from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLeaf,
    faSeedling,
    faTree,
    faCarrot,
    faSunPlantWilt
} from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import confetti from 'canvas-confetti';

const Footer = () => {
    // Track if confetti has been triggered
    const [confettiTriggered, setConfettiTriggered] = useState(false);

    // Function to trigger confetti explosion
    const triggerConfetti = () => {
        setConfettiTriggered(true);
        
        // Create confetti explosion
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.8 },
            colors: ['#84b254', '#2c3e50', '#f39c12', '#3498db', '#e74c3c']
        });
        
        // Reset the state after a short delay
        setTimeout(() => setConfettiTriggered(false), 1000);
    };

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
        {
            icon: <FontAwesomeIcon icon={faSunPlantWilt} className={confettiTriggered ? styles.spinning : ''} />,
            onClick: triggerConfetti,
            isButton: true
        }
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.logo}>
                        <h3>SproutSwap</h3>
                        <p>A community platform for plant enthusiasts</p>
                        <p>to share knowledge and trade plants.</p>
                        <a
                            href="https://github.com/musserdn/SproutSwap"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.githubButton}
                        >
                            <FontAwesomeIcon icon={faGithubAlt} style={{ marginRight: '0.4rem' }} /> GitHub
                        </a>
                    </div>

                    <div>
                        <h4 className={styles.teamTitle}>Our Team</h4>
                        <div className={styles.teamGrid}>
                            {teamMembers.map((member, index) => (
                                <div key={index} className={styles.teamMember}>
                                    {member.isButton ? (
                                        <button 
                                            onClick={member.onClick}
                                            className={styles.confettiButton}
                                        >
                                            <div className={styles.icon}>
                                                {member.icon}
                                            </div>
                                            {member.name}
                                        </button>
                                    ) : (
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div className={styles.icon}>
                                                {member.icon}
                                            </div>
                                            {member.name}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.copyright}>
                    <p>© {new Date().getFullYear()} SproutSwap. All rights reserved. Made with <FontAwesomeIcon icon={faLeaf} className={styles.leafIcon} /> by plant lovers, for plant lovers</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
