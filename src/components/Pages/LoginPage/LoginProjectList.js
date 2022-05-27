import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../Footer/Footer'
import Header from '../Header/Header'
import './LoginPage.css'

const LoginProjectList = ({Wallet}) => {

    const [personalProject,setPersonalProject] = useState([])
    const [personalJoinProject,setPersonalJoinProject] = useState([])

    const [personalProjectCount,setPersonalProjectCount] = useState(0)
    const [personalJoinProjectCount,setPersonalJoinProjectCount] = useState(0)

    useEffect(() => {
        getPersonalProject()
        getPersonalJoinProject()
    },[,personalProjectCount!=0,personalJoinProjectCount!=0])

    const getPersonalProject = async () => {
        // 發起的專案
        const Request = new FormData()
        Request.append("where",Wallet)
        const res = await fetch('http://192.192.140.209:9453/react/music/project/select/uid',{
            method: 'POST',
            body:Request,
            credentials: 'omit'
        })
        const resJson = await res.json()
        setPersonalProject(resJson)
        setPersonalProjectCount(1)
        console.log(resJson)
    }
    const displayMusicProjectList = (musicProjectList) => {
        // 發起專案的顯示
        return (
                <Link to = {'/loginprojectdetail/'+musicProjectList.pid} key={musicProjectList.pid}>
                    <div className="LoginProjectListDisplay">
                        {musicProjectList.project}
                    </div>
                </Link>
        )
    }

    const getPersonalJoinProject = async () => {
        // 發起的專案
        const Request = new FormData()
        Request.append("uid",Wallet)
        const res = await fetch('http://192.192.140.209:9453/react/music/project/member',{
            method: 'POST',
            body:Request,
            credentials: 'omit'
        })
        const resJson = await res.json()
        setPersonalJoinProject(resJson)
        setPersonalJoinProjectCount(1)
        console.log(resJson)
    }
    const displayMusicJoinProjectList = (musicJoinProjectList) => {
        // 發起專案的顯示
        return (
                <Link to = {'/loginprojectdetail/'+musicJoinProjectList.pid} key={musicJoinProjectList.pid}>
                    <div className="LoginProjectListDisplay">
                        {musicJoinProjectList.project}
                    </div>
                </Link>
        )
    }

    return (
        <div className="divnav">
            <div><Header wallet={ Wallet }/></div>
            <div>
                <h1 className='walletProject'>我發起的專案</h1>
                <div className="LoginProjectList">{personalProject.map(displayMusicProjectList)}</div>
            </div>
            <hr/>
            <div>
                <h1 className='walletProject'>我加入的專案</h1>
                <div className="LoginProjectList">{personalJoinProject.map(displayMusicJoinProjectList)}</div>
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default LoginProjectList