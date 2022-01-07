

function getProject(slug){
    const options = {method: 'GET'};
  return new Promise((resolve, reject) => {
    fetch('https://api.opensea.io/api/v1/collection/'+slug, options)
    .then(response => response.json())
    .then(response => resolve(response))
    .catch(err => resolve(err));
  })
}


function getProjects(owner){
    const options = {method: 'GET'};
  return new Promise((resolve, reject) => {
    fetch('https://api.opensea.io/api/v1/collections?asset_owner='+owner+'&offset=0&limit=300', options)
    .then(response => response.json())
    .then(response => resolve(sortNFT(response)))
    .catch(err => resolve(err));
  })
}


function sortNFT(projects){

  function compare(aa, bb) {
    var a = aa['stats']['seven_day_volume']
    var b = bb['stats']['seven_day_volume']
    console.log(b)
    if (a > b) return -1;
    if (b > a) return 1;
    return 0;
  }
  return projects.sort(compare);

}

function getNFTs(owner, project){
    const options = {method: 'GET'};
  return new Promise((resolve, reject) => {
    fetch('https://api.opensea.io/api/v1/assets?owner='+owner+'&asset_contract_address='+project+'&order_direction=desc&offset=0&limit=20', options)
    .then(response => response.json())
    .then(response => resolve(response))
    .catch(err => resolve(err));
  })
}
export { getNFTs, getProjects, getProject}
