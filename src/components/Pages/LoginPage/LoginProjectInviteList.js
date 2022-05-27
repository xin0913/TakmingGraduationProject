import React from 'react'
import Footer from '../../Footer/Footer'
import Header from '../Header/Header'
import { useEffect, useState } from 'react'
import './LoginPage.css'


const LoginProjectInviteList = ({Wallet}) => {
    const [personalProjectList,setPersonalProjectList] = useState([])
    const [personalProjectCount,setPersonalProjectCount] = useState(0)
    useEffect(() => {
        getProjectInfo()
    },[,personalProjectCount!=0])

    const getProjectInfo = async () => {
        const Request = new FormData()
        Request.append("uid", Wallet)
        const res = await fetch('http://192.192.140.209:9453/react/music/invitation/uid',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        const resJson = await res.json()
        setPersonalProjectList(resJson)
        setPersonalProjectCount(1)

        console.log(resJson)
    }

    const acceptProjectInviteGetIndex = (pid,professional,pro1,pro2,pro3,pro4,pro5) => {
        // console.log(pid,professional,pro1,pro2,pro3,pro4,pro5)
        if (professional === pro1) {
            acceptProjectInvite(pid,1,pro1)
            // alert('成功加入專案')
        }
        else if (professional === pro2) {
            acceptProjectInvite(pid,2,pro2)
            // alert('成功加入專案')
        }
        else if (professional === pro3) {
            acceptProjectInvite(pid,3,pro3)
            // alert('成功加入專案')
        }
        else if (professional === pro4) {
            acceptProjectInvite(pid,4,pro4)
            // alert('成功加入專案')
        }
        else if (professional === pro5) {
            acceptProjectInvite(pid,5,pro5)
            // alert('成功加入專案')
        }
        else {
            alert('error')
        }
    }

    const acceptProjectInvite = (pid,index,pro) => {
        console.log(pid,pro,Wallet,index)
        declineProjectInvitation(pid,pro)
        // 新增至job (判斷是否滿人)
        const Request1 = new FormData()
        Request1.append("professional_id",index)
        Request1.append("pid",pid)
        Request1.append("professional",pro)
        Request1.append("uid", Wallet)
        fetch('http://192.192.140.209:9453/react/music/job/member',{
            method: 'POST',
            body: Request1,
            credentials: 'omit'
        })

        // 刪除
        // console.log(pid,pro,Wallet)
        // const Request2 = new FormData()
        // Request2.append("pid",pid)
        // Request2.append("professional",pro)
        // Request2.append("uid", Wallet)
        // fetch('http://192.192.140.209:9453/react/music/invitation/delete/finish',{
        //     method: 'POST',
        //     body: Request2,
        //     credentials: 'omit'
        // })
    }

    // 拒絕邀請
    const declineProjectInvitation = (pid,pro) => {
        console.log(pid,pro,Wallet)
        const Request = new FormData()
        Request.append("pid",pid)
        Request.append("professional",pro)
        Request.append("uid", Wallet)
        fetch('http://192.192.140.209:9453/react/music/invitation/delete/finish',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
    }

    const displayPersonalProjectList = (project) => {   
        console.log(project)     
        return(
            <div className='displayPersonalProjectListMapDiv' key={project.pid}>
                <div>專案名稱：{project.project}</div>
                <div>專業：{project.professional}</div>
                <div>介紹：{project.pdes}</div>
                <div>{project.seekpro1}：{project.seekpeo1}</div>
                <div>{project.seekpro2}：{project.seekpeo2}</div>
                <div>{project.seekpro3}：{project.seekpeo3}</div>
                <div>{project.seekpro4}：{project.seekpeo4}</div>
                <div>{project.seekpro5}：{project.seekpeo5}</div>
                <div>
                    <form onSubmit={() => acceptProjectInviteGetIndex(project.pid,project.professional,project.seekpro1,project.seekpro2,project.seekpro3,project.seekpro4,project.seekpro5)}>
                        <button className='buttonDisplay' type='submit'>接受邀請</button>
                    </form>
                    <form onSubmit={() => declineProjectInvitation(project.pid,project.professional)}>
                        <button className='buttonDisplay' type='submit'>拒絕邀請</button>
                    </form>
                </div>
                <hr></hr>
            </div>
        )
    }

    return (
        <div className="divnav">
            <div><Header wallet={Wallet}/></div>
            <div className="personalProjectListDiv">
                {personalProjectList.map(displayPersonalProjectList)}
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default LoginProjectInviteList