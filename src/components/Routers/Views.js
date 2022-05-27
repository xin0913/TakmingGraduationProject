import { BrowserRouter,Routes,Route } from "react-router-dom"
import HomePage from '../Pages/HomePage/HomePage'
import MoviePage from '../Pages/MoviePage/MoviePage'
import MusicPage from '../Pages/MusicPage/MusicPage'
import NFTPage from '../Pages/NFTPage/NFTPage'
import UploadToIPFS from "../Pages/NFTPage/UploadToIPFS"
import MusicMatchPage from '../Pages/MusicPage/MusicMatchPage'
import MovieMatchPage from '../Pages/MoviePage/MovieMatchPage'
import MusicConsultPage from '../Pages/MusicPage/MusicConsultPage'
import MovieConsultPage from '../Pages/MoviePage/MovieConsultPage'
import MovieConsultDetailPage from '../Pages/MoviePage/MovieConsultDetailPage'
import MusicConsultDetailPage from '../Pages/MusicPage/MusicConsultDetailPage'

import LoginPage from "../Pages/LoginPage/LoginPage"
import LoginProjectList from "../Pages/LoginPage/LoginProjectList"
import LoginProjectDetail from "../Pages/LoginPage/LoginProjectDetail"
import LoginProjectInviteList from "../Pages/LoginPage/LoginProjectInviteList"
import MusicChooseMajorDetail from '../Pages/MusicPage/MusicChooseMajorDetail'
import MovieChooseMajorDetail from '../Pages/MoviePage/MovieChooseMajorDetail'

import { NFTDetail } from "../Pages/NFTPage/NFTDetail"
import { useEffect, useState } from "react"

const Views = () => {
    const[Wallet,SetWallet] = useState(null)

    useEffect (() => {
        Button_Wallet()
    }, [])

    const Button_Wallet = async () => {
        
        const accounts = await window.ethereum.request({method :'eth_requestAccounts'})
        // console.log(accounts[0])
        SetWallet(accounts[0])
        // // console.log(Wallet)


        // if (typeof window.ethereum==="undefined") {
        //     alert("請先安裝MetaMask")
        // }
        

        // if (count!==0&&Wallet === null) {
            // Button_Wallet()
            // alert('正在連接MetaMask')
        // }
        // setCount(count+1)
    }

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage Wallet={Wallet}/>} />
            <Route path="/moviepage" element={<MoviePage Wallet={Wallet}/>} />
            <Route path="/musicpage" element={<MusicPage Wallet={Wallet}/>} />
            <Route path="/nftpage" element={<NFTPage Wallet={Wallet}/>} />
            <Route path="/collections/:contract/:id" element={<NFTDetail Wallet={Wallet}/>} />
            <Route path="/assets/:wallet" element={<NFTPage Wallet={Wallet}/>} />
            <Route path="/uploadtoipfs" element={<UploadToIPFS Wallet={Wallet}/>} />
            <Route path="/musicmatchpage" element={<MusicMatchPage Wallet={Wallet}/>} />
            <Route path="/moviematchpage" element={<MovieMatchPage Wallet={Wallet}/>} />
            <Route path="/musicconsultpage" element={<MusicConsultPage Wallet={Wallet}/>} />
            <Route path="/movieconsultpage" element={<MovieConsultPage Wallet={Wallet}/>} />
            <Route path="/movieconsulthistorypage/:qid" element={<MovieConsultDetailPage Wallet={Wallet}/>} />
            <Route path="/musicconsulthistorypage/:qid" element={<MusicConsultDetailPage Wallet={Wallet}/>} />
            <Route path="/musicchoosemajordetail/:uid" element={<MusicChooseMajorDetail Wallet={Wallet}/>} />
            <Route path="/moviechoosemajordetail/:uid" element={<MovieChooseMajorDetail Wallet={Wallet}/>} />
            <Route path="/loginpage" element={<LoginPage Wallet={Wallet}/>} />
            <Route path="/loginprojectlist" element={<LoginProjectList Wallet={Wallet}/>} />
            <Route path="/loginprojectdetail/:pid" element={<LoginProjectDetail Wallet={Wallet}/>} />
            <Route path="/loginprojectinvitelist" element={<LoginProjectInviteList Wallet={Wallet}/>} />
            <Route path="*" element={<h1 align='center'>404 Not Found!</h1>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default Views