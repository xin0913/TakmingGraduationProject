import './MusicPage.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const MusicChooseMajor = () => {
    const [job, setJob] = useState('')
    const [area, setArea] = useState('')
    const [jobResults, setJobResults] = useState([])
    const [areaResults, setAreaResults] = useState([]) // 目前篩選條件結果
    const [allProfile, setAllProfile] = useState([])
    const [selectProfile,setSelectProfile] = useState([])
    const [jobCount,setJobCount] = useState(0)
    const [areaCount,setAreaCount] = useState(0)
    const [selectCount,setSelectCount] = useState(0)
    const place = [{place: '台北', index: 0}, {place: '新北', index: 1}, {place: '基隆', index: 2}, {place: '桃園', index: 3}, {place: '新竹', index: 4}, {place: '苗栗', index: 5}, {place: '台中', index: 6}, {place: '彰化', index: 7}, {place: '南投', index: 8}, {place: '雲林', index: 9}, {place: '嘉義', index: 10}, {place: '台南', index: 11}, {place: '高雄', index: 12}, {place: '屏東', index: 13}, {place: '台東', index: 14}, {place: '花蓮', index: 15}, {place: '宜蘭', index: 16}, {place: '綠島', index: 17}, {place: '澎湖', index: 18}, {place: '金門', index: 19}, {place: '馬祖', index: 20}, {place: '西台灣', index: 21}]
    const profession = [{profession: '演唱人', index: 0}, {profession: '作詞', index: 1}, {profession: '作曲', index: 2}, {profession: '編曲', index: 3}, {profession: '製作人', index: 4}, {profession: '配唱製作', index: 5}, {profession: '錄音師', index: 6}, {profession: '混音師', index: 7}, {profession: '吉他手', index: 8}, {profession: '貝斯手', index: 9}, {profession: '鼓手', index: 10}, {profession: '鍵盤手', index: 11}, {profession: '弦樂編寫', index: 12}, {profession: '弦樂手', index: 13}, {profession: '其他樂手', index: 14}, {profession: '合音', index: 15}, {profession: '合音編寫', index: 16}, {profession: '母帶後期', index: 17}, {profession: 'MV', index: 18}, {profession: '封面設計', index: 19}]
    
    // --------------------------------------------------------------
    // Get All Profile

    useEffect(() => {
        getAllProfile()
    },[])

    const getAllProfile = async() => {
        const res = await fetch('http://192.192.140.209:9453/react/music/profile/select')
        const profileJson = await res.json()
        setAllProfile(profileJson)
    }

    // --------------------------------------------------------------
    // CheckBox 篩選結果判斷
    const jobValueChange = async(e) => {
        setJob(e.target.value)
        const Request = new FormData()
        Request.append("where", e.target.value)
        const res = await fetch('http://192.192.140.209:9453/react/music/profile/select/professional',{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        const resJson = await res.json()
        setJobCount(document.querySelectorAll('input[name=profession]:checked').length)
        // 表示多按了一個條件
        if (jobCount < document.querySelectorAll('input[name=profession]:checked').length) {
            console.log('plus\n舊：',jobCount,'\n新：',document.querySelectorAll('input[name=profession]:checked').length)
            setJobResults(jobResults.concat(resJson))


        }
        if (jobCount > document.querySelectorAll('input[name=profession]:checked').length) {
            console.log('minus\n舊：',jobCount,'\n新：',document.querySelectorAll('input[name=profession]:checked').length)
            jobResults.splice(jobResults.map(x => x.uid).indexOf(resJson[0].uid),resJson.length)
        }
    }

    const areaValueChange = async(e) => {
        setArea(e.target.value)
        const Request = new FormData()
        Request.append("where", e.target.value)
        const res = await fetch(`http://192.192.140.209:9453/react/music/profile/select/area`,{
            method: 'POST',
            body: Request,
            credentials: 'omit'
        })
        const resJson = await res.json()
        setAreaCount(document.querySelectorAll('input[name=place]:checked').length)
        // 表示多按了一個條件
        if (areaCount < document.querySelectorAll('input[name=place]:checked').length) {
            setAreaResults(areaResults.concat(resJson))
            // setAllProfile(areaResults.concat(resJson)) // 顯示用(原有全部資料)
        }
        // 表示少按了一個條件
        if (areaCount > document.querySelectorAll('input[name=place]:checked').length) {
            // TODO~~~~
            console.log(areaResults)
            // const areaSelect = areaResults.splice(areaResults.map(x => x.uid).indexOf(resJson[0].uid),resJson.length)
            setAreaResults(areaResults.splice(areaResults.map(x => x.uid).indexOf(resJson[0].uid),resJson.length))
            console.log(areaResults.splice(areaResults.map(x => x.uid).indexOf(resJson[0].uid),resJson.length))
            // areaResults.splice(areaResults.map(x => x.uid).indexOf(resJson[0].uid),resJson.length)
            // setAllProfile(areaResults) // 顯示用(原有全部資料)
        }
    }

    // --------------------------------------------------------------
    // 篩選結果組合 
    useEffect(() => {
        selectResults()
    },[jobResults,areaResults])

    const selectResults = () => {
        if (document.querySelectorAll('input[name=place]:checked').length === 0) {
            setAllProfile(jobResults)
        }
        else if (document.querySelectorAll('input[name=profession]:checked').length === 0) {
            setAllProfile(areaResults)
        }
        else {
            // 將 allProfile 清空
            if (selectCount === 0) {
                setAllProfile([])
                setSelectCount(selectCount + 1)
            }
            const jobUid = jobResults.map(x => x.uid)
            const areaUid = areaResults.map(x => x.uid)
            // console.log('專長',jobUid)
            // console.log('地區',areaUid)
            // 篩選出重複的info(+)

            if (document.querySelectorAll('input[name=profession]:checked').length > (jobCount-1) || document.querySelectorAll('input[name=place]:checked').length > (areaCount-1)) {
                console.log('plus++')
                setAllProfile([])
                jobUid.map(x => {
                    areaUid.map(y => {
                        // 加入 info 至 allProfile 中
                        if (y === x) {
                            console.log(areaResults[areaUid.indexOf(y)]) // 本次篩選結果
                            const select = areaResults[areaUid.indexOf(y)]
                            setAllProfile(allProfile => [...allProfile, select])
                        }
                    })
                })
            }
            // 篩選出重複的info(-)
            else if (document.querySelectorAll('input[name=profession]:checked').length < jobCount || document.querySelectorAll('input[name=place]:checked').length < areaCount) {
            // else {
                console.log('minus')
            }
            // console.log(document.querySelectorAll('input[name=profession]:checked').length,jobCount)
                
        }
    }
    // --------------------------------------------------------------
    // display CheckBox
    const musicProfessionCheckBox = (profession) => {
        return(
            <label className='MusicCheckBoxLabel' key={profession.index}>
                <input name='profession' type="checkbox" value={profession.profession} />
                <span className="roundButton">{profession.profession}</span>
            </label>
        )
    }

    const musicPlaceCheckBox = (place) => {
        return(
            <label className='MusicCheckBoxLabel' key={place.index}>
                <input name='place' type="checkbox" value={place.place} />
                <span className="roundButton">{place.place}</span>
            </label>
        )
    }

    // --------------------------------------------------------------
    // display select results
    const musicSelectResults = (selectResults) => {
        return(
            <Link to={'/musicchoosemajordetail/'+selectResults.uid} key={selectResults.uid}>
                <div>
                    <h1>錢包地址：{selectResults.uid}</h1>
                    <h1>專長：{selectResults.professional}</h1>
                    <h1>姓名：{selectResults.name}</h1>
                    <h1>地區：{selectResults.area}</h1>
                    <hr/>
                </div>
            </Link>
        )
    }

    // --------------------------------------------------------------
    return (
        <div className="MusicChooseMajorMainDiv">
            {/* <!--https://www.wfublog.com/2021/05/input-radio-checkbox-css.html--> */}
            <div>
                <div>
                    <div className="MusicSpecialSkill">專長</div>
                    <form>
                        <div className="MusicCheckBox" value={job} onChange={jobValueChange}>
                            {profession.map(musicProfessionCheckBox)}
                        </div>
                    </form>
                    <hr/>
                </div>
                <div>
                    <div className="MusicSpecialSkill">地區</div>
                    <form>
                        <div className="MusicCheckBox" value={area} onChange={areaValueChange}>
                            {place.map(musicPlaceCheckBox)}
                        </div>
                    </form>
                    <hr/>
                </div>
            </div>
            <div className='all' onChange={window.location.reload}>
                {allProfile.map(musicSelectResults)}
            </div>
        </div>
    )
}

export default MusicChooseMajor