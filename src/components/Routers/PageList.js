import {React} from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faImage, faMusic, faFilm, faHouse, faUpload } from '@fortawesome/free-solid-svg-icons'

const PageList = () => {
  // const accounts = window.ethereum.request({method :'eth_requestAccounts'})

  // console.log(accounts[0])
  // SetWallet(accounts[0])
  // console.log(Wallet)


  // if (typeof window.ethereum==="undefined") {
  //     alert("請先安裝MetaMask")
  // }
  
  return (
    <div>
      <nav>
          <ul className="inline-block-nav">
            <li><a href="/"><FontAwesomeIcon icon={ faHouse } size="1x" /> NFT 市集 </a></li>
            <li><a href="/moviepage"><FontAwesomeIcon icon={ faFilm } size="1x" /> 電影媒合 </a></li>
            <li><a href="/musicpage"><FontAwesomeIcon icon={ faMusic } size="1x" /> 音樂媒合 </a></li>
            <li><a href="/UploadToIPFS"><FontAwesomeIcon icon={ faUpload } size="1x" /> NFT 上傳 </a></li>
            <li><a href="/nftpage"><FontAwesomeIcon icon={ faImage } size="1x" /> 我的收藏 </a></li>
            <li><a href="/loginpage"><FontAwesomeIcon icon={ faUser } size="1x" /> 個人資料 </a></li>
            
          </ul>
      </nav>
    </div>
  )
}

export default PageList
