import { useState, useEffect } from 'react'
import { create } from 'ipfs-http-client'
import { ethers } from 'ethers'
import token_abi from './abi/abi.json'
import '../style.css'
import Footer from '../../Footer/Footer'
import Header from '../Header/Header'

const client = create('https://ipfs.infura.io:5001/api/v0')
const UploadToIPFS = ({Wallet}) => {
        /*  
        name 會影響 value，nameChange 會改變 name。(雙向綁定)
        設定作品名稱的初始值(所以打完這邊去輸入input是輸入不了的)
        name所以輸入的順序為 name 預設 value 為"" =>
        user 觸發 onChange 所以呼叫 nameChange() =>
        因為 setName() 的關係將 name 設定為當前 input 內的 value =>
        因為 name 從 "" 變為 input 內的 value 所以前端的 input 就可以顯示出來。(img一樣的道理)
    */
        const [name,setName] = useState("")
        const [img,setImg] = useState("")
        const [filetype , setFiletype ] = useState("")
        const [description , setDescription ] = useState("")

        const [file,setFile] = useState("") // 取得 file 的值
        // const [provider ,setProvider] =useState(null)
        // const [signer , setSigner] =useState(null)
        
        const nameChange = (e) => {
            setName(e.target.value)
        }
        const imgChange = (e) => {
            setImg(e.target.files[0].name)  // 將 e.target.value 改為 => e.target.files[0].name 即可解決 fakepath 的問題
            setFile(e.target.files[0])
            // setFileClass(e.target.files[0].type.substr(0,5))
            switch(e.target.files[0].type.substr(0,5)){
                case 'image':{
                    setFiletype("image")
                    break;
                }
                case 'video':{
                    setFiletype("animation_url")
                    break;
                }
                case 'audio':{
                    setFiletype("animation_url")
                }
            }
            // console.log(e.target)
            // console.log(e.target.files[0].type.substr(0,5))
        }

        const descriptionChange = (e) => {
            setDescription(e.target.value)
        }

        const clear = () => {
            setName("")                     // 利用上面的方式，將 input 內的 value 再次改為 ""  
            setImg("")
            setDescription("")
            alert("清除成功!")
        }
        
        const send = async() => {
            console.log('上傳檔案中...')
            try {
                const added = await client.add(file)
                const url = `https://ipfs.infura.io/ipfs/${added.path}`
                setImg(url)
                //console.log(url)
                // const jsonInfo = {"name" : name, "image" : url}
                
                // const jsonInfo = `{"name" : "${name}", "${filetype}" : "${url}"}`
                const jsonInfo = `{"name" : "${name}", "description" : "${description}", "${filetype}" : "${url}"}`

                console.log(jsonInfo.toString())
                // const jsonFile = JSON.stringify(jsonInfo)
                // console.log(jsonFile)
                // console.log(jsonFile)
                console.log('將Json檔上傳至IPFS中...')
                const json = await client.add(jsonInfo.toString())
                const jsonUrl = `https://ipfs.infura.io/ipfs/${json.path}`
                console.log(jsonUrl)
                // console.log(contractAddress)
                const result = await contract.mintseturi(defaultAccount,1,"0x00",jsonUrl,contractAddress)
                console.log(result)
                alert('上傳成功！')
            }
            catch (error) {
                console.log('Error uploading file: ', error)
            }
        }

        // Smart Contract -----------------------------------------------------

        // const contractAddress='0x981a5b1e54b316af39b5ddadf5daee8879afc68b';
        const contractAddress='0x0CAb9D95bDDEC7eFC7b5B1C09472238F0bf70742';
        const [contract ,setContract] =useState(null)
        const defaultAccount = Wallet

        useEffect(() => {
            updateEthers()
        },[defaultAccount])

        const updateEthers = async() => {
            let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
            let tempSigner = tempProvider.getSigner()
            let tempContract = new ethers.Contract(contractAddress,token_abi,tempSigner)
            // setProvider(tempProvider)
            // setSigner(tempSigner)
            setContract(tempContract)
        }

        // -------------------------------------------------------------------

        return (
            <div className="divnav">
                <div><Header wallet={ Wallet } /></div>
                <div>
                    <h1 id="selectWork">選擇上傳作品</h1>
                    <form>
                        <table className="Uploadtable">
                            <tbody>
                                <tr>
                                    <td className='Uploadtd'>作品名稱</td>
                                    <td className='Uploadtd'>
                                        <input required placeholder="請輸入作品名稱" maxLength="20" size="23" value={name} onChange={nameChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='Uploadtd'>作品介紹</td>
                                    <td className='Uploadtd'>
                                        <input required placeholder="請輸入作品介紹" size="23" type="text" value={description} onChange={descriptionChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='Uploadtd'>選擇作品</td>
                                    <td className='Uploadtd'>
                                        <input required type="file" defaultValue={img} onChange={imgChange}/>
                                    </td>
                                    {/* accept="image/*" */}
                                </tr>
                                <tr>
                                    <td className='Uploadtd' colSpan="2">
                                        <button className='Uploadbutton' type="button" width="50%" onClick={clear}>重新輸入</button>
                                        <button className='Uploadbutton' type="button" width="50%" onClick={send}>送出</button>
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

export default UploadToIPFS
