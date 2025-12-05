const socket = io();

const outputArea = document.getElementById('output-area');
const inputField = document.getElementById('command-input');

// 監聽伺服器傳來的訊息
socket.on('message', (data) => {
    appendMessage(data);
});

// 監聽玩家按下 Enter 鍵
inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const msg = inputField.value;
        if (msg.trim() !== "") {
            // 把指令顯示在自己的螢幕上 (淡淡的灰色，代表輸入過)
            appendMessage({ type: 'local', text: `> ${msg}` });
            
            // 發送給伺服器
            socket.emit('command', msg);
            
            // 清空輸入框
            inputField.value = '';
        }
    }
});

// 將訊息顯示在螢幕上
function appendMessage(data) {
    const div = document.createElement('div');
    
    // 根據類型加上不同的 CSS class (控制顏色)
    if (data.type) div.classList.add(data.type);
    
    // 支援 HTML (為了讓 Server 可以傳送 <br> 或 <span>)
    div.innerHTML = data.text; 
    
    outputArea.appendChild(div);

    // 自動捲動到底部
    outputArea.scrollTop = outputArea.scrollHeight;
}