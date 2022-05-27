import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from '../../Footer/Footer'
import Header from '../Header/Header'
import trade_abi from './abi/trade.json'
import ERC1155_abi from './abi/abi.json'
import {ethers} from 'ethers'
import '../style.css'
import './NFTShow.css'

const NFTDetail =({Wallet})=>{
    const ERC1155Address='0x0CAb9D95bDDEC7eFC7b5B1C09472238F0bf70742'
    // const ERC1155Address='0x981A5b1E54b316Af39B5DdAdf5dAeE8879Afc68B'
    const TradeAddress='0x9D3d52e0B1c72F43662BE832DD09aaF2703d86ec'
    const param = useParams()
    const [provider ,setProvider] =useState(null)
    const [signer , setSigner] =useState(null)
    const [contract ,setContract] =useState(null)
    const [trade,setTrade]=useState(null)
    const [detailData,setDetailData]=useState([])
    const [en,setEn]=useState()
    const [img,setImg] = useState(null)
    const [video,setVideo] = useState("")
    const [priceAddListing,setpriceAddListing]=useState('')
    const [owner ,setOwner] = useState("buy")
    const [sell,setSell] = useState("sell")
    const [buyButton,setBuyButton] = useState('displayBuyButton')
    const [ownerwellet,setOwnerwellet]=useState('')
    const [collectionNameInfo,setCollectionNameInfo]=useState('')
    const [ownerInfo,setOwnerInfo]=useState('')
    const [nameInfo,setNameInfo]=useState('')
    const [tokenIdInfo,setTokenIdInfo]=useState('')
    const [descriptionInfo,setDescriptionInfo]=useState('null')
    const [price ,setPrice] =useState('')

    useEffect(() => {
        GetContract()
    },[])

    useEffect(() => {
        // display();
        // document.getElementById("video").src=img;
        // console.log(img)
    },[img])

    
    // 取得 Contract、取得 NFTDetail function
    const GetContract = async() => {
        // 指定要使用哪個合約
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
        let tempSigner = tempProvider.getSigner()
        let tempContract = new ethers.Contract(ERC1155Address,ERC1155_abi,tempSigner)
        let Trade = new ethers.Contract(TradeAddress,trade_abi,tempSigner)
        // console.log(Trade)
        setProvider(tempProvider)
        setSigner(tempSigner)
        setContract(tempContract)
        setTrade(Trade)

        // ----------------------------------------------------------------
        // 判斷 api 回傳值為 Img or Video
        const response = await fetch(`https://testnets-api.opensea.io/api/v1/asset/${param.contract}/${param.id}`)
        // https://testnets-api.opensea.io/api/v1/asset/0x9b1895bdd083cc0d2586af5ef15dd43c78c9b8e4/0
        const detailData = await response.json();
        console.log(detailData)
        setDetailData(detailData)
        

        // ----------------------------------------------------------------
        // 取得 NFT 資料
        const listings = await new ethers.Contract(TradeAddress,trade_abi,tempSigner).listings(detailData.asset_contract.address,detailData.top_ownerships[0].owner.address,detailData.token_id)
        setOwnerwellet(`/assets/${detailData.top_ownerships[0].owner.address}`)
        setCollectionNameInfo(detailData.collection.name)
        setOwnerInfo(detailData.top_ownerships[0].owner.address)
        setNameInfo(detailData.name)
        setTokenIdInfo(detailData.token_id)
        if (detailData.description === null) {
            setDescriptionInfo('null')
        }
        else {
            setDescriptionInfo(detailData.description)
        }
        if (detailData.animation_original_url === null) {
            setImg(detailData.image_original_url)
            // console.log(detailData.image_original_url)
        }
        else {
            setVideo(detailData.animation_original_url)
            // console.log('setVideo')
        }
        
        if(listings[0]/1000000000000000000 === 0) {
            setBuyButton('undisplayBuyButton')
            setPrice('目前尚未出售')
        }
        if (listings[0]/1000000000000000000 !== 0) {
            const NftPrice = (listings[0]/1000000000000000000).toString()
            console.log(NftPrice)
            setPrice(NftPrice)
        }

        // console.log(detailData.animation_url)
        // document.getElementById("video").src=detailData.animation_url
        display(detailData)
    }

    // const collectionNFT = async() => {
    //     const collection = await fetch(`https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${param.contract}`)
    //     const collectionJson = await collection.json();
    //     console.log(collectionJson)
    // }

    const displayInfo = () => {
        const walletString = String(ownerInfo)
        // console.log(walletString)
        const walletDisplay = walletString.substring(0,5) + '.......' + walletString.substring(38,42)
        // console.log(walletDisplay)
        return (
            <div className="NFTinfo">
                <div id="Test_Collection_Name" value="">收藏集：{collectionNameInfo}</div>
                <Link to = {ownerwellet}>
                    <div id='Owner' value="">擁有者：{walletDisplay}</div>
                </Link>
                <div id="Name" value="">NFT 名稱：{nameInfo}</div>
                <div id="TokenId" value="">Token 編號：{tokenIdInfo}</div>
                <div id="Description" value="">介紹：{descriptionInfo}</div>
                <div className = 'priceDiv'>
                    <div id='Test_Price' value="">價格：{price}</div>
                    <div id='buyNFTButton'>
                        <button className={owner} id={buyButton} onClick={purchaseWithdraw}>購買</button>
                    </div>
                    <div>
                        <input className={sell} id="price" type="text" placeholder="欲販售價格" value={priceAddListing} enabled={en} onChange={priceAddListingChange}/>
                        <button className={sell} onClick={addListing}>販售</button>
                    </div>
                </div>
            </div>
        )
    }

    // 顯示 function
    const display = (detailData) => {
        console.log(detailData)
        // 判斷該枚 NFT 的錢包位置是否與當前錢包地址一致，則該枚 NFT 為自己的。
        if (detailData !== undefined) {
            detailData.top_ownerships.map ((e) => {
                if (e.owner.address === Wallet) {
                    setSell("notSell")
                    setOwner("notbuy")
                }
                else {
                    setSell("sell")
                    setOwner("buy")
                }
            })
        }
        
        // 判斷當前的 INFO 為 Video or Img
        if (img === null) {
            return (
                <video src={video} autoPlay={true} controls={true} loop={true} width='100%' height='100%' />
            )
        }

        else {
            return (
                <img className="imgCSS" src = {img} />
            )
        }
    }

    // 販售 function
    const addListing = async() => {
        await trade.addListing(priceAddListing,detailData.asset_contract.address,detailData.token_id)
        // const addlisting = await trade.addListing(priceAddListing,detailData.asset_contract.address,detailData.token_id)
        // console.log(addlisting)
    }

    // 販售 input controller (雙向綁定)
    const priceAddListingChange = (e) => {
        setpriceAddListing(e.target.value)
    }

    // 許可 function
    const setApprovalForAll = async() => {
        const setApprovalForAll = await contract.setApprovalForAll(TradeAddress,'True')     
    }

    // 餘額 function
    const balance = async() => {
        const balance = await trade.balances(Wallet)
        alert('餘額'+ethers.utils.formatEther(balance))
    }

    // 購買 function
    const Purchase = async() => {
        // const setApprovalForAll=await contract.setApprovalForAll(TradeAddress,'True')
        const listing = await trade.listings(detailData.asset_contract.address,detailData.top_ownerships[0].owner.address,detailData.token_id)
        // const options = {value: ethers.utils.parseEther("1.0")}
        // const options={value: listing[0].toString()}
        let test = listing[0].toString()
        test = test.toString()
        // const options={value: BigInt(listing[0]*amount_purchase)}
        const options = {value: test}
        console.log(options)
        // const purchase=await trade.purchase(detailData.asset_contract.address,detailData.token_id,1,detailData.top_ownerships[0],options)
        const purchase = await trade.purchase("0x981A5b1E54b316Af39B5DdAdf5dAeE8879Afc68B",5,1,"0x28Db4d0c0b8C8573a0b9AD10a7aA1771a09d3A85",{value:'1000000000000000000'})

        // console.log("detailData.asset_contract.address :"+detailData.asset_contract.address)
        // console.log("detailData.token_id  :"+detailData.token_id)
        // console.log(options)
        // console.log(trade.purchase(contractAddress_purchase,tokenId_purchase,amount_purchase,walletAddress_purchase,options).call())
    }

    // 提取 function
    const withdraw = async() => {
        const balance = await trade.balances(Wallet)
        console.log(balance.toString())
        const withdraw = await trade.withdraw(balance.toString() ,Wallet)
    }
    // 最終購買版本（購買加提取）
    const purchaseWithdraw=async()=>{
        const listing = await trade.listings(detailData.asset_contract.address,detailData.top_ownerships[0].owner.address,detailData.token_id)
        console.log(listing.toString())
        let test = listing[0].toString()
        test = test.toString()
        const options = {value: test}
        console.log(options)
        // console.log(detailData.token_id)
        const purchaseWithdraw=await trade.purchasewithdraw(detailData.asset_contract.address,detailData.token_id,1,detailData.top_ownerships[0].owner.address,options)
        // console.log(purchaseWithdraw)
    }
    
    return(
        <div className="divnav">
            <div><Header wallet={ Wallet } />
                <div id="Test_NFT_Picture">{display()}</div>
                {displayInfo()}
            </div>
            <div><Footer /></div>
        </div>
    )
}
export {NFTDetail}

// document.getElementById("Test_Collection_Name").innerText = `收藏集： ${detailData.collection.name}`
        // document.getElementById("Test_Owner").innerText = `擁有者： ${detailData.top_ownerships[0].owner.address}`
        // document.getElementById("Test_Name").innerText = `NFT 名稱： ${detailData.name}`
        // document.getElementById("Test_TokenId").innerText = `Token 編號： ${detailData.token_id}`
        // document.getElementById("Test_Description").innerText = `介紹： ${detailData.description}`
        // document.getElementById("Test_Price").innerText = `價格：${price}`