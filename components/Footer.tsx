const Footer = () => {
  return (
    <footer className="border-t border-black bg-white py-8">
        <div className="footer">
          <div>©2026 Converso. All rights reserved.</div>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Contact Support'].map((item, i) => (
              <a key={i} href="#" className="footer-link">{item}</a>
            ))}
          </div>
        </div>
      </footer>
  )
}

export default Footer