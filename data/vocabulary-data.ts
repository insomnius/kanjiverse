import idN5 from "./i18n/vocab-id-N5.json"
import idN4 from "./i18n/vocab-id-N4.json"
import idN3 from "./i18n/vocab-id-N3.json"
import idN2 from "./i18n/vocab-id-N2.json"
import idN1 from "./i18n/vocab-id-N1.json"
import type { Locale } from "@/lib/progress/store"

export interface VocabItem {
  word: string
  /** English meaning. Always present. */
  meaning: string
  /** Indonesian meaning. Optional — falls back to English when missing.
   *  Populated at module load from the per-level sidecar JSONs in data/i18n/. */
  meaningId?: string
  romaji: string
}

export const vocabularyData: Record<string, VocabItem[]> = {
  N5: [
    { word: "こんにちは", meaning: "hello", romaji: "konnichiwa" },
    { word: "ありがとう", meaning: "thank you", romaji: "arigatou" },
    { word: "すみません", meaning: "excuse me", romaji: "sumimasen" },
    { word: "学生", meaning: "student", romaji: "gakusei" },
    { word: "先生", meaning: "teacher", romaji: "sensei" },
    { word: "友達", meaning: "friend", romaji: "tomodachi" },
    { word: "学校", meaning: "school", romaji: "gakkō" },
    { word: "家", meaning: "house", romaji: "ie/uchi" },
    { word: "車", meaning: "car", romaji: "kuruma" },
    { word: "電車", meaning: "train", romaji: "densha" },
    {
      "word": "浴びる",
      "meaning": "to bathe, to shower",
      "romaji": "abiru"
    },
    {
      "word": "危ない",
      "meaning": "dangerous",
      "romaji": "abunai"
    },
    {
      "word": "あっち",
      "meaning": "over there",
      "romaji": "acchi"
    },
    {
      "word": "あちら",
      "meaning": "there",
      "romaji": "achira"
    },
    {
      "word": "上げる",
      "meaning": "to raise; to elevate; to give",
      "romaji": "ageru"
    },
    {
      "word": "赤",
      "meaning": "red; crimson; scarlet​",
      "romaji": "aka"
    },
    {
      "word": "赤い",
      "meaning": "red; crimson; scarlet​",
      "romaji": "akai"
    },
    {
      "word": "明るい",
      "meaning": "bright; light",
      "romaji": "akarui"
    },
    {
      "word": "開ける",
      "meaning": "to open (a door, etc.); to unwrap (e.g. parcel, package); to unlock",
      "romaji": "akeru"
    },
    {
      "word": "秋",
      "meaning": "autumn; fall",
      "romaji": "aki"
    },
    {
      "word": "開く",
      "meaning": "to open (e.g. doors, business, etc)",
      "romaji": "aku"
    },
    {
      "word": "甘い",
      "meaning": "sweet; sweet-tasting; sugary; naive; indulgent",
      "romaji": "amai"
    },
    {
      "word": "雨",
      "meaning": "rain",
      "romaji": "ame"
    },
    {
      "word": "飴",
      "meaning": "candy",
      "romaji": "ame"
    },
    {
      "word": "あなた",
      "meaning": "you",
      "romaji": "anata"
    },
    {
      "word": "姉",
      "meaning": "older sister; elder sister​",
      "romaji": "ane"
    },
    {
      "word": "兄",
      "meaning": "elder brother; older brother​",
      "romaji": "ani"
    },
    {
      "word": "あの",
      "meaning": "that",
      "romaji": "ano"
    },
    {
      "word": "青",
      "meaning": "blue; azure",
      "romaji": "ao"
    },
    {
      "word": "青い",
      "meaning": "blue; azure",
      "romaji": "aoi"
    },
    {
      "word": "アパート",
      "meaning": "apartment",
      "romaji": "apaato"
    },
    {
      "word": "洗う",
      "meaning": "to wash",
      "romaji": "arau"
    },
    {
      "word": "あれ",
      "meaning": "that",
      "romaji": "are"
    },
    {
      "word": "ある",
      "meaning": "to be, to have",
      "romaji": "aru"
    },
    {
      "word": "歩く",
      "meaning": "to walk",
      "romaji": "aruku"
    },
    {
      "word": "朝",
      "meaning": "morning",
      "romaji": "asa"
    },
    {
      "word": "朝ご飯",
      "meaning": "breakfast",
      "romaji": "asagohan"
    },
    {
      "word": "明後日",
      "meaning": "day after tomorrow",
      "romaji": "asatte"
    },
    {
      "word": "足",
      "meaning": "foot; leg; paw; arm",
      "romaji": "ashi"
    },
    {
      "word": "明日",
      "meaning": "tomorrow",
      "romaji": "ashita"
    },
    {
      "word": "遊ぶ",
      "meaning": "to play; to enjoy oneself",
      "romaji": "asobu"
    },
    {
      "word": "あそこ",
      "meaning": "over there",
      "romaji": "asoko"
    },
    {
      "word": "頭",
      "meaning": "head",
      "romaji": "atama"
    },
    {
      "word": "新しい",
      "meaning": "new; novel; fresh; recent; latest",
      "romaji": "atarashii"
    },
    {
      "word": "暖かい",
      "meaning": "warm",
      "romaji": "atatakai"
    },
    {
      "word": "後",
      "meaning": "behind; after; remainder; left; also",
      "romaji": "ato"
    },
    {
      "word": "暑い",
      "meaning": "hot; sultry",
      "romaji": "atsui"
    },
    {
      "word": "厚い",
      "meaning": "thick",
      "romaji": "atsui"
    },
    {
      "word": "熱い",
      "meaning": "hot",
      "romaji": "atsui"
    },
    {
      "word": "会う",
      "meaning": "to meet; to encounter; to see",
      "romaji": "au"
    },
    {
      "word": "晩ご飯",
      "meaning": "dinner; evening meal",
      "romaji": "bangohan"
    },
    {
      "word": "番号",
      "meaning": "number",
      "romaji": "bangou"
    },
    {
      "word": "バス",
      "meaning": "bus",
      "romaji": "basu"
    },
    {
      "word": "バター",
      "meaning": "butter​",
      "romaji": "bataa"
    },
    {
      "word": "ベッド",
      "meaning": "bed",
      "romaji": "beddo"
    },
    {
      "word": "勉強",
      "meaning": "to study",
      "romaji": "benkyou"
    },
    {
      "word": "便利",
      "meaning": "convenient; handy; useful",
      "romaji": "benri"
    },
    {
      "word": "ボールペン",
      "meaning": "ball-point pen",
      "romaji": "boorupen"
    },
    {
      "word": "ボタン",
      "meaning": "button",
      "romaji": "botan"
    },
    {
      "word": "帽子",
      "meaning": "hat; cap",
      "romaji": "boushi"
    },
    {
      "word": "文章",
      "meaning": "sentence",
      "romaji": "bunshou"
    },
    {
      "word": "豚肉",
      "meaning": "pork",
      "romaji": "butaniku"
    },
    {
      "word": "病院",
      "meaning": "hospital",
      "romaji": "byouin"
    },
    {
      "word": "病気",
      "meaning": "illness; disease; sickness",
      "romaji": "byouki"
    },
    {
      "word": "茶色",
      "meaning": "brown",
      "romaji": "chairo"
    },
    {
      "word": "茶碗",
      "meaning": "rice bowl; tea cup; teacup",
      "romaji": "chawan"
    },
    {
      "word": "父",
      "meaning": "father",
      "romaji": "chichi"
    },
    {
      "word": "違う",
      "meaning": "to differ",
      "romaji": "chigau"
    },
    {
      "word": "小さい",
      "meaning": "small; little; tiny",
      "romaji": "chiisai"
    },
    {
      "word": "小さな",
      "meaning": "small; little; tiny​",
      "romaji": "chiisana"
    },
    {
      "word": "近い",
      "meaning": "near; close",
      "romaji": "chikai"
    },
    {
      "word": "地下鉄",
      "meaning": "subway; underground train",
      "romaji": "chikatetsu"
    },
    {
      "word": "地図",
      "meaning": "map",
      "romaji": "chizu"
    },
    {
      "word": "ちょっと",
      "meaning": "a little",
      "romaji": "chotto"
    },
    {
      "word": "丁度",
      "meaning": "exactly",
      "romaji": "choudo"
    },
    {
      "word": "台所",
      "meaning": "kitchen",
      "romaji": "daidokoro"
    },
    {
      "word": "大学",
      "meaning": "university; college",
      "romaji": "daigaku"
    },
    {
      "word": "大丈夫",
      "meaning": "OK; okay; alright; problem free",
      "romaji": "daijoubu"
    },
    {
      "word": "大好き",
      "meaning": "love; like; like very much",
      "romaji": "daisuki"
    },
    {
      "word": "だんだん",
      "meaning": "gradually",
      "romaji": "dandan"
    },
    {
      "word": "誰",
      "meaning": "who",
      "romaji": "dare"
    },
    {
      "word": "誰か",
      "meaning": "someone; somebody",
      "romaji": "dareka"
    },
    {
      "word": "出す",
      "meaning": "to take out; to get out; to put out; to reveal",
      "romaji": "dasu"
    },
    {
      "word": "出口",
      "meaning": "exit; gateway; way out",
      "romaji": "deguchi"
    },
    {
      "word": "出かける",
      "meaning": "to go out; to leave; to depart",
      "romaji": "dekakeru"
    },
    {
      "word": "電気",
      "meaning": "electricity",
      "romaji": "denki"
    },
    {
      "word": "電車",
      "meaning": "train; electric train",
      "romaji": "densha"
    },
    {
      "word": "電話",
      "meaning": "telephone (call / device)l; phone call",
      "romaji": "denwa"
    },
    {
      "word": "デパート",
      "meaning": "department store",
      "romaji": "depaato"
    },
    {
      "word": "出る",
      "meaning": "to leave; to exit; to appear; to go out",
      "romaji": "deru"
    },
    {
      "word": "ドア",
      "meaning": "door",
      "romaji": "doa"
    },
    {
      "word": "どっち",
      "meaning": "which; which one",
      "romaji": "docchi"
    },
    {
      "word": "どちら",
      "meaning": "which of two",
      "romaji": "dochira"
    },
    {
      "word": "どこ",
      "meaning": "where; what place​",
      "romaji": "doko"
    },
    {
      "word": "どなた",
      "meaning": "who",
      "romaji": "donata"
    },
    {
      "word": "どの",
      "meaning": "which",
      "romaji": "dono"
    },
    {
      "word": "どれ",
      "meaning": "which (of three or more)​",
      "romaji": "dore"
    },
    {
      "word": "どう",
      "meaning": "how; in what way; how about​",
      "romaji": "dou"
    },
    {
      "word": "動物",
      "meaning": "animal",
      "romaji": "doubutsu"
    },
    {
      "word": "どうも",
      "meaning": "thank you; thanks",
      "romaji": "doumo"
    },
    {
      "word": "どうぞ",
      "meaning": "please",
      "romaji": "douzo"
    },
    {
      "word": "土曜日",
      "meaning": "Saturday",
      "romaji": "doyoubi"
    },
    {
      "word": "絵",
      "meaning": "picture",
      "romaji": "e"
    },
    {
      "word": "ええ",
      "meaning": "yes; that is correct; right",
      "romaji": "ee"
    },
    {
      "word": "映画",
      "meaning": "movie; film",
      "romaji": "eiga"
    },
    {
      "word": "映画館",
      "meaning": "movie theater; cinema",
      "romaji": "eigakan"
    },
    {
      "word": "英語",
      "meaning": "English language",
      "romaji": "eigo"
    },
    {
      "word": "駅",
      "meaning": "station",
      "romaji": "eki"
    },
    {
      "word": "鉛筆",
      "meaning": "pencil",
      "romaji": "enpitsu"
    },
    {
      "word": "エレベーター",
      "meaning": "elevator",
      "romaji": "erebeetaa"
    },
    {
      "word": "フィルム",
      "meaning": "film",
      "romaji": "firumu"
    },
    {
      "word": "フォーク",
      "meaning": "fork",
      "romaji": "fooku"
    },
    {
      "word": "服",
      "meaning": "clothes",
      "romaji": "fuku"
    },
    {
      "word": "吹く",
      "meaning": "to blow (of the wind)",
      "romaji": "fuku"
    },
    {
      "word": "降る",
      "meaning": "to fall",
      "romaji": "furu"
    },
    {
      "word": "古い",
      "meaning": "old (not used for people)",
      "romaji": "furui"
    },
    {
      "word": "二人",
      "meaning": "two people; pair; couple",
      "romaji": "futari"
    },
    {
      "word": "二つ",
      "meaning": "two; ",
      "romaji": "futatsu"
    },
    {
      "word": "太い",
      "meaning": "fat; thick",
      "romaji": "futoi"
    },
    {
      "word": "二日",
      "meaning": "the second day of the month / ",
      "romaji": "futsuka"
    },
    {
      "word": "封筒",
      "meaning": "envelope",
      "romaji": "fuutou"
    },
    {
      "word": "冬",
      "meaning": "winter",
      "romaji": "fuyu"
    },
    {
      "word": "外国",
      "meaning": "foreign country",
      "romaji": "gaikoku"
    },
    {
      "word": "外国人",
      "meaning": "foreigner; foreign citizen; foreign national; alien; non-Japanese",
      "romaji": "gaikokujin"
    },
    {
      "word": "学校",
      "meaning": "school",
      "romaji": "gakkou"
    },
    {
      "word": "学生",
      "meaning": "student",
      "romaji": "gakusei"
    },
    {
      "word": "玄関",
      "meaning": "entrance",
      "romaji": "genkan"
    },
    {
      "word": "元気",
      "meaning": "lively; full of spirit; energetic; healthy",
      "romaji": "genki"
    },
    {
      "word": "月曜日",
      "meaning": "Monday",
      "romaji": "getsuyoubi"
    },
    {
      "word": "銀行",
      "meaning": "bank",
      "romaji": "ginkou"
    },
    {
      "word": "ギター",
      "meaning": "guitar",
      "romaji": "gitaa"
    },
    {
      "word": "五",
      "meaning": "five; ",
      "romaji": "go"
    },
    {
      "word": "午後",
      "meaning": "afternoon; p.m.",
      "romaji": "gogo"
    },
    {
      "word": "ご飯",
      "meaning": "cooked rice, meal",
      "romaji": "gohan"
    },
    {
      "word": "午前",
      "meaning": "morning; a.m.",
      "romaji": "gozen"
    },
    {
      "word": "グラム",
      "meaning": "gram",
      "romaji": "guramu"
    },
    {
      "word": "牛肉",
      "meaning": "beef",
      "romaji": "gyuuniku"
    },
    {
      "word": "牛乳",
      "meaning": "(cow's) milk",
      "romaji": "gyuunyuu"
    },
    {
      "word": "歯",
      "meaning": "tooth",
      "romaji": "ha"
    },
    {
      "word": "八",
      "meaning": "eight: ",
      "romaji": "hachi"
    },
    {
      "word": "葉書",
      "meaning": "postcard",
      "romaji": "hagaki"
    },
    {
      "word": "母",
      "meaning": "mother",
      "romaji": "haha"
    },
    {
      "word": "はい",
      "meaning": "yes; that is correct​",
      "romaji": "hai"
    },
    {
      "word": "入る",
      "meaning": "to enter; to go into",
      "romaji": "hairu"
    },
    {
      "word": "灰皿",
      "meaning": "ashtray",
      "romaji": "haizara"
    },
    {
      "word": "始まる",
      "meaning": "to begin",
      "romaji": "hajimaru"
    },
    {
      "word": "初めて",
      "meaning": "for the first time",
      "romaji": "hajimete"
    },
    {
      "word": "箱",
      "meaning": "box; crate",
      "romaji": "hako"
    },
    {
      "word": "履く",
      "meaning": "to wear, to put on trousers",
      "romaji": "haku"
    },
    {
      "word": "半",
      "meaning": "half; semi-; half-past",
      "romaji": "han"
    },
    {
      "word": "花",
      "meaning": "flower",
      "romaji": "hana"
    },
    {
      "word": "鼻",
      "meaning": "nose",
      "romaji": "hana"
    },
    {
      "word": "話",
      "meaning": "talk; speech; chat; conversation​",
      "romaji": "hanashi"
    },
    {
      "word": "話す",
      "meaning": "to speak; to talk; to converse",
      "romaji": "hanasu"
    },
    {
      "word": "半分",
      "meaning": "half",
      "romaji": "hanbun"
    },
    {
      "word": "ハンカチ",
      "meaning": "handkerchief​",
      "romaji": "hankachi"
    },
    {
      "word": "晴れ",
      "meaning": "clear weather",
      "romaji": "hare"
    },
    {
      "word": "晴れる",
      "meaning": "to be sunny",
      "romaji": "hareru"
    },
    {
      "word": "春",
      "meaning": "spring; springtime",
      "romaji": "haru"
    },
    {
      "word": "貼る",
      "meaning": "to stick; to paste",
      "romaji": "haru"
    },
    {
      "word": "箸",
      "meaning": "chopsticks",
      "romaji": "hashi"
    },
    {
      "word": "橋",
      "meaning": "bridge",
      "romaji": "hashi"
    },
    {
      "word": "走る",
      "meaning": "to run",
      "romaji": "hashiru"
    },
    {
      "word": "二十歳",
      "meaning": "twenty years old",
      "romaji": "hatachi"
    },
    {
      "word": "働く",
      "meaning": "to work",
      "romaji": "hataraku"
    },
    {
      "word": "二十日",
      "meaning": "twentieth day of the month / ",
      "romaji": "hatsuka"
    },
    {
      "word": "速い",
      "meaning": "fast; quick; hasty; brisk",
      "romaji": "hayai"
    },
    {
      "word": "早い",
      "meaning": "fast; early",
      "romaji": "hayai"
    },
    {
      "word": "辺",
      "meaning": "area",
      "romaji": "hen"
    },
    {
      "word": "下手",
      "meaning": "unskillful; poor; awkward​",
      "romaji": "heta"
    },
    {
      "word": "部屋",
      "meaning": "room",
      "romaji": "heya"
    },
    {
      "word": "左",
      "meaning": "left; left hand side",
      "romaji": "hidari"
    },
    {
      "word": "東",
      "meaning": "east",
      "romaji": "higashi"
    },
    {
      "word": "飛行機",
      "meaning": "airplane; aircraft",
      "romaji": "hikouki"
    },
    {
      "word": "引く",
      "meaning": "to pull",
      "romaji": "hiku"
    },
    {
      "word": "弾く",
      "meaning": "to play",
      "romaji": "hiku"
    },
    {
      "word": "低い",
      "meaning": "short,low",
      "romaji": "hikui"
    },
    {
      "word": "暇",
      "meaning": "free time",
      "romaji": "hima"
    },
    {
      "word": "広い",
      "meaning": "spacious; vast; wide",
      "romaji": "hiroi"
    },
    {
      "word": "昼",
      "meaning": "noon; midday; daytime; lunch",
      "romaji": "hiru"
    },
    {
      "word": "昼ご飯",
      "meaning": "lunch",
      "romaji": "hirugohan"
    },
    {
      "word": "人",
      "meaning": "person; human",
      "romaji": "hito"
    },
    {
      "word": "一人",
      "meaning": "one person​; alone; single",
      "romaji": "hitori"
    },
    {
      "word": "一つ",
      "meaning": "one thing; only",
      "romaji": "hitotsu"
    },
    {
      "word": "ほか",
      "meaning": "other (place, thing, person); the rest",
      "romaji": "hoka"
    },
    {
      "word": "本",
      "meaning": "book; volume; script",
      "romaji": "hon"
    },
    {
      "word": "本棚",
      "meaning": "bookshelf; bookcase",
      "romaji": "hondana"
    },
    {
      "word": "本当",
      "meaning": "truth; reality; actuality; fact",
      "romaji": "hontou"
    },
    {
      "word": "欲しい",
      "meaning": "want",
      "romaji": "hoshii"
    },
    {
      "word": "細い",
      "meaning": "thin; slender",
      "romaji": "hosoi"
    },
    {
      "word": "ホテル",
      "meaning": "hotel",
      "romaji": "hoteru"
    },
    {
      "word": "百",
      "meaning": "hundred",
      "romaji": "hyaku"
    },
    {
      "word": "一",
      "meaning": "one; best; first; foremost; start",
      "romaji": "ichi"
    },
    {
      "word": "一番",
      "meaning": "number one; first; ",
      "romaji": "ichiban"
    },
    {
      "word": "一日",
      "meaning": "one day, all day",
      "romaji": "ichinichi"
    },
    {
      "word": "家",
      "meaning": "house, residence, family",
      "romaji": "ie"
    },
    {
      "word": "いかが",
      "meaning": "how; in what way; how about​",
      "romaji": "ikaga"
    },
    {
      "word": "池",
      "meaning": "pond",
      "romaji": "ike"
    },
    {
      "word": "行く",
      "meaning": "to go; to move",
      "romaji": "iku"
    },
    {
      "word": "いくら",
      "meaning": "how much?; how many?​",
      "romaji": "ikura"
    },
    {
      "word": "いくつ",
      "meaning": "how many?,how old?",
      "romaji": "ikutsu"
    },
    {
      "word": "今",
      "meaning": "now; the present time; soon",
      "romaji": "ima"
    },
    {
      "word": "意味",
      "meaning": "meaning; significance; sense",
      "romaji": "imi"
    },
    {
      "word": "妹",
      "meaning": "younger sister",
      "romaji": "imouto"
    },
    {
      "word": "犬",
      "meaning": "dog",
      "romaji": "inu"
    },
    {
      "word": "入れる",
      "meaning": "to put in; to let in; to take in; to bring in; to insert; to install",
      "romaji": "ireru"
    },
    {
      "word": "入口",
      "meaning": "entrance; entry; gate",
      "romaji": "iriguchi"
    },
    {
      "word": "色",
      "meaning": "colour; color",
      "romaji": "iro"
    },
    {
      "word": "色々",
      "meaning": "various",
      "romaji": "iroiro"
    },
    {
      "word": "要る",
      "meaning": "to be needed",
      "romaji": "iru"
    },
    {
      "word": "居る",
      "meaning": "to be, to have",
      "romaji": "iru"
    },
    {
      "word": "医者",
      "meaning": "(medical) doctor; physician",
      "romaji": "isha"
    },
    {
      "word": "忙しい",
      "meaning": "busy",
      "romaji": "isogashii"
    },
    {
      "word": "一緒",
      "meaning": "together; at the same time; same; identical",
      "romaji": "issho"
    },
    {
      "word": "椅子",
      "meaning": "chair",
      "romaji": "isu"
    },
    {
      "word": "痛い",
      "meaning": "painful; sore​",
      "romaji": "itai"
    },
    {
      "word": "いつ",
      "meaning": "when",
      "romaji": "itsu"
    },
    {
      "word": "五日",
      "meaning": "the fifth day of the month / ",
      "romaji": "itsuka"
    },
    {
      "word": "五つ",
      "meaning": "five; ",
      "romaji": "itsutsu"
    },
    {
      "word": "言う",
      "meaning": "to say; to call",
      "romaji": "iu"
    },
    {
      "word": "嫌",
      "meaning": "unpleasant",
      "romaji": "iya"
    },
    {
      "word": "じゃあ",
      "meaning": "then; well; so; well then",
      "romaji": "jaa"
    },
    {
      "word": "字引",
      "meaning": "dictionary",
      "romaji": "jibiki"
    },
    {
      "word": "自分",
      "meaning": "myself; yourself; oneself; himself; herself; i; me",
      "romaji": "jibun"
    },
    {
      "word": "自動車",
      "meaning": "automobile; motorcar; motor vehicle; car",
      "romaji": "jidousha"
    },
    {
      "word": "時間",
      "meaning": "time; hour(s)",
      "romaji": "jikan"
    },
    {
      "word": "辞書",
      "meaning": "dictionary",
      "romaji": "jisho"
    },
    {
      "word": "自転車",
      "meaning": "bicycle",
      "romaji": "jitensha"
    },
    {
      "word": "丈夫",
      "meaning": "strong, durable",
      "romaji": "joubu"
    },
    {
      "word": "上手",
      "meaning": "skillful; skilled; proficient; good (at)",
      "romaji": "jouzu"
    },
    {
      "word": "授業",
      "meaning": "lesson; class work",
      "romaji": "jugyou"
    },
    {
      "word": "十",
      "meaning": "ten; ",
      "romaji": "juu"
    },
    {
      "word": "かばん",
      "meaning": "bag; basket​",
      "romaji": "kaban"
    },
    {
      "word": "花瓶",
      "meaning": "a vase",
      "romaji": "kabin"
    },
    {
      "word": "角",
      "meaning": "a corner; angle​",
      "romaji": "kado"
    },
    {
      "word": "帰る",
      "meaning": "to go back​",
      "romaji": "kaeru"
    },
    {
      "word": "返す",
      "meaning": "to return something",
      "romaji": "kaesu"
    },
    {
      "word": "鍵",
      "meaning": "key",
      "romaji": "kagi"
    },
    {
      "word": "階段",
      "meaning": "stairs; stairway; staircase",
      "romaji": "kaidan"
    },
    {
      "word": "買い物",
      "meaning": "shopping; purchased goods",
      "romaji": "kaimono"
    },
    {
      "word": "会社",
      "meaning": "company; corporation",
      "romaji": "kaisha"
    },
    {
      "word": "掛かる",
      "meaning": "to take (a resource, e.g. time or money)",
      "romaji": "kakaru"
    },
    {
      "word": "掛ける",
      "meaning": "to hang up; to make (a call)​;",
      "romaji": "kakeru"
    },
    {
      "word": "書く",
      "meaning": "to write; to compose; to pen; to draw",
      "romaji": "kaku"
    },
    {
      "word": "カメラ",
      "meaning": "camera",
      "romaji": "kamera"
    },
    {
      "word": "紙",
      "meaning": "paper",
      "romaji": "kami"
    },
    {
      "word": "漢字",
      "meaning": "kanji",
      "romaji": "kanji"
    },
    {
      "word": "カップ",
      "meaning": "cup",
      "romaji": "kappu"
    },
    {
      "word": "体",
      "meaning": "body",
      "romaji": "karada"
    },
    {
      "word": "辛い",
      "meaning": "spicy",
      "romaji": "karai"
    },
    {
      "word": "カレー",
      "meaning": "curry",
      "romaji": "karee"
    },
    {
      "word": "カレンダー",
      "meaning": "calendar",
      "romaji": "karendaa"
    },
    {
      "word": "借りる",
      "meaning": "to borrow",
      "romaji": "kariru"
    },
    {
      "word": "軽い",
      "meaning": "light",
      "romaji": "karui"
    },
    {
      "word": "傘",
      "meaning": "umbrella",
      "romaji": "kasa"
    },
    {
      "word": "貸す",
      "meaning": "to lend; to loan",
      "romaji": "kasu"
    },
    {
      "word": "方",
      "meaning": "way of doing something",
      "romaji": "kata"
    },
    {
      "word": "家庭",
      "meaning": "household",
      "romaji": "katei"
    },
    {
      "word": "買う",
      "meaning": "to buy; to purchase",
      "romaji": "kau"
    },
    {
      "word": "川",
      "meaning": "river; stream​",
      "romaji": "kawa"
    },
    {
      "word": "可愛い",
      "meaning": "cute",
      "romaji": "kawaii"
    },
    {
      "word": "火曜日",
      "meaning": "Tuesday",
      "romaji": "kayoubi"
    },
    {
      "word": "風",
      "meaning": "wind",
      "romaji": "kaze"
    },
    {
      "word": "風邪",
      "meaning": "a cold",
      "romaji": "kaze"
    },
    {
      "word": "家族",
      "meaning": "family; members of a family",
      "romaji": "kazoku"
    },
    {
      "word": "警官",
      "meaning": "policeman; police officer",
      "romaji": "keikan"
    },
    {
      "word": "結婚",
      "meaning": "marriage",
      "romaji": "kekkon"
    },
    {
      "word": "結構",
      "meaning": "splendid, enough",
      "romaji": "kekkou"
    },
    {
      "word": "今朝",
      "meaning": "this morning",
      "romaji": "kesa"
    },
    {
      "word": "消す",
      "meaning": "to erase, to turn off power",
      "romaji": "kesu"
    },
    {
      "word": "木",
      "meaning": "tree; shrub; bush; wood; timber",
      "romaji": "ki"
    },
    {
      "word": "消える",
      "meaning": "to disappear",
      "romaji": "kieru"
    },
    {
      "word": "黄色い",
      "meaning": "yellow",
      "romaji": "kiiroi"
    },
    {
      "word": "聞く",
      "meaning": "to hear; to listen (to music); to ask; to learn of",
      "romaji": "kiku"
    },
    {
      "word": "昨日",
      "meaning": "yesterday",
      "romaji": "kinou"
    },
    {
      "word": "金曜日",
      "meaning": "Friday",
      "romaji": "kinyoubi"
    },
    {
      "word": "切符",
      "meaning": "ticket",
      "romaji": "kippu"
    },
    {
      "word": "嫌い",
      "meaning": "hate",
      "romaji": "kirai"
    },
    {
      "word": "綺麗",
      "meaning": "pretty; lovely; beautiful",
      "romaji": "kirei"
    },
    {
      "word": "キログラム",
      "meaning": "kilogram",
      "romaji": "kiro guramu"
    },
    {
      "word": "キロメートル",
      "meaning": "kilometer",
      "romaji": "kiro meetoru"
    },
    {
      "word": "切る",
      "meaning": "to cut",
      "romaji": "kiru"
    },
    {
      "word": "着る",
      "meaning": "to wear",
      "romaji": "kiru"
    },
    {
      "word": "喫茶店",
      "meaning": "coffee shop; tearoom; cafe",
      "romaji": "kissaten"
    },
    {
      "word": "北",
      "meaning": "north",
      "romaji": "kita"
    },
    {
      "word": "汚い",
      "meaning": "dirty",
      "romaji": "kitanai"
    },
    {
      "word": "切手",
      "meaning": "stamp (postage)",
      "romaji": "kitte"
    },
    {
      "word": "こっち",
      "meaning": "this person or way",
      "romaji": "kocchi"
    },
    {
      "word": "こちら",
      "meaning": "this way; this direction​",
      "romaji": "kochira"
    },
    {
      "word": "子供",
      "meaning": "child",
      "romaji": "kodomo"
    },
    {
      "word": "声",
      "meaning": "voice",
      "romaji": "koe"
    },
    {
      "word": "ここ",
      "meaning": "here; this place",
      "romaji": "koko"
    },
    {
      "word": "九日",
      "meaning": "ninth day of the month / ",
      "romaji": "kokonoka"
    },
    {
      "word": "九つ",
      "meaning": "nine; ",
      "romaji": "kokonotsu"
    },
    {
      "word": "困る",
      "meaning": "to be troubled",
      "romaji": "komaru"
    },
    {
      "word": "今晩",
      "meaning": "tonight; this evening",
      "romaji": "konban"
    },
    {
      "word": "今月",
      "meaning": "this month",
      "romaji": "kongetsu"
    },
    {
      "word": "こんな",
      "meaning": "such; like this​",
      "romaji": "konna"
    },
    {
      "word": "この",
      "meaning": "this​",
      "romaji": "kono"
    },
    {
      "word": "今週",
      "meaning": "this week",
      "romaji": "konshuu"
    },
    {
      "word": "コーヒー",
      "meaning": "Coffee",
      "romaji": "koohii"
    },
    {
      "word": "コート",
      "meaning": "coat",
      "romaji": "kooto"
    },
    {
      "word": "コピー",
      "meaning": "copy; photocopy",
      "romaji": "kopii"
    },
    {
      "word": "コップ",
      "meaning": "glass (drinking vessel); tumbler​",
      "romaji": "koppu"
    },
    {
      "word": "これ",
      "meaning": "this",
      "romaji": "kore"
    },
    {
      "word": "答える",
      "meaning": "to answer",
      "romaji": "kotaeru"
    },
    {
      "word": "言葉",
      "meaning": "word; words",
      "romaji": "kotoba"
    },
    {
      "word": "今年",
      "meaning": "this year",
      "romaji": "kotoshi"
    },
    {
      "word": "交番",
      "meaning": "police box",
      "romaji": "kouban"
    },
    {
      "word": "紅茶",
      "meaning": "black tea",
      "romaji": "koucha"
    },
    {
      "word": "公園",
      "meaning": "park",
      "romaji": "kouen"
    },
    {
      "word": "交差点",
      "meaning": "intersection",
      "romaji": "kousaten"
    },
    {
      "word": "口",
      "meaning": "mouth, opening",
      "romaji": "kuchi"
    },
    {
      "word": "果物",
      "meaning": "fruit",
      "romaji": "kudamono"
    },
    {
      "word": "下さい",
      "meaning": "please",
      "romaji": "kudasai"
    },
    {
      "word": "曇り",
      "meaning": "cloudiness; cloudy weather",
      "romaji": "kumori"
    },
    {
      "word": "曇る",
      "meaning": "to become cloudy, to become dim",
      "romaji": "kumoru"
    },
    {
      "word": "国",
      "meaning": "country; state; region",
      "romaji": "kuni"
    },
    {
      "word": "暗い",
      "meaning": "dark; gloomy; murky",
      "romaji": "kurai"
    },
    {
      "word": "クラス",
      "meaning": "class",
      "romaji": "kurasu"
    },
    {
      "word": "黒",
      "meaning": "black",
      "romaji": "kuro"
    },
    {
      "word": "黒い",
      "meaning": "black",
      "romaji": "kuroi"
    },
    {
      "word": "来る",
      "meaning": "to come",
      "romaji": "kuru"
    },
    {
      "word": "車",
      "meaning": "car; automobile; vehicle",
      "romaji": "kuruma"
    },
    {
      "word": "薬",
      "meaning": "medicine",
      "romaji": "kusuri"
    },
    {
      "word": "靴",
      "meaning": "shoes",
      "romaji": "kutsu"
    },
    {
      "word": "靴下",
      "meaning": "socks",
      "romaji": "kutsushita"
    },
    {
      "word": "去年",
      "meaning": "last year",
      "romaji": "kyonen"
    },
    {
      "word": "今日",
      "meaning": "today; this day",
      "romaji": "kyou"
    },
    {
      "word": "兄弟",
      "meaning": "siblings; brothers and sisters​; mate",
      "romaji": "kyoudai"
    },
    {
      "word": "教室",
      "meaning": "classroom",
      "romaji": "kyoushitsu"
    },
    {
      "word": "九",
      "meaning": "nine; ",
      "romaji": "kyuu"
    },
    {
      "word": "マッチ",
      "meaning": "match",
      "romaji": "macchi"
    },
    {
      "word": "町",
      "meaning": "town; block; neighborhood",
      "romaji": "machi"
    },
    {
      "word": "窓",
      "meaning": "window",
      "romaji": "mado"
    },
    {
      "word": "前",
      "meaning": "previous; before; in front; ago",
      "romaji": "mae"
    },
    {
      "word": "曲がる",
      "meaning": "to turn, to bend",
      "romaji": "magaru"
    },
    {
      "word": "毎朝",
      "meaning": "every morning",
      "romaji": "maiasa"
    },
    {
      "word": "毎晩",
      "meaning": "every night",
      "romaji": "maiban"
    },
    {
      "word": "毎日",
      "meaning": "every day",
      "romaji": "mainichi"
    },
    {
      "word": "毎週",
      "meaning": "every week",
      "romaji": "maishuu"
    },
    {
      "word": "毎年",
      "meaning": "every year; yearly; annually",
      "romaji": "maitoshi / mainen"
    },
    {
      "word": "毎月",
      "meaning": "every month; monthly",
      "romaji": "maitsuki"
    },
    {
      "word": "万",
      "meaning": "ten thousand",
      "romaji": "man"
    },
    {
      "word": "万年筆",
      "meaning": "fountain pen",
      "romaji": "mannenhitsu"
    },
    {
      "word": "丸い",
      "meaning": "round,circular",
      "romaji": "marui"
    },
    {
      "word": "真っ直ぐ",
      "meaning": "straight ahead,direct",
      "romaji": "massugu"
    },
    {
      "word": "待つ",
      "meaning": "to wait​",
      "romaji": "matsu"
    },
    {
      "word": "不味い",
      "meaning": "unpleasant",
      "romaji": "mazui"
    },
    {
      "word": "目",
      "meaning": "eye",
      "romaji": "me"
    },
    {
      "word": "メートル",
      "meaning": "metre; meter",
      "romaji": "meetoru"
    },
    {
      "word": "眼鏡",
      "meaning": "glasses",
      "romaji": "megane"
    },
    {
      "word": "道",
      "meaning": "road; street",
      "romaji": "michi"
    },
    {
      "word": "緑",
      "meaning": "green",
      "romaji": "midori"
    },
    {
      "word": "磨く",
      "meaning": "to polish; to shine; to brush (e.g. teeth)",
      "romaji": "migaku"
    },
    {
      "word": "右",
      "meaning": "right; right hand side",
      "romaji": "migi"
    },
    {
      "word": "短い",
      "meaning": "short",
      "romaji": "mijikai"
    },
    {
      "word": "三日",
      "meaning": "the third day of the month / ",
      "romaji": "mikka"
    },
    {
      "word": "耳",
      "meaning": "ear; hearing",
      "romaji": "mimi"
    },
    {
      "word": "南",
      "meaning": "south",
      "romaji": "minami"
    },
    {
      "word": "皆さん",
      "meaning": "everyone",
      "romaji": "minasan"
    },
    {
      "word": "みんな",
      "meaning": "all; everyone; everybody",
      "romaji": "minna"
    },
    {
      "word": "見る",
      "meaning": "to see; to look; to watch; to view; to observe",
      "romaji": "miru"
    },
    {
      "word": "店",
      "meaning": "store; shop; establishment; restaurant",
      "romaji": "mise"
    },
    {
      "word": "見せる",
      "meaning": "to show; to display",
      "romaji": "miseru"
    },
    {
      "word": "三つ",
      "meaning": "three; ",
      "romaji": "mittsu"
    },
    {
      "word": "水",
      "meaning": "water; fluid; liquid​",
      "romaji": "mizu"
    },
    {
      "word": "木曜日",
      "meaning": "Thursday",
      "romaji": "mokuyoubi"
    },
    {
      "word": "門",
      "meaning": "gate",
      "romaji": "mon"
    },
    {
      "word": "問題",
      "meaning": "problem; question (e.g. on a test)",
      "romaji": "mondai"
    },
    {
      "word": "物",
      "meaning": "thing",
      "romaji": "mono"
    },
    {
      "word": "持つ",
      "meaning": "to hold",
      "romaji": "motsu"
    },
    {
      "word": "もっと",
      "meaning": "more; longer; further",
      "romaji": "motto"
    },
    {
      "word": "もう一度",
      "meaning": "once more; again",
      "romaji": "mouichido"
    },
    {
      "word": "六日",
      "meaning": "sixth day of the month / ",
      "romaji": "muika"
    },
    {
      "word": "向こう",
      "meaning": "over there",
      "romaji": "mukou"
    },
    {
      "word": "村",
      "meaning": "village",
      "romaji": "mura"
    },
    {
      "word": "六つ",
      "meaning": "six; ",
      "romaji": "muttsu"
    },
    {
      "word": "難しい",
      "meaning": "difficult",
      "romaji": "muzukashii"
    },
    {
      "word": "長い",
      "meaning": "long (distance)​; long (time); lengthy.",
      "romaji": "nagai"
    },
    {
      "word": "ナイフ",
      "meaning": "knife",
      "romaji": "naifu"
    },
    {
      "word": "中",
      "meaning": "inside; in; within; center",
      "romaji": "naka"
    },
    {
      "word": "鳴く",
      "meaning": "animal noise. to chirp",
      "romaji": "naku"
    },
    {
      "word": "無くす",
      "meaning": "to lose (something)",
      "romaji": "nakusu"
    },
    {
      "word": "名前",
      "meaning": "name; full name; given name",
      "romaji": "namae"
    },
    {
      "word": "七つ",
      "meaning": "seven; ",
      "romaji": "nanatsu"
    },
    {
      "word": "何",
      "meaning": "what",
      "romaji": "nani"
    },
    {
      "word": "七日",
      "meaning": "seventh day of the month / ",
      "romaji": "nanoka"
    },
    {
      "word": "並べる",
      "meaning": "to line up,to set up",
      "romaji": "naraberu"
    },
    {
      "word": "並ぶ",
      "meaning": "to line up,to stand in a line",
      "romaji": "narabu"
    },
    {
      "word": "習う",
      "meaning": "to be taught; to learn (from a teacher)",
      "romaji": "narau"
    },
    {
      "word": "夏",
      "meaning": "summer",
      "romaji": "natsu"
    },
    {
      "word": "夏休み",
      "meaning": "summer vacation; summer holiday",
      "romaji": "natsuyasumi"
    },
    {
      "word": "何故",
      "meaning": "why; how",
      "romaji": "naze"
    },
    {
      "word": "猫",
      "meaning": "cat",
      "romaji": "neko"
    },
    {
      "word": "ネクタイ",
      "meaning": "tie; necktie",
      "romaji": "nekutai"
    },
    {
      "word": "寝る",
      "meaning": "to sleep; to go to bed; to lie down",
      "romaji": "neru"
    },
    {
      "word": "二",
      "meaning": "two; ",
      "romaji": "ni"
    },
    {
      "word": "日曜日",
      "meaning": "Sunday",
      "romaji": "nichiyoubi"
    },
    {
      "word": "賑やか",
      "meaning": "bustling,busy",
      "romaji": "nigiyaka"
    },
    {
      "word": "日記",
      "meaning": "diary; journal",
      "romaji": "nikki"
    },
    {
      "word": "肉",
      "meaning": "meat",
      "romaji": "niku"
    },
    {
      "word": "荷物",
      "meaning": "luggage; baggage",
      "romaji": "nimotsu"
    },
    {
      "word": "西",
      "meaning": "west",
      "romaji": "nishi"
    },
    {
      "word": "庭",
      "meaning": "garden",
      "romaji": "niwa"
    },
    {
      "word": "登る",
      "meaning": "to climb",
      "romaji": "noboru"
    },
    {
      "word": "飲み物",
      "meaning": "drink; beverage",
      "romaji": "nomimono"
    },
    {
      "word": "飲む",
      "meaning": "to drink",
      "romaji": "nomu"
    },
    {
      "word": "ノート",
      "meaning": "notebook",
      "romaji": "nooto"
    },
    {
      "word": "乗る",
      "meaning": "to get on (train, plane, bus, ship, etc.)",
      "romaji": "noru"
    },
    {
      "word": "脱ぐ",
      "meaning": "to take off clothes",
      "romaji": "nugu"
    },
    {
      "word": "温い",
      "meaning": "luke warm",
      "romaji": "nurui"
    },
    {
      "word": "ニュース",
      "meaning": "news",
      "romaji": "nyuusu"
    },
    {
      "word": "おばあさん",
      "meaning": "grandmother",
      "romaji": "obaasan"
    },
    {
      "word": "伯母さん",
      "meaning": "aunt; old lady",
      "romaji": "obasan"
    },
    {
      "word": "お弁当",
      "meaning": "lunch box; Japanese box lunch",
      "romaji": "obentou"
    },
    {
      "word": "覚える",
      "meaning": "to remember",
      "romaji": "oboeru"
    },
    {
      "word": "お茶",
      "meaning": "tea",
      "romaji": "ocha"
    },
    {
      "word": "お風呂",
      "meaning": "bath",
      "romaji": "ofuro"
    },
    {
      "word": "美味しい",
      "meaning": "delicious",
      "romaji": "oishii"
    },
    {
      "word": "伯父さん",
      "meaning": "uncle; old man; mister",
      "romaji": "ojisan"
    },
    {
      "word": "お母さん",
      "meaning": "mother; mom; mum; ma",
      "romaji": "okaasan"
    },
    {
      "word": "お金",
      "meaning": "money",
      "romaji": "okane"
    },
    {
      "word": "お菓子",
      "meaning": "confections; sweets; candy",
      "romaji": "okashi"
    },
    {
      "word": "起きる",
      "meaning": "to get up; to wake up",
      "romaji": "okiru"
    },
    {
      "word": "置く",
      "meaning": "to put; to place​",
      "romaji": "oku"
    },
    {
      "word": "奥さん",
      "meaning": "wife; your wife; his wife",
      "romaji": "okusan"
    },
    {
      "word": "お巡りさん",
      "meaning": "police officer (friendly term for policeman)",
      "romaji": "omawari san"
    },
    {
      "word": "重い",
      "meaning": "heavy",
      "romaji": "omoi"
    },
    {
      "word": "面白い",
      "meaning": "interesting",
      "romaji": "omoshiroi"
    },
    {
      "word": "同じ",
      "meaning": "same",
      "romaji": "onaji"
    },
    {
      "word": "お腹",
      "meaning": "stomach",
      "romaji": "onaka"
    },
    {
      "word": "お姉さん",
      "meaning": "elder sister; young lady; miss; ma'am",
      "romaji": "oneesan"
    },
    {
      "word": "音楽",
      "meaning": "music",
      "romaji": "ongaku"
    },
    {
      "word": "お兄さん",
      "meaning": "older brother; elder brother; young man; buddy",
      "romaji": "oniisan"
    },
    {
      "word": "女",
      "meaning": "woman; female sex",
      "romaji": "onna"
    },
    {
      "word": "女の子",
      "meaning": "girl; daughter; young women",
      "romaji": "onnanoko"
    },
    {
      "word": "多い",
      "meaning": "many; numerous; a lot; large quantity; frequent",
      "romaji": "ooi"
    },
    {
      "word": "大きい",
      "meaning": "big; large; great; important",
      "romaji": "ookii"
    },
    {
      "word": "大きな",
      "meaning": "big; large; great​",
      "romaji": "ookina"
    },
    {
      "word": "大勢",
      "meaning": "crowd of people; great number of people",
      "romaji": "oozei"
    },
    {
      "word": "降りる",
      "meaning": "to get off",
      "romaji": "oriru"
    },
    {
      "word": "お酒",
      "meaning": "alcohol",
      "romaji": "osake"
    },
    {
      "word": "お皿",
      "meaning": "plate, dish",
      "romaji": "osara"
    },
    {
      "word": "教える",
      "meaning": "to teach",
      "romaji": "oshieru"
    },
    {
      "word": "遅い",
      "meaning": "slow; time-consuming; late",
      "romaji": "osoi"
    },
    {
      "word": "押す",
      "meaning": "to push; to press​",
      "romaji": "osu"
    },
    {
      "word": "お手洗い",
      "meaning": "toilet; restroom; lavatory; bathroom",
      "romaji": "otearai"
    },
    {
      "word": "男",
      "meaning": "man; male",
      "romaji": "otoko"
    },
    {
      "word": "男の子",
      "meaning": "boy; male child; baby boy",
      "romaji": "otokonoko"
    },
    {
      "word": "大人",
      "meaning": "adult",
      "romaji": "otona"
    },
    {
      "word": "一昨日",
      "meaning": "day before yesterday",
      "romaji": "ototoi"
    },
    {
      "word": "一昨年",
      "meaning": "year before last",
      "romaji": "ototoshi"
    },
    {
      "word": "お父さん",
      "meaning": "father; dad; papa; pa; pop; daddy",
      "romaji": "otousan"
    },
    {
      "word": "弟",
      "meaning": "younger brother",
      "romaji": "otouto"
    },
    {
      "word": "終わる",
      "meaning": "to finish; to end",
      "romaji": "owaru"
    },
    {
      "word": "泳ぐ",
      "meaning": "to swim",
      "romaji": "oyogu"
    },
    {
      "word": "パーティー",
      "meaning": "party",
      "romaji": "paatii"
    },
    {
      "word": "パン",
      "meaning": "bread",
      "romaji": "pan"
    },
    {
      "word": "ページ",
      "meaning": "page",
      "romaji": "peeji"
    },
    {
      "word": "ペン",
      "meaning": "pen",
      "romaji": "pen"
    },
    {
      "word": "ペット",
      "meaning": "pet",
      "romaji": "petto"
    },
    {
      "word": "ポケット",
      "meaning": "pocket",
      "romaji": "poketto"
    },
    {
      "word": "ポスト",
      "meaning": "post",
      "romaji": "posuto"
    },
    {
      "word": "プール",
      "meaning": "swimming pool",
      "romaji": "puuru"
    },
    {
      "word": "来月",
      "meaning": "next month",
      "romaji": "raigetsu"
    },
    {
      "word": "来年",
      "meaning": "next year",
      "romaji": "rainen"
    },
    {
      "word": "来週",
      "meaning": "next week",
      "romaji": "raishuu"
    },
    {
      "word": "ラジオ",
      "meaning": "radio",
      "romaji": "rajiio"
    },
    {
      "word": "零",
      "meaning": "zero",
      "romaji": "rei"
    },
    {
      "word": "冷蔵庫",
      "meaning": "refrigerator",
      "romaji": "reizouko"
    },
    {
      "word": "レコード",
      "meaning": "record",
      "romaji": "rekoodo"
    },
    {
      "word": "練習",
      "meaning": "practice; practicing",
      "romaji": "renshuu"
    },
    {
      "word": "レストラン",
      "meaning": "restaurant",
      "romaji": "resutoran"
    },
    {
      "word": "立派",
      "meaning": "splendid",
      "romaji": "rippa"
    },
    {
      "word": "六",
      "meaning": "six; ",
      "romaji": "roku"
    },
    {
      "word": "廊下",
      "meaning": "corridor; hallway; passageway",
      "romaji": "rouka"
    },
    {
      "word": "旅行",
      "meaning": "travel; trip; journey; excursion; tour",
      "romaji": "ryokou"
    },
    {
      "word": "料理",
      "meaning": "cuisine",
      "romaji": "ryouri"
    },
    {
      "word": "両親",
      "meaning": "parents; both parents",
      "romaji": "ryoushin"
    },
    {
      "word": "留学生",
      "meaning": "overseas student; exchange student",
      "romaji": "ryuugakusei"
    },
    {
      "word": "さあ",
      "meaning": "well…",
      "romaji": "saa"
    },
    {
      "word": "財布",
      "meaning": "purse; wallet",
      "romaji": "saifu"
    },
    {
      "word": "魚",
      "meaning": "fish",
      "romaji": "sakana"
    },
    {
      "word": "先",
      "meaning": "previous; prior; first; earlier",
      "romaji": "saki"
    },
    {
      "word": "咲く",
      "meaning": "to bloom",
      "romaji": "saku"
    },
    {
      "word": "作文",
      "meaning": "writing; composition",
      "romaji": "sakubun"
    },
    {
      "word": "寒い",
      "meaning": "cold",
      "romaji": "samui"
    },
    {
      "word": "三",
      "meaning": "three; ",
      "romaji": "san"
    },
    {
      "word": "散歩",
      "meaning": "walk; stroll",
      "romaji": "sanpo"
    },
    {
      "word": "再来年",
      "meaning": "year after next",
      "romaji": "sarainen"
    },
    {
      "word": "差す",
      "meaning": "to stretch out hands, to raise an umbrella",
      "romaji": "sasu"
    },
    {
      "word": "砂糖",
      "meaning": "sugar",
      "romaji": "satou"
    },
    {
      "word": "背",
      "meaning": "height; stature; back; spine",
      "romaji": "se"
    },
    {
      "word": "背広",
      "meaning": "business suit",
      "romaji": "sebiro"
    },
    {
      "word": "セーター",
      "meaning": "sweater; jumper",
      "romaji": "seetaa"
    },
    {
      "word": "生徒",
      "meaning": "pupil; student",
      "romaji": "seito"
    },
    {
      "word": "石鹼",
      "meaning": "soap",
      "romaji": "sekken"
    },
    {
      "word": "狭い",
      "meaning": "narrow",
      "romaji": "semai"
    },
    {
      "word": "千",
      "meaning": "thousand",
      "romaji": "sen"
    },
    {
      "word": "先月",
      "meaning": "last month",
      "romaji": "sengetsu"
    },
    {
      "word": "先生",
      "meaning": "teacher; instructor; master",
      "romaji": "sensei"
    },
    {
      "word": "先週",
      "meaning": "last week",
      "romaji": "senshuu"
    },
    {
      "word": "洗濯",
      "meaning": "washing; laundry",
      "romaji": "sentaku"
    },
    {
      "word": "写真",
      "meaning": "photograph; photo",
      "romaji": "shashin"
    },
    {
      "word": "シャツ",
      "meaning": "shirt",
      "romaji": "shatsu"
    },
    {
      "word": "シャワー",
      "meaning": "shower",
      "romaji": "shawaa"
    },
    {
      "word": "四",
      "meaning": "four; ",
      "romaji": "shi"
    },
    {
      "word": "七",
      "meaning": "seven; ",
      "romaji": "shichi"
    },
    {
      "word": "仕事",
      "meaning": "work; job; business",
      "romaji": "shigoto"
    },
    {
      "word": "閉まる",
      "meaning": "to close, to be closed",
      "romaji": "shimaru"
    },
    {
      "word": "閉める",
      "meaning": "to close; to shut",
      "romaji": "shimeru"
    },
    {
      "word": "締める",
      "meaning": "to tie; to fasten; to tighten​",
      "romaji": "shimeru"
    },
    {
      "word": "新聞",
      "meaning": "newspaper",
      "romaji": "shinbun"
    },
    {
      "word": "死ぬ",
      "meaning": "to die",
      "romaji": "shinu"
    },
    {
      "word": "塩",
      "meaning": "salt",
      "romaji": "shio"
    },
    {
      "word": "白",
      "meaning": "white; innocence; innocent person",
      "romaji": "shiro"
    },
    {
      "word": "白い",
      "meaning": "white",
      "romaji": "shiroi"
    },
    {
      "word": "知る",
      "meaning": "to know",
      "romaji": "shiru"
    },
    {
      "word": "下",
      "meaning": "below; down; under; bottom",
      "romaji": "shita"
    },
    {
      "word": "質問",
      "meaning": "question; inquiry",
      "romaji": "shitsumon"
    },
    {
      "word": "静か",
      "meaning": "quiet",
      "romaji": "shizuka"
    },
    {
      "word": "食堂",
      "meaning": "cafeteria; dining room",
      "romaji": "shokudou"
    },
    {
      "word": "醬油",
      "meaning": "soy sauce",
      "romaji": "shouyu"
    },
    {
      "word": "宿題",
      "meaning": "homework; assignment; pending issue",
      "romaji": "shukudai"
    },
    {
      "word": "そば",
      "meaning": "near; beside",
      "romaji": "soba"
    },
    {
      "word": "そっち",
      "meaning": "that way; ​over there",
      "romaji": "socchi"
    },
    {
      "word": "そちら",
      "meaning": "that way (distant from speaker, close to listener); you; your family",
      "romaji": "sochira"
    },
    {
      "word": "そこ",
      "meaning": "that place​; there",
      "romaji": "soko"
    },
    {
      "word": "その",
      "meaning": "that",
      "romaji": "sono"
    },
    {
      "word": "空",
      "meaning": "sky; the air",
      "romaji": "sora"
    },
    {
      "word": "それ",
      "meaning": "that",
      "romaji": "sore"
    },
    {
      "word": "それでは",
      "meaning": "in that situation",
      "romaji": "sore dewa"
    },
    {
      "word": "外",
      "meaning": "outside; exterior;",
      "romaji": "soto"
    },
    {
      "word": "掃除",
      "meaning": "to clean, to sweep",
      "romaji": "souji"
    },
    {
      "word": "直ぐに",
      "meaning": "immediately; right away; instantly​",
      "romaji": "sugu ni"
    },
    {
      "word": "水曜日",
      "meaning": "Wednesday",
      "romaji": "suiyoubi"
    },
    {
      "word": "スカート",
      "meaning": "skirt",
      "romaji": "sukaato"
    },
    {
      "word": "好き",
      "meaning": "like",
      "romaji": "suki"
    },
    {
      "word": "少し",
      "meaning": "a little (bit); small quantity; few; short distance",
      "romaji": "sukoshi"
    },
    {
      "word": "少ない",
      "meaning": "few; a little; scarce; insufficient; seldom",
      "romaji": "sukunai"
    },
    {
      "word": "住む",
      "meaning": "to live in; to reside; to inhabit; to dwell; to abide",
      "romaji": "sumu"
    },
    {
      "word": "スポーツ",
      "meaning": "sport; sports",
      "romaji": "supootsu"
    },
    {
      "word": "スプーン",
      "meaning": "spoon",
      "romaji": "supuun"
    },
    {
      "word": "スリッパ",
      "meaning": "slipper; slippers",
      "romaji": "surippa"
    },
    {
      "word": "ストーブ",
      "meaning": "heater; stove",
      "romaji": "sutoobu"
    },
    {
      "word": "吸う",
      "meaning": "to smoke, to suck",
      "romaji": "suu"
    },
    {
      "word": "座る",
      "meaning": "to sit",
      "romaji": "suwaru"
    },
    {
      "word": "涼しい",
      "meaning": "refreshing, cool",
      "romaji": "suzushii"
    },
    {
      "word": "たばこ",
      "meaning": "tobacco; cigarette",
      "romaji": "tabako"
    },
    {
      "word": "食べ物",
      "meaning": "food",
      "romaji": "tabemono"
    },
    {
      "word": "食べる",
      "meaning": "to eat",
      "romaji": "taberu"
    },
    {
      "word": "多分",
      "meaning": "perhaps; probably",
      "romaji": "tabun"
    },
    {
      "word": "大変",
      "meaning": "very; greatly; terribly; serious; difficult",
      "romaji": "taihen"
    },
    {
      "word": "大切",
      "meaning": "important; necessary; indispensable; beloved",
      "romaji": "taisetsu"
    },
    {
      "word": "大使館",
      "meaning": "embassy",
      "romaji": "taishikan"
    },
    {
      "word": "高い",
      "meaning": "high; tall; expensive; above average",
      "romaji": "takai"
    },
    {
      "word": "沢山",
      "meaning": "many",
      "romaji": "takusan"
    },
    {
      "word": "タクシー",
      "meaning": "taxi",
      "romaji": "takushii"
    },
    {
      "word": "卵",
      "meaning": "eggs; egg",
      "romaji": "tamago"
    },
    {
      "word": "誕生日",
      "meaning": "birthday",
      "romaji": "tanjoubi"
    },
    {
      "word": "頼む",
      "meaning": "to ask",
      "romaji": "tanomu"
    },
    {
      "word": "楽しい",
      "meaning": "enjoyable; fun",
      "romaji": "tanoshii"
    },
    {
      "word": "縦",
      "meaning": "length,height",
      "romaji": "tate"
    },
    {
      "word": "建物",
      "meaning": "building",
      "romaji": "tatemono"
    },
    {
      "word": "立つ",
      "meaning": "to stand; to stand up​",
      "romaji": "tatsu"
    },
    {
      "word": "手",
      "meaning": "hand; arm",
      "romaji": "te"
    },
    {
      "word": "テーブル",
      "meaning": "table",
      "romaji": "teeburu"
    },
    {
      "word": "テープ",
      "meaning": "tape",
      "romaji": "teepu"
    },
    {
      "word": "テープレコーダー",
      "meaning": "tape recorder",
      "romaji": "teepu rekoodaa"
    },
    {
      "word": "手紙",
      "meaning": "Letter (message)​",
      "romaji": "tegami"
    },
    {
      "word": "天気",
      "meaning": "weather; the elements",
      "romaji": "tenki"
    },
    {
      "word": "テレビ",
      "meaning": "television; TV​",
      "romaji": "terebi"
    },
    {
      "word": "テスト",
      "meaning": "examination; quiz; test",
      "romaji": "tesuto"
    },
    {
      "word": "戸",
      "meaning": "Japanese style door",
      "romaji": "to"
    },
    {
      "word": "飛ぶ",
      "meaning": "to fly; to hop",
      "romaji": "tobu"
    },
    {
      "word": "トイレ",
      "meaning": "toilet",
      "romaji": "toire"
    },
    {
      "word": "時計",
      "meaning": "watch; clock; timepiece",
      "romaji": "tokei"
    },
    {
      "word": "時",
      "meaning": "time; moment; occasion; chance",
      "romaji": "toki"
    },
    {
      "word": "時々",
      "meaning": "sometimes; at times",
      "romaji": "tokidoki"
    },
    {
      "word": "所",
      "meaning": "place",
      "romaji": "tokoro"
    },
    {
      "word": "止まる",
      "meaning": "to stop; to come to a halt",
      "romaji": "tomaru"
    },
    {
      "word": "友達",
      "meaning": "friend; companion",
      "romaji": "tomodachi"
    },
    {
      "word": "隣",
      "meaning": "next door to",
      "romaji": "tonari"
    },
    {
      "word": "遠い",
      "meaning": "far",
      "romaji": "tooi"
    },
    {
      "word": "十日",
      "meaning": "tenth day of the month / ",
      "romaji": "tooka"
    },
    {
      "word": "鳥",
      "meaning": "bird",
      "romaji": "tori"
    },
    {
      "word": "鶏肉",
      "meaning": "chicken meat",
      "romaji": "toriniku"
    },
    {
      "word": "取る",
      "meaning": "to take; to pick up; to harvest; to earn; to win; to choose",
      "romaji": "toru"
    },
    {
      "word": "撮る",
      "meaning": "to take a photo or record a film",
      "romaji": "toru"
    },
    {
      "word": "年",
      "meaning": "year; age",
      "romaji": "toshi"
    },
    {
      "word": "図書館",
      "meaning": "library",
      "romaji": "toshokan"
    },
    {
      "word": "次",
      "meaning": "next",
      "romaji": "tsugi"
    },
    {
      "word": "一日",
      "meaning": "first day of the month",
      "romaji": "tsuitachi"
    },
    {
      "word": "疲れる",
      "meaning": "to get tired",
      "romaji": "tsukareru"
    },
    {
      "word": "使う",
      "meaning": "to use",
      "romaji": "tsukau"
    },
    {
      "word": "つける",
      "meaning": "to turn on",
      "romaji": "tsukeru"
    },
    {
      "word": "付ける",
      "meaning": "to attach; affix; add; apply",
      "romaji": "tsukeru"
    },
    {
      "word": "着く",
      "meaning": "to arrive at",
      "romaji": "tsuku"
    },
    {
      "word": "机",
      "meaning": "desk",
      "romaji": "tsukue"
    },
    {
      "word": "作る",
      "meaning": "to make",
      "romaji": "tsukuru"
    },
    {
      "word": "詰まらない",
      "meaning": "boring",
      "romaji": "tsumaranai"
    },
    {
      "word": "冷たい",
      "meaning": "cold to the touch",
      "romaji": "tsumetai"
    },
    {
      "word": "勤める",
      "meaning": "to work for someone",
      "romaji": "tsutomeru"
    },
    {
      "word": "強い",
      "meaning": "powerful",
      "romaji": "tsuyoi"
    },
    {
      "word": "上",
      "meaning": "above; up; over; top; surface",
      "romaji": "ue"
    },
    {
      "word": "生まれる",
      "meaning": "to be born",
      "romaji": "umareru"
    },
    {
      "word": "海",
      "meaning": "sea",
      "romaji": "umi"
    },
    {
      "word": "売る",
      "meaning": "to sell",
      "romaji": "uru"
    },
    {
      "word": "煩い",
      "meaning": "noisy, annoying",
      "romaji": "urusai"
    },
    {
      "word": "後ろ",
      "meaning": "back; behind; rear",
      "romaji": "ushiro"
    },
    {
      "word": "薄い",
      "meaning": "thin; weak",
      "romaji": "usui"
    },
    {
      "word": "歌",
      "meaning": "song",
      "romaji": "uta"
    },
    {
      "word": "歌う",
      "meaning": "to sing",
      "romaji": "utau"
    },
    {
      "word": "上着",
      "meaning": "coat; tunic; jacket; outer garment",
      "romaji": "uwagi"
    },
    {
      "word": "ワイシャツ",
      "meaning": "shirt",
      "romaji": "wai shatsu"
    },
    {
      "word": "若い",
      "meaning": "young",
      "romaji": "wakai"
    },
    {
      "word": "分かる",
      "meaning": "to understand; to comprehend; to grasp; to see; to get; to follow",
      "romaji": "wakaru"
    },
    {
      "word": "悪い",
      "meaning": "bad; poor; undesirable",
      "romaji": "warui"
    },
    {
      "word": "忘れる",
      "meaning": "to forget",
      "romaji": "wasureru"
    },
    {
      "word": "渡る",
      "meaning": "to go across",
      "romaji": "wataru"
    },
    {
      "word": "私",
      "meaning": "I; myself",
      "romaji": "watashi"
    },
    {
      "word": "渡す",
      "meaning": "to hand over",
      "romaji": "watasu"
    },
    {
      "word": "山",
      "meaning": "mountain; hill",
      "romaji": "yama"
    },
    {
      "word": "八百屋",
      "meaning": "greengrocer; fruit and vegetable shop; versatile",
      "romaji": "yaoya"
    },
    {
      "word": "やる",
      "meaning": "to do",
      "romaji": "yaru"
    },
    {
      "word": "野菜",
      "meaning": "vegetable",
      "romaji": "yasai"
    },
    {
      "word": "易しい",
      "meaning": "easy, simple",
      "romaji": "yasashii"
    },
    {
      "word": "安い",
      "meaning": "cheap; inexpensive",
      "romaji": "yasui"
    },
    {
      "word": "休み",
      "meaning": "rest; vacation; holiday",
      "romaji": "yasumi"
    },
    {
      "word": "休む",
      "meaning": "to be absent; to take a day off; to rest",
      "romaji": "yasumu"
    },
    {
      "word": "八つ",
      "meaning": "eight: ",
      "romaji": "yattsu"
    },
    {
      "word": "呼ぶ",
      "meaning": "to call out, to invite",
      "romaji": "yobu"
    },
    {
      "word": "良い",
      "meaning": "good",
      "romaji": "yoi/ii"
    },
    {
      "word": "四日",
      "meaning": "fourth day of the month / ",
      "romaji": "yokka"
    },
    {
      "word": "横",
      "meaning": "beside,side,width",
      "romaji": "yoko"
    },
    {
      "word": "よく",
      "meaning": "often, well",
      "romaji": "yoku"
    },
    {
      "word": "読む",
      "meaning": "to read;  to guess; to predict; to read (someone's thoughts)",
      "romaji": "yomu"
    },
    {
      "word": "夜",
      "meaning": "evening; night",
      "romaji": "yoru"
    },
    {
      "word": "四つ",
      "meaning": "four; ",
      "romaji": "yotsu"
    },
    {
      "word": "洋服",
      "meaning": "western clothes",
      "romaji": "youfuku"
    },
    {
      "word": "八日",
      "meaning": "eighth day of the month / ",
      "romaji": "youka"
    },
    {
      "word": "弱い",
      "meaning": "weak",
      "romaji": "yowai"
    },
    {
      "word": "雪",
      "meaning": "snow",
      "romaji": "yuki"
    },
    {
      "word": "ゆっくり",
      "meaning": "slowly",
      "romaji": "yukkuri"
    },
    {
      "word": "昨夜",
      "meaning": "last night",
      "romaji": "yuube"
    },
    {
      "word": "郵便局",
      "meaning": "post office",
      "romaji": "yuubinkyoku"
    },
    {
      "word": "夕方",
      "meaning": "evening; dusk",
      "romaji": "yuugata"
    },
    {
      "word": "夕飯",
      "meaning": "evening meal",
      "romaji": "yuuhan"
    },
    {
      "word": "有名",
      "meaning": "famous",
      "romaji": "yuumei"
    },
    {
      "word": "雑誌",
      "meaning": "magazine",
      "romaji": "zasshi"
    },
    {
      "word": "全部",
      "meaning": "all",
      "romaji": "zenbu"
    },
    {
      "word": "ゼロ",
      "meaning": "zero",
      "romaji": "zero"
    },
    {
      "word": "ズボン",
      "meaning": "trousers; pants",
      "romaji": "zubon"
    }
  ],
  N4: [
    { word: "会議", meaning: "meeting", romaji: "kaigi" },
    { word: "会社", meaning: "company", romaji: "kaisha" },
    { word: "家族", meaning: "family", romaji: "kazoku" },
    { word: "仕事", meaning: "work", romaji: "shigoto" },
    { word: "休み", meaning: "holiday", romaji: "yasumi" },
    { word: "旅行", meaning: "travel", romaji: "ryokō" },
    { word: "料理", meaning: "cooking", romaji: "ryōri" },
    { word: "映画", meaning: "movie", romaji: "eiga" },
    { word: "音楽", meaning: "music", romaji: "ongaku" },
    { word: "病院", meaning: "hospital", romaji: "byōin" },
    {
      "word": "あ",
      "meaning": "Ah; oh",
      "romaji": "a"
    },
    {
      "word": "ああ",
      "meaning": "ah; yes",
      "romaji": "aa"
    },
    {
      "word": "アフリカ",
      "meaning": "Africa",
      "romaji": "afurika"
    },
    {
      "word": "上がる",
      "meaning": "to rise",
      "romaji": "agaru"
    },
    {
      "word": "挨拶",
      "meaning": "to greet",
      "romaji": "aisatsu"
    },
    {
      "word": "味",
      "meaning": "flavor; taste​; uniqueness; attractiveness; experience",
      "romaji": "aji"
    },
    {
      "word": "アジア",
      "meaning": "Asia",
      "romaji": "ajia"
    },
    {
      "word": "赤ちゃん",
      "meaning": "baby; infant",
      "romaji": "akachan"
    },
    {
      "word": "赤ん坊",
      "meaning": "baby; infant",
      "romaji": "akanbou"
    },
    {
      "word": "アクセサリー",
      "meaning": "accessory",
      "romaji": "akusesarii"
    },
    {
      "word": "アメリカ",
      "meaning": "America",
      "romaji": "amerika"
    },
    {
      "word": "アナウンサー",
      "meaning": "announcer",
      "romaji": "anaunsaa"
    },
    {
      "word": "あんな",
      "meaning": "such",
      "romaji": "anna"
    },
    {
      "word": "案内",
      "meaning": "to guide",
      "romaji": "annai"
    },
    {
      "word": "安心",
      "meaning": "peace of mind",
      "romaji": "anshin"
    },
    {
      "word": "安全",
      "meaning": "safety; security​",
      "romaji": "anzen"
    },
    {
      "word": "アルバイト",
      "meaning": "part-time job",
      "romaji": "arubaito"
    },
    {
      "word": "アルコール",
      "meaning": "alcohol",
      "romaji": "arukooru"
    },
    {
      "word": "浅い",
      "meaning": "shallow",
      "romaji": "asai"
    },
    {
      "word": "遊び",
      "meaning": "playing",
      "romaji": "asobi"
    },
    {
      "word": "集まる",
      "meaning": "to gather; to collect; to assemble",
      "romaji": "atsumaru"
    },
    {
      "word": "集める",
      "meaning": "to collect; to assemble; to gather",
      "romaji": "atsumeru"
    },
    {
      "word": "謝る",
      "meaning": "to apologize",
      "romaji": "ayamaru"
    },
    {
      "word": "倍",
      "meaning": "double",
      "romaji": "bai"
    },
    {
      "word": "番組",
      "meaning": "program (e.g. TV)",
      "romaji": "bangumi"
    },
    {
      "word": "場所",
      "meaning": "place",
      "romaji": "basho"
    },
    {
      "word": "ベル",
      "meaning": "bell",
      "romaji": "beru"
    },
    {
      "word": "美術館",
      "meaning": "art gallery; art museum",
      "romaji": "bijutsukan"
    },
    {
      "word": "びっくり",
      "meaning": "to be surprised",
      "romaji": "bikkuri"
    },
    {
      "word": "ビル",
      "meaning": "building",
      "romaji": "biru"
    },
    {
      "word": "僕",
      "meaning": "I (used by males)",
      "romaji": "boku"
    },
    {
      "word": "貿易",
      "meaning": "trade",
      "romaji": "boueki"
    },
    {
      "word": "部長",
      "meaning": "manager; head (chief, director) of a section or department",
      "romaji": "buchou"
    },
    {
      "word": "ぶどう",
      "meaning": "grapes",
      "romaji": "budou"
    },
    {
      "word": "文学",
      "meaning": "literature",
      "romaji": "bungaku"
    },
    {
      "word": "文化",
      "meaning": "culture",
      "romaji": "bunka"
    },
    {
      "word": "文法",
      "meaning": "grammar",
      "romaji": "bunpou"
    },
    {
      "word": "ちゃん",
      "meaning": "suffix for familiar female person",
      "romaji": "chan"
    },
    {
      "word": "チェック",
      "meaning": "to check",
      "romaji": "chekku"
    },
    {
      "word": "血",
      "meaning": "blood",
      "romaji": "chi"
    },
    {
      "word": "力",
      "meaning": "energy; force; strength; might; power",
      "romaji": "chikara"
    },
    {
      "word": "地理",
      "meaning": "geography",
      "romaji": "chiri"
    },
    {
      "word": "中学校",
      "meaning": "junior high school; middle school",
      "romaji": "chuugakkou"
    },
    {
      "word": "注意",
      "meaning": "caution",
      "romaji": "chuui"
    },
    {
      "word": "注射",
      "meaning": "injection",
      "romaji": "chuusha"
    },
    {
      "word": "駐車場",
      "meaning": "parking lot",
      "romaji": "chuushajou"
    },
    {
      "word": "大分",
      "meaning": "considerably; greatly; a lot​",
      "romaji": "daibu"
    },
    {
      "word": "大学生",
      "meaning": "university student; college student",
      "romaji": "daigakusei"
    },
    {
      "word": "大事",
      "meaning": "important; serious; crucial",
      "romaji": "daiji"
    },
    {
      "word": "大体",
      "meaning": "roughly",
      "romaji": "daitai"
    },
    {
      "word": "暖房",
      "meaning": "heating",
      "romaji": "danbou"
    },
    {
      "word": "男性",
      "meaning": "man; male",
      "romaji": "dansei"
    },
    {
      "word": "できるだけ",
      "meaning": "as much as possible",
      "romaji": "dekiru dake"
    },
    {
      "word": "電報",
      "meaning": "telegram",
      "romaji": "denpou"
    },
    {
      "word": "電灯",
      "meaning": "electric light",
      "romaji": "dentou"
    },
    {
      "word": "どんどん",
      "meaning": "rapidly; more and more",
      "romaji": "dondon"
    },
    {
      "word": "泥棒",
      "meaning": "thief",
      "romaji": "dorobou"
    },
    {
      "word": "動物園",
      "meaning": "zoo; zoological gardens",
      "romaji": "doubutsuen"
    },
    {
      "word": "道具",
      "meaning": "tool",
      "romaji": "dougu"
    },
    {
      "word": "枝",
      "meaning": "branch",
      "romaji": "eda"
    },
    {
      "word": "遠慮",
      "meaning": "reserve; refraining",
      "romaji": "enryo"
    },
    {
      "word": "選ぶ",
      "meaning": "to choose",
      "romaji": "erabu"
    },
    {
      "word": "エスカレーター",
      "meaning": "escalator",
      "romaji": "esukareetaa"
    },
    {
      "word": "ファックス",
      "meaning": "fax",
      "romaji": "fakkusu"
    },
    {
      "word": "不便",
      "meaning": "inconvenience",
      "romaji": "fuben"
    },
    {
      "word": "増える",
      "meaning": "to increase",
      "romaji": "fueru"
    },
    {
      "word": "深い",
      "meaning": "deep",
      "romaji": "fukai"
    },
    {
      "word": "復習",
      "meaning": "review (of learned material); revision",
      "romaji": "fukushuu"
    },
    {
      "word": "複雑",
      "meaning": "complexity; complication",
      "romaji": "fukuzatsu"
    },
    {
      "word": "踏む",
      "meaning": "to step on",
      "romaji": "fumu"
    },
    {
      "word": "船",
      "meaning": "ship",
      "romaji": "fune"
    },
    {
      "word": "降り出す",
      "meaning": "to start to rain",
      "romaji": "furidasu"
    },
    {
      "word": "布団",
      "meaning": "Japanese bedding, futon",
      "romaji": "futon"
    },
    {
      "word": "太る",
      "meaning": "to become fat",
      "romaji": "futoru"
    },
    {
      "word": "普通",
      "meaning": "usually",
      "romaji": "futsuu"
    },
    {
      "word": "ガラス",
      "meaning": "a glass",
      "romaji": "garasu"
    },
    {
      "word": "ガソリン",
      "meaning": "gasoline; petrol",
      "romaji": "gasorin"
    },
    {
      "word": "ガソリンスタンド",
      "meaning": "petrol station",
      "romaji": "gasorin sutando"
    },
    {
      "word": "ガス",
      "meaning": "petrol",
      "romaji": "gasu"
    },
    {
      "word": "原因",
      "meaning": "cause",
      "romaji": "genin"
    },
    {
      "word": "下宿",
      "meaning": "lodging",
      "romaji": "geshuku"
    },
    {
      "word": "技術",
      "meaning": "art,technology,skill",
      "romaji": "gijutsu"
    },
    {
      "word": "ごちそう",
      "meaning": "a feast",
      "romaji": "gochisou"
    },
    {
      "word": "ごみ",
      "meaning": "rubbish",
      "romaji": "gomi"
    },
    {
      "word": "ご覧になる",
      "meaning": "(respectful) to see",
      "romaji": "goran ni naru"
    },
    {
      "word": "ご主人",
      "meaning": "your husband; her husband",
      "romaji": "goshujin"
    },
    {
      "word": "ご存じ",
      "meaning": "knowing",
      "romaji": "gozonji"
    },
    {
      "word": "具合",
      "meaning": "condition; health",
      "romaji": "guai"
    },
    {
      "word": "葉",
      "meaning": "leaves; leaf",
      "romaji": "ha"
    },
    {
      "word": "拝見",
      "meaning": "seeing; looking at​",
      "romaji": "haiken"
    },
    {
      "word": "歯医者",
      "meaning": "dentist",
      "romaji": "haisha"
    },
    {
      "word": "はっきり",
      "meaning": "clearly",
      "romaji": "hakkiri"
    },
    {
      "word": "運ぶ",
      "meaning": "to carry",
      "romaji": "hakobu"
    },
    {
      "word": "花見",
      "meaning": "cherry blossom viewing; flower viewing",
      "romaji": "hanami"
    },
    {
      "word": "ハンドバッグ",
      "meaning": "handbag",
      "romaji": "handobaggu"
    },
    {
      "word": "反対",
      "meaning": "opposition",
      "romaji": "hantai"
    },
    {
      "word": "払う",
      "meaning": "to pay",
      "romaji": "harau"
    },
    {
      "word": "発音",
      "meaning": "pronunciation",
      "romaji": "hatsuon"
    },
    {
      "word": "林",
      "meaning": "woods; forest",
      "romaji": "hayashi"
    },
    {
      "word": "恥ずかしい",
      "meaning": "embarrassed",
      "romaji": "hazukashii"
    },
    {
      "word": "変",
      "meaning": "strange; peculiar; weird",
      "romaji": "hen"
    },
    {
      "word": "返事",
      "meaning": "reply; answer; response",
      "romaji": "henji"
    },
    {
      "word": "火",
      "meaning": "fire",
      "romaji": "hi"
    },
    {
      "word": "酷い",
      "meaning": "terrible; awful​",
      "romaji": "hidoi"
    },
    {
      "word": "冷える",
      "meaning": "to grow cold",
      "romaji": "hieru"
    },
    {
      "word": "髭",
      "meaning": "beard",
      "romaji": "hige"
    },
    {
      "word": "非常に",
      "meaning": "extremely",
      "romaji": "hijou ni"
    },
    {
      "word": "光",
      "meaning": "light",
      "romaji": "hikari"
    },
    {
      "word": "光る",
      "meaning": "to shine",
      "romaji": "hikaru"
    },
    {
      "word": "引き出し",
      "meaning": "drawer",
      "romaji": "hikidashi"
    },
    {
      "word": "引き出す",
      "meaning": "to withdraw",
      "romaji": "hikidasu"
    },
    {
      "word": "引っ越す",
      "meaning": "to move house",
      "romaji": "hikkosu"
    },
    {
      "word": "飛行場",
      "meaning": "airfield; airport",
      "romaji": "hikoujou"
    },
    {
      "word": "開く",
      "meaning": "to open; to undo; to unseal; to unpack",
      "romaji": "hiraku"
    },
    {
      "word": "拾う",
      "meaning": "to pick up",
      "romaji": "hirou"
    },
    {
      "word": "昼間",
      "meaning": "daytime; during the day",
      "romaji": "hiruma"
    },
    {
      "word": "昼休み",
      "meaning": "lunch break; noon recess; noon rest period",
      "romaji": "hiruyasumi"
    },
    {
      "word": "久しぶり",
      "meaning": "after a long time",
      "romaji": "hisashiburi"
    },
    {
      "word": "褒める",
      "meaning": "to praise",
      "romaji": "homeru"
    },
    {
      "word": "翻訳",
      "meaning": "translation",
      "romaji": "honyaku"
    },
    {
      "word": "星",
      "meaning": "star",
      "romaji": "hoshi"
    },
    {
      "word": "ほとんど",
      "meaning": "mostly",
      "romaji": "hotondo"
    },
    {
      "word": "法律",
      "meaning": "law",
      "romaji": "houritsu"
    },
    {
      "word": "放送",
      "meaning": "to broadcast",
      "romaji": "housou"
    },
    {
      "word": "一度",
      "meaning": "once; one time; on one occasion",
      "romaji": "ichido"
    },
    {
      "word": "以外",
      "meaning": "with the exception of; excepting",
      "romaji": "igai"
    },
    {
      "word": "医学",
      "meaning": "medical science; medicine",
      "romaji": "igaku"
    },
    {
      "word": "いじめる",
      "meaning": "to tease",
      "romaji": "ijimeru"
    },
    {
      "word": "以上",
      "meaning": "... and more; ... and upwards​",
      "romaji": "ijou"
    },
    {
      "word": "以下",
      "meaning": "not exceeding",
      "romaji": "ika"
    },
    {
      "word": "意見",
      "meaning": "opinion; view; comment",
      "romaji": "iken"
    },
    {
      "word": "生き物",
      "meaning": "living thing",
      "romaji": "ikimono"
    },
    {
      "word": "生きる",
      "meaning": "to live",
      "romaji": "ikiru"
    },
    {
      "word": "以内",
      "meaning": "within",
      "romaji": "inai"
    },
    {
      "word": "田舎",
      "meaning": "countryside",
      "romaji": "inaka"
    },
    {
      "word": "祈る",
      "meaning": "to pray",
      "romaji": "inoru"
    },
    {
      "word": "いっぱい",
      "meaning": "full",
      "romaji": "ippai"
    },
    {
      "word": "色んな",
      "meaning": "various",
      "romaji": "ironna"
    },
    {
      "word": "石",
      "meaning": "stone",
      "romaji": "ishi"
    },
    {
      "word": "急ぐ",
      "meaning": "to hurry; to rush; to hasten; to make something happen sooner",
      "romaji": "isogu"
    },
    {
      "word": "一生懸命",
      "meaning": "very hard; with utmost effort",
      "romaji": "isshoukenmei"
    },
    {
      "word": "頂く",
      "meaning": "(humble) to receive",
      "romaji": "itadaku"
    },
    {
      "word": "致す",
      "meaning": "(humble) to do",
      "romaji": "itasu"
    },
    {
      "word": "糸",
      "meaning": "thread",
      "romaji": "ito"
    },
    {
      "word": "ジャム",
      "meaning": "jam",
      "romaji": "jamu"
    },
    {
      "word": "字",
      "meaning": "character",
      "romaji": "ji"
    },
    {
      "word": "時代",
      "meaning": "period",
      "romaji": "jidai"
    },
    {
      "word": "事故",
      "meaning": "accident",
      "romaji": "jiko"
    },
    {
      "word": "事務所",
      "meaning": "office",
      "romaji": "jimusho"
    },
    {
      "word": "神社",
      "meaning": "Shinto shrine",
      "romaji": "jinja"
    },
    {
      "word": "人口",
      "meaning": "population",
      "romaji": "jinkou"
    },
    {
      "word": "人生",
      "meaning": "human life",
      "romaji": "jinsei"
    },
    {
      "word": "地震",
      "meaning": "earthquake",
      "romaji": "jishin"
    },
    {
      "word": "辞典",
      "meaning": "dictionary",
      "romaji": "jiten"
    },
    {
      "word": "自由",
      "meaning": "freedom",
      "romaji": "jiyuu"
    },
    {
      "word": "女性",
      "meaning": "woman; female",
      "romaji": "josei"
    },
    {
      "word": "準備",
      "meaning": "to prepare",
      "romaji": "junbi"
    },
    {
      "word": "十分",
      "meaning": "enough; sufficient; plenty; adequate; satisfactory",
      "romaji": "juubun"
    },
    {
      "word": "柔道",
      "meaning": "judo",
      "romaji": "juudou"
    },
    {
      "word": "住所",
      "meaning": "address",
      "romaji": "juusho"
    },
    {
      "word": "カーテン",
      "meaning": "curtain",
      "romaji": "kaaten"
    },
    {
      "word": "壁",
      "meaning": "wall",
      "romaji": "kabe"
    },
    {
      "word": "課長",
      "meaning": "section manager; section chief",
      "romaji": "kachou"
    },
    {
      "word": "帰り",
      "meaning": "return; coming back",
      "romaji": "kaeri"
    },
    {
      "word": "変える",
      "meaning": "to change; to transform",
      "romaji": "kaeru"
    },
    {
      "word": "科学",
      "meaning": "science",
      "romaji": "kagaku"
    },
    {
      "word": "鏡",
      "meaning": "mirror",
      "romaji": "kagami"
    },
    {
      "word": "海岸",
      "meaning": "coast",
      "romaji": "kaigan"
    },
    {
      "word": "会議",
      "meaning": "meeting; conference; session; assembly",
      "romaji": "kaigi"
    },
    {
      "word": "会議室",
      "meaning": "conference room; conference hall; council room",
      "romaji": "kaigishitsu"
    },
    {
      "word": "会場",
      "meaning": "assembly hall; meeting place; venue; grounds",
      "romaji": "kaijou"
    },
    {
      "word": "会話",
      "meaning": "conversation",
      "romaji": "kaiwa"
    },
    {
      "word": "火事",
      "meaning": "fire",
      "romaji": "kaji"
    },
    {
      "word": "格好",
      "meaning": "appearance",
      "romaji": "kakkou"
    },
    {
      "word": "構う",
      "meaning": "to mind",
      "romaji": "kamau"
    },
    {
      "word": "髪",
      "meaning": "hair",
      "romaji": "kami"
    },
    {
      "word": "噛む",
      "meaning": "to bite,to chew",
      "romaji": "kamu"
    },
    {
      "word": "家内",
      "meaning": "(my) wife; inside the home; one's family",
      "romaji": "kanai"
    },
    {
      "word": "必ず",
      "meaning": "always; certainly",
      "romaji": "kanarazu"
    },
    {
      "word": "悲しい",
      "meaning": "sad",
      "romaji": "kanashii"
    },
    {
      "word": "考える",
      "meaning": "to think",
      "romaji": "kangaeru"
    },
    {
      "word": "看護婦",
      "meaning": "female nurse",
      "romaji": "kangofu"
    },
    {
      "word": "関係",
      "meaning": "relationship",
      "romaji": "kankei"
    },
    {
      "word": "彼女",
      "meaning": "she; her​",
      "romaji": "kanojo"
    },
    {
      "word": "簡単",
      "meaning": "simple; easy",
      "romaji": "kantan"
    },
    {
      "word": "彼",
      "meaning": "he; him​; his",
      "romaji": "kare"
    },
    {
      "word": "彼ら",
      "meaning": "they; them",
      "romaji": "karera"
    },
    {
      "word": "形",
      "meaning": "shape",
      "romaji": "katachi"
    },
    {
      "word": "片付ける",
      "meaning": "to tidy up",
      "romaji": "katadzukeru"
    },
    {
      "word": "硬い",
      "meaning": "hard",
      "romaji": "katai"
    },
    {
      "word": "勝つ",
      "meaning": "to win",
      "romaji": "katsu"
    },
    {
      "word": "乾く",
      "meaning": "to get dry",
      "romaji": "kawaku"
    },
    {
      "word": "代わり",
      "meaning": "instead; in place",
      "romaji": "kawari"
    },
    {
      "word": "変わる",
      "meaning": "to change",
      "romaji": "kawaru"
    },
    {
      "word": "通う",
      "meaning": "to commute",
      "romaji": "kayou"
    },
    {
      "word": "飾る",
      "meaning": "to decorate",
      "romaji": "kazaru"
    },
    {
      "word": "毛",
      "meaning": "hair or fur",
      "romaji": "ke"
    },
    {
      "word": "ケーキ",
      "meaning": "cake",
      "romaji": "keeki"
    },
    {
      "word": "怪我",
      "meaning": "to injure",
      "romaji": "kega"
    },
    {
      "word": "計画",
      "meaning": "to plan",
      "romaji": "keikaku"
    },
    {
      "word": "経験",
      "meaning": "to experience",
      "romaji": "keiken"
    },
    {
      "word": "警察",
      "meaning": "police",
      "romaji": "keisatsu"
    },
    {
      "word": "経済",
      "meaning": "finance, economy",
      "romaji": "keizai"
    },
    {
      "word": "見物",
      "meaning": "sightseeing; visit",
      "romaji": "kenbutsu"
    },
    {
      "word": "喧嘩",
      "meaning": "to quarrel",
      "romaji": "kenka"
    },
    {
      "word": "研究",
      "meaning": "research",
      "romaji": "kenkyuu"
    },
    {
      "word": "研究室",
      "meaning": "laboratory",
      "romaji": "kenkyuushitsu"
    },
    {
      "word": "消しゴム",
      "meaning": "eraser",
      "romaji": "keshigomu"
    },
    {
      "word": "景色",
      "meaning": "scenery",
      "romaji": "keshiki"
    },
    {
      "word": "気",
      "meaning": "spirit",
      "romaji": "ki"
    },
    {
      "word": "厳しい",
      "meaning": "strict",
      "romaji": "kibishii"
    },
    {
      "word": "気分",
      "meaning": "feeling; mood",
      "romaji": "kibun"
    },
    {
      "word": "機会",
      "meaning": "chance; opportunity",
      "romaji": "kikai"
    },
    {
      "word": "危険",
      "meaning": "danger",
      "romaji": "kiken"
    },
    {
      "word": "聞こえる",
      "meaning": "to be heard; to be audible; to be said",
      "romaji": "kikoeru"
    },
    {
      "word": "決まる",
      "meaning": "to be decided",
      "romaji": "kimaru"
    },
    {
      "word": "決める",
      "meaning": "to decide",
      "romaji": "kimeru"
    },
    {
      "word": "君",
      "meaning": "You",
      "romaji": "kimi"
    },
    {
      "word": "気持ち",
      "meaning": "feeling",
      "romaji": "kimochi"
    },
    {
      "word": "着物",
      "meaning": "kimono; Japanese traditional clothing",
      "romaji": "kimono"
    },
    {
      "word": "近所",
      "meaning": "neighbourhood",
      "romaji": "kinjo"
    },
    {
      "word": "絹",
      "meaning": "silk",
      "romaji": "kinu"
    },
    {
      "word": "季節",
      "meaning": "season",
      "romaji": "kisetsu"
    },
    {
      "word": "汽車",
      "meaning": "train",
      "romaji": "kisha"
    },
    {
      "word": "規則",
      "meaning": "rule",
      "romaji": "kisoku"
    },
    {
      "word": "子",
      "meaning": "child",
      "romaji": "ko"
    },
    {
      "word": "心",
      "meaning": "heart",
      "romaji": "kokoro"
    },
    {
      "word": "国際",
      "meaning": "international",
      "romaji": "kokusai"
    },
    {
      "word": "細かい",
      "meaning": "small, fine",
      "romaji": "komakai"
    },
    {
      "word": "米",
      "meaning": "(husked grains of) rice",
      "romaji": "kome"
    },
    {
      "word": "込む",
      "meaning": "to be crowded",
      "romaji": "komu"
    },
    {
      "word": "今度",
      "meaning": "this time; next time",
      "romaji": "kondo"
    },
    {
      "word": "この間",
      "meaning": "the other day; recently",
      "romaji": "kono aida"
    },
    {
      "word": "このごろ",
      "meaning": "these days; nowadays",
      "romaji": "kono goro"
    },
    {
      "word": "コンピュータ",
      "meaning": "computer",
      "romaji": "konpyuuta"
    },
    {
      "word": "コンサート",
      "meaning": "concert",
      "romaji": "konsaato"
    },
    {
      "word": "今夜",
      "meaning": "this evening; tonigh",
      "romaji": "konya"
    },
    {
      "word": "これから",
      "meaning": "after this",
      "romaji": "korekara"
    },
    {
      "word": "故障",
      "meaning": "to break-down",
      "romaji": "koshou"
    },
    {
      "word": "答え",
      "meaning": "response",
      "romaji": "kotae"
    },
    {
      "word": "小鳥",
      "meaning": "small bird",
      "romaji": "kotori"
    },
    {
      "word": "こう",
      "meaning": "this way",
      "romaji": "kou"
    },
    {
      "word": "校長",
      "meaning": "principal; headmaster",
      "romaji": "kouchou"
    },
    {
      "word": "講堂",
      "meaning": "auditorium",
      "romaji": "koudou"
    },
    {
      "word": "郊外",
      "meaning": "suburb; residential area on the outskirt of a city",
      "romaji": "kougai"
    },
    {
      "word": "講義",
      "meaning": "lecture",
      "romaji": "kougi"
    },
    {
      "word": "工業",
      "meaning": "industry",
      "romaji": "kougyou"
    },
    {
      "word": "工場",
      "meaning": "factory",
      "romaji": "koujou"
    },
    {
      "word": "高校",
      "meaning": "senior high school; high school​",
      "romaji": "koukou"
    },
    {
      "word": "高校生",
      "meaning": "high school student",
      "romaji": "koukousei"
    },
    {
      "word": "公務員",
      "meaning": "government worker",
      "romaji": "koumuin"
    },
    {
      "word": "高等学校",
      "meaning": "high school",
      "romaji": "koutougakkou"
    },
    {
      "word": "交通",
      "meaning": "traffic",
      "romaji": "koutsuu"
    },
    {
      "word": "怖い",
      "meaning": "frightening",
      "romaji": "kowai"
    },
    {
      "word": "壊れる",
      "meaning": "to be broken",
      "romaji": "kowareru"
    },
    {
      "word": "壊す",
      "meaning": "to break",
      "romaji": "kowasu"
    },
    {
      "word": "首",
      "meaning": "neck",
      "romaji": "kubi"
    },
    {
      "word": "下さる",
      "meaning": "(respectful) to give",
      "romaji": "kudasaru"
    },
    {
      "word": "雲",
      "meaning": "cloud",
      "romaji": "kumo"
    },
    {
      "word": "君",
      "meaning": "suffix for familiar young male",
      "romaji": "kun"
    },
    {
      "word": "比べる",
      "meaning": "to compare",
      "romaji": "kuraberu"
    },
    {
      "word": "暮れる",
      "meaning": "to get dark",
      "romaji": "kureru"
    },
    {
      "word": "草",
      "meaning": "grass",
      "romaji": "kusa"
    },
    {
      "word": "空気",
      "meaning": "air",
      "romaji": "kuuki"
    },
    {
      "word": "空港",
      "meaning": "airport",
      "romaji": "kuukou"
    },
    {
      "word": "客",
      "meaning": "guest; customer",
      "romaji": "kyaku"
    },
    {
      "word": "教育",
      "meaning": "education",
      "romaji": "kyouiku"
    },
    {
      "word": "教会",
      "meaning": "church; congregation; Christian church",
      "romaji": "kyoukai"
    },
    {
      "word": "興味",
      "meaning": "interest (in something); curiosity (about something); zest (for)",
      "romaji": "kyoumi"
    },
    {
      "word": "競争",
      "meaning": "competition",
      "romaji": "kyousou"
    },
    {
      "word": "急",
      "meaning": "sudden; abrupt; unexpected",
      "romaji": "kyuu"
    },
    {
      "word": "急行",
      "meaning": "hurrying (to somewhere); rushing; hastening",
      "romaji": "kyuukou"
    },
    {
      "word": "間違える",
      "meaning": "to make a mistake (in)",
      "romaji": "machigaeru"
    },
    {
      "word": "参る",
      "meaning": "(humble) to go; to come",
      "romaji": "mairu"
    },
    {
      "word": "負ける",
      "meaning": "to lose",
      "romaji": "makeru"
    },
    {
      "word": "漫画",
      "meaning": "comic",
      "romaji": "manga"
    },
    {
      "word": "間に合う",
      "meaning": "to be in time (for)",
      "romaji": "maniau"
    },
    {
      "word": "真ん中",
      "meaning": "middle; centre; center",
      "romaji": "mannaka"
    },
    {
      "word": "周り",
      "meaning": "around",
      "romaji": "mawari"
    },
    {
      "word": "回る",
      "meaning": "to go around",
      "romaji": "mawaru"
    },
    {
      "word": "まず",
      "meaning": "first of all",
      "romaji": "mazu"
    },
    {
      "word": "召し上がる",
      "meaning": "to eat; to drink​",
      "romaji": "meshiagaru"
    },
    {
      "word": "珍しい",
      "meaning": "unusual; rare",
      "romaji": "mezurashii"
    },
    {
      "word": "見える",
      "meaning": "to be seen; to be in sight; to look; to seem",
      "romaji": "mieru"
    },
    {
      "word": "港",
      "meaning": "harbour",
      "romaji": "minato"
    },
    {
      "word": "味噌",
      "meaning": "fermented condiment made from soybeans",
      "romaji": "miso"
    },
    {
      "word": "見つかる",
      "meaning": "to be found; to be discovered",
      "romaji": "mitsukaru"
    },
    {
      "word": "見つける",
      "meaning": "to discover; to find; to come across; to detect; to spot",
      "romaji": "mitsukeru"
    },
    {
      "word": "都",
      "meaning": "capital",
      "romaji": "miyako"
    },
    {
      "word": "湖",
      "meaning": "lake",
      "romaji": "mizuumi"
    },
    {
      "word": "戻る",
      "meaning": "to turn back",
      "romaji": "modoru"
    },
    {
      "word": "木綿",
      "meaning": "cotton (material)",
      "romaji": "momen"
    },
    {
      "word": "森",
      "meaning": "forest",
      "romaji": "mori"
    },
    {
      "word": "もし",
      "meaning": "if; in case; supposing",
      "romaji": "moshi"
    },
    {
      "word": "申し上げる",
      "meaning": "to say; to offer",
      "romaji": "moushiageru"
    },
    {
      "word": "申す",
      "meaning": "to be called; to say",
      "romaji": "mousu"
    },
    {
      "word": "もうすぐ",
      "meaning": "soon",
      "romaji": "mousugu"
    },
    {
      "word": "迎える",
      "meaning": "to go out to meet",
      "romaji": "mukaeru"
    },
    {
      "word": "昔",
      "meaning": "olden days, former",
      "romaji": "mukashi"
    },
    {
      "word": "向かう",
      "meaning": "to head towards",
      "romaji": "mukau"
    },
    {
      "word": "無理",
      "meaning": "impossible",
      "romaji": "muri"
    },
    {
      "word": "虫",
      "meaning": "insect",
      "romaji": "mushi"
    },
    {
      "word": "息子",
      "meaning": "son",
      "romaji": "musuko"
    },
    {
      "word": "娘",
      "meaning": "daughter",
      "romaji": "musume"
    },
    {
      "word": "投げる",
      "meaning": "to throw or cast away",
      "romaji": "nageru"
    },
    {
      "word": "泣く",
      "meaning": "to weep",
      "romaji": "naku"
    },
    {
      "word": "無くなる",
      "meaning": "to disappear; to get lost",
      "romaji": "naku naru"
    },
    {
      "word": "亡くなる",
      "meaning": "to die",
      "romaji": "nakunaru"
    },
    {
      "word": "生",
      "meaning": "raw",
      "romaji": "nama"
    },
    {
      "word": "直る",
      "meaning": "to be fixed,to be repaired",
      "romaji": "naoru"
    },
    {
      "word": "治る",
      "meaning": "to be cured; to heal",
      "romaji": "naoru"
    },
    {
      "word": "慣れる",
      "meaning": "to get used to",
      "romaji": "nareru"
    },
    {
      "word": "鳴る",
      "meaning": "to sound",
      "romaji": "naru"
    },
    {
      "word": "なるほど",
      "meaning": "now I understand",
      "romaji": "naruhodo"
    },
    {
      "word": "寝坊",
      "meaning": "sleeping in late; oversleeping",
      "romaji": "nebou"
    },
    {
      "word": "値段",
      "meaning": "price; cost",
      "romaji": "nedan"
    },
    {
      "word": "眠い",
      "meaning": "sleepy",
      "romaji": "nemui"
    },
    {
      "word": "眠る",
      "meaning": "to sleep",
      "romaji": "nemuru"
    },
    {
      "word": "熱",
      "meaning": "fever",
      "romaji": "netsu"
    },
    {
      "word": "苦い",
      "meaning": "bitter",
      "romaji": "nigai"
    },
    {
      "word": "逃げる",
      "meaning": "to escape",
      "romaji": "nigeru"
    },
    {
      "word": "二階建て",
      "meaning": "two-storied building",
      "romaji": "nikaidate"
    },
    {
      "word": "人形",
      "meaning": "doll",
      "romaji": "ningyou"
    },
    {
      "word": "匂い",
      "meaning": "a smell",
      "romaji": "nioi"
    },
    {
      "word": "似る",
      "meaning": "to be similar",
      "romaji": "niru"
    },
    {
      "word": "喉",
      "meaning": "throat",
      "romaji": "nodo"
    },
    {
      "word": "残る",
      "meaning": "to remain",
      "romaji": "nokoru"
    },
    {
      "word": "乗り換える",
      "meaning": "to change between buses or trains",
      "romaji": "norikaeru"
    },
    {
      "word": "乗り物",
      "meaning": "vehicle",
      "romaji": "norimono"
    },
    {
      "word": "濡れる",
      "meaning": "to get wet",
      "romaji": "nureru"
    },
    {
      "word": "塗る",
      "meaning": "to paint; to plaster",
      "romaji": "nuru"
    },
    {
      "word": "盗む",
      "meaning": "to steal",
      "romaji": "nusumu"
    },
    {
      "word": "入学",
      "meaning": "entry to school or university; enrollment",
      "romaji": "nyuugaku"
    },
    {
      "word": "入院",
      "meaning": "hospitalization",
      "romaji": "nyuuin"
    },
    {
      "word": "落ちる",
      "meaning": "to fall or drop",
      "romaji": "ochiru"
    },
    {
      "word": "踊り",
      "meaning": "a dance",
      "romaji": "odori"
    },
    {
      "word": "驚く",
      "meaning": "to be surprised",
      "romaji": "odoroku"
    },
    {
      "word": "踊る",
      "meaning": "to dance",
      "romaji": "odoru"
    },
    {
      "word": "お出でになる",
      "meaning": "(respectful) to be",
      "romaji": "oide ni naru"
    },
    {
      "word": "お祝い",
      "meaning": "congratulation",
      "romaji": "oiwai"
    },
    {
      "word": "お嬢さん",
      "meaning": "(another's) daughter",
      "romaji": "ojousan"
    },
    {
      "word": "可笑しい",
      "meaning": "strange or funny",
      "romaji": "okashii"
    },
    {
      "word": "行う",
      "meaning": "to perform; to do; to carry out",
      "romaji": "okonau"
    },
    {
      "word": "怒る",
      "meaning": "to be angry",
      "romaji": "okoru"
    },
    {
      "word": "起こす",
      "meaning": "to wake",
      "romaji": "okosu"
    },
    {
      "word": "億",
      "meaning": "one hundred million",
      "romaji": "oku"
    },
    {
      "word": "屋上",
      "meaning": "rooftop​",
      "romaji": "okujou"
    },
    {
      "word": "遅れる",
      "meaning": "to be late",
      "romaji": "okureru"
    },
    {
      "word": "贈り物",
      "meaning": "present; gift",
      "romaji": "okurimono"
    },
    {
      "word": "送る",
      "meaning": "to send",
      "romaji": "okuru"
    },
    {
      "word": "お祭り",
      "meaning": "festival",
      "romaji": "omatsuri"
    },
    {
      "word": "お見舞い",
      "meaning": "visiting ill or distressed people",
      "romaji": "omimai"
    },
    {
      "word": "お土産",
      "meaning": "souvenir",
      "romaji": "omiyage"
    },
    {
      "word": "おもちゃ",
      "meaning": "toy",
      "romaji": "omocha"
    },
    {
      "word": "思い出す",
      "meaning": "to remember",
      "romaji": "omoidasu"
    },
    {
      "word": "表",
      "meaning": "the front",
      "romaji": "omote"
    },
    {
      "word": "オートバイ",
      "meaning": "motorcycle",
      "romaji": "ootobai"
    },
    {
      "word": "お礼",
      "meaning": "thanks",
      "romaji": "orei"
    },
    {
      "word": "折れる",
      "meaning": "to break; to be broken",
      "romaji": "oreru"
    },
    {
      "word": "下りる",
      "meaning": "to get off",
      "romaji": "oriru"
    },
    {
      "word": "折る",
      "meaning": "to break or to fold",
      "romaji": "oru"
    },
    {
      "word": "押し入れ",
      "meaning": "closet",
      "romaji": "oshiire"
    },
    {
      "word": "仰る",
      "meaning": "(respectful) to say",
      "romaji": "ossharu"
    },
    {
      "word": "お宅",
      "meaning": "your home",
      "romaji": "otaku"
    },
    {
      "word": "音",
      "meaning": "sound; note",
      "romaji": "oto"
    },
    {
      "word": "落とす",
      "meaning": "to drop",
      "romaji": "otosu"
    },
    {
      "word": "お釣り",
      "meaning": "change (for a purchase)​",
      "romaji": "otsuri"
    },
    {
      "word": "夫",
      "meaning": "husband",
      "romaji": "otto"
    },
    {
      "word": "終わり",
      "meaning": "the end",
      "romaji": "owari"
    },
    {
      "word": "親",
      "meaning": "parents",
      "romaji": "oya"
    },
    {
      "word": "泳ぎ方",
      "meaning": "way of swimming",
      "romaji": "oyogikata"
    },
    {
      "word": "パート",
      "meaning": "part; part time",
      "romaji": "paato"
    },
    {
      "word": "パソコン",
      "meaning": "personal computer",
      "romaji": "pasokon"
    },
    {
      "word": "ピアノ",
      "meaning": "piano",
      "romaji": "piano"
    },
    {
      "word": "プレゼント",
      "meaning": "present; gift",
      "romaji": "purezento"
    },
    {
      "word": "冷房",
      "meaning": "air conditioning",
      "romaji": "reibou"
    },
    {
      "word": "レジ",
      "meaning": "cashier​",
      "romaji": "reji"
    },
    {
      "word": "歴史",
      "meaning": "history",
      "romaji": "rekishi"
    },
    {
      "word": "連絡",
      "meaning": "to contact; to get in touch​",
      "romaji": "renraku"
    },
    {
      "word": "レポート",
      "meaning": "report",
      "romaji": "repooto"
    },
    {
      "word": "利用",
      "meaning": "use; utilization; application",
      "romaji": "riyou"
    },
    {
      "word": "理由",
      "meaning": "reason",
      "romaji": "riyuu"
    },
    {
      "word": "留守",
      "meaning": "absence",
      "romaji": "rusu"
    },
    {
      "word": "旅館",
      "meaning": "traditional inn; Japanese-style lodging",
      "romaji": "ryokan"
    },
    {
      "word": "両方",
      "meaning": "both sides",
      "romaji": "ryouhou"
    },
    {
      "word": "寂しい",
      "meaning": "lonely",
      "romaji": "sabishii"
    },
    {
      "word": "下がる",
      "meaning": "to get down",
      "romaji": "sagaru"
    },
    {
      "word": "探す",
      "meaning": "to look for",
      "romaji": "sagasu"
    },
    {
      "word": "下げる",
      "meaning": "to lower",
      "romaji": "sageru"
    },
    {
      "word": "最後",
      "meaning": "end; last",
      "romaji": "saigo"
    },
    {
      "word": "最近",
      "meaning": "recently",
      "romaji": "saikin"
    },
    {
      "word": "最初",
      "meaning": "beginning; first",
      "romaji": "saisho"
    },
    {
      "word": "坂",
      "meaning": "slope; hill",
      "romaji": "saka"
    },
    {
      "word": "盛ん",
      "meaning": "popularity; prosperous",
      "romaji": "sakan"
    },
    {
      "word": "昨夜",
      "meaning": "last night",
      "romaji": "sakuya"
    },
    {
      "word": "サンダル",
      "meaning": "sandal",
      "romaji": "sandaru"
    },
    {
      "word": "サンドイッチ",
      "meaning": "sandwich",
      "romaji": "sandoicchi"
    },
    {
      "word": "産業",
      "meaning": "industry",
      "romaji": "sangyou"
    },
    {
      "word": "サラダ",
      "meaning": "salad",
      "romaji": "sarada"
    },
    {
      "word": "再来月",
      "meaning": "month after next",
      "romaji": "saraigetsu"
    },
    {
      "word": "再来週",
      "meaning": "week after next",
      "romaji": "saraishuu"
    },
    {
      "word": "差し上げる",
      "meaning": "to give",
      "romaji": "sashiageru"
    },
    {
      "word": "騒ぐ",
      "meaning": "to make noise,to be excited",
      "romaji": "sawagu"
    },
    {
      "word": "触る",
      "meaning": "to touch",
      "romaji": "sawaru"
    },
    {
      "word": "生物",
      "meaning": "living thing",
      "romaji": "seibutsu"
    },
    {
      "word": "政治",
      "meaning": "politics",
      "romaji": "seiji"
    },
    {
      "word": "生活",
      "meaning": "to live",
      "romaji": "seikatsu"
    },
    {
      "word": "生命",
      "meaning": "life",
      "romaji": "seimei"
    },
    {
      "word": "生産",
      "meaning": "production",
      "romaji": "seisan"
    },
    {
      "word": "西洋",
      "meaning": "the west; Western countries",
      "romaji": "seiyou"
    },
    {
      "word": "世界",
      "meaning": "the world",
      "romaji": "sekai"
    },
    {
      "word": "席",
      "meaning": "seat",
      "romaji": "seki"
    },
    {
      "word": "線",
      "meaning": "line",
      "romaji": "sen"
    },
    {
      "word": "背中",
      "meaning": "back (of body)",
      "romaji": "senaka"
    },
    {
      "word": "先輩",
      "meaning": "senior",
      "romaji": "senpai"
    },
    {
      "word": "戦争",
      "meaning": "war",
      "romaji": "sensou"
    },
    {
      "word": "説明",
      "meaning": "explanation",
      "romaji": "setsumei"
    },
    {
      "word": "社長",
      "meaning": "company president; manager; director",
      "romaji": "shachou"
    },
    {
      "word": "社会",
      "meaning": "society; public; community; the world",
      "romaji": "shakai"
    },
    {
      "word": "市",
      "meaning": "city",
      "romaji": "shi"
    },
    {
      "word": "試合",
      "meaning": "match,game",
      "romaji": "shiai"
    },
    {
      "word": "叱る",
      "meaning": "to scold",
      "romaji": "shikaru"
    },
    {
      "word": "仕方",
      "meaning": "way; method",
      "romaji": "shikata"
    },
    {
      "word": "試験",
      "meaning": "examination",
      "romaji": "shiken"
    },
    {
      "word": "しっかり",
      "meaning": "firmly; steadily",
      "romaji": "shikkari"
    },
    {
      "word": "島",
      "meaning": "island",
      "romaji": "shima"
    },
    {
      "word": "市民",
      "meaning": "citizen",
      "romaji": "shimin"
    },
    {
      "word": "品物",
      "meaning": "goods; article; thing",
      "romaji": "shinamono"
    },
    {
      "word": "新聞社",
      "meaning": "newspaper company",
      "romaji": "shinbunsha"
    },
    {
      "word": "親切",
      "meaning": "kindness",
      "romaji": "shinsetsu"
    },
    {
      "word": "失敗",
      "meaning": "failure",
      "romaji": "shippai"
    },
    {
      "word": "調べる",
      "meaning": "to investigate",
      "romaji": "shiraberu"
    },
    {
      "word": "知らせる",
      "meaning": "to notify",
      "romaji": "shiraseru"
    },
    {
      "word": "下着",
      "meaning": "underwear",
      "romaji": "shitagi"
    },
    {
      "word": "食料品",
      "meaning": "food; groceries",
      "romaji": "shokuryouhin"
    },
    {
      "word": "小学校",
      "meaning": "elementary school",
      "romaji": "shougakkou"
    },
    {
      "word": "生じる",
      "meaning": "to produce",
      "romaji": "shoujiru"
    },
    {
      "word": "紹介",
      "meaning": "introduction",
      "romaji": "shoukai"
    },
    {
      "word": "将来",
      "meaning": "future",
      "romaji": "shourai"
    },
    {
      "word": "小説",
      "meaning": "novel",
      "romaji": "shousetsu"
    },
    {
      "word": "趣味",
      "meaning": "hobby; pastime; preference",
      "romaji": "shumi"
    },
    {
      "word": "習慣",
      "meaning": "habit; custom; cultural practice.",
      "romaji": "shuukan"
    },
    {
      "word": "祖母",
      "meaning": "grandmother",
      "romaji": "sobo"
    },
    {
      "word": "育てる",
      "meaning": "to rear,to bring up",
      "romaji": "sodateru"
    },
    {
      "word": "祖父",
      "meaning": "grandfather",
      "romaji": "sofu"
    },
    {
      "word": "ソフト",
      "meaning": "soft",
      "romaji": "sofuto"
    },
    {
      "word": "そんな",
      "meaning": "that sort of",
      "romaji": "sonna"
    },
    {
      "word": "それで",
      "meaning": "because of that",
      "romaji": "sore de"
    },
    {
      "word": "それほど",
      "meaning": "to that extent",
      "romaji": "sore hodo"
    },
    {
      "word": "そろそろ",
      "meaning": "gradually; soon",
      "romaji": "sorosoro"
    },
    {
      "word": "卒業",
      "meaning": "graduation",
      "romaji": "sotsugyou"
    },
    {
      "word": "相談",
      "meaning": "to discuss",
      "romaji": "soudan"
    },
    {
      "word": "素晴らしい",
      "meaning": "wonderful",
      "romaji": "subarashii"
    },
    {
      "word": "滑る",
      "meaning": "to slide; to slip",
      "romaji": "suberu"
    },
    {
      "word": "凄い",
      "meaning": "terrific",
      "romaji": "sugoi"
    },
    {
      "word": "水道",
      "meaning": "water supply",
      "romaji": "suidou"
    },
    {
      "word": "水泳",
      "meaning": "swimming",
      "romaji": "suiei"
    },
    {
      "word": "すっかり",
      "meaning": "completely",
      "romaji": "sukkari"
    },
    {
      "word": "空く",
      "meaning": "to be hungry",
      "romaji": "suku"
    },
    {
      "word": "スクリーン",
      "meaning": "screen",
      "romaji": "sukuriin"
    },
    {
      "word": "隅",
      "meaning": "corner; nook",
      "romaji": "sumi"
    },
    {
      "word": "済む",
      "meaning": "to finish",
      "romaji": "sumu"
    },
    {
      "word": "砂",
      "meaning": "sand",
      "romaji": "suna"
    },
    {
      "word": "すり",
      "meaning": "pickpocket",
      "romaji": "suri"
    },
    {
      "word": "スーツケース",
      "meaning": "suitcase",
      "romaji": "sustsukeesu"
    },
    {
      "word": "進む",
      "meaning": "to make progress",
      "romaji": "susumu"
    },
    {
      "word": "ステーキ",
      "meaning": "steak",
      "romaji": "suteeki"
    },
    {
      "word": "ステレオ",
      "meaning": "stereo",
      "romaji": "sutereo"
    },
    {
      "word": "捨てる",
      "meaning": "to throw away",
      "romaji": "suteru"
    },
    {
      "word": "数学",
      "meaning": "mathematics; arithmetic",
      "romaji": "suugaku"
    },
    {
      "word": "スーツ",
      "meaning": "suit",
      "romaji": "suutsu"
    },
    {
      "word": "正しい",
      "meaning": "right; correct",
      "romaji": "tadashii"
    },
    {
      "word": "退院",
      "meaning": "leaving hospital; discharge from hospital",
      "romaji": "tai'in"
    },
    {
      "word": "台風",
      "meaning": "typhoon",
      "romaji": "taifuu"
    },
    {
      "word": "タイプ",
      "meaning": "type,style",
      "romaji": "taipu"
    },
    {
      "word": "たいてい",
      "meaning": "usually",
      "romaji": "taitei"
    },
    {
      "word": "たまに",
      "meaning": "occasionally",
      "romaji": "tamani"
    },
    {
      "word": "棚",
      "meaning": "shelves",
      "romaji": "tana"
    },
    {
      "word": "誕生",
      "meaning": "birth",
      "romaji": "tanjou"
    },
    {
      "word": "楽しみ",
      "meaning": "looking forward to​",
      "romaji": "tanoshimi"
    },
    {
      "word": "倒れる",
      "meaning": "to fall (over, down)",
      "romaji": "taoreru"
    },
    {
      "word": "足りる",
      "meaning": "to be sufficient; to be enough",
      "romaji": "tariru"
    },
    {
      "word": "足す",
      "meaning": "to add (numbers / something)",
      "romaji": "tasu"
    },
    {
      "word": "畳",
      "meaning": "Japanese straw mat",
      "romaji": "tatami"
    },
    {
      "word": "建てる",
      "meaning": "to build",
      "romaji": "tateru"
    },
    {
      "word": "尋ねる",
      "meaning": "to ask",
      "romaji": "tazuneru"
    },
    {
      "word": "訪ねる",
      "meaning": "to visit",
      "romaji": "tazuneru"
    },
    {
      "word": "手袋",
      "meaning": "glove",
      "romaji": "tebukuro"
    },
    {
      "word": "丁寧",
      "meaning": "polite",
      "romaji": "teinei"
    },
    {
      "word": "テキスト",
      "meaning": "text; textbook",
      "romaji": "tekisuto"
    },
    {
      "word": "適当",
      "meaning": "suitable",
      "romaji": "tekitou"
    },
    {
      "word": "点",
      "meaning": "point; dot",
      "romaji": "ten"
    },
    {
      "word": "店員",
      "meaning": "employee (of a store); shop assistant; clerk",
      "romaji": "ten'in"
    },
    {
      "word": "テニス",
      "meaning": "tennis",
      "romaji": "tenisu"
    },
    {
      "word": "天気予報",
      "meaning": "weather forecast",
      "romaji": "tenkiyohou"
    },
    {
      "word": "展覧会",
      "meaning": "exhibition",
      "romaji": "tenrankai"
    },
    {
      "word": "寺",
      "meaning": "temple",
      "romaji": "tera"
    },
    {
      "word": "手伝う",
      "meaning": "to help; to assist; to aid​",
      "romaji": "tetsudau"
    },
    {
      "word": "途中",
      "meaning": "on the way",
      "romaji": "tochuu"
    },
    {
      "word": "届ける",
      "meaning": "to send​",
      "romaji": "todokeru"
    },
    {
      "word": "特急",
      "meaning": "limited express (train, faster than an express)",
      "romaji": "tokkyuu"
    },
    {
      "word": "床屋",
      "meaning": "barber",
      "romaji": "tokoya"
    },
    {
      "word": "特別",
      "meaning": "special; particular; extraordinary; exceptional",
      "romaji": "tokubetsu"
    },
    {
      "word": "特に",
      "meaning": "particularly; especially; in particular; expressly",
      "romaji": "tokuni"
    },
    {
      "word": "泊まる",
      "meaning": "to stay at",
      "romaji": "tomaru"
    },
    {
      "word": "止める",
      "meaning": "to stop something",
      "romaji": "tomeru"
    },
    {
      "word": "遠く",
      "meaning": "distant",
      "romaji": "tooku"
    },
    {
      "word": "通る",
      "meaning": "to go through",
      "romaji": "tooru"
    },
    {
      "word": "取り替える",
      "meaning": "to exchange; to swap; to replace",
      "romaji": "torikaeru"
    },
    {
      "word": "到頭",
      "meaning": "finally, after all",
      "romaji": "toutou"
    },
    {
      "word": "続ける",
      "meaning": "to continue; to keep up; to keep on",
      "romaji": "tsudzukeru"
    },
    {
      "word": "続く",
      "meaning": "to continue",
      "romaji": "tsudzuku"
    },
    {
      "word": "都合",
      "meaning": "convenience",
      "romaji": "tsugou"
    },
    {
      "word": "捕まえる",
      "meaning": "to catch",
      "romaji": "tsukamaeru"
    },
    {
      "word": "漬ける",
      "meaning": "to soak; to pickle",
      "romaji": "tsukeru"
    },
    {
      "word": "月",
      "meaning": "moon",
      "romaji": "tsuki"
    },
    {
      "word": "付く",
      "meaning": "to be attached",
      "romaji": "tsuku"
    },
    {
      "word": "妻",
      "meaning": "(humble) wife",
      "romaji": "tsuma"
    },
    {
      "word": "連れる",
      "meaning": "to take (someone) with one",
      "romaji": "tsureru"
    },
    {
      "word": "釣る",
      "meaning": "to fish",
      "romaji": "tsuru"
    },
    {
      "word": "伝える",
      "meaning": "to report; to tell",
      "romaji": "tsutaeru"
    },
    {
      "word": "包む",
      "meaning": "to wrap",
      "romaji": "tsutsumu"
    },
    {
      "word": "腕",
      "meaning": "arm",
      "romaji": "ude"
    },
    {
      "word": "植える",
      "meaning": "to plant; to grow",
      "romaji": "ueru"
    },
    {
      "word": "動く",
      "meaning": "to move",
      "romaji": "ugoku"
    },
    {
      "word": "伺う",
      "meaning": "to visit",
      "romaji": "ukagau"
    },
    {
      "word": "受ける",
      "meaning": "to take a lesson or test",
      "romaji": "ukeru"
    },
    {
      "word": "受付",
      "meaning": "reception (desk); information desk​",
      "romaji": "uketsuke"
    },
    {
      "word": "生まれ",
      "meaning": "birth",
      "romaji": "umare"
    },
    {
      "word": "運転手",
      "meaning": "driver; chauffeur",
      "romaji": "untenshu"
    },
    {
      "word": "裏",
      "meaning": "reverse side",
      "romaji": "ura"
    },
    {
      "word": "嬉しい",
      "meaning": "happy",
      "romaji": "ureshii"
    },
    {
      "word": "売り場",
      "meaning": "selling area",
      "romaji": "uriba"
    },
    {
      "word": "嘘",
      "meaning": "a lie",
      "romaji": "uso"
    },
    {
      "word": "打つ",
      "meaning": "to hit",
      "romaji": "utsu"
    },
    {
      "word": "美しい",
      "meaning": "beautiful",
      "romaji": "utsukushii"
    },
    {
      "word": "移る",
      "meaning": "to move house or transfer",
      "romaji": "utsuru"
    },
    {
      "word": "写す",
      "meaning": "to copy or photograph",
      "romaji": "utsusu"
    },
    {
      "word": "ワープロ",
      "meaning": "word processor",
      "romaji": "waapuro"
    },
    {
      "word": "別れる",
      "meaning": "to separate",
      "romaji": "wakareru"
    },
    {
      "word": "沸かす",
      "meaning": "to boil; to heat",
      "romaji": "wakasu"
    },
    {
      "word": "沸く",
      "meaning": "to boil",
      "romaji": "waku"
    },
    {
      "word": "笑う",
      "meaning": "to laugh; to smile",
      "romaji": "warau"
    },
    {
      "word": "割れる",
      "meaning": "to break",
      "romaji": "wareru"
    },
    {
      "word": "割合",
      "meaning": "rate; ratio",
      "romaji": "wariai"
    },
    {
      "word": "忘れ物",
      "meaning": "lost article",
      "romaji": "wasuremono"
    },
    {
      "word": "焼ける",
      "meaning": "to burn; to be roasted",
      "romaji": "yakeru"
    },
    {
      "word": "焼く",
      "meaning": "to bake; to grill",
      "romaji": "yaku"
    },
    {
      "word": "役に立つ",
      "meaning": "to be helpful",
      "romaji": "yakunitatsu"
    },
    {
      "word": "約束",
      "meaning": "promise",
      "romaji": "yakusoku"
    },
    {
      "word": "止む",
      "meaning": "to stop",
      "romaji": "yamu"
    },
    {
      "word": "やっぱり",
      "meaning": "as I thought",
      "romaji": "yappari"
    },
    {
      "word": "優しい",
      "meaning": "kind",
      "romaji": "yasashii"
    },
    {
      "word": "痩せる",
      "meaning": "to become thin",
      "romaji": "yaseru"
    },
    {
      "word": "柔らかい",
      "meaning": "soft",
      "romaji": "yawarakai"
    },
    {
      "word": "汚れる",
      "meaning": "to get dirty",
      "romaji": "yogoreru"
    },
    {
      "word": "喜ぶ",
      "meaning": "to be delighted",
      "romaji": "yorokobu"
    },
    {
      "word": "寄る",
      "meaning": "to visit; to drop by",
      "romaji": "yoru"
    },
    {
      "word": "予習",
      "meaning": "preparation for a lesson",
      "romaji": "yoshuu"
    },
    {
      "word": "予定",
      "meaning": "plan",
      "romaji": "yotei"
    },
    {
      "word": "用",
      "meaning": "business; task; errand; use; purpose",
      "romaji": "you"
    },
    {
      "word": "用意",
      "meaning": "preparation; arrangements; provision; getting ready",
      "romaji": "youi"
    },
    {
      "word": "用事",
      "meaning": "tasks; things to do; errand; business (to take care of)",
      "romaji": "youji"
    },
    {
      "word": "予約",
      "meaning": "reservation",
      "romaji": "yoyaku"
    },
    {
      "word": "湯",
      "meaning": "hot water",
      "romaji": "yu"
    },
    {
      "word": "指",
      "meaning": "finger",
      "romaji": "yubi"
    },
    {
      "word": "指輪",
      "meaning": "finger ring",
      "romaji": "yubiwa"
    },
    {
      "word": "夢",
      "meaning": "dream",
      "romaji": "yume"
    },
    {
      "word": "揺れる",
      "meaning": "to shake",
      "romaji": "yureru"
    },
    {
      "word": "残念",
      "meaning": "regrettable; unfortunate",
      "romaji": "zannen"
    },
    {
      "word": "全然",
      "meaning": "not entirely (used in a negative sentence)",
      "romaji": "zenzen"
    }
  ],
  N3: [
    { word: "政治", meaning: "politics", romaji: "seiji" },
    { word: "経済", meaning: "economy", romaji: "keizai" },
    { word: "国際", meaning: "international", romaji: "kokusai" },
    { word: "環境", meaning: "environment", romaji: "kankyō" },
    { word: "文化", meaning: "culture", romaji: "bunka" },
    { word: "社会", meaning: "society", romaji: "shakai" },
    { word: "技術", meaning: "technology", romaji: "gijutsu" },
    { word: "研究", meaning: "research", romaji: "kenkyū" },
    { word: "教育", meaning: "education", romaji: "kyōiku" },
    { word: "科学", meaning: "science", romaji: "kagaku" },
    {
      "word": "明かり",
      "meaning": "light; illumination; glow; gleam",
      "romaji": "akari"
    },
    {
      "word": "明ける",
      "meaning": "to dawn,to become daylight",
      "romaji": "akeru"
    },
    {
      "word": "明らか",
      "meaning": "clear; obvious",
      "romaji": "akiraka"
    },
    {
      "word": "悪魔",
      "meaning": "devil; demon; fiend; Satan",
      "romaji": "akuma"
    },
    {
      "word": "暗記",
      "meaning": "memorization; learning by heart",
      "romaji": "anki"
    },
    {
      "word": "新た",
      "meaning": "new; fresh; novel",
      "romaji": "arata"
    },
    {
      "word": "有らゆる",
      "meaning": "all; every​",
      "romaji": "arayuru"
    },
    {
      "word": "集まり",
      "meaning": "gathering; meeting; assembly; collection; attendance",
      "romaji": "atsumari"
    },
    {
      "word": "部分",
      "meaning": "portion; section; part",
      "romaji": "bubun"
    },
    {
      "word": "分",
      "meaning": "part; segment; share; ration",
      "romaji": "bun"
    },
    {
      "word": "文明",
      "meaning": "civilization; culture",
      "romaji": "bunmei"
    },
    {
      "word": "分析",
      "meaning": "analysis",
      "romaji": "bunseki"
    },
    {
      "word": "分野",
      "meaning": "field; sphere; realm; division; branch",
      "romaji": "bunya"
    },
    {
      "word": "父親",
      "meaning": "father",
      "romaji": "chichioya"
    },
    {
      "word": "地平線",
      "meaning": "horizon (related to land)​",
      "romaji": "chiheisen"
    },
    {
      "word": "地位",
      "meaning": "(social) position; status",
      "romaji": "chii"
    },
    {
      "word": "長期",
      "meaning": "long-term",
      "romaji": "chouki"
    },
    {
      "word": "中",
      "meaning": "during; while; medium; middle",
      "romaji": "chuu"
    },
    {
      "word": "中学",
      "meaning": "junior high school; middle school",
      "romaji": "chuugaku"
    },
    {
      "word": "昼食",
      "meaning": "lunch; midday meal",
      "romaji": "chuushoku"
    },
    {
      "word": "大部分",
      "meaning": "most part; greater part; majority",
      "romaji": "daibubun"
    },
    {
      "word": "駄目",
      "meaning": "no good; cannot",
      "romaji": "dame"
    },
    {
      "word": "男子",
      "meaning": "youth; young man",
      "romaji": "danshi"
    },
    {
      "word": "出会い",
      "meaning": "meeting; rendezvous; encounter",
      "romaji": "deai"
    },
    {
      "word": "出会う",
      "meaning": "to meet (by chance); to come across; to run across; to encounter",
      "romaji": "deau"
    },
    {
      "word": "読書",
      "meaning": "reading",
      "romaji": "dokusho"
    },
    {
      "word": "努力",
      "meaning": "effort; exertion; endeavor; hard work; striving",
      "romaji": "doryoku"
    },
    {
      "word": "同一",
      "meaning": "identical; same; one and the same; equal",
      "romaji": "douitsu"
    },
    {
      "word": "円",
      "meaning": "yen; Japanese monetary unit; circle",
      "romaji": "en"
    },
    {
      "word": "不利",
      "meaning": "disadvantage; handicap; unfavorable position",
      "romaji": "furi"
    },
    {
      "word": "不足",
      "meaning": "insufficiency; shortage; deficiency; lack; dearth",
      "romaji": "fusoku"
    },
    {
      "word": "再び",
      "meaning": "again; once more; a second time",
      "romaji": "futatabi"
    },
    {
      "word": "外交",
      "meaning": "diplomacy",
      "romaji": "gaikou"
    },
    {
      "word": "外出",
      "meaning": "going out; outing; leaving (one's home, office, etc.)",
      "romaji": "gaishutsu"
    },
    {
      "word": "学期",
      "meaning": "school term; semester",
      "romaji": "gakki"
    },
    {
      "word": "学",
      "meaning": "learning; education; study of",
      "romaji": "gaku"
    },
    {
      "word": "学問",
      "meaning": "scholarship; study; learning",
      "romaji": "gakumon"
    },
    {
      "word": "学者",
      "meaning": "scholar",
      "romaji": "gakusha"
    },
    {
      "word": "学習",
      "meaning": "study; learning; tutorial",
      "romaji": "gakushuu"
    },
    {
      "word": "議長",
      "meaning": "chairman; president; moderator",
      "romaji": "gichou"
    },
    {
      "word": "議会",
      "meaning": "congress; parliament; diet; legislative assembly",
      "romaji": "gikai"
    },
    {
      "word": "語学",
      "meaning": "study of foreign languages; linguistics",
      "romaji": "gogaku"
    },
    {
      "word": "激しい",
      "meaning": "violent; extreme; intense",
      "romaji": "hageshii"
    },
    {
      "word": "母親",
      "meaning": "mother",
      "romaji": "hahaoya"
    },
    {
      "word": "博物館",
      "meaning": "museum",
      "romaji": "hakubutsukan"
    },
    {
      "word": "販売",
      "meaning": "sales; selling; marketing",
      "romaji": "hanbai"
    },
    {
      "word": "発明",
      "meaning": "invention",
      "romaji": "hatsumei"
    },
    {
      "word": "外す",
      "meaning": "to remove; to undo; to drop; to miss",
      "romaji": "hazusu"
    },
    {
      "word": "品",
      "meaning": "elegance, article",
      "romaji": "hin"
    },
    {
      "word": "一言",
      "meaning": "single word; a few words; brief comment",
      "romaji": "hitokoto"
    },
    {
      "word": "一人一人",
      "meaning": "one by one; each; one at a time",
      "romaji": "hitorihitori"
    },
    {
      "word": "本物",
      "meaning": "genuine article; real thing; real deal​",
      "romaji": "honmono"
    },
    {
      "word": "本人",
      "meaning": "the person in question; the person themselves; said person",
      "romaji": "honnin"
    },
    {
      "word": "一致",
      "meaning": "agreement; union; match​; coincidence",
      "romaji": "icchi"
    },
    {
      "word": "一時",
      "meaning": "one o'clock",
      "romaji": "ichiji"
    },
    {
      "word": "意外",
      "meaning": "unexpected; surprising",
      "romaji": "igai"
    },
    {
      "word": "一家",
      "meaning": "a family; a household; a home; one's family; whole family",
      "romaji": "ikka"
    },
    {
      "word": "今に",
      "meaning": "before long; even now",
      "romaji": "imani"
    },
    {
      "word": "今にも",
      "meaning": "at any moment; at any minute; on the verge of",
      "romaji": "imanimo"
    },
    {
      "word": "一般",
      "meaning": "general; universal; ordinary; average; common",
      "romaji": "ippan"
    },
    {
      "word": "一方",
      "meaning": "one (esp. of two); one way; the other direction; although",
      "romaji": "ippou"
    },
    {
      "word": "一生",
      "meaning": "whole life; a lifetime; a generation",
      "romaji": "isshou"
    },
    {
      "word": "一種",
      "meaning": "species; kind; variety",
      "romaji": "isshu"
    },
    {
      "word": "一瞬",
      "meaning": "instant; moment; for an instant",
      "romaji": "isshun"
    },
    {
      "word": "一層",
      "meaning": "much more; still more; all the more; single layer; sooner; preferably​",
      "romaji": "issou"
    },
    {
      "word": "一体",
      "meaning": "(what) the heck; (why) in the world",
      "romaji": "ittai"
    },
    {
      "word": "所謂",
      "meaning": "what is called; as it is called; the so-called; so to speak​",
      "romaji": "iwayuru"
    },
    {
      "word": "邪魔",
      "meaning": "hindrance",
      "romaji": "jama"
    },
    {
      "word": "化学",
      "meaning": "chemistry",
      "romaji": "kagaku"
    },
    {
      "word": "会",
      "meaning": "meeting; assembly; party; association; club",
      "romaji": "kai"
    },
    {
      "word": "会員",
      "meaning": "member",
      "romaji": "kai'in"
    },
    {
      "word": "海外",
      "meaning": "foreign; abroad; overseas",
      "romaji": "kaigai"
    },
    {
      "word": "会合",
      "meaning": "meeting; assembly; gathering; association",
      "romaji": "kaigou"
    },
    {
      "word": "会計",
      "meaning": "finance; account; treasurer; bill",
      "romaji": "kaikei"
    },
    {
      "word": "開始",
      "meaning": "start; commencement; beginning; initiation​",
      "romaji": "kaishi"
    },
    {
      "word": "科目",
      "meaning": "(school) subject; curriculum; course",
      "romaji": "kamoku"
    },
    {
      "word": "権利",
      "meaning": "right; privilege",
      "romaji": "kenri"
    },
    {
      "word": "基本",
      "meaning": "basics; fundamentals; basis; foundation",
      "romaji": "kihon"
    },
    {
      "word": "記事",
      "meaning": "article; news story; report; account",
      "romaji": "kiji"
    },
    {
      "word": "気味",
      "meaning": "sensation; feeling​; tendency",
      "romaji": "kimi"
    },
    {
      "word": "記念",
      "meaning": "commemoration; celebration; honoring the memory of something",
      "romaji": "kinen"
    },
    {
      "word": "気に入る",
      "meaning": "to like; to take a liking to",
      "romaji": "kiniiru"
    },
    {
      "word": "記入",
      "meaning": "entry; filling in; filling out",
      "romaji": "kinyuu"
    },
    {
      "word": "記憶",
      "meaning": "memory; recollection; remembrance",
      "romaji": "kioku"
    },
    {
      "word": "記者",
      "meaning": "reporter; journalist",
      "romaji": "kisha"
    },
    {
      "word": "期待",
      "meaning": "expectation; anticipation; hope",
      "romaji": "kitai"
    },
    {
      "word": "国家",
      "meaning": "state; country; nation",
      "romaji": "kokka"
    },
    {
      "word": "国会",
      "meaning": "National Diet; legislative assembly of Japan; parliament; congress",
      "romaji": "kokkai"
    },
    {
      "word": "国境",
      "meaning": "national border",
      "romaji": "kokkyou"
    },
    {
      "word": "国語",
      "meaning": "national language",
      "romaji": "kokugo"
    },
    {
      "word": "国民",
      "meaning": "people (of a country); nation; citizen; national",
      "romaji": "kokumin"
    },
    {
      "word": "今後",
      "meaning": "from now on; hereafter",
      "romaji": "kongo"
    },
    {
      "word": "今回",
      "meaning": "now; this time; lately",
      "romaji": "konkai"
    },
    {
      "word": "今日",
      "meaning": "today; this day",
      "romaji": "konnichi"
    },
    {
      "word": "転ぶ",
      "meaning": "to fall down; to fall over",
      "romaji": "korobu"
    },
    {
      "word": "高速",
      "meaning": "high-speed; rapid; express",
      "romaji": "kousoku"
    },
    {
      "word": "訓練",
      "meaning": "training; drill; practice; discipline",
      "romaji": "kunren"
    },
    {
      "word": "教科書",
      "meaning": "textbook; coursebook; schoolbook",
      "romaji": "kyoukasho"
    },
    {
      "word": "協力",
      "meaning": "cooperation; collaboration",
      "romaji": "kyouryoku"
    },
    {
      "word": "強力",
      "meaning": "powerful; strong",
      "romaji": "kyouryoku"
    },
    {
      "word": "急激",
      "meaning": "sudden; abrupt; rapid; sharp; drastic; radical",
      "romaji": "kyuugeki"
    },
    {
      "word": "急に",
      "meaning": "swiftly; rapidly; quickly; immediately; hastily",
      "romaji": "kyuuni"
    },
    {
      "word": "吸収",
      "meaning": "absorption; suction; attraction",
      "romaji": "kyuushuu"
    },
    {
      "word": "急速",
      "meaning": "rapid (e.g. progress)",
      "romaji": "kyuusoku"
    },
    {
      "word": "真面目",
      "meaning": "serious; earnest",
      "romaji": "majime"
    },
    {
      "word": "真っ赤",
      "meaning": "bright red; deep red; flushed (of face)",
      "romaji": "makka"
    },
    {
      "word": "学ぶ",
      "meaning": "to study (in depth); to learn; to take lessons in",
      "romaji": "manabu"
    },
    {
      "word": "万一",
      "meaning": "emergency; unlikely event​; by some chance; by some possibility",
      "romaji": "manichi"
    },
    {
      "word": "満足",
      "meaning": "satisfaction; contentment;​ sufficient; enough",
      "romaji": "manzoku"
    },
    {
      "word": "明確",
      "meaning": "clear; precise; definite; distinct",
      "romaji": "meikaku"
    },
    {
      "word": "飯",
      "meaning": "cooked rice; meal",
      "romaji": "meshi"
    },
    {
      "word": "味方",
      "meaning": "friend; ally; supporter; taking sides with; supporting",
      "romaji": "mikata"
    },
    {
      "word": "魅力",
      "meaning": "charm; fascination; glamour; attraction; appeal",
      "romaji": "miryoku"
    },
    {
      "word": "木曜",
      "meaning": "Thursday",
      "romaji": "mokuyou"
    },
    {
      "word": "半ば",
      "meaning": "middle; half; semi; halfway; partly",
      "romaji": "nakaba"
    },
    {
      "word": "熱心",
      "meaning": "enthusiastic; eager",
      "romaji": "nesshin"
    },
    {
      "word": "日本",
      "meaning": "Japan",
      "romaji": "nihon"
    },
    {
      "word": "能力",
      "meaning": "ability; faculty",
      "romaji": "nouryoku"
    },
    {
      "word": "入場",
      "meaning": "entrance; admission; entering",
      "romaji": "nyuujou"
    },
    {
      "word": "お昼",
      "meaning": "lunch; midday; daytime",
      "romaji": "ohiru"
    },
    {
      "word": "収める",
      "meaning": "to supply; to dedicate; to make an offering; to pay",
      "romaji": "osameru"
    },
    {
      "word": "連続",
      "meaning": "continuation; succession; series",
      "romaji": "renzoku"
    },
    {
      "word": "利益",
      "meaning": "profit; gains; benefit",
      "romaji": "rieki"
    },
    {
      "word": "利口",
      "meaning": "clever; intelligent; wise; bright; sharp",
      "romaji": "rikou"
    },
    {
      "word": "留学",
      "meaning": "studying abroad",
      "romaji": "ryuugaku"
    },
    {
      "word": "作品",
      "meaning": "work of art; performance",
      "romaji": "sakuhin"
    },
    {
      "word": "左右",
      "meaning": "left and right",
      "romaji": "sayuu"
    },
    {
      "word": "成長",
      "meaning": "growth; development; growing up; becoming an adult",
      "romaji": "seichou"
    },
    {
      "word": "製品",
      "meaning": "manufactured goods; finished goods; product",
      "romaji": "seihin"
    },
    {
      "word": "青年",
      "meaning": "youth; young man",
      "romaji": "seinen"
    },
    {
      "word": "刺激",
      "meaning": "stimulus; impetus; incentive; encouragement; motivation; provocation; excitement; thrill",
      "romaji": "shigeki"
    },
    {
      "word": "資本",
      "meaning": "funds; capital",
      "romaji": "shihon"
    },
    {
      "word": "品",
      "meaning": "article; item; thing; goods; stock; quality",
      "romaji": "shina"
    },
    {
      "word": "身長",
      "meaning": "body height; stature",
      "romaji": "shinchou"
    },
    {
      "word": "進学",
      "meaning": "entering a higher-level school (often university)",
      "romaji": "shingaku"
    },
    {
      "word": "新鮮",
      "meaning": "fresh",
      "romaji": "shinsen"
    },
    {
      "word": "支店",
      "meaning": "branch office; branch store​",
      "romaji": "shiten"
    },
    {
      "word": "使用",
      "meaning": "use; application; employment; utilization.",
      "romaji": "shiyou"
    },
    {
      "word": "食品",
      "meaning": "food; food products",
      "romaji": "shokuhin"
    },
    {
      "word": "書物",
      "meaning": "book; volume",
      "romaji": "shomotsu"
    },
    {
      "word": "書類",
      "meaning": "document; official papers",
      "romaji": "shorui"
    },
    {
      "word": "書斎",
      "meaning": "study; library; den; home office; reading room",
      "romaji": "shosai"
    },
    {
      "word": "商売",
      "meaning": "trade; business; commerce; transaction; occupation",
      "romaji": "shoubai"
    },
    {
      "word": "奨学金",
      "meaning": "scholarship; stipend; student loan",
      "romaji": "shougakukin"
    },
    {
      "word": "正午",
      "meaning": "midday",
      "romaji": "shougo"
    },
    {
      "word": "商品",
      "meaning": "commodity; article of commerce; goods; stock; merchandise",
      "romaji": "shouhin"
    },
    {
      "word": "少女",
      "meaning": "little girl; maiden; young lady",
      "romaji": "shoujo"
    },
    {
      "word": "証明",
      "meaning": "proof; verification; certification",
      "romaji": "shoumei"
    },
    {
      "word": "少年",
      "meaning": "boy; juvenile; young boy; youth; lad",
      "romaji": "shounen"
    },
    {
      "word": "少々",
      "meaning": "just a minute; small quantity",
      "romaji": "shoushou"
    },
    {
      "word": "招待",
      "meaning": "invitation",
      "romaji": "shoutai"
    },
    {
      "word": "週",
      "meaning": "week",
      "romaji": "shuu"
    },
    {
      "word": "集中",
      "meaning": "concentration; focusing; centralization; integration",
      "romaji": "shuuchuu"
    },
    {
      "word": "集団",
      "meaning": "group; mass",
      "romaji": "shuudan"
    },
    {
      "word": "収穫",
      "meaning": "harvest; crop; fruits (of one's labors)",
      "romaji": "shuukaku"
    },
    {
      "word": "週間",
      "meaning": "week",
      "romaji": "shuukan"
    },
    {
      "word": "週刊",
      "meaning": "weekly publication",
      "romaji": "shuukan"
    },
    {
      "word": "収入",
      "meaning": "income; receipts; revenue; salary",
      "romaji": "shuunyuu"
    },
    {
      "word": "速度",
      "meaning": "speed; velocity; pace; rate",
      "romaji": "sokudo"
    },
    {
      "word": "少しも",
      "meaning": "anything of; not one bit (with negative sentence)",
      "romaji": "sukoshimo"
    },
    {
      "word": "大半",
      "meaning": "majority; more than half; most; largely; mainly",
      "romaji": "taihan"
    },
    {
      "word": "大会",
      "meaning": "convention; rally; conference; tournament;",
      "romaji": "taikai"
    },
    {
      "word": "大した",
      "meaning": "considerable; great; important; significant; a big deal",
      "romaji": "taishita"
    },
    {
      "word": "単なる",
      "meaning": "mere; simple; sheer",
      "romaji": "tannaru"
    },
    {
      "word": "多少",
      "meaning": "more or less; somewhat; a little; a few; some",
      "romaji": "tashou"
    },
    {
      "word": "手品",
      "meaning": "magic trick; illusion",
      "romaji": "tejina"
    },
    {
      "word": "哲学",
      "meaning": "philosophy",
      "romaji": "tetsugaku"
    },
    {
      "word": "徹夜",
      "meaning": "staying up all night",
      "romaji": "tetsuya"
    },
    {
      "word": "土地",
      "meaning": "plot of land; lot; soil",
      "romaji": "tochi"
    },
    {
      "word": "都会",
      "meaning": "(big) city",
      "romaji": "tokai"
    },
    {
      "word": "取れる",
      "meaning": "to come off; to be removed; to be obtainable",
      "romaji": "toreru"
    },
    {
      "word": "取り上げる",
      "meaning": "to pick up",
      "romaji": "toriageru"
    },
    {
      "word": "図書",
      "meaning": "books",
      "romaji": "tosho"
    },
    {
      "word": "通学",
      "meaning": "commuting to school; school commute",
      "romaji": "tsuugaku"
    },
    {
      "word": "受け取る",
      "meaning": "to receive; to understand",
      "romaji": "uketoru"
    },
    {
      "word": "上手い",
      "meaning": "skillful; delicious",
      "romaji": "umai"
    },
    {
      "word": "運転",
      "meaning": "operation; driving",
      "romaji": "unten"
    },
    {
      "word": "売れる",
      "meaning": "to sell (well)",
      "romaji": "ureru"
    },
    {
      "word": "分ける",
      "meaning": "to divide; to split; to part; to separate",
      "romaji": "wakeru"
    },
    {
      "word": "悪口",
      "meaning": "slander; bad-mouthing; abuse; insult; speaking ill (of)",
      "romaji": "waruguchi"
    },
    {
      "word": "夜明け",
      "meaning": "dawn; daybreak",
      "romaji": "yoake"
    },
    {
      "word": "余分",
      "meaning": "extra; excess; surplus",
      "romaji": "yobun"
    },
    {
      "word": "読み",
      "meaning": "reading (of a kanji, situation, etc)",
      "romaji": "yomi"
    },
    {
      "word": "夜中",
      "meaning": "middle of the night; dead of night",
      "romaji": "yonaka"
    },
    {
      "word": "宜しい",
      "meaning": "(respectful) OK; all right",
      "romaji": "yoroshii"
    },
    {
      "word": "唯一",
      "meaning": "only; sole; unique",
      "romaji": "yuiitsu"
    },
    {
      "word": "輸入",
      "meaning": "import; importation; introduction",
      "romaji": "yunyuu"
    },
    {
      "word": "輸出",
      "meaning": "export; exportation​",
      "romaji": "yushutsu"
    },
    {
      "word": "夕べ",
      "meaning": "evening / last night; yesterday evening",
      "romaji": "yuube"
    },
    {
      "word": "有利",
      "meaning": "advantageous; favorable; profitable",
      "romaji": "yuuri"
    },
    {
      "word": "全国",
      "meaning": "the whole country",
      "romaji": "zenkoku"
    },
    {
      "word": "随分",
      "meaning": "very; extremely; surprisingly; considerably; awfully",
      "romaji": "zuibun"
    }
  ],
  N2: [
    { word: "義務", meaning: "obligation", romaji: "gimu" },
    { word: "権利", meaning: "rights", romaji: "kenri" },
    { word: "世論", meaning: "public opinion", romaji: "seron" },
    { word: "輸出", meaning: "export", romaji: "yushutsu" },
    { word: "輸入", meaning: "import", romaji: "yunyū" },
    { word: "指導", meaning: "guidance", romaji: "shidō" },
    { word: "批評", meaning: "criticism", romaji: "hihyō" },
    { word: "批判", meaning: "critique", romaji: "hihan" },
    { word: "影響", meaning: "influence", romaji: "eikyō" },
    { word: "効果", meaning: "effect", romaji: "kōka" },
    {
      "word": "明け方",
      "meaning": "dawn",
      "romaji": "akegata"
    },
    {
      "word": "青白い",
      "meaning": "pale; bluish-white",
      "romaji": "aojiroi"
    },
    {
      "word": "足跡",
      "meaning": "footprints",
      "romaji": "ashiato"
    },
    {
      "word": "売買",
      "meaning": "trade; buying and selling",
      "romaji": "baibai"
    },
    {
      "word": "売店",
      "meaning": "stand; stall; booth; kiosk; store",
      "romaji": "baiten"
    },
    {
      "word": "募集",
      "meaning": "recruitment; invitation; taking applications; solicitation",
      "romaji": "boshuu"
    },
    {
      "word": "長男",
      "meaning": "eldest son; first-born son",
      "romaji": "chounan"
    },
    {
      "word": "楕円",
      "meaning": "ellipse",
      "romaji": "daen"
    },
    {
      "word": "大学院",
      "meaning": "graduate school",
      "romaji": "daigakuin"
    },
    {
      "word": "出入口",
      "meaning": "exit and entrance",
      "romaji": "deiriguchi"
    },
    {
      "word": "宴会",
      "meaning": "party; banquet; reception; feast; dinner",
      "romaji": "enkai"
    },
    {
      "word": "円周",
      "meaning": "circumference",
      "romaji": "enshuu"
    },
    {
      "word": "遠足",
      "meaning": "excursion; outing; trip",
      "romaji": "ensoku"
    },
    {
      "word": "父母",
      "meaning": "father and mother; parents",
      "romaji": "fubo"
    },
    {
      "word": "学科",
      "meaning": "study subject; course of study​; department",
      "romaji": "gakka"
    },
    {
      "word": "学会",
      "meaning": "scientific society; academic meeting; academic conference",
      "romaji": "gakkai"
    },
    {
      "word": "学力",
      "meaning": "scholarly ability; scholarship; knowledge; literary ability",
      "romaji": "gakuryoku"
    },
    {
      "word": "外科",
      "meaning": "surgery; department of surgery",
      "romaji": "geka"
    },
    {
      "word": "花火",
      "meaning": "fireworks",
      "romaji": "hanabi"
    },
    {
      "word": "半径",
      "meaning": "radius",
      "romaji": "hankei"
    },
    {
      "word": "半島",
      "meaning": "peninsula",
      "romaji": "hantou"
    },
    {
      "word": "発売",
      "meaning": "sale; release (for sale); launch (product)",
      "romaji": "hatsubai"
    },
    {
      "word": "早口",
      "meaning": "fast-talking; rapid talking",
      "romaji": "hayaguchi"
    },
    {
      "word": "外れる",
      "meaning": "to be disconnected; to be off; to miss the mark",
      "romaji": "hazureru"
    },
    {
      "word": "閉会",
      "meaning": "closure (of a ceremony, event, meeting, etc.)",
      "romaji": "heikai"
    },
    {
      "word": "昼寝",
      "meaning": "nap, siesta",
      "romaji": "hirune"
    },
    {
      "word": "意地悪",
      "meaning": "malicious; ill-tempered; unkind",
      "romaji": "ijiwaru"
    },
    {
      "word": "移転",
      "meaning": "moving; relocation; change of address",
      "romaji": "iten"
    },
    {
      "word": "一旦",
      "meaning": "once; for a short time; briefly; temporarily",
      "romaji": "ittan"
    },
    {
      "word": "寺院",
      "meaning": "Buddhist temple; religious building",
      "romaji": "ji'in"
    },
    {
      "word": "人文科学",
      "meaning": "humanities; social sciences; liberal arts",
      "romaji": "jinbunkagaku"
    },
    {
      "word": "自習",
      "meaning": "self-study; teaching oneself",
      "romaji": "jishuu"
    },
    {
      "word": "時速",
      "meaning": "speed (per hour)",
      "romaji": "jisoku"
    },
    {
      "word": "実習",
      "meaning": "practice; training; practical exercise; drill",
      "romaji": "jisshuu"
    },
    {
      "word": "過半数",
      "meaning": "majority",
      "romaji": "kahansuu"
    },
    {
      "word": "開会",
      "meaning": "opening of a meeting; starting (an event, etc)",
      "romaji": "kaikai"
    },
    {
      "word": "会館",
      "meaning": "meeting hall; assembly hall",
      "romaji": "kaikan"
    },
    {
      "word": "回転",
      "meaning": "rotation; revolution; turning",
      "romaji": "kaiten"
    },
    {
      "word": "加速",
      "meaning": "acceleration; speeding up",
      "romaji": "kasoku"
    },
    {
      "word": "加速度",
      "meaning": "acceleration",
      "romaji": "kasokudo"
    },
    {
      "word": "見学",
      "meaning": "study by observation; field trip; tour; review; inspection",
      "romaji": "kengaku"
    },
    {
      "word": "国王",
      "meaning": "king; queen; monarch; sovereign",
      "romaji": "kokuou"
    },
    {
      "word": "国立",
      "meaning": "national",
      "romaji": "kokuritsu"
    },
    {
      "word": "国籍",
      "meaning": "nationality; citizenship",
      "romaji": "kokuseki"
    },
    {
      "word": "転がる",
      "meaning": "to roll; to fall over; to lie down",
      "romaji": "korogaru"
    },
    {
      "word": "転がす",
      "meaning": "to roll; to turn over",
      "romaji": "korogasu"
    },
    {
      "word": "校舎",
      "meaning": "school building; schoolhouse",
      "romaji": "kousha"
    },
    {
      "word": "校庭",
      "meaning": "schoolyard; playground; school grounds; campus",
      "romaji": "koutei"
    },
    {
      "word": "待合室",
      "meaning": "waiting room",
      "romaji": "machiaishitsu"
    },
    {
      "word": "待ち合わせる",
      "meaning": "to rendezvous; to meet at a prearranged place and time; to arrange to meet",
      "romaji": "machiawaseru"
    },
    {
      "word": "窓口",
      "meaning": "ticket window; teller window; counter",
      "romaji": "madoguchi"
    },
    {
      "word": "毎度",
      "meaning": "each time; always; often; thank you for your continued patronage​",
      "romaji": "maido"
    },
    {
      "word": "真っ青",
      "meaning": "deep blue; bright blue​; ghastly pale; white as a sheet",
      "romaji": "massao"
    },
    {
      "word": "真っ白",
      "meaning": "pure white; blank",
      "romaji": "masshiro"
    },
    {
      "word": "名刺",
      "meaning": "business card",
      "romaji": "meishi"
    },
    {
      "word": "店屋",
      "meaning": "store; shop",
      "romaji": "miseya"
    },
    {
      "word": "木材",
      "meaning": "lumber; timber; wood",
      "romaji": "mokuzai"
    },
    {
      "word": "元々",
      "meaning": "originally, by nature, from the start",
      "romaji": "motomoto"
    },
    {
      "word": "内科",
      "meaning": "internal medicine",
      "romaji": "naika"
    },
    {
      "word": "並木",
      "meaning": "roadside tree; row of trees",
      "romaji": "namiki"
    },
    {
      "word": "入社",
      "meaning": "joining a company",
      "romaji": "nyuusha"
    },
    {
      "word": "押さえる",
      "meaning": "to pin down; to hold down; to press down",
      "romaji": "osaeru"
    },
    {
      "word": "理科",
      "meaning": "science (department; course)",
      "romaji": "rika"
    },
    {
      "word": "領収",
      "meaning": "receipt (of money); receiving",
      "romaji": "ryoushuu"
    },
    {
      "word": "再三",
      "meaning": "again and again; repeatedly",
      "romaji": "saisan"
    },
    {
      "word": "刺さる",
      "meaning": "to stick into (with a sharp point); to prick; to get stuck (in);",
      "romaji": "sasaru"
    },
    {
      "word": "刺身",
      "meaning": "sashimi (raw sliced fish, shellfish or crustaceans)",
      "romaji": "sashimi"
    },
    {
      "word": "早速",
      "meaning": "at once; immediately; without delay; promptly",
      "romaji": "sassoku"
    },
    {
      "word": "刺す",
      "meaning": "to pierce; to stab; to prick; to stick; to thrust; to sting",
      "romaji": "sasu"
    },
    {
      "word": "青少年",
      "meaning": "youth; young person",
      "romaji": "seishounen"
    },
    {
      "word": "赤道",
      "meaning": "equator",
      "romaji": "sekidou"
    },
    {
      "word": "社会科学",
      "meaning": "social science",
      "romaji": "shakaikagaku"
    },
    {
      "word": "社説",
      "meaning": "editorial; leading article; leader",
      "romaji": "shasetsu"
    },
    {
      "word": "司会",
      "meaning": "master of ceremonies; leading a meeting; presenter; host",
      "romaji": "shikai"
    },
    {
      "word": "新幹線",
      "meaning": "Japanese bullet train",
      "romaji": "shinkansen"
    },
    {
      "word": "白髪",
      "meaning": "white hair; grey hair",
      "romaji": "shiraga"
    },
    {
      "word": "自然科学",
      "meaning": "natural science",
      "romaji": "shizenkagaku"
    },
    {
      "word": "書店",
      "meaning": "bookshop; bookstore",
      "romaji": "shoten"
    },
    {
      "word": "商社",
      "meaning": "trading company; firm",
      "romaji": "shousha"
    },
    {
      "word": "商店",
      "meaning": "shop; small store; business; firm",
      "romaji": "shouten"
    },
    {
      "word": "集合",
      "meaning": "gathering; assembly; meeting",
      "romaji": "shuugou"
    },
    {
      "word": "習字",
      "meaning": "calligraphy; penmanship",
      "romaji": "shuuji"
    },
    {
      "word": "集会",
      "meaning": "meeting; assembly; gathering; convention; rally",
      "romaji": "shuukai"
    },
    {
      "word": "速力",
      "meaning": "speed",
      "romaji": "sokuryoku"
    },
    {
      "word": "速達",
      "meaning": "express; special delivery",
      "romaji": "sokutatsu"
    },
    {
      "word": "足袋",
      "meaning": "Japanese socks (with split toe)",
      "romaji": "tabi"
    },
    {
      "word": "足る",
      "meaning": "to be sufficient; to be enough​; to be worth doing; to be worthy of; to deserve​",
      "romaji": "taru"
    },
    {
      "word": "特売",
      "meaning": "special sale",
      "romaji": "tokubai"
    },
    {
      "word": "透明",
      "meaning": "transparent; clear",
      "romaji": "toumei"
    },
    {
      "word": "東洋",
      "meaning": "Orient",
      "romaji": "touyou"
    },
    {
      "word": "売れ行き",
      "meaning": "sales; demand",
      "romaji": "ureyuki"
    },
    {
      "word": "売上",
      "meaning": "amount sold; sales; proceeds; turnover",
      "romaji": "uriage"
    },
    {
      "word": "売り切れ",
      "meaning": "sold out",
      "romaji": "urikire"
    },
    {
      "word": "売り切れる",
      "meaning": "to be sold out",
      "romaji": "urikireru"
    },
    {
      "word": "我が",
      "meaning": "my; our; one's own",
      "romaji": "waga"
    },
    {
      "word": "洋品店",
      "meaning": "shop that handles Western-style apparel and accessories",
      "romaji": "youhinten"
    },
    {
      "word": "輸血",
      "meaning": "blood transfusion",
      "romaji": "yuketsu"
    },
    {
      "word": "輸送",
      "meaning": "transport; transportation",
      "romaji": "yusou"
    },
    {
      "word": "材木",
      "meaning": "lumber; timber",
      "romaji": "zaimoku"
    }
  ],
  // ---------------------------------------------------------------
  // N1 list sourced from open-anki-jlpt-decks (MIT) by Jamie Sinclair.
  // https://github.com/jamsinclair/open-anki-jlpt-decks
  // Originally derived from Jonathan Waller's tanos.co.uk JLPT 1-kyū
  // vocabulary; that data is released into the public domain. The
  // MIT license below covers Sinclair's curation + meanings.
  // ---------------------------------------------------------------
  N1: [
    { word: "現像", meaning: "developing (film)", romaji: "genzō" },
    { word: "原則", meaning: "principle, general rule", romaji: "gensoku" },
    { word: "見地", meaning: "point of view", romaji: "kenchi" },
    { word: "現地", meaning: "actual place, local", romaji: "genchi" },
    { word: "限定", meaning: "limit, restriction", romaji: "gentei" },
    { word: "原点", meaning: "origin (coordinates, starting point)", romaji: "genten" },
    { word: "原典", meaning: "original, source", romaji: "genten" },
    { word: "原爆", meaning: "atomic bomb", romaji: "genbaku" },
    { word: "原文", meaning: "the text, original", romaji: "genbun" },
    { word: "厳密", meaning: "strict, close", romaji: "genmitsu" },
    { word: "賢明", meaning: "wisdom, intelligence, prudence", romaji: "kenmei" },
    { word: "倹約", meaning: "thrift, economy, frugality", romaji: "ken'yaku" },
    { word: "原油", meaning: "crude oil", romaji: "gen'yu" },
    { word: "兼用", meaning: "multi-use, combined use", romaji: "ken'yō" },
    { word: "権力", meaning: "(political) power, authority, influence", romaji: "kenryoku" },
    { word: "言論", meaning: "discussion, speech", romaji: "genron" },
    { word: "故～", meaning: "deceased, late", romaji: "ko～" },
    { word: "語彙", meaning: "vocabulary, glossary", romaji: "goi" },
    { word: "恋する", meaning: "to fall in love with, to love", romaji: "koisuru" },
    { word: "甲", meaning: "1st in rank; shell", romaji: "kō" },
    { word: "～光", meaning: "light", romaji: "～kō" },
    { word: "好意", meaning: "good will, favor, courtesy", romaji: "kōi" },
    { word: "行為", meaning: "act, deed, conduct", romaji: "kōi" },
    { word: "合意", meaning: "agreement, consent, mutual understanding", romaji: "gōi" },
    { word: "工学", meaning: "engineering", romaji: "kōgaku" },
    { word: "抗議", meaning: "protest, objection", romaji: "kōgi" },
    { word: "合議", meaning: "consultation, conference", romaji: "gōgi" },
    { word: "皇居", meaning: "Imperial Palace", romaji: "kōkyo" },
    { word: "好況", meaning: "prosperous conditions, healthy economy", romaji: "kōkyō" },
    { word: "鉱業", meaning: "mining industry", romaji: "kōgyō" },
    { word: "興業", meaning: "starting a business; industry", romaji: "kōgyō" },
    { word: "高原", meaning: "tableland, plateau", romaji: "kōgen" },
    { word: "交互", meaning: "mutual, reciprocal, alternate", romaji: "kōgo" },
    { word: "煌々と", meaning: "brightly", romaji: "kōkōto" },
    { word: "考古学", meaning: "archeology", romaji: "kōkogaku" },
    { word: "工作", meaning: "handicraft, maneuvering", romaji: "kōsaku" },
    { word: "耕作", meaning: "cultivation, farming", romaji: "kōsaku" },
    { word: "鉱山", meaning: "mine", romaji: "kōzan" },
    { word: "講習", meaning: "short course, training", romaji: "kōshū" },
    { word: "口述", meaning: "verbal statement", romaji: "kōjutsu" },
    { word: "控除", meaning: "subsidy, deduction", romaji: "kōjo" },
    { word: "交渉", meaning: "negotiation", romaji: "kōshō" },
    { word: "高尚", meaning: "high, noble, refined", romaji: "kōshō" },
    { word: "向上", meaning: "rise, improvement, progress", romaji: "kōjō" },
    { word: "行進", meaning: "march, parade", romaji: "kōshin" },
    { word: "香辛料", meaning: "spices", romaji: "kōshinryō" },
    { word: "降水", meaning: "rainfall, precipitation", romaji: "kōsui" },
    { word: "洪水", meaning: "flood", romaji: "kōzui" },
    { word: "合成", meaning: "synthetic, mixed", romaji: "gōsei" },
    { word: "公然", meaning: "openly", romaji: "kōzen" },
    { word: "抗争", meaning: "dispute, resistance", romaji: "kōsō" },
    { word: "構想", meaning: "plan, plot, idea, conception", romaji: "kōsō" },
    { word: "後退", meaning: "retreat, backspace", romaji: "kōtai" },
    { word: "光沢", meaning: "luster, glossy finish (of photographs)", romaji: "kōtaku" },
    { word: "公団", meaning: "public corporation", romaji: "kōdan" },
    { word: "好調", meaning: "satisfactory, in good shape", romaji: "kōchō" },
    { word: "口頭", meaning: "oral", romaji: "kōtō" },
    { word: "講読", meaning: "reading", romaji: "kōdoku" },
    { word: "購読", meaning: "subscription", romaji: "kōdoku" },
    { word: "購入", meaning: "purchase, buy", romaji: "kōnyū" },
    { word: "公認", meaning: "official recognition, authorization", romaji: "kōnin" },
    { word: "光熱費", meaning: "cost of fuel and light", romaji: "kōnetsuhi" },
    { word: "購買", meaning: "purchase, buy", romaji: "kōbai" },
    { word: "好評", meaning: "popularity, favorable reputation", romaji: "kōhyō" },
    { word: "交付", meaning: "delivering, furnishing (with copies)", romaji: "kōfu" },
    { word: "公募", meaning: "public appeal, public contribution", romaji: "kōbo" },
    { word: "巧妙", meaning: "ingenious, skillful, clever", romaji: "kōmyō" },
    { word: "公用", meaning: "government business, public use, public expense", romaji: "kōyō" },
    { word: "小売", meaning: "retail", romaji: "kōri" },
    { word: "効率", meaning: "efficiency", romaji: "kōritsu" },
    { word: "公立", meaning: "public institution", romaji: "kōritsu" },
    { word: "護衛", meaning: "guard, convoy, escort", romaji: "goei" },
    { word: "コーナー", meaning: "corner", romaji: "kōnā" },
    { word: "小柄", meaning: "small, diminutive", romaji: "kogara" },
    { word: "小切手", meaning: "cheque, check", romaji: "kogitte" },
    { word: "国産", meaning: "domestic products", romaji: "kokusan" },
    { word: "国定", meaning: "state-sponsored, national", romaji: "kokutei" },
    { word: "告白", meaning: "confession, acknowledgment", romaji: "kokuhaku" },
    { word: "国防", meaning: "national defense", romaji: "kokubō" },
    { word: "国有", meaning: "national ownership", romaji: "kokuyū" },
    { word: "極楽", meaning: "paradise", romaji: "gokuraku" },
    { word: "国連", meaning: "U.N., United Nations", romaji: "kokuren" },
    { word: "焦げ茶", meaning: "dark brown", romaji: "kogecha" },
    { word: "語源", meaning: "word root, word derivation, etymology", romaji: "gogen" },
    { word: "心地", meaning: "feeling, sensation, mood", romaji: "kokochi" },
    { word: "心得", meaning: "knowledge, information", romaji: "kokoroe" },
    { word: "心掛け", meaning: "readiness, intention, aim", romaji: "kokorogake" },
    { word: "心掛ける", meaning: "to bear in mind, to aim to do", romaji: "kokorogakeru" },
    { word: "志", meaning: "will, intention, motive", romaji: "kokorozashi" },
    { word: "志す", meaning: "to plan, to intend, to aspire to", romaji: "kokorozasu" },
    { word: "心強い", meaning: "heartening, reassuring", romaji: "kokorozuyoi" },
    { word: "心細い", meaning: "helpless, hopeless, discouraging", romaji: "kokorobosoi" },
    { word: "試み", meaning: "trial, experiment", romaji: "kokoromi" },
    { word: "試みる", meaning: "to try, to test", romaji: "kokoromiru" },
    { word: "快い", meaning: "pleasant, agreeable", romaji: "kokoroyoi" },
    { word: "誤差", meaning: "error", romaji: "gosa" },
    { word: "ございます (かん)", meaning: "to be (polite, to exist)", romaji: "gozaimasu (kan)" },
    { word: "孤児", meaning: "orphan", romaji: "koji" },
    { word: "こじれる", meaning: "to get complicated, to grow worse", romaji: "kojireru" },
    { word: "こす (みずを～)", meaning: "to strain, to filter", romaji: "kosu (mizuwo～)" },
    { word: "梢", meaning: "treetop", romaji: "kozue" },
    { word: "個性", meaning: "individuality, personality, idiosyncrasy", romaji: "kosei" },
    { word: "戸籍", meaning: "census, family register", romaji: "koseki" },
    { word: "古代", meaning: "ancient times", romaji: "kodai" },
    { word: "こたつ", meaning: "table with heater, (originally) charcoal brazier in a floor well", romaji: "kotatsu" },
    { word: "こだわる", meaning: "to fuss over, to be particular about", romaji: "kodawaru" },
    { word: "誇張", meaning: "exaggeration", romaji: "kochō" },
    { word: "こつ (をつかむ)", meaning: "secret, trick, hang", romaji: "kotsu (wotsukamu)" },
    { word: "滑稽", meaning: "funny, humorous, comical", romaji: "kokkei" },
    { word: "国交", meaning: "diplomatic relations", romaji: "kokkō" },
    { word: "骨董品", meaning: "curio", romaji: "kottōhin" },
    { word: "固定", meaning: "fixation, fixing (e.g., salary, capital)", romaji: "kotei" },
    { word: "事柄", meaning: "matter, thing, affair, circumstance", romaji: "kotogara" },
    { word: "孤独", meaning: "isolation, loneliness, solitude", romaji: "kodoku" },
    { word: "ことごとく", meaning: "altogether, entirely", romaji: "kotogotoku" },
    { word: "言付け", meaning: "to leave a message", romaji: "kotozuke" },
    { word: "殊に", meaning: "especially, above all", romaji: "kotoni" },
    { word: "粉々", meaning: "in very small pieces", romaji: "konagona" },
    { word: "好ましい", meaning: "nice, likable, desirable", romaji: "konomashī" },
    { word: "碁盤", meaning: "Go board", romaji: "goban" },
    { word: "個別", meaning: "particular case", romaji: "kobetsu" },
    { word: "ごまかす", meaning: "to deceive, to falsify, to misrepresent", romaji: "gomakasu" },
    { word: "細やか", meaning: "meager, modest", romaji: "komayaka" },
    { word: "コマーシャル", meaning: "a commercial", romaji: "komāsharu" },
    { word: "込める", meaning: "to include, to put into", romaji: "komeru" },
    { word: "コメント", meaning: "comment", romaji: "komento" },
    { word: "籠もる", meaning: "to seclude oneself, to be confined in", romaji: "komoru" },
    { word: "固有", meaning: "characteristic, tradition, peculiar", romaji: "koyū" },
    { word: "暦", meaning: "calendar, almanac", romaji: "koyomi" },
    { word: "凝らす", meaning: "to concentrate, to devote, to peer into", romaji: "korasu" },
    { word: "ごらんなさい (かん)", meaning: "look, (please) try to do", romaji: "gorannasai (kan)" },
    { word: "孤立", meaning: "isolation, helplessness", romaji: "koritsu" },
    { word: "懲りる", meaning: "to learn by experience, to be disgusted with", romaji: "koriru" },
    { word: "凝る", meaning: "to stiffen, to harden", romaji: "koru" },
    { word: "根気", meaning: "patience; perseverance, energy", romaji: "konki" },
    { word: "根拠", meaning: "basis, foundation", romaji: "konkyo" },
    { word: "混血", meaning: "mixed race, mixed parentage", romaji: "konketsu" },
    { word: "コンタクト (レンズ)", meaning: "contact; contact lens", romaji: "kontakuto (renzu)" },
    { word: "昆虫", meaning: "insect, bug", romaji: "konchū" },
    { word: "根底", meaning: "root, basis, foundation", romaji: "kontei" },
    { word: "混同", meaning: "confusion, mixing, merger", romaji: "kondō" },
    { word: "コントラスト", meaning: "contrast", romaji: "kontorasuto" },
    { word: "コントロール", meaning: "control", romaji: "kontorōru" },
    { word: "コンパス", meaning: "compass", romaji: "konpasu" },
    { word: "根本", meaning: "foundation, root, base", romaji: "konpon" },
    { word: "財", meaning: "fortune, riches", romaji: "zai" },
    { word: "再会", meaning: "meeting again, reunion", romaji: "saikai" },
    { word: "災害", meaning: "calamity, disaster, misfortune", romaji: "saigai" },
    { word: "細菌", meaning: "bacillus, bacterium, germ", romaji: "saikin" },
    { word: "細工", meaning: "work, craftsmanship, trick", romaji: "saiku" },
    { word: "採掘", meaning: "mining", romaji: "saikutsu" },
    { word: "サイクル", meaning: "cycle", romaji: "saikuru" },
    { word: "採決", meaning: "vote, roll call", romaji: "saiketsu" },
    { word: "再建", meaning: "(temple or shrine) rebuilding", romaji: "saiken" },
    { word: "再現", meaning: "reproduction, return, revival", romaji: "saigen" },
    { word: "財源", meaning: "source of funds, resources, finances", romaji: "zaigen" },
    { word: "在庫", meaning: "stockpile, stock", romaji: "zaiko" },
    { word: "採算", meaning: "profit", romaji: "saisan" },
    { word: "サイズ", meaning: "size", romaji: "saizu" },
    { word: "再生", meaning: "playback, regeneration, resuscitation", romaji: "saisei" },
    { word: "財政", meaning: "economy, financial affairs", romaji: "zaisei" },
    { word: "最善", meaning: "the very best", romaji: "saizen" },
    { word: "採択", meaning: "adoption, selection, choice", romaji: "saitaku" },
    { word: "栽培", meaning: "cultivation", romaji: "saibai" },
    { word: "再発", meaning: "return, relapse, reoccurrence", romaji: "saihatsu" },
    { word: "細胞", meaning: "cell", romaji: "saibō" },
    { word: "採用", meaning: "use, adopt", romaji: "saiyō" },
    { word: "遮る", meaning: "to interrupt, to intercept, to obstruct", romaji: "saegiru" },
    { word: "さえずる", meaning: "to sing, to chirp, to twitter", romaji: "saezuru" },
    { word: "冴える", meaning: "to be clear, to be bright, to be skillful", romaji: "saeru" },
    { word: "竿", meaning: "rod, pole (e.g., for drying laundry)", romaji: "sao" },
    { word: "栄える", meaning: "to flourish, to prosper, to thrive", romaji: "sakaeru" },
    { word: "差額", meaning: "balance, difference, margin", romaji: "sagaku" },
    { word: "杯", meaning: "wine cup", romaji: "sakazuki" },
    { word: "逆立ち", meaning: "handstand, headstand", romaji: "sakadachi" },
    { word: "さきに (いぜん)", meaning: "before, earlier than, previously", romaji: "sakini (izen)" },
    { word: "詐欺", meaning: "fraud, swindle", romaji: "sagi" },
    { word: "削減", meaning: "cut, reduction", romaji: "sakugen" },
    { word: "錯誤", meaning: "mistake", romaji: "sakugo" },
    { word: "作戦", meaning: "military operations, tactics, strategy", romaji: "sakusen" },
    { word: "叫び", meaning: "shout, scream, outcry", romaji: "sakebi" },
    { word: "捧げる", meaning: "to lift up, to give, to offer", romaji: "sasageru" },
    { word: "差し掛かる", meaning: "to come near to, to approach", romaji: "sashikakaru" },
    { word: "指図", meaning: "instruction, mandate", romaji: "sashizu" },
    { word: "差し出す", meaning: "to present, to submit, to hold out", romaji: "sashidasu" },
    { word: "差し支える", meaning: "to interfere, to hinder", romaji: "sashitsukaeru" },
    { word: "授ける", meaning: "to grant, to award, to teach", romaji: "sazukeru" },
    { word: "摩する", meaning: "to rub, to stroke", romaji: "sasuru" },
    { word: "さぞ (さぞや。さぞかし)", meaning: "I am sure, certainly, no doubt", romaji: "sazo (sazoya.sazokashi)" },
    { word: "定まる", meaning: "to become settled, to be fixed", romaji: "sadamaru" },
    { word: "定める", meaning: "to decide, to determine", romaji: "sadameru" },
    { word: "座談会", meaning: "symposium, round-table discussion", romaji: "zadankai" },
    { word: "雑", meaning: "rough, crude", romaji: "zatsu" },
    { word: "雑貨", meaning: "miscellaneous goods, general goods", romaji: "zakka" },
    { word: "殺人", meaning: "murder", romaji: "satsujin" },
    { word: "察する", meaning: "to guess, to sense, to judge", romaji: "sassuru" },
    { word: "雑談", meaning: "chatting, idle talk", romaji: "zatsudan" },
    { word: "さっと", meaning: "suddenly, smoothly", romaji: "satto" },
    { word: "さっぱりする", meaning: "to refresh", romaji: "sapparisuru" },
    { word: "悟る", meaning: "to attain enlightenment, to understand", romaji: "satoru" },
    { word: "最中", meaning: "in the middle of, midst", romaji: "sanaka" },
    { word: "座標", meaning: "coordinates", romaji: "zahyō" },
    { word: "さほど", meaning: "not so, not that much", romaji: "sahodo" },
    { word: "サボる", meaning: "to cut (skip) classes; to loaf on the job; to idle away one's time", romaji: "saboru" },
    { word: "様", meaning: "state; way (a person does something); Mr. or Mrs.", romaji: "sama" },
    { word: "寒気", meaning: "chill, shiver, cold", romaji: "samuke" },
    { word: "侍", meaning: "samurai", romaji: "samurai" },
    { word: "さも", meaning: "with gusto, with satisfaction", romaji: "samo" },
    { word: "作用", meaning: "operation, effect, function", romaji: "sayō" },
    { word: "さらう (こどもを～)", meaning: "to kidnap", romaji: "sarau (kodomowo～)" },
    { word: "障る", meaning: "to hinder, to interfere with, to affect", romaji: "sawaru" },
    { word: "酸", meaning: "acid", romaji: "san" },
    { word: "山岳", meaning: "mountains", romaji: "sangaku" },
    { word: "参議院", meaning: "House of Councilors", romaji: "sangīn" },
    { word: "産休", meaning: "maternity leave", romaji: "sankyū" },
    { word: "サンキュー", meaning: "thank you", romaji: "sankyū" },
    { word: "残金", meaning: "remaining money", romaji: "zankin" },
    { word: "産後", meaning: "postpartum, after childbirth", romaji: "sango" },
    { word: "残酷", meaning: "cruelty, harshness", romaji: "zankoku" },
    { word: "産出", meaning: "yield, produce", romaji: "sanshutsu" },
    { word: "参照", meaning: "reference, consultation, consultation", romaji: "sanshō" },
    { word: "参上", meaning: "calling on, visiting", romaji: "sanjō" },
    { word: "残高", meaning: "(bank) balance, remainder", romaji: "zandaka" },
    { word: "サンタクロース", meaning: "Santa Claus", romaji: "santakurōsu" },
    { word: "桟橋", meaning: "wharf, jetty, pier", romaji: "sanbashi" },
    { word: "賛美", meaning: "praise, adoration, glorification", romaji: "sanbi" },
    { word: "山腹", meaning: "hillside, mountainside", romaji: "sanpuku" },
    { word: "産婦人科", meaning: "maternity and gynecology department", romaji: "sanfujinka" },
    { word: "産物", meaning: "product, result, fruit", romaji: "sanbutsu" },
    { word: "山脈", meaning: "mountain range", romaji: "sanmyaku" },
    { word: "仕上がり", meaning: "finish, end, completion", romaji: "shiagari" },
    { word: "仕上", meaning: "end, finishing touches", romaji: "shiage" },
    { word: "仕上げる", meaning: "to finish up, to complete", romaji: "shiageru" },
    { word: "飼育", meaning: "breeding, raising, rearing", romaji: "shīku" },
    { word: "強いて", meaning: "to dare, to insist", romaji: "shīte" },
    { word: "シート", meaning: "seat; sheet", romaji: "shīto" },
    { word: "ジーパン", meaning: "jeans", romaji: "jīpan" },
    { word: "仕入れる", meaning: "to lay in stock, to replenish stock, to procure", romaji: "shīreru" },
    { word: "強いる", meaning: "to force, to compel, to coerce", romaji: "shīru" },
    { word: "潮", meaning: "tide", romaji: "shio" },
    { word: "歯科", meaning: "dentistry", romaji: "shika" },
    { word: "自我", meaning: "self, ego", romaji: "jiga" },
    { word: "自覚", meaning: "self-conscious", romaji: "jikaku" },
    { word: "仕掛", meaning: "device, trick, mechanism", romaji: "shikake" },
    { word: "仕掛ける", meaning: "to lay, to set, to wage", romaji: "shikakeru" },
    { word: "しかしながら", meaning: "however, nevertheless", romaji: "shikashinagara" },
    { word: "色彩", meaning: "color", romaji: "shikisai" },
    { word: "式場", meaning: "ceremonial hall, place of ceremony (e.g., marriage)", romaji: "shikijō" },
    { word: "しきたり", meaning: "custom, conventional practice, tradition", romaji: "shikitari" },
    { word: "事業", meaning: "project, enterprise, business", romaji: "jigyō" },
    { word: "軽蔑", meaning: "scorn, disdain", romaji: "keibetsu" },
    { word: "経歴", meaning: "personal history, career", romaji: "keireki" },
    { word: "経路", meaning: "course, route, channel", romaji: "keiro" },
    { word: "けがらわしい", meaning: "filthy, unfair", romaji: "kegarawashī" },
    { word: "劇団", meaning: "troupe, theatrical company", romaji: "gekidan" },
    { word: "激励", meaning: "encouragement", romaji: "gekirei" },
    { word: "ゲスト", meaning: "guest", romaji: "gesuto" },
    { word: "獣", meaning: "beast, brute", romaji: "kedamono" },
    { word: "決", meaning: "decision, vote", romaji: "ketsu" },
    { word: "決意", meaning: "decision, determination", romaji: "ketsui" },
    { word: "結核", meaning: "tuberculosis", romaji: "kekkaku" },
    { word: "決議", meaning: "resolution, vote, decision", romaji: "ketsugi" },
    { word: "結合", meaning: "combination, union", romaji: "ketsugō" },
    { word: "決算", meaning: "balance sheet, settlement of accounts", romaji: "kessan" },
    { word: "月謝", meaning: "monthly tuition fee", romaji: "gessha" },
    { word: "決勝", meaning: "finals (in sports)", romaji: "kesshō" },
    { word: "結晶", meaning: "crystal, crystallization", romaji: "kesshō" },
    { word: "結成", meaning: "formation", romaji: "kessei" },
    { word: "結束", meaning: "union, unity", romaji: "kessoku" },
    { word: "げっそり", meaning: "being disheartened, losing weight", romaji: "gessori" },
    { word: "決断", meaning: "decision, determination", romaji: "ketsudan" },
    { word: "月賦", meaning: "monthly installment", romaji: "geppu" },
    { word: "欠乏", meaning: "shortage", romaji: "ketsubō" },
    { word: "蹴飛ばす", meaning: "to kick away, to kick (someone)", romaji: "ketobasu" },
    { word: "けなす", meaning: "to speak ill of", romaji: "kenasu" },
    { word: "煙たい", meaning: "smoky, feeling awkward", romaji: "kemutai" },
    { word: "煙る", meaning: "to smoke (e.g., fire)", romaji: "kemuru" },
    { word: "家来", meaning: "retainer, retinue, servant", romaji: "kerai" },
    { word: "下痢", meaning: "diarrhea", romaji: "geri" },
    { word: "権威", meaning: "authority, power, influence", romaji: "ken'i" },
    { word: "兼業", meaning: "holding two jobs at the same time", romaji: "kengyō" },
    { word: "原形", meaning: "original form, base form", romaji: "genkei" },
    { word: "原型", meaning: "prototype, model, archetypal", romaji: "genkei" },
    { word: "権限", meaning: "power, authority, jurisdiction", romaji: "kengen" },
    { word: "現行", meaning: "present, current, in operation", romaji: "genkō" },
    { word: "健在", meaning: "in good health, well", romaji: "kenzai" },
    { word: "原作", meaning: "original work", romaji: "gensaku" },
    { word: "検事", meaning: "public prosecutor", romaji: "kenji" },
    { word: "原子", meaning: "atom", romaji: "genshi" },
    { word: "元首", meaning: "ruler, sovereign", romaji: "genshu" },
    { word: "原書", meaning: "original document", romaji: "gensho" },
    { word: "懸賞", meaning: "offering prizes, winning, reward", romaji: "kenshō" },
    { word: "健全", meaning: "health, soundness, wholesome", romaji: "kenzen" },
    { word: "元素", meaning: "element", romaji: "genso" },
    { word: "同調", meaning: "sympathy, agree with, alignment", romaji: "dōchō" },
    { word: "到底", meaning: "(cannot) possibly", romaji: "tōtei" },
    { word: "動的", meaning: "dynamic, kinetic", romaji: "dōteki" },
    { word: "尊い", meaning: "precious, valuable, noble", romaji: "tōtoi" },
    { word: "貴い", meaning: "precious, valuable, noble", romaji: "tōtoi" },
    { word: "同等", meaning: "equality, equal, same rank", romaji: "dōtō" },
    { word: "堂々", meaning: "magnificent, grand, impressive", romaji: "dōdō" },
    { word: "尊ぶ", meaning: "to value, to prize, to esteem", romaji: "tōtobu" },
    { word: "どうにか", meaning: "in some way or other, one way or another", romaji: "dōnika" },
    { word: "投入", meaning: "throw, investment, making (an electrical circuit)", romaji: "tōnyū" },
    { word: "導入", meaning: "introduction, bringing in, leading in", romaji: "dōnyū" },
    { word: "当人", meaning: "the one concerned, the said person", romaji: "tōnin" },
    { word: "同封", meaning: "enclosure (e.g., in a letter)", romaji: "dōfū" },
    { word: "逃亡", meaning: "escape", romaji: "tōbō" },
    { word: "冬眠", meaning: "hibernation, winter sleep", romaji: "tōmin" },
    { word: "同盟", meaning: "alliance, union, league", romaji: "dōmei" },
    { word: "どうやら", meaning: "it seems like, somehow or other", romaji: "dōyara" },
    { word: "動力", meaning: "power, motive power, dynamic force", romaji: "dōryoku" },
    { word: "登録", meaning: "registration, register, record", romaji: "tōroku" },
    { word: "討論", meaning: "discussion; debate", romaji: "tōron" },
    { word: "遠ざかる", meaning: "to go far off", romaji: "tōzakaru" },
    { word: "遠回り", meaning: "detour, roundabout way", romaji: "tōmawari" },
    { word: "トーン", meaning: "tone", romaji: "tōn" },
    { word: "とかく", meaning: "anyhow, anyway, in any case", romaji: "tokaku" },
    { word: "とがめる", meaning: "to blame, to rebuke", romaji: "togameru" },
    { word: "時折", meaning: "sometimes", romaji: "tokiori" },
    { word: "とぎれる", meaning: "to pause, to be interrupted", romaji: "togireru" },
    { word: "研ぐ", meaning: "to sharpen, to grind, to polish", romaji: "togu" },
    { word: "特技", meaning: "special talent; skill", romaji: "tokugi" },
    { word: "独裁", meaning: "dictatorship, despotism", romaji: "dokusai" },
    { word: "特産", meaning: "specialty, special product", romaji: "tokusan" },
    { word: "独自", meaning: "original, peculiar, characteristic", romaji: "dokuji" },
    { word: "特集", meaning: "feature (e.g., newspaper, special edition, report)", romaji: "tokushū" },
    { word: "独占", meaning: "monopoly", romaji: "dokusen" },
    { word: "独創", meaning: "originality", romaji: "dokusō" },
    { word: "得点", meaning: "score, points made", romaji: "tokuten" },
    { word: "特派", meaning: "send specially, special envoy", romaji: "tokuha" },
    { word: "特有", meaning: "characteristic (of, peculiar (to))", romaji: "tokuyū" },
    { word: "とげ (をさす)", meaning: "thorn", romaji: "toge (wosasu)" },
    { word: "遂げる", meaning: "to accomplish, to achieve, to carry out", romaji: "togeru" },
    { word: "～どころか", meaning: "rather, far from", romaji: "～dokoroka" },
    { word: "年頃", meaning: "age, marriageable age, adolescence", romaji: "toshigoro" },
    { word: "戸締り", meaning: "closing up, locking the doors", romaji: "tojimari" },
    { word: "途上", meaning: "en/in route, half way", romaji: "tojō" },
    { word: "土台", meaning: "foundation, base, basis", romaji: "dodai" },
    { word: "途絶える", meaning: "to stop, to cease, to come to an end", romaji: "todaeru" },
    { word: "特許", meaning: "special permission, patent", romaji: "tokkyo" },
    { word: "特権", meaning: "privilege, special right", romaji: "tokken" },
    { word: "とっさに", meaning: "at once", romaji: "tossani" },
    { word: "突如", meaning: "suddenly, all of a sudden", romaji: "totsujo" },
    { word: "とって", meaning: "handle, grip, knob", romaji: "totte" },
    { word: "突破", meaning: "breaking through, breakthrough, penetration", romaji: "toppa" },
    { word: "土手", meaning: "embankment, bank", romaji: "dote" },
    { word: "届", meaning: "report, notification, registration", romaji: "todoke" },
    { word: "滞る", meaning: "to stagnate, to be delayed", romaji: "todokōru" },
    { word: "整える", meaning: "to put in order, to arrange, to adjust; to get ready, to prepare; to raise money", romaji: "totonoeru" },
    { word: "止める", meaning: "to end, to stop, to cease, to resign", romaji: "todomeru" },
    { word: "唱える", meaning: "to recite, to chant, to call upon", romaji: "tonaeru" },
    { word: "殿様", meaning: "feudal lord", romaji: "tonosama" },
    { word: "土俵", meaning: "arena", romaji: "dohyō" },
    { word: "扉", meaning: "door, opening", romaji: "tobira" },
    { word: "溝", meaning: "ditch, drain, gap", romaji: "dobu" },
    { word: "徒歩", meaning: "walking, going on foot", romaji: "toho" },
    { word: "土木", meaning: "public works", romaji: "doboku" },
    { word: "とぼける", meaning: "to play dumb, to feign ignorance, to play innocent, to have a blank facial expression; to play the fool; to be in one's dotage", romaji: "tobokeru" },
    { word: "乏しい", meaning: "meager, scarce, hard up, poor", romaji: "toboshī" },
    { word: "富", meaning: "wealth, fortune", romaji: "tomi" },
    { word: "富む", meaning: "to be rich, to become rich", romaji: "tomu" },
    { word: "共稼ぎ", meaning: "working together, (husband and wife) earning a living together", romaji: "tomokasegi" },
    { word: "伴う", meaning: "to accompany, to bring with", romaji: "tomonau" },
    { word: "共働き", meaning: "dual income (husband and wife both working)", romaji: "tomobataraki" },
    { word: "ドライ", meaning: "dry", romaji: "dorai" },
    { word: "ドライクリーニング", meaning: "dry cleaning", romaji: "doraikurīningu" },
    { word: "ドライバー", meaning: "driver, screwdriver", romaji: "doraibā" },
    { word: "ドライブイン", meaning: "drive in", romaji: "doraibuin" },
    { word: "トラブル", meaning: "trouble (sometimes used as a verb)", romaji: "toraburu" },
    { word: "トランジスター", meaning: "transistor", romaji: "toranjisutā" },
    { word: "とりあえず", meaning: "at once, first of all, for the time being", romaji: "toriaezu" },
    { word: "取扱", meaning: "treatment, handling, management", romaji: "toriatsukai" },
    { word: "取り扱う", meaning: "to treat, to handle, to deal in", romaji: "toriatsukau" },
    { word: "鳥居", meaning: "Shinto shrine archway", romaji: "torī" },
    { word: "取り替え", meaning: "swap, exchange", romaji: "torikae" },
    { word: "取り組む", meaning: "to tackle, to engage in a bout, to come to grips with", romaji: "torikumu" },
    { word: "取締り", meaning: "control, crackdown, supervision", romaji: "torishimari" },
    { word: "取り締まる", meaning: "to crack down, to control, to supervise", romaji: "torishimaru" },
    { word: "取り調べる", meaning: "to investigate, to examine", romaji: "torishiraberu" },
    { word: "取り立てる", meaning: "to collect, to extort", romaji: "toritateru" },
    { word: "取り次ぐ", meaning: "to act as an agent for, to announce (someone), to convey (a message)", romaji: "toritsugu" },
    { word: "取り付ける", meaning: "to furnish, to install; to get someone's agreement", romaji: "toritsukeru" },
    { word: "取り除く", meaning: "to remove, to take away, to set apart", romaji: "torinozoku" },
    { word: "取引", meaning: "transactions, dealings, business", romaji: "torihiki" },
    { word: "取り巻く", meaning: "to surround, to circle, to enclose", romaji: "torimaku" },
    { word: "取り混ぜる", meaning: "to mix, to put together", romaji: "torimazeru" },
    { word: "取り戻す", meaning: "to take back, to regain", romaji: "torimodosu" },
    { word: "取り寄せる", meaning: "to order, to send away for", romaji: "toriyoseru" },
    { word: "ドリル", meaning: "drill", romaji: "doriru" },
    { word: "副", meaning: "especially, above all", romaji: "toriwake" },
    { word: "とろける", meaning: "melt; to be enchanted with", romaji: "torokeru" },
    { word: "鈍感", meaning: "thickheadedness, stolidity", romaji: "donkan" },
    { word: "とんだ", meaning: "terrible, awful, serious, absolutely not", romaji: "tonda" },
    { word: "度忘れ", meaning: "lapse of memory, forget for a moment", romaji: "dowasure" },
    { word: "問屋", meaning: "wholesale store", romaji: "ton'ya" },
    { word: "内閣", meaning: "cabinet, (government)", romaji: "naikaku" },
    { word: "乃至", meaning: "from...to, between...and, or", romaji: "naishi" },
    { word: "内緒", meaning: "secrecy, privacy, secret", romaji: "naisho" },
    { word: "内心", meaning: "innermost thoughts, real intention, inmost heart", romaji: "naishin" },
    { word: "内蔵", meaning: "internal organ; built-in", romaji: "naizō" },
    { word: "ナイター", meaning: "game under lights (e.g., baseball), night game", romaji: "naitā" },
    { word: "内部", meaning: "interior, inside, internal", romaji: "naibu" },
    { word: "内乱", meaning: "civil war, domestic conflict", romaji: "nairan" },
    { word: "内陸", meaning: "inland", romaji: "nairiku" },
    { word: "苗", meaning: "rice seedling", romaji: "nae" },
    { word: "なおさら", meaning: "all the more, still less", romaji: "naosara" },
    { word: "流し", meaning: "sink", romaji: "nagashi" },
    { word: "長々", meaning: "long, drawn-out, very long", romaji: "naganaga" },
    { word: "中程", meaning: "middle, midway", romaji: "nakahodo" },
    { word: "渚", meaning: "water's edge, beach, shore", romaji: "nagisa" },
    { word: "嘆く", meaning: "to sigh, to lament, to grieve", romaji: "nageku" },
    { word: "投げ出す", meaning: "to abandon, to throw out", romaji: "nagedasu" },
    { word: "仲人", meaning: "go-between, matchmaker", romaji: "nakōdo" },
    { word: "和やか", meaning: "mild, calm, harmonious", romaji: "nagoyaka" },
    { word: "名残", meaning: "remains, traces, memory", romaji: "nagori" },
    { word: "情け", meaning: "sympathy, compassion", romaji: "nasake" },
    { word: "情無い", meaning: "miserable, pitiable, shameful", romaji: "nasakenai" },
    { word: "情深い", meaning: "tender-hearted, compassionate", romaji: "nasakebukai" },
    { word: "詰る", meaning: "to rebuke, to scold, to tell off", romaji: "najiru" },
    { word: "名高い", meaning: "famous, celebrated, well-known", romaji: "nadakai" },
    { word: "雪崩", meaning: "avalanche", romaji: "nadare" },
    { word: "懐く", meaning: "to become emotionally attached", romaji: "natsuku" },
    { word: "名付ける", meaning: "to name", romaji: "nazukeru" },
    { word: "何気ない", meaning: "casual, unconcerned", romaji: "nanigenai" },
    { word: "なにとぞ", meaning: "please, kindly, by all means", romaji: "nanitozo" },
    { word: "なにより", meaning: "most, best", romaji: "naniyori" },
    { word: "ナプキン", meaning: "napkin", romaji: "napukin" },
    { word: "名札", meaning: "name plate, name tag", romaji: "nafuda" },
    { word: "生臭い", meaning: "smelling of fish or blood, fish or meat", romaji: "namagusai" },
    { word: "生温い", meaning: "lukewarm, halfhearted", romaji: "namanurui" },
    { word: "生身", meaning: "living flesh, flesh and blood, the quick", romaji: "namami" },
    { word: "鉛", meaning: "lead (the metal)", romaji: "namari" },
    { word: "滑らか", meaning: "smoothness, glassiness", romaji: "nameraka" },
    { word: "嘗める", meaning: "to lick; to experience; to make fun of", romaji: "nameru" },
    { word: "悩ましい", meaning: "seductive, melancholy, languid", romaji: "nayamashī" },
    { word: "悩ます", meaning: "to bother, to harass, to molest", romaji: "nayamasu" },
    { word: "悩み", meaning: "trouble(s), worry, distress", romaji: "nayami" },
    { word: "並びに", meaning: "and", romaji: "narabini" },
    { word: "成り立つ", meaning: "to consist of; to be practical (logical, feasible, viable), to be concluded, to hold true", romaji: "naritatsu" },
    { word: "なるたけ", meaning: "as much as possible, if possible", romaji: "narutake" },
    { word: "慣れ", meaning: "practice, experience", romaji: "nare" },
    { word: "馴々しい", meaning: "familiar, make free with", romaji: "narenareshī" },
    { word: "～なんか", meaning: "in the least ~", romaji: "～nanka" },
    { word: "ナンセンス", meaning: "nonsense", romaji: "nansensu" },
    { word: "何だか", meaning: "a little, somewhat, somehow", romaji: "nandaka" },
    { word: "なんだかんだ", meaning: "something or other", romaji: "nandakanda" },
    { word: "なんなり", meaning: "anything, whatever", romaji: "nannari" },
    { word: "荷", meaning: "load, baggage, cargo", romaji: "ni" },
    { word: "似通う", meaning: "to resemble closely", romaji: "nikayō" },
    { word: "にきび", meaning: "pimple, acne", romaji: "nikibi" },
    { word: "賑わう", meaning: "to prosper, to flourish, to be crowded with people", romaji: "nigiwau" },
    { word: "憎しみ", meaning: "hatred", romaji: "nikushimi" },
    { word: "肉親", meaning: "blood relationship, blood relative", romaji: "nikushin" },
    { word: "肉体", meaning: "the body, the flesh", romaji: "nikutai" },
    { word: "逃げ出す", meaning: "to run away, to escape from", romaji: "nigedasu" },
    { word: "西日", meaning: "westering sun", romaji: "nishibi" },
    { word: "滲む", meaning: "to run, to blur, to spread", romaji: "nijimu" },
    { word: "にせ物", meaning: "imitation, counterfeit", romaji: "nisemono" },
    { word: "日夜", meaning: "day and night, always", romaji: "nichiya" },
    { word: "荷造り", meaning: "packing, baling, crating", romaji: "nizukuri" },
    { word: "担う", meaning: "to carry on shoulder, to bear (burden), to shoulder (gun)", romaji: "ninau" },
    { word: "鈍る", meaning: "to become less capable, to grow dull, to become blunt, to weaken", romaji: "niburu" },
    { word: "にも関わらず", meaning: "in spite of, nevertheless", romaji: "nimokakawarazu" },
    { word: "ニュアンス", meaning: "nuance", romaji: "nyuansu" },
    { word: "ニュー", meaning: "new", romaji: "nyū" },
    { word: "入手", meaning: "obtaining, coming to hand", romaji: "nyūshu" },
    { word: "入賞", meaning: "winning a prize or place (in a contest", romaji: "nyūshō" },
    { word: "入浴", meaning: "bathe, bathing", romaji: "nyūyoku" },
    { word: "尿", meaning: "urine", romaji: "nyō" },
    { word: "認識", meaning: "recognition, cognizance", romaji: "ninshiki" },
    { word: "妊娠", meaning: "conception, pregnancy", romaji: "ninshin" },
    { word: "任務", meaning: "duty, mission, task", romaji: "ninmu" },
    { word: "任命", meaning: "appointment, nomination, ordination", romaji: "ninmei" },
    { word: "抜かす", meaning: "to omit, to leave out", romaji: "nukasu" },
    { word: "抜け出す", meaning: "to slip out, to sneak away, to excel", romaji: "nukedasu" },
    { word: "主", meaning: "owner, master, god", romaji: "nushi" },
    { word: "沼", meaning: "swamp, bog, pond", romaji: "numa" },
    { word: "音色", meaning: "tone color, timbre", romaji: "neiro" },
    { word: "値打ち", meaning: "value, worth, price", romaji: "neuchi" },
    { word: "ネガ", meaning: "(photographic) negative", romaji: "nega" },
    { word: "寝かせる", meaning: "to put to bed, to lay down, to ferment", romaji: "nekaseru" },
    { word: "ねじまわし", meaning: "screwdriver", romaji: "nejimawashi" },
    { word: "捩れる", meaning: "twist, strain", romaji: "nejireru" },
    { word: "妬む", meaning: "to be jealous, to be envious", romaji: "netamu" },
    { word: "ねだる", meaning: "to nag, to demand", romaji: "nedaru" },
    { word: "熱意", meaning: "zeal, enthusiasm", romaji: "netsui" },
    { word: "熱湯", meaning: "boiling water", romaji: "nettō" },
    { word: "熱量", meaning: "calorific value", romaji: "netsuryō" },
    { word: "粘り", meaning: "stickiness, viscosity", romaji: "nebari" },
    { word: "粘る", meaning: "to be sticky, to be adhesive, to persist, to stick to", romaji: "nebaru" },
    { word: "値引き", meaning: "price reduction, discount", romaji: "nebiki" },
    { word: "根回し", meaning: "making necessary arrangements", romaji: "nemawashi" },
    { word: "眠たい", meaning: "sleepy", romaji: "nemutai" },
    { word: "練る", meaning: "to knead, to work over, to polish up", romaji: "neru" },
    { word: "念", meaning: "sense, feeling, desire", romaji: "nen" },
    { word: "年賀", meaning: "New Year's greetings, New Year's card", romaji: "nenga" },
    { word: "念願", meaning: "one's heart's desire, earnest petition", romaji: "nengan" },
    { word: "年号", meaning: "name of an era, year number", romaji: "nengō" },
    { word: "燃焼", meaning: "burning, combustion", romaji: "nenshō" },
    { word: "年長", meaning: "seniority", romaji: "nenchō" },
    { word: "燃料", meaning: "fuel", romaji: "nenryō" },
    { word: "年輪", meaning: "annual tree ring", romaji: "nenrin" },
    { word: "ノイローゼ", meaning: "neurosis (GER: Neurose)", romaji: "noirōze" },
    { word: "農耕", meaning: "farming, agriculture", romaji: "nōkō" },
    { word: "農場", meaning: "farm", romaji: "nōjō" },
    { word: "農地", meaning: "agricultural land", romaji: "nōchi" },
    { word: "納入", meaning: "payment, supply", romaji: "nōnyū" },
    { word: "逃す", meaning: "to let loose, to set free, to let escape", romaji: "nogasu" },
    { word: "逃れる", meaning: "to escape", romaji: "nogareru" },
    { word: "軒並", meaning: "row of houses; uniformly", romaji: "nokinami" },
    { word: "望ましい", meaning: "desirable, hoped for", romaji: "nozomashī" },
    { word: "乗っ取る", meaning: "to capture, to occupy, to take over", romaji: "nottoru" },
    { word: "のどか", meaning: "tranquil, calm, quiet", romaji: "nodoka" },
    { word: "罵る", meaning: "to speak ill of, to abuse", romaji: "nonoshiru" },
    { word: "延べ", meaning: "futures, credit (buying), stretching, total", romaji: "nobe" },
    { word: "飲み込む", meaning: "to gulp down, to swallow deeply, to understand", romaji: "nomikomu" },
    { word: "乗り込む", meaning: "to board, to get into (a car); to march into, to enter", romaji: "norikomu" },
    { word: "刃", meaning: "blade, sword", romaji: "ha" },
    { word: "～派", meaning: "group, party, section (mil)", romaji: "～ha" },
    { word: "バー", meaning: "bar", romaji: "bā" },
    { word: "把握", meaning: "grasp, catch, understanding", romaji: "hāku" },
    { word: "パート", meaning: "part-time job", romaji: "pāto" },
    { word: "廃棄", meaning: "disposal, abandon, discarding", romaji: "haiki" },
    { word: "配給", meaning: "distribution (e.g., films, rice", romaji: "haikyū" },
    { word: "ばい菌", meaning: "bacteria, germ(s)", romaji: "baikin" },
    { word: "配偶者", meaning: "spouse", romaji: "haigūsha" },
    { word: "拝啓", meaning: "-- a formal greeting used at the beginning of a letter --", romaji: "haikei" },
    { word: "背景", meaning: "background, scenery, setting", romaji: "haikei" },
    { word: "背後", meaning: "back, rear", romaji: "haigo" },
    { word: "廃止", meaning: "abolition, repeal", romaji: "haishi" },
    { word: "拝借", meaning: "(humble) (polite) borrowing", romaji: "haishaku" },
    { word: "排除", meaning: "exclusion, removal, rejection", romaji: "haijo" },
    { word: "賠償", meaning: "reparations, indemnity, compensation", romaji: "baishō" },
    { word: "排水", meaning: "drainage", romaji: "haisui" },
    { word: "敗戦", meaning: "defeat, losing a war", romaji: "haisen" },
    { word: "配置", meaning: "arrangement (of resources), disposition", romaji: "haichi" },
    { word: "配布", meaning: "distribution", romaji: "haifu" },
    { word: "配分", meaning: "distribution, allotment", romaji: "haibun" },
    { word: "敗北", meaning: "defeat (as a verb it means 'to be defeated')", romaji: "haiboku" },
    { word: "倍率", meaning: "diameter, magnification", romaji: "bairitsu" },
    { word: "配慮", meaning: "consideration, concern, forethought", romaji: "hairyo" },
    { word: "配列", meaning: "arrangement, array (programming)", romaji: "hairetsu" },
    { word: "破壊", meaning: "destruction", romaji: "hakai" },
    { word: "いたわる", meaning: "to sympathize with, to console, to care for", romaji: "itawaru" },
    { word: "一概に", meaning: "unconditionally, necessarily", romaji: "ichigaini" },
    { word: "著しい", meaning: "remarkable, considerable", romaji: "ichijirushī" },
    { word: "一同", meaning: "all present, all concerned, all of us", romaji: "ichidō" },
    { word: "一部分", meaning: "a part, a portion", romaji: "ichibubun" },
    { word: "一別", meaning: "parting", romaji: "ichibetsu" },
    { word: "一面", meaning: "one side, the other hand", romaji: "ichimen" },
    { word: "一目", meaning: "a glance, a look, a glimpse", romaji: "ichimoku" },
    { word: "一様", meaning: "uniform, similar, equal", romaji: "ichiyō" },
    { word: "一律", meaning: "even, uniform, equal", romaji: "ichiritsu" },
    { word: "一連", meaning: "a series, a chain, a ream (of paper)", romaji: "ichiren" },
    { word: "一括", meaning: "all together, batch", romaji: "ikkatsu" },
    { word: "一気", meaning: "at one push, in one gulp", romaji: "ikki" },
    { word: "一挙に", meaning: "at a stroke, with a single swoop", romaji: "ikkyoni" },
    { word: "一見", meaning: "a look, a glimpse, glance; first meeting", romaji: "ikken" },
    { word: "一切", meaning: "without exception, the whole", romaji: "issai" },
    { word: "一心", meaning: "one mind, with rapt attention", romaji: "isshin" },
    { word: "いっそ", meaning: "rather, sooner, might as well", romaji: "isso" },
    { word: "一変", meaning: "complete change", romaji: "ippen" },
    { word: "意図", meaning: "intention, aim, design", romaji: "ito" },
    { word: "営む", meaning: "to carry on (e.g., in ceremony), to run a business", romaji: "itonamu" },
    { word: "挑む", meaning: "to challenge", romaji: "idomu" },
    { word: "稲光", meaning: "(flash of) lightning", romaji: "inabikari" },
    { word: "祈り", meaning: "prayer, supplication", romaji: "inori" },
    { word: "いびき", meaning: "snoring", romaji: "ibiki" },
    { word: "今更", meaning: "now, again", romaji: "imasara" },
    { word: "未だ", meaning: "yet, still", romaji: "imada" },
    { word: "移民", meaning: "emigrant, immigrant", romaji: "imin" },
    { word: "嫌々", meaning: "reluctantly, by no means, unwillingly", romaji: "iyaiya" },
    { word: "卑しい", meaning: "greedy, vulgar, shabby", romaji: "iyashī" },
    { word: "いやに", meaning: "awfully, terribly", romaji: "iyani" },
    { word: "いやらしい", meaning: "unpleasant, disgusting, indecent", romaji: "iyarashī" },
    { word: "意欲", meaning: "will, desire, ambition", romaji: "iyoku" },
    { word: "威力", meaning: "power, might, authority", romaji: "iryoku" },
    { word: "衣類", meaning: "clothes, clothing, garments", romaji: "irui" },
    { word: "異論", meaning: "different opinion, objection", romaji: "iron" },
    { word: "印鑑", meaning: "stamp, seal", romaji: "inkan" },
    { word: "陰気", meaning: "gloom, melancholy", romaji: "inki" },
    { word: "隠居", meaning: "retirement; retired person", romaji: "inkyo" },
    { word: "インターチェンジ", meaning: "interchange", romaji: "intāchenji" },
    { word: "インターナショナル", meaning: "international", romaji: "intānashonaru" },
    { word: "インターフォン", meaning: "entry phone, intercom", romaji: "intāfuon" },
    { word: "インテリ", meaning: "(abbr.) egghead, intelligentsia", romaji: "interi" },
    { word: "インフォメーション", meaning: "information", romaji: "infuomēshon" },
    { word: "インフレ", meaning: "(abbr.) inflation", romaji: "infure" },
    { word: "受かる", meaning: "to pass (examination)", romaji: "ukaru" },
    { word: "受け入れ", meaning: "receiving, acceptance", romaji: "ukeire" },
    { word: "受け入れる", meaning: "to accept, to receive", romaji: "ukeireru" },
    { word: "受け継ぐ", meaning: "to inherit, to succeed", romaji: "uketsugu" },
    { word: "受け付ける", meaning: "to be accepted, to receive (an application)", romaji: "uketsukeru" },
    { word: "受け止める", meaning: "to catch, to react to, to take", romaji: "uketomeru" },
    { word: "受身", meaning: "passive, passive voice", romaji: "ukemi" },
    { word: "受持ち", meaning: "charge (of something), matter in one's charge", romaji: "ukemochi" },
    { word: "動き", meaning: "movement, activity, trend", romaji: "ugoki" },
    { word: "埋める", meaning: "to bury, to fill", romaji: "uzumeru" },
    { word: "嘘つき", meaning: "liar", romaji: "usotsuki" },
    { word: "うたた寝", meaning: "dozing, napping", romaji: "utatane" },
    { word: "打ち明ける", meaning: "to confess, to be open", romaji: "uchiakeru" },
    { word: "打ち切る", meaning: "to stop, to abort, to discontinue, to close", romaji: "uchikiru" },
    { word: "打ち消し", meaning: "(gram) negation, denial, negative", romaji: "uchikeshi" },
    { word: "打ち込む", meaning: "to devote oneself to, to shoot into", romaji: "uchikomu" },
    { word: "団扇", meaning: "fan", romaji: "uchiwa" },
    { word: "内訳", meaning: "the items, breakdown, classification", romaji: "uchiwake" },
    { word: "写し", meaning: "copy, duplicate", romaji: "utsushi" },
    { word: "訴え", meaning: "lawsuit, complaint", romaji: "uttae" },
    { word: "うっとうしい", meaning: "weary, annoying", romaji: "uttōshī" },
    { word: "うつむく", meaning: "to look downward, to stoop", romaji: "utsumuku" },
    { word: "空ろ", meaning: "blank, hollow, empty", romaji: "utsuro" },
    { word: "器", meaning: "bowl, vessel, container", romaji: "utsuwa" },
    { word: "腕前", meaning: "ability, skill, facility", romaji: "udemae" },
    { word: "雨天", meaning: "rainy weather", romaji: "uten" },
    { word: "促す", meaning: "to urge, to suggest, to demand", romaji: "unagasu" },
    { word: "うぬぼれ", meaning: "pretension, conceit, hubris", romaji: "unubore" },
    { word: "生まれつき", meaning: "by nature, by birth, native", romaji: "umaretsuki" },
    { word: "埋め込む", meaning: "to embed, implant", romaji: "umekomu" },
    { word: "梅干し", meaning: "dried plum", romaji: "umeboshi" },
    { word: "裏返し", meaning: "inside out, reverse", romaji: "uragaeshi" },
    { word: "売り出し", meaning: "(bargain) sale", romaji: "uridashi" },
    { word: "売り出す", meaning: "to put on sale, to market", romaji: "uridasu" },
    { word: "潤う", meaning: "to be moist; to profit by", romaji: "uruō" },
    { word: "浮気", meaning: "affair, to cheat", romaji: "uwaki" },
    { word: "上回る", meaning: "to exceed", romaji: "uwamawaru" },
    { word: "植わる", meaning: "to be planted", romaji: "uwaru" },
    { word: "運営", meaning: "management, administration, operation", romaji: "un'ei" },
    { word: "うんざり", meaning: "tedious, boring, being fed up with", romaji: "unzari" },
    { word: "運送", meaning: "shipping, freight", romaji: "unsō" },
    { word: "運賃", meaning: "freight rates, shipping expenses, (passenger) fare", romaji: "unchin" },
    { word: "云々", meaning: "and so on, and so forth", romaji: "unnun" },
    { word: "運搬", meaning: "transport, carriage", romaji: "unpan" },
    { word: "運命", meaning: "fate", romaji: "unmei" },
    { word: "運輸", meaning: "transportation", romaji: "un'yu" },
    { word: "運用", meaning: "making use of, application, practical use", romaji: "un'yō" },
    { word: "エアメール", meaning: "air mail", romaji: "eamēru" },
    { word: "～営", meaning: "~ run", romaji: "～ei" },
    { word: "英字", meaning: "English letter (character)", romaji: "eiji" },
    { word: "映写", meaning: "projection", romaji: "eisha" },
    { word: "映像", meaning: "reflection, image", romaji: "eizō" },
    { word: "英雄", meaning: "hero, great man", romaji: "eiyū" },
    { word: "液", meaning: "liquid, fluid", romaji: "eki" },
    { word: "閲覧", meaning: "inspection, reference, browse", romaji: "etsuran" },
    { word: "獲物", meaning: "game, spoils, trophy", romaji: "emono" },
    { word: "襟", meaning: "neck, collar", romaji: "eri" },
    { word: "エレガント", meaning: "elegant", romaji: "ereganto" },
    { word: "円滑", meaning: "harmony, smoothness", romaji: "enkatsu" },
    { word: "縁側", meaning: "veranda, porch, balcony, open corridor", romaji: "engawa" },
    { word: "沿岸", meaning: "coast, shore", romaji: "engan" },
    { word: "婉曲", meaning: "euphemistic, indirect, insinuating", romaji: "enkyoku" },
    { word: "演出", meaning: "production (erg. play, direction)", romaji: "enshutsu" },
    { word: "エンジニア", meaning: "engineer", romaji: "enjinia" },
    { word: "演じる", meaning: "to perform, to play (a part), to act", romaji: "enjiru" },
    { word: "演ずる", meaning: "to perform, to play (a part), to act", romaji: "enzuru" },
    { word: "沿線", meaning: "along railway line", romaji: "ensen" },
    { word: "縁談", meaning: "marriage proposal", romaji: "endan" },
    { word: "遠方", meaning: "long way, distant place", romaji: "enpō" },
    { word: "円満", meaning: "harmony, peace, smoothness", romaji: "enman" },
    { word: "追い込む", meaning: "to herd, to corner, to drive", romaji: "oikomu" },
    { word: "追い出す", meaning: "to expel, to drive out", romaji: "oidasu" },
    { word: "於いて", meaning: "at, in, on", romaji: "oite" },
    { word: "老いる", meaning: "to age, to grow old", romaji: "oiru" },
    { word: "応急", meaning: "emergency", romaji: "ōkyū" },
    { word: "黄金", meaning: "gold", romaji: "ōgon" },
    { word: "往診", meaning: "doctor's visit, house call", romaji: "ōshin" },
    { word: "応募", meaning: "subscription, application", romaji: "ōbo" },
    { word: "おおい (かん)", meaning: "hey", romaji: "ōi (kan)" },
    { word: "大方", meaning: "almost all, majority", romaji: "ōkata" },
    { word: "大柄", meaning: "large build, large pattern", romaji: "ōgara" },
    { word: "おおげさ", meaning: "grandiose, exaggerated", romaji: "ōgesa" },
    { word: "大筋", meaning: "outline, summary", romaji: "ōsuji" },
    { word: "大空", meaning: "heaven, the sky", romaji: "ōzora" },
    { word: "オートマチック", meaning: "automatic", romaji: "ōtomachikku" },
    { word: "大幅", meaning: "full width, large scale, drastic", romaji: "ōhaba" },
    { word: "おおまかな", meaning: "rough, approximate", romaji: "ōmakana" },
    { word: "大水", meaning: "flood", romaji: "ōmizu" },
    { word: "公", meaning: "public", romaji: "ōyake" },
    { word: "犯す", meaning: "to perpetrate, to violate", romaji: "okasu" },
    { word: "侵す", meaning: "to invade, to raid, to trespass", romaji: "okasu" },
    { word: "臆病", meaning: "cowardice, timidity", romaji: "okubyō" },
    { word: "遅らす", meaning: "to retard, to delay", romaji: "okurasu" },
    { word: "厳か", meaning: "majestic, dignified", romaji: "ogosoka" },
    { word: "行い", meaning: "conduct, behavior, action", romaji: "okonai" },
    { word: "おごる (ゆうしょくを～)", meaning: "to give (someone) a treat", romaji: "ogoru (yūshokuwo～)" },
    { word: "収まる", meaning: "to settle into; to be obtained", romaji: "osamaru" },
    { word: "納まる", meaning: "to settle into; to be obtained", romaji: "osamaru" },
    { word: "治まる", meaning: "to be at peace, to calm down", romaji: "osamaru" },
    { word: "お産", meaning: "(giving) birth", romaji: "osan" },
    { word: "押し切る", meaning: "to have one's own way", romaji: "oshikiru" },
    { word: "押し込む", meaning: "to push into, to crowd into", romaji: "oshikomu" },
    { word: "惜しむ", meaning: "to be frugal, to value, to regret", romaji: "oshimu" },
    { word: "押し寄せる", meaning: "to push aside, to advance on", romaji: "oshiyoseru" },
    { word: "雄", meaning: "male (animal)", romaji: "osu" },
    { word: "御世辞", meaning: "flattery, compliment", romaji: "oseji" },
    { word: "襲う", meaning: "to attack", romaji: "osō" },
    { word: "遅くとも", meaning: "at the latest", romaji: "osokutomo" },
    { word: "恐れ", meaning: "fear, horror", romaji: "osore" },
    { word: "恐れ入る", meaning: "to be filled with awe, to feel small", romaji: "osoreiru" },
    { word: "おだてる", meaning: "to flatter", romaji: "odateru" },
    { word: "落ち込む", meaning: "to get depressed", romaji: "ochikomu" },
    { word: "落ち着き", meaning: "calm, composure", romaji: "ochitsuki" },
    { word: "落葉", meaning: "fallen leaves", romaji: "ochiba" },
    { word: "乙", meaning: "2nd in rank", romaji: "otsu" },
    { word: "お使い", meaning: "errand", romaji: "otsukai" },
    { word: "おっかない", meaning: "frightening, scary", romaji: "okkanai" },
    { word: "お手上げ", meaning: "given in, given up hope", romaji: "oteage" },
    { word: "おどおど", meaning: "coweringly, hesitantly", romaji: "odōdo" },
    { word: "脅す", meaning: "to threaten, to menace", romaji: "odosu" },
    { word: "訪れる", meaning: "to visit", romaji: "otozureru" },
    { word: "お供", meaning: "attendant, companion", romaji: "otomo" },
    { word: "衰える", meaning: "to become weak, to decline", romaji: "otoroeru" },
    { word: "同い年", meaning: "of the same age", romaji: "onaidoshi" },
    { word: "自ずから", meaning: "naturally, as a matter of course", romaji: "onozukara" },
    { word: "怯える", meaning: "to become frightened", romaji: "obieru" },
    { word: "おびただしい", meaning: "abundantly, innumerably", romaji: "obitadashī" },
    { word: "脅かす", meaning: "to threaten, to coerce", romaji: "obiyakasu" },
    { word: "帯びる", meaning: "to bear, to carry, to be entrusted", romaji: "obiru" },
    { word: "お袋", meaning: "mother", romaji: "ofukuro" },
    { word: "覚え", meaning: "memory, sense, experience", romaji: "oboe" },
    { word: "おまけ", meaning: "a discount; something additional", romaji: "omake" },
    { word: "お宮", meaning: "Shinto shrine", romaji: "omiya" },
    { word: "おむつ", meaning: "diaper, nappy", romaji: "omutsu" },
    { word: "思い付き", meaning: "plan, idea, suggestion", romaji: "omoitsuki" },
    { word: "趣", meaning: "flavor, appearance, quaint", romaji: "omomuki" },
    { word: "赴く", meaning: "to go, to proceed", romaji: "omomuku" },
    { word: "重んじる", meaning: "to respect, to honor, to esteem, to prize", romaji: "omonjiru" },
    { word: "重んずる", meaning: "to honor, to respect, to value", romaji: "omonzuru" },
    { word: "親父", meaning: "one's father, old man, one's boss", romaji: "oyaji" },
    { word: "及び", meaning: "and, as well as", romaji: "oyobi" },
    { word: "及ぶ", meaning: "to reach, to extend", romaji: "oyobu" },
    { word: "折", meaning: "chance, occasion", romaji: "ori" },
    { word: "檻", meaning: "cage, pen, jail cell", romaji: "ori" },
    { word: "オリエンテーション", meaning: "orientation", romaji: "orientēshon" },
    { word: "折り返す", meaning: "to turn up, to fold back", romaji: "orikaesu" },
    { word: "織物", meaning: "textile, fabric", romaji: "orimono" },
    { word: "俺", meaning: "I (ego) (boastful first-person pronoun)", romaji: "ore" },
    { word: "愚か", meaning: "foolish, stupid", romaji: "oroka" },
    { word: "おろそか", meaning: "neglect, negligence, carelessness", romaji: "orosoka" },
    { word: "おんぶ", meaning: "carrying on one's back (erg. Baby)", romaji: "onbu" },
    { word: "オンライン", meaning: "on-line", romaji: "onrain" },
    { word: "温和", meaning: "gentle, mild, moderate", romaji: "onwa" },
    { word: "我", meaning: "ego", romaji: "ga～" },
    { word: "カーペット", meaning: "carpet", romaji: "kāpetto" },
    { word: "～界", meaning: "world, circle, kingdom", romaji: "～kai" },
    { word: "～街", meaning: "town", romaji: "～gai" },
    { word: "改悪", meaning: "deterioration, changing for the worse", romaji: "kaiaku" },
    { word: "海運", meaning: "marine transportation", romaji: "kaiun" },
    { word: "外貨", meaning: "foreign money", romaji: "gaika" },
    { word: "改革", meaning: "reform, reformation, innovation", romaji: "kaikaku" },
    { word: "貝殻", meaning: "shell", romaji: "kaigara" },
    { word: "外観", meaning: "appearance, exterior, facade", romaji: "gaikan" },
    { word: "階級", meaning: "class, rank, grade", romaji: "kaikyū" },
    { word: "海峡", meaning: "channel", romaji: "kaikyō" },
    { word: "会見", meaning: "interview, conference", romaji: "kaiken" },
    { word: "介護", meaning: "nursing", romaji: "kaigo" },
    { word: "開催", meaning: "holding a meeting, open an exhibition", romaji: "kaisai" },
    { word: "回収", meaning: "collection, recovery", romaji: "kaishū" },
    { word: "改修", meaning: "repair, improvement", romaji: "kaishū" },
    { word: "怪獣", meaning: "monster", romaji: "kaijū" },
    { word: "解除", meaning: "cancellation, release, cancel", romaji: "kaijo" },
    { word: "外相", meaning: "Foreign Minister", romaji: "gaishō" },
    { word: "害する", meaning: "to harm, to offend", romaji: "gaisuru" },
    { word: "概説", meaning: "general statement, outline", romaji: "gaisetsu" },
    { word: "回送", meaning: "forwarding", romaji: "kaisō" },
    { word: "階層", meaning: "class, level, stratum, hierarchy", romaji: "kaisō" },
    { word: "開拓", meaning: "cultivation, pioneer", romaji: "kaitaku" },
    { word: "会談", meaning: "conversation, interview", romaji: "kaidan" },
    { word: "改定", meaning: "reform", romaji: "kaitei" },
    { word: "改訂", meaning: "revision", romaji: "kaitei" },
    { word: "ガイド", meaning: "guide", romaji: "gaido" },
    { word: "街道", meaning: "highway", romaji: "kaidō" },
    { word: "該当", meaning: "corresponding, answering to, coming under", romaji: "gaitō" },
    { word: "街頭", meaning: "in the street", romaji: "gaitō" },
    { word: "ガイドブック", meaning: "guidebook", romaji: "gaidobukku" },
    { word: "介入", meaning: "intervention", romaji: "kainyū" },
    { word: "概念", meaning: "general idea, concept, notion", romaji: "gainen" },
    { word: "開発", meaning: "development, exploitation", romaji: "kaihatsu" },
    { word: "海抜", meaning: "height above sea level", romaji: "kaibatsu" },
    { word: "介抱", meaning: "nursing, looking after", romaji: "kaihō" },
    { word: "解剖", meaning: "dissection, autopsy", romaji: "kaibō" },
    { word: "外来", meaning: "(abbr.) imported, outpatient clinic", romaji: "gairai" },
    { word: "回覧", meaning: "circulation", romaji: "kairan" },
    { word: "概略", meaning: "outline, summary, gist", romaji: "gairyaku" },
    { word: "海流", meaning: "ocean current", romaji: "kairyū" },
    { word: "改良", meaning: "improvement, reform", romaji: "kairyō" },
    { word: "回路", meaning: "circuit (electric)", romaji: "kairo" },
    { word: "海路", meaning: "sea route", romaji: "kairo" },
    { word: "省みる", meaning: "to reflect", romaji: "kaerimiru" },
    { word: "顧みる", meaning: "to look back, to turn around, to review", romaji: "kaerimiru" },
    { word: "顔付き", meaning: "facial expression", romaji: "kaotsuki" },
    { word: "課外", meaning: "extracurricular", romaji: "kagai" },
    { word: "掲げる", meaning: "to hoist, to fly (a sail), to float (a flag)", romaji: "kakageru" },
    { word: "かかと", meaning: "shoe heel", romaji: "kakato" },
    { word: "書き取る", meaning: "to write down, to take dictation", romaji: "kakitoru" },
    { word: "掻き回す", meaning: "to stir up, to churn, to disturb", romaji: "kakimawasu" },
    { word: "かく (はじを)", meaning: "to humiliate oneself", romaji: "kaku (hajiwo)" },
    { word: "～画", meaning: "~ strokes", romaji: "～kaku" },
    { word: "学芸", meaning: "arts and sciences, liberal arts", romaji: "gakugei" },
    { word: "格差", meaning: "difference, disparity", romaji: "kakusa" },
    { word: "拡散", meaning: "scattering, diffusion", romaji: "kakusan" },
    { word: "学士", meaning: "university graduate", romaji: "gakushi" },
    { word: "各種", meaning: "every kind, all sorts", romaji: "kakushu" },
    { word: "隔週", meaning: "every other week", romaji: "kakushū" },
    { word: "確信", meaning: "conviction, confidence", romaji: "kakushin" },
    { word: "革新", meaning: "reform, innovation", romaji: "kakushin" },
    { word: "学説", meaning: "theory", romaji: "gakusetsu" },
    { word: "確定", meaning: "fixed, decision", romaji: "kakutei" },
    { word: "カクテル", meaning: "cocktail", romaji: "kakuteru" },
    { word: "獲得", meaning: "acquisition, possession", romaji: "kakutoku" },
    { word: "楽譜", meaning: "score (music, sheet music)", romaji: "gakufu" },
    { word: "確保", meaning: "guarantee, insure, secure", romaji: "kakuho" },
    { word: "革命", meaning: "revolution", romaji: "kakumei" },
    { word: "確立", meaning: "establishment", romaji: "kakuritsu" },
    { word: "賭", meaning: "betting, gambling, a gamble", romaji: "kake" },
    { word: "掛～", meaning: "credit", romaji: "kake～" },
    { word: "～掛け", meaning: "rack, hanger", romaji: "～kake" },
    { word: "崖", meaning: "cliff", romaji: "gake" },
    { word: "駆け足", meaning: "running fast, double time", romaji: "kakeashi" },
    { word: "家計", meaning: "household economy, family finances", romaji: "kakei" },
    { word: "駆けっこ", meaning: "(foot) race", romaji: "kakekko" },
    { word: "加工", meaning: "manufacturing, processing, treatment", romaji: "kakō" },
    { word: "化合", meaning: "chemical combination", romaji: "kagō" },
    { word: "かさばる", meaning: "to be bulky", romaji: "kasabaru" },
    { word: "かさむ", meaning: "to pile up, to increase", romaji: "kasamu" },
    { word: "箇条書", meaning: "itemized form, itemization", romaji: "kajōgaki" },
    { word: "頭", meaning: "head, chief", romaji: "kashira" },
    { word: "微か", meaning: "faint, dim, weak", romaji: "kasuka" },
    { word: "霞む", meaning: "to grow hazy, to be misty", romaji: "kasumu" },
    { word: "擦る", meaning: "to rub, to chafe", romaji: "kasuru" },
    { word: "火星", meaning: "Mars", romaji: "kasei" },
    { word: "化石", meaning: "fossil, petrifaction, fossilization", romaji: "kaseki" },
    { word: "河川", meaning: "rivers", romaji: "kasen" },
    { word: "化繊", meaning: "synthetic fibers", romaji: "kasen" },
    { word: "過疎", meaning: "depopulation", romaji: "kaso" },
    { word: "片～", meaning: "single ~", romaji: "kata～" },
    { word: "片言", meaning: "broken (in reference to speaking style, e.g., Japanese)", romaji: "katakoto" },
    { word: "傾ける", meaning: "to incline, to tilt, to bend", romaji: "katamukeru" },
    { word: "固める", meaning: "to harden, to freeze, to fortify", romaji: "katameru" },
    { word: "傍ら", meaning: "beside(s, while, nearby", romaji: "katawara" },
    { word: "花壇", meaning: "flower bed", romaji: "kadan" },
    { word: "家畜", meaning: "domestic animals, livestock, cattle", romaji: "kachiku" },
    { word: "且つ", meaning: "yet, and", romaji: "katsu" },
    { word: "がっくり", meaning: "heartbroken", romaji: "gakkuri" },
    { word: "合唱", meaning: "chorus, singing in a chorus", romaji: "gasshō" },
    { word: "がっしり", meaning: "firmly, solidly, tough", romaji: "gasshiri" },
    { word: "合致", meaning: "agreement, concurrence, conforming to", romaji: "gatchi" },
    { word: "がっちり", meaning: "solidly built, tightly", romaji: "gatchiri" },
    { word: "かつて", meaning: "once, before, formerly", romaji: "katsute" },
    { word: "勝手", meaning: "kitchen; one's way, selfishness", romaji: "katte" },
    { word: "カット", meaning: "cut, cutting", romaji: "katto" },
    { word: "活発", meaning: "vigor, active", romaji: "kappatsu" },
    { word: "合併", meaning: "combination, amalgamation, merger", romaji: "gappei" },
    { word: "カテゴリー", meaning: "category", romaji: "kategorī" },
    { word: "叶う", meaning: "to come true", romaji: "kanau" },
    { word: "叶える", meaning: "to grant (request, wish)", romaji: "kanaeru" },
    { word: "金槌", meaning: "(iron) hammer", romaji: "kanazuchi" },
    { word: "かなわない", meaning: "be beyond one's power, be unable", romaji: "kanawanai" },
    { word: "加入", meaning: "becoming a member, admission", romaji: "kanyū" },
    { word: "予て", meaning: "previously, already, lately", romaji: "kanete" },
    { word: "庇う", meaning: "to protect someone, to&nbsp;&nbsp;cover up for someone", romaji: "kabau" },
    { word: "株式", meaning: "stock", romaji: "kabushiki" },
    { word: "かぶれる", meaning: "to react to; to be influenced by", romaji: "kabureru" },
    { word: "花粉", meaning: "pollen", romaji: "kafun" },
    { word: "貨幣", meaning: "money, currency, coinage", romaji: "kahei" },
    { word: "構える", meaning: "to set up", romaji: "kamaeru" },
    { word: "過密", meaning: "crowded", romaji: "kamitsu" },
    { word: "噛み切る", meaning: "to bite off, to gnaw through", romaji: "kamikiru" },
    { word: "カムバック", meaning: "comeback", romaji: "kamubakku" },
    { word: "カメラマン", meaning: "cameraman", romaji: "kameraman" },
    { word: "粥", meaning: "rice porridge", romaji: "kayu" },
    { word: "体付き", meaning: "body build, figure", romaji: "karadatsuki" },
    { word: "絡む", meaning: "to entangle, to entwine", romaji: "karamu" },
    { word: "かりに", meaning: "temporarily; if, for argument's sake", romaji: "karini" },
    { word: "カルテ", meaning: "clinical records (GER: Karte)", romaji: "karute" },
    { word: "ガレージ", meaning: "garage (at house)", romaji: "garēji" },
    { word: "過労", meaning: "overwork, strain", romaji: "karō" },
    { word: "かろうじて", meaning: "barely, narrowly", romaji: "karōjite" },
    { word: "交す", meaning: "to exchange", romaji: "kawasu" },
    { word: "代る代る", meaning: "alternately", romaji: "kawarugawaru" },
    { word: "簡易", meaning: "simplicity, easiness, quasi-", romaji: "kan'i" },
    { word: "灌漑", meaning: "irrigation", romaji: "kangai" },
    { word: "眼科", meaning: "ophthalmology", romaji: "ganka" },
    { word: "眼球", meaning: "eyeball", romaji: "gankyū" },
    { word: "玩具", meaning: "toy", romaji: "gangu" },
    { word: "簡潔", meaning: "brevity, concise, simple", romaji: "kanketsu" },
    { word: "還元", meaning: "resolution, reduction, return", romaji: "kangen" },
    { word: "看護", meaning: "nursing", romaji: "kango" },
    { word: "漢語", meaning: "Chinese word, Sino-Japanese word", romaji: "kango" },
    { word: "頑固", meaning: "stubbornness, obstinacy", romaji: "ganko" },
    { word: "勧告", meaning: "advice, counsel", romaji: "kankoku" },
    { word: "換算", meaning: "conversion, change, exchange", romaji: "kansan" },
    { word: "監視", meaning: "observation, guarding, surveillance", romaji: "kanshi" },
    { word: "慣習", meaning: "usual (historical) custom", romaji: "kanshū" },
    { word: "観衆", meaning: "spectators, audience", romaji: "kanshū" },
    { word: "願書", meaning: "application form", romaji: "gansho" },
    { word: "干渉", meaning: "interference, intervention", romaji: "kanshō" },
    { word: "頑丈", meaning: "solid, firm, strong", romaji: "ganjō" },
    { word: "感触", meaning: "sense of touch, feeling, sensation", romaji: "kanshoku" },
    { word: "肝心", meaning: "essential, fundamental, crucial", romaji: "kanjin" },
    { word: "肝腎", meaning: "essential, fundamental, crucial", romaji: "kanjin" },
    { word: "関税", meaning: "customs, duty, tariff", romaji: "kanzei" },
    { word: "岩石", meaning: "rock", romaji: "ganseki" },
    { word: "感染", meaning: "infection, contagion", romaji: "kansen" },
    { word: "幹線", meaning: "main line, trunk line", romaji: "kansen" },
    { word: "簡素", meaning: "simplicity, plain", romaji: "kanso" },
    { word: "観点", meaning: "point of view", romaji: "kanten" },
    { word: "感度", meaning: "sensitivity, severity (quake)", romaji: "kando" },
    { word: "カンニング", meaning: "cunning, cheat", romaji: "kanningu" },
    { word: "元年", meaning: "first year (of a specific reign)", romaji: "gannen" },
    { word: "幹部", meaning: "management, executive", romaji: "kanbu" },
    { word: "完ぺき", meaning: "perfection, completeness, flawless", romaji: "kanpeki" },
    { word: "勘弁", meaning: "pardon, forgiveness, forbearance", romaji: "kanben" },
    { word: "感無量", meaning: "deep feeling, filled with emotion", romaji: "kanmuryō" },
    { word: "勧誘", meaning: "invitation, canvassing, inducement", romaji: "kan'yū" },
    { word: "関与", meaning: "participation, taking part in", romaji: "kan'yo" },
    { word: "寛容", meaning: "forbearance, tolerance, generosity, involvement", romaji: "kan'yō" },
    { word: "元来", meaning: "originally, naturally", romaji: "ganrai" },
    { word: "観覧", meaning: "viewing", romaji: "kanran" },
    { word: "慣例", meaning: "custom, precedent, of convention", romaji: "kanrei" },
    { word: "還暦", meaning: "60th birthday", romaji: "kanreki" },
    { word: "貫禄", meaning: "presence, dignity", romaji: "kanroku" },
    { word: "緩和", meaning: "relief, mitigation", romaji: "kanwa" },
    { word: "議案", meaning: "legislative bill", romaji: "gian" },
    { word: "危害", meaning: "injury, harm, danger", romaji: "kigai" },
    { word: "企画", meaning: "planning, project", romaji: "kikaku" },
    { word: "規格", meaning: "standard, norm", romaji: "kikaku" },
    { word: "着飾る", meaning: "to dress up", romaji: "kikazaru" },
    { word: "気兼ね", meaning: "hesitance, diffidence, feeling constraint", romaji: "kigane" },
    { word: "気軽", meaning: "cheerful, buoyant, lighthearted", romaji: "kigaru" },
    { word: "危機", meaning: "crisis", romaji: "kiki" },
    { word: "聞き取り", meaning: "listening comprehension", romaji: "kikitori" },
    { word: "効き目", meaning: "effect, virtue, efficacy", romaji: "kikime" },
    { word: "帰京", meaning: "returning to Tokyo", romaji: "kikyō" },
    { word: "戯曲", meaning: "play, drama", romaji: "gikyoku" },
    { word: "基金", meaning: "fund, foundation", romaji: "kikin" },
    { word: "喜劇", meaning: "comedy, funny show", romaji: "kigeki" },
    { word: "議決", meaning: "resolution, decision, vote", romaji: "giketsu" },
    { word: "棄権", meaning: "abstain from voting, renunciation of a right", romaji: "kiken" },
    { word: "既婚", meaning: "married", romaji: "kikon" },
    { word: "気障", meaning: "affectation, conceit, snobbery", romaji: "kiza" },
    { word: "記載", meaning: "mention, entry", romaji: "kisai" },
    { word: "兆", meaning: "sign, omen, indication", romaji: "kizashi" },
    { word: "気質", meaning: "character, trait, temperament", romaji: "kishitsu" },
    { word: "期日", meaning: "fixed date, settlement date", romaji: "kijitsu" },
    { word: "きしむ", meaning: "to jar, to creak, to grate", romaji: "kishimu" },
    { word: "議事堂", meaning: "Diet building", romaji: "gijidō" },
    { word: "記述", meaning: "describing, descriptor", romaji: "kijutsu" },
    { word: "気象", meaning: "weather, climate", romaji: "kishō" },
    { word: "傷付く", meaning: "to be hurt, to be wounded, to get injured", romaji: "kizutsuku" },
    { word: "傷付ける", meaning: "to wound, to hurt someone's feelings", romaji: "kizutsukeru" },
    { word: "犠牲", meaning: "sacrifice", romaji: "gisei" },
    { word: "汽船", meaning: "steamship", romaji: "kisen" },
    { word: "寄贈", meaning: "donation, presentation", romaji: "kizō" },
    { word: "偽造", meaning: "forgery, fabrication, counterfeiting", romaji: "gizō" },
    { word: "貴族", meaning: "noble, aristocrat", romaji: "kizoku" },
    { word: "議題", meaning: "topic of discussion, agenda", romaji: "gidai" },
    { word: "鍛える", meaning: "to forge, to train, to discipline", romaji: "kitaeru" },
    { word: "気立て", meaning: "good-natured, kind-hearted", romaji: "kidate" },
    { word: "来る", meaning: "to come, to approach,", romaji: "kitaru" },
    { word: "きちっと", meaning: "exactly, perfectly", romaji: "kichitto" },
    { word: "几帳面", meaning: "methodical, punctual, steady", romaji: "kichōmen" },
    { word: "きっかり", meaning: "exactly, precisely", romaji: "kikkari" },
    { word: "きっちり", meaning: "precisely, tightly", romaji: "kitchiri" },
    { word: "きっぱり", meaning: "clearly, plainly, distinctly", romaji: "kippari" },
    { word: "規定", meaning: "regulation, provisions", romaji: "kitei" },
    { word: "起点", meaning: "starting point", romaji: "kiten" },
    { word: "軌道", meaning: "orbit; track", romaji: "kidō" },
    { word: "技能", meaning: "technical skill, ability, capacity", romaji: "ginō" },
    { word: "規範", meaning: "model, standard, example", romaji: "kihan" },
    { word: "気品", meaning: "grace, elegance", romaji: "kihin" },
    { word: "気風", meaning: "character, traits, ethos", romaji: "kifū" },
    { word: "起伏", meaning: "undulation", romaji: "kifuku" },
    { word: "規模", meaning: "scale, scope, plan, structure", romaji: "kibo" },
    { word: "気まぐれ", meaning: "whim, caprice, uneven temper", romaji: "kimagure" },
    { word: "生真面目", meaning: "serious, sincerity", romaji: "kimajime" },
    { word: "期末", meaning: "(end of the season or term)", romaji: "kimatsu" },
    { word: "きまりわるい", meaning: "feeling awkward, being ashamed", romaji: "kimariwarui" },
    { word: "記名", meaning: "signature, register", romaji: "kimei" },
    { word: "規約", meaning: "agreement, rules, code", romaji: "kiyaku" },
    { word: "脚色", meaning: "dramatization (e.g., film", romaji: "kyakushoku" },
    { word: "逆転", meaning: "(sudden) change, reversal, turn-around", romaji: "gyakuten" },
    { word: "脚本", meaning: "scenario", romaji: "kyakuhon" },
    { word: "華奢", meaning: "delicate, slender", romaji: "kyasha" },
    { word: "客観", meaning: "objective", romaji: "kyakkan" },
    { word: "キャッチ", meaning: "catch", romaji: "kyatchi" },
    { word: "キャリア", meaning: "career, career government employee", romaji: "kyaria" },
    { word: "救援", meaning: "relief, rescue, reinforcement", romaji: "kyūen" },
    { word: "休学", meaning: "temporary absence from school, suspension", romaji: "kyūgaku" },
    { word: "究極", meaning: "ultimate, final, eventual", romaji: "kyūkyoku" },
    { word: "窮屈", meaning: "narrow, tight, formal", romaji: "kyūkutsu" },
    { word: "球根", meaning: "(plant) bulb", romaji: "kyūkon" },
    { word: "救済", meaning: "relief, aid, rescue", romaji: "kyūsai" },
    { word: "給仕", meaning: "waiter", romaji: "kyūji" },
    { word: "給食", meaning: "school lunch, providing a meal", romaji: "kyūshoku" },
    { word: "休戦", meaning: "truce, armistice", romaji: "kyūsen" },
    { word: "宮殿", meaning: "palace", romaji: "kyūden" },
    { word: "旧知", meaning: "old friend, old friendship", romaji: "kyūchi" },
    { word: "窮乏", meaning: "poverty", romaji: "kyūbō" },
    { word: "寄与", meaning: "contribution, service", romaji: "kiyo" },
    { word: "強", meaning: "strong", romaji: "kyō" },
    { word: "～狂", meaning: "maniac, fan, freak", romaji: "～kyō" },
    { word: "驚異", meaning: "wonder, miracle", romaji: "kyōi" },
    { word: "教科", meaning: "subject, curriculum", romaji: "kyōka" },
    { word: "協会", meaning: "association, society, organization", romaji: "kyōkai" },
    { word: "共学", meaning: "coeducation", romaji: "kyōgaku" },
    { word: "共感", meaning: "sympathy, response", romaji: "kyōkan" },
    { word: "境遇", meaning: "environment, circumstances", romaji: "kyōgū" },
    { word: "教訓", meaning: "lesson, precept, moral instruction", romaji: "kyōkun" },
    { word: "強行", meaning: "forcing, enforcement", romaji: "kyōkō" },
    { word: "強硬", meaning: "firm, vigorous, stubborn", romaji: "kyōkō" },
    { word: "教材", meaning: "teaching materials", romaji: "kyōzai" },
    { word: "凶作", meaning: "bad harvest, poor crop", romaji: "kyōsaku" },
    { word: "業者", meaning: "trader, merchant", romaji: "gyōsha" },
    { word: "教習", meaning: "training, instruction", romaji: "kyōshū" },
    { word: "郷愁", meaning: "nostalgia, homesickness", romaji: "kyōshū" },
    { word: "教職", meaning: "teaching profession", romaji: "kyōshoku" },
    { word: "興じる", meaning: "to amuse oneself, to make merry", romaji: "kyōjiru" },
    { word: "強制", meaning: "obligation, compulsion, enforcement", romaji: "kyōsei" },
    { word: "行政", meaning: "administration", romaji: "gyōsei" },
    { word: "業績", meaning: "achievement, work, contribution", romaji: "gyōseki" },
    { word: "共存", meaning: "coexistence", romaji: "kyōzon" },
    { word: "協定", meaning: "arrangement, pact, agreement", romaji: "kyōtei" },
    { word: "郷土", meaning: "homeland", romaji: "kyōdo" },
    { word: "脅迫", meaning: "threat, coercion", romaji: "kyōhaku" },
    { word: "業務", meaning: "business, duties, work", romaji: "gyōmu" },
    { word: "共鳴", meaning: "resonance, sympathy", romaji: "kyōmei" },
    { word: "郷里", meaning: "birth-place, home town", romaji: "kyōri" },
    { word: "強烈", meaning: "strong, intense, severe", romaji: "kyōretsu" },
    { word: "共和", meaning: "republicanism, cooperation", romaji: "kyōwa" },
    { word: "局限", meaning: "limit, localize", romaji: "kyokugen" },
    { word: "極端", meaning: "extreme, extremity", romaji: "kyokutan" },
    { word: "居住", meaning: "residence", romaji: "kyojū" },
    { word: "拒絶", meaning: "refusal, rejection", romaji: "kyozetsu" },
    { word: "漁船", meaning: "fishing boat", romaji: "gyosen" },
    { word: "漁村", meaning: "fishing village", romaji: "gyoson" },
    { word: "拒否", meaning: "denial, rejection, refusal", romaji: "kyohi" },
    { word: "許容", meaning: "permission, pardon", romaji: "kyoyō" },
    { word: "清らか", meaning: "clean, pure, chaste", romaji: "kiyoraka" },
    { word: "きらびやか", meaning: "gorgeous, gaudy, dazzling", romaji: "kirabiyaka" },
    { word: "～きり", meaning: "only", romaji: "～kiri" },
    { word: "義理", meaning: "debt of gratitude, obligation", romaji: "giri" },
    { word: "切替", meaning: "exchange, conversion, switchover", romaji: "kirikae" },
    { word: "気流", meaning: "atmospheric current", romaji: "kiryū" },
    { word: "切れ目", meaning: "break, pause, gap", romaji: "kireme" },
    { word: "疑惑", meaning: "doubt, misgivings, suspicion", romaji: "giwaku" },
    { word: "極めて", meaning: "exceedingly, extremely (written expression)", romaji: "kiwamete" },
    { word: "近眼", meaning: "nearsightedness", romaji: "kingan" },
    { word: "緊急", meaning: "urgent, pressing, emergency", romaji: "kinkyū" },
    { word: "近郊", meaning: "suburbs, outskirts", romaji: "kinkō" },
    { word: "均衡", meaning: "equilibrium, balance", romaji: "kinkō" },
    { word: "禁じる", meaning: "to prohibit", romaji: "kinjiru" },
    { word: "勤勉", meaning: "industry, diligence", romaji: "kinben" },
    { word: "吟味", meaning: "examination, careful investigation", romaji: "ginmi" },
    { word: "勤務", meaning: "service, duty, work", romaji: "kinmu" },
    { word: "禁物", meaning: "taboo, forbidden thing", romaji: "kinmotsu" },
    { word: "勤労", meaning: "labor, exertion, diligent service", romaji: "kinrō" },
    { word: "クイズ", meaning: "quiz", romaji: "kuizu" },
    { word: "食い違う", meaning: "to cross each other, to differ", romaji: "kuichigau" },
    { word: "空間", meaning: "space, room, airspace", romaji: "kūkan" },
    { word: "空腹", meaning: "hunger", romaji: "kūfuku" },
    { word: "区画", meaning: "division, section, area", romaji: "kukaku" },
    { word: "区間", meaning: "section", romaji: "kukan" },
    { word: "茎", meaning: "stalk", romaji: "kuki" },
    { word: "区切り", meaning: "an end, a stop, punctuation", romaji: "kugiri" },
    { word: "くぐる", meaning: "to pass through; to go around", romaji: "kuguru" },
    { word: "くじ (～をひく)", meaning: "lottery, lot", romaji: "kuji (～wohiku)" },
    { word: "くじびき", meaning: "lottery, drawn lot", romaji: "kujibiki" },
    { word: "くすぐったい", meaning: "ticklish", romaji: "kusuguttai" },
    { word: "愚痴", meaning: "idle complaint, grumble", romaji: "guchi" },
    { word: "口吟む", meaning: "to humble", romaji: "kuchizusamu" },
    { word: "嘴", meaning: "beak, bill", romaji: "kuchibashi" },
    { word: "朽ちる", meaning: "to rot", romaji: "kuchiru" },
    { word: "覆す", meaning: "to overturn, to upset, to overthrow", romaji: "kutsugaesu" },
    { word: "くっきり", meaning: "distinctly, clearly, boldly", romaji: "kukkiri" },
    { word: "屈折", meaning: "bending, indentation, refraction", romaji: "kussetsu" },
    { word: "ぐっと", meaning: "firmly, fast, more", romaji: "gutto" },
    { word: "首飾り", meaning: "necklace", romaji: "kubikazari" },
    { word: "首輪", meaning: "necklace, choker", romaji: "kubiwa" },
    { word: "組み込む", meaning: "to insert, to include, to cut in (printing)", romaji: "kumikomu" },
    { word: "組み合わせる", meaning: "to join together, to combine, to join up", romaji: "kumiawaseru" },
    { word: "蔵", meaning: "warehouse, cellar", romaji: "kura" },
    { word: "グレー", meaning: "grey, gray", romaji: "gurē" },
    { word: "クレーン", meaning: "crane", romaji: "kurēn" },
    { word: "玄人", meaning: "expert, professional", romaji: "kurōto" },
    { word: "黒字", meaning: "balance (figure) in the black", romaji: "kuroji" },
    { word: "軍艦", meaning: "warship, battleship", romaji: "gunkan" },
    { word: "軍事", meaning: "military affairs", romaji: "gunji" },
    { word: "君主", meaning: "ruler, monarch", romaji: "kunshu" },
    { word: "群集", meaning: "(social) group, crowd, mob", romaji: "gunshū" },
    { word: "群衆", meaning: "(social) group, crowd, mob", romaji: "gunshū" },
    { word: "軍備", meaning: "armaments, military preparations", romaji: "gunbi" },
    { word: "軍服", meaning: "military or naval uniform", romaji: "gunpuku" },
    { word: "芸", meaning: "art, accomplishment, performance", romaji: "gei" },
    { word: "経過", meaning: "passage, progress", romaji: "keika" },
    { word: "軽快", meaning: "lively, casual, light", romaji: "keikai" },
    { word: "警戒", meaning: "warning, admonition, vigilance", romaji: "keikai" },
    { word: "敬具", meaning: "Sincerely (used at the end of letter)", romaji: "keigu" },
    { word: "軽減", meaning: "reduction, lessening", romaji: "keigen" },
    { word: "掲載", meaning: "appearance (e.g., article in paper)", romaji: "keisai" },
    { word: "傾斜", meaning: "inclination, slope, dip", romaji: "keisha" },
    { word: "形成", meaning: "formation", romaji: "keisei" },
    { word: "形勢", meaning: "condition, situation, prospects", romaji: "keisei" },
    { word: "軽率", meaning: "thoughtless, careless, hasty", romaji: "keisotsu" },
    { word: "刑罰", meaning: "judgment, penalty, punishment", romaji: "keibatsu" },
    { word: "経費", meaning: "expenses, cost, outlay", romaji: "keihi" },
    { word: "警部", meaning: "police inspector", romaji: "keibu" },
    { word: "転換", meaning: "convert, divert", romaji: "tenkan" },
    { word: "転居", meaning: "moving, changing residence", romaji: "tenkyo" },
    { word: "転勤", meaning: "transfer (to another office of a company)", romaji: "tenkin" },
    { word: "点検", meaning: "inspection, examination, checking", romaji: "tenken" },
    { word: "電源", meaning: "source of electricity, power (e.g., button on TV)", romaji: "dengen" },
    { word: "天国", meaning: "paradise, heaven, Kingdom of Heaven", romaji: "tengoku" },
    { word: "天才", meaning: "a genius", romaji: "tensai" },
    { word: "天災", meaning: "natural calamity, disaster", romaji: "tensai" },
    { word: "展示", meaning: "exhibition, display", romaji: "tenji" },
    { word: "伝説", meaning: "tradition, legend, folklore", romaji: "densetsu" },
    { word: "点線", meaning: "dotted line", romaji: "tensen" },
    { word: "転じる", meaning: "to turn, to shift", romaji: "tenjiru" },
    { word: "転ずる", meaning: "to turn, to shift", romaji: "tenzuru" },
    { word: "天体", meaning: "heavenly body", romaji: "tentai" },
    { word: "伝達", meaning: "transmission (e.g., news, communication, delivery)", romaji: "dentatsu" },
    { word: "天地", meaning: "heaven and earth, the universe", romaji: "tenchi" },
    { word: "てんで", meaning: "(not) at all, altogether, entirely", romaji: "tende" },
    { word: "転任", meaning: "change of post", romaji: "tennin" },
    { word: "展望", meaning: "view, outlook, prospect", romaji: "tenbō" },
    { word: "伝来", meaning: "ancestral, hereditary, imported", romaji: "denrai" },
    { word: "転落", meaning: "fall, degradation", romaji: "tenraku" },
    { word: "問い合わせる", meaning: "to inquire, to seek information", romaji: "toiawaseru" },
    { word: "当～", meaning: "Our ~ (e.g., Hotel, plane, etc.)", romaji: "tō～" },
    { word: "胴", meaning: "trunk, body, frame", romaji: "dō" },
    { word: "同意", meaning: "agreement, consent; same meaning", romaji: "dōi" },
    { word: "動員", meaning: "mobilization", romaji: "dōin" },
    { word: "同感", meaning: "agreement, same opinion, same feeling", romaji: "dōkan" },
    { word: "陶器", meaning: "pottery, ceramics", romaji: "tōki" },
    { word: "討議", meaning: "debate, discussion", romaji: "tōgi" },
    { word: "動機", meaning: "motive, incentive", romaji: "dōki" },
    { word: "等級", meaning: "grade, class", romaji: "tōkyū" },
    { word: "同級", meaning: "the same grade, same class", romaji: "dōkyū" },
    { word: "同居", meaning: "living together", romaji: "dōkyo" },
    { word: "登校", meaning: "attendance (at school)", romaji: "tōkō" },
    { word: "統合", meaning: "integration, unification, synthesis", romaji: "tōgō" },
    { word: "動向", meaning: "trend, tendency, movement, attitude", romaji: "dōkō" },
    { word: "投資", meaning: "investment", romaji: "tōshi" },
    { word: "同情", meaning: "sympathy, compassion, sympathize", romaji: "dōjō" },
    { word: "道場", meaning: "(arch) dojo, hall used for martial arts training, mandala", romaji: "dōjō" },
    { word: "統制", meaning: "regulation, control", romaji: "tōsei" },
    { word: "当選", meaning: "being elected, winning the prize", romaji: "tōsen" },
    { word: "逃走", meaning: "flight, desertion, escape", romaji: "tōsō" },
    { word: "統率", meaning: "command, generalship, leadership", romaji: "tōsotsu" },
    { word: "到達", meaning: "reaching, attaining, arrival", romaji: "tōtatsu" },
    { word: "統治", meaning: "rule, reign, governing", romaji: "tōchi" },
    { word: "仕切る", meaning: "to partition, to divide, to mark off", romaji: "shikiru" },
    { word: "資金", meaning: "funds, capital", romaji: "shikin" },
    { word: "軸", meaning: "axis, stem, shaft", romaji: "jiku" },
    { word: "しくじる", meaning: "to fail, to fall through, to blunder", romaji: "shikujiru" },
    { word: "仕組", meaning: "structure, mechanism", romaji: "shikumi" },
    { word: "死刑", meaning: "death penalty", romaji: "shikei" },
    { word: "湿気る", meaning: "to be damp, to be moist", romaji: "shikeru" },
    { word: "施行", meaning: "enforcement, operation", romaji: "shikō" },
    { word: "思考", meaning: "thought", romaji: "shikō" },
    { word: "志向", meaning: "intention, aim", romaji: "shikō" },
    { word: "嗜好", meaning: "taste, liking, preference", romaji: "shikō" },
    { word: "事項", meaning: "matter(s), item(s), facts", romaji: "jikō" },
    { word: "時刻表", meaning: "timetable, (train) schedule", romaji: "jikokuhyō" },
    { word: "地獄", meaning: "hell", romaji: "jigoku" },
    { word: "時差", meaning: "time difference", romaji: "jisa" },
    { word: "自在", meaning: "freely, at will", romaji: "jizai" },
    { word: "視察", meaning: "inspection, observation", romaji: "shisatsu" },
    { word: "資産", meaning: "property, fortune, assets", romaji: "shisan" },
    { word: "支持", meaning: "support", romaji: "shiji" },
    { word: "自主", meaning: "independence, autonomy", romaji: "jishu" },
    { word: "自首", meaning: "surrender, give oneself up", romaji: "jishu" },
    { word: "刺繍", meaning: "embroidery", romaji: "shishū" },
    { word: "市場", meaning: "(the) market (as a concept)", romaji: "shijō" },
    { word: "辞職", meaning: "resignation", romaji: "jishoku" },
    { word: "雫", meaning: "drop (of water)", romaji: "shizuku" },
    { word: "システム", meaning: "system", romaji: "shisutemu" },
    { word: "沈める", meaning: "to sink, to submerge", romaji: "shizumeru" },
    { word: "施設", meaning: "establishment, facility", romaji: "shisetsu" },
    { word: "事前", meaning: "prior, beforehand, in advance", romaji: "jizen" },
    { word: "子息", meaning: "(hon.) son", romaji: "shisoku" },
    { word: "持続", meaning: "continuation, endurance", romaji: "jizoku" },
    { word: "自尊心", meaning: "self-respect, conceit", romaji: "jisonshin" },
    { word: "慕う", meaning: "to yearn to adore", romaji: "shitau" },
    { word: "下心", meaning: "secret intention, motive", romaji: "shitagokoro" },
    { word: "下地", meaning: "groundwork, foundation", romaji: "shitaji" },
    { word: "親しむ", meaning: "to be intimate with, to befriend", romaji: "shitashimu" },
    { word: "下調べ", meaning: "preliminary investigation", romaji: "shitashirabe" },
    { word: "愛想", meaning: "sociability", romaji: "aisō" },
    { word: "間柄", meaning: "relationship", romaji: "aidagara" },
    { word: "合間", meaning: "interval", romaji: "aima" },
    { word: "敢えて", meaning: "dare (to do), venture (to do), challenge (to do)", romaji: "aete" },
    { word: "仰ぐ", meaning: "to look up (to), to respect; to ask for", romaji: "aogu" },
    { word: "垢", meaning: "dirt, filth", romaji: "aka" },
    { word: "赤字", meaning: "deficit, go in the red", romaji: "akaji" },
    { word: "明かす", meaning: "to reveal; to stay up", romaji: "akasu" },
    { word: "赤らむ", meaning: "to become red, to blush", romaji: "akaramu" },
    { word: "上がり", meaning: "ascent; income; completion, stop", romaji: "agari" },
    { word: "諦め", meaning: "resignation, reconciliation, consolation", romaji: "akirame" },
    { word: "アクセル", meaning: "(abbr.) accelerator", romaji: "akuseru" },
    { word: "あくどい", meaning: "gaudy vicious", romaji: "akudoi" },
    { word: "顎", meaning: "chin", romaji: "ago" },
    { word: "憧れ", meaning: "yearning, longing, aspiration", romaji: "akogare" },
    { word: "麻", meaning: "hemp", romaji: "asa" },
    { word: "あざ", meaning: "birthmark, bruise", romaji: "aza" },
    { word: "浅ましい", meaning: "shameful, mean, despicable", romaji: "asamashī" },
    { word: "欺く", meaning: "to deceive", romaji: "azamuku" },
    { word: "鮮やか", meaning: "vivid, clear", romaji: "azayaka" },
    { word: "嘲笑う", meaning: "to sneer at, to ridicule", romaji: "azawarau" },
    { word: "悪しからず", meaning: "don't take me wrong, but..., I'm sorry", romaji: "ashikarazu" },
    { word: "味わい", meaning: "flavor, relish", romaji: "ajiwai" },
    { word: "焦る", meaning: "to be in a hurry, to be impatient", romaji: "aseru" },
    { word: "あせる (こえが～)", meaning: "to fade, to discolor", romaji: "aseru (koega～)" },
    { word: "値", meaning: "value, price, worth", romaji: "atai" },
    { word: "値する", meaning: "to be worth, to deserve", romaji: "ataisuru" },
    { word: "悪化", meaning: "deterioration, worsen", romaji: "akka" },
    { word: "扱い", meaning: "treatment, service", romaji: "atsukai" },
    { word: "呆気ない", meaning: "not enough, too quick (short, long, etc.)", romaji: "akkenai" },
    { word: "あっさり", meaning: "easily, readily, quickly", romaji: "assari" },
    { word: "斡旋", meaning: "kind offices, mediation", romaji: "assen" },
    { word: "圧倒", meaning: "overwhelm, overpower", romaji: "attō" },
    { word: "圧迫", meaning: "pressure, coercion, oppression", romaji: "appaku" },
    { word: "あつらえる", meaning: "to give an order, to place an order", romaji: "atsuraeru" },
    { word: "圧力", meaning: "stress, pressure", romaji: "atsuryoku" },
    { word: "当て", meaning: "expectations; depend", romaji: "ate" },
    { word: "～宛", meaning: "for…(e.g., In a letter)", romaji: "～ate" },
    { word: "当て字", meaning: "phonetic-equivalent character, substitute character", romaji: "ateji" },
    { word: "跡継ぎ", meaning: "heir, successor", romaji: "atotsugi" },
    { word: "後回し", meaning: "putting off, postponing", romaji: "atomawashi" },
    { word: "油絵", meaning: "oil painting", romaji: "aburae" },
    { word: "アプローチ", meaning: "approach (in golf)", romaji: "apurōchi" },
    { word: "あべこべ", meaning: "contrary, opposite, inverse", romaji: "abekobe" },
    { word: "甘える", meaning: "to behave like a spoiled child, to fawn on", romaji: "amaeru" },
    { word: "雨具", meaning: "rain gear", romaji: "amagu" },
    { word: "甘口", meaning: "sweet flavor", romaji: "amakuchi" },
    { word: "アマチュア", meaning: "amateur", romaji: "amachua" },
    { word: "網", meaning: "net", romaji: "ami" },
    { word: "操る", meaning: "to manipulate, to operate, to pull strings", romaji: "ayatsuru" },
    { word: "危ぶむ", meaning: "to fear, to have misgivings, to be doubtful", romaji: "ayabumu" },
    { word: "あやふや", meaning: "uncertain, vague, ambiguous", romaji: "ayafuya" },
    { word: "過ち", meaning: "fault, error, indiscretion", romaji: "ayamachi" },
    { word: "誤る", meaning: "to make a mistake", romaji: "ayamaru" },
    { word: "歩み", meaning: "step, progress, history", romaji: "ayumi" },
    { word: "歩む", meaning: "to walk", romaji: "ayumu" },
    { word: "予め", meaning: "in advance, previously", romaji: "arakajime" },
    { word: "荒らす", meaning: "to damage; to invade", romaji: "arasu" },
    { word: "争い", meaning: "dispute, quarrel, conflict", romaji: "arasoi" },
    { word: "改まる", meaning: "to be renewed; to be formal", romaji: "aratamaru" },
    { word: "荒っぽい", meaning: "rough, rude", romaji: "arappoi" },
    { word: "アラブ", meaning: "Arab", romaji: "arabu" },
    { word: "霰", meaning: "hail (e.g., falling ice balls)", romaji: "arare" },
    { word: "有り様", meaning: "state, condition", romaji: "arisama" },
    { word: "ありのまま", meaning: "the truth, as it is, frankly", romaji: "arinomama" },
    { word: "ありふれる", meaning: "common, ordinary, routine", romaji: "arifureru" },
    { word: "アルカリ", meaning: "alkali", romaji: "arukari" },
    { word: "アルミ", meaning: "aluminum (Al, aluminum)", romaji: "arumi" },
    { word: "アワー", meaning: "hour", romaji: "awā" },
    { word: "合わす", meaning: "to join together, to face, to unite", romaji: "awasu" },
    { word: "～合せ", meaning: "in all", romaji: "～awase" },
    { word: "アンコール", meaning: "encore", romaji: "ankōru" },
    { word: "暗殺", meaning: "assassination", romaji: "ansatsu" },
    { word: "暗算", meaning: "mental arithmetic", romaji: "anzan" },
    { word: "暗示", meaning: "hint, suggestion", romaji: "anji" },
    { word: "案じる", meaning: "to be anxious, to ponder", romaji: "anjiru" },
    { word: "安静", meaning: "rest", romaji: "ansei" },
    { word: "案の定", meaning: "sure enough, as usual", romaji: "annojō" },
    { word: "いい加減", meaning: "random, irresponsible", romaji: "īkagen" },
    { word: "言い訳", meaning: "excuse, explanation", romaji: "īwake" },
    { word: "イェス", meaning: "yes; Jesus", romaji: "iesu" },
    { word: "家出", meaning: "running away from home", romaji: "iede" },
    { word: "生かす", meaning: "to keep something alive; to make use of", romaji: "ikasu" },
    { word: "いかに", meaning: "how, in what way", romaji: "ikani" },
    { word: "いかにも", meaning: "truly (same as 実に (じつに))", romaji: "ikanimo" },
    { word: "異議", meaning: "objection, dissent, protest", romaji: "igi" },
    { word: "生き甲斐", meaning: "something one lives for, very important", romaji: "ikigai" },
    { word: "行き違い", meaning: "misunderstanding, disagreement", romaji: "ikichigai" },
    { word: "意気込む", meaning: "to be enthusiastic about", romaji: "ikigomu" },
    { word: "育成", meaning: "rearing, training, cultivation", romaji: "ikusei" },
    { word: "幾多", meaning: "many, numerous", romaji: "ikuta" },
    { word: "(花を〜) 生ける, 活ける", meaning: "to arrange (flowers)", romaji: "(hanawo～) ikeru" },
    { word: "異見", meaning: "different opinion, objection", romaji: "iken" },
    { word: "意向", meaning: "intention, idea, inclination", romaji: "ikō" },
    { word: "移行", meaning: "switching over to", romaji: "ikō" },
    { word: "いざ", meaning: "now, come (now), crucial moment", romaji: "iza" },
    { word: "移住", meaning: "migration, immigration", romaji: "ijū" },
    { word: "衣装", meaning: "clothing, costume, outfit", romaji: "ishō" },
    { word: "いじる", meaning: "to touch, to tamper with", romaji: "ijiru" },
    { word: "異性", meaning: "the opposite sex", romaji: "isei" },
    { word: "遺跡", meaning: "historic ruins", romaji: "iseki" },
    { word: "依存", meaning: "dependence, dependent, reliance", romaji: "izon" },
    { word: "委託", meaning: "consign (goods (for sale) to a firm), entrust", romaji: "itaku" },
    { word: "いたって", meaning: "very much, exceedingly, extremely", romaji: "itatte" },
    { word: "出世", meaning: "promotion, successful career, eminence", romaji: "shusse" },
    { word: "出題", meaning: "proposing a question", romaji: "shutsudai" },
    { word: "出動", meaning: "mobilization, action", romaji: "shutsudō" },
    { word: "出費", meaning: "expenses, disbursements", romaji: "shuppi" },
    { word: "出品", meaning: "exhibit, display", romaji: "shuppin" },
    { word: "主導", meaning: "main leadership", romaji: "shudō" },
    { word: "主任", meaning: "person in charge, responsible official", romaji: "shunin" },
    { word: "首脳", meaning: "head, leader", romaji: "shunō" },
    { word: "守備", meaning: "defense", romaji: "shubi" },
    { word: "手法", meaning: "technique", romaji: "shuhō" },
    { word: "樹木", meaning: "trees and shrubs, arbor", romaji: "jumoku" },
    { word: "樹立", meaning: "establish, create", romaji: "juritsu" },
    { word: "準急", meaning: "local express (train, slower than an express)", romaji: "junkyū" },
    { word: "準じる", meaning: "to follow, to conform, to apply to", romaji: "junjiru" },
    { word: "～署", meaning: "department", romaji: "～sho" },
    { word: "～症", meaning: "disease", romaji: "～shō" },
    { word: "～証", meaning: "proof, certificate", romaji: "～shō" },
    { word: "～嬢", meaning: "young woman", romaji: "～jō" },
    { word: "上位", meaning: "superior, higher order", romaji: "jōi" },
    { word: "上演", meaning: "art performance", romaji: "jōen" },
    { word: "城下", meaning: "land near the castle", romaji: "jōka" },
    { word: "消去", meaning: "elimination, erasing", romaji: "shōkyo" },
    { word: "上空", meaning: "sky, high-altitude sky, upper air", romaji: "jōkū" },
    { word: "衝撃", meaning: "shock, crash, impact, ballistic", romaji: "shōgeki" },
    { word: "証言", meaning: "evidence, testimony", romaji: "shōgen" },
    { word: "証拠", meaning: "evidence, proof", romaji: "shōko" },
    { word: "照合", meaning: "check, verification", romaji: "shōgō" },
    { word: "詳細", meaning: "detail, particulars", romaji: "shōsai" },
    { word: "上昇", meaning: "rising, ascending, climbing", romaji: "jōshō" },
    { word: "昇進", meaning: "promotion", romaji: "shōshin" },
    { word: "称する", meaning: "to take the name of, to call oneself", romaji: "shōsuru" },
    { word: "情勢", meaning: "state of things, condition, situation", romaji: "jōsei" },
    { word: "消息", meaning: "news, letter, circumstances", romaji: "shōsoku" },
    { word: "承諾", meaning: "consent, agreement", romaji: "shōdaku" },
    { word: "情緒", meaning: "emotion, feeling", romaji: "jōcho" },
    { word: "象徴", meaning: "symbol", romaji: "shōchō" },
    { word: "小児科", meaning: "pediatrics", romaji: "shōnika" },
    { word: "使用人", meaning: "employee, servant", romaji: "shiyōnin" },
    { word: "情熱", meaning: "passion, enthusiasm, zeal", romaji: "jōnetsu" },
    { word: "譲歩", meaning: "concession, conciliation, compromise", romaji: "jōho" },
    { word: "条約", meaning: "treaty, pact", romaji: "jōyaku" },
    { word: "勝利", meaning: "victory, triumph, win", romaji: "shōri" },
    { word: "上陸", meaning: "landing, disembarkation", romaji: "jōriku" },
    { word: "蒸溜", meaning: "distillation", romaji: "jōryū" },
    { word: "奨励", meaning: "encouragement, promotion", romaji: "shōrei" },
    { word: "ショー", meaning: "show", romaji: "shō" },
    { word: "除外", meaning: "exception, exclusion", romaji: "jogai" },
    { word: "職員", meaning: "staff member, personnel", romaji: "shokuin" },
    { word: "植民地", meaning: "colony", romaji: "shokuminchi" },
    { word: "職務", meaning: "professional duties", romaji: "shokumu" },
    { word: "諸君", meaning: "Gentlemen!, Ladies!", romaji: "shokun" },
    { word: "助言", meaning: "advice, suggestion", romaji: "jogen" },
    { word: "徐行", meaning: "going slowly", romaji: "jokō" },
    { word: "所在", meaning: "whereabouts", romaji: "shozai" },
    { word: "所持", meaning: "possession, owning", romaji: "shoji" },
    { word: "所属", meaning: "attached to, belong to", romaji: "shozoku" },
    { word: "処置", meaning: "treatment", romaji: "shochi" },
    { word: "しょっちゅう", meaning: "always, constantly", romaji: "shotchū" },
    { word: "所定", meaning: "fixed, prescribed", romaji: "shotei" },
    { word: "所得", meaning: "income", romaji: "shotoku" },
    { word: "処罰", meaning: "punishment", romaji: "shobatsu" },
    { word: "初版", meaning: "first edition", romaji: "shohan" },
    { word: "書評", meaning: "book review", romaji: "shohyō" },
    { word: "処分", meaning: "disposal, dealing, punishment", romaji: "shobun" },
    { word: "庶民", meaning: "masses, common people", romaji: "shomin" },
    { word: "庶務", meaning: "general affairs", romaji: "shomu" },
    { word: "所有", meaning: "one's possessions, ownership", romaji: "shoyū" },
    { word: "調べ", meaning: "investigation, inspection", romaji: "shirabe" },
    { word: "自立", meaning: "independence, self-reliance", romaji: "jiritsu" },
    { word: "記す", meaning: "to note, to write down", romaji: "shirusu" },
    { word: "指令", meaning: "orders, instructions, directive", romaji: "shirei" },
    { word: "～心", meaning: "mind of ~", romaji: "～shin" },
    { word: "陣", meaning: "battle formation, camp, encampment", romaji: "jin" },
    { word: "進化", meaning: "evolution, progress", romaji: "shinka" },
    { word: "人格", meaning: "personality, character", romaji: "jinkaku" },
    { word: "審議", meaning: "deliberation", romaji: "shingi" },
    { word: "新婚", meaning: "newly-wed", romaji: "shinkon" },
    { word: "審査", meaning: "judging, inspection, examination", romaji: "shinsa" },
    { word: "人材", meaning: "man of talent", romaji: "jinzai" },
    { word: "紳士", meaning: "gentleman", romaji: "shinshi" },
    { word: "真実", meaning: "truth, reality", romaji: "shinjitsu" },
    { word: "信者", meaning: "believer, devotee", romaji: "shinja" },
    { word: "真珠", meaning: "pearl", romaji: "shinju" },
    { word: "進出", meaning: "advancement", romaji: "shinshutsu" },
    { word: "心情", meaning: "mentality", romaji: "shinjō" },
    { word: "新人", meaning: "new face, newcomer", romaji: "shinjin" },
    { word: "神聖", meaning: "holiness, sacredness, dignity", romaji: "shinsei" },
    { word: "親善", meaning: "friendship", romaji: "shinzen" },
    { word: "真相", meaning: "truth, real situation", romaji: "shinsō" },
    { word: "迅速", meaning: "quick, fast, prompt", romaji: "jinsoku" },
    { word: "人体", meaning: "human body", romaji: "jintai" },
    { word: "新築", meaning: "new building, new construction", romaji: "shinchiku" },
    { word: "心中", meaning: "double suicide", romaji: "shinjū" },
    { word: "進呈", meaning: "presentation", romaji: "shintei" },
    { word: "進展", meaning: "progress, development", romaji: "shinten" },
    { word: "神殿", meaning: "temple, sacred place", romaji: "shinden" },
    { word: "進度", meaning: "progress", romaji: "shindo" },
    { word: "振動", meaning: "oscillation, vibration", romaji: "shindō" },
    { word: "新入生", meaning: "new student, first-year student, freshman", romaji: "shinnyūsei" },
    { word: "信任", meaning: "trust, confidence, credence", romaji: "shinnin" },
    { word: "神秘", meaning: "mystery", romaji: "shinpi" },
    { word: "辛抱", meaning: "patience, endurance", romaji: "shinbō" },
    { word: "人民", meaning: "people, public", romaji: "jinmin" },
    { word: "侵略", meaning: "aggression, invasion, raid", romaji: "shinryaku" },
    { word: "診療", meaning: "medical examination and treatment", romaji: "shinryō" },
    { word: "粋", meaning: "essence", romaji: "sui" },
    { word: "水源", meaning: "source of river", romaji: "suigen" },
    { word: "推進", meaning: "propulsion, driving force", romaji: "suishin" },
    { word: "吹奏", meaning: "playing wind instruments", romaji: "suisō" },
    { word: "推測", meaning: "guess, conjecture", romaji: "suisoku" },
    { word: "水田", meaning: "(water-filled) paddy field", romaji: "suiden" },
    { word: "推理", meaning: "reasoning, inference, mystery or detective genre", romaji: "suiri" },
    { word: "数詞", meaning: "numeral", romaji: "sūshi" },
    { word: "崇拝", meaning: "worship, adoration", romaji: "sūhai" },
    { word: "据え付ける", meaning: "to install, to equip, to mount", romaji: "suetsukeru" },
    { word: "据える", meaning: "to set, to lay, to place", romaji: "sueru" },
    { word: "すがすがしい", meaning: "fresh, refreshing", romaji: "sugasugashī" },
    { word: "救い", meaning: "help, aid, relief", romaji: "sukui" },
    { word: "すくう (みずを～)", meaning: "to scoop", romaji: "sukū (mizuwo～)" },
    { word: "健やか", meaning: "vigorous, healthy, sound", romaji: "sukoyaka" },
    { word: "濯ぐ", meaning: "to rinse, to wash out", romaji: "susugu" },
    { word: "進み", meaning: "progress", romaji: "susumi" },
    { word: "裾", meaning: "(trouser) cuff, (skirt) hem, cut edge of a hairdo", romaji: "suso" },
    { word: "スタジオ", meaning: "studio", romaji: "sutajio" },
    { word: "スチーム", meaning: "steam", romaji: "suchīmu" },
    { word: "ストライキ", meaning: "strike", romaji: "sutoraiki" },
    { word: "スト", meaning: "(abbr.) strike", romaji: "suto" },
    { word: "ストロー", meaning: "straw", romaji: "sutorō" },
    { word: "ストロボ", meaning: "stroboscope (literally: strobo, strobe lamp, stroboscopic lamp)", romaji: "sutorobo" },
    { word: "すばしこい", meaning: "nimble, smart, quick", romaji: "subashikoi" },
    { word: "素早い", meaning: "fast, quick", romaji: "subayai" },
    { word: "ずばり", meaning: "decisively, unreservedly, frankly", romaji: "zubari" },
    { word: "スプリング", meaning: "spring", romaji: "supuringu" },
    { word: "スペース", meaning: "space", romaji: "supēsu" },
    { word: "ずぶぬれ", meaning: "soaked, dripping wet", romaji: "zubunure" },
    { word: "スポーツカー", meaning: "sports car", romaji: "supōtsukā" },
    { word: "澄ます", meaning: "to clear, to make clear, to listen for", romaji: "sumasu" },
    { word: "清ます", meaning: "to clear, to make clear, to listen for", romaji: "sumasu" },
    { word: "済ます", meaning: "to finish; to settle; to do without", romaji: "sumasu" },
    { word: "すみやか", meaning: "speedy", romaji: "sumiyaka" },
    { word: "スラックス", meaning: "slacks", romaji: "surakkusu" },
    { word: "ずらっと", meaning: "in a line, in a row", romaji: "zuratto" },
    { word: "ずるずる", meaning: "dragging on, sound of sniffling", romaji: "zuruzuru" },
    { word: "ずれ", meaning: "difference, gap", romaji: "zure" },
    { word: "すれちがい", meaning: "chance encounter", romaji: "surechigai" },
    { word: "擦れる", meaning: "to rub, to chafe", romaji: "sureru" },
    { word: "すんなり", meaning: "pass with no objection, slim, slender", romaji: "sunnari" },
    { word: "生育", meaning: "growth, development, breeding", romaji: "seīku" },
    { word: "成育", meaning: "growth, raising", romaji: "seīku" },
    { word: "成果", meaning: "results, fruits", romaji: "seika" },
    { word: "正解", meaning: "correct, right answer, solution", romaji: "seikai" },
    { word: "正義", meaning: "justice, right, righteousness", romaji: "seigi" },
    { word: "生計", meaning: "livelihood, living", romaji: "seikei" },
    { word: "政権", meaning: "(political) administration, political power", romaji: "seiken" },
    { word: "星座", meaning: "constellation", romaji: "seiza" },
    { word: "制裁", meaning: "restraint, sanctions, punishment", romaji: "seisai" },
    { word: "政策", meaning: "political measures, policy", romaji: "seisaku" },
    { word: "生死", meaning: "life and death", romaji: "seishi" },
    { word: "静止", meaning: "stillness, repose, standing still", romaji: "seishi" },
    { word: "誠実", meaning: "sincere, honest, faithful", romaji: "seijitsu" },
    { word: "成熟", meaning: "maturity, ripeness", romaji: "seijuku" },
    { word: "青春", meaning: "youth, springtime of life, adolescent", romaji: "seishun" },
    { word: "清純", meaning: "purity, innocence", romaji: "seijun" },
    { word: "聖書", meaning: "Bible", romaji: "seisho" },
    { word: "正常", meaning: "normalcy, normality, normal", romaji: "seijō" },
    { word: "制する", meaning: "to control, to command", romaji: "seisuru" },
    { word: "整然", meaning: "orderly, regular, well-organized", romaji: "seizen" },
    { word: "盛装", meaning: "be dressed up, wear rich clothes", romaji: "seisō" },
    { word: "盛大", meaning: "grand, prosperous, magnificent", romaji: "seidai" },
    { word: "清濁", meaning: "good and evil, purity and impurity", romaji: "seidaku" },
    { word: "制定", meaning: "enactment, establishment, creation", romaji: "seitei" },
    { word: "静的", meaning: "static", romaji: "seiteki" },
    { word: "製鉄", meaning: "iron manufacture", romaji: "seitetsu" },
    { word: "晴天", meaning: "fine weather", romaji: "seiten" },
    { word: "正当", meaning: "just, due, proper", romaji: "seitō" },
    { word: "制服", meaning: "uniform", romaji: "seifuku" },
    { word: "征服", meaning: "conquest, subjugation, overcoming", romaji: "seifuku" },
    { word: "製法", meaning: "manufacturing method, recipe, formula", romaji: "seihō" },
    { word: "精密", meaning: "precise, exact, detailed, minute", romaji: "seimitsu" },
    { word: "税務署", meaning: "tax office", romaji: "zeimusho" },
    { word: "制約", meaning: "limitation, constraints", romaji: "seiyaku" },
    { word: "勢力", meaning: "influence, power, might, strength", romaji: "seiryoku" },
    { word: "整列", meaning: "stand in a row, form a line", romaji: "seiretsu" },
    { word: "セール", meaning: "sale", romaji: "sēru" },
    { word: "急かす", meaning: "to hurry, to urge on", romaji: "sekasu" },
    { word: "伜", meaning: "son, my son", romaji: "segare" },
    { word: "責務", meaning: "duty, obligation", romaji: "sekimu" },
    { word: "セクション", meaning: "section", romaji: "sekushon" },
    { word: "世辞", meaning: "flattery, compliment", romaji: "seji" },
    { word: "世帯", meaning: "household", romaji: "setai" },
    { word: "是正", meaning: "correction, revision", romaji: "zesei" },
    { word: "世代", meaning: "generation", romaji: "sedai" },
    { word: "切開", meaning: "opening up, cutting through", romaji: "sekkai" },
    { word: "セックス", meaning: "sex", romaji: "sekkusu" },
    { word: "切実", meaning: "compelling, serious, severe, acute", romaji: "setsujitsu" },
    { word: "接触", meaning: "touch, contact", romaji: "sesshoku" },
    { word: "接続詞", meaning: "conjunction", romaji: "setsuzokushi" },
    { word: "設置", meaning: "establishment, institution", romaji: "setchi" },
    { word: "折衷", meaning: "compromise, cross, blending, eclecticism", romaji: "setchū" },
    { word: "設定", meaning: "establishment, creation", romaji: "settei" },
    { word: "説得", meaning: "persuasion", romaji: "settoku" },
    { word: "切ない", meaning: "painful, trying, sad", romaji: "setsunai" },
    { word: "絶版", meaning: "out of print", romaji: "zeppan" },
    { word: "設立", meaning: "establishment, foundation, institution", romaji: "setsuritsu" },
    { word: "攻め", meaning: "attack, offense", romaji: "seme" },
    { word: "ゼリー", meaning: "jelly", romaji: "zerī" },
    { word: "セレモニー", meaning: "ceremony", romaji: "seremonī" },
    { word: "世論", meaning: "public opinion", romaji: "seron" },
    { word: "先", meaning: "priority, precedence, previous", romaji: "sen" },
    { word: "繊維", meaning: "fiber, fiber, textile", romaji: "sen'i" },
    { word: "全快", meaning: "complete recovery of health", romaji: "zenkai" },
    { word: "宣教", meaning: "religious mission", romaji: "senkyō" },
    { word: "宣言", meaning: "declaration, proclamation, announcement", romaji: "sengen" },
    { word: "戦災", meaning: "war damage", romaji: "sensai" },
    { word: "専修", meaning: "specialization", romaji: "senshū" },
    { word: "戦術", meaning: "tactics", romaji: "senjutsu" },
    { word: "センス", meaning: "sense (for music, style, tact, etc.)", romaji: "sensu" },
    { word: "潜水", meaning: "diving", romaji: "sensui" },
    { word: "全盛", meaning: "height of prosperity", romaji: "zensei" },
    { word: "先代", meaning: "family predecessor, previous age, previous generation", romaji: "sendai" },
    { word: "先だって", meaning: "recently, the other day", romaji: "sendatte" },
    { word: "先着", meaning: "first arrival", romaji: "senchaku" },
    { word: "前提", meaning: "preamble, premise, prerequisite", romaji: "zentei" },
    { word: "先天的", meaning: "inherent, congenital, hereditary", romaji: "sententeki" },
    { word: "前途", meaning: "future prospects, outlook, the journey ahead", romaji: "zento" },
    { word: "戦闘", meaning: "battle, fight, combat", romaji: "sentō" },
    { word: "潜入", meaning: "infiltration, sneaking in", romaji: "sennyū" },
    { word: "船舶", meaning: "ship", romaji: "senpaku" },
    { word: "全滅", meaning: "annihilation", romaji: "zenmetsu" },
    { word: "専用", meaning: "exclusive use, personal use", romaji: "sen'yō" },
    { word: "占領", meaning: "occupation, possession, have a room to oneself", romaji: "senryō" },
    { word: "善良", meaning: "goodness, excellence, virtue", romaji: "zenryō" },
    { word: "戦力", meaning: "war potential", romaji: "senryoku" },
    { word: "前例", meaning: "precedent", romaji: "zenrei" },
    { word: "相応", meaning: "suitability, fitness", romaji: "sōō" },
    { word: "総会", meaning: "general meeting", romaji: "sōkai" },
    { word: "創刊", meaning: "launching (e.g., newspaper, first issue)", romaji: "sōkan" },
    { word: "雑木", meaning: "various kinds of small trees, assorted trees", romaji: "zōki" },
    { word: "早急", meaning: "urgent", romaji: "sōkyū" },
    { word: "増強", meaning: "reinforce, increase", romaji: "zōkyō" },
    { word: "送金", meaning: "remittance, sending money", romaji: "sōkin" },
    { word: "走行", meaning: "running a wheeled vehicle (e.g., car, traveling)", romaji: "sōkō" },
    { word: "総合", meaning: "synthesis, generalization", romaji: "sōgō" },
    { word: "捜索", meaning: "search (esp. for someone or something missing, investigation)", romaji: "sōsaku" },
    { word: "蔵相", meaning: "Minister of Finance", romaji: "zōshō" },
    { word: "装飾", meaning: "ornament", romaji: "sōshoku" },
    { word: "増進", meaning: "promoting, increase, advance", romaji: "zōshin" },
    { word: "相対", meaning: "relative", romaji: "sōtai" },
    { word: "壮大", meaning: "magnificent, grand, majestic", romaji: "sōdai" },
    { word: "騒動", meaning: "strife, riot, rebellion", romaji: "sōdō" },
    { word: "遭難", meaning: "disaster, shipwreck, accident", romaji: "sōnan" },
    { word: "相場", meaning: "market price, speculation, estimation", romaji: "sōba" },
    { word: "装備", meaning: "equipment", romaji: "sōbi" },
    { word: "創立", meaning: "establishment, founding", romaji: "sōritsu" },
    { word: "添える", meaning: "to add to, to attach, to accompany", romaji: "soeru" },
    { word: "ソース", meaning: "source", romaji: "sōsu" },
    { word: "即座に", meaning: "immediately, right away", romaji: "sokuzani" },
    { word: "促進", meaning: "promotion, acceleration, encouragement", romaji: "sokushin" },
    { word: "即する", meaning: "to conform to, to agree with, to be adapted to,", romaji: "sokusuru" },
    { word: "束縛", meaning: "restraint, restriction, confinement", romaji: "sokubaku" },
    { word: "側面", meaning: "side, sidelight, lateral", romaji: "sokumen" },
    { word: "損う", meaning: "to harm, to hurt", romaji: "sokonau" },
    { word: "そこら", meaning: "everywhere, somewhere", romaji: "sokora" },
    { word: "素材", meaning: "raw materials, subject matter", romaji: "sozai" },
    { word: "阻止", meaning: "obstruction, check, hindrance", romaji: "soshi" },
    { word: "訴訟", meaning: "litigation, lawsuit", romaji: "soshō" },
    { word: "育ち", meaning: "breeding, growth", romaji: "sodachi" },
    { word: "措置", meaning: "measure, step", romaji: "sochi" },
    { word: "ソックス", meaning: "socks", romaji: "sokkusu" },
    { word: "素っ気無い", meaning: "cold, short, curt, blunt", romaji: "sokkenai" },
    { word: "外方", meaning: "look (or turn) the other way", romaji: "soppo" },
    { word: "備え付ける", meaning: "to provide, to equip, to install", romaji: "sonaetsukeru" },
    { word: "備わる", meaning: "to be furnished with", romaji: "sonawaru" },
    { word: "具わる", meaning: "to be furnished with", romaji: "sonawaru" },
    { word: "聳える", meaning: "to rise, to tower, to soar", romaji: "sobieru" },
    { word: "素朴", meaning: "simplicity, artlessness, naivety", romaji: "soboku" },
    { word: "背く", meaning: "to run counter to, to go against", romaji: "somuku" },
    { word: "染まる", meaning: "to be dyed", romaji: "somaru" },
    { word: "染める", meaning: "to dye, to color", romaji: "someru" },
    { word: "そらす", meaning: "to bend, to warp", romaji: "sorasu" },
    { word: "そり (～にのる)", meaning: "sleigh, sled", romaji: "sori (～ninoru)" },
    { word: "反る", meaning: "to warp, to be warped, to curve", romaji: "soru" },
    { word: "それゆえ", meaning: "therefore, for that reason, so", romaji: "soreyue" },
    { word: "ソロ", meaning: "solo", romaji: "soro" },
    { word: "揃い", meaning: "set, suit, uniform", romaji: "soroi" },
    { word: "ぞんざい", meaning: "rude, careless, slovenly", romaji: "zonzai" },
    { word: "損失", meaning: "loss", romaji: "sonshitsu" },
    { word: "存続", meaning: "duration, continuance", romaji: "sonzoku" },
    { word: "ダース", meaning: "dozen", romaji: "dāsu" },
    { word: "対応", meaning: "dealing with", romaji: "taiō" },
    { word: "大家", meaning: "rich family, distinguished family", romaji: "taika" },
    { word: "退化", meaning: "degeneration, retrogression", romaji: "taika" },
    { word: "大概", meaning: "in general, mainly", romaji: "taigai" },
    { word: "体格", meaning: "physique, constitution", romaji: "taikaku" },
    { word: "大金", meaning: "large amount of money", romaji: "taikin" },
    { word: "待遇", meaning: "treatment, reception", romaji: "taigū" },
    { word: "対決", meaning: "confrontation, showdown", romaji: "taiketsu" },
    { word: "体験", meaning: "personal experience", romaji: "taiken" },
    { word: "対抗", meaning: "opposition, antagonism", romaji: "taikō" },
    { word: "退治", meaning: "extermination", romaji: "taiji" },
    { word: "大衆", meaning: "general public", romaji: "taishū" },
    { word: "対処", meaning: "deal with, cope", romaji: "taisho" },
    { word: "退職", meaning: "retirement (from office)", romaji: "taishoku" },
    { word: "題する", meaning: "to title", romaji: "daisuru" },
    { word: "態勢", meaning: "attitude, conditions, tendency", romaji: "taisei" },
    { word: "対談", meaning: "talk, dialogue", romaji: "taidan" },
    { word: "大胆", meaning: "bold, daring, audacious", romaji: "daitan" },
    { word: "対等", meaning: "equivalent", romaji: "taitō" },
    { word: "台無し", meaning: "mess, spoiled, (come to) nothing", romaji: "dainashi" },
    { word: "滞納", meaning: "non-payment, default", romaji: "tainō" },
    { word: "対比", meaning: "contrast, comparison", romaji: "taihi" },
    { word: "タイピスト", meaning: "typist", romaji: "taipisuto" },
    { word: "大部", meaning: "most (e.g., most part, greater, fairly, a good deal, much)", romaji: "taibu" },
    { word: "大便", meaning: "feces", romaji: "daiben" },
    { word: "代弁", meaning: "speak for another", romaji: "daiben" },
    { word: "待望", meaning: "long-expected, waiting", romaji: "taibō" },
    { word: "台本", meaning: "libretto, scenario", romaji: "daihon" },
    { word: "タイマー", meaning: "timer", romaji: "taimā" },
    { word: "怠慢", meaning: "negligence, carelessness", romaji: "taiman" },
    { word: "タイミング", meaning: "timing", romaji: "taimingu" },
    { word: "タイム", meaning: "time", romaji: "taimu" },
    { word: "タイムリー", meaning: "timely, run-batted-in (baseball), RBI", romaji: "taimurī" },
    { word: "対面", meaning: "interview, meeting", romaji: "taimen" },
    { word: "代用", meaning: "substitution", romaji: "daiyō" },
    { word: "体力", meaning: "physical strength", romaji: "tairyoku" },
    { word: "タイル", meaning: "tile", romaji: "tairu" },
    { word: "対話", meaning: "conversation, dialogue", romaji: "taiwa" },
    { word: "耐える", meaning: "to endure, to put up with", romaji: "taeru" },
    { word: "堪える", meaning: "to endure, to put up with", romaji: "taeru" },
    { word: "絶える", meaning: "to die out, to become extinct", romaji: "taeru" },
    { word: "断える", meaning: "to cease, to become extinct", romaji: "taeru" },
    { word: "打開", meaning: "solution, breakthrough", romaji: "dakai" },
    { word: "焚火", meaning: "(open) fire", romaji: "takibi" },
    { word: "妥協", meaning: "compromise, giving in", romaji: "dakyō" },
    { word: "たくましい", meaning: "burly, strong, sturdy", romaji: "takumashī" },
    { word: "巧み", meaning: "skill, cleverness", romaji: "takumi" },
    { word: "丈", meaning: "length, height", romaji: "take" },
    { word: "打撃", meaning: "blow, damage; batting (baseball)", romaji: "dageki" },
    { word: "妥結", meaning: "agreement", romaji: "daketsu" },
    { word: "駄作", meaning: "poor work", romaji: "dasaku" },
    { word: "足し算", meaning: "addition", romaji: "tashizan" },
    { word: "多数決", meaning: "majority rule", romaji: "tasūketsu" },
    { word: "助け", meaning: "assistance", romaji: "tasuke" },
    { word: "携わる", meaning: "to engage, to involve", romaji: "tazusawaru" },
    { word: "漂う", meaning: "to drift about, to float, to hang in air", romaji: "tadayō" },
    { word: "立ち去る", meaning: "to leave, to depart", romaji: "tachisaru" },
    { word: "立ち寄る", meaning: "to stop by, to drop in for a short visit", romaji: "tachiyoru" },
    { word: "抱っこ", meaning: "(child's) hug", romaji: "dakko" },
    { word: "達者", meaning: "skillful, in good health", romaji: "tassha" },
    { word: "脱出", meaning: "escape", romaji: "dasshutsu" },
    { word: "脱する", meaning: "to escape from, to get out", romaji: "dassuru" },
    { word: "達成", meaning: "achievement", romaji: "tassei" },
    { word: "脱退", meaning: "secession, withdrawal", romaji: "dattai" },
    { word: "だったら", meaning: "if it's the case", romaji: "dattara" },
    { word: "立て替える", meaning: "to pay in advance, to pay for another", romaji: "tatekaeru" },
    { word: "建前", meaning: "position; stance one takes in public; principle", romaji: "tatemae" },
    { word: "奉る", meaning: "to offer, to do respectfully", romaji: "tatematsuru" },
    { word: "だと", meaning: "if it's the case", romaji: "dato" },
    { word: "他動詞", meaning: "transitive verb (direct object)", romaji: "tadōshi" },
    { word: "辿り着く", meaning: "to reach, to make it somehow", romaji: "tadoritsuku" },
    { word: "辿る", meaning: "to follow (road, to pursue (course), to follow up", romaji: "tadoru" },
    { word: "束ねる", meaning: "to tie up in a bundle, to control", romaji: "tabaneru" },
    { word: "だぶだぶ", meaning: "loose, baggy", romaji: "dabudabu" },
    { word: "他方", meaning: "another side, on the other hand", romaji: "tahō" },
    { word: "多忙", meaning: "busy", romaji: "tabō" },
    { word: "給う", meaning: "to receive, to grant", romaji: "tamau" },
    { word: "魂", meaning: "soul, spirit", romaji: "tamashī" },
    { word: "溜まり", meaning: "collected things, gathering place, arrears", romaji: "tamari" },
    { word: "賜る", meaning: "to grant, to bestow", romaji: "tamawaru" },
    { word: "保つ", meaning: "to keep, to preserve, to sustain", romaji: "tamotsu" },
    { word: "たやすい", meaning: "easy, simple, light", romaji: "tayasui" },
    { word: "多様", meaning: "diversity, variety", romaji: "tayō" },
    { word: "だるい", meaning: "sluggish, feel heavy (tired), languid", romaji: "darui" },
    { word: "弛み", meaning: "slack, slackening", romaji: "tarumi" },
    { word: "弛む", meaning: "to slacken, to loosen, to relax", romaji: "tarumu" },
    { word: "垂れる", meaning: "to hang, to droop; to drip", romaji: "tareru" },
    { word: "タレント", meaning: "talent, star, personality", romaji: "tarento" },
    { word: "タワー", meaning: "tower", romaji: "tawā" },
    { word: "単一", meaning: "single, simple, sole", romaji: "tan'itsu" },
    { word: "短歌", meaning: "31-syllable Japanese poem", romaji: "tanka" },
    { word: "担架", meaning: "stretcher, litter", romaji: "tanka" },
    { word: "短気", meaning: "quick temper", romaji: "tanki" },
    { word: "団結", meaning: "unity, union, solidarity", romaji: "danketsu" },
    { word: "探検", meaning: "exploration, expedition", romaji: "tanken" },
    { word: "断言", meaning: "assertion, declaration, affirmation", romaji: "dangen" },
    { word: "短縮", meaning: "shortening, abbreviation, reduction", romaji: "tanshuku" },
    { word: "断然", meaning: "firmly, absolutely, definitely", romaji: "danzen" },
    { word: "炭素", meaning: "carbon (C)", romaji: "tanso" },
    { word: "短大", meaning: "junior college", romaji: "tandai" },
    { word: "単調", meaning: "monotony, monotone, dullness", romaji: "tanchō" },
    { word: "単独", meaning: "sole, single", romaji: "tandoku" },
    { word: "旦那", meaning: "master (of house), husband (informal)", romaji: "danna" },
    { word: "短波", meaning: "short wave", romaji: "tanpa" },
    { word: "蛋白質", meaning: "protein", romaji: "tanpakushitsu" },
    { word: "ダンプ", meaning: "dump truck", romaji: "danpu" },
    { word: "断面", meaning: "cross section", romaji: "danmen" },
    { word: "弾力", meaning: "elasticity, flexibility", romaji: "danryoku" },
    { word: "治安", meaning: "public order, security", romaji: "chian" },
    { word: "チームワーク", meaning: "teamwork", romaji: "chīmuwāku" },
    { word: "チェンジ", meaning: "change", romaji: "chenji" },
    { word: "違える", meaning: "to change", romaji: "chigaeru" },
    { word: "畜産", meaning: "animal husbandry", romaji: "chikusan" },
    { word: "畜生", meaning: "beast, brute, damn", romaji: "chikushō" },
    { word: "蓄積", meaning: "accumulation, accumulate, store", romaji: "chikuseki" },
    { word: "地形", meaning: "landform, geographical features, topography", romaji: "chikei" },
    { word: "知性", meaning: "intelligence", romaji: "chisei" },
    { word: "乳", meaning: "milk, breast, loop", romaji: "chichi" },
    { word: "縮まる", meaning: "to be shortened, to be contracted, to shrink", romaji: "chijimaru" },
    { word: "秩序", meaning: "order, regularity", romaji: "chitsujo" },
    { word: "窒息", meaning: "suffocation", romaji: "chissoku" },
    { word: "知的", meaning: "intellectual", romaji: "chiteki" },
    { word: "着手", meaning: "embarkation, launch", romaji: "chakushu" },
    { word: "着色", meaning: "coloring, coloring", romaji: "chakushoku" },
    { word: "着席", meaning: "sit down, seat", romaji: "chakuseki" },
    { word: "着目", meaning: "attention", romaji: "chakumoku" },
    { word: "着陸", meaning: "landing, touch down", romaji: "chakuriku" },
    { word: "着工", meaning: "start of (construction) work", romaji: "chakkō" },
    { word: "茶の間", meaning: "living room (Japanese style)", romaji: "chanoma" },
    { word: "茶の湯", meaning: "tea ceremony", romaji: "chanoyu" },
    { word: "ちやほや", meaning: "pamper, make a fuss of, spoil", romaji: "chiyahoya" },
    { word: "チャンネル", meaning: "a channel", romaji: "channeru" },
    { word: "宙返り", meaning: "somersault, looping-the-loop", romaji: "chūgaeri" },
    { word: "中継", meaning: "relay, hook-up", romaji: "chūkei" },
    { word: "忠告", meaning: "advice, warning", romaji: "chūkoku" },
    { word: "中傷", meaning: "slander, libel, defamation", romaji: "chūshō" },
    { word: "中枢", meaning: "center, mainstay, nucleus", romaji: "chūsū" },
    { word: "抽選", meaning: "lottery, raffle, drawing (of lots)", romaji: "chūsen" },
    { word: "中断", meaning: "interruption, suspension, break", romaji: "chūdan" },
    { word: "中毒", meaning: "poisoning", romaji: "chūdoku" },
    { word: "中腹", meaning: "mountain side, halfway up", romaji: "chūfuku" },
    { word: "中立", meaning: "neutrality", romaji: "chūritsu" },
    { word: "中和", meaning: "neutralize, counteract", romaji: "chūwa" },
    { word: "～著", meaning: "written by ~", romaji: "～cho" },
    { word: "腸", meaning: "bowels, intestines", romaji: "chō" },
    { word: "蝶", meaning: "butterfly", romaji: "chō" },
    { word: "超", meaning: "super-, ultra-, hyper-", romaji: "chō" },
    { word: "調印", meaning: "signature, sign, sealing", romaji: "chōin" },
    { word: "聴覚", meaning: "the sense of hearing", romaji: "chōkaku" },
    { word: "長官", meaning: "chief, (government) secretary", romaji: "chōkan" },
    { word: "聴講", meaning: "lecture attendance, auditing", romaji: "chōkō" },
    { word: "徴収", meaning: "collection, levy", romaji: "chōshū" },
    { word: "聴診器", meaning: "stethoscope", romaji: "chōshinki" },
    { word: "調停", meaning: "arbitration, conciliation, mediation", romaji: "chōtei" },
    { word: "重複", meaning: "duplication, repetition, overlapping, redundancy, restoration", romaji: "chōfuku" },
    { word: "長編", meaning: "long (e.g., novel, film)", romaji: "chōhen" },
    { word: "重宝", meaning: "convenient, useful", romaji: "chōhō" },
    { word: "調理", meaning: "cooking", romaji: "chōri" },
    { word: "調和", meaning: "harmony", romaji: "chōwa" },
    { word: "ちょくちょく", meaning: "often, frequently, now and then, occasionally", romaji: "chokuchoku" },
    { word: "直面", meaning: "confrontation", romaji: "chokumen" },
    { word: "著書", meaning: "literary work, book", romaji: "chosho" },
    { word: "貯蓄", meaning: "savings", romaji: "chochiku" },
    { word: "直感", meaning: "intuition, instinct", romaji: "chokkan" },
    { word: "著名", meaning: "well-known, noted, celebrated", romaji: "chomei" },
    { word: "ちらっと", meaning: "at a glance, by accident", romaji: "chiratto" },
    { word: "塵", meaning: "dust, dirt", romaji: "chiri" },
    { word: "塵取り", meaning: "dustpan", romaji: "chiritori" },
    { word: "賃金", meaning: "wages", romaji: "chingin" },
    { word: "沈殿", meaning: "precipitation, deposition, settlement", romaji: "chinden" },
    { word: "沈没", meaning: "sinking, foundering", romaji: "chinbotsu" },
    { word: "沈黙", meaning: "silence, reticence", romaji: "chinmoku" },
    { word: "陳列", meaning: "exhibition, display, show", romaji: "chinretsu" },
    { word: "追及", meaning: "investigation, inquiry", romaji: "tsuikyū" },
    { word: "追跡", meaning: "pursuit", romaji: "tsuiseki" },
    { word: "追放", meaning: "exile, banishment", romaji: "tsuihō" },
    { word: "費やす", meaning: "to spend, to devote, to waste", romaji: "tsuiyasu" },
    { word: "墜落", meaning: "falling, crashing", romaji: "tsuiraku" },
    { word: "痛感", meaning: "feeling keenly, fully realizing", romaji: "tsūkan" },
    { word: "通常", meaning: "common, normal, usual", romaji: "tsūjō" },
    { word: "痛切", meaning: "keen, deep", romaji: "tsūsetsu" },
    { word: "杖", meaning: "cane", romaji: "tsue" },
    { word: "使い道", meaning: "use", romaji: "tsukaimichi" },
    { word: "仕える", meaning: "to serve, to work for", romaji: "tsukaeru" },
    { word: "司る", meaning: "to rule, to govern, to administer", romaji: "tsukasadoru" },
    { word: "つかの間", meaning: "moment, brief time,", romaji: "tsukanoma" },
    { word: "月並", meaning: "conventional, trite, common", romaji: "tsukinami" },
    { word: "継目", meaning: "joint, seam", romaji: "tsugime" },
    { word: "尽きる", meaning: "to be used up, to be run out", romaji: "tsukiru" },
    { word: "尽くす", meaning: "to exhaust, to run out; to devote, to serve", romaji: "tsukusu" },
    { word: "つくづく", meaning: "completely, really", romaji: "tsukuzuku" },
    { word: "作り", meaning: "make up, structure, physique", romaji: "tsukuri" },
    { word: "造り", meaning: "make up, structure, physique", romaji: "tsukuri" },
    { word: "繕う", meaning: "to mend, to repair", romaji: "tsukurō" },
    { word: "付け加える", meaning: "to add one thing to another", romaji: "tsukekuwaeru" },
    { word: "告げる", meaning: "to inform", romaji: "tsugeru" },
    { word: "つじつま (はなしの～)", meaning: "coherence, consistency", romaji: "tsujitsuma (hanashino～)" },
    { word: "筒", meaning: "pipe, tube", romaji: "tsutsu" },
    { word: "突く", meaning: "to thrust, to strike, to attack; to poke, to nudge, to pick at", romaji: "tsutsuku" },
    { word: "突っ突く", meaning: "to prompt someone", romaji: "tsuttsuku" },
    { word: "謹む", meaning: "to be careful, to be chaste or discreet", romaji: "tsutsushimu" },
    { word: "突っ張る", meaning: "to support, to become stiff; to thrust (ones opponent), to stick to (ones opinion), to insist on", romaji: "tsupparu" },
    { word: "務まる", meaning: "be equal, be fit", romaji: "tsutomaru" },
    { word: "勤め先", meaning: "place of work", romaji: "tsutomesaki" },
    { word: "努めて", meaning: "make an effort!, work hard!", romaji: "tsutomete" },
    { word: "津波", meaning: "tsunami, tidal wave", romaji: "tsunami" },
    { word: "つねる", meaning: "to pinch", romaji: "tsuneru" },
    { word: "角", meaning: "horn", romaji: "tsuno" },
    { word: "募る", meaning: "to invite, to solicit help, participation, etc", romaji: "tsunoru" },
    { word: "唾", meaning: "saliva, spit, sputum", romaji: "tsuba" },
    { word: "呟く", meaning: "to mutter, to murmur", romaji: "tsubuyaku" },
    { word: "つぶら", meaning: "round, rotund", romaji: "tsubura" },
    { word: "つぶる (めを～)", meaning: "to close the eyes", romaji: "tsuburu (mewo～)" },
    { word: "壷", meaning: "jar, pot, vase", romaji: "tsubo" },
    { word: "蕾", meaning: "bud, flower bud", romaji: "tsubomi" },
    { word: "連なる", meaning: "to extend, to stretch out, to stand in a row", romaji: "tsuranaru" },
    { word: "貫く", meaning: "to go through", romaji: "tsuranuku" },
    { word: "連ねる", meaning: "to link, to join, to put together", romaji: "tsuraneru" },
    { word: "釣り鐘", meaning: "temple bell (for striking)", romaji: "tsurigane" },
    { word: "吊り革", meaning: "strap", romaji: "tsurikawa" },
    { word: "手当", meaning: "allowance, compensation; treatment", romaji: "teate" },
    { word: "定義", meaning: "definition", romaji: "teigi" },
    { word: "提供", meaning: "offer, program sponsoring", romaji: "teikyō" },
    { word: "提携", meaning: "cooperation, tie-up, joint business", romaji: "teikei" },
    { word: "体裁", meaning: "decency, style, form, appearance", romaji: "teisai" },
    { word: "提示", meaning: "presentation, exhibit, suggest, citation", romaji: "teiji" },
    { word: "ティシュペーパー", meaning: "tissue", romaji: "teishupēpā" },
    { word: "定食", meaning: "fixed-price lunch, set meal, dinner", romaji: "teishoku" },
    { word: "訂正", meaning: "correction, revision", romaji: "teisei" },
    { word: "停滞", meaning: "stagnation, tie-up, congestion, retention", romaji: "teitai" },
    { word: "邸宅", meaning: "mansion, residence", romaji: "teitaku" },
    { word: "定年", meaning: "retirement age", romaji: "teinen" },
    { word: "堤防", meaning: "bank, weir", romaji: "teibō" },
    { word: "手遅れ", meaning: "being (too); belated treatment", romaji: "teokure" },
    { word: "でかい", meaning: "huge", romaji: "dekai" },
    { word: "手掛かり", meaning: "hint, clue, key", romaji: "tegakari" },
    { word: "手掛ける", meaning: "to handle, to manage, to work with", romaji: "tegakeru" },
    { word: "手数", meaning: "trouble, labor, handling", romaji: "tekazu" },
    { word: "手軽", meaning: "easy, simple, cheap", romaji: "tegaru" },
    { word: "適応", meaning: "adaptation, accommodation, conformity", romaji: "tekiō" },
    { word: "適宜", meaning: "suitability", romaji: "tekigi" },
    { word: "適性", meaning: "aptitude", romaji: "tekisei" },
    { word: "できもの", meaning: "boil, rash", romaji: "dekimono" },
    { word: "手際", meaning: "performance, skill, tact", romaji: "tegiwa" },
    { word: "出くわす", meaning: "to happen to meet, to come across", romaji: "dekuwasu" },
    { word: "手順", meaning: "process, procedure, protocol", romaji: "tejun" },
    { word: "手錠", meaning: "handcuffs, manacles", romaji: "tejō" },
    { word: "デコレーション", meaning: "decoration", romaji: "dekorēshon" },
    { word: "手近", meaning: "near, handy, familiar", romaji: "tejika" },
    { word: "てっきり", meaning: "surely, certainly, beyond doubt", romaji: "tekkiri" },
    { word: "鉄鋼", meaning: "iron and steel", romaji: "tekkō" },
    { word: "デッサン", meaning: "rough sketch (FRE: dessin)", romaji: "dessan" },
    { word: "徹する", meaning: "to devote oneself, to believe in", romaji: "tessuru" },
    { word: "てっぺん", meaning: "top, summit, apex", romaji: "teppen" },
    { word: "鉄棒", meaning: "iron rod, crowbar, horizontal bar (gymnastics)", romaji: "tetsubō" },
    { word: "出直し", meaning: "adjustment, touch up", romaji: "denaoshi" },
    { word: "掌", meaning: "the palm", romaji: "tenohira" },
    { word: "手配", meaning: "arrangement, search (by police)", romaji: "tehai" },
    { word: "手筈", meaning: "arrangement, plan, program", romaji: "tehazu" },
    { word: "手引", meaning: "guidance, guide, introduction", romaji: "tebiki" },
    { word: "手本", meaning: "model, pattern", romaji: "tehon" },
    { word: "手回し", meaning: "preparations, arrangements", romaji: "temawashi" },
    { word: "手元", meaning: "(money) on hand or at home, one's purse; usual skill", romaji: "temoto" },
    { word: "デモンストレーション", meaning: "demonstration", romaji: "demonsutorēshon" },
    { word: "照り返す", meaning: "to reflect, to throw back light", romaji: "terikaesu" },
    { word: "テレックス", meaning: "telex, teletypewriter exchange", romaji: "terekkusu" },
    { word: "手分け", meaning: "division of labor", romaji: "tewake" },
    { word: "天", meaning: "heaven, sky", romaji: "ten" },
    { word: "田園", meaning: "country, rural districts", romaji: "den'en" },
    { word: "天下", meaning: "the world, whole country", romaji: "tenka" },
    { word: "転回", meaning: "revolution, rotation", romaji: "tenkai" },
    { word: "連休", meaning: "consecutive holidays", romaji: "renkyū" },
    { word: "レンジ", meaning: "range, stove", romaji: "renji" },
    { word: "連日", meaning: "every day", romaji: "renjitsu" },
    { word: "連帯", meaning: "solidarity", romaji: "rentai" },
    { word: "レンタカー", meaning: "rented car", romaji: "rentakā" },
    { word: "連中", meaning: "colleagues, company, a lot", romaji: "renchū" },
    { word: "レントゲン", meaning: "X-ray (lit: Roentgen)", romaji: "rentogen" },
    { word: "連邦", meaning: "commonwealth, federation of states", romaji: "renpō" },
    { word: "連盟", meaning: "league, union, alliance", romaji: "renmei" },
    { word: "老衰", meaning: "senility, senile decay", romaji: "rōsui" },
    { word: "朗読", meaning: "reading aloud, recitation", romaji: "rōdoku" },
    { word: "浪費", meaning: "waste, extravagance", romaji: "rōhi" },
    { word: "労力", meaning: "labor, effort, trouble", romaji: "rōryoku" },
    { word: "ロープウエイ", meaning: "ropeway, aerial tram", romaji: "rōpūei" },
    { word: "ロープ", meaning: "rope", romaji: "rōpu" },
    { word: "ろくな", meaning: "satisfactory, decent", romaji: "rokuna" },
    { word: "露骨", meaning: "blunt, outspoken; conspicuous; broad, suggestive", romaji: "rokotsu" },
    { word: "ロマンチック", meaning: "romantic", romaji: "romanchikku" },
    { word: "論議", meaning: "discussion", romaji: "rongi" },
    { word: "論理", meaning: "logic", romaji: "ronri" },
    { word: "惑星", meaning: "planet", romaji: "wakusei" },
    { word: "技", meaning: "art, technique", romaji: "waza" },
    { word: "わざわざ", meaning: "take the trouble (to do), doing something especially rather than incidentally", romaji: "wazawaza" },
    { word: "煩わしい", meaning: "burdensome, troublesome, complicated", romaji: "wazurawashī" },
    { word: "渡り鳥", meaning: "migratory bird, bird of passage", romaji: "wataridori" },
    { word: "ワット", meaning: "watt", romaji: "watto" },
    { word: "詫び", meaning: "apology", romaji: "wabi" },
    { word: "和文", meaning: "Japanese text, sentence in Japanese", romaji: "wabun" },
    { word: "藁", meaning: "straw", romaji: "wara" },
    { word: "～割", meaning: "~ percent", romaji: "～wari" },
    { word: "割当", meaning: "allotment, allocation, quota", romaji: "wariate" },
    { word: "割込む", meaning: "to cut in, to disturb", romaji: "warikomu" },
    { word: "悪者", meaning: "bad fellow, rascal", romaji: "warumono" },
    { word: "捗る", meaning: "to make progress, to move right ahead (with the work), to advance", romaji: "hakadoru" },
    { word: "はかない", meaning: "short-lived, momentary, ephemeral", romaji: "hakanai" },
    { word: "ばかばかしい", meaning: "stupid", romaji: "bakabakashī" },
    { word: "破棄", meaning: "revocation, annulment, breaking (e.g., treaty)", romaji: "haki" },
    { word: "剥ぐ", meaning: "to tear off, to peel off, to rip off", romaji: "hagu" },
    { word: "迫害", meaning: "persecution", romaji: "hakugai" },
    { word: "薄弱", meaning: "feebleness, weakness, weak", romaji: "hakujaku" },
    { word: "白状", meaning: "confession", romaji: "hakujō" },
    { word: "漠然", meaning: "obscure, vague, equivocal", romaji: "bakuzen" },
    { word: "爆弾", meaning: "bomb", romaji: "bakudan" },
    { word: "爆破", meaning: "blast, explosion, blow up", romaji: "bakuha" },
    { word: "暴露", meaning: "disclosure, exposure, revelation", romaji: "bakuro" },
    { word: "励ます", meaning: "to encourage, to cheer, to raise (the voice)", romaji: "hagemasu" },
    { word: "励む", meaning: "to be zealous, to make an effort", romaji: "hagemu" },
    { word: "剥げる", meaning: "to come off, to be worn off, to fade, to discolor", romaji: "hageru" },
    { word: "化ける", meaning: "to disguise, to take the form of", romaji: "bakeru" },
    { word: "派遣", meaning: "dispatch, send", romaji: "haken" },
    { word: "恥", meaning: "shame, embarrassment", romaji: "haji" },
    { word: "弾く", meaning: "to play (piano, guitar)", romaji: "hajiku" },
    { word: "パジャマ", meaning: "pajamas", romaji: "pajama" },
    { word: "恥じらう", meaning: "to feel shy, to be bashful, to blush", romaji: "hajirau" },
    { word: "恥じる", meaning: "to feel ashamed", romaji: "hajiru" },
    { word: "橋渡し", meaning: "bridge building', mediation", romaji: "hashiwatashi" },
    { word: "弾む", meaning: "to bounce, to be encouraged, to splurge on", romaji: "hazumu" },
    { word: "破損", meaning: "damage", romaji: "hason" },
    { word: "叩く", meaning: "to strike, to clap, to dust, to beat", romaji: "hataku" },
    { word: "裸足", meaning: "barefoot", romaji: "hadashi" },
    { word: "果たす", meaning: "to accomplish, to fulfill, to carry out, to achieve", romaji: "hatasu" },
    { word: "蜂蜜", meaning: "honey", romaji: "hachimitsu" },
    { word: "パチンコ", meaning: "pachinko (Japanese pinball)", romaji: "pachinko" },
    { word: "罰", meaning: "punishment, penalty", romaji: "batsu" },
    { word: "発育", meaning: "(physical) growth, development", romaji: "hatsuiku" },
    { word: "発芽", meaning: "germination", romaji: "hatsuga" },
    { word: "発掘", meaning: "excavation, exhumation; discovery (e.g., new talent)", romaji: "hakkutsu" },
    { word: "発言", meaning: "utterance, speech, proposal", romaji: "hatsugen" },
    { word: "バッジ", meaning: "badge", romaji: "bajji" },
    { word: "発生", meaning: "outbreak, spring forth, occurrence", romaji: "hassei" },
    { word: "仕立てる", meaning: "to tailor, to make, to prepare", romaji: "shitateru" },
    { word: "下取り", meaning: "trade in, part exchange", romaji: "shitadori" },
    { word: "下火", meaning: "burning low, waning, declining", romaji: "shitabi" },
    { word: "実", meaning: "fruit, good result", romaji: "jitsu" },
    { word: "実家", meaning: "(one's parents') home", romaji: "jikka" },
    { word: "失格", meaning: "disqualification, elimination, incapacity (legal)", romaji: "shikkaku" },
    { word: "質疑", meaning: "question", romaji: "shitsugi" },
    { word: "失脚", meaning: "losing one's standing, being overthrown, falling", romaji: "shikkyaku" },
    { word: "実業家", meaning: "industrialist, businessman", romaji: "jitsugyōka" },
    { word: "シック", meaning: "chic", romaji: "shikku" },
    { word: "じっくり", meaning: "deliberately, carefully", romaji: "jikkuri" },
    { word: "躾", meaning: "discipline, training", romaji: "shitsuke" },
    { word: "躾ける", meaning: "to discipline, to teach manners", romaji: "shitsukeru" },
    { word: "実践", meaning: "practice, put into practice", romaji: "jissen" },
    { word: "質素", meaning: "simplicity, modesty, frugality", romaji: "shisso" },
    { word: "実態", meaning: "truth, fact", romaji: "jittai" },
    { word: "失調", meaning: "lack of harmony, imbalance", romaji: "shitchō" },
    { word: "嫉妬", meaning: "jealousy", romaji: "shitto" },
    { word: "実費", meaning: "actual expense, cost price", romaji: "jippi" },
    { word: "指摘", meaning: "pointing out, identification", romaji: "shiteki" },
    { word: "自転", meaning: "rotation, spin", romaji: "jiten" },
    { word: "助動詞", meaning: "auxiliary verb", romaji: "jodōshi" },
    { word: "淑やか", meaning: "graceful", romaji: "shitoyaka" },
    { word: "萎びる", meaning: "to shrivel, to fade", romaji: "shinabiru" },
    { word: "シナリオ", meaning: "scenario", romaji: "shinario" },
    { word: "しなやか", meaning: "supple, flexible, elastic", romaji: "shinayaka" },
    { word: "屎尿", meaning: "human waste", romaji: "shinyō" },
    { word: "地主", meaning: "landlord", romaji: "jinushi" },
    { word: "凌ぐ", meaning: "to outdo, to surpass; to endure", romaji: "shinogu" },
    { word: "芝", meaning: "lawn", romaji: "shiba" },
    { word: "始発", meaning: "first train", romaji: "shihatsu" },
    { word: "耳鼻科", meaning: "otolaryngology", romaji: "jibika" },
    { word: "私物", meaning: "private property, personal effects", romaji: "shibutsu" },
    { word: "しぶとい", meaning: "tenacious, stubborn", romaji: "shibutoi" },
    { word: "司法", meaning: "administration of justice", romaji: "shihō" },
    { word: "始末", meaning: "disposal; cleaning up afterwards", romaji: "shimatsu" },
    { word: "染みる", meaning: "to soak; pierce", romaji: "shimiru" },
    { word: "使命", meaning: "mission, errand, message", romaji: "shimei" },
    { word: "地元", meaning: "local", romaji: "jimoto" },
    { word: "視野", meaning: "field of vision, outlook", romaji: "shiya" },
    { word: "弱", meaning: "delicate, supple", romaji: "jaku" },
    { word: "社交", meaning: "social life", romaji: "shakō" },
    { word: "ジャズ", meaning: "jazz", romaji: "jazu" },
    { word: "謝絶", meaning: "refusal", romaji: "shazetsu" },
    { word: "社宅", meaning: "company owned house", romaji: "shataku" },
    { word: "若干", meaning: "some, few, number of", romaji: "jakkan" },
    { word: "三味線", meaning: "three-stringed Japanese guitar", romaji: "shamisen" },
    { word: "斜面", meaning: "slope, slanting surface, bevel", romaji: "shamen" },
    { word: "砂利", meaning: "gravel, ballast, pebbles", romaji: "jari" },
    { word: "洒落る", meaning: "to joke, to play on words; stylish", romaji: "shareru" },
    { word: "ジャンパー", meaning: "jacket, jumper", romaji: "janpā" },
    { word: "ジャンプ", meaning: "jump", romaji: "janpu" },
    { word: "ジャンボ", meaning: "jumbo", romaji: "janbo" },
    { word: "ジャンル", meaning: "genre", romaji: "janru" },
    { word: "種", meaning: "seed; variety", romaji: "shu" },
    { word: "私有", meaning: "private ownership", romaji: "shiyū" },
    { word: "～宗", meaning: "sect", romaji: "～shū" },
    { word: "収益", meaning: "earnings, proceeds, returns", romaji: "shūeki" },
    { word: "修学", meaning: "learning", romaji: "shūgaku" },
    { word: "周期", meaning: "cycle, period", romaji: "shūki" },
    { word: "衆議院", meaning: "Lower House, House of Representatives", romaji: "shūgīn" },
    { word: "就業", meaning: "employment, starting work", romaji: "shūgyō" },
    { word: "従業員", meaning: "employee, worker", romaji: "jūgyōin" },
    { word: "集計", meaning: "totalization, aggregate", romaji: "shūkei" },
    { word: "襲撃", meaning: "attack, charge, raid", romaji: "shūgeki" },
    { word: "収支", meaning: "income and expenditure", romaji: "shūshi" },
    { word: "終始", meaning: "from beginning to end; consistent(ly)", romaji: "shūshi" },
    { word: "修士", meaning: "Masters degree program", romaji: "shūshi" },
    { word: "従事", meaning: "engaging, pursuing, following", romaji: "jūji" },
    { word: "終日", meaning: "all day", romaji: "shūjitsu" },
    { word: "充実", meaning: "fullness, perfection", romaji: "jūjitsu" },
    { word: "収集", meaning: "gathering up, collection", romaji: "shūshū" },
    { word: "十字路", meaning: "crossroads", romaji: "jūjiro" },
    { word: "執着", meaning: "attachment, adhesion, tenacity", romaji: "shūjaku" },
    { word: "柔軟", meaning: "flexible", romaji: "jūnan" },
    { word: "収容", meaning: "accommodation; seating; custody", romaji: "shūyō" },
    { word: "従来", meaning: "up to now, so far, traditional", romaji: "jūrai" },
    { word: "守衛", meaning: "security guard, doorkeeper", romaji: "shuei" },
    { word: "主演", meaning: "starring, playing the leading part", romaji: "shuen" },
    { word: "主観", meaning: "subjectivity, subject, ego", romaji: "shukan" },
    { word: "修行", meaning: "pursuit of knowledge, training, ascetic practice", romaji: "shugyō" },
    { word: "塾", meaning: "after-school (cram) school", romaji: "juku" },
    { word: "祝賀", meaning: "celebration, congratulations", romaji: "shukuga" },
    { word: "宿命", meaning: "fate, destiny, predestination", romaji: "shukumei" },
    { word: "手芸", meaning: "handicrafts", romaji: "shugei" },
    { word: "主権", meaning: "sovereignty", romaji: "shuken" },
    { word: "主催", meaning: "organization, sponsorship, to host", romaji: "shusai" },
    { word: "取材", meaning: "coverage, collecting data", romaji: "shuzai" },
    { word: "趣旨", meaning: "object, meaning", romaji: "shushi" },
    { word: "種々", meaning: "variety", romaji: "shuju" },
    { word: "主食", meaning: "staple food", romaji: "shushoku" },
    { word: "主人公", meaning: "protagonist", romaji: "shujinkō" },
    { word: "主体", meaning: "subject, main constituent", romaji: "shutai" },
    { word: "主題", meaning: "subject, theme, motif", romaji: "shudai" },
    { word: "出演", meaning: "leading performer, stage appearance", romaji: "shutsuen" },
    { word: "出血", meaning: "bleeding", romaji: "shukketsu" },
    { word: "出現", meaning: "appearance, arrival", romaji: "shutsugen" },
    { word: "出産", meaning: "childbirth", romaji: "shussan" },
    { word: "出社", meaning: "come to work", romaji: "shussha" },
    { word: "出生", meaning: "birth", romaji: "shusshō" },
    { word: "微量", meaning: "minuscule amount, extremely small quantity", romaji: "biryō" },
    { word: "昼飯", meaning: "lunch (mid-day meal)", romaji: "hirumeshi" },
    { word: "比例", meaning: "proportion", romaji: "hirei" },
    { word: "疲労", meaning: "fatigue, weariness", romaji: "hirō" },
    { word: "敏感", meaning: "sensibility, susceptibility, sensitive (to)", romaji: "binkan" },
    { word: "貧困", meaning: "poverty, lack", romaji: "hinkon" },
    { word: "品質", meaning: "quality", romaji: "hinshitsu" },
    { word: "貧弱", meaning: "poor, meager, insubstantial", romaji: "hinjaku" },
    { word: "品種", meaning: "breed, type, variety", romaji: "hinshu" },
    { word: "ヒント", meaning: "hint", romaji: "hinto" },
    { word: "頻繁", meaning: "frequency", romaji: "hinpan" },
    { word: "貧乏", meaning: "poverty, destitute, poor", romaji: "binbō" },
    { word: "ファイト", meaning: "fight", romaji: "fuaito" },
    { word: "ファイル", meaning: "file; portfolio", romaji: "fuairu" },
    { word: "ファン", meaning: "fan", romaji: "fuan" },
    { word: "不意", meaning: "sudden, abrupt, unexpected", romaji: "fui" },
    { word: "フィルタ", meaning: "filter", romaji: "fyiruta" },
    { word: "封", meaning: "seal", romaji: "fū" },
    { word: "封鎖", meaning: "blockade, freezing (funds)", romaji: "fūsa" },
    { word: "風車", meaning: "windmill", romaji: "fūsha" },
    { word: "風習", meaning: "custom", romaji: "fūshū" },
    { word: "風俗", meaning: "manners, customs; sex industry", romaji: "fūzoku" },
    { word: "ブーツ", meaning: "boots", romaji: "būtsu" },
    { word: "風土", meaning: "natural features, climate", romaji: "fūdo" },
    { word: "ブーム", meaning: "boom", romaji: "būmu" },
    { word: "フォーム", meaning: "foam; form", romaji: "fuōmu" },
    { word: "部下", meaning: "one's subordinate", romaji: "buka" },
    { word: "不可欠", meaning: "indispensable, essential", romaji: "fukaketsu" },
    { word: "ぶかぶか", meaning: "too big, baggy", romaji: "bukabuka" },
    { word: "不吉", meaning: "ominous, sinister, bad luck, ill omen", romaji: "fukitsu" },
    { word: "不況", meaning: "recession, depression, slump", romaji: "fukyō" },
    { word: "布巾", meaning: "dish cloth", romaji: "fukin" },
    { word: "複合", meaning: "composite, complex", romaji: "fukugō" },
    { word: "福祉", meaning: "welfare, well-being", romaji: "fukushi" },
    { word: "覆面", meaning: "mask, veil, disguise", romaji: "fukumen" },
    { word: "膨れる", meaning: "to swell (out), to be inflated, to bulge", romaji: "fukureru" },
    { word: "不景気", meaning: "business recession, hard times, depression", romaji: "fukeiki" },
    { word: "耽る", meaning: "to indulge in, to give oneself up to, to be absorbed in", romaji: "fukeru" },
    { word: "老ける", meaning: "to age", romaji: "fukeru" },
    { word: "富豪", meaning: "wealthy person, millionaire", romaji: "fugō" },
    { word: "布告", meaning: "edict, ordinance, proclamation", romaji: "fukoku" },
    { word: "ブザー", meaning: "buzzer", romaji: "buzā" },
    { word: "負債", meaning: "debt, liabilities", romaji: "fusai" },
    { word: "不在", meaning: "absence", romaji: "fuzai" },
    { word: "ふさわしい", meaning: "appropriate", romaji: "fusawashī" },
    { word: "不順", meaning: "irregularity, unseasonableness", romaji: "fujun" },
    { word: "負傷", meaning: "injury, wound", romaji: "fushō" },
    { word: "侮辱", meaning: "insult, contempt, slight", romaji: "bujoku" },
    { word: "不審", meaning: "suspicious, doubt, infidelity", romaji: "fushin" },
    { word: "不振", meaning: "dullness, slump, stagnation", romaji: "fushin" },
    { word: "武装", meaning: "arms, armament, armed", romaji: "busō" },
    { word: "札", meaning: "token, label; ticket, card; charm, talisman", romaji: "fuda" },
    { word: "負担", meaning: "burden; load", romaji: "futan" },
    { word: "不調", meaning: "bad condition, disorder, slump", romaji: "fuchō" },
    { word: "復活", meaning: "revival (e.g., musical), restoration", romaji: "fukkatsu" },
    { word: "物議", meaning: "public discussion (criticism)", romaji: "butsugi" },
    { word: "復旧", meaning: "restoration, restitution, rehabilitation", romaji: "fukkyū" },
    { word: "復興", meaning: "revival, renaissance, reconstruction", romaji: "fukkō" },
    { word: "物資", meaning: "goods, materials", romaji: "busshi" },
    { word: "仏像", meaning: "Buddhist image (statue)", romaji: "butsuzō" },
    { word: "物体", meaning: "object", romaji: "buttai" },
    { word: "沸騰", meaning: "boiling, seething", romaji: "futtō" },
    { word: "不当", meaning: "injustice, impropriety, unfair", romaji: "futō" },
    { word: "不動産", meaning: "real estate", romaji: "fudōsan" },
    { word: "無難", meaning: "safety, security", romaji: "bunan" },
    { word: "赴任", meaning: "(proceeding to) new appointment", romaji: "funin" },
    { word: "腐敗", meaning: "decay, depravity", romaji: "fuhai" },
    { word: "不評", meaning: "bad reputation, disgrace, unpopularity", romaji: "fuhyō" },
    { word: "不服", meaning: "dissatisfaction, discontent, disapproval", romaji: "fufuku" },
    { word: "普遍", meaning: "universality, ubiquity, omnipresence", romaji: "fuhen" },
    { word: "踏まえる", meaning: "to be based on, to have origin in", romaji: "fumaeru" },
    { word: "踏み込む", meaning: "to step into (someone else's territory, to break into, to raid", romaji: "fumikomu" },
    { word: "不明", meaning: "unknown, ambiguous", romaji: "fumei" },
    { word: "部門", meaning: "class, group, category, department, field, branch", romaji: "bumon" },
    { word: "扶養", meaning: "support, maintenance", romaji: "fuyō" },
    { word: "ふらふら", meaning: "unsteady on one's feet, totter, dizzy", romaji: "furafura" },
    { word: "ぶらぶら", meaning: "dangle heavily, sway to and fro, stroll idly", romaji: "burabura" },
    { word: "振り返る", meaning: "to turn head, to turn around, to look back", romaji: "furikaeru" },
    { word: "振り出し", meaning: "outset, starting point, drawing or issuing (draft)", romaji: "furidashi" },
    { word: "不良", meaning: "badness, delinquent, failure", romaji: "furyō" },
    { word: "浮力", meaning: "buoyancy", romaji: "furyoku" },
    { word: "武力", meaning: "armed might, military power, the sword, force", romaji: "buryoku" },
    { word: "ブル", meaning: "bull", romaji: "buru" },
    { word: "震わせる", meaning: "to be shaking, to be trembling", romaji: "furuwaseru" },
    { word: "無礼", meaning: "impolite, rude", romaji: "burei" },
    { word: "付録", meaning: "appendix, supplement", romaji: "furoku" },
    { word: "フロント", meaning: "front", romaji: "furonto" },
    { word: "憤慨", meaning: "indignation, resentment", romaji: "fungai" },
    { word: "文化財", meaning: "cultural assets, cultural property", romaji: "bunkazai" },
    { word: "分業", meaning: "division of labor, specialization, assembly-line production", romaji: "bungyō" },
    { word: "文語", meaning: "written language, literary language", romaji: "bungo" },
    { word: "分散", meaning: "dispersion, decentralization, variance (statistics)", romaji: "bunsan" },
    { word: "分子", meaning: "numerator, molecule", romaji: "bunshi" },
    { word: "紛失", meaning: "losing something", romaji: "funshitsu" },
    { word: "噴出", meaning: "spewing, gushing, spouting", romaji: "funshutsu" },
    { word: "文書", meaning: "document, writing", romaji: "bunsho" },
    { word: "紛争", meaning: "dispute, trouble, strife", romaji: "funsō" },
    { word: "ふんだん", meaning: "plentiful, abundant, lavish", romaji: "fundan" },
    { word: "分担", meaning: "apportionment, sharing", romaji: "buntan" },
    { word: "奮闘", meaning: "hard struggle, strenuous effort", romaji: "funtō" },
    { word: "分配", meaning: "division, sharing", romaji: "bunpai" },
    { word: "分母", meaning: "denominator", romaji: "bunbo" },
    { word: "粉末", meaning: "fine powder", romaji: "funmatsu" },
    { word: "分離", meaning: "separation, detachment, segregation", romaji: "bunri" },
    { word: "分裂", meaning: "split, division, break up", romaji: "bunretsu" },
    { word: "ペア", meaning: "pair, pear", romaji: "pea" },
    { word: "兵器", meaning: "arms, weapons, ordinance", romaji: "heiki" },
    { word: "閉口", meaning: "shut mouth", romaji: "heikō" },
    { word: "閉鎖", meaning: "closing, closure, shutdown", romaji: "heisa" },
    { word: "兵士", meaning: "soldier", romaji: "heishi" },
    { word: "平常", meaning: "normal, usual", romaji: "heijō" },
    { word: "平方", meaning: "square (e.g., meter, square)", romaji: "heihō" },
    { word: "並列", meaning: "arrangement, parallel, abreast", romaji: "heiretsu" },
    { word: "ベース", meaning: "base, bass", romaji: "bēsu" },
    { word: "辟易", meaning: "wince, shrink back, succumbing to, being frightened", romaji: "hekieki" },
    { word: "ぺこぺこ", meaning: "fawn, be very hungry", romaji: "pekopeko" },
    { word: "ベスト", meaning: "best; vest", romaji: "besuto" },
    { word: "ベストセラー", meaning: "best-seller", romaji: "besutoserā" },
    { word: "隔たる", meaning: "to be distant", romaji: "hedataru" },
    { word: "縁", meaning: "edge", romaji: "heri" },
    { word: "へりくだる", meaning: "to deprecate oneself and praise the listener", romaji: "herikudaru" },
    { word: "弁解", meaning: "explanation, justification, excuse", romaji: "benkai" },
    { word: "変革", meaning: "change, reform(the) Reformation", romaji: "henkaku" },
    { word: "返還", meaning: "return, restoration", romaji: "henkan" },
    { word: "便宜", meaning: "convenience, accommodation", romaji: "bengi" },
    { word: "偏見", meaning: "prejudice, narrow view", romaji: "henken" },
    { word: "弁護", meaning: "defense, pleading, advocacy", romaji: "bengo" },
    { word: "返済", meaning: "repayment", romaji: "hensai" },
    { word: "弁償", meaning: "compensation, reparation, reimbursement", romaji: "benshō" },
    { word: "変遷", meaning: "change, transition, vicissitudes", romaji: "hensen" },
    { word: "返答", meaning: "reply", romaji: "hentō" },
    { word: "変動", meaning: "change, fluctuation", romaji: "hendō" },
    { word: "弁論", meaning: "discussion, debate, argument", romaji: "benron" },
    { word: "穂", meaning: "ear (of plant), head (of plant)", romaji: "ho" },
    { word: "保育", meaning: "nursing, nurturing, rearing", romaji: "hoiku" },
    { word: "ボイコット", meaning: "boycott", romaji: "boikotto" },
    { word: "ポイント", meaning: "point", romaji: "pointo" },
    { word: "法案", meaning: "bill (law)", romaji: "hōan" },
    { word: "防衛", meaning: "defense, protection, self-defense", romaji: "bōei" },
    { word: "防火", meaning: "fire prevention, fire fighting, fire proof", romaji: "bōka" },
    { word: "崩壊", meaning: "collapse, decay (physics), crumbling", romaji: "hōkai" },
    { word: "妨害", meaning: "disturbance, obstruction, interference", romaji: "bōgai" },
    { word: "法学", meaning: "law, jurisprudence", romaji: "hōgaku" },
    { word: "封建", meaning: "feudalistic", romaji: "hōken" },
    { word: "豊作", meaning: "abundant harvest, bumper crop", romaji: "hōsaku" },
    { word: "方策", meaning: "plan, policy", romaji: "hōsaku" },
    { word: "奉仕", meaning: "attendance, service", romaji: "hōshi" },
    { word: "方式", meaning: "form, method, system", romaji: "hōshiki" },
    { word: "放射", meaning: "radiation, emission", romaji: "hōsha" },
    { word: "放射能", meaning: "radioactivity", romaji: "hōshanō" },
    { word: "報酬", meaning: "remuneration, recompense, reward", romaji: "hōshū" },
    { word: "放出", meaning: "release, emit", romaji: "hōshutsu" },
    { word: "報じる", meaning: "to inform, to report", romaji: "hōjiru" },
    { word: "報ずる", meaning: "to inform, to report", romaji: "hōzuru" },
    { word: "紡績", meaning: "spinning", romaji: "bōseki" },
    { word: "呆然", meaning: "dumbfounded, overcome with surprise", romaji: "bōzen" },
    { word: "放置", meaning: "leave as is, leave alone, neglect", romaji: "hōchi" },
    { word: "膨張", meaning: "expansion, swelling, increase", romaji: "bōchō" },
    { word: "法廷", meaning: "courtroom", romaji: "hōtei" },
    { word: "報道", meaning: "coverage, report", romaji: "hōdō" },
    { word: "冒頭", meaning: "beginning, start, outset", romaji: "bōtō" },
    { word: "暴動", meaning: "insurrection, riot, uprising", romaji: "bōdō" },
    { word: "褒美", meaning: "reward, prize", romaji: "hōbi" },
    { word: "暴風", meaning: "storm, windstorm, gale", romaji: "bōfū" },
    { word: "葬る", meaning: "to bury, to entomb", romaji: "hōmuru" },
    { word: "放り込む", meaning: "to throw into", romaji: "hōrikomu" },
    { word: "放り出す", meaning: "to throw out, to give up, to abandon", romaji: "hōridasu" },
    { word: "暴力", meaning: "violence", romaji: "bōryoku" },
    { word: "飽和", meaning: "saturation", romaji: "hōwa" },
    { word: "ホース", meaning: "hose", romaji: "hōsu" },
    { word: "ポーズ", meaning: "pause", romaji: "pōzu" },
    { word: "ホール", meaning: "hall; hole", romaji: "hōru" },
    { word: "保温", meaning: "retaining warmth, keeping heat in, heat insulation", romaji: "hōn" },
    { word: "捕獲", meaning: "capture, seizure", romaji: "hokaku" },
    { word: "保管", meaning: "custody, safekeeping, storage", romaji: "hokan" },
    { word: "補給", meaning: "supply, supplying, replenishment", romaji: "hokyū" },
    { word: "補強", meaning: "reinforcement", romaji: "hokyō" },
    { word: "募金", meaning: "fund-raising, collection of funds", romaji: "bokin" },
    { word: "牧師", meaning: "pastor, minister, clergyman", romaji: "bokushi" },
    { word: "捕鯨", meaning: "whaling", romaji: "hogei" },
    { word: "惚ける", meaning: "to grow senile, to fade", romaji: "bokeru" },
    { word: "保険", meaning: "insurance, guarantee", romaji: "hoken" },
    { word: "母校", meaning: "alma mater", romaji: "bokō" },
    { word: "母国", meaning: "one's home country (same as 自分の国 (じぶんのくに))", romaji: "bokoku" },
    { word: "誇る", meaning: "to boast of, to be proud of", romaji: "hokoru" },
    { word: "綻びる", meaning: "to come apart at the seams, to smile broadly", romaji: "hokorobiru" },
    { word: "干し～", meaning: "dried ~", romaji: "hoshi～" },
    { word: "ポジション", meaning: "position", romaji: "pojishon" },
    { word: "干し物", meaning: "dried washing (clothes", romaji: "hoshimono" },
    { word: "保守", meaning: "conservative, maintaining", romaji: "hoshu" },
    { word: "補充", meaning: "supplementation, replenishment, replenishing", romaji: "hojū" },
    { word: "補助", meaning: "assistance, support, auxiliary", romaji: "hojo" },
    { word: "舗装", meaning: "pavement, road surface", romaji: "hosō" },
    { word: "補足", meaning: "supplement, complement", romaji: "hosoku" },
    { word: "墓地", meaning: "cemetery, graveyard", romaji: "bochi" },
    { word: "発作", meaning: "fit, attack", romaji: "hossa" },
    { word: "没収", meaning: "forfeited", romaji: "bosshū" },
    { word: "発足", meaning: "starting, inauguration", romaji: "hossoku" },
    { word: "ポット", meaning: "pot", romaji: "potto" },
    { word: "ほっぺた", meaning: "cheek", romaji: "hoppeta" },
    { word: "ぼつぼつ", meaning: "gradually, here and there, spots", romaji: "botsubotsu" },
    { word: "没落", meaning: "ruin, fall, collapse", romaji: "botsuraku" },
    { word: "解ける", meaning: "to come untied, to come apart", romaji: "hodokeru" },
    { word: "施す", meaning: "to give, to conduct, to perform", romaji: "hodokosu" },
    { word: "ほとり", meaning: "vicinity of lake; river", romaji: "hotori" },
    { word: "ぼやく", meaning: "to grumble, to complain", romaji: "boyaku" },
    { word: "ぼやける", meaning: "to become dim, to become blurred", romaji: "boyakeru" },
    { word: "保養", meaning: "health preservation, recuperation, recreation", romaji: "hoyō" },
    { word: "捕虜", meaning: "prisoner of war", romaji: "horyo" },
    { word: "ボルト", meaning: "volt; bolt", romaji: "boruto" },
    { word: "滅びる", meaning: "to be ruined, to perish, to be destroyed", romaji: "horobiru" },
    { word: "滅ぼす", meaning: "to destroy, to overthrow, to ruin", romaji: "horobosu" },
    { word: "本格", meaning: "propriety, full-scale", romaji: "honkaku" },
    { word: "本館", meaning: "main building", romaji: "honkan" },
    { word: "本気", meaning: "seriousness, truth, sanctity", romaji: "honki" },
    { word: "本国", meaning: "one's own country", romaji: "hongoku" },
    { word: "本質", meaning: "essence, true nature, reality", romaji: "honshitsu" },
    { word: "本体", meaning: "substance, body, trunk", romaji: "hontai" },
    { word: "本音", meaning: "(one's) real intention, motive", romaji: "honne" },
    { word: "本能", meaning: "instinct", romaji: "honnō" },
    { word: "本場", meaning: "home, best place, genuine", romaji: "honba" },
    { word: "ポンプ", meaning: "pump", romaji: "ponpu" },
    { word: "本文", meaning: "text (of document), body (of letter)", romaji: "honbun" },
    { word: "本名", meaning: "real name", romaji: "honmyō" },
    { word: "マーク", meaning: "mark", romaji: "māku" },
    { word: "マイ～", meaning: "my ~, one's own ~", romaji: "mai～" },
    { word: "マイクロフォン", meaning: "microphone", romaji: "maikurofuon" },
    { word: "埋蔵", meaning: "buried property, treasure trove", romaji: "maizō" },
    { word: "舞う", meaning: "to dance, to flutter about, to revolve", romaji: "mau" },
    { word: "真上", meaning: "just above, right overhead", romaji: "maue" },
    { word: "前売", meaning: "advance sale, booking", romaji: "maeuri" },
    { word: "前置き", meaning: "preface, introduction", romaji: "maeoki" },
    { word: "任す", meaning: "to entrust, to leave to a person", romaji: "makasu" },
    { word: "負かす", meaning: "to defeat", romaji: "makasu" },
    { word: "賄う", meaning: "to give board to, to provide meals, to pay", romaji: "makanau" },
    { word: "紛らわしい", meaning: "confusing, misleading, ambiguous", romaji: "magirawashī" },
    { word: "紛れる", meaning: "to be diverted, to slip into", romaji: "magireru" },
    { word: "真心", meaning: "sincerity, devotion", romaji: "magokoro" },
    { word: "まごつく", meaning: "to be confused, to be flustered", romaji: "magotsuku" },
    { word: "誠", meaning: "truth, faith, fidelity", romaji: "makoto" },
    { word: "誠に", meaning: "indeed, really (very polite), absolutely", romaji: "makotoni" },
    { word: "まさしく", meaning: "surely, no doubt, evidently", romaji: "masashiku" },
    { word: "勝る", meaning: "to excel, to surpass, to out-rival", romaji: "masaru" },
    { word: "～増し", meaning: "~increase", romaji: "～mashi" },
    { word: "交える", meaning: "to mix, to converse with, to cross (swords)", romaji: "majieru" },
    { word: "真下", meaning: "right under, directly below", romaji: "mashita" },
    { word: "まして", meaning: "still more, still less (with neg. verb), to say nothing of", romaji: "mashite" },
    { word: "交わる", meaning: "to cross, to intersect, to mingle with,", romaji: "majiwaru" },
    { word: "麻酔", meaning: "anesthesia", romaji: "masui" },
    { word: "またがる (うまを～)", meaning: "to straddle", romaji: "matagaru (umawo～)" },
    { word: "待ち合わせ", meaning: "appointment", romaji: "machiawase" },
    { word: "待ち遠しい", meaning: "looking forward to", romaji: "machidōshī" },
    { word: "待ち望む", meaning: "to look anxiously for, to wait eagerly for", romaji: "machinozomu" },
    { word: "まちまち", meaning: "various, different", romaji: "machimachi" },
    { word: "末期", meaning: "deathbed, hour of death", romaji: "makki" },
    { word: "真っ二つ", meaning: "in two equal parts", romaji: "mapputatsu" },
    { word: "まと", meaning: "mark, target", romaji: "mato" },
    { word: "纏まり", meaning: "conclusion, settlement, consistency", romaji: "matomari" },
    { word: "纏め", meaning: "settlement, conclusion", romaji: "matome" },
    { word: "免れる", meaning: "to escape from, to be exempted", romaji: "manugareru" },
    { word: "招き", meaning: "invitation", romaji: "maneki" },
    { word: "瞬き", meaning: "wink, twinkling (of stars), flicker (of light)", romaji: "mabataki" },
    { word: "麻痺", meaning: "paralysis, palsy, numbness", romaji: "mahi" },
    { word: "～まみれ", meaning: "covered with (by, in) ~", romaji: "～mamire" },
    { word: "眉", meaning: "eyebrow", romaji: "mayu" },
    { word: "鞠", meaning: "ball", romaji: "mari" },
    { word: "丸ごと", meaning: "in its entirety, whole, wholly", romaji: "marugoto" },
    { word: "まるっきり", meaning: "completely, perfectly, just as if", romaji: "marukkiri" },
    { word: "丸々", meaning: "completely", romaji: "marumaru" },
    { word: "丸める", meaning: "to make round, to round off, to roll up", romaji: "marumeru" },
    { word: "満月", meaning: "full moon", romaji: "mangetsu" },
    { word: "満場", meaning: "unanimous, whole audience", romaji: "manjō" },
    { word: "真ん前", meaning: "right in front, under the nose", romaji: "manmae" },
    { word: "真ん丸い", meaning: "perfectly circular", romaji: "manmarui" },
    { word: "真ん円い", meaning: "perfectly round", romaji: "manmarui" },
    { word: "～味", meaning: "~ cast (sense of taste)", romaji: "～mi" },
    { word: "見合い", meaning: "formal marriage interview", romaji: "miai" },
    { word: "見合わせる", meaning: "to exchange glances; to postpone", romaji: "miawaseru" },
    { word: "見落とす", meaning: "to overlook, to fail to notice", romaji: "miotosu" },
    { word: "未開", meaning: "savage land, backward region, uncivilized", romaji: "mikai" },
    { word: "味覚", meaning: "taste, palate, sense of taste", romaji: "mikaku" },
    { word: "幹", meaning: "(tree) trunk", romaji: "miki" },
    { word: "見苦しい", meaning: "unsightly, ugly", romaji: "migurushī" },
    { word: "見込み", meaning: "prospects, expectation, hope", romaji: "mikomi" },
    { word: "未婚", meaning: "unmarried", romaji: "mikon" },
    { word: "未熟", meaning: "inexperience, unskilled, immature", romaji: "mijuku" },
    { word: "微塵", meaning: "particle, atom", romaji: "mijin" },
    { word: "水気", meaning: "moisture, dampness", romaji: "mizuke" },
    { word: "ミスプリント", meaning: "misprint", romaji: "misupurinto" },
    { word: "みすぼらしい", meaning: "shabby, seedy", romaji: "misuborashī" },
    { word: "ミセス", meaning: "Mrs.", romaji: "misesu" },
    { word: "見せびらかす", meaning: "to show off, to flaunt", romaji: "misebirakasu" },
    { word: "見せ物", meaning: "show, exhibition", romaji: "misemono" },
    { word: "満たす", meaning: "to satisfy, to ingratiate, to fill, to fulfill", romaji: "mitasu" },
    { word: "乱す", meaning: "to throw out of order, to disarrange, to disturb", romaji: "midasu" },
    { word: "乱れる", meaning: "to get confused, to be disordered, to be disturbed", romaji: "midareru" },
    { word: "未知", meaning: "not yet known", romaji: "michi" },
    { word: "身近", meaning: "near oneself, close to one, familiar", romaji: "mijika" },
    { word: "導く", meaning: "to be guided, to be shown", romaji: "michibiku" },
    { word: "密集", meaning: "crowd, close formation, dense", romaji: "misshū" },
    { word: "密接", meaning: "connected, close, intimate", romaji: "missetsu" },
    { word: "密度", meaning: "density", romaji: "mitsudo" },
    { word: "見積もり", meaning: "estimation, quotation", romaji: "mitsumori" },
    { word: "未定", meaning: "not yet fixed, undecided, pending", romaji: "mitei" },
    { word: "見通し", meaning: "perspective, unobstructed view, prospect", romaji: "mitōshi" },
    { word: "見なす", meaning: "to consider as, to regard", romaji: "minasu" },
    { word: "源", meaning: "source, origin", romaji: "minamoto" },
    { word: "見習う", meaning: "to follow another's example", romaji: "minarau" },
    { word: "身なり", meaning: "personal appearance", romaji: "minari" },
    { word: "峰", meaning: "peak, ridge", romaji: "mine" },
    { word: "身の上", meaning: "one's future, one's welfare, one's personal history", romaji: "minōe" },
    { word: "見逃す", meaning: "to miss, to overlook, to leave at large", romaji: "minogasu" },
    { word: "身の回り", meaning: "one's personal appearance, personal belongings", romaji: "minomawari" },
    { word: "見計らう", meaning: "to choose at one's own discretion", romaji: "mihakarau" },
    { word: "見晴らし", meaning: "view", romaji: "miharashi" },
    { word: "身振り", meaning: "gesture", romaji: "miburi" },
    { word: "脈", meaning: "pulse", romaji: "myaku" },
    { word: "ミュージック", meaning: "music", romaji: "myūjikku" },
    { word: "未練", meaning: "lingering affection, attachment, regret(s)", romaji: "miren" },
    { word: "見渡す", meaning: "to look out over, to survey (scene), to take an extensive view of", romaji: "miwatasu" },
    { word: "民宿", meaning: "private house providing lodging and meals to tourists", romaji: "minshuku" },
    { word: "民族", meaning: "people, race", romaji: "minzoku" },
    { word: "民俗", meaning: "folk customs", romaji: "minzoku" },
    { word: "無意味", meaning: "nonsense, no meaning", romaji: "muimi" },
    { word: "ムード", meaning: "mood", romaji: "mūdo" },
    { word: "無口", meaning: "reticence", romaji: "mukuchi" },
    { word: "婿", meaning: "son-in-law", romaji: "muko" },
    { word: "無効", meaning: "invalid, no effect, unavailable", romaji: "mukō" },
    { word: "無言", meaning: "silence", romaji: "mugon" },
    { word: "無邪気", meaning: "innocence, simple-mindedness", romaji: "mujaki" },
    { word: "むしる", meaning: "to pluck, to pick, to tear", romaji: "mushiru" },
    { word: "結び", meaning: "ending, conclusion, union", romaji: "musubi" },
    { word: "結び付き", meaning: "connection, relation", romaji: "musubitsuki" },
    { word: "結び付く", meaning: "to be connected or related, to join together", romaji: "musubitsuku" },
    { word: "結び付ける", meaning: "to combine, to join, to tie on, to attach with a knot", romaji: "musubitsukeru" },
    { word: "無線", meaning: "wireless, radio", romaji: "musen" },
    { word: "無駄遣い", meaning: "waste money on, squander money on", romaji: "mudazukai" },
    { word: "無断", meaning: "without permission, without notice", romaji: "mudan" },
    { word: "無知", meaning: "ignorance", romaji: "muchi" },
    { word: "無茶", meaning: "absurd, unreasonable", romaji: "mucha" },
    { word: "無茶苦茶", meaning: "confused, jumbled, mixed up, unreasonable", romaji: "muchakucha" },
    { word: "空しい", meaning: "vacant, futile, vain", romaji: "munashī" },
    { word: "無念", meaning: "chagrin, regret", romaji: "munen" },
    { word: "無能", meaning: "inefficiency, incompetence", romaji: "munō" },
    { word: "無闇に", meaning: "unreasonably, absurdly, at random", romaji: "muyamini" },
    { word: "無用", meaning: "useless, needlessness, unnecessariness", romaji: "muyō" },
    { word: "斑", meaning: "unevenness, inconsistency, irregularity", romaji: "mura" },
    { word: "群がる", meaning: "to swarm, to gather", romaji: "muragaru" },
    { word: "無論", meaning: "of course, naturally", romaji: "muron" },
    { word: "名産", meaning: "noted product", romaji: "meisan" },
    { word: "名称", meaning: "name", romaji: "meishō" },
    { word: "命中", meaning: "a hit", romaji: "meichū" },
    { word: "明白", meaning: "obvious, clear", romaji: "meihaku" },
    { word: "名簿", meaning: "register of names", romaji: "meibo" },
    { word: "名誉", meaning: "honor, credit, prestige", romaji: "meiyo" },
    { word: "明瞭", meaning: "clarity", romaji: "meiryō" },
    { word: "明朗", meaning: "bright, clear, cheerful", romaji: "meirō" },
    { word: "メーカー", meaning: "manufacturer", romaji: "mēkā" },
    { word: "目方", meaning: "weight", romaji: "mekata" },
    { word: "恵み", meaning: "blessing", romaji: "megumi" },
    { word: "恵む", meaning: "to bless, to show mercy to", romaji: "megumu" },
    { word: "目覚しい", meaning: "brilliant, remarkable", romaji: "mezamashī" },
    { word: "目覚める", meaning: "to wake up", romaji: "mezameru" },
    { word: "召す", meaning: "to call, to send for, to put on", romaji: "mesu" },
    { word: "雌", meaning: "female (animal)", romaji: "mesu" },
    { word: "目付き", meaning: "look, expression of the eyes, eyes", romaji: "metsuki" },
    { word: "滅亡", meaning: "downfall, collapse, destruction", romaji: "metsubō" },
    { word: "メディア", meaning: "media", romaji: "medeia" },
    { word: "目途", meaning: "goal, outlook", romaji: "medo" },
    { word: "目盛", meaning: "scale, gradations", romaji: "memori" },
    { word: "メロディー", meaning: "melody", romaji: "merodeī" },
    { word: "面会", meaning: "interview", romaji: "menkai" },
    { word: "免除", meaning: "exemption, exoneration, discharge", romaji: "menjo" },
    { word: "面する", meaning: "to face on, to look out on to", romaji: "mensuru" },
    { word: "面目", meaning: "face, honor, reputation", romaji: "menboku" },
    { word: "～網", meaning: "~ network", romaji: "～mō" },
    { word: "設ける", meaning: "to create, to establish", romaji: "mōkeru" },
    { word: "申し入れる", meaning: "to propose, to suggest", romaji: "mōshīreru" },
    { word: "申込", meaning: "application, request, proposal", romaji: "mōshikomi" },
    { word: "申出", meaning: "request, claim, report", romaji: "mōshide" },
    { word: "申し出る", meaning: "to report to, to tell, to suggest", romaji: "mōshideru" },
    { word: "申し分", meaning: "objection, shortcomings", romaji: "mōshibun" },
    { word: "盲点", meaning: "blind spot", romaji: "mōten" },
    { word: "猛烈", meaning: "violent, vehement, rage", romaji: "mōretsu" },
    { word: "モーテル", meaning: "motel", romaji: "mōteru" },
    { word: "もがく", meaning: "to struggle, to wriggle, to be impatient", romaji: "mogaku" },
    { word: "目録", meaning: "catalogue, catalog, list", romaji: "mokuroku" },
    { word: "目論見", meaning: "a plan, a scheme, intention", romaji: "mokuromi" },
    { word: "模型", meaning: "model, dummy, marquette", romaji: "mokei" },
    { word: "模索", meaning: "groping (for)", romaji: "mosaku" },
    { word: "もしかして", meaning: "perhaps, possibly", romaji: "moshikashite" },
    { word: "もしくは", meaning: "or, otherwise", romaji: "moshikuha" },
    { word: "もたらす", meaning: "to bring, to take, to bring about", romaji: "motarasu" },
    { word: "持ち切り", meaning: "hot topic, talk of the town", romaji: "mochikiri" },
    { word: "目下", meaning: "at present, now", romaji: "mokka" },
    { word: "専ら", meaning: "wholly, solely, entirely", romaji: "moppara" },
    { word: "もてなす", meaning: "to entertain, to make welcome", romaji: "motenasu" },
    { word: "もてる", meaning: "to be well liked, to be popular", romaji: "moteru" },
    { word: "モニター", meaning: "(computer) monitor", romaji: "monitā" },
    { word: "物好き", meaning: "(idle) curiosity", romaji: "monozuki" },
    { word: "物足りない", meaning: "unsatisfied, unsatisfactory", romaji: "monotarinai" },
    { word: "もはや", meaning: "already, now", romaji: "mohaya" },
    { word: "模範", meaning: "model, example", romaji: "mohan" },
    { word: "模倣", meaning: "imitation, copying", romaji: "mohō" },
    { word: "もめる", meaning: "to disagree, to dispute", romaji: "momeru" },
    { word: "股", meaning: "thigh, femur", romaji: "momo" },
    { word: "腿", meaning: "thigh, femur", romaji: "momo" },
    { word: "催す", meaning: "to hold (a meeting), to give (a dinner)", romaji: "moyōsu" },
    { word: "漏らす", meaning: "to let leak, to reveal", romaji: "morasu" },
    { word: "盛り上がる", meaning: "to rouse, to swell, to rise", romaji: "moriagaru" },
    { word: "漏る", meaning: "to leak, to run out", romaji: "moru" },
    { word: "漏れる", meaning: "to leak out, to escape, to filter out", romaji: "moreru" },
    { word: "脆い", meaning: "brittle, fragile, tender-hearted", romaji: "moroi" },
    { word: "もろに", meaning: "completely, altogether, bodily", romaji: "moroni" },
    { word: "矢", meaning: "arrow", romaji: "ya" },
    { word: "野外", meaning: "fields, outskirts, open air, suburbs", romaji: "yagai" },
    { word: "～薬", meaning: "medicine", romaji: "～yaku" },
    { word: "夜具", meaning: "bedding", romaji: "yagu" },
    { word: "役職", meaning: "post, managerial position, official position", romaji: "yakushoku" },
    { word: "役場", meaning: "town hall", romaji: "yakuba" },
    { word: "やけに", meaning: "sure, very", romaji: "yakeni" },
    { word: "屋敷", meaning: "mansion", romaji: "yashiki" },
    { word: "養う", meaning: "to rear, to maintain, to cultivate", romaji: "yashinau" },
    { word: "野心", meaning: "ambition, aspiration", romaji: "yashin" },
    { word: "安っぽい", meaning: "cheap-looking, tawdry", romaji: "yasuppoi" },
    { word: "休める", meaning: "to rest, to suspend, to give relief", romaji: "yasumeru" },
    { word: "野生", meaning: "wild", romaji: "yasei" },
    { word: "奴", meaning: "(vulg.) fellow, guy, chap", romaji: "yatsu" },
    { word: "闇", meaning: "darkness, shady, illegal", romaji: "yami" },
    { word: "病む", meaning: "to fall ill, to be ill", romaji: "yamu" },
    { word: "ややこしい", meaning: "puzzling, tangled, complicated, complex", romaji: "yayakoshī" },
    { word: "やりとおす", meaning: "to carry through, to achieve, to complete", romaji: "yaritōsu" },
    { word: "やりとげる", meaning: "to accomplish", romaji: "yaritogeru" },
    { word: "和らげる", meaning: "to soften, to moderate, to relieve", romaji: "yawarageru" },
    { word: "ヤング", meaning: "young", romaji: "yangu" },
    { word: "～油", meaning: "~ oil", romaji: "～yu" },
    { word: "優位", meaning: "predominance, ascendancy, superiority", romaji: "yūi" },
    { word: "憂鬱", meaning: "depression, melancholy", romaji: "yūutsu" },
    { word: "有益", meaning: "beneficial, profitable", romaji: "yūeki" },
    { word: "優越", meaning: "supremacy, predominance, being superior to", romaji: "yūetsu" },
    { word: "勇敢", meaning: "bravery, heroism, gallantry", romaji: "yūkan" },
    { word: "夕暮れ", meaning: "evening, (evening) twilight", romaji: "yūgure" },
    { word: "融資", meaning: "financing, loan", romaji: "yūshi" },
    { word: "有する", meaning: "to own, to be endowed with", romaji: "yūsuru" },
    { word: "優勢", meaning: "superiority, superior power, predominance", romaji: "yūsei" },
    { word: "優先", meaning: "preference, priority", romaji: "yūsen" },
    { word: "誘導", meaning: "guidance, leading, inducement", romaji: "yūdō" },
    { word: "融通", meaning: "adaptability, versatility, finance", romaji: "yūzū" },
    { word: "優美", meaning: "grace, refinement, elegance", romaji: "yūbi" },
    { word: "有望", meaning: "good prospects, full of hope, promising", romaji: "yūbō" },
    { word: "遊牧", meaning: "nomadism", romaji: "yūboku" },
    { word: "夕焼け", meaning: "sunset", romaji: "yūyake" },
    { word: "有力", meaning: "influence, prominence; potent", romaji: "yūryoku" },
    { word: "幽霊", meaning: "ghost, specter, phantom", romaji: "yūrei" },
    { word: "誘惑", meaning: "temptation, allurement, lure", romaji: "yūwaku" },
    { word: "故", meaning: "reason, cause, circumstances", romaji: "yue" },
    { word: "歪む", meaning: "to warp, to be crooked, to be distorted", romaji: "yugamu" },
    { word: "揺さぶる", meaning: "to shake, to jolt, to rock, to swing", romaji: "yusaburu" },
    { word: "ゆとり", meaning: "reserve, affluence, time (to spare)", romaji: "yutori" },
    { word: "ユニーク", meaning: "unique", romaji: "yunīku" },
    { word: "ユニフォーム", meaning: "uniform", romaji: "yunifuōmu" },
    { word: "指差す", meaning: "to point at", romaji: "yubisasu" },
    { word: "弓", meaning: "bow", romaji: "yumi" },
    { word: "揺らぐ", meaning: "to swing, to sway, to shake", romaji: "yuragu" },
    { word: "緩む", meaning: "to become loose, to slacken", romaji: "yurumu" },
    { word: "緩める", meaning: "to loosen, to slow down", romaji: "yurumeru" },
    { word: "緩やか", meaning: "lenient", romaji: "yuruyaka" },
    { word: "要因", meaning: "primary factor, main cause", romaji: "yōin" },
    { word: "溶液", meaning: "solution", romaji: "yōeki" },
    { word: "用件", meaning: "business", romaji: "yōken" },
    { word: "養護", meaning: "protection, nursing, protective care", romaji: "yōgo" },
    { word: "用紙", meaning: "a form", romaji: "yōshi" },
    { word: "様式", meaning: "style, form, pattern", romaji: "yōshiki" },
    { word: "要する", meaning: "to demand, to require, to take", romaji: "yōsuru" },
    { word: "要請", meaning: "claim, demand, request, application", romaji: "yōsei" },
    { word: "様相", meaning: "aspect", romaji: "yōsō" },
    { word: "用品", meaning: "articles, supplies, parts", romaji: "yōhin" },
    { word: "洋風", meaning: "western style", romaji: "yōfū" },
    { word: "用法", meaning: "directions, rules of use", romaji: "yōhō" },
    { word: "要望", meaning: "demand for, request", romaji: "yōbō" },
    { word: "余暇", meaning: "leisure, leisure time, spare time", romaji: "yoka" },
    { word: "予感", meaning: "presentiment, premonition", romaji: "yokan" },
    { word: "余興", meaning: "side show, entertainment", romaji: "yokyō" },
    { word: "預金", meaning: "deposit, bank account", romaji: "yokin" },
    { word: "欲", meaning: "greed, wants", romaji: "yoku" },
    { word: "抑圧", meaning: "restraint, oppression, suppression", romaji: "yokuatsu" },
    { word: "浴室", meaning: "bathroom, bath", romaji: "yokushitsu" },
    { word: "抑制", meaning: "control, restraint, suppression", romaji: "yokusei" },
    { word: "欲深い", meaning: "greedy", romaji: "yokufukai" },
    { word: "欲望", meaning: "desire, appetite", romaji: "yokubō" },
    { word: "避ける", meaning: "to avoid (physical contact with; to ward off, to avert", romaji: "yokeru" },
    { word: "予言", meaning: "prediction, promise, prognostication", romaji: "yogen" },
    { word: "横綱", meaning: "sumo grand champion", romaji: "yokozuna" },
    { word: "汚れ", meaning: "dirt, filth", romaji: "yogore" },
    { word: "よし (かん)", meaning: "all right!", romaji: "yoshi (kan)" },
    { word: "良し", meaning: "all right!", romaji: "yoshi" },
    { word: "善し悪し", meaning: "good or bad, merits or demerits, quality", romaji: "yoshiashi" },
    { word: "余所見", meaning: "looking away, looking aside", romaji: "yosomi" },
    { word: "余地", meaning: "place, room, margin", romaji: "yochi" },
    { word: "よって (よりどころ)", meaning: "therefore, consequently", romaji: "yotte (yoridokoro)" },
    { word: "与党", meaning: "government party, (ruling) party in power, government", romaji: "yotō" },
    { word: "呼び止める", meaning: "to flag down", romaji: "yobitomeru" },
    { word: "夜更し", meaning: "staying up late, keeping late hours", romaji: "yofukashi" },
    { word: "夜更け", meaning: "late at night", romaji: "yofuke" },
    { word: "余程", meaning: "very, much, to a large extent, quite", romaji: "yohodo" },
    { word: "読み上げる", meaning: "to read out loud (and clearly), to call a roll", romaji: "yomiageru" },
    { word: "～寄り", meaning: "near to ~ (e.g., North by East)", romaji: "～yori" },
    { word: "寄り掛かる", meaning: "to lean against, to recline on, to lean on, to rely on", romaji: "yorikakaru" },
    { word: "弱る", meaning: "to weaken, to be troubled, to be emaciated", romaji: "yowaru" },
    { word: "来場", meaning: "attendance", romaji: "raijō" },
    { word: "ライス", meaning: "rice", romaji: "raisu" },
    { word: "酪農", meaning: "dairy farming", romaji: "rakunō" },
    { word: "落下", meaning: "fall, drop, come down", romaji: "rakka" },
    { word: "楽観", meaning: "optimism", romaji: "rakkan" },
    { word: "ランプ", meaning: "lamp; ramp", romaji: "ranpu" },
    { word: "濫用", meaning: "abuse, misuse, using to excess", romaji: "ran'yō" },
    { word: "リード", meaning: "lead; reed", romaji: "rīdo" },
    { word: "理屈", meaning: "theory, reason", romaji: "rikutsu" },
    { word: "利子", meaning: "interest (bank)", romaji: "rishi" },
    { word: "利潤", meaning: "profit, returns", romaji: "rijun" },
    { word: "理性", meaning: "reason, sense", romaji: "risei" },
    { word: "利息", meaning: "interest (bank)", romaji: "risoku" },
    { word: "立体", meaning: "solid body", romaji: "rittai" },
    { word: "立方", meaning: "cube", romaji: "rippō" },
    { word: "立法", meaning: "legislation, lawmaking", romaji: "rippō" },
    { word: "利点", meaning: "advantage, point in favor", romaji: "riten" },
    { word: "略奪", meaning: "pillage, looting, robbery", romaji: "ryakudatsu" },
    { word: "略語", meaning: "abbreviation, acronym", romaji: "ryakugo" },
    { word: "流通", meaning: "circulation of money or goods, distribution", romaji: "ryūtsū" },
    { word: "領域", meaning: "area, territory, region", romaji: "ryōiki" },
    { word: "了解", meaning: "comprehension, consent, understanding", romaji: "ryōkai" },
    { word: "領海", meaning: "territorial waters", romaji: "ryōkai" },
    { word: "両極", meaning: "both extremities, north and south poles", romaji: "ryōkyoku" },
    { word: "良好", meaning: "favorable, satisfactory", romaji: "ryōkō" },
    { word: "良識", meaning: "good sense", romaji: "ryōshiki" },
    { word: "良質", meaning: "good quality, superior quality", romaji: "ryōshitsu" },
    { word: "了承", meaning: "acknowledgment, understanding", romaji: "ryōshō" },
    { word: "良心", meaning: "conscience", romaji: "ryōshin" },
    { word: "領地", meaning: "territory", romaji: "ryōchi" },
    { word: "領土", meaning: "territory, possession", romaji: "ryōdo" },
    { word: "両立", meaning: "compatibility, coexistence, standing together", romaji: "ryōritsu" },
    { word: "旅客", meaning: "passenger", romaji: "ryokaku" },
    { word: "旅券", meaning: "passport", romaji: "ryoken" },
    { word: "履歴", meaning: "personal history, background, log", romaji: "rireki" },
    { word: "理論", meaning: "theory", romaji: "riron" },
    { word: "林業", meaning: "forestry", romaji: "ringyō" },
    { word: "類", meaning: "kind, class, family", romaji: "rui" },
    { word: "類推", meaning: "analogy", romaji: "ruisui" },
    { word: "類似", meaning: "analogous", romaji: "ruiji" },
    { word: "ルーズ", meaning: "loose", romaji: "rūzu" },
    { word: "冷酷", meaning: "cruelty, coldheartedness, ruthless", romaji: "reikoku" },
    { word: "冷蔵", meaning: "refrigeration", romaji: "reizō" },
    { word: "冷淡", meaning: "coolness, indifference", romaji: "reitan" },
    { word: "レース", meaning: "race; lace", romaji: "rēsu" },
    { word: "レギュラー", meaning: "regular", romaji: "regyurā" },
    { word: "レッスン", meaning: "lesson", romaji: "ressun" },
    { word: "レディー", meaning: "lady", romaji: "redeī" },
    { word: "レバー", meaning: "lever; liver", romaji: "rebā" },
    { word: "恋愛", meaning: "love, romance", romaji: "ren'ai" },
    { word: "バッテリー", meaning: "battery", romaji: "batterī" },
    { word: "バット", meaning: "bat, vat", romaji: "batto" },
    { word: "発病", meaning: "attack, to become sick", romaji: "hatsubyō" },
    { word: "初耳", meaning: "something heard for the first time", romaji: "hatsumimi" },
    { word: "果て", meaning: "the end, the extremity, the limit(s)", romaji: "hate" },
    { word: "果てる", meaning: "to end, to be finished, to be exhausted", romaji: "hateru" },
    { word: "ばてる", meaning: "to be exhausted, to be worn out", romaji: "bateru" },
    { word: "パトカー", meaning: "patrol car", romaji: "patokā" },
    { word: "甚だ", meaning: "very, greatly, exceedingly", romaji: "hanahada" },
    { word: "華々しい", meaning: "brilliant, magnificent, spectacular", romaji: "hanabanashī" },
    { word: "花びら", meaning: "(flower) petal", romaji: "hanabira" },
    { word: "華やか", meaning: "brilliant, gorgeous, florid", romaji: "hanayaka" },
    { word: "阻む", meaning: "to keep someone from doing, to stop, to oppose", romaji: "habamu" },
    { word: "浜", meaning: "beach, seashore", romaji: "hama" },
    { word: "浜辺", meaning: "beach, foreshore", romaji: "hamabe" },
    { word: "はまる", meaning: "to get into, to go into, to fit, to be fit for, to suit", romaji: "hamaru" },
    { word: "早める", meaning: "to hasten, to quicken, to accelerate", romaji: "hayameru" },
    { word: "腹立ち", meaning: "anger", romaji: "haradachi" },
    { word: "原っぱ", meaning: "open field, empty lot, plain", romaji: "harappa" },
    { word: "はらはら", meaning: "feel nervous", romaji: "harahara" },
    { word: "ばらまく", meaning: "to disseminate, to scatter", romaji: "baramaku" },
    { word: "張り紙", meaning: "notice, poster", romaji: "harigami" },
    { word: "遥か", meaning: "far, far-away, distant", romaji: "haruka" },
    { word: "破裂", meaning: "explosion, rupture, break off", romaji: "haretsu" },
    { word: "腫れる", meaning: "to swell (from inflammation, to become swollen)", romaji: "hareru" },
    { word: "繁栄", meaning: "prospering, prosperity, flourishing", romaji: "han'ei" },
    { word: "版画", meaning: "art print", romaji: "hanga" },
    { word: "ハンガー", meaning: "(coat) hanger", romaji: "hangā" },
    { word: "反感", meaning: "antipathy, revolt, animosity", romaji: "hankan" },
    { word: "反響", meaning: "echo, reverberation, repercussion", romaji: "hankyō" },
    { word: "パンク", meaning: "puncture, bursting; punk", romaji: "panku" },
    { word: "反撃", meaning: "counterattack, counteroffensive, counterblow", romaji: "hangeki" },
    { word: "判決", meaning: "judicial decision, judgment, sentence, decree", romaji: "hanketsu" },
    { word: "反射", meaning: "reflection, reverberation", romaji: "hansha" },
    { word: "繁盛", meaning: "prosperity, flourishing, thriving", romaji: "hanjō" },
    { word: "繁殖", meaning: "breed, multiply, propagation", romaji: "hanshoku" },
    { word: "反する", meaning: "to be inconsistent with, to oppose, to contradict", romaji: "hansuru" },
    { word: "判定", meaning: "judgment, decision, award, verdict", romaji: "hantei" },
    { word: "万人", meaning: "all people, everybody, 10000 people", romaji: "bannin" },
    { word: "晩年", meaning: "(one's) last years", romaji: "bannen" },
    { word: "反応", meaning: "reaction, response", romaji: "hannō" },
    { word: "万能", meaning: "all-purpose, almighty, omnipotent", romaji: "bannō" },
    { word: "半端", meaning: "fragment, fraction, incompleteness", romaji: "hanpa" },
    { word: "反発", meaning: "repelling, rebound, oppose", romaji: "hanpatsu" },
    { word: "反乱", meaning: "rebellion, revolt, uprising", romaji: "hanran" },
    { word: "氾濫", meaning: "overflowing, flood", romaji: "hanran" },
    { word: "美", meaning: "beauty", romaji: "bi" },
    { word: "ひいては", meaning: "not only…but also, in addition to, consequently", romaji: "hīteha" },
    { word: "ビールス", meaning: "virus", romaji: "bīrusu" },
    { word: "控室", meaning: "waiting room", romaji: "hikaeshitsu" },
    { word: "控える", meaning: "to hold back; to make notes", romaji: "hikaeru" },
    { word: "悲観", meaning: "pessimism, disappointment", romaji: "hikan" },
    { word: "引き上げる", meaning: "to withdraw, to leave, to pull out", romaji: "hikiageru" },
    { word: "率いる", meaning: "to lead, to spearhead (a group), to command (troops)", romaji: "hikīru" },
    { word: "引き起こす", meaning: "to cause", romaji: "hikiokosu" },
    { word: "引下げる", meaning: "to pull down, to lower, to reduce, to withdraw", romaji: "hikisageru" },
    { word: "引きずる", meaning: "to drag along, to pull, to prolong", romaji: "hikizuru" },
    { word: "引取る", meaning: "to take back; to adopt; to leave", romaji: "hikitoru" },
    { word: "否決", meaning: "rejection, negation, voting down", romaji: "hiketsu" },
    { word: "日頃", meaning: "normally, habitually", romaji: "higoro" },
    { word: "久しい", meaning: "long, long-continued, old (story)", romaji: "hisashī" },
    { word: "悲惨", meaning: "tragedy, disaster; misery, wretched, pitiful", romaji: "hisan" },
    { word: "ビジネス", meaning: "business", romaji: "bijinesu" },
    { word: "比重", meaning: "specific gravity", romaji: "hijū" },
    { word: "美術", meaning: "art, fine arts", romaji: "bijutsu" },
    { word: "秘書", meaning: "(private) secretary", romaji: "hisho" },
    { word: "微笑", meaning: "smile", romaji: "bishō" },
    { word: "密か", meaning: "secret, private, surreptitious", romaji: "hisoka" },
    { word: "浸す", meaning: "to soak, to dip, to drench", romaji: "hitasu" },
    { word: "ひたすら", meaning: "nothing but, earnestly, intently", romaji: "hitasura" },
    { word: "左利き", meaning: "left-handedness, sake drinker, left-hander", romaji: "hidarikiki" },
    { word: "引っ掻く", meaning: "to scratch", romaji: "hikkaku" },
    { word: "必修", meaning: "required (subject)", romaji: "hisshū" },
    { word: "びっしょり", meaning: "wet through, drenched", romaji: "bisshori" },
    { word: "必然", meaning: "inevitable, necessary", romaji: "hitsuzen" },
    { word: "匹敵", meaning: "comparing with, rival, equal", romaji: "hitteki" },
    { word: "一息", meaning: "a breath, a pause, an effort", romaji: "hitoiki" },
    { word: "人影", meaning: "man's shadow, soul", romaji: "hitokage" },
    { word: "人柄", meaning: "personality, character", romaji: "hitogara" },
    { word: "人気", meaning: "sign of life", romaji: "hitoke" },
    { word: "一頃", meaning: "once, some time ago", romaji: "hitokoro" },
    { word: "人質", meaning: "hostage", romaji: "hitojichi" },
    { word: "一筋", meaning: "a line, earnestly, blindly, straightforwardly", romaji: "hitosuji" },
    { word: "人目", meaning: "glimpse, public gaze", romaji: "hitome" },
    { word: "日取り", meaning: "fixed date, appointed day", romaji: "hidori" },
    { word: "雛", meaning: "young bird, chick, doll", romaji: "hina" },
    { word: "雛祭", meaning: "Girls' (dolls') Festival", romaji: "hinamatsuri" },
    { word: "日向", meaning: "sunny place, in the sun", romaji: "hinata" },
    { word: "非難", meaning: "blame, attack, criticism", romaji: "hinan" },
    { word: "避難", meaning: "taking refuge, finding shelter", romaji: "hinan" },
    { word: "日の丸", meaning: "the Japanese flag", romaji: "hinomaru" },
    { word: "火花", meaning: "spark", romaji: "hibana" },
    { word: "ひび (かべの～)", meaning: "crack, fissure, flaw", romaji: "hibi (kabeno～)" },
    { word: "悲鳴", meaning: "shriek, scream", romaji: "himei" },
    { word: "冷やかす", meaning: "to banter, to make fun of, to jeer at, to cool, to refrigerate", romaji: "hiyakasu" },
    { word: "日焼け", meaning: "sunburn", romaji: "hiyake" },
    { word: "標語", meaning: "motto, slogan, catchword", romaji: "hyōgo" },
    { word: "描写", meaning: "depiction, description, portrayal", romaji: "byōsha" },
    { word: "ひょっと", meaning: "possibly, accidentally", romaji: "hyotto" },
    { word: "びら", meaning: "handout, leaflet", romaji: "bira" },
    { word: "平たい", meaning: "flat, even, level", romaji: "hiratai" },
    { word: "びり", meaning: "last on the list, at the bottom", romaji: "biri" },
    { word: "比率", meaning: "ratio, proportion, percentage", romaji: "hiritsu" }
  ],
}

// Merge per-level Indonesian sidecars into items in place. Missing entries
// silently fall back to English at read time via getVocabMeaning().
const _idVocabSidecar: Record<string, string> = {
  ...(idN5 as Record<string, string>),
  ...(idN4 as Record<string, string>),
  ...(idN3 as Record<string, string>),
  ...(idN2 as Record<string, string>),
  ...(idN1 as Record<string, string>),
}
for (const level of Object.values(vocabularyData)) {
  for (const item of level) {
    const id = _idVocabSidecar[item.word]
    if (id) item.meaningId = id
  }
}

/** Get vocab meaning in active locale, falling back to English. */
export function getVocabMeaning(item: VocabItem, locale: Locale): string {
  if (locale === "id" && item.meaningId) return item.meaningId
  return item.meaning
}
