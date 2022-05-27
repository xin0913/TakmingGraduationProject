import { Link } from "react-router-dom";

import './NFTShow.css'

const Card =({nft})=>{
    console.log(nft)
    const display = () => {
        // display imgages
        if (nft.animation_original_url === null && nft.image_original_url !== null) {
            return(
                <Link className="cardLink" to={`/collections/${nft.asset_contract.address}/${nft.token_id}`}>
                    {/* Ethereum Rinkeby TestNet */}
                    <img className="cardImg" src={nft.image_original_url} />
                    <div>{nft.name}</div>
                </Link>
            )
        }

        else if (nft.image_original_url === null && nft.animation_original_url === null || nft.token_metadata === null) {
            return (
                <div className="cardLink">
                    <img className="cardImg" src='https://testnets.opensea.io/static/images/placeholder.png'></img>
                    <div>該枚NFT資料不完整</div>
                </div>
            )
        }

        else {
            return(
                <Link className="cardLink" to={`/collections/${nft.asset_contract.address}/${nft.token_id}`}>
                    {/* Ethereum Rinkeby TestNet */}
                    <video className="cardVideo" src={nft.animation_original_url} autoPlay={false} controls={true} loop={true} width='100%' height='100%' />
                    <div>{nft.name}</div>
                </Link>
            )
        }
    }
    return(
        <div className="card">
            {/* Ethereum Rinkeby TestNet */}
            {display()}

            {/* Ethereum Main */}
            {/* <Link to={`/collections/${nft.contract}/${nft.tokenId}`}><img src={nft.meta.content[2].url} /></Link> */}
        </div>

    )
}
export default Card