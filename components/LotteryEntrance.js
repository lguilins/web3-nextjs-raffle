import { useMoralis, useWeb3Contract } from "react-moralis";
import abi from "../constants/abi.json"
import { useState, useEffect } from "react";

const CONTRACT_ADDRESS = "0x7F314b506D901E4Ffb2F18bBa67dD1977C1fE708"

export default function LotteryEntrance() {
    const { isWeb3Enabled } = useMoralis()
    const [recentWinner, setRecentWinner] = useState("0")

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "enterRaffle",
        msgValue: "100000000000000000", // 0.1 ETH
        params: {}
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "s_recentWinner",
        params: {}
    })

    useEffect(() => {
        async function updateUi() {
            const recentWinnerFromCall = await getRecentWinner()
            setRecentWinner(recentWinnerFromCall)
        }
        if(isWeb3Enabled) {
            updateUi()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            <button 
                className="rounded ml-auto font-bold bg-blue-500"
                onClick={async () => {
                    await enterRaffle()
            }}>Enter Lottery</button>
            <div>The Recent Winner is: { recentWinner }</div>
        </div>
    )
}