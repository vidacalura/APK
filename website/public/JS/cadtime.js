const nomeTime = document.getElementById("nome-time");
const liderUsername = document.getElementById("username-lider");
const membroUsername2 = document.getElementById("username-membro-2");
const membroUsername3 = document.getElementById("username-membro-3");
const membroUsername4 = document.getElementById("username-membro-4");
const envBtn = document.getElementById("env-btn");

envBtn.addEventListener("click", async () => {

    await fetch("/inscricao-time", {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            nomeTime: nomeTime.value.trim(),
            lider: liderUsername.value.trim(),
            membro2: membroUsername2.value.trim(),
            membro3: membroUsername3.value.trim(),
            membro4: membroUsername4.value.trim()
        })
    })
    .then((rawRes) => { return rawRes.json(); })
    .then((res) => {
        if (!res.error){
            alert(`Time ${nomeTime.value.trim()} inscrito com sucesso!`);
            window.location.href = "/inscricao-individual";
        }
        else {
            alert(res.error);
        }
    });

});