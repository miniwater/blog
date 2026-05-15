// import type { ImageMetadata } from 'astro';
import obaby from '@/assets/friends/obaby.avif';
import yysuni from '@/assets/friends/yysuni.avif';
import bufan from '@/assets/friends/bufan.avif';
import dongdong from '@/assets/friends/dongdong.avif';
import hanshi from '@/assets/friends/hanshi.avif';
import xiaoten from '@/assets/friends/xiaoten.avif';
import zhheo from '@/assets/friends/zhheo.avif';
import dao from '@/assets/friends/dao.webp';
import xinghe from '@/assets/friends/xinghe.avif';
import maplezz from '@/assets/friends/maplezz.webp';
import youlogo from '@/assets/friends/youlogo.avif';
import happy365 from '@/assets/friends/happy365.avif';
import zhilu from '@/assets/friends/zhilu.avif';
import lawtee from '@/assets/friends/lawtee.avif';
import gaicas from '@/assets/friends/gaicas.avif';
import thyuu from '@/assets/friends/thyuu.svg';
import jianker from '@/assets/friends/jianker.avif';
import zhyong from '@/assets/friends/zhyong.avif';
import liangbm3 from '@/assets/friends/liangbm3.avif';
import hyjs from '@/assets/friends/hyjs.avif';

export interface Friend {
    name: string;
    url: string;
    description: string;
    avatar: ImageMetadata;
    rss?: string;
}

export const friends: Friend[] = [
    {
        "name": "liangbm3's blog",
        "url": "https://liangbm3.site/",
        "description": "总有人间一两风，填我十万八千梦。",
        "avatar": liangbm3,
        "rss": "https://liangbm3.site/rss.xml"
    },
    {
        "name": "Obaby",
        "url": "https://zhongxiaojie.com/",
        "description": "黑客程序媛 / 逆向工程师 / 人工智能学徒 / 用爱发电的独立开发者",
        "avatar": obaby,
        "rss": "https://zhongxiaojie.com/feed/"
    },
    {
        "name": "YYsuni",
        "url": "https://www.yysuni.com/",
        "description": "分享前端开发、React、TypeScript、动画效果等技术文章。",
        "avatar": yysuni,
        "rss": ""
    },
    {
        "name": "不凡博客",
        "url": "https://www.bufanz.com/",
        "description": "探索WordPress的无限可能 汇聚各类实用软件",
        "avatar": bufan,
        "rss": "https://www.bufanz.com/feed/"
    },
    {
        "name": "东东博客",
        "url": "https://nihaha.com/",
        "description": "城市与信仰",
        "avatar": dongdong,
        "rss": "https://nihaha.com/feed/"
    },
    {
        "name": "寒士杰克",
        "url": "https://www.hansjack.com/",
        "description": "个人博客，持续分享网站部署实战经验、精选书评解读和生活观察手记。 这里提供可复用的技术教程、深度阅读指南和真实生活洞察，与技术爱好者一起进步",
        "avatar": hanshi,
        "rss": "https://www.hansjack.com/feed/"
    },
    {
        "name": "小十博客",
        "url": "https://www.xiaoten.com",
        "description": "十分之十的小十",
        "avatar": xiaoten,
        "rss": "https://www.xiaoten.com/index.xml"
    },
    {
        "name": "幻影博客",
        "url": "https://blog.52hyjs.com/",
        "description": "一个打工仔记录生活的网站，人生在世为何不留下一点生活的痕迹呢！",
        "avatar": hyjs,
        "rss": "https://blog.52hyjs.com/feed/"
    },
    {
        "name": "张洪Heo",
        "url": "https://blog.zhheo.com/",
        "description": "分享设计与科技生活",
        "avatar": zhheo,
        "rss": "https://blog.zhheo.com/rss.xml"
    },
    {
        "name": "懋和道人",
        "url": "https://www.dao.js.cn/",
        "description": "李懋和，俗名李栋梁。书法、国画爱好者，互联网安全与前端建设者。",
        "avatar": dao,
        "rss": "https://www.dao.js.cn/feed.php"
    },
    {
        "name": "星河避难所",
        "url": "https://hejunjie.life",
        "description": "写代码，也写自己",
        "avatar": xinghe,
        "rss": "https://hejunjie.life/rss.xml"
    },
    {
        "name": "材料与逻辑",
        "url": "https://zhyong.site",
        "description": "从原子到结构，从数据到洞察",
        "avatar": zhyong,
        "rss": ""
    },
    {
        "name": "猫普的精神世界",
        "url": "https://maplezz.com/",
        "description": "一个独立开发者的精神自留地",
        "avatar": maplezz,
        "rss": "https://maplezz.com/rss.xml"
    },
    {
        "name": "益友网站",
        "url": "https://blog.yiyou.bj.cn",
        "description": "美好的日常生活值得我们去记录，希望我们的生活每天都能充满着乐趣跟开心事。",
        "avatar": youlogo,
        "rss": "https://blog.yiyou.bj.cn/rss.xml"
    },
    {
        "name": "秋葵笔记",
        "url": "https://qiukui-note.happy365.day",
        "description": "一切皆是因为好玩～",
        "avatar": happy365,
        "rss": ""
    },
    {
        "name": "纸鹿本鹿",
        "url": "https://blog.zhilu.site/",
        "description": "纸鹿至麓不知路，支炉制露不止漉",
        "avatar": zhilu,
        "rss": "https://blog.zhilu.site/atom.xml"
    },
    {
        "name": "老T博客",
        "url": "https://lawtee.com",
        "description": "法律、科技和生活",
        "avatar": lawtee,
        "rss": "https://lawtee.com/index.xml"
    },
    {
        "name": "草东日记",
        "url": "https://www.gaicas.com",
        "description": "独立思考，勿乱引导",
        "avatar": gaicas,
        "rss": ""
    },
    {
        "name": "风记星辰",
        "url": "https://www.thyuu.com",
        "description": "热爱你来过的每度温暖",
        "avatar": thyuu,
        "rss": "https://www.thyuu.com/feed"
    },
    {
        "name": "魏德龙博客",
        "url": "https://www.jianker.cn/",
        "description": "运动博主/一般人/喜欢装B",
        "avatar": jianker,
        "rss": "https://www.jianker.cn/feed"
    }
];