import  {Link} from 'react-router-dom'
import '../styles/logo.scss'
export default function Logo(){
return(
    <Link to="/">
          <span className="logo-text">KINOROOM</span>
    </Link>
)
}