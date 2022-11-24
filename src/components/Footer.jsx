import './footer.scss'

export default function Footer() {
  return (
    <div className='outer-footer'>
      <footer className='footer'>
        <div className='footer__company-info'>
          <ul>
            <h3>Company</h3>
            <li>Our History</li>
            <li>Fundraising</li>
            <li>The Icarus Blog</li>
          </ul>
          <ul>
            <h3>Careers</h3>
            <li>Store Jobs</li>
            <li>Corporate Jobs</li>
            <li>Distribution Jobs</li>
          </ul>
          <ul>
            <h3>Food</h3>
            <li>Nutrition</li>
            <li>Gluten-free</li>
            <li>Food Quality</li>
          </ul>
          <ul>
            <h3>Connect</h3>
            <li>Contact Us</li>
            <li>Buy Merch</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div className='footer__apps'>  
          <img src="https://cdn-icons-png.flaticon.com/512/44/44646.png" alt="Facebook" />
          <img src="https://cdn-icons-png.flaticon.com/512/81/81609.png" alt="Twitter" />
          <img src="https://cdn-icons-png.flaticon.com/512/87/87390.png" alt="Instagram" />
          <a href="https://www.linkedin.com/in/kerry-kemar-joseph/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/61/61109.png" alt="LinkedIn" />
          </a>
        </div>

        <div className='footer__terms'>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>California Privacy Policy</p>
          <p>Do Not Sell My Information</p>
          <p>¿Español?</p>
          <p>©2022-2022 Icarus Pizza Enterprises, Inc. All rights reserved. Icarus Pizza® Pizza name, logos and related marks are trademarks licensed to Icarus Pizza Enterprises, Inc.</p>
        </div>
      </footer>
    </div>
  )
}