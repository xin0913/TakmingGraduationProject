import Footer from '../../Footer/Footer'
import Header from '../Header/Header'
import { useState, useEffect } from 'react'
import { create } from 'ipfs-http-client'
import './LoginPage.css' 
import LoginFeatureSelection from './LoginFeatureSelection'


const LoginPage = ({Wallet}) => {
    const client = create('https://ipfs.infura.io:5001/api/v0')
    const [file,setFile] = useState("") // 取得 file 的值
    const [name,setName] = useState("")
    const [img,setImg] = useState("")
    const [work,setWork] = useState("")
    const [intro,setIntro] = useState("")
    const [bornDate,setBornDate] = useState("")
    const [area,setArea] = useState("")
    const [pro,setPro] = useState("")
    const [proChoice,setProChoice] = useState("")
    const [profession,setProfession] = useState([])
    const [personalInfo,setPersonalInfo] = useState([])
    const [personalTableDisplay,setPersonalTableDisplay] = useState("")
    const [loginTableDisplay,setLoginTableDisplay] = useState("")
    const [personalInfoCount,setPersonalInfoCount] = useState(0)

    useEffect(() => {
        getPersonalInfo()
        // console.log(personalInfoCount)
    },[personalInfoCount])
    useEffect(() => {
        decideTableDisplay()
    },[personalInfo])
    useEffect(() => {
        professionalJudgment()
    },[proChoice])

    const nameChange = (e) => {
        setName(e.target.value)
    }
    const imgChange = (e) => {
        setImg(e.target.files[0].name)  // 將 e.target.value 改為 => e.target.files[0].name 即可解決 fakepath 的問題
        setFile(e.target.files[0])
    }
    const workChange = (e) => {
        setWork(e.target.value)
    }
    const introChange = (e) => {
        setIntro(e.target.value)
    }
    const bornDateChange = (e) => {
        setBornDate(e.target.value)
    }
    const areaChange = (e) => {
        setArea(e.target.value)
    }
    const proChange = (e) => {
        setPro(e.target.value)
        console.log(e.target.value)
        
    }
    const proChoiceChange = (e) => {
        setProChoice(e.target.value)
        professionalJudgment(e.target.value)
    }
    const clear = () => {
        setName("")                     // 利用上面的方式，將 input 內的 value 再次改為 ""  
        setImg("")
        setWork("")
        setIntro("")
        setBornDate("")
        console.log("清除成功!")
    }
    
    const professionalJudgment = (e) => {
        if (e === 'music') {
            setProfession([{profession: '演唱人', index: 0}, {profession: '作詞', index: 1}, {profession: '作曲', index: 2}, {profession: '編曲', index: 3}, {profession: '製作人', index: 4}, {profession: '配唱製作', index: 5}, {profession: '錄音師', index: 6}, {profession: '混音師', index: 7}, {profession: '吉他手', index: 8}, {profession: '貝斯手', index: 9}, {profession: '鼓手', index: 10}, {profession: '鍵盤手', index: 11}, {profession: '弦樂編寫', index: 12}, {profession: '弦樂手', index: 13}, {profession: '其他樂手', index: 14}, {profession: '合音', index: 15}, {profession: '合音編寫', index: 16}, {profession: '母帶後期', index: 17}, {profession: 'MV', index: 18}, {profession: '封面設計', index: 19}])
        }
        else if (e === 'movie') {
            setProfession([{profession:'導演', index: 0}, {profession:'製片', index: 1}, {profession:'燈光', index: 2}, {profession:'錄音', index: 3}, {profession:'演員', index: 4}, {profession:'美術', index: 5}, {profession:'梳化', index: 6}, {profession:'編劇', index: 7}, {profession:'後期製作', index: 8}, {profession:'動畫', index: 9}, {profession:'攝影', index: 10}])
        }
    }

    const displayProfessionalJudgment = (e) => {
        return <option key={e.index} value={e.profession}>{e.profession}</option>
    }

    const send = async() => {
        console.log('上傳檔案中...')
        try {
            const added = await client.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setImg(url)
            //console.log(url)
            const jsonInfo = {"name" : name, "image" : url}
            const jsonFile = JSON.stringify(jsonInfo)
            console.log(jsonFile)
            console.log('將Json檔上傳至IPFS中...')
            const json = await client.add(jsonFile)
            const jsonUrl = `https://ipfs.infura.io/ipfs/${json.path}`
            let Request = new FormData()
            Request.append("pic",url)
            Request.append("uid",Wallet)
            Request.append("area",area)
            Request.append("name",name)
            Request.append("age",bornDate)
            Request.append("professional",pro)
            Request.append("introduction",intro)
            Request.append("works",work)
            // console.log("pic",url)
            // console.log("uid",Wallet)
            // console.log("area",area)
            // console.log("name",name)
            // console.log("age",bornDate)
            // console.log("professional",pro)
            // console.log("introduction",intro)
            // console.log("works",work)
            const res = await fetch(`http://192.192.140.209:9453/react/music/profile/add/finish`,{
                method: 'POST',
                body: Request,
                credentials: 'omit'
            })
            const restext=await res.text()
            if(restext==="success"){
                alert("已成功註冊")
                window.location.reload()
            }
            else(alert("此錢包已註冊過"))
        }
        catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    const getPersonalInfo = async () => {
        
        if(personalInfoCount==2&&personalInfo!==[]){return console.log(personalInfo)}
        // console.log(personalInfo.length)
    
        const Request = new FormData()
        Request.append('where',Wallet)
        const res = await fetch('http://192.192.140.209:9453/react/music/profile/select/uid',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        const resJson = await res.json()
        setPersonalInfo(resJson)
        // console.log(resJson[0].pic)
        setPersonalInfoCount(personalInfoCount+1)
        console.log(resJson)
        // window.location.reload()
        // console.log(personalInfo)
    }

    const decideTableDisplay = () => {
        if (personalInfo.length === 0) {
            // console.log("NO")
            // console.log(personalInfo)
            setPersonalTableDisplay('undisplay')
            setLoginTableDisplay('display')
        }
        if (personalInfo.length !== 0) {
            console.log("OK")
            setPersonalTableDisplay('display')
            setLoginTableDisplay('undisplay')
        }
    }

    return (
        <div className="divnav">
            <div><Header wallet={Wallet} /></div>
            <div><LoginFeatureSelection /></div>
            <div className={loginTableDisplay}>
                <h1 className="personalSettingTitle">註冊帳號</h1>
                <h3 className="personalSettingTitle">Personal settings</h3>
                <form>
                    <table className='LoginTable'>
                        <tbody>
                            <tr>
                                <td className="LogintdTitle">使用者頭貼</td>
                                <td className="Logintd"><input required type="file" accept="image/*" defaultValue={img} onChange={imgChange}></input></td>
                            </tr>
                            <tr>
                                <td className="LogintdTitle">使用者暱稱</td>
                                <td className="Logintd"><input required placeholder="請輸入使用者姓名" maxLength="20" size="23" value={name} onChange={nameChange}></input></td>
                            </tr>
                            <tr>
                                <td className="LogintdTitle">年齡</td>
                                <td className="Logintd"><input required type='number' value={bornDate} onChange={bornDateChange}></input></td>
                            </tr>
                            <tr>
                                <td className="LogintdTitle">地區</td>
                                <td className="Logintd">
                                    <select required onChange={areaChange}>
                                        <option value="地區">請選擇地區</option>
                                        <option value="台北">台北</option>
                                        <option value="新北">新北</option>
                                        <option value="基隆">基隆</option>
                                        <option value="桃園">桃園</option>
                                        <option value="苗栗">苗栗</option>
                                        <option value="台中">台中</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="LogintdTitle">專長 / 專業</td>
                                <td className="Logintd" value={proChoice} onChange={proChoiceChange}>
                                    <input type="radio" name="radio" value='music' />音樂
                                    <input type="radio" name="radio" value='movie' />電影
                                    <select required onChange={proChange}>
                                        <option value=''>請選擇專業</option>
                                        {profession.map(displayProfessionalJudgment)}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="LogintdTitle">自我介紹</td>
                                <td className="Logintd">
                                    <textarea required value={intro} onChange={introChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="LogintdTitle">作品</td>
                                <td className="Logintd">
                                    <input required placeholder="請輸入作品連結" size="25" value={work} onChange={workChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="LogintdTitle" colSpan='2'>
                                    <button className='LoginButton' type="button" width="50%" onClick={clear}>重新輸入</button>
                                    <button className="LoginButton" type="button" width="50%" onClick={send}>完成註冊</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            
            <div className={personalTableDisplay}>
                <h1 className="personalSettingTitle">個人資訊</h1>
                <h3 className="personalSettingTitle">Personal Information</h3>
                <table className='LoginTable'>
                    <tbody>
                        <tr>
                            <td className="LogintdTitle">使用者頭貼</td>
                            <td className="LogintdTextCenter">
                                <div className="personalTableDisplayImgDiv">
                                    {personalInfo.length>0&&<img className="personalTableDisplayImg" src={personalInfo[0].pic}/>}   
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="LogintdTitle">使用者暱稱</td>
                            <td className="LogintdTextCenter">
                                {personalInfo.length>0&&personalInfo[0].name}
                            </td>
                        </tr>
                        <tr>
                            <td className="LogintdTitle">年齡</td>
                            <td className="LogintdTextCenter">
                                {personalInfo.length>0&&personalInfo[0].age}
                            </td>
                        </tr>
                        <tr>
                            <td className="LogintdTitle">地區</td>
                            <td className="LogintdTextCenter">
                                {personalInfo.length>0&&personalInfo[0].area}
                            </td>
                        </tr>
                        <tr>
                            <td className="LogintdTitle">專長 / 專業</td>
                            <td className="LogintdTextCenter">
                                {personalInfo.length>0&&personalInfo[0].professional}
                            </td>
                        </tr>
                        <tr>
                            <td className="LogintdTitle">自我介紹</td>
                            <td className="LogintdTextCenter">
                                {personalInfo.length>0&&personalInfo[0].introduction}
                            </td>
                        </tr>
                        <tr>
                            <td className="LogintdTitle">作品</td>
                            <td className="LogintdTextCenter">
                                {personalInfo.length>0&&personalInfo[0].works}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div><Footer /></div>
        </div>
    )
}

export default LoginPage