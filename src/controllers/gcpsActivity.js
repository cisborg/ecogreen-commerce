const { activities, updateUserActivity, calculateAggregate } = require('../models/gcpsActivity');

const logActivity = (req, res) => {
    const { activity, value } = req.body;
    updateUserActivity(activity, value);
    const { percentage } = calculateAggregate();
    const badgeMessage = awardBadge(percentage);
    res.json({ percentage, badgeMessage });
};

const awardBadge = (percentage) => {
    if (percentage >= 60) {
        return "Congratulations! You've earned a badge and premium membership!";
    } else {
        return "Keep going! You can earn a badge with more activities.";
    }
};

module.exports = { logActivity };
