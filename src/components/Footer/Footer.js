import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud , faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
  return (
    <footer className="footer py-4">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-4 text-lg-start">SunTeamTW's First draft</div>
                <div className="col-lg-4 my-3 my-lg-0">
                  <a className="btn btn-dark btn-social mx-2" href='https://reurl.cc/emoEAW'>
                    <FontAwesomeIcon icon={ faCloud } size="1x" />
                  </a>
                  <a className="btn btn-dark btn-social mx-2" href='https://reurl.cc/43MaOL'>        
                    <FontAwesomeIcon icon={ faGithub } size="1x" />
                  </a>
                  <a className="btn btn-dark btn-social mx-2" href='https://www.instagram.com/09882.0.78/'>
                    <FontAwesomeIcon icon={ faAddressCard } size="1x" />
                  </a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer