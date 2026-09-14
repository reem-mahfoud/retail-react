import './LoginHeroPanel.css';

const pub = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
const LOGIN_HERO_SRC = `${pub}/images/login-hero.jpg`;

export default function LoginHeroPanel() {
  return (
    <section className="login-hero-panel" aria-hidden>
      <img
        src={LOGIN_HERO_SRC}
        alt=""
        className="login-hero-panel__img"
        decoding="async"
        loading="eager"
        fetchPriority="high"
      />
    </section>
  );
}
