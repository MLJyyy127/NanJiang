// campus/js/index.js

document.addEventListener('DOMContentLoaded', function() {
    // 解密验证功能
    function checkAnswer() {
        const answer = document.getElementById('secret-code').value.toLowerCase();
        const hint = document.getElementById('hint');
        
        if (answer.includes("the truth is not what it seems")) {
            hint.innerHTML = "✅ 验证通过！<br><strong>线索已解锁：图书馆第三排书架，从左数第七本书《数字迷踪》内页</strong>";
            hint.className = 'hint-message success';
            
            // 添加解密成功效果
            const encryptedSection = document.querySelector('.encrypted-section');
            encryptedSection.style.borderColor = '#4CAF50';
            encryptedSection.style.background = 'linear-gradient(135deg, #0d1b2a, #1a3a2a)';
            
            // 显示更多线索
            setTimeout(() => {
                hint.innerHTML += '<br><br>📖 附加线索：第43页有红色下划线的句子是关键';
            }, 1000);
        } else if (answer.trim() === '') {
            hint.innerHTML = "⚠️ 请输入解密后的答案";
            hint.className = 'hint-message warning';
        } else {
            hint.innerHTML = "❌ 答案错误，再仔细想想。提示：使用凯撒密码位移13解密。<br>常用工具：rot13.com";
            hint.className = 'hint-message error';
        }
    }
    
    // 回车键提交答案
    document.getElementById('secret-code').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    // 为新闻链接添加点击效果
    const newsLinks = document.querySelectorAll('.news-link');
    newsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const newsText = this.querySelector('span:first-child').textContent;
            alert(`[模拟访问] 正在加载: ${newsText}\n\n⚠️ 当前为演示环境，实际功能需正式授权`);
        });
    });
    
    // 动态音频可视化效果
    const visualizer = document.getElementById('visualizer');
    if (visualizer) {
        setInterval(() => {
            const bars = visualizer.querySelectorAll('.visualizer-bar');
            bars.forEach((bar, index) => {
                const randomHeight = Math.floor(Math.random() * 30) + 20;
                bar.style.height = randomHeight + '%';
                // 创建渐变色效果
                const hue = 180 + Math.sin(Date.now() / 1000 + index) * 40;
                bar.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
            });
        }, 300);
    }
    
    // 模拟网络状态指示器闪烁
    setInterval(() => {
        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
            statusDot.style.animation = 'none';
            setTimeout(() => {
                statusDot.style.animation = 'pulse 2s infinite';
            }, 10);
        }
    }, 5000);
    
    // 添加提示消息样式
    const style = document.createElement('style');
    style.textContent = `
        .hint-message {
            margin-top: 15px;
            font-size: 14px;
            padding: 10px;
            border-radius: 4px;
        }
        
        .hint-message.success {
            color: #4CAF50;
            background-color: rgba(76, 175, 80, 0.1);
            border-left: 4px solid #4CAF50;
        }
        
        .hint-message.warning {
            color: #ff9800;
            background-color: rgba(255, 152, 0, 0.1);
            border-left: 4px solid #ff9800;
        }
        
        .hint-message.error {
            color: #ff4444;
            background-color: rgba(255, 68, 68, 0.1);
            border-left: 4px solid #ff4444;
        }
        
        .card-text {
            color: #ccc;
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .audio-header {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .audio-icon {
            width: 20px;
            height: 20px;
            background-color: #4CAF50;
            border-radius: 50%;
            margin-right: 10px;
        }
        
        .audio-title {
            color: #ccc;
        }
        
        .usb-entry-wrapper {
            text-align: center;
            padding: 20px;
        }
        
        .usb-entry-desc {
            color: #888;
            font-size: 13px;
            margin-top: 10px;
        }
    `;
    document.head.appendChild(style);
    
    // 将checkAnswer函数暴露到全局作用域
    window.checkAnswer = checkAnswer;
});