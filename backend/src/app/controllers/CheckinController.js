import Checkin from '../models/Checkin';
import Student from '../models/Student';
import { Op } from 'sequelize';
import { startOfWeek, endOfWeek } from 'date-fns';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) return res.status(400).json({ error: 'Student not found.' });

    const checkins = await Checkin.findAll({
      where: { student_id: id },
      attributes: ['created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return es.json(checkins);
  }
  async store(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) return res.status(400).json({ error: 'Student not found.' });

    const checkins = await Checkin.count({
      where: {
        created_at: {
          [Op.between]: [
            startOfWeek(new Date(), { weekStartsOn: 1 }),
            endOfWeek(new Date()),
          ],
        },
        student_id: id,
      },
    });

    if (checkins > 4)
      return res
        .status(401)
        .json({ error: 'Access limit reached in this week.' });

    await Checkin.create({ student_id: id });

    return res.json({ message: 'authorized.' });
  }

  async show(req, res) {}
}

export default new CheckinController();
