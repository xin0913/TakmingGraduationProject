import Footer from '../../Footer/Footer'
import Header from '../Header/Header'
import { useParams } from "react-router-dom";

import './NFTShow.css'
import { useState ,useEffect } from 'react'
import {NFT} from "./NFT"


const NFTPage = ({Wallet}) => {

    const [Nfts,setNft]=useState([])
    const [walletDisplay,setWalletDisplay] = useState('')
    useEffect(() => {
        setWallet()
    },[])
    const param = useParams()
    const GetContract = async() => {  
        if(!Wallet) return
        console.log(Wallet)
        console.log(param.wallet)
        if(param.wallet === undefined) {
            
        }
        else {
            Wallet=param.wallet
        }
        const response = await fetch("https://testnets-api.opensea.io/api/v1/assets?&order_direction=desc&limit=100&owner="+Wallet)
        const data = await response.json()
        console.log(data.assets)
        setNft(data.assets)
    }

    const setWallet = () => {
        if (param.wallet === undefined) {
            setWalletDisplay('我')
        }
        if (param.wallet !== undefined) {
            const walletString = String(param.wallet)
            setWalletDisplay(walletString.substring(0,5) + '.......' + walletString.substring(38,42))
        }
    }
    
    useEffect(()=>{
        GetContract()
    },[Wallet])

    return (
        <div className="divnav">
            <div><Header wallet={ Wallet } /></div>
            <h1 className="walletNFT">{walletDisplay}的 NFT</h1>
            <div className='NFTMainDiv'><NFT nfts={Nfts}/></div>
            <div><Footer /></div>
        </div>
    )
}
export default NFTPage
