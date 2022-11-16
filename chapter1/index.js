web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
asciiToHex = Web3.utils.asciiToHex;
CONTRACT_ADDRESS='0xb5d3EaA38413df9fc651fa976954a667e8718da7';
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
contractInstance = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function voteForCandidate() {
  candidateName = $("#candidate").val();
  web3.eth.getAccounts()
  .then((accounts) => {
    return contractInstance.methods.voteForCandidate(asciiToHex(candidateName)).send({from: accounts[0]})
  })
  .then(() => {
    return contractInstance.methods.totalVotesFor(asciiToHex(candidateName)).call();
  })
  .then((voteCount) => {
    const div_id = candidates[candidateName];
    $("#" + div_id).html(voteCount);
  });
}

$(document).ready(function() {
  Object.keys(candidates).forEach((name) => {
    contractInstance.methods.totalVotesFor(asciiToHex(name)).call()
    .then((val) => {
      $("#" + candidates[name]).html(val);
    });
  });
});