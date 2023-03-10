import Event from '../models/event.js';
import moment from "moment";

class CalendarController {

    async createEvent(req, res) {
        try {
            const {title, date} = req.body;
            const newEvent = new Event({title, date});
            const savedEvent = await newEvent.save();

            res.status(201).json(savedEvent);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async getEvents(req, res) {
        try {
            const {date} = req.params;
            const startOfDay = moment(date).startOf('day');
            const endOfDay = moment(date).endOf('day');

            const event = await Event.find({
                date: {
                    $gte: startOfDay,
                    $lt: endOfDay
                }
            });

            if (!event) {
                return res.status(404).json({message: 'Event not found'});
            }

            res.json(event);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async updateEvent(req, res) {
        try {
            const {id} = req.params;
            const {title, date} = req.body;
            const updatedEvent = await Event.findByIdAndUpdate(
                id,
                {title, date},
                {new: true}
            );

            res.json(updatedEvent);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async deleteEvent(req, res) {
        try {
            const {id} = req.params;
            await Event.findByIdAndDelete(id);
            res.json({message: 'Event deleted'});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}

export default CalendarController;