"use client";
import * as React from 'react';
import { useWriteContract } from 'wagmi';
import { abi } from './FuseCollectiblesABI';
import { Console } from 'console';

export default function MintNFT() {
const { writeContract } = useWriteContract()

const to = '0x3749367e53B6fdf5ceDb2D6BCEf7d740C7074885';
const collectibleTypeIds = [BigInt(1), BigInt(1)]; // Example token IDs
const amounts = [BigInt(1), BigInt(1)]; // Example amounts
const data = '0x'; // Example data (empty)
const signature = '0xYourTestSignatureHere'; // Example signature

return (
    <button 
    onClick={() => {
        console.log("mamarre");
        writeContract({ 
            abi,
            address: "0xeAe46c383D0D07e74f87de47aa2cd6ced419d370",
            functionName: 'transfer',
            args: [to, "100000000000000"]
            });
        }
    }
    >
    Transfer
    </button>
)
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