// consts
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2601-FTB-ET-WEB-FT"; // Make sure to change this!
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// state
let parties = [];
let selectedParty;

async function getParties() {
  // call API
  try {
    const response = await fetch(`${API}`);
    const responseBody = await response.json();
    parties = responseBody.data;
  } catch (e) {
    console.error(e);
  }
}

async function getParty(id) {
  // fetch specific party
  try {
    const response = await fetch(`${API}/${id}`);
    // parse data
    const responseBody = await response.json();
    selectedParty = responseBody.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

// Components

// Party name with click event to show more details
function PartyListItem(party) {
  // create list item for parties
  const $li = document.createElement(`li`);
  // write party name
  $li.innerHTML = `<a href="#selected">${party.name}</a>`;
  // upon click, fetch party data from id
  $li.addEventListener("click", () => {
    getParty(party.id);
    render();
  });
  return $li;
}

// List of all parties
function PartyList() {
  // create ul of each party
  const $ul = document.createElement(`ul`);
  // add ul styling
  $ul.classList.add(`party-lineup`);
  // map each party to a party list item
  const $parties = parties.map(PartyListItem);
  $ul.replaceChildren(...$parties);
  return $ul;
}

// Info about the selected party
function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement(`p`);
    $p.textContent = "Please select a party to get more info.";
    return $p;
  }
  // if party is selected create and return a section
  const $section = document.createElement(`section`);
  $section.classList.add(`party`);
  $section.innerHTML = `
  <h3 class="name-id">${selectedParty.name} #${selectedParty.id}</h3>
  <p class="date"><span>Date:</span> ${selectedParty.date}</p>
  <p class="address"><span>Address:</span> ${selectedParty.location}</p>
  <p class="description">${selectedParty.description}</p>
  `;
  return $section;
}
// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Fullstack Party Planner</h1>
    <main>
      <section>
        <h2>Lineup</h2>
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;
  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

async function init() {
  await getParties();
  render();
}

init();
