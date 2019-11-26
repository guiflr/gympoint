import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(400).json({ error: 'Student not found' });

    const helpOrder = await HelpOrder.findAll({
      where: { student_id: req.params.id },
      attributes: ['question', 'answer', 'answer_at', 'created_at'],
      include: {
        model: Student,
        as: 'student',
        attributes: ['name'],
      },
    });
    return res.json(helpOrder);
  }
  async store(req, res) {
    if (!req.body.question)
      return res.status(400).json({ error: 'Validation fails.' });
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(400).json({ error: 'Student not found' });

    const helpOder = await HelpOrder.create({
      question: req.body.question,
      student_id: req.params.id,
    });

    return res.json(helpOder);
  }

  async show(req, res) {}
}

export default new HelpOrderController();
