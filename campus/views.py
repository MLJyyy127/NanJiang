from django.shortcuts import render, get_object_or_404
from django.http import Http404

def campus_index(request):
    """官网首页视图"""
    return render(request, 'campus/index.html')

# 定义所有案件数据（可以在文件顶部定义，供多个函数使用）
ALL_CASES = [
    {
        'id': 1,
        'case_id': 'NJ-1995-001',
        'title': '老图书馆第七藏书室失踪案',
        'date': '1995年10月17日',
        'location': '老图书馆B1层',
        'persons': '3名历史系学生',
        'category': 'student',
        'status': 'unsolved',
        'tags': ['图书馆', '失踪', '历史系', '未解'],
        'clues': [
            'B1层监控显示三名学生进入后未出来',
            '第七藏书室在官方平面图中不存在',
            '现场发现一本打开的档案，内容被涂黑'
        ],
        'warning': '该案件涉及的空间异常现象至今仍在观测中。',
        'content': '1995年10月17日深夜，三名历史系学生在老图书馆B1层的"第七藏书室"（该室在官方平面图中不存在）查阅档案时突然消失。监控显示他们进入B1层走廊后，再也没有出来。校方组织了三次大规模搜索，均未发现任何痕迹。值得注意的是，第七藏书室的门牌只在特定时间出现，且进入条件未知。'
    },
    {
        'id': 2,
        'case_id': 'NJ-1998-007',
        'title': '音乐系午夜钢琴自动演奏案',
        'date': '1998-2002年间',
        'location': '音乐系练习楼',
        'persons': '7名音乐系学生',
        'category': 'student',
        'status': 'sealed',
        'tags': ['音乐系', '灵异', '退学', '封存'],
        'clues': [
            '所有事件都发生在午夜12点后',
            '自动演奏的曲目均为肖邦《葬礼进行曲》',
            '目击者都在一周内退学'
        ],
        'note': '该案件相关记录已封存，禁止任何人以任何形式调查。',
        'content': '1998年至2002年间，七名音乐系学生在单独练习时遭遇相同经历：午夜12点后，钢琴会自动弹奏肖邦的《葬礼进行曲》，演奏者位置空无一人。所有目击者都在一周内退学，且拒绝谈论此事。调查发现，这些钢琴都曾属于一位在1985年意外去世的音乐系教授。'
    },
    {
        'id': 3,
        'case_id': 'NJ-1987-013',
        'title': '遗传学实验室生物泄露事件',
        'date': '1987年3月23日',
        'location': '遗传学实验室B-7',
        'persons': '张教授及2名助手',
        'category': 'faculty',
        'status': 'sealed',
        'tags': ['实验室', '生物危害', '失踪', '绝密'],
        'clues': [
            '实验室门从内部反锁',
            '发现未知生物细胞样本',
            '录音中有人声和无法识别的语言'
        ],
        'warning': '⚠ 该案件涉及生物安全四级威胁，所有样本已转移至国家生物安全实验室。',
        'danger': True,
        'content': '1987年，遗传学张教授进行秘密实验时发生泄露。次日早晨，实验室被发现时，三人已不见踪影，只留下大量不符合已知生物特征的细胞样本和一段令人不安的录音。录音中除了三人的声音，还有无法识别的低频噪音。该实验室已永久封闭。'
    },
    {
        'id': 4,
        'case_id': 'NJ-2005-024',
        'title': '梅园3号楼第十三间宿舍案',
        'date': '2005年至今',
        'location': '梅园3号楼',
        'persons': '多名住宿学生',
        'category': 'building',
        'status': 'investigating',
        'tags': ['宿舍', '时间异常', '记忆缺失', '调查中'],
        'clues': [
            '第13间宿舍门牌只在特定时间出现',
            '进入者会经历时间扭曲',
            '所有经历者均无法回忆细节'
        ],
        'note': '现行规定：梅园3号楼夜间23:00后禁止学生单独外出。',
        'content': '梅园3号楼在设计上只有12间宿舍，但多名学生报告在深夜看到第13间的门牌。进入者会经历时间错乱，出来后发现自己失踪了数小时甚至数天，且对期间经历毫无记忆。经仪器检测，该区域存在异常时空波动。'
    },
    {
        'id': 5,
        'case_id': 'NJ-2020-042',
        'title': '镜湖中心神秘漩涡与低语',
        'date': '2020年8月至今',
        'location': '镜湖中心区域',
        'persons': '保安王建国等多人',
        'category': 'unsolved',
        'status': 'investigating',
        'tags': ['镜湖', '声纳', '人工结构', '调查中'],
        'clues': [
            '漩涡在无风条件下形成',
            '声纳显示湖底有大型结构',
            '录音分析显示有多人低语声'
        ],
        'warning': '最新声纳扫描显示，湖底结构比预想的更复杂，似乎有通道连接其他区域。',
        'content': '夜间巡逻的保安王建国报告，镜湖中心在无风情况下产生漩涡，并从中传出"类似多人低语"的声音。声纳探测显示湖底有大型人工结构，但历史记录中从未提及此处有建筑。潜水员尝试接近但均因设备故障被迫返回。'
    }
]

def archive_index(request):
    """校史档案首页 - 显示所有案件"""
    
    # 统计数据
    total_cases = len(ALL_CASES)
    unsolved_cases = len([c for c in ALL_CASES if c['status'] == 'unsolved'])
    
    # 计算涉及人员数量
    involved_persons = 0
    for case in ALL_CASES:
        persons_text = str(case['persons'])
        # 简单的计数逻辑，实际可能需要更复杂的解析
        if '名' in persons_text:
            try:
                num = int(persons_text.split('名')[0])
                involved_persons += num
            except:
                involved_persons += 1
        else:
            involved_persons += 1
    
    # 获取最早的年份
    earliest_year = 9999
    for case in ALL_CASES:
        date_str = str(case['date'])
        for year in range(1900, 2100):
            if str(year) in date_str:
                earliest_year = min(earliest_year, year)
                break
    
    if earliest_year == 9999:
        earliest_year = 1995  # 默认值
    
    context = {
        'cases': ALL_CASES,
        'total_cases': total_cases,
        'unsolved_cases': unsolved_cases,
        'involved_persons': involved_persons,
        'earliest_year': earliest_year,
    }
    
    return render(request, 'campus/archive.html', context)

def archive_category(request, category):
    """按分类显示档案"""
    
    # 分类名称映射
    category_mapping = {
        'unsolved': '未解之谜',
        'student': '学生案件',
        'faculty': '教职工案件',
        'building': '建筑相关',
    }
    
    # 获取分类名称
    category_name = category_mapping.get(category, '未知分类')
    
    # 过滤案件
    if category == 'unsolved':
        # 对于未解之谜，显示状态为unsolved的所有案件
        filtered_cases = [case for case in ALL_CASES if case['status'] == 'unsolved']
    else:
        filtered_cases = [case for case in ALL_CASES if case['category'] == category]
    
    context = {
        'cases': filtered_cases,
        'category_name': category_name,
        'total_cases': len(filtered_cases),
    }
    
    return render(request, 'campus/archive_category.html', context)

def archive_detail(request, case_id):
    """显示单个案件详情"""
    
    # 查找特定案件
    case = None
    for c in ALL_CASES:
        if c['id'] == case_id:
            case = c
            break
    
    if not case:
        raise Http404("案件不存在")
    
    # 状态文本映射
    status_text_map = {
        'unsolved': '未解决',
        'sealed': '已封存',
        'investigating': '调查中',
    }
    
    # 查找相关案件（相同分类的案件，排除当前案件）
    related_cases = []
    for c in ALL_CASES:
        if c['id'] != case_id and c['category'] == case['category']:
            related_cases.append(c)
        if len(related_cases) >= 3:  # 最多显示3个相关案件
            break
    
    context = {
        'case': case,
        'status_text': status_text_map.get(case.get('status', ''), '未知状态'),
        'related_cases': related_cases,
    }
    
    return render(request, 'campus/archive_detail.html', context)