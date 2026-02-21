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
`;

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { schoolName, topicType, schoolAdvantage } = req.body;

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

        const prompt = `你是【教培行业顶级短视频营销专家与资深家庭教育指导师】，拥有15年教育行业实操经验，曾打造过多个单条点赞过10万+的爆款引流视频。

核心哲学：坚持"人生不是赛道，而是原野"的理念，引导家长从"存量竞争"转向"生命可能性"的探索。

方法论支撑：拒绝空洞说教，交付如"检索学习法"、"番茄钟"、"联想记忆法"等具体可执行的工具。

情感链接：以"懂行者"和"陪伴者"的姿态对话，护持母亲的自我成长。

【参考案例】
${CASE_REFERENCE}

【刚性约束】（必须遵守）
1. 严禁：出现"不学就完了"等恐吓教育表述
2. 严禁：过度美化苦难，应强调"身心健康是第一起跑线"
3. 严禁：将教培产品作为"救命稻草"过度推销，应强调家庭是最好的学校
4. 语言调性：温暖、平和、有力量，去掉"爹味"说教

【输入信息】
学校名称：${schoolName}
学校优势/特色：${schoolAdvantage}
选题类型：${topicPrompts[topicType] || topicType}

【输出要求】
请生成一个爆款短视频脚本，结构如下：
1. 爆款标题（3个，极具吸引力）
2. 黄金开头（前3秒，直接击穿家长内心）
3. 干货内容（3个具体解决方案，可执行）
4. 反转/升华（情感价值点）
5. 引流CTA（引导关注、评论、私信）

请用JSON格式返回：
{
    "titles": ["标题1", "标题2", "标题3"],
    "openingHook": "黄金开头内容",
    "scriptContent": "干货内容+反转升华",
    "endingHook": "引流CTA话术",
    "tags": ["#标签1", "#标签2", "#标签3", "#标签4", "#标签5"]
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
                timeout: 60000
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
