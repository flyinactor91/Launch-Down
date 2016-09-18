var powersettings = {
    "Environment": {
        "Thunderstorm": {
            "visibility": 5,
            "damage": 5,
            "abiltext": "50% chance of exploding in-flight",
            "abilcost": 1.5,
            "animationName":'Thunderstorm',
            "sound":"../art/Sounds/thunder.mp3"
        },
        "Animal Attack": {
            "visibility": 2,
            "damage": 1,
            "abiltext": null,
            "abilcost": 1,
            "animationName":'AnimalAttack',"sound":"../art/Sounds/birds.mp3"
        },
        "Civilian Interference": {
            "visibility": 4,
            "damage": 1,
            "abiltext": "20% chance of exploding in-flight",
            "abilcost": 1.2,
            "animationName":'CivilianInterference',"sound":"../art/Sounds/Teacher Charlie Brown Talking-SoundBible.com-1454295165.mp3"

        },
        "Excessive Frost": {
            "visibility": 4,
            "damage": 3,
            "abiltext": "25% chance of exploding on launch pad",
            "abilcost": 1.25,
            "animationName":'ExcessiveFrost',"sound":"../art/Sounds/freeze.mp3"

        }
    },
    "Mechanical": {
        "Fueling Error": {
            "visibility": 2,
            "damage": 5,
            "abiltext": null,
            "abilcost": 1,
            "animationName":'FuelingError',"sound":"../art/Sounds/fueling_error.mp3"

        },
        "Launch Pad Leak": {
            "visibility": 5,
            "damage": 5,
            "abiltext": null,
            "abilcost": 1,
            "animationName":'LaunchPadLeak',"sound":"../art/Sounds/Chamber Decompressing-SoundBible.com-1075404493.mp3"

        },
        "Rocket Valve Failure": {
            "visibility": 3,
            "damage": 5,
            "abiltext": null,
            "abilcost": 1,
            "animationName":'RocketValveFailure',"sound":"../art/Sounds/Air Leaking Out Sound-SoundBible.com-714635080.mp3"

        },
        "Malfunctioning Sensors": {
            "visibility": 1,
            "damage": 3,
            "abiltext": "20% chance of exploding on launch pad",
            "abilcost": 1.2,
            "animationName":'MalfunctioningSensors',"sound":"../art/Sounds/ie_Short_Cow_MooDTMF_Tones-KevanGC-494166652.mp3"

        }
    },
    "Human Factors": {
        "Launch Team Distraction": {
            "visibility": 3,
            "damage": 3,
            "abiltext": "Less likely to notice environmental issues",
            "abilcost": 1.5,
            "animationName":'LaunchTeamDistraction',"sound":"../art/Sounds/16mm Film Projector-SoundBible.com-1297668862.mp3"
        },
        "Flight Crew Distraction": {
            "visibility": 4,
            "damage": 5,
            "abiltext": null,
            "abilcost": 1,
            "animationName":'FlightCrewDistraction',"sound":"../art/Sounds/Water Drop Sound High-SoundBible.com-1387792987.mp3"

        },
        "Quality Assurance Failure": {
            "visibility": 2,
            "damage": 3,
            "abiltext": "Less likely to notice mechanical issues",
            "abilcost": 1.5,
            "animationName": 'QualityAssuranceFailure',"sound":"../art/Sounds/chipmunk.mp3"

        },
        "Management Pressure": {
            "visibility": 3,
            "damage": 1,
            "abiltext": "25% chance of guarenteed launch",
            "abilcost": 1.75,
            "animationName": 'ManagementPressure',"sound":"../art/Sounds/Angry Chipmunk-SoundBible.com-980210050.mp3"

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
