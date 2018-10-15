// メイン
// jsonフォルダの中にあるjsonを取ってくる


function getJson() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                team = JSON.parse(xmlhttp.responseText);
                Drawtounament(team);
                // var team = document.getElementById("teamName");
                // team.innerText = data.dodge;
            } else {}
        }
    };
    xmlhttp.open("GET", "../json/team.json");
    xmlhttp.send();
}

function createXMLHttpRequest() {
    if (window.XMLHttpRequest) { return new XMLHttpRequest() }
    if (window.ActiveXObject) {
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (e) { }
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (e) { }
        try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) { }
    }
    return false;
}


getJson();

var cs       = document.getElementById('tournament'),
    ctx      = cs.getContext('2d'),
    csWidth  = cs.width,
    csHeight = cs.height,
    length   = {
        x: 20,
        y: 20,
        interval: 10
    };

function Drawtounament(team) {
    var cs = document.getElementById('tournament'),
        ctx      = cs.getContext('2d'),
        csWidth  = cs.width,
        csHeight = cs.height,
        length   = {
            x: 20,
            y: 20,
            interval: 0
        };
    // ↑変数たち

    //基本スタイル
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;

    FirstTournament(team.dodge,32,50,50,0,csHeight);

    function FirstTournament(data,ALLTree,lengthx,lengthy,interval,height) {
        for (i = 0; i < ALLTree; i = i + 2) { //縦
            if(data[i] === "" && data[i+1] === ""){
                VLineDraw(data[i],i * lengthx + lengthx/2 + interval, height, lengthy);
                VLineDraw(data[i+1],(i+1) * lengthx - lengthx/2 + interval, height, lengthy);
            }
            else if (data[i] === "") {
                VLineDraw(data[i+1],(i+1) * lengthx - lengthx/2 + interval, height, lengthy);
            }
            else if (data[i+1] === "") {
                VLineDraw(data[i],i * lengthx + lengthx/2 + interval, height, lengthy);
            }
            else {
                VLineDraw(data[i],i * lengthx + interval, height, lengthy);
                VLineDraw(data[i+1],(i+1) * lengthx + interval, height, lengthy);
            }
        }
        for (i = 0; i < ALLTree; i=i+2) {   //横
            if (data[i] === "" || data[i+1] === "") {}
            else {
                HLineDraw(data[i],i * lengthx + interval, height - lengthy, lengthx);
            }
        }
        SecondTournament(ALLTree/2,lengthx*2,lengthy,interval + lengthx/2, height - lengthy);
    }
    function SecondTournament(ALLTree,lengthx,lengthy,interval,height){
        if(ALLTree === 1){
            for (i = 0; i < ALLTree; i++) { //縦
                VLineDraw("",i * lengthx + interval, height, lengthy);
            }
            return;
        }
        for (i = 0; i < ALLTree; i++) { //縦
            VLineDraw("",i * lengthx + interval, height, lengthy);
        }
        for (i = 0; i < ALLTree; i=i+2) {   //横
            HLineDraw("",i * lengthx + interval, height - lengthy, lengthx);
        }
        return SecondTournament(ALLTree/2,lengthx*2,lengthy,interval + lengthx/2, height - lengthy);
    }
    function VLineDraw(tName,xstart, ystart, lengthy) {
        ctx.beginPath();
        ctx.moveTo(xstart, ystart);
        ctx.lineTo(xstart, ystart - lengthy);
        ctx.closePath();
        ctx.stroke();
        ctx.fillText(tName,xstart, ystart)
    }
    function HLineDraw(tName, xstart, ystart, lengthx) {
        ctx.beginPath();
        ctx.moveTo(xstart, ystart);
        ctx.lineTo(xstart + lengthx, ystart);
        ctx.closePath();
        ctx.stroke();
        // ctx.fillText(tName)
    }
}
