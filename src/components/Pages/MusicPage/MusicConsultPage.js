import Footer from '../../Footer/Footer'
import Header from '../Header/Header'
import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './MusicPage.css'


const MusicConsultPage = ({Wallet}) => {
    const [theme, setTheme] = useState('導演')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    // const [asker, setAsker] = useState('')
    const [consult, setConsult] = useState([])
    // const [Items,setItems] =  useState([]);
    
    useEffect(() => {
        getConsult()
    },[])

    const themeChange = (e) => {
        console.log(e.target.value)
        setTheme(e.target.value);
    }

    const contentChange = (e) => {
        setContent(e.target.value);
    }

    const titleChange = (e) => {
        setTitle(e.target.value);
    }

    // const askerChange = (e) => {
    //     setAsker(e.target.value)
    // }

    const getConsult = async() => {
        axios({
            method: 'GET', url: `http://192.192.140.209:9453/react/music/consult_list/select`,
        }).then(res => {
            setConsult(res.data)
            console.log(res.data)
        })
    }

    const displayHistoryQuestion = (result) => {
        return(
            <div className="questionDiv" key={result.qid}>
                <Link to={'/musicconsulthistorypage/'+result.qid}>
                    <h2>主題: {result.theme}</h2>
                    <h2>討論串: {result.title}</h2>
                    <h2>問題: {result.ask}</h2>
                    <hr></hr>
                    {/* <h1>Answer: {result.ans}</h1> */}
                </Link>
            </div>
        )
    }

    const handleSubmit = () => {
        const Request = new FormData()
        Request.append('uid', Wallet)
        Request.append('theme', theme)
        Request.append('title', title)
        Request.append('ask', content)
        Request.append('ansuid', Wallet)
        Request.append('ans', '')

        // console.log('uid', Wallet)
        // console.log('theme', theme)
        // console.log('title', title)
        // console.log('ask', content)
        // console.log('ansuid', asker)
        // console.log('ans', '')
    
        fetch('http://192.192.140.209:9453/react/music/consult_list/add/finish',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })

        alert('成功送出')

        // console.log('Wallet:', Wallet, '\nTheme: ', theme, '\nTitle: ', title, '\nContent: ', content)
        // setItems((oldItems) => {
        //     return[...oldItems,
        //         <div>
        //             <div>Theme: {theme}</div>
        //             <div>Title: {title}</div>
        //             <div>Content: {content}</div>
        //         </div>  
        //     ]
        // })
    }

    return (
        <div className="divnav">
            <div><Header wallet={ Wallet }/></div>
            <div className="ConsultMainDiv">
                <div className="ConsultCenterDiv">
                    <div><h1 className="ConsultH1">新創諮詢</h1></div>
                    <div className="ConsultTableDiv">
                        <form onSubmit={handleSubmit}>
                            <table className="ConsultTable">
                                <tbody>
                                    <tr>
                                        <td>主題：</td>
                                        <td>
                                            <select value={theme} onChange={themeChange}>
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
                                    </tr>

                                    {/* <tr>
                                        <td>詢問者：</td>
                                        <td><input type="text" placeholder="請輸入名稱" value={Wallet}/></td>
                                    </tr> */}

                                    <tr>
                                        <td>討論串：</td>
                                        <td><input required type="text" placeholder="輸入題目" value={title} onChange={titleChange}/></td>
                                    </tr>

                                    <tr>
                                        <td>問題：</td>
                                        <td><textarea required type="text" placeholder="輸入問題" value={content} onChange={contentChange}/></td>
                                    </tr>

                                    <tr>
                                        <td colSpan='2'>
                                            <div className='ConsultButtonDiv'>
                                                <button type='submit' className='ConsultButton' >提問</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    
                    <div className='questionMainDiv'>
                        {consult.map(displayHistoryQuestion)}
                    </div>
                    {/* <div>
                        <ol>{Items.map((itemval) => {return <li>{itemval}</li>})}</ol>
                    </div> */}
                </div>
            </div>
            <div><Footer /></div>
        </div> 
    )
}

export default MusicConsultPage