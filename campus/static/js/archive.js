// campus/js/archive.js

document.addEventListener('DOMContentLoaded', function() {
    // 档案筛选功能
    window.filterArchives = function(category) {
        const cards = document.querySelectorAll('.archive-card');
        const tabs = document.querySelectorAll('.nav-tab');
        
        // 更新活跃标签
        tabs.forEach(tab => {
            if (tab.textContent.includes(category.replace('all', '全部案件'))) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // 筛选卡片
        cards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else if (card.dataset.category.includes(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };
    
    // 搜索功能
    window.searchArchives = function() {
        const searchTerm = document.getElementById('archive-search').value.toLowerCase();
        const cards = document.querySelectorAll('.archive-card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
                // 添加高亮效果
                if (searchTerm) {
                    card.style.boxShadow = '0 0 20px rgba(102, 204, 255, 0.3)';
                    card.style.borderColor = '#66ccff';
                } else {
                    card.style.boxShadow = '';
                    card.style.borderColor = '#222';
                }
            } else {
                card.style.display = 'none';
            }
        });
    };
    
    // 详情查看功能
    const caseDetails = {
        case1: {
            title: "图书馆第七藏书室失踪事件 - 完整档案",
            content: `
                <div class="detail-header">
                    <h2>档案编号：NJ-1995-001</h2>
                    <span class="detail-status unsolved">未解决</span>
                </div>
                
                <div class="detail-section">
                    <h3>📖 事件经过</h3>
                    <p>1995年10月17日晚11:47，历史系学生李明、王芳、张伟三人进入老图书馆B1层进行课题研究。根据最后的监控画面，他们在B1层走廊尽头的一扇未标注的门前停留，随后进入。自此，三人完全消失。</p>
                    
                    <div class="detail-note">
                        <strong>注：</strong> 校方记录显示，老图书馆B1层只有6个房间，监控中的"第七房间"在建筑图纸上不存在。
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>🔍 调查记录</h3>
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-date">1995.10.18</div>
                            <div class="timeline-content">首次搜索，未发现异常</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-date">1995.10.20</div>
                            <div class="timeline-content">红外热成像检测到异常冷点</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-date">1995.10.25</div>
                            <div class="timeline-content">聘请外部专家，磁场检测异常</div>
                        </div>
                        <div class="timeline-date">1996.01.15</div>
                        <div class="timeline-content">B1层永久封闭</div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>📸 物证照片</h3>
                    <div class="evidence-grid">
                        <div class="evidence-item">
                            <div class="evidence-img">[现场照片-已模糊处理]</div>
                            <div class="evidence-desc">现场遗留的《南江地方志》</div>
                        </div>
                        <div class="evidence-item">
                            <div class="evidence-img">[红外热成像图]</div>
                            <div class="evidence-desc">墙面温度异常分布</div>
                        </div>
                    </div>
                </div>
                
                <div class="detail-section warning">
                    <h3>⚠ 最新报告</h3>
                    <p>2020年，安装在B1层的运动传感器曾三次检测到活动，但监控画面中空无一人。音频记录到类似翻书声和模糊的低语。</p>
                </div>
            `
        },
        case2: {
            title: "音乐厅的午夜琴声 - 音频档案",
            content: `
                <div class="detail-header">
                    <h2>档案编号：NJ-1998-007</h2>
                    <span class="detail-status unsolved">未解决</span>
                </div>
                
                <div class="audio-player">
                    <h3>🎵 现场录音片段</h3>
                    <div class="audio-controls">
                        <button onclick="playAudio()">▶ 播放录音</button>
                        <span class="audio-time">00:47</span>
                    </div>
                    <div class="audio-visual">
                        <div class="audio-wave"></div>
                    </div>
                    <p class="audio-note">录音内容：肖邦《葬礼进行曲》片段，包含无法识别的低频音</p>
                </div>
                
                <div class="detail-section">
                    <h3>🎼 受害者陈述</h3>
                    <div class="victim-statements">
                        <div class="statement">
                            <strong>王同学（1998.03.15）：</strong> "我看到琴键自己在动...就像有隐形的手在弹奏。温度突然下降，我能看到自己的呼吸。"
                        </div>
                        <div class="statement">
                            <strong>李同学（2000.11.22）：</strong> "不只是听到琴声...我感觉到有人在看我。从舞台的阴影里。我一周后就退学了。"
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>📊 声学分析</h3>
                    <ul>
                        <li><strong>主频率：</strong> 440Hz（标准A音）</li>
                        <li><strong>异常频率：</strong> 7Hz（次声波，可引发不适感）</li>
                        <li><strong>节奏分析：</strong> 精确为♩=60，误差小于0.01%</li>
                        <li><strong>谐波分析：</strong> 包含不自然的泛音列</li>
                    </ul>
                </div>
            `
        }
        // 其他案件详情...
    };
    
    window.showDetails = function(caseId) {
        const modal = document.getElementById('detailModal');
        const content = document.getElementById('modalContent');
        
        if (caseDetails[caseId]) {
            content.innerHTML = caseDetails[caseId].content;
            modal.style.display = 'block';
            
            // 添加样式
            const style = document.createElement('style');
            style.textContent = `
                .detail-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #333;
                }
                
                .detail-header h2 {
                    color: #66ccff;
                    margin: 0;
                }
                
                .detail-status {
                    padding: 5px 15px;
                    border-radius: 4px;
                    font-weight: bold;
                    font-size: 14px;
                }
                
                .detail-status.unsolved {
                    background: rgba(255, 68, 68, 0.2);
                    color: #ff6666;
                    border: 1px solid #ff4444;
                }
                
                .detail-section {
                    margin-bottom: 25px;
                }
                
                .detail-section h3 {
                    color: #4db8ff;
                    margin-bottom: 15px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #333;
                }
                
                .detail-note {
                    background: rgba(255, 235, 59, 0.1);
                    border-left: 4px solid #ffeb3b;
                    padding: 12px;
                    margin: 15px 0;
                    border-radius: 0 4px 4px 0;
                }
                
                .timeline {
                    position: relative;
                    padding-left: 30px;
                }
                
                .timeline::before {
                    content: '';
                    position: absolute;
                    left: 7px;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: #003366;
                }
                
                .timeline-item {
                    position: relative;
                    margin-bottom: 20px;
                }
                
                .timeline-item::before {
                    content: '';
                    position: absolute;
                    left: -31px;
                    top: 5px;
                    width: 12px;
                    height: 12px;
                    background: #66ccff;
                    border-radius: 50%;
                    border: 3px solid #003366;
                }
                
                .timeline-date {
                    color: #66ccff;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .timeline-content {
                    color: #ccc;
                    background: #1a1a1a;
                    padding: 10px;
                    border-radius: 4px;
                    border-left: 3px solid #66ccff;
                }
                
                .evidence-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                    margin-top: 15px;
                }
                
                .evidence-item {
                    text-align: center;
                }
                
                .evidence-img {
                    background: #000;
                    color: #666;
                    height: 150px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #333;
                    border-radius: 4px;
                    margin-bottom: 10px;
                }
                
                .evidence-desc {
                    color: #aaa;
                    font-size: 14px;
                }
                
                .warning {
                    background: rgba(255, 68, 68, 0.1);
                    padding: 15px;
                    border-radius: 4px;
                    border-left: 4px solid #ff4444;
                }
                
                .audio-player {
                    background: #0a0a0a;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 25px;
                    border: 1px solid #1e3a5f;
                }
                
                .audio-controls {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin: 15px 0;
                }
                
                .audio-controls button {
                    background: linear-gradient(135deg, #003366, #006699);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                }
                
                .audio-time {
                    color: #888;
                    font-family: monospace;
                }
                
                .audio-visual {
                    background: #000;
                    height: 60px;
                    border-radius: 4px;
                    margin: 15px 0;
                    display: flex;
                    align-items: center;
                    padding: 0 20px;
                }
                
                .audio-wave {
                    width: 100%;
                    height: 30px;
                    background: repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 2px,
                        #003366 2px,
                        #003366 4px
                    );
                }
                
                .audio-note {
                    color: #888;
                    font-size: 13px;
                    text-align: center;
                    margin-top: 10px;
                }
                
                .victim-statements {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                
                .statement {
                    background: rgba(13, 27, 42, 0.5);
                    padding: 15px;
                    border-radius: 4px;
                    border-left: 3px solid #4db8ff;
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    window.closeModal = function() {
        document.getElementById('detailModal').style.display = 'none';
    };
    
    // 点击模态框外部关闭
    window.onclick = function(event) {
        const modal = document.getElementById('detailModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
    
    // 搜索框回车键支持
    document.getElementById('archive-search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchArchives();
        }
    });
});