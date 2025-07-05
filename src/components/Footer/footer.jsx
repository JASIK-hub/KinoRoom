import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram'
import Logo from '../../smallElems/logo'
import './footer.scss'
export default function Footer(){
    return(
        <footer className='footer'>
            <hr />
            <div className="footer__outer">
                <div className="footer__inner">
                <div className="footer__icons" >
                    <TwitterIcon sx={{color:'white'}} />
                    <FacebookIcon sx={{color:'white'}}/>
                    <a href="https://www.instagram.com/abd_zhasik/"><InstagramIcon sx={{color:'white'}}/></a>
                    <a href="https://t.me/JasulanAsanuly"><TelegramIcon sx={{color:"white"}}/></a>
                </div>
                <div className="footer__info_global">
                     <Logo/>
                    <div className="footer_info About">
                        <h4 >About</h4>
                        <a href="">Vacancies</a>
                        <a href="">Information for Partners</a>
                        <a href="">Advertising Placement</a>
                        <a href="">User Agreement</a>
                        <a href="">Privacy Policy</a>
                    </div>
                    <div className="footer_info Help">
                        <h4 >Help</h4>
                        <a href="">Questions and Answers</a>
                        <a href="">List of Devices</a>
                        <a href="">For distributors</a>
                        <a href="">Contacts</a>
                    </div>
                    <div className="footer_info Others">
                        <h4>Other</h4>
                        <a href="">Promoton and Offers</a>
                        
                    </div>
                </div>
                </div>
                <p>© 2024–2025 <br/>Abdybay Zhasulan. <br/>
                    This website was created as a personal project to experiment, learn, and have a little fun with web development.
                    No commercial use, no tracking, no pressure.
                    <br/>All content is hand-made.<br/>User Agreement | Privacy Policy | Feedback
                </p>
               
            </div>
        </footer>
    )
}
