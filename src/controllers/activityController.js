const calculateProgress = async (userId) => {
    const activities = await Activity.getAll(userId);
    const totalActivities = activities.length;
    const completedActivities = activities.filter(activity => activity.completed).length;

    return {
        total: totalActivities,
        completed: completedActivities,
        progress: totalActivities ? (completedActivities / totalActivities) * 100 : 0
    };
};

module.exports = { calculateProgress };
