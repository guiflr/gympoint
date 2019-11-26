import Matriculation from '../models/Matriculation';
import Student from '../models/Student';
import Plan from '../models/Plan';
import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import MatriculationMail from '../jobs/MatriculationMail';
import Queue from '../../lib/Queue';

class MatriculationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);
    if (!student)
      return res.status(400).json({ error: 'Student does not exist.' });

    const plan = await Plan.findByPk(plan_id);
    if (!plan) return res.status(400).json({ error: 'Plan does not exist.' });

    const matriculationExists = await Matriculation.findOne({
      where: { student_id: student.id },
    });

    if (matriculationExists)
      return res
        .status(400)
        .json({ error: 'This student already has one matriculation.' });

    const endDate = addMonths(parseISO(start_date), plan.duration);
    const totalValue = plan.price * plan.duration;
    const formattedPrice = totalValue.toFixed(2);

    const matriculation = await Matriculation.create({
      student_id,
      plan_id,
      start_date,
      end_date: endDate,
      price: formattedPrice,
    });

    await Queue.add(MatriculationMail.key, { matriculation, student, plan });

    return res.json(matriculation);
  }
}

export default new MatriculationController();
