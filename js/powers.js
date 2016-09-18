var powersettings = {
    "Environment": {
        "Thunderstorm": {
            "visibility": 5,
            "damage": 5,
            "abiltext": "50% chance of exploding in-flight",
            "abilcost": 1.5,
            "animationName":'Thunderstorm',
            "sound":"../art/Sounds/Thunder_HD-Mark_DiAngelo-587966950.mp3"
        },
        "Animal Attack": {
            "visibility": 2,
            "damage": 1,
            "abiltext": null,
            "abilcost": 1,
            "animationName":'AnimalAttack',
        },
        "Civilian Interference": {
            "visibility": 4,
            "damage": 1,
            "abiltext": "20% chance of exploding in-flight",
            "abilcost": 1.2,
            "animationName":'CivilianInterference',
        },
        "Excessive Frost": {
            "visibility": 4,
            "damage": 3,
            "abiltext": "25% chance of exploding on launch pad",
            "abilcost": 1.25,
            "animationName":'ExcessiveFrost',
        }
    },
    "Mechanical": {
        "Fueling Error": {
            "visibility": 2,
            "damage": 5,
            "abiltext": null,
            "abilcost": 1,
            "animationName":'FuelingError',
        },
        "Launch Pad Leak": {
            "visibility": 5,
            "damage": 5,
            "abiltext": null,
            "abilcost": 1,
            "animationName":'LaunchPadLeak',
        },
        "Rocket Valve Failure": {
            "visibility": 3,
            "damage": 5,
            "abiltext": null,
            "abilcost": 1,
            "animationName":'RocketValveFailure',
        },
        "Malfunctioning Sensors": {
            "visibility": 1,
            "damage": 3,
            "abiltext": "20% chance of exploding on launch pad",
            "abilcost": 1.2,
            "animationName":'MalfunctioningSensors',
        }
    },
    "Human Factors": {
        "Launch Team Distraction": {
            "visibility": 3,
            "damage": 3,
            "abiltext": "Less likely to notice environmental issues",
            "abilcost": 1.5,
            "animationName":'LaunchTeamDistraction',
        },
        "Flight Crew Distraction": {
            "visibility": 4,
            "damage": 5,
            "abiltext": null,
            "abilcost": 1,
            "animationName":'FlightCrewDistraction',
        },
        "Quality Assurance Failure": {
            "visibility": 2,
            "damage": 3,
            "abiltext": "Less likely to notice mechanical issues",
            "abilcost": 1.5,
            "animationName": 'QualityAssuranceFailure',
        },
        "Management Pressure": {
            "visibility": 3,
            "damage": 1,
            "abiltext": "25% chance of guarenteed launch",
            "abilcost": 1.75,
            "animationName": "ManagementPressure",
        }
    }
}

function makePowers(data) {
    for (var ptype in data) {
        for (var name in data[ptype]) {
            data[ptype][name]['active'] = false;
            Object.defineProperty(data[ptype][name], 'cost', { get: function () { return Math.round((6-this.visibility) * (this.damage*1.5) * this.abilcost); } });
            //console.log(name, data[ptype][name].cost);
        }
    }
    return data
}

var powers = makePowers(powersettings);
//console.log(powers.env['Thunderstorm'].cost)
