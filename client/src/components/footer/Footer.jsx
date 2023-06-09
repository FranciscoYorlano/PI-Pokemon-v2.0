// ======================== Styles
import styles from "./footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.left}>
                2023 by
                <span>
                    <a
                        href="https://github.com/FranciscoYorlano"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Francisco Yorlano
                    </a>
                </span>
            </div>
            <div className={styles.right}>
                <a
                    href="https://github.com/FranciscoYorlano/PI-Pokemon-v2.0"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/francisco-yorlano/"
                    target="_blank"
                    rel="noreferrer"
                >
                    LinkedIn
                </a>
            </div>
        </footer>
    );
};

export default Footer;
