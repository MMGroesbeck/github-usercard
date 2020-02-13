/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

  {
   data = {login, id, node_id, avatar_url, gravatar_id, url, html_url, followers_url, following_url, gists_url, starred_url, subscriptions.url, OTHERS}
   headers = {}
   config = {}
   request = {}
  }
   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

const cardMain = document.querySelector('.cards');

axios.get("https://api.github.com/users/MMGroesbeck")
  .then(res => {
    // console.log(res);
    cardMain.append(newCard(res.data))
  })
  .catch(err => {
    // console.log("API request not completed. " + err);
  });

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* GitHub API result for followers page:
  {
    data = [
    {login, id, node_id, etc}, {}
  ]
  }
*/

axios.get("https://api.github.com/users/MMGroesbeck/followers")
  .then(res => {
    res.data.forEach((item) => {
      axios.get(item.url)
        .then(res => {
          cardMain.append(newCard(res.data));
        })
        .catch(err => {
          // console.log("Follower API request not completed. " + err);
        })
    });
  })
  .catch(err => {
    // console.log("API request not completed. " + err);
  });

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function newCard (info){
  // console.log(info);
  // Create elements:
  const card = document.createElement('div');
  const img = document.createElement('img');
  const sectionOne = document.createElement('div');
  const cardInfo = document.createElement('div');
  const newName = document.createElement('h3');
  const newUserName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const profileLink = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');
  const extraInfo = document.createElement('div');
  const followersLink = document.createElement('p');
  const followersURL = document.createElement('a');
  const followingLink = document.createElement('p');
  const followingURL = document.createElement('a');
  const gitCal = document.createElement('div');
  const expandButton = document.createElement('span');

  // Add classes:
  card.classList.add('card');
  sectionOne.classList.add('card-section')
  cardInfo.classList.add('card-info');
  extraInfo.classList.add('extra-info', 'hidden');
  newName.classList.add('name');
  newUserName.classList.add('username');
  gitCal.classList.add('calendar');
  expandButton.classList.add('expandButton');

  // Organize structure:
  cardInfo.append(newName, newUserName, location, profile, followers, following, bio);
  sectionOne.append(img, cardInfo);
  extraInfo.append(gitCal, followersLink, followingLink);
  card.append(sectionOne, extraInfo, expandButton);

  // Add content:
  img.src = info.avatar_url;
  newName.textContent = info.name;
  newUserName.textContent = info.login;
  location.textContent = info.location;
  profile.textContent = "Profile: ";
  profile.append(profileLink);
  profileLink.href = info.url;
  profileLink.textContent = info.url;
  followers.textContent = "Followers: " + info.followers;
  following.textContent = "Following: " + info.following;
  if (info.bio){
    bio.textContent = "Bio: " + info.bio;
  } else {
    bio.textContent = "Bio not provided on GitHub."
  }
  GitHubCalendar(gitCal, info.login, {responsive: true});
  followersLink.textContent = "Followers page: ";
  followersURL.href = info.followers_url;
  followersURL.textContent = info.followers_url;
  followersLink.append(followersURL);
  followingLink.textContent = "Following page: ";
  followingURL.href = info.following_url.slice(0,-13);
  followingURL.textContent = info.following_url.slice(0,-13);
  followingLink.append(followingURL);
  expandButton.textContent = '\u25bc';

  // add event listener for button:
  expandButton.addEventListener('click', () => {
    extraInfo.classList.toggle('hidden');
    if (extraInfo.classList.contains('hidden')){
      expandButton.textContent = '\u25bc';
    } else {
      expandButton.textContent = '\u25b2';
    }
  })
  

  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/