document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typewriter');
    const archiveBag = document.getElementById('archive-bag');
    const usbDrive = document.getElementById('usb-drive');
    const nextBtn = document.getElementById('btn-next');

    // 1. 剧情文本
    const scripts = [
        "我是林岚，进入校报的第一个月，带我的苏晴学姐就失踪了。",
        "保卫处说她是‘请假回家’，但她的工位甚至没来得及收拾，那杯半满的咖啡已经长了霉。",
        "我在她的工位上发现了这个档案袋。里面好像有什么东西..."
    ];

    let currentLine = 0;

    // 2. 逐字打印函数
    function typeWriter(text, i, fnCallback) {
        if (i < text.length) {
            textElement.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true">|</span>';
            setTimeout(() => typeWriter(text, i + 1, fnCallback), 50);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
        }
    }

    // 3. 开始播放第一句
    typeWriter(scripts[0], 0, () => {
        setTimeout(() => {
            typeWriter(scripts[1], 0, null); // 自动接着播“保卫处带走了...”
        }, 1000); // 停顿1秒再播第二句
        // 播放完第一句后可以根据逻辑触发更多
    });

    // 4. 点击档案袋逻辑
    archiveBag.addEventListener('click', () => {
        // 切换文本
        typeWriter(scripts[2], 0, null);
        
        // 露出U盘
        usbDrive.classList.remove('hidden');
        usbDrive.style.opacity = "1";
        
        // 档案袋稍微晃动反馈
        archiveBag.style.transform = "rotate(-2deg) scale(1.02)";
    });

    // 5. 点击U盘逻辑
    usbDrive.addEventListener('click', () => {
        textElement.innerHTML = "这是学姐的U盘。里面或许有她失踪的线索。";
        nextBtn.classList.remove('hidden');
        nextBtn.style.opacity = "1";
    });

    // 6. 点击按钮进入下一关
    nextBtn.addEventListener('click', () => {
        // 这里跳转到你的 Django 路由，比如 U盘管理页面
        window.location.href = "/usb_drive/";
    });
});