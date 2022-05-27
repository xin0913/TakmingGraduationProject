import Footer from '../../Footer/Footer'
import Header from '../Header/Header'
import '../style.css'
import './MusicPage.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const MusicChooseMajorDetail = ({Wallet}) => {
    const params = useParams()
    const [projectPidSelect,setProjectPidSelect] = useState('')
    const [detail,setDetail] = useState([])
    const [personalProject,setPersonalProject] = useState([])
    const [count,setCount] = useState(0)
    useEffect(() => {
        getPersonalProfile()
        getPersonalProject()
    },[])

    const getProjectSelect = (e) => {
        // const array = e.target.value.split(',')
        // console.log(array)
        setProjectPidSelect(e.target.value)
        // console.log('name',array[0])
        // console.log('pid',array[1])
    }

    // 取得該uid的資料
    const getPersonalProfile = async () => {
        const Request = new FormData()
        Request.append("where", params.uid)
        const res = await fetch('http://192.192.140.209:9453/react/music/profile/select/uid',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        const resJson = await res.json()
        setDetail(resJson[0])
        // console.log(resJson[0])
    }

    const getPersonalProject = async () => {
        const Request = new FormData()
        Request.append("where", Wallet)
        const res = await fetch('http://192.192.140.209:9453/react/music/project/select/uid',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        const resJson = await res.json()
        setPersonalProject(resJson)
        console.log(resJson)
    }

    const invite = () => {
        const Request = new FormData()
        Request.append("pid", projectPidSelect)
        Request.append("professional", detail.professional)
        Request.append("uid", detail.uid)
        fetch('http://192.192.140.209:9453/react/music/invitation/add/finish',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        alert('邀請成功')
        // console.log("pid", projectPidSelect)
        // console.log("project", detail.professional)
        // console.log("uid", detail.uid)
    }

    const displayOption = (option) => { 
        return (
            <option key={option.pid} value={option.pid}>{option.project}</option>
        )        
    }

    return (
        <div className="divnav">
            <div><Header wallet={ Wallet }/></div>
            <div className='DisplayMainDiv'>
                <div className='DisplayDetailDiv'>錢包地址：{detail.uid}</div>
                <div className='DisplayDetailDiv'>名稱：{detail.name}</div>
                <div className='DisplayDetailDiv'>所在地：{detail.area}</div>
                <div className='DisplayDetailDiv'>專業：{detail.professional}</div>
                <div className='DisplayDetailDiv'>介紹：{detail.introduction}</div>
                <div className='DisplayDetailDiv'><img src={detail.pic}></img></div>
                <div className='DisplayDetailDiv'>
                    <form onSubmit={invite}>
                        <select onChange={getProjectSelect}>
                            <option>請選擇專案</option>
                            {personalProject.map(displayOption)}
                        </select>
                        <button  className='DisplayDetailButton' type='submit'>邀請</button>
                    </form>
                </div>
                
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default MusicChooseMajorDetail