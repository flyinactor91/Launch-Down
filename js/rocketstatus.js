var rocketstatussettings = {
    90: "Loading Fuel Tanks",
    60: "Fuel Tanks Loaded",
    50: "Pressurizing Fuel Tanks",
    35: "Fuel Tanks Pressurized",
    30: "Chilling Engines",
    20: "Retracting Tower",
    16: "Switching to Internal Power",
    12: "Tower Retracted",
    10: "Vehicle Startup Sequence",
    3: "Engine Ignition",
    0: "Liftoff"
}

function getRocketStatus(sec) {
    if (sec in rocketstatussettings) {
        return rocketstatussettings[sec];
    } else {
        return null;
    }
};
