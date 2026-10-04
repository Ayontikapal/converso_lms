"use client";
const Footer = () => {
  return (
    <footer className="border-t border-black bg-white py-8">
        <div className="footer">
          <div>©2026 Converso. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="mailto:support@converso.ai" className="footer-link">Contact Support</a>
            <button 
              onClick={() => alert("Privacy Policy: Converso respects your privacy and protects your personal data.")} 
              className="footer-link cursor-pointer bg-transparent border-0 p-0 font-normal"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => alert("Terms of Service: By using Converso, you agree to our standard AI session usage policies.")} 
              className="footer-link cursor-pointer bg-transparent border-0 p-0 font-normal"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>
  )
}

export default Footer