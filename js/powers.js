var powersettings = {
    "Environment": {
        "Thunderstorm": {
            "visibility": 5,
            "damage": 5,
            "abiltext": "50% chance of exploding in-flight",
            "abilcost": 1.5
        },
        "Animal Attack": {
            "visibility": 2,
            "damage": 1,
            "abiltext": null,
            "abilcost": 1
        },
        "Civilian Interference": {
            "visibility": 4,
            "damage": 1,
            "abiltext": "20% chance of exploding in-flight",
            "abilcost": 1.2
        },
        "Excessive Frost": {
            "visibility": 4,
            "damage": 3,
            "abiltext": "25% chance of exploding on launch pad",
            "abilcost": 1.25
        }
    },
    "Mechanical": {
        "Fueling Error": {
            "visibility": 2,
            "damage": 5,
            "abiltext": null,
            "abilcost": 1
        },
        "Launch Pad Leak": {
            "visibility": 5,
            "damage": 5,
            "abiltext": null,
            "abilcost": 1
        },
        "Rocket Valve Failure": {
            "visibility": 3,
            "damage": 5,
            "abiltext": null,
            "abilcost": 1
        },
        "Malfunctioning Sensors": {
            "visibility": 1,
            "damage": 3,
            "abiltext": "20% chance of exploding on launch pad",
            "abilcost": 1.2
        }
    },
    "Human Factors": {
        "Launch Team Distraction": {
            "visibility": 3,
            "damage": 3,
            "abiltext": "Less likely to notice environmental issues",
            "abilcost": 1.5
        },
        "Flight Crew Distraction": {
            "visibility": 4,
            "damage": 5,
            "abiltext": null,
            "abilcost": 1
        },
        "Quality Assurance Failure": {
            "visibility": 2,
            "damage": 3,
            "abiltext": "Less likely to notice mechanical issues",
            "abilcost": 1.5
        },
        "Management Pressure": {
            "visibility": 3,
            "damage": 1,
            "abiltext": "25% chance of guarenteed launch",
            "abilcost": 1.75
        }
    }
}

function makePowers(data) {
    for (var ptype in data) {
        for (var name in data[ptype]) {
            data[ptype][name]['active'] = false;
            Object.defineProperty(data[ptype][name], 'cost', { get: function () { return Math.round((6-this.visibility) * (this.damage*1.5) * this.abilcost); } });
        }
    }
    return data
}

var powers = makePowers(powersettings);
//console.log(powers.env['Thunderstorm'].cost)