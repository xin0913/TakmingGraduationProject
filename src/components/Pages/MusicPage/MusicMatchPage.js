import Footer from '../../Footer/Footer'
import Header from '../Header/Header'
import '../style.css'
import { useState } from 'react'

export const MusicMatchPage = ({Wallet}) => {
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    // ----------------------------------------------------------------
    const [jobOne, setJobOne] = useState('演唱人')
    const [jobTwo, setJobTwo] = useState('演唱人')
    const [jobThree, setJobThree] = useState('演唱人')
    const [jobFour, setJobFour] = useState('演唱人')
    const [jobFive, setJobFive] = useState('演唱人')
    // ----------------------------------------------------------------
    const [jobOneCount, setJobOneCount] = useState(0)
    const [jobTwoCount, setJobTwoCount] = useState(0)
    const [jobThreeCount, setJobThreeCount] = useState(0)
    const [jobFourCount, setJobFourCount] = useState(0)
    const [jobFiveCount, setJobFiveCount] = useState(0)
    // ----------------------------------------------------------------
    const projectNameChange = (e) => {
        setProjectName(e.target.value)
    }
    const projectDescriptionChange = (e) => {
        setProjectDescription(e.target.value)
    }
    const jobOneChange = (e) => {
        setJobOne(e.target.value)
    }
    const jobTwoChange = (e) => {
        setJobTwo(e.target.value)
    }
    const jobThreeChange = (e) => {
        setJobThree(e.target.value)
    }
    const jobFourChange = (e) => {
        setJobFour(e.target.value)
    }
    const jobFiveChange = (e) => {
        setJobFive(e.target.value)
    }
    // ----------------------------------------------------------------
    const jobOneCountChange = (e) => {
        setJobOneCount(e.target.value)
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
    // ----------------------------------------------------------------
    const sendMatchInfo = () => {
        const Request = new FormData()
        Request.append('UID',Wallet);
        Request.append('Project Name',projectName)
        Request.append('Project Description',projectDescription)
        Request.append('seekpro',jobOne)
        Request.append('seekpeo',jobOneCount)
        Request.append('seekpro2',jobTwo)
        Request.append('seekpeo2',jobTwoCount)
        Request.append('seekpro3',jobThree)
        Request.append('seekpeo3',jobThreeCount)
        Request.append('seekpro4',jobFour)
        Request.append('seekpeo4',jobFourCount)
        Request.append('seekpro5',jobFive)
        Request.append('seekpeo5',jobFiveCount)
        fetch('http://192.192.140.209:9453/react/music/project/add/finish',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        alert('資料已提交')
    }
    return (
        <div className="divnav">
            <div><Header wallet={ Wallet } /></div>
            <div id="matchPageDiv">
                <h1 id="selectWork">請輸入要尋找的人才以及數量</h1>
                <form onSubmit={sendMatchInfo}>
                    <table className="matchPageTable">
                        <tbody>
                            <tr>
                                <td className='Matchtd'>Project Name</td>
                                <td className='Matchtd'>
                                    <input type="text" required placeholder="請輸入專案名稱" value={projectName} onChange={projectNameChange} size="23"/>
                                </td>
                            </tr>
                            <tr>
                                <td className='Matchtd'>Project Description</td>
                                <td className='Matchtd'>
                                    <input type="text" required placeholder="專案介紹請在200字內" value={projectDescription} onChange={projectDescriptionChange} maxLength="300" size="23"/>
                                </td>
                            </tr>
                            <tr>
                                <td className='Matchtd'>
                                    <select required value={jobOne} onChange={jobOneChange}>
                                        <option value="演唱人">演唱人</option>
                                        <option value="作詞">作詞人</option>
                                        <option value="作曲">作曲人</option>
                                        <option value="錄音師">錄音師</option>
                                        <option value="混音師">混音師</option>
                                        <option value="製作人">製作人</option>
                                        <option value="鼓手">鼓手</option>
                                        <option value="貝斯手">貝斯手</option>
                                        <option value="吉他手">吉他手</option>
                                        <option value="MV">MV</option>
                                        <option value="鋼琴手">鋼琴手</option>
                                    </select>
                                </td>
                                <td className='Matchtd'>
                                    <input type='number' required placeholder="請輸入該類人才的需求數量" value={jobOneCount} onChange={jobOneCountChange} min="1"/>
                                </td>
                            </tr>
                            <tr>
                                <td className='Matchtd'>
                                    <select required value={jobTwo} onChange={jobTwoChange}>
                                        <option value="演唱人">演唱人</option>
                                        <option value="作詞">作詞人</option>
                                        <option value="作曲">作曲人</option>
                                        <option value="錄音師">錄音師</option>
                                        <option value="混音師">混音師</option>
                                        <option value="製作人">製作人</option>
                                        <option value="鼓手">鼓手</option>
                                        <option value="貝斯手">貝斯手</option>
                                        <option value="吉他手">吉他手</option>
                                        <option value="MV">MV</option>
                                        <option value="鋼琴手">鋼琴手</option>
                                    </select>
                                </td>
                                <td className='Matchtd'>
                                    <input type='number' required placeholder="請輸入該類人才的需求數量" value={jobTwoCount} onChange={jobTwoCountChange} min="1"/>
                                </td>
                            </tr>
                            <tr>
                                <td className='Matchtd'>
                                    <select required value={jobThree} onChange={jobThreeChange}>
                                        <option value="演唱人">演唱人</option>
                                        <option value="作詞">作詞人</option>
                                        <option value="作曲">作曲人</option>
                                        <option value="錄音師">錄音師</option>
                                        <option value="混音師">混音師</option>
                                        <option value="製作人">製作人</option>
                                        <option value="鼓手">鼓手</option>
                                        <option value="貝斯手">貝斯手</option>
                                        <option value="吉他手">吉他手</option>
                                        <option value="MV">MV</option>
                                        <option value="鋼琴手">鋼琴手</option>
                                    </select>
                                </td>
                                <td className='Matchtd'>
                                    <input type='number' required placeholder="請輸入該類人才的需求數量" value={jobThreeCount} onChange={jobThreeCountChange} min="1"/>
                                </td>
                            </tr>
                            <tr>
                                <td className='Matchtd'>
                                    <select required value={jobFour} onChange={jobFourChange}>
                                        <option value="演唱人">演唱人</option>
                                        <option value="作詞">作詞人</option>
                                        <option value="作曲">作曲人</option>
                                        <option value="錄音師">錄音師</option>
                                        <option value="混音師">混音師</option>
                                        <option value="製作人">製作人</option>
                                        <option value="鼓手">鼓手</option>
                                        <option value="貝斯手">貝斯手</option>
                                        <option value="吉他手">吉他手</option>
                                        <option value="MV">MV</option>
                                        <option value="鋼琴手">鋼琴手</option>
                                    </select>
                                </td>
                                <td className='Matchtd'>
                                    <input type='number' required placeholder="請輸入該類人才的需求數量" value={jobFourCount} onChange={jobFourCountChange} min="1"/>
                                </td>
                            </tr>
                            <tr>
                                <td className='Matchtd'>
                                    <select required value={jobFive} onChange={jobFiveChange}>
                                        <option value="演唱人">演唱人</option>
                                        <option value="作詞">作詞人</option>
                                        <option value="作曲">作曲人</option>
                                        <option value="錄音師">錄音師</option>
                                        <option value="混音師">混音師</option>
                                        <option value="製作人">製作人</option>
                                        <option value="鼓手">鼓手</option>
                                        <option value="貝斯手">貝斯手</option>
                                        <option value="吉他手">吉他手</option>
                                        <option value="MV">MV</option>
                                        <option value="鋼琴手">鋼琴手</option>
                                    </select>
                                </td>
                                <td className='Matchtd'>
                                    <input type='number' required placeholder="請輸入該類人才的需求數量" value={jobFiveCount} onChange={jobFiveCountChange} min="1"/>
                                </td>
                            </tr>
                            <tr>
                                <td className='Matchtd' colSpan='2'>
                                    <button className='Matchbutton' type="submit">送出</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default MusicMatchPage