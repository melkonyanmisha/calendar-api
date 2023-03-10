import {Router} from "express";

import CalendarController from "../controllers/calendar.js";
const calendarController = new CalendarController();
const router = new Router();

router.get('/:date', calendarController.getEvents);
router.post('/', calendarController.createEvent);
router.put('/:id', calendarController.updateEvent);
router.delete('/:id', calendarController.deleteEvent);

export default router;