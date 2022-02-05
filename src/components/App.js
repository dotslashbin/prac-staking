import React, { Component } from 'react'
import Web3 from 'web3'
import TetherToken from '../build/Tether_Token.json'
import StakingDapp from '../build/Staking_Dapp.json'
import DummyToken from '../build/Dummy_Token.json'

class App extends Component {

  async componentWillMount() {
    console.log('DEBUG: ... component mounted!')
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData(){
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account : accounts[0]})

    const networkId = await web3.eth.net.getId()
    console.log(`DEBUG -> NETWORK ID: ${networkId}`)
    const TetherTokenData = TetherToken.networks[networkId]

    if(TetherTokenData){
      const tetherToken = new web3.eth.Contract(TetherToken.abi,TetherTokenData.address)
      this.setState({tetherToken})
      let tethertokenbalance = await tetherToken.methods.balance(this.state.account).call()
      this.setState({ tethertokenbalance : tethertokenbalance.toString() })
    }else {
      window.alert('DEBUG: ...Wala ang TETHER token contract ani nga network...')
    }

    const DummyTokenData = DummyToken.networks[networkId]

    if(DummyTokenData){
      const dummyToken = new web3.eth.Contract(DummyToken.abi,DummyTokenData.address)
      this.setState({dummyToken})
      let dummytokenbalance = await dummyToken.methods.balance(this.state.account).call()
      this.setState({dummytokenbalance : dummytokenbalance.toString()})
    }else {
      window.alert('DEBUG: ... Wala ang DUMMY token ani nga network')
    }

    const StakingDappData = DummyToken.networks[networkId]
    if(StakingDappData){
      const stakingdapp = new web3.eth.Contract(StakingDapp.abi,StakingDappData.address)
      this.setState({stakingdapp})
      let stakingdappbalance = await stakingdapp.methods.stakingBalance(this.state.account).call()
      this.setState({stakingdappbalance : stakingdappbalance.toString()})
    }else {
      window.alert('DEBUG: ... wala nag STAKING DAPP na token ani nga network')
    }

    this.setState({ loading: false })

  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()

    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      console.alert("DEBUG: Browser is not compatible with ethereum...")
    }
  }

  stakeTokens = (amount) =>{
    this.setState({loading: true})
    this.state.tetherToken.methods.approve(this.state.stakingdapp._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
      this.state.stakingdapp.methods.stakeTokens(amount).send({from:this.state.account}).on('transactionHash', (hash) => {
        this.setState({loading:false})
      })
    })
  }

  unstakeTokens = (amount) =>{
    this.setState({loading: true})
    this.state.stakingdapp.methods.unstakeTokens().send({from:this.state.account}).on('transactionHash', (hash) =>{
      this.setState({loading: false})
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account:  '0x0',
      tetherToken:{},
      dummyToken:{},
      stakingdapp:{},
      tethertokenbalance: '0',
      dummytokenbalance: '0',
      stakingdappbalance: '0',
      loading: true

    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          HEADER LANG
        </header>
        <div>
          haha a class component for the longest time
        </div>
      </div>
    );
  }
}

export default App;
