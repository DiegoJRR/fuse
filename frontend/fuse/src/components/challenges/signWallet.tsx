"use client"

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

interface SignMessageButtonProps {
    message: string;
  }
  
export default function SignMessageButton({ message }: SignMessageButtonProps) {

  const { primaryWallet } = useDynamicContext();

  const signMessage = async () => {
    if (!primaryWallet) return;

    const signature = await primaryWallet.signMessage(message);

    console.log('signature', signature);
    console.log(primaryWallet.address)
  };

  return <button onClick={signMessage}>Sign message</button>;
};