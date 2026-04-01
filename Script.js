async function enviar() {
    let input = document.getElementById("input").value;
    let chat = document.getElementById("chat");

    chat.innerHTML += `<div class="msg user">Tu: ${input}</div>`;

    let resposta = "";

    // IA simples primeiro
    if (input.toLowerCase().includes("oi")) {
        resposta = "Olá! Eu sou a Naiton ";
        chat.innerHTML += `<div class="msg bot">${resposta}</div>`;
    } 
    else {
        chat.innerHTML += `<div class="msg bot">🔍 A pesquisar no Google...</div>`;

        const apiKey = "AIzaSyBwh8Vbc9z9-dGmA0eUfsjLs3UZ8gRTZ6Y";
        const cx = "f04dbeefbaf124da5";

        let url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(input)}&key=${apiKey}&cx=${cx}`;

        let res = await fetch(url);
        let data = await res.json();

        if (data.items && data.items.length > 0) {
            resposta = data.items[0].snippet;
        } else {
            resposta = "sem informações ainda";
        }

        chat.innerHTML += `<div class="msg bot">Naiton: ${resposta}</div>`;
    }

    document.getElementById("input").value = "";
    chat.scrollTop = chat.scrollHeight;
}
document.getElementById("btnEnviar").addEventListener("click", enviar);