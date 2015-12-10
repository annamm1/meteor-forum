ownsDocument = function(userId, doc) {
    return userId&&doc && doc.userId === userId;
}
