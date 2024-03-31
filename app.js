window.ethereum.enable();
var provider = new ethers.providers.Web3Provider(
    window.ethereum,
    11155111,
    "https://sepolia.infura.io/v3/" // Replace with the correct network name or RPC URL
);

var MoodContractAddress = "0x549419C4dEE1Bd6Fe0A8d9b0A66E8D1CF8e0f220";
var MoodContractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_mood",
                "type": "string"
            }
        ],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMood",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

var MoodContract;
var signer;

provider.listAccounts().then(function (accounts) {
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(
        MoodContractAddress,
        MoodContractABI,
        signer
    );
});

async function getMood() {
    getMoodPromise = MoodContract.getMood();
    var Mood = await getMoodPromise;
    console.log(Mood);
}

async function setMood() {
    let mood = document.getElementById("mood").value;
    setMoodPromise = MoodContract.setMood(mood);
    await setMoodPromise;
}
