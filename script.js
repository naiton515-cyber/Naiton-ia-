const apiKey = "COLOCA_TUA_API_KEY_AQUI";
const cx = "f04dbeefbaf124da5";

// MENU
function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

document.getElementById("overlay").addEventListener("click", toggleMenu);

// CHAT
async function enviar() {
    let input = document.getElementById("input").value;
    let chat = document.getElementById("chat");

    if (!input) return;

    chat.innerHTML += `<div class="msg user">${input}</div>`;

    let typing = document.createElement("div");
    typing.className = "typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    chat.appendChild(typing);

    chat.scrollTop = chat.scrollHeight;

    let resposta = "";

    try {
        let url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(input)}&key=${apiKey}&cx=${cx}`;
        let res = await fetch(url);
        let data = await res.json();

        if (data.items && data.items.length > 0) {
            resposta = data.items[0].snippet;
        } else {
            resposta = "Não encontrei nada 😅";
        }
    } catch {
        resposta = "Erro ao pesquisar 😢";
    }

    typing.remove();

    chat.innerHTML += `<div class="msg bot">${resposta}</div>`;

    document.getElementById("input").value = "";
    chat.scrollTop = chat.scrollHeight;
}

// BOTÃO
document.getElementById("btnEnviar").addEventListener("click", enviar);