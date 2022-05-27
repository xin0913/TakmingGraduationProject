import Views from './components/Routers/Views'
import { useState, useEffect } from 'react';

const App = () => {
    const[Wallet,SetWallet] = useState(null)
    const[count,setCount] = useState(0)

    useEffect (() => {
        Button_Wallet()
    }, [])

    const Button_Wallet = async () => {
        
        const accounts = await window.ethereum.request({method :'eth_requestAccounts'})
        console.log(accounts[0])
        SetWallet(accounts[0])
        // // console.log(Wallet)


        // if (typeof window.ethereum==="undefined") {
        //     alert("請先安裝MetaMask")
        // }
        

        // if (count!==0&&Wallet === null) {
            // Button_Wallet()
            // alert('正在連接MetaMask')
        // }
        // setCount(count+1)
    }

    return (
        <Views Wallet={Wallet!==null}/>
    )
}

export default App