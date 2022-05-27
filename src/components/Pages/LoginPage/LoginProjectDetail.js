import { useEffect, useState} from 'react'
import Footer from '../../Footer/Footer'
import Header from '../Header/Header'
import { useParams } from 'react-router-dom'

const LoginProgectDetail = ({ Wallet }) => {
    const params = useParams()
    const [buttonDisplay,setButtonDisplay] = useState('unbuttonDisplay')
    const [projectInfoJson,setProjectInfoJson] = useState([])
    const [projectPeopleInfoJson,setProjectPeopleInfoJson] = useState([])
    const [projectName,setProjectName] = useState('')
    const [projectDescription,setProjectDescription] = useState('')
    const [jobOneCount, setJobOneCount] = useState('')
    const [jobTwoCount, setJobTwoCount] = useState('')
    const [jobThreeCount, setJobThreeCount] = useState('')
    const [jobFourCount, setJobFourCount] = useState('')
    const [jobFiveCount, setJobFiveCount] = useState('')
    useEffect(() => {
        projectInfo()
        projectPeopleInfo()
    },[])

    // 該專案detail
    const projectInfo = async () => {
        const Request = new FormData()
        Request.append("where",params.pid)
        const res = await fetch('http://192.192.140.209:9453/react/music/project/select/pid',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        const resJson = await res.json()
        setProjectInfoJson(resJson[0])
        // console.log(resJson[0])
        if (Wallet === resJson[0].uid) {
            setButtonDisplay('buttonDisplay')
        }
        setProjectName(resJson[0].project)
        setProjectDescription(resJson[0].pdes)
        setJobOneCount(resJson[0].seekpeo1)
        setJobTwoCount(resJson[0].seekpeo2)
        setJobThreeCount(resJson[0].seekpeo3)
        setJobFourCount(resJson[0].seekpeo4)
        setJobFiveCount(resJson[0].seekpeo5)
        
    }

    const sendForm = () => {
        // 更改專案detail
        const Request = new FormData()
        Request.append("pid", projectInfoJson.pid)
        Request.append("Project Name", projectName)
        Request.append("Project Description", projectDescription)
        Request.append("seekpro", projectInfoJson.seekpro1)
        Request.append("seekpeo", jobOneCount)
        Request.append("seekpro2", projectInfoJson.seekpro2)
        Request.append("seekpeo2", jobTwoCount)
        Request.append("seekpro3", projectInfoJson.seekpro3)
        Request.append("seekpeo3", jobThreeCount)
        Request.append("seekpro4", projectInfoJson.seekpro4)
        Request.append("seekpeo4", jobFourCount)
        Request.append("seekpro5", projectInfoJson.seekpro5)
        Request.append("seekpeo5", jobFiveCount)

        fetch('http://192.192.140.209:9453/react/music/project/update',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        alert('成功更改')
    }
    const sendRemoveMember = (info) => {
        // console.log(info.jid)
        // alert('123123123123')
        const Request = new FormData()
        Request.append("jid", info.jid)
        fetch('http://192.192.140.209:9453/react/music/job/delete/finish',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
    }
    const getProjectName = (e) => {
        setProjectName(e.target.value)
    }
    const getProjectDescription = (e) => {
        setProjectDescription(e.target.value)
        // console.log(e.target.value)
    }
    const jobOneCountChange = (e) => {
        setJobOneCount(e.target.value)
        // console.log(typeof e.target.value)
    }
    const jobTwoCountChange = (e) => {
        setJobTwoCount(e.target.value)
    }
    const jobThreeCountChange = (e) => {
        setJobThreeCount(e.target.value)
    }
    const jobFourCountChange = (e) => {
        setJobFourCount(e.target.value)
    }
    const jobFiveCountChange = (e) => {
        setJobFiveCount(e.target.value)
    }

    const projectPeopleInfo = async () => {
        // 專案成員
        const Request = new FormData()
        Request.append("where",params.pid)
        const res = await fetch('http://192.192.140.209:9453/react/music/job/select/pid',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        const resJson = await res.json()
        setProjectPeopleInfoJson(resJson)
        console.log(resJson)
    }

    const displayProjectPeopleInfo = (info) => {
        return (
            <div key={info.uid}>
                <hr/>
                <div>錢包地址：{info.uid}</div>
                <div>專業：{info.professional}</div>
                <button onClick={() => sendRemoveMember(info)} type='submit' className={buttonDisplay}>從專案中移除</button>
            </div>
        )
    }

    return (
        <div className="divnav">
            <div><Header wallet={Wallet}/></div>
            <div>
                <form onSubmit={sendForm}>
                    <table className="LoginProjectDetailTable">
                        <tbody>
                            <tr>
                                <td>專案編號</td>
                                <td>{projectInfoJson.pid}</td>
                            </tr>
                            <tr>
                                <td>專案名稱</td>
                                <td><input required type="text" value={projectName} onChange={getProjectName} /></td>
                            </tr>
                            <tr>
                                <td>專案介紹</td>
                                <td><input required type="text" value={projectDescription} onChange={getProjectDescription} /></td>
                            </tr>
                            <tr>
                                <td>{projectInfoJson.seekpro1}</td>
                                <td><input required type="number" value={jobOneCount} onChange={jobOneCountChange} min="1"/></td>
                            </tr>
                            <tr>
                                <td>{projectInfoJson.seekpro2}</td>
                                <td><input required type="number" value={jobTwoCount} onChange={jobTwoCountChange} min="1"/></td>
                            </tr>
                            <tr>
                                <td>{projectInfoJson.seekpro3}</td>
                                <td><input required type="number" value={jobThreeCount} onChange={jobThreeCountChange} min="1"/></td>
                            </tr>
                            <tr>
                                <td>{projectInfoJson.seekpro4}</td>
                                <td><input required type="number" value={jobFourCount} onChange={jobFourCountChange} min="1"/></td>
                            </tr>
                            <tr>
                                <td>{projectInfoJson.seekpro5}</td>
                                <td><input required type="number" value={jobFiveCount} onChange={jobFiveCountChange} min="1"/></td>
                            </tr>
                            
                            <tr className={buttonDisplay} >
                                <td><button colSpan='3' type='submit'>確認修改</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>{projectPeopleInfoJson.map(displayProjectPeopleInfo)}</td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default LoginProgectDetail