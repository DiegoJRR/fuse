"use client";

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { abi } from './FuseCollectiblesABI'; // Replace with the actual ABI
import { getWeb3Provider,getSigner } from '@dynamic-labs/ethers-v6'
import {ethers} from 'ethers'
import { sign } from 'crypto';
import {fetchUriData} from '../../app/fetchUris';


export default function MintNFT() {
  
  
  const session_id = "9aa471b2-caa1-4f5d-acf0-ab0c2a64a729";
  
  const { primaryWallet } = useDynamicContext();

    const session_URIs = async () => {
      try {
        // Fetch the session URIs
        const session_URIsAnswer = await fetchUriData(session_id||"");

      } catch (error) {
        console.error("Error setting session cookie:", error);
      }
    };
    // const to = '0x3749367e53B6fdf5ceDb2D6BCEf7d740C7074885';
    const collectibleURIs = session_URIs.uris; // Example URIs
    const amounts = [BigInt(session_URIs.uris||0)]; // Example amounts
    const to = primaryWallet?.address || ""; // Replace with the recipient address

    // const signature = '0x1bf25efeff5e4b25d3196bf3ecbfe76e03b1a7fddc8f5a31e837ce14122c3326171b225bb1d276495c93957cd31d236743395a0275eb76a9e5fe3cf3be94ef211c'; // Example signature

    
  // Proper setup of useWriteContract
 

  const handleTransfer = async () => {

    const network = primaryWallet?.getNetwork()

    const contracts = {
      sepolia:"0x31c56d02562267637f62fb3f0e84630cd73ab7d7",
      flowTest:"0x93dD4f56332fa1B441422a55f4B958f75abFfB46",
      polygonMainnet:"0xe72c8E6304B65A2971f1Ea7E49839E07dff93851"

    }

    if (!primaryWallet) return;
    const provider = await getWeb3Provider(primaryWallet)
    const signer = await getSigner(primaryWallet)
    const contractInstance = new ethers.Contract(
        '0x31c56d02562267637f62fb3f0e84630cd73ab7d7',
        abi,
    )

    console.log(to,collectibleURIs,amounts)
    
    let result = await contractInstance.mintBatchWithURIs!(to, collectibleURIs, amounts)

  };

  return (
    <div className="btn btn-active bg-green-500 text-white font-bold py-2 px-4 rounded-full">
      <button onClick={handleTransfer}>Mint your concepts</button>
    </div>
  );
}

    // "use client";
    // import * as React from 'react';
    // import { useWriteContract } from 'wagmi';
    // import { abi } from './FuseCollectiblesABI';
    // import { Console } from 'console';

    // export default function MintNFT() {
    // const { writeContract } = useWriteContract()

    // const to = '0x3749367e53B6fdf5ceDb2D6BCEf7d740C7074885';
    // const collectibleTypeIds = [BigInt(1), BigInt(1)]; // Example token IDs
    // const amounts = [BigInt(1), BigInt(1)]; // Example amounts
    // const data = '0x'; // Example data (empty)
    // const signature = '0xYourTestSignatureHere'; // Example signature

    // return (
    //     <button 
    //     onClick={() => {
    //         console.log("mamarre");
    //         writeContract({ 
    //             abi,
    //             address: "0x3c0368cE8e0fdB80a8F3189fc33D9bB3Bd62e929",
    //             functionName: 'mintBatchWithSignature',
    //             args: [to, collectibleTypeIds, amounts, data, signature]
    //             });
    //         }
    //     }
    //     >
    //     Transfer
    //     </button>
    // )
    // }