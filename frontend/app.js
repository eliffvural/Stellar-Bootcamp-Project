// Contract configuration
const CONTRACT_CONFIG = {
    // Will be loaded from URL params or input
    contractId: '',
    network: 'testnet', // 'local' for local development
    localRpcUrl: 'http://localhost:8000/soroban/rpc'
};

// State
let isConnected = false;
let currentValue = 0;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Stellar Calculator App Loaded');
    
    // Check if Freighter is installed
    checkFreighter();
    
    // Load contract ID from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const contractId = urlParams.get('contract') || localStorage.getItem('contractId') || '';
    
    if (contractId) {
        CONTRACT_CONFIG.contractId = contractId;
        updateContractInfo(contractId);
    }
    
    // Contract ID input
    const contractIdInput = document.getElementById('contractIdInput');
    if (contractIdInput) {
        contractIdInput.value = contractId;
        contractIdInput.addEventListener('change', (e) => {
            CONTRACT_CONFIG.contractId = e.target.value;
            updateContractInfo(e.target.value);
        });
    }
    
    // Connect wallet button
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    
    // Initial value display
    updateCurrentValue();
});

// Check if Freighter is installed
function checkFreighter() {
    // Wait for Freighter to load
    setTimeout(() => {
        if (!window.freighterApi) {
            console.error('Freighter is not installed!');
            showLog('⚠️ Please install Freighter wallet extension from freighter.app', 'error');
            showLog('📚 Visit: https://freighter.app', 'error');
        } else {
            showLog('✅ Freighter wallet detected', 'success');
        }
    }, 500);
}

// Connect Freighter wallet
async function connectWallet() {
    try {
        // Check if Freighter API is available
        if (!window.freighterApi) {
            showLog('❌ Freighter wallet extension not found. Please install it.', 'error');
            showLog('📦 Get it from: https://freighter.app', 'error');
            return;
        }
        
        // Check if already connected
        const { isInstalled } = await window.freighterApi.isInstalled();
        if (!isInstalled) {
            showLog('Freighter is not installed! Please install it first.', 'error');
            return;
        }
        
        const { isConnected: connected } = await window.freighterApi.isConnected();
        
        if (!connected) {
            const response = await window.freighterApi.setAllowed();
            if (!response) {
                showLog('Wallet connection refused', 'error');
                return;
            }
        }
        
        const { publicKey } = await window.freighterApi.getPublicKey();
        
        isConnected = true;
        
        // Update UI
        document.getElementById('walletInfo').className = 'wallet-info connected';
        document.getElementById('walletInfo').innerHTML = `
            <div>
                <strong>✅ Connected:</strong>
                <div class="wallet-address">${publicKey.slice(0, 12)}...${publicKey.slice(-12)}</div>
            </div>
            <button class="btn btn-danger" onclick="disconnectWallet()">Disconnect</button>
        `;
        
        showLog(`✅ Wallet connected: ${publicKey.slice(0, 12)}...`, 'success');
    } catch (error) {
        console.error('Connection error:', error);
        showLog('Failed to connect wallet: ' + error.message, 'error');
    }
}

// Disconnect wallet
function disconnectWallet() {
    isConnected = false;
    document.getElementById('walletInfo').className = 'wallet-info';
    document.getElementById('walletInfo').innerHTML = `
        <button class="btn btn-primary" id="connectWalletBtn">Cüzdan Bağla</button>
    `;
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    showLog('Wallet disconnected', 'error');
}

// Helper function to call contract via Freighter
async function callContract(functionName, ...args) {
    if (!CONTRACT_CONFIG.contractId) {
        showLog('❌ Contract ID not set! Please enter contract ID first.', 'error');
        return null;
    }
    
    if (!isConnected) {
        showLog('❌ Please connect your wallet first', 'error');
        return null;
    }
    
    try {
        showLog(`🔄 Calling ${functionName}...`, 'info');
        
        // Get network details
        const { networkDetails } = await window.freighterApi.getNetworkDetails();
        
        // Use Freighter to call the contract
        const result = await window.freighterApi.invoke({
            contractAddress: CONTRACT_CONFIG.contractId,
            method: functionName,
            args: args.map(arg => ({
                type: 'scv_i64',
                i64: arg.toString()
            }))
        });
        
        // Parse result
        if (result && result.xdr) {
            const returnValue = result.returnValue;
            if (returnValue) {
                // Try to extract the value
                currentValue = parseInt(returnValue) || currentValue;
                showLog(`✅ ${functionName} completed`, 'success');
                updateCurrentValue();
                return returnValue;
            }
        }
        
        showLog(`✅ ${functionName} completed`, 'success');
        updateCurrentValue();
        return result;
    } catch (error) {
        console.error('Contract call error:', error);
        showLog(`❌ Error calling ${functionName}: ${error.message}`, 'error');
        
        // For development: show simulation message
        if (error.message.includes('simulate')) {
            showLog('💡 For local testing, use: stellar contract invoke --local', 'info');
        }
        
        return null;
    }
}

// Initialize contract
async function initializeContract() {
    const value = parseInt(document.getElementById('initValue').value);
    if (isNaN(value)) {
        showLog('❌ Please enter a valid number', 'error');
        return;
    }
    
    const result = await callContract('initialize', value);
    if (result !== null) {
        currentValue = value;
        showLog(`✅ Initialized with value: ${value}`, 'success');
    }
}

// Get current value
async function getCurrentValue() {
    const result = await callContract('get_value');
    if (result !== null) {
        showLog('✅ Current value fetched successfully', 'success');
    }
}

// Reset value
async function resetValue() {
    if (!confirm('Are you sure you want to reset the value to 0?')) {
        return;
    }
    
    const result = await callContract('reset');
    if (result !== null) {
        currentValue = 0;
        showLog('✅ Value reset to 0', 'success');
    }
}

// Add value
async function addValue() {
    const value = parseInt(document.getElementById('addValue').value);
    if (isNaN(value)) {
        showLog('❌ Please enter a valid number', 'error');
        return;
    }
    
    const result = await callContract('add', value);
    if (result !== null) {
        currentValue += value;
        showLog(`✅ Added ${value} → Result: ${currentValue}`, 'success');
    }
}

// Subtract value
async function subtractValue() {
    const value = parseInt(document.getElementById('subtractValue').value);
    if (isNaN(value)) {
        showLog('❌ Please enter a valid number', 'error');
        return;
    }
    
    const result = await callContract('subtract', value);
    if (result !== null) {
        currentValue -= value;
        showLog(`✅ Subtracted ${value} → Result: ${currentValue}`, 'success');
    }
}

// Multiply value
async function multiplyValue() {
    const value = parseInt(document.getElementById('multiplyValue').value);
    if (isNaN(value)) {
        showLog('❌ Please enter a valid number', 'error');
        return;
    }
    
    const result = await callContract('multiply', value);
    if (result !== null) {
        currentValue *= value;
        showLog(`✅ Multiplied by ${value} → Result: ${currentValue}`, 'success');
    }
}

// Divide value
async function divideValue() {
    const value = parseInt(document.getElementById('divideValue').value);
    if (isNaN(value)) {
        showLog('❌ Please enter a valid number', 'error');
        return;
    }
    
    if (value === 0) {
        showLog('❌ Cannot divide by zero!', 'error');
        return;
    }
    
    const result = await callContract('divide', value);
    if (result !== null) {
        currentValue = Math.floor(currentValue / value);
        showLog(`✅ Divided by ${value} → Result: ${currentValue}`, 'success');
    }
}

// Modulo value
async function moduloValue() {
    const value = parseInt(document.getElementById('moduloValue').value);
    if (isNaN(value)) {
        showLog('❌ Please enter a valid number', 'error');
        return;
    }
    
    if (value === 0) {
        showLog('❌ Cannot modulo by zero!', 'error');
        return;
    }
    
    const result = await callContract('modulo', value);
    if (result !== null) {
        currentValue = currentValue % value;
        showLog(`✅ Modulo by ${value} → Result: ${currentValue}`, 'success');
    }
}

// Power value
async function powerValue() {
    const exponent = parseInt(document.getElementById('powerExponent').value);
    if (isNaN(exponent)) {
        showLog('❌ Please enter a valid exponent', 'error');
        return;
    }
    
    if (exponent < 0) {
        showLog('❌ Negative exponents are not supported!', 'error');
        return;
    }
    
    const result = await callContract('power', exponent);
    if (result !== null) {
        currentValue = Math.pow(currentValue, exponent);
        showLog(`✅ Raised to power ${exponent} → Result: ${currentValue}`, 'success');
    }
}

// Absolute value
async function absValue() {
    const result = await callContract('abs');
    if (result !== null) {
        currentValue = Math.abs(currentValue);
        showLog(`✅ Applied absolute value → Result: ${currentValue}`, 'success');
    }
}

// Increment value
async function incrementValue() {
    const result = await callContract('increment');
    if (result !== null) {
        currentValue += 1;
        showLog(`✅ Incremented by 1 → Result: ${currentValue}`, 'success');
    }
}

// Decrement value
async function decrementValue() {
    const result = await callContract('decrement');
    if (result !== null) {
        currentValue -= 1;
        showLog(`✅ Decremented by 1 → Result: ${currentValue}`, 'success');
    }
}

// Update current value display
function updateCurrentValue() {
    const display = document.getElementById('currentValue');
    if (display) {
        display.textContent = currentValue;
        // Add pulse animation
        display.style.animation = 'none';
        setTimeout(() => {
            display.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
}

// Show log message
function showLog(message, type = 'info') {
    const logContainer = document.getElementById('logContainer');
    
    // Remove empty message
    const emptyMsg = logContainer.querySelector('.log-empty');
    if (emptyMsg) {
        emptyMsg.remove();
    }
    
    // Create log entry
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    if (type === 'error') {
        logEntry.classList.add('error');
    } else if (type === 'success') {
        logEntry.classList.add('success');
    }
    
    const time = new Date().toLocaleTimeString();
    logEntry.innerHTML = `
        <div class="log-time">${time}</div>
        <div class="log-message">${message}</div>
    `;
    
    // Add to top
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Keep only last 20 entries
    while (logContainer.children.length > 20) {
        logContainer.removeChild(logContainer.lastChild);
    }
    
    // Auto scroll to top
    logContainer.scrollTop = 0;
}

// Update contract info
function updateContractInfo(contractId) {
    const info = document.getElementById('contractInfo');
    if (info) {
        if (contractId) {
            info.textContent = `Contract: ${contractId}`;
        } else {
            info.textContent = 'Contract: Not deployed';
        }
        localStorage.setItem('contractId', contractId);
    }
}

// Make functions globally available
window.initializeContract = initializeContract;
window.getCurrentValue = getCurrentValue;
window.resetValue = resetValue;
window.addValue = addValue;
window.subtractValue = subtractValue;
window.multiplyValue = multiplyValue;
window.divideValue = divideValue;
window.moduloValue = moduloValue;
window.powerValue = powerValue;
window.absValue = absValue;
window.incrementValue = incrementValue;
window.decrementValue = decrementValue;
window.disconnectWallet = disconnectWallet;
