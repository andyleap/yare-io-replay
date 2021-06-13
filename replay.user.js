// ==UserScript==
// @name         Yare Replay Saver
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically save yare.io replays
// @author       andyleap
// @match        https://yare.io/d1/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// @run-at       document-start
// @require     https://github.com/eligrey/FileSaver.js/raw/master/dist/FileSaver.js
// @require     https://raw.githubusercontent.com/pieroxy/lz-string/master/libs/lz-string.min.js
// ==/UserScript==


var int = setInterval(() => {
    if(game_ended == 1) {

        var newData = Object.values(game_blocks).map(v => {
            return {
                p1: Object.fromEntries(Object.entries(v.p1).filter(([id, s]) => s[3] > 0.5).map(([id, s]) => [id, [[s[0][0], s[0][1]], s[1], s[2]]])),
                p2: Object.fromEntries(Object.entries(v.p2).filter(([id, s]) => s[3] > 0.5).map(([id, s]) => [id, [[s[0][0], s[0][1]], s[1], s[2]]])),
                b1: [v.b1[0], v.b1[1]],
                b2: [v.b2[0], v.b2[1]],
                e: v.e,
            };
        });

        var buf = LZString.compressToUTF16(JSON.stringify(newData));

        var blob = new Blob([buf], {type: "text-plain"});

        saveAs(blob, pla1 + "-vs-" + pla2 + ".yare-replay");
        clearInterval(int);
    }
}, 1000);

//# sourceMappingURL=script.user.js.map
