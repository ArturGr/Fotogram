// List of foto
const TABLE_OF_FOTO = [
    '"./img/foto/IMG_20250920_183234.jpg" alt="Weite Berglandschaft mit Wäldern und Tälern."',
    '"./img/foto/IMG_20250920_183647.jpg" alt="Kleiner Falke sitzt auf Dachfirst, blauer Himmel."',
    '"./img/foto/IMG20250809125500.jpg" alt="Goldenes Liebesschloss an Holzzaun befestigt."',
    '"./img/foto/IMG20250812063112.jpg" alt="Sonnenaufgang auf Straße mit gepflastertem Randstreifen."',
    '"./img/foto/IMG20250816143205.jpg" alt="Ich am Seeufer vor Bergpanorama."',
    '"./img/foto/IMG20250824123641.jpg" alt="Bergsee mit majestätischen Felsen und Spiegelung."',
    '"./img/foto/IMG20250824124422.jpg" alt="Klarer Bergsee, Wald, Felsen und Ufer."',
    '"./img/foto/IMG20250824133852.jpg" alt="Pfad führt zu hohem Wasserfall im Wald."',
    '"./img/foto/IMG20250831132932.jpg" alt="Kirche am Fluss, Holzbrücke, Bergkulisse."',
    '"./img/foto/IMG20250831141332.jpg" alt="Spinne frisst Beute im Netz."',
    '"./img/foto/IMG20250831145714.jpg" alt="Blauer Hintersee mit Wald und Alpenpanorama."',
    '"./img/foto/IMG20250920154457.jpg" alt="Dunkelbraunes Eichhörnchen sucht am Waldboden."'
    ];

// Variable    
let currentFotoID = 0;
const TABLE_OF_FOTO_REF = document.getElementById("fotoalbum");
const DIALOGREF = document.getElementById("myDialog");

//Function of adding foto to visable gallery
function AddingFoto() {
    document.getElementById('fotoalbum').innerHTML = '';

    for (let i = 0; i < TABLE_OF_FOTO.length; i++) {
        TABLE_OF_FOTO_REF.innerHTML += `<img class="zoom" src=${TABLE_OF_FOTO[i]} onclick="openDialog(${i})">`;
        }
    TABLE_OF_FOTO_REF.classList.add("FotoMini");
}
 
//  Function for opening dialog window
function openDialog(FotoID) {
    currentFotoID = FotoID;
    const CURRENTTITLE = GetTitle(FotoID);
    const CURRENTSRC = GetFotoSource(FotoID);
    DIALOGREF.showModal();
    DIALOGREF.classList.add("opened");
    document.getElementById("dialogTitle").innerText = `${CURRENTTITLE}`;
    document.getElementById("CloseImg").innerHTML =`<img src="./img/nav/Ausgang.png" alt="schließen" onclick="closeDialog()">`;
    document.getElementById("fotoID").innerHTML = `<a href="${CURRENTSRC}" target="_blank"><img src=${TABLE_OF_FOTO[FotoID]}></a>`;
    document.getElementById("fotoNav").innerHTML = `<img src="./img/nav/Links.png" alt="vorheriges Foto" onclick="openDialog(PrevFoto(${FotoID}))">`;
    document.getElementById("fotoNav").innerHTML += `<p>${FotoID+1}/${TABLE_OF_FOTO.length}</p>`;
    document.getElementById("fotoNav").innerHTML += `<img src="./img/nav/Rechts.png" alt="nächstes Foto" onclick="openDialog(NextFoto(${FotoID}))">`;
}

//  Function for closing dialog window
function closeDialog() {
    DIALOGREF.close();
    DIALOGREF.classList.remove("opened");
    document.getElementById("CloseImg").innerHTML = '';
    document.getElementById("fotoID").innerHTML = '';
    document.getElementById("fotoNav").innerHTML = '';
}

// Function for calculating id of next foto
function NextFoto(value){
    const result = value + 1;

    if (result >= TABLE_OF_FOTO.length) {
        return 0;
    } else {
        return result;
    }
}

// Function for calculating id of prev foto
function PrevFoto(value) {
    const result = value - 1;

    if (result < 0) {
        return TABLE_OF_FOTO.length - 1;
    } else {
        return result;
    }
}

//Function for getting title of foto from img alt
function GetTitle(value) {
    const regex = /alt="(.+?)"/;
    const match = TABLE_OF_FOTO[value].match(regex);

    if (match.length > 1 && match[1].length > 0) {
        return match[1]; 
    } else {
        return "Error: empty title";
    }
}

//Function for getting source of foto from img src
function GetFotoSource(value) {
    const regex = /^"(.+?)"/;
    const match = TABLE_OF_FOTO[value].match(regex);
        
    if (match.length > 1 && match[1].length > 0) {
        return match[1]; 
    } else {
        return "";
    }
}

//EventListner for closing dialog window if the dialog was opened and user click on background
DIALOGREF.addEventListener('click', function(event) {
    if (event.target === DIALOGREF) {
        closeDialog();
        }
    }
);

//EventListner for keys: ESC, ArrowLeft, ArrowRight
document.addEventListener('keydown', function(event) {
    // 1.ESC
    if (event.key === 'Escape') {
        // Checkinf, if dialog window is opened
        if (DIALOGREF.open) { 
            closeDialog();
        }
    }
    // 2. Arrows
    if (DIALOGREF.open) {
        if (event.key === 'ArrowLeft') {
            const NEWFOTOID = PrevFoto(currentFotoID);
            openDialog(NEWFOTOID); // Open prev foto
        }
        else if(event.key === 'ArrowRight'){
            const NEWFOTOID = NextFoto(currentFotoID);
            openDialog(NEWFOTOID); // Open next foto
        }
    }
});
