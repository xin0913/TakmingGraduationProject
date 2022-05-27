import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'

import PageList from '../../Routers/PageList'
import './Header.css'

const Header = ({wallet}) => {
    const walletString = String(wallet)
    const walletDisplay = walletString.substring(0,5) + '.......' + walletString.substring(38,42)
    // console.log(walletDisplay)
    // console.log(walletString.substring(0,4))
    return (
        <table className="title">
            <tbody>
                <tr>
                    <td className="theme"><a href='/'><FontAwesomeIcon icon={ faSun } size="1x" /> 合你藝起區塊樂吧</a></td>
                    <td className="navigationBar" rowSpan="2"><PageList /></td>
                </tr>
                <tr>
                    <td className="theme">錢包地址：{walletDisplay}</td>
                </tr>
            </tbody>
        </table>
        
    )
}

export default Header