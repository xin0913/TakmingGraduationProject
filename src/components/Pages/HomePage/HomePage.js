import Footer from '../../Footer/Footer'
import Header from '../Header/Header'
import '../style.css'
import './HomePage.css'
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"

const HomePage = ({Wallet}) => {
    // console.log(Object.values(Wallet))
    const [data,setdata] = useState([])
    const [selectResult,setSelectResult] = useState([])
    const [displayType,setDisplayType] = useState('image')
    const [dataCount,setdataCount] = useState(0)

    useEffect(() => {
        api()
        // console.log(Wallet)
    },[])
    useEffect(() => {
        imageDisplay()
    },[data])

    const api = async() => {
        // const response = await fetch('https://testnets-api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=0x9b1895bDD083Cc0d2586Af5eF15dD43c78c9B8e4&limit=100')
        const response = await fetch('https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=0x0CAb9D95bDDEC7eFC7b5B1C09472238F0bf70742&limit=100')
        const result = await response.json()
        console.log(result.assets)
        setdata(result.assets)
        setdataCount(1)
        if (dataCount !== 0) {
            // alert('reload')
            window.location.reload()
        }
    }

    const display = (data) => {
        if (displayType === 'image') {
            return (
                <div className='card' key={data.id}>
                    <Link className='cardLink' to={`/collections/${data.contract_address}/${data.token_id}`}>
                        <img className='cardImg' src={data.url}/>
                        <div>{data.name}</div>
                    </Link>
                </div>
            )
        }
        // console.log("879whuhicu")
        if (displayType === 'video') {
            return (
                <Link className='cardLink' to={`/collections/${data.contract_address}/${data.token_id}`} key={data.id}>
                    <div className='card'>
                        <video className="cardVideo" src={data.url} autoPlay={false} controls={true} loop={true} width='100%' height='100%' />
                        <div>{data.name}</div>
                    </div>
                </Link>
            )
        }
        if (displayType === 'audio') {
            console.log(data)
            return (
                <Link className='cardLink' to={`/collections/${data.contract_address}/${data.token_id}`} key={data.id}>
                    <div className='card'>
                        <video className="cardVideo" src={data.url} autoPlay={false} controls={true} loop={true} width='100%' height='100%' />
                        <div>{data.name}</div>
                    </div>
                </Link>
            )
        }
    }

    const imageDisplay = () => {
        setDisplayType('image')
        selectResult.splice(0,selectResult.length)
        data.map((dataInfo) => {
            // 若成立，表示該筆資料為圖片
            // console.log(dataInfo)
            if (dataInfo.image_original_url !== null) {
                // console.log('圖片：',dataInfo.image_original_url)
                selectResult.push({'url':dataInfo.image_original_url,'id':dataInfo.id,'contract_address':dataInfo.asset_contract.address,'token_id':dataInfo.token_id,'name':dataInfo.name})
            }
        })
        setSelectResult(selectResult)
    }

    const videoDisplay = () => {
        setDisplayType('video')
        selectResult.splice(0,selectResult.length)
        // console.log(selectResult)
        data.map(async (dataInfo) => {
            if (dataInfo.animation_original_url !== null) {
                const res = await fetch(dataInfo.animation_original_url)
                if (res.headers.get("Content-Type").substring(0,5) === 'video') {
                    // console.log('電影','url:',dataInfo.animation_original_url,'id:',dataInfo.id,'contract_address:',dataInfo.asset_contract.address,'token_id:',dataInfo.token_id)
                    const newValue = {'url':dataInfo.animation_original_url,'id':dataInfo.id,'contract_address':dataInfo.asset_contract.address,'token_id':dataInfo.token_id,'name':dataInfo.name}
                    // console.log(video)
                    setSelectResult(selectResult => [newValue,...selectResult])
                }
            }
        })
        // setSelectResult(selectResult)

    }



    const audioDisplay = () => {
        setDisplayType('audio')
        selectResult.splice(0,selectResult.length)
        // console.log(selectResult)
        data.map(async (dataInfo) => {
            if (dataInfo.animation_original_url !== null) {
                const res = await fetch(dataInfo.animation_original_url)
                if (res.headers.get("Content-Type").substring(0,5) === 'audio') {
                    // console.log('音樂','url:',dataInfo.animation_original_url,'id:',dataInfo.id,'contract_address:',dataInfo.asset_contract.address,'token_id:',dataInfo.token_id)
                    const newValue = {'url':dataInfo.animation_original_url,'id':dataInfo.id,'contract_address':dataInfo.asset_contract.address,'token_id':dataInfo.token_id,'name':dataInfo.name}
                    // console.log()
                    setSelectResult(selectResult => [newValue,...selectResult])
                    // setSelectResult(arr)
                }
            }
        })
    }

    return (
        <div className="divnav">
            <div><Header wallet={ Wallet }/></div>
            <div className="homePageList">
                <table className="functiontitle">
                    <tbody>
                        <tr>
                            <td>
                                <div>
                                    <nav>
                                        <ul className="inline-block-nav-center">
                                            <li onClick={imageDisplay}><a href='#'>圖片</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <nav>
                                        <ul className="inline-block-nav-center">
                                            <li onClick={videoDisplay}><a href='#'>電影</a></li>
                                        </ul>
                                    </nav>
                                </div>    
                            </td>
                            <td>
                                <div>
                                    <nav>
                                        <ul className="inline-block-nav-center">
                                            <li onClick={audioDisplay}><a href='#'>音樂</a></li>
                                        </ul>
                                    </nav>
                                </div>    
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='NFTMainDiv'>
                {selectResult.map(display)}
            </div>
            <div><Footer /></div>
        </div>
    )
}
export default HomePage
