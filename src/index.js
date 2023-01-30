require("dotenv").config();
import { abi as QuoterABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
/* const Web3 = require('web3') */
const ethers = require('ethers')
const routerAbi = require("./config/router.abi.json");
const erc20Abi = require("./config/erc20.abi.json");
const swapRouterAbi = require("./config/swapRouter.abi.json");

const wethAddress =  process.env.WETH
const tokenAddress =  process.env.ContracAddress
const routerAddress = process.env.ROUTER
const rpc = process.env.RPC
const privkey= process.env.PRIVATEKEY;

const minGas = 0.0001

const provider = new ethers.providers.JsonRpcProvider(rpc);
const wallet = new ethers.Wallet(privkey)
console.log('wallet address -> ', wallet.address)
/* const address = '0xF02c1c8e6114b1Dbe8937a39260b5b0a374432bB' */


/* const web3 = new Web3(rpc)
const account = web3.eth.accounts.privateKeyToAccount(privkey) */

/* const rnd = (start, end) => Math.floor(Math.random() * end + start);
const RndAmount = (start, end) => Math.round((Math.random() * end + start) * 1000) / 1000;
const wait = (times) => new Promise(resolve=>setTimeout(resolve, times))
const hex = (value) => '0x' + BigInt(value).toString(16) */

/* const {address} = new Web3().eth.accounts.privateKeyToAccount(privkey) */


// const now = +new Date();
/* 
const evm_sendtx = async (feeOnly, rpc, privkey, to, value, abi, method, args ) => {
	try {
		const contract = new web3.eth.Contract(abi, to, { from: account.address, })
		const data = contract.methods[method](...args).encodeABI()
		const gasPrice = await web3.eth.getGasPrice()
		const gasLimit = await contract.methods[method](...args).estimateGas()
		if (feeOnly) return BigInt(gasPrice) * BigInt(gasLimit) // Math.ceil(Number(gasPrice)/1e9 * gasLimit / 1e3)/1e6;
		const json = { gasPrice, gasLimit, to, value, data }
		const signedTx = await web3.eth.accounts.signTransaction( json, privkey )
		const receipt = await web3.eth.sendSignedTransaction( signedTx.rawTransaction )
		if (receipt && receipt.transactionHash) return receipt.transactionHash
	} catch (err) {
		console.log(err)
	}
	return null
}

const buy = async (privkey, amount) => {
	await evm_sendtx(false, rpc, privkey, wethAddress, '0x0', erc20Abi, "approve", [
		routerAddress,
		hex(amount)
	])
	await wait(60000)
	await evm_sendtx(false, rpc, privkey, routerAddress, hex(amount),routerAbi, "swapExactETHForTokensSupportingFeeOnTransferTokens", [
		0,
		[wethAddress, tokenAddress],
		address,
		now
	])
	await wait(60000)
}

const sell = async (privkey, amount) => {
	await evm_sendtx(false, rpc, privkey, tokenAddress, '0x0', erc20Abi, "approve", [
		routerAddress,
		hex(amount)
	])
	await wait(60000)
	await evm_sendtx(false, rpc, privkey, routerAddress, routerAbi, '0x0', "swapExactTokensForETHSupportingFeeOnTransferTokens", [
		hex(amount),
		0,
        [wethAddress, tokenAddress],
		address,
		now
	])
	await wait(60000)
} */

const balanceOf = async () => {
	try {
		const balance = await provider.getBalance(wallet.address);
		const balanceInEth = ethers.utils.formatEther(balance)
		return Number(balanceInEth)
	} catch (error) {
		console.error(error)
	}
	return null
}

const swap = async () => {
	try {
		console.log('swap called')
	} catch (error) {
		console.error('swap exception ->',error)
	}
}

const run = async () => {
	const balance = await balanceOf()
	console.log("balance -> ",balance)
	if (balance!==null && balance>=minGas) await swap()
	setTimeout(run, 3000)
};
run();
