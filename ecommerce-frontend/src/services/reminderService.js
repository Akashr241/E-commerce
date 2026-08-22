const REMINDER_KEY = "medicine_reminders";

/*
 * Get all reminders
 */
export const getReminders = () => {
    const reminders =
        localStorage.getItem(REMINDER_KEY);

    return reminders
        ? JSON.parse(reminders)
        : [];
};


/*
 * Save all reminders
 */
const saveReminders = (reminders) => {

    localStorage.setItem(
        REMINDER_KEY,
        JSON.stringify(reminders)
    );

};


/*
 * Add new reminder
 */
export const addReminder = (reminder) => {

    const reminders = getReminders();

    const newReminder = {
        id: Date.now(),
        ...reminder,
        enabled: true,
        createdAt: new Date().toISOString()
    };

    reminders.push(newReminder);

    saveReminders(reminders);

    return newReminder;
};


/*
 * Delete reminder
 */
export const deleteReminder = (id) => {

    const reminders = getReminders();

    const updatedReminders =
        reminders.filter(
            reminder => reminder.id !== id
        );

    saveReminders(updatedReminders);

};


/*
 * Enable / disable reminder
 */
export const toggleReminder = (id) => {

    const reminders = getReminders();

    const updatedReminders =
        reminders.map(reminder => {

            if (reminder.id === id) {

                return {
                    ...reminder,
                    enabled: !reminder.enabled
                };

            }

            return reminder;

        });

    saveReminders(updatedReminders);

    return updatedReminders;

};