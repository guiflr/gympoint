import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async index(req, res) {
    const emptyHelpOrder = await HelpOrder.findAll({
      where: { answer: null },
      include: {
        model: Student,
        as: 'student',
        attributes: ['id', 'name'],
      },
    });

    return res.json(emptyHelpOrder);
  }

  async update(req, res) {
    if (!req.body.answer)
      return res.status(400).json({ error: 'Validation fails.' });

    if (!req.params.id)
      return res.status(400).json({ error: 'Id question not provider.' });

    const helpOrder = await HelpOrder.findByPk(req.params.id);

    if (!helpOrder)
      return res.status(400).json({ error: 'Help order not found.' });

    if (helpOrder.answer)
      return res
        .status(400)
        .json({ error: 'This question has already been answered.' });

    const answer = await helpOrder.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    const student = await Student.findByPk(answer.student_id, {
      attributes: ['name', 'email'],
    });

    await Queue.add(AnswerMail.key, { answer, student });

    return res.status(201).json(helpOrder);
  }
}

export default new AnswerController();
