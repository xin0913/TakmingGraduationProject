import Footer from '../../Footer/Footer'
import Header from '../Header/Header'
import MovieFeatureSelection from './MovieFeatureSelection'
import MovieChooseMajor from './MovieChooseMajor'
import '../style.css'

const MoviePage = ({Wallet}) => {
    return (
        <div className="divnav">
            <div><Header wallet={ Wallet } /></div>
            <div><MovieFeatureSelection /></div>
            <div><MovieChooseMajor/></div>
            <div><Footer /></div>
        </div>
    )
}
export default MoviePage