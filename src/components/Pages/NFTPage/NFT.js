import Card from "./Card";
import './NFTShow.css'

const NFT =({nfts})=>{
    // const [fileURL,setfileURL] = useState(null)  
    // console.log(nfts)
    return(
        <div className='cardMainDiv'>
            {nfts.map((Nft, id) => {return <Card nft={Nft} key={id}/>})}
        </div>
    )
}
export {NFT}