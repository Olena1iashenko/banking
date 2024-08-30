const Footer = ({ user, type = "desktop" }: FooterProps) => {
  return (
    <footer className="footer">
      <div
        className={
          type === "mobile" ? "footer_name-mobile" : "footer_name-desktop"
        }
      >
        <p className="text-xl font-bold text-gray-700">{user.firstName[0]}</p>
      </div>
      <div
        className={
          type === "mobile" ? "footer_email-mobile" : "footer_email-desktop"
        }
      >
        <h1 className="text-14 truncate font-normal text-gray-600">
          {user.name}
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
