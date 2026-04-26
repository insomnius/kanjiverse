export const kanaData = {
  hiragana: {
    basic: [
      // Vowels (a, i, u, e, o)
      {
        row: "vowels",
        chars: [
          { kana: "あ", romaji: "a" },
          { kana: "い", romaji: "i" },
          { kana: "う", romaji: "u" },
          { kana: "え", romaji: "e" },
          { kana: "お", romaji: "o" },
        ],
      },
      // K-row (ka, ki, ku, ke, ko)
      {
        row: "k",
        chars: [
          { kana: "か", romaji: "ka" },
          { kana: "き", romaji: "ki" },
          { kana: "く", romaji: "ku" },
          { kana: "け", romaji: "ke" },
          { kana: "こ", romaji: "ko" },
        ],
      },
      // S-row (sa, shi, su, se, so)
      {
        row: "s",
        chars: [
          { kana: "さ", romaji: "sa" },
          { kana: "し", romaji: "shi" },
          { kana: "す", romaji: "su" },
          { kana: "せ", romaji: "se" },
          { kana: "そ", romaji: "so" },
        ],
      },
      // T-row (ta, chi, tsu, te, to)
      {
        row: "t",
        chars: [
          { kana: "た", romaji: "ta" },
          { kana: "ち", romaji: "chi" },
          { kana: "つ", romaji: "tsu" },
          { kana: "て", romaji: "te" },
          { kana: "と", romaji: "to" },
        ],
      },
      // N-row (na, ni, nu, ne, no)
      {
        row: "n",
        chars: [
          { kana: "な", romaji: "na" },
          { kana: "に", romaji: "ni" },
          { kana: "ぬ", romaji: "nu" },
          { kana: "ね", romaji: "ne" },
          { kana: "の", romaji: "no" },
        ],
      },
      // H-row (ha, hi, fu, he, ho)
      {
        row: "h",
        chars: [
          { kana: "は", romaji: "ha" },
          { kana: "ひ", romaji: "hi" },
          { kana: "ふ", romaji: "fu" },
          { kana: "へ", romaji: "he" },
          { kana: "ほ", romaji: "ho" },
        ],
      },
      // M-row (ma, mi, mu, me, mo)
      {
        row: "m",
        chars: [
          { kana: "ま", romaji: "ma" },
          { kana: "み", romaji: "mi" },
          { kana: "む", romaji: "mu" },
          { kana: "め", romaji: "me" },
          { kana: "も", romaji: "mo" },
        ],
      },
      // Y-row (ya, yu, yo)
      {
        row: "y",
        chars: [
          { kana: "や", romaji: "ya" },
          { kana: "", romaji: "" },
          { kana: "ゆ", romaji: "yu" },
          { kana: "", romaji: "" },
          { kana: "よ", romaji: "yo" },
        ],
      },
      // R-row (ra, ri, ru, re, ro)
      {
        row: "r",
        chars: [
          { kana: "ら", romaji: "ra" },
          { kana: "り", romaji: "ri" },
          { kana: "る", romaji: "ru" },
          { kana: "れ", romaji: "re" },
          { kana: "ろ", romaji: "ro" },
        ],
      },
      // W-row (wa, wo)
      {
        row: "w",
        chars: [
          { kana: "わ", romaji: "wa" },
          { kana: "", romaji: "" },
          { kana: "", romaji: "" },
          { kana: "", romaji: "" },
          { kana: "を", romaji: "wo" },
        ],
      },
      // N (special)
      {
        row: "n",
        chars: [
          { kana: "ん", romaji: "n" },
          { kana: "", romaji: "" },
          { kana: "", romaji: "" },
          { kana: "", romaji: "" },
          { kana: "", romaji: "" },
        ],
      },
    ],
    dakuten: [
      // G-row (ga, gi, gu, ge, go)
      {
        row: "g",
        chars: [
          { kana: "が", romaji: "ga" },
          { kana: "ぎ", romaji: "gi" },
          { kana: "ぐ", romaji: "gu" },
          { kana: "げ", romaji: "ge" },
          { kana: "ご", romaji: "go" },
        ],
      },
      // Z-row (za, ji, zu, ze, zo)
      {
        row: "z",
        chars: [
          { kana: "ざ", romaji: "za" },
          { kana: "じ", romaji: "ji" },
          { kana: "ず", romaji: "zu" },
          { kana: "ぜ", romaji: "ze" },
          { kana: "ぞ", romaji: "zo" },
        ],
      },
      // D-row (da, ji, zu, de, do)
      {
        row: "d",
        chars: [
          { kana: "だ", romaji: "da" },
          { kana: "ぢ", romaji: "ji" },
          { kana: "づ", romaji: "zu" },
          { kana: "で", romaji: "de" },
          { kana: "ど", romaji: "do" },
        ],
      },
      // B-row (ba, bi, bu, be, bo)
      {
        row: "b",
        chars: [
          { kana: "ば", romaji: "ba" },
          { kana: "び", romaji: "bi" },
          { kana: "ぶ", romaji: "bu" },
          { kana: "べ", romaji: "be" },
          { kana: "ぼ", romaji: "bo" },
        ],
      },
      // P-row (pa, pi, pu, pe, po)
      {
        row: "p",
        chars: [
          { kana: "ぱ", romaji: "pa" },
          { kana: "ぴ", romaji: "pi" },
          { kana: "ぷ", romaji: "pu" },
          { kana: "ぺ", romaji: "pe" },
          { kana: "ぽ", romaji: "po" },
        ],
      },
    ],
    combinations: [
      // KY-row (kya, kyu, kyo)
      {
        row: "ky",
        chars: [
          { kana: "きゃ", romaji: "kya" },
          { kana: "", romaji: "" },
          { kana: "きゅ", romaji: "kyu" },
          { kana: "", romaji: "" },
          { kana: "きょ", romaji: "kyo" },
        ],
      },
      // SH-row (sha, shu, sho)
      {
        row: "sh",
        chars: [
          { kana: "しゃ", romaji: "sha" },
          { kana: "", romaji: "" },
          { kana: "しゅ", romaji: "shu" },
          { kana: "", romaji: "" },
          { kana: "しょ", romaji: "sho" },
        ],
      },
      // CH-row (cha, chu, cho)
      {
        row: "ch",
        chars: [
          { kana: "ちゃ", romaji: "cha" },
          { kana: "", romaji: "" },
          { kana: "ちゅ", romaji: "chu" },
          { kana: "", romaji: "" },
          { kana: "ちょ", romaji: "cho" },
        ],
      },
      // NY-row (nya, nyu, nyo)
      {
        row: "ny",
        chars: [
          { kana: "にゃ", romaji: "nya" },
          { kana: "", romaji: "" },
          { kana: "にゅ", romaji: "nyu" },
          { kana: "", romaji: "" },
          { kana: "にょ", romaji: "nyo" },
        ],
      },
      // HY-row (hya, hyu, hyo)
      {
        row: "hy",
        chars: [
          { kana: "ひゃ", romaji: "hya" },
          { kana: "", romaji: "" },
          { kana: "ひゅ", romaji: "hyu" },
          { kana: "", romaji: "" },
          { kana: "ひょ", romaji: "hyo" },
        ],
      },
      // MY-row (mya, myu, myo)
      {
        row: "my",
        chars: [
          { kana: "みゃ", romaji: "mya" },
          { kana: "", romaji: "" },
          { kana: "みゅ", romaji: "myu" },
          { kana: "", romaji: "" },
          { kana: "みょ", romaji: "myo" },
        ],
      },
      // RY-row (rya, ryu, ryo)
      {
        row: "ry",
        chars: [
          { kana: "りゃ", romaji: "rya" },
          { kana: "", romaji: "" },
          { kana: "りゅ", romaji: "ryu" },
          { kana: "", romaji: "" },
          { kana: "りょ", romaji: "ryo" },
        ],
      },
      // GY-row (gya, gyu, gyo)
      {
        row: "gy",
        chars: [
          { kana: "ぎゃ", romaji: "gya" },
          { kana: "", romaji: "" },
          { kana: "ぎゅ", romaji: "gyu" },
          { kana: "", romaji: "" },
          { kana: "ぎょ", romaji: "gyo" },
        ],
      },
      // J-row (ja, ju, jo)
      {
        row: "j",
        chars: [
          { kana: "じゃ", romaji: "ja" },
          { kana: "", romaji: "" },
          { kana: "じゅ", romaji: "ju" },
          { kana: "", romaji: "" },
          { kana: "じょ", romaji: "jo" },
        ],
      },
      // BY-row (bya, byu, byo)
      {
        row: "by",
        chars: [
          { kana: "びゃ", romaji: "bya" },
          { kana: "", romaji: "" },
          { kana: "びゅ", romaji: "byu" },
          { kana: "", romaji: "" },
          { kana: "びょ", romaji: "byo" },
        ],
      },
      // PY-row (pya, pyu, pyo)
      {
        row: "py",
        chars: [
          { kana: "ぴゃ", romaji: "pya" },
          { kana: "", romaji: "" },
          { kana: "ぴゅ", romaji: "pyu" },
          { kana: "", romaji: "" },
          { kana: "ぴょ", romaji: "pyo" },
        ],
      },
    ],
  },
  katakana: {
    basic: [
      // Vowels (a, i, u, e, o)
      {
        row: "vowels",
        chars: [
          { kana: "ア", romaji: "a" },
          { kana: "イ", romaji: "i" },
          { kana: "ウ", romaji: "u" },
          { kana: "エ", romaji: "e" },
          { kana: "オ", romaji: "o" },
        ],
      },
      // K-row (ka, ki, ku, ke, ko)
      {
        row: "k",
        chars: [
          { kana: "カ", romaji: "ka" },
          { kana: "キ", romaji: "ki" },
          { kana: "ク", romaji: "ku" },
          { kana: "ケ", romaji: "ke" },
          { kana: "コ", romaji: "ko" },
        ],
      },
      // S-row (sa, shi, su, se, so)
      {
        row: "s",
        chars: [
          { kana: "サ", romaji: "sa" },
          { kana: "シ", romaji: "shi" },
          { kana: "ス", romaji: "su" },
          { kana: "セ", romaji: "se" },
          { kana: "ソ", romaji: "so" },
        ],
      },
      // T-row (ta, chi, tsu, te, to)
      {
        row: "t",
        chars: [
          { kana: "タ", romaji: "ta" },
          { kana: "チ", romaji: "chi" },
          { kana: "ツ", romaji: "tsu" },
          { kana: "テ", romaji: "te" },
          { kana: "ト", romaji: "to" },
        ],
      },
      // N-row (na, ni, nu, ne, no)
      {
        row: "n",
        chars: [
          { kana: "ナ", romaji: "na" },
          { kana: "ニ", romaji: "ni" },
          { kana: "ヌ", romaji: "nu" },
          { kana: "ネ", romaji: "ne" },
          { kana: "ノ", romaji: "no" },
        ],
      },
      // H-row (ha, hi, fu, he, ho)
      {
        row: "h",
        chars: [
          { kana: "ハ", romaji: "ha" },
          { kana: "ヒ", romaji: "hi" },
          { kana: "フ", romaji: "fu" },
          { kana: "ヘ", romaji: "he" },
          { kana: "ホ", romaji: "ho" },
        ],
      },
      // M-row (ma, mi, mu, me, mo)
      {
        row: "m",
        chars: [
          { kana: "マ", romaji: "ma" },
          { kana: "ミ", romaji: "mi" },
          { kana: "ム", romaji: "mu" },
          { kana: "メ", romaji: "me" },
          { kana: "モ", romaji: "mo" },
        ],
      },
      // Y-row (ya, yu, yo)
      {
        row: "y",
        chars: [
          { kana: "ヤ", romaji: "ya" },
          { kana: "", romaji: "" },
          { kana: "ユ", romaji: "yu" },
          { kana: "", romaji: "" },
          { kana: "ヨ", romaji: "yo" },
        ],
      },
      // R-row (ra, ri, ru, re, ro)
      {
        row: "r",
        chars: [
          { kana: "ラ", romaji: "ra" },
          { kana: "リ", romaji: "ri" },
          { kana: "ル", romaji: "ru" },
          { kana: "レ", romaji: "re" },
          { kana: "ロ", romaji: "ro" },
        ],
      },
      // W-row (wa, wo)
      {
        row: "w",
        chars: [
          { kana: "ワ", romaji: "wa" },
          { kana: "", romaji: "" },
          { kana: "", romaji: "" },
          { kana: "", romaji: "" },
          { kana: "ヲ", romaji: "wo" },
        ],
      },
      // N (special)
      {
        row: "n",
        chars: [
          { kana: "ン", romaji: "n" },
          { kana: "", romaji: "" },
          { kana: "", romaji: "" },
          { kana: "", romaji: "" },
          { kana: "", romaji: "" },
        ],
      },
    ],
    dakuten: [
      // G-row (ga, gi, gu, ge, go)
      {
        row: "g",
        chars: [
          { kana: "ガ", romaji: "ga" },
          { kana: "ギ", romaji: "gi" },
          { kana: "グ", romaji: "gu" },
          { kana: "ゲ", romaji: "ge" },
          { kana: "ゴ", romaji: "go" },
        ],
      },
      // Z-row (za, ji, zu, ze, zo)
      {
        row: "z",
        chars: [
          { kana: "ザ", romaji: "za" },
          { kana: "ジ", romaji: "ji" },
          { kana: "ズ", romaji: "zu" },
          { kana: "ゼ", romaji: "ze" },
          { kana: "ゾ", romaji: "zo" },
        ],
      },
      // D-row (da, ji, zu, de, do)
      {
        row: "d",
        chars: [
          { kana: "ダ", romaji: "da" },
          { kana: "ヂ", romaji: "ji" },
          { kana: "ヅ", romaji: "zu" },
          { kana: "デ", romaji: "de" },
          { kana: "ド", romaji: "do" },
        ],
      },
      // B-row (ba, bi, bu, be, bo)
      {
        row: "b",
        chars: [
          { kana: "バ", romaji: "ba" },
          { kana: "ビ", romaji: "bi" },
          { kana: "ブ", romaji: "bu" },
          { kana: "ベ", romaji: "be" },
          { kana: "ボ", romaji: "bo" },
        ],
      },
      // P-row (pa, pi, pu, pe, po)
      {
        row: "p",
        chars: [
          { kana: "パ", romaji: "pa" },
          { kana: "ピ", romaji: "pi" },
          { kana: "プ", romaji: "pu" },
          { kana: "ペ", romaji: "pe" },
          { kana: "ポ", romaji: "po" },
        ],
      },
    ],
    combinations: [
      // KY-row (kya, kyu, kyo)
      {
        row: "ky",
        chars: [
          { kana: "キャ", romaji: "kya" },
          { kana: "", romaji: "" },
          { kana: "キュ", romaji: "kyu" },
          { kana: "", romaji: "" },
          { kana: "キョ", romaji: "kyo" },
        ],
      },
      // SH-row (sha, shu, sho)
      {
        row: "sh",
        chars: [
          { kana: "シャ", romaji: "sha" },
          { kana: "", romaji: "" },
          { kana: "シュ", romaji: "shu" },
          { kana: "", romaji: "" },
          { kana: "ショ", romaji: "sho" },
        ],
      },
      // CH-row (cha, chu, cho)
      {
        row: "ch",
        chars: [
          { kana: "チャ", romaji: "cha" },
          { kana: "", romaji: "" },
          { kana: "チュ", romaji: "chu" },
          { kana: "", romaji: "" },
          { kana: "チョ", romaji: "cho" },
        ],
      },
      // NY-row (nya, nyu, nyo)
      {
        row: "ny",
        chars: [
          { kana: "ニャ", romaji: "nya" },
          { kana: "", romaji: "" },
          { kana: "ニュ", romaji: "nyu" },
          { kana: "", romaji: "" },
          { kana: "ニョ", romaji: "nyo" },
        ],
      },
      // HY-row (hya, hyu, hyo)
      {
        row: "hy",
        chars: [
          { kana: "ヒャ", romaji: "hya" },
          { kana: "", romaji: "" },
          { kana: "ヒュ", romaji: "hyu" },
          { kana: "", romaji: "" },
          { kana: "ヒョ", romaji: "hyo" },
        ],
      },
      // MY-row (mya, myu, myo)
      {
        row: "my",
        chars: [
          { kana: "ミャ", romaji: "mya" },
          { kana: "", romaji: "" },
          { kana: "ミュ", romaji: "myu" },
          { kana: "", romaji: "" },
          { kana: "ミョ", romaji: "myo" },
        ],
      },
      // RY-row (rya, ryu, ryo)
      {
        row: "ry",
        chars: [
          { kana: "リャ", romaji: "rya" },
          { kana: "", romaji: "" },
          { kana: "リュ", romaji: "ryu" },
          { kana: "", romaji: "" },
          { kana: "リョ", romaji: "ryo" },
        ],
      },
      // GY-row (gya, gyu, gyo)
      {
        row: "gy",
        chars: [
          { kana: "ギャ", romaji: "gya" },
          { kana: "", romaji: "" },
          { kana: "ギュ", romaji: "gyu" },
          { kana: "", romaji: "" },
          { kana: "ギョ", romaji: "gyo" },
        ],
      },
      // J-row (ja, ju, jo)
      {
        row: "j",
        chars: [
          { kana: "ジャ", romaji: "ja" },
          { kana: "", romaji: "" },
          { kana: "ジュ", romaji: "ju" },
          { kana: "", romaji: "" },
          { kana: "ジョ", romaji: "jo" },
        ],
      },
      // BY-row (bya, byu, byo)
      {
        row: "by",
        chars: [
          { kana: "ビャ", romaji: "bya" },
          { kana: "", romaji: "" },
          { kana: "ビュ", romaji: "byu" },
          { kana: "", romaji: "" },
          { kana: "ビョ", romaji: "byo" },
        ],
      },
      // PY-row (pya, pyu, pyo)
      {
        row: "py",
        chars: [
          { kana: "ピャ", romaji: "pya" },
          { kana: "", romaji: "" },
          { kana: "ピュ", romaji: "pyu" },
          { kana: "", romaji: "" },
          { kana: "ピョ", romaji: "pyo" },
        ],
      },
    ],
    extended: [
      // F-row (fa, fi, fu, fe, fo)
      {
        row: "f",
        chars: [
          { kana: "ファ", romaji: "fa" },
          { kana: "フィ", romaji: "fi" },
          { kana: "フ", romaji: "fu" },
          { kana: "フェ", romaji: "fe" },
          { kana: "フォ", romaji: "fo" },
        ],
      },
      // W-extended (wi, we, wo)
      {
        row: "w-ext",
        chars: [
          { kana: "ワ", romaji: "wa" },
          { kana: "ウィ", romaji: "wi" },
          { kana: "", romaji: "" },
          { kana: "ウェ", romaji: "we" },
          { kana: "ウォ", romaji: "wo" },
        ],
      },
      // V-row (va, vi, vu, ve, vo)
      {
        row: "v",
        chars: [
          { kana: "ヴァ", romaji: "va" },
          { kana: "ヴィ", romaji: "vi" },
          { kana: "ヴ", romaji: "vu" },
          { kana: "ヴェ", romaji: "ve" },
          { kana: "ヴォ", romaji: "vo" },
        ],
      },
      // Other foreign sounds
      {
        row: "foreign",
        chars: [
          { kana: "シェ", romaji: "she" },
          { kana: "ジェ", romaji: "je" },
          { kana: "チェ", romaji: "che" },
          { kana: "ティ", romaji: "ti" },
          { kana: "ディ", romaji: "di" },
        ],
      },
      // More foreign sounds
      {
        row: "foreign2",
        chars: [
          { kana: "トゥ", romaji: "tu" },
          { kana: "ドゥ", romaji: "du" },
          { kana: "", romaji: "" },
          { kana: "", romaji: "" },
          { kana: "", romaji: "" },
        ],
      },
    ],
  },
}

