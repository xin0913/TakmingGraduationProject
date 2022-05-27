import Footer from '../../Footer/Footer'
import Header from '../Header/Header'
import MusicFeatureSelection from './MusicFeatureSelection'
import MusicChooseMajor from './MusicChooseMajor'
import '../style.css'

const MusicPage = ({Wallet}) => {
    return (
        <div className="divnav">
            <div><Header wallet={ Wallet } /></div>
            <div><MusicFeatureSelection /></div>
            <div><MusicChooseMajor/></div>
            <div><Footer /></div>
        </div>
    )
}
export default MusicPage