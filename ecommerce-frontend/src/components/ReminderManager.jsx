import { useEffect } from "react";
import { getReminders } from "../services/reminderService";

const ReminderManager = () => {

    useEffect(() => {

        const checkReminders = () => {

            const reminders =
                getReminders();

            const now = new Date();

            const currentTime =
                now.toTimeString()
                    .slice(0, 5);


            reminders.forEach((reminder) => {

                if (!reminder.enabled) {
                    return;
                }


                if (!reminder.times.includes(currentTime)) {
                    return;
                }


                if (
                    reminder.notificationAllowed &&
                    Notification.permission === "granted"
                ) {

                    new Notification(
                        "💊 MediPharm Reminder",
                        {
                            body:
                                `Time to take ${reminder.medicineName}\n` +
                                `Dose: ${reminder.dosage}`,
                            icon: "/favicon.ico"
                        }
                    );

                }

            });

        };


        /*
         * Check immediately
         */

        checkReminders();


        /*
         * Check every 30 seconds
         */

        const interval =
            setInterval(
                checkReminders,
                30000
            );


        return () => {

            clearInterval(interval);

        };

    }, []);


    return null;
};

export default ReminderManager;