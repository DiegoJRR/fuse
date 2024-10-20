"use client";

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { abi } from './FuseCollectiblesABI'; // Replace with the actual ABI
import { getWeb3Provider,getSigner } from '@dynamic-labs/ethers-v6'
import {ethers} from 'ethers'
import { sign } from 'crypto';

export default function MintNFT() {
    // const to = '0x3749367e53B6fdf5ceDb2D6BCEf7d740C7074885';
    const collectibleURIs = [BigInt(1)]; // Example URIs
    const amounts = [BigInt(1)]; // Example amounts
    const signature = '0x1bf25efeff5e4b25d3196bf3ecbfe76e03b1a7fddc8f5a31e837ce14122c3326171b225bb1d276495c93957cd31d236743395a0275eb76a9e5fe3cf3be94ef211c'; // Example signature
    const to = '0x3980dDB72A01ECF127c79C2b08865B9583471321'; // Replace with the recipient address

  // Proper setup of useWriteContract
 
  const { primaryWallet } = useDynamicContext();

  const handleTransfer = async () => {
    if (!primaryWallet) return;
    const provider = await getWeb3Provider(primaryWallet)
    const signer = await getSigner(primaryWallet)
    const contractInstance = new ethers.Contract(
        '0xe38b618cee9e26221da3c2ba52405580355987fc',
        abi,
        signer
    )
    let sig_encode = ethers.hexlify(signature)
    console.log(sig_encode,"encode")
    let result = await contractInstance.mintBatchWithURIsAndSignature!(to, collectibleURIs, amounts, signature)

    console.log(result)

  };

  return (
    <div>
      <button onClick={handleTransfer}>Transfer</button>
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