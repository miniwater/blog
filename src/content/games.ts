import Bloons_TD_6 from '@/assets/games/Bloons_TD_6.avif';
import Hollow_Knight_Silksong from '@/assets/games/Hollow_Knight_Silksong.avif';
import WUCHANG from '@/assets/games/WUCHANG.avif';
import Clair_Obscur from '@/assets/games/Clair_Obscur.avif';
import The_Last_of_Us_Part_II_Remastered from '@/assets/games/The_Last_of_Us_Part_II_Remastered.avif';
import inZOI from '@/assets/games/inZOI.avif';
import Delta_Force from '@/assets/games/Delta_Force.avif';
import Split_Fiction from '@/assets/games/Split_Fiction.avif';
import Marvels_SpiderMan_2 from '@/assets/games/Marvels_SpiderMan_2.avif';
import God_of_War_Ragnark from '@/assets/games/God_of_War_Ragnark.avif';
import WUKONG from '@/assets/games/WUKONG.avif';
import Diablo4 from '@/assets/games/Diablo4.avif';
import COD20 from '@/assets/games/COD20.avif';
import The_First_Descendant from '@/assets/games/The_First_Descendant.avif';
import Lies_of_P from '@/assets/games/Lies_of_P.avif';
import It_Takes_Two from '@/assets/games/It_Takes_Two.avif';
import Horizon_Forbidden_West from '@/assets/games/Horizon_Forbidden_West.avif';
import Alan_Wake_2 from '@/assets/games/Alan_Wake_2.avif';
import Marvels_Guardians_of_the_Galaxy from '@/assets/games/Marvels_Guardians_of_the_Galaxy.avif';
import Palworld from '@/assets/games/Palworld.avif';
import Atomic_Heart from '@/assets/games/Atomic_Heart.avif';
import Kingdom_Come_Deliverance_II from '@/assets/games/Kingdom_Come_Deliverance_II.avif';
import Vampire_The_Masquerade__Bloodlines_2 from '@/assets/games/Vampire_The_Masquerade__Bloodlines_2.avif';
import Hell_is_Us from '@/assets/games/Hell_is_Us.avif';
import METAL_GEAR_SOLID_D_SNAKE_EATER from '@/assets/games/METAL_GEAR_SOLID_D_SNAKE_EATER.avif';
import Call_of_Duty_Black_Ops_6 from '@/assets/games/Call_of_Duty_Black_Ops_6.avif';
import Dying_Light_The_Beast from '@/assets/games/Dying_Light_The_Beast.avif';
import Cronos_The_New_Dawn from '@/assets/games/Cronos_The_New_Dawn.avif';
import battlefield_6 from '@/assets/games/battlefield_6.avif';

export interface Game {
    name: string;
    time: string;
    description: string;
    image: ImageMetadata;
    url: string;
}

export const games: Game[] = [
    {
        "name": "猴子打气球6",
        "time": "2026/1",
        "description": "E宝送的，太上头了。",
        "image": Bloons_TD_6,
        "url": "https://store.steampowered.com/app/960090/Bloons_TD_6/"
    },
    {
        "name": "空洞骑士：丝之歌",
        "time": "2026/1",
        "description": "打开风灵月影的那一刻，我才开始享受起这游戏。",
        "image": Hollow_Knight_Silksong,
        "url": "https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/"
    },
    {
        "name": "吸血鬼：避世血族2",
        "time": "2025/12",
        "description": "毫无生气的开放世界",
        "image": Vampire_The_Masquerade__Bloodlines_2,
        "url": "https://store.steampowered.com/app/532790/Vampire_The_Masquerade__Bloodlines_2/"
    },
    {
        "name": "天国：拯救2",
        "time": "2025/11",
        "description": "玩法上自由度很高，但剧情自由度很低，继巫师3后又一款开放世界RPG神作",
        "image": Kingdom_Come_Deliverance_II,
        "url": "https://store.steampowered.com/app/1771300/2/"
    },
    {
        "name": "地狱即我们",
        "time": "2025/11",
        "description": "没有地图，没有任务指引，交什么任务道具全靠玩家自己猜，每一次NPC对话都要琢磨一小会",
        "image": Hell_is_Us,
        "url": "https://store.steampowered.com/app/1620730/Hell_is_Us/"
    },
    {
        "name": "合金装备3：重制版",
        "time": "2025/10",
        "description": "xx科乐美，优化一坨，炒饭都炒不明白",
        "image": METAL_GEAR_SOLID_D_SNAKE_EATER,
        "url": "https://store.steampowered.com/app/2417610/METAL_GEAR_SOLID_D_SNAKE_EATER/"
    },
    {
        "name": "使命召唤：黑色行动6",
        "time": "2025/10",
        "description": "这代使命召唤21剧情模式明显比上代20进步非常多",
        "image": Call_of_Duty_Black_Ops_6,
        "url": "https://store.steampowered.com/app/2933620/Call_of_Duty_Black_Ops_6/"
    },
    {
        "name": "战地风云6",
        "time": "2025/9",
        "description": "有史以来 EA 最重视大陆市场的一次，中配 + 国区低价 + steam发售全齐了",
        "image": battlefield_6,
        "url": "https://store.steampowered.com/app/2807960/_6/"
    },
    {
        "name": "消逝的光芒：困兽",
        "time": "2025/9",
        "description": "比第二代有所改进，但依然没有第一代惊艳",
        "image": Dying_Light_The_Beast,
        "url": "https://store.steampowered.com/app/3008130/_/"
    },
    {
        "name": "时间旅者：重生曙光",
        "time": "2025/9",
        "description": "优化太差了，对着尸体踩猛猛掉帧",
        "image": Cronos_The_New_Dawn,
        "url": "https://store.steampowered.com/app/2101960/_/"
    },
    {
        "name": "明末：渊虚之羽",
        "time": "2025/7",
        "description": "圈外营销号都在骂满清第一女巴图鲁，游戏圈内都说国产类魂之王，要我说，菜还是尝一尝再评价咸淡吧",
        "image": WUCHANG,
        "url": "https://store.steampowered.com/app/2277560/_/"
    },
    {
        "name": "光与影：33号远征队",
        "time": "2025/5",
        "description": "质量很高，玩法也让人眼前一亮，有望角逐年度游戏",
        "image": Clair_Obscur,
        "url": "https://store.steampowered.com/app/1903340/33/"
    },
    {
        "name": "最后生还者2",
        "time": "2025/4",
        "description": "还是那个顽皮狗，就算剧情再拖后腿，也阻挡不了它封神",
        "image": The_Last_of_Us_Part_II_Remastered,
        "url": "https://store.steampowered.com/app/2531310/The_Last_of_Us_Part_II_Remastered/"
    },
    {
        "name": "inZOI",
        "time": "2025/3",
        "description": "内容太空洞了，完全不知道该干嘛",
        "image": inZOI,
        "url": "https://store.steampowered.com/app/2456740/inZOI/"
    },
    {
        "name": "三角洲行动",
        "time": "2025/3",
        "description": "从黑鹰坠落资料片开始入坑，它的搜打撤没有撤，里面全是静步老阴逼，还是当成免费版的战地玩吧。",
        "image": Delta_Force,
        "url": "https://store.steampowered.com/app/2507950/_/"
    },
    {
        "name": "双影奇境",
        "time": "2025/3",
        "description": "游戏的最高配置，就是朋友！！！现实和虚拟打通，双倍的快乐。",
        "image": Split_Fiction,
        "url": "https://store.steampowered.com/app/2001120/_/"
    },
    {
        "name": "漫威蜘蛛侠2",
        "time": "2025/2",
        "description": "玩不下去，PC优化奇差",
        "image": Marvels_SpiderMan_2,
        "url": "https://store.steampowered.com/app/2651280/Marvels_SpiderMan_2/"
    },
    {
        "name": "战神5：诸神黄昏",
        "time": "2024/10",
        "description": "圣莫尼卡为什么会认为北欧神话里，会有黑人？",
        "image": God_of_War_Ragnark,
        "url": "https://store.steampowered.com/app/2322010/God_of_War_Ragnark/"
    },
    {
        "name": "黑神话：悟空",
        "time": "2024/9",
        "description": "质量上乘，多次跳票后依然赶工痕迹明显，希望总结经验，让下一部钟馗拿下年度游戏",
        "image": WUKONG,
        "url": "https://store.steampowered.com/app/2358720/_/"
    },
    {
        "name": "暗黑破坏神4",
        "time": "2024/8",
        "description": "趁老黄免费送xgp时玩的，不得不说肉鸽元素确实上头，但是刷多了也容易厌倦",
        "image": Diablo4,
        "url": "https://store.steampowered.com/app/2344520/_IV/"
    },
    {
        "name": "使命召唤：现代战争3",
        "time": "2024/7",
        "description": "趁老黄免费送xgp时玩的，使命召唤20的丧尸模式真好玩",
        "image": COD20,
        "url": "https://store.steampowered.com/app/3595270/_III_2023/"
    },
    {
        "name": "第一后裔",
        "time": "2024/6",
        "description": "实在肝不动了",
        "image": The_First_Descendant,
        "url": "https://store.steampowered.com/app/2074920/The_First_Descendant/"
    },
    {
        "name": "匹诺曹的谎言",
        "time": "2024/6",
        "description": "冷门游戏，但挺好玩的",
        "image": Lies_of_P,
        "url": "https://store.steampowered.com/app/1627720/Lies_of_P/"
    },
    {
        "name": "双人成行",
        "time": "2024/6",
        "description": "游戏就是要开黑才有意思，",
        "image": It_Takes_Two,
        "url": "https://store.steampowered.com/app/1426210/_/"
    },
    {
        "name": "地平线：西之绝境",
        "time": "2024/3",
        "description": "路途都是风景，每一帧都是壁纸",
        "image": Horizon_Forbidden_West,
        "url": "https://store.steampowered.com/app/2420110/_/"
    },
    {
        "name": "心灵杀手2",
        "time": "2024/2",
        "description": "剧情非常烧脑，直到现在依然记忆犹新",
        "image": Alan_Wake_2,
        "url": "https://store.epicgames.com/zh-CN/p/alan-wake-2"
    },
    {
        "name": "漫威银河护卫队",
        "time": "2024/1",
        "description": "中规中矩，有一种流水线的感觉",
        "image": Marvels_Guardians_of_the_Galaxy,
        "url": "https://store.steampowered.com/app/1088850/Marvels_Guardians_of_the_Galaxy/"
    },
    {
        "name": "幻兽帕鲁",
        "time": "2024/1",
        "description": "多人模式好玩，但我不能理解的就是8人联机，服务器要16G内存？",
        "image": Palworld,
        "url": "https://store.steampowered.com/app/1623730/Palworld/"
    },
    {
        "name": "原子之心",
        "time": "2023/2",
        "description": "谁懂开局过场动画的震撼啊",
        "image": Atomic_Heart,
        "url": "https://store.steampowered.com/app/668580/_/"
    }
]