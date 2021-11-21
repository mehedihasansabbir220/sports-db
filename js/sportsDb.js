const loadpayer = () => {
    const inputField = document.getElementById('scarch-field');
    const inputText = inputField.value;
    const url = `
    https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputText}
    `;
    fetch(url)
        .then(res => res.json())
        .then(data => displyClub(data.teams))

    inputField.value = '';
}
const displyClub = clubs => {
    const scarchResult = document.getElementById('scarch-result');
    scarchResult.textContent = '';
    clubs.forEach(club => {
        //console.log(club);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="clubdetls(${club.idTeam})" class="card">
                <img src="${club.strTeamBadge}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${club.strTeam}</h5>
                    <p class="card-text">${club.strDescriptionEN.slice(0, 250)}.</p>
                </div>
            </div>
        `;
        scarchResult.appendChild(div);
    });
    scarchResult.classList.add('col');

};
const clubdetls = clubId => {
    const url = `
    https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${clubId}
    `;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPlayer(data.teams[0]))
};
const displayPlayer = player => {
    //console.log(player);
    const detlsclub = document.getElementById('detls-club');
    detlsclub.textContent = '';
    if (player.length == 0) {
        const div = document.createElement('div');
        div.innerHTML = `
        <h3>no result found</h3>
        
        `
        detlsclub.appendChild(div)
    }
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
     <img src="${player.strTeamBadge}" class="card-img-top" alt="...">
         <div class="card-body">
             <h5 class="card-title">${player.strTeam}</h5>
             <p class="card-text">${player.strDescriptionEN.slice(0, 300)}.</p>
             <a href="${player.strYoutube}" class="btn btn-primary">Go website</a>
         </div>
    `;
    detlsclub.appendChild(div)

}