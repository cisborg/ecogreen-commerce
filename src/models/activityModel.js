const activities = {
    renewableEnergy: { maxThreshold: 100, description: "Renewable Smart Energy Usage" },
    entrepreneurship: { maxThreshold: 80, description: "Entrepreneurship Startups" },
    climateActions: { maxThreshold: 90, description: "Climate Action Initiatives" },
    treePlanting: { maxThreshold: 50, description: "Tree Planting" },
    sustainableActivities: { maxThreshold: 70, description: "Sustainable Activities" },
    ecoGreenMovements: { maxThreshold: 60, description: "Eco Green Movements" }
};

const userActivities = {
    renewableEnergy: 0,
    entrepreneurship: 0,
    climateActions: 0,
    treePlanting: 0,
    sustainableActivities: 0,
    ecoGreenMovements: 0
};

const updateUserActivity = (activity, value) => {
    if (activities[activity]) {
        userActivities[activity] = Math.min(userActivities[activity] + value, activities[activity].maxThreshold);
    }
};

const calculateAggregate = () => {
    const totalMaxThreshold = Object.values(activities).reduce((acc, activity) => acc + activity.maxThreshold, 0);
    const totalAchieved = Object.values(userActivities).reduce((acc, value) => acc + value, 0);
    const percentage = (totalAchieved / totalMaxThreshold) * 100;

    return { totalAchieved, totalMaxThreshold, percentage };
};

module.exports = { activities, userActivities, updateUserActivity, calculateAggregate };
