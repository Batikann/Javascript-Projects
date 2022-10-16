let textInput = document.getElementById("textBox");
const btn = document.getElementById("btn");
const userName = document.querySelector(".name");
const bio = document.querySelector(".bio");
const date = document.querySelector(".date");
const img = document.querySelector("img");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const locationn = document.getElementById("location");
const twiter = document.getElementById("twiter");
const link = document.getElementById("link");
const company = document.getElementById("company");

async function showGithubProfile() {
  let url = "https://api.github.com/users/" + textInput.value;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  img.src = data.avatar_url;
  userName.textContent = data.login;
  const dateData = data.created_at.slice(0, data.created_at.length - 10);
  date.textContent = `Joined ${dateData}`;
  if (data.bio == null) {
    bio.textContent = "This profile has no bio";
  } else {
    bio.textContent = data.bio;
  }

  repos.textContent = data.public_repos;
  followers.textContent = data.followers;
  following.textContent = data.following;
  if (data.locationn==null) {
    locationn.textContent="Not Available";
  }
  else{
    locationn.textContent = data.location;
  }
  if (data.twitter_username == null) {
    twiter.textContent = "Not Available";
  } else {
    twiter.textContent = data.twitter_username;
  }
  if (data.blog == "") {
    link.textContent = "Not Available";
  } else {
    link.textContent = data.blog;
  }

  if (data.company==null) {
      company.textContent="Not Available";
  }
  else{
    company.textContent = data.company;
  }
}

btn.addEventListener("click", showGithubProfile);
