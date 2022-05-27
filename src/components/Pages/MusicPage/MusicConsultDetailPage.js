import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../Footer/Footer'
import Header from '../Header/Header'

const MusicConsultHistoryPage = ({Wallet}) => {
    const params = useParams()
    const [consultAnswer,setConsultAnswer] = useState([])
    const [consultQuestion,setConsultQuestion] = useState('')
    const [newAnswer,setNewAnswer] = useState('')
    useEffect(() => {
        getConsultAnswer()
        getQuestion()
    },[])

    const getNewAnswer = (e) => {
        setNewAnswer(e.target.value)
    }

    // 取得該討論串用戶的回答
    const getConsultAnswer = async () => {
        const Request = new FormData()
        Request.append("where",params.qid)
        const res = await fetch('http://192.192.140.209:9453/react/music/consult/select/qid',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        const resJson = await res.json()
        setConsultAnswer(resJson)
        console.log(resJson)
    }

    // 取得該討論串的問題
    const getQuestion = async () => {
        const Request = new FormData()
        Request.append("where",params.qid)
        const res = await fetch('http://192.192.140.209:9453/react/music/consult_list/select/qid',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        const resJson = await res.json()
        setConsultQuestion(resJson[0].ask)
        // console.log(resJson[0].ask)
    }

    const displayConsultAnswer = (res) => {
        return (
            <div key = {res.datetime}>
                <div>用戶{res.uid}回覆：{res.respond}</div>
                <div>{res.dt}</div>
                <hr/>
            </div>
        )
    }

  // 送出新回應
    const sendNewAnswer = () => {
        const Request = new FormData()
            Request.append("qid",params.qid)
            Request.append("uid",Wallet)
            Request.append("response",newAnswer)
            // console.log("qid",params.qid)
            // console.log("uid",Wallet)
            // console.log("response",newAnswer)
            // alert('123')
            fetch('http://192.192.140.209:9453/react/music/consult/add/finish',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
    }

    return (
        <div className="divnav">
            <div><Header wallet={Wallet}/></div>
            <div className="consultAnswer">
                <div>討論串：{consultQuestion}</div>
                <hr/>
                <div>{consultAnswer.map(displayConsultAnswer)}</div>
                <div>
                <form className='consultAnswerForm' onSubmit={sendNewAnswer}>
                    <input required className='consultAnswerTextarea' type='textarea' value={newAnswer} onChange={getNewAnswer}/>
                    <button className='consultAnswerButton' type='submit'>送出</button>
                </form>
                </div>
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default MusicConsultHistoryPage