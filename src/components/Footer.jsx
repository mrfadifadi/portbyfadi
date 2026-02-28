import { useLang } from '../context/LanguageContext';

export default function Footer() {
    const { t } = useLang();

    return (
        <footer className="footer">
            <p className="footer__text">{t.footer.text}</p>
        </footer>
    );
}
