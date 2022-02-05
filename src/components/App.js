import React, { Component } from 'react'
import Web3 from 'web3';


class App extends Component {

  async componentWillMount() {
    console.log('DEBUG: ... component mounted!')
    await this.loadWeb3()
    // await this.loadBlockchainData()
  }

  // async loadBlockchainData(){
  //   const web3 = window.web3

  //   const accounts = await web3.eth.getAccounts()
  //   this.setState({ account : accounts[0]})

  //   const netwrokId = await web3.eth.net.getId()

  //   const TetherTokenData = TetherToken.networks[netwrokId]

  //   if(TetherTokenData){

  //     const tetherToken = new web3.eth.Contract(TetherToken.abi,TetherTokenData.address)
  //     this.setState({tetherToken})
  //     let tethertokenbalance = await tetherToken.methods.balance(this.state.account).call()
  //     this.setState({ tethertokenbalance : tethertokenbalance.toString() })

  //   }else {
  //     window.alert('Tether token contract not deployed to detected network.')
  //   }

  //   const DummyTokenData = DummyToken.networks[netwrokId]

  //   if(DummyTokenData){

  //     const dummyToken = new web3.eth.Contract(DummyToken.abi,DummyTokenData.address)
  //     this.setState({dummyToken})
  //     let dummytokenbalance = await dummyToken.methods.balance(this.state.account).call()
  //     this.setState({dummytokenbalance : dummytokenbalance.toString()})

  //   }else {
  //     window.alert('Dummy token contract not deployed to detected network.')
  //   }

  //   const StakingDappData = DummyToken.networks[netwrokId]

  //   if(StakingDappData){

  //     const stakingdapp = new web3.eth.Contract(StakingDapp.abi,StakingDappData.address)
  //     this.setState({stakingdapp})
  //     let stakingdappbalance = await stakingdapp.methods.stakingBalance(this.state.account).call()
  //     this.setState({stakingdappbalance : stakingdappbalance.toString()})
  //   }else {
  //     window.alert('Staking Dapp contract not deployed to detected network.')
  //   }

  //   this.setState({ loading: false })

  // }

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
