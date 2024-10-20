import os
from dotenv import load_dotenv
load_dotenv()

import hashlib
from web3 import Web3, EthereumTesterProvider, eth
from eth_account.messages import encode_defunct

WALLET_PRIVATE_KEY = os.getenv('WALLET_PRIVATE_KEY')
w3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/'))

account = w3.eth.account.from_key(WALLET_PRIVATE_KEY)
def signContract(to,collectible_type_ids,amounts, contract_address):
    # to = '0x3980dDB72A01ECF127c79C2b08865B9583471321'  # Destination address
    # collectible_type_ids = [1]  # Assuming these are uint256 values
    # amounts = [1]  # Assuming these are uint256 values
    # contract_address = '0x7E7b8cdD92766a19c2dAbB7CD6750901206d7c6e'  # Contract address

    encoded_data = Web3.solidity_keccak(["address", "string[]", "uint256[]", "address"], [to, collectible_type_ids, amounts, contract_address])
    signed_message = account.sign_message(encode_defunct(encoded_data))
    return(signed_message)  