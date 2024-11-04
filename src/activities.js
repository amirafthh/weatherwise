const weatherCondition = sessionStorage.getItem("weatherCondition");
if (!weatherCondition) {
    alert("Weather condition not found. Please go back and search for a city.");
    window.location.href = "index.html";
}

const activityList = document.getElementById('activityList');
const userActivities = [];

// activities matched with weather condition and their required equipment
const activities = {
    "clear": [
        { name: 'Hiking', equipment: 'Hiking boots, water bottle, sunscreen, hat, map/GPS, sunglasses' },
        { name: 'Picnic', equipment: 'Picnic blanket, food and drinks, sunscreen, insect repellent, umbrella for shade' },
        { name: 'Beach Volleyball', equipment: 'Volleyball, beach towel, sunscreen, sunglasses, water bottle' }
    ],
    "sunny": [
        { name: 'Hiking', equipment: 'Hiking boots, water bottle, sunscreen, hat, map or GPS, sunglasses' },
        { name: 'Picnic', equipment: 'Picnic blanket, food and drinks, sunscreen, insect repellent, umbrella for shade' },
        { name: 'Beach Volleyball', equipment: 'Volleyball, beach towel, sunscreen, sunglasses, water bottle' }
    ],
    "partly cloudy": [
        { name: 'Bird Watching', equipment: 'Binoculars, notebook, hat, comfortable shoes' },
        { name: 'Scenic Walk', equipment: 'Comfortable walking shoes, camera, light jacket, map/phone' },
        { name: 'Outdoor Yoga', equipment: 'Yoga mat, towel, water bottle, comfortable clothing' }
    ],
    "cloudy": [
        { name: 'Bird Watching', equipment: 'Binoculars, notebook, hat, comfortable shoes' },
        { name: 'Scenic Walk', equipment: 'Comfortable walking shoes, camera, light jacket, map/phone' },
        { name: 'Outdoor Yoga', equipment: 'Yoga mat, towel, water bottle, comfortable clothing' }
    ],
    "overcast": [
        { name: 'Urban Photography', equipment: 'Camera, spare batteries, weatherproof bag, comfortable shoes' },
        { name: 'Scenic Drive', equipment: 'Car, map, snacks, light jacket' },
        { name: 'Museum Visit', equipment: 'Comfortable shoes, water bottle, small bag' }
    ],
    "mist": [
        { name: 'Nature Photography', equipment: 'Camera, tripod, weatherproof jacket' },
        { name: 'Lighthouse Visit', equipment: 'Map, jacket, comfortable shoes, flashlight' },
        { name: 'Forest Walk', equipment: 'Walking boots, flashlight, jacket, water bottle' }
    ],
    "fog": [
        { name: 'Nature Photography', equipment: 'Camera, tripod, weatherproof jacket' },
        { name: 'Lighthouse Visit', equipment: 'Map, jacket, comfortable shoes, flashlight' },
        { name: 'Forest Walk', equipment: 'Walking boots, flashlight, jacket, water bottle' }
    ],
    "light drizzle": [
        { name: 'Garden Walk', equipment: 'Umbrella, waterproof jacket, boots' },
        { name: 'Rain Photography', equipment: 'Waterproof camera cover, tripod, umbrella' },
        { name: 'Greenhouse Visit', equipment: 'Umbrella, light rain jacket, comfortable shoes' }
    ],
    "patchy light rain": [
        { name: 'Garden Walk', equipment: 'Umbrella, waterproof jacket, boots' },
        { name: 'Rain Photography', equipment: 'Waterproof camera cover, tripod, umbrella' },
        { name: 'Greenhouse Visit', equipment: 'Umbrella, light rain jacket, comfortable shoes' }
    ],
    "moderate rain" : [
        { name: 'Indoor Rock Climbing', equipment: 'Climbing shoes, comfortable clothes, water bottle'},
        { name: 'Bowling', equipment: 'Bowling shoes (or rental)", "socks", "water bottle'},
        { name: 'Cooking Class', equipment: 'Apron", "recipe notebook", "kitchen-safe shoes'},
    ],
    "heavy rain" : [
        { name: 'Indoor Rock Climbing', equipment: 'Climbing shoes, comfortable clothes, water bottle'},
        { name: 'Bowling', equipment: 'Bowling shoes (or rental)", "socks", "water bottle'},
        { name: 'Cooking Class', equipment: 'Apron", "recipe notebook", "kitchen-safe shoes'},
    ],
    "freezing drizzle": [
        { name: 'Art Gallery Visit', equipment: 'Jacket, camera, backpack'},
        { name: 'Board Game Cafe', equipment: 'Games (if personal), warm clothing, snacks'},
        { name: 'Local Theater Show', equipment: 'Tickets, jacket, snacks if allowed'},
    ],
    "light freezing rain": [
        { name: 'Art Gallery Visit', equipment: 'Jacket, camera, backpack'},
        { name: 'Board Game Cafe', equipment: 'Games (if personal), warm clothing, snacks'},
        { name: 'Local Theater Show', equipment: 'Tickets, jacket, snacks if allowed'},
    ],
    "light snow" : [
        { name: 'Skiing', equipment: 'Skis, poles, helmet, gloves, warm clothing, goggles'},
        { name: 'Snow Shoeing', equipment: 'Snowshoes, winter boots, gloves, jacket, backpack with water'},
        { name: 'Ice Skating', equipment: 'Ice skates, warm clothing, gloves, helmet'},
    ],
    "moderate snow" : [
        { name: 'Skiing', equipment: 'Skis, poles, helmet, gloves, warm clothing, goggles'},
        { name: 'Snow Shoeing', equipment: 'Snowshoes, winter boots, gloves, jacket, backpack with water'},
        { name: 'Ice Skating', equipment: 'Ice skates, warm clothing, gloves, helmet'},
    ],
    "heavy snow" : [
        { name: 'Home Baking Day', equipment: 'Baking ingredients, oven, recipe, apron'},
        { name: 'Indoor Craft Workshop', equipment: 'Art supplies, workspace, protective sheets for surfaces'},
        { name: 'Virtual Tour', equipment: 'Internet connection, computer/tablet, cozy seating'},
    ],
    "blizzard" : [
        { name: 'Home Baking Day', equipment: 'Baking ingredients, oven, recipe, apron'},
        { name: 'Indoor Craft Workshop', equipment: 'Art supplies, workspace, protective sheets for surfaces'},
        { name: 'Virtual Tour', equipment: 'Internet connection, computer/tablet, cozy seating'},
    ],
    "thundery outbreaks" : [
        { name: 'Movie Marathon', equipment: 'Blankets, snacks, comfortable seating'},
    ],
    "thunderstorm" : [
        { name: 'Movie Marathon', equipment: 'Blankets, snacks, comfortable seating'},
    ],
    "foggy" : [
        { name: 'Lighthouse Exploration', equipment: 'Comfortable shoes, jacket, flashlight, camera'},
        { name: 'Coffee Shop Relaxation', equipment: 'Book, headphones, warm clothing'},
        { name: 'Indoor Gym Workout', equipment: 'Gym wear, water bottle, headphones'},
    ],
    "freezing fog" : [
        { name: 'Lighthouse Exploration', equipment: 'Comfortable shoes, jacket, flashlight, camera'},
        { name: 'Coffee Shop Relaxation', equipment: 'Book, headphones, warm clothing'},
        { name: 'Indoor Gym Workout', equipment: 'Gym wear, water bottle, headphones'},
    ],
    "Ice Pellets" : [
        { name: 'Ice Sculpture Viewing', equipment: 'Warm clothing, camera, gloves, thermos with hot drink'},
        { name: 'Library Day', equipment: 'Book bag, reading list, comfortable shoes'},
        { name: 'Indoor Gardening Workshop', equipment: 'Gardening gloves, soil, small pots, plant seeds'},
    ],
    "Sleet" : [
        { name: 'Ice Sculpture Viewing', equipment: 'Warm clothing, camera, gloves, thermos with hot drink'},
        { name: 'Library Day', equipment: 'Book bag, reading list, comfortable attires'},
        { name: 'Indoor Gardening Workshop', equipment: 'Gardening gloves, soil, small pots, plant seeds'},
    ],
    
};



// to diisplay suggested activities based on the weather condition
function showSuggestedActivities() {
    // to check if there is a valid weather condition with corresponding activities
    if (weatherCondition && activities[weatherCondition]) {
        activities[weatherCondition].forEach(activity => {
            const listItem = document.createElement('li');
            listItem.classList.add('activity-card');
            listItem.innerHTML = `
                <h3>${activity.name}</h3>
                <button onclick="addToUserActivities('${activity.name}', '${activity.equipment}')">Add to My Activities</button>
            `;
            activityList.appendChild(listItem);
        });
    } else {
        // display a message if no suggested activities are available
        const message = document.createElement('p');
        message.innerText = "No suggested activities available for this weather condition.";
        activityList.appendChild(message);
    }
}

// to add selected activity to user activities list
function addToUserActivities(name, equipment) {
    // to check if the activity is already in the list to prevent duplicates
    if (userActivities.some(activity => activity.name === name)) {
        alert(`${name} is already in your list!`);
        return;
    }
    userActivities.push({ name, equipment, notes: '' });
    updateUserActivitiesList();
    alert(`${name} added to your list!`);
}

// update the display of user activities
function updateUserActivitiesList() {
    const userActivitiesList = document.getElementById('userActivitiesList');
    userActivitiesList.innerHTML = ''; 

    userActivities.forEach((activity, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('activity-card');
        listItem.innerHTML = `
            <h3>${activity.name}</h3>
            <p>Equipment: ${activity.equipment}</p>
            <p>${activity.notes ? `Notes: ${activity.notes}` : 'No notes added'}</p>
            <button onclick="addNotes(${index})">Add Notes</button>
            <button onclick="deleteActivity(${index})">Delete</button>
        `;
        userActivitiesList.appendChild(listItem);
    });
}

// to add notes to an activity
function addNotes(index) {
    const notes = prompt(`Enter notes for ${userActivities[index].name}`);
    if (notes !== null) {
        userActivities[index].notes = notes;
        updateUserActivitiesList();
    }
}

// to delete an activity from the user list
function deleteActivity(index) {
    if (confirm(`Are you sure you want to delete ${userActivities[index].name}?`)) {
        userActivities.splice(index, 1);
        updateUserActivitiesList();
    }
}

showSuggestedActivities();