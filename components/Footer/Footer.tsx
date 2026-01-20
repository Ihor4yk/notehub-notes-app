import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Ihor</p>
          <p>
            Contact us:
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ihorlyashenyk@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              ihorlyashenyk@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
