const axios = require('axios');

const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY || '90f74f60613c413b9dd11a255ba0ac30.SvqSaKM1CNCYWd38';

const CASE_REFERENCE = `
教培机构爆款引流短视频脚本及落地实操指南
案例1：针对手机成瘾 —— 【手机是孩子的新器官】
爆款标题：《强行没收孩子手机，你可能在亲手引爆炸弹！》
黄金开头：手机已经成了孩子的新器官，你强行拆除，就是在引爆亲子关系的炸弹！
干货交付：1.建立连接：每天睡前陪孩子聊1小时"废话"；2.好奇心引导：引导孩子利用手机进行"检索学习"；3.睡眠优先：解决厌学先解决睡眠。
反转/升华：教育不是要把孩子关进没有网络的"真空袋"，而是教他如何在数字洪流中握紧人生的舵盘。

案例2：针对厌学/学渣焦虑 —— 【学渣孩子是来报恩的】
爆款标题：《如果你家有个"学渣"孩子，恭喜你，他是来报恩的！》
黄金开头：别再盯着那张不及格的试卷了！学渣孩子往往拥有更强的抗挫力和健全的人格，他们是来治愈你的焦虑的！
干货交付：1.发现闪光点：停止比较；2.心态建设：接受孩子的不完美；3.运动疗法：带孩子去运动。
反转/升华：一个身心健康、懂得爱人的平庸孩子，远比一个拥有漂亮成绩单却"空心"的精英更珍贵。

案例3：针对拖拉磨蹭 —— 【隐性反抗的真相】
爆款标题：《孩子磨蹭不是因为笨，而是在对你进行"隐性反抗"！》
黄金开头：你越催，他越慢！孩子的磨蹭其实是在无声地宣布：我的时间，你说了不算。
干货交付：1.归还主权：把时间管理权还给孩子；2.番茄钟应用：教孩子用番茄钟法；3.停止唠叨。
反转/升华：培养出自律孩子的秘诀，不是你盯得紧，而是他内心有动力。

朋友圈文案结构：1.痛点引入（一句话引发共鸣）2.干货输出（3个具体方法）3.引导互动（评论/私信）
公众号文案结构：1.标题党2.开篇痛点3.深度分析4.解决方案5.案例佐证6.结尾引导
社群文案结构：1.欢迎语+痛点2.干货分享3.案例展示4.引导报名5.限时优惠
`;

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { schoolName, topicType, schoolAdvantage, topicDirection } = req.body;

        if (!schoolName || !topicType || !schoolAdvantage) {
            return res.status(400).json({ error: '缺少必要参数' });
        }

        const topicPrompts = {
            '招生引流': '招生引流类短视频，引导家长关注账号或领取资料',
            '家长必看': '家长必看类短视频，引发家长情感共鸣',
            '干货分享': '干货分享类短视频，提供具体可执行的方法论',
            '学员案例': '学员案例类短视频，展示真实进步案例',
            '热点结合': '热点结合类短视频，结合教育热点话题'
        };

        const prompt = `你是【教培行业顶级短视频营销专家与资深家庭教育指导师】，拥有15年教育行业实操经验。

核心哲学：坚持"人生不是赛道，而是原野"的理念。

方法论支撑：交付如"检索学习法"、"番茄钟"、"联想记忆法"等具体可执行的工具。

情感链接：以"懂行者"和"陪伴者"的姿态对话。

【参考案例】
${CASE_REFERENCE}

【刚性约束】
1. 严禁恐吓教育表述
2. 严禁过度美化苦难
3. 严禁过度推销教培产品
4. 语言调性：温暖、平和、有力量

【输入信息】
学校名称：${schoolName}
学校优势/特色：${schoolAdvantage}
选题类型：${topicPrompts[topicType] || topicType}
选题方向：${topicDirection || '根据选题类型自行发挥'}

【输出要求 - 必须生成以下5个部分】

1. 短视频文案（抖音/小红书/视频号3个版本）：
每个版本包含：
- 标题（1个）
- 开场钩子（3秒吸引眼球的黄金开头）
- 主体内容（干货+反转升华）
- 结尾引流CTA

2. 朋友圈文案（结构化内容）：
- 痛点引入
- 干货输出（3个方法）
- 引导互动

3. 公众号文案（深度长文）：
- 吸睛标题
- 开篇痛点
- 深度分析
- 解决方案
- 案例佐证
- 结尾引导

4. 社群文案（私域转化）：
- 欢迎语+痛点
- 干货分享
- 案例展示
- 引导报名
- 限时优惠

5. 关键词标签（8个热门标签）

请用JSON格式返回：
{
    "douyin": {
        "title": "抖音标题",
        "openingHook": "抖音开场",
        "scriptContent": "抖音主体内容",
        "endingHook": "抖音结尾"
    },
    "xiaohongshu": {
        "title": "小红书标题",
        "openingHook": "小红书开场",
        "scriptContent": "小红书主体内容",
        "endingHook": "小红书结尾"
    },
    "shipinhao": {
        "title": "视频号标题",
        "openingHook": "视频号开场",
        "scriptContent": "视频号主体内容",
        "endingHook": "视频号结尾"
    },
    "friendCircle": "朋友圈文案内容",
    "wechat": "公众号文案内容",
    "community": "社群文案内容",
    "tags": ["#标签1", "#标签2", "#标签3", "#标签4", "#标签5", "#标签6", "#标签7", "#标签8"]
}`;

        const response = await axios.post(
            'https://open.bigmodel.cn/api/paas/v4/chat/completions',
            {
                model: 'glm-4',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.8,
                top_p: 0.9
            },
            {
                headers: {
                    'Authorization': `Bearer ${ZHIPU_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 90000
            }
        );

        const content = response.data.choices[0].message.content;

        let result;
        try {
            result = JSON.parse(content);
        } catch (parseError) {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                result = JSON.parse(jsonMatch[0]);
            } else {
                return res.status(500).json({ error: 'AI返回格式解析失败' });
            }
        }

        res.json(result);
    } catch (error) {
        console.error('智谱AI调用失败:', error.response?.data || error.message);
        res.status(500).json({ error: 'AI生成失败，请稍后重试', details: error.message });
    }
};
