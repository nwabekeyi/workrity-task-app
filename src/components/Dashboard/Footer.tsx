import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="text-center py-6 text-sm">
      <p>
        &copy; {currentYear} Workity.
      </p>
    </footer>
  );
};

export default Footer;
