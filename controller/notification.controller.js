const { ONE_SIGNAL_CONFIG } = require("../config/app.config");
const notificaitionService = require("../services/notification.service");

exports.SendNotification = (req, res, next) => {
    var message = {
        app_id: ONE_SIGNAL_CONFIG.APP_ID,
        contents: { en: "Check notification" },
        included_segments: ["All"],
        content_available: true,
        small_icon: "ic_notification_icon",
        data: {
            Title: "CUSTOM NOTIFICATION"
        }
    };

    notificaitionService.SendNotification(message, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};


exports.SendNotificationToDevice = (req, res, next) => {
    var message = {
        app_id: ONE_SIGNAL_CONFIG.APP_ID,
        contents: { en: "Check notification" },
        included_segments: ["included_client_ids"],
        included_client_ids: req.body.devices,
        content_available: true,
        small_icon: "ic_notification_icon",
        data: {
            Title: "CUSTOM NOTIFICATION"
        }
    };

    notificaitionService.SendNotification(message, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};