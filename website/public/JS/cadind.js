const username = document.getElementById("username");
const envBtn = document.getElementById("env-btn");

envBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    await fetch("/inscricao-individual", {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            username: username.value.trim()
        })
    })
    .then((rawRes) => { return rawRes.json(); })
    .then((res) => {
        if (!res.error){
            alert(`${username.value.trim()} inscrito com sucesso!`);
            window.location.href = "/torneio";
        }
        else {
            alert(res.error);
        }
    });

});