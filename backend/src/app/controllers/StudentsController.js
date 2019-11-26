import Student from '../models/Student';
import * as Yup from 'yup';

class StudentsController {
  async index(req, res) {
    const students = await Student.findAll();
    console.log('INDEX');
    return res.json({ students: students });
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      stature: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });
    if (studentExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const student = await Student.create(req.body);
    return res.status(201).json({ student: student });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      stature: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(400).json({ error: 'Stundent not found.' });
    const resStudent = await student.update(req.body);

    return res.status(201).json({ student: resStudent });
  }
  async show(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(400).json({ error: 'Student not found.' });
    return res.json({ student: student });
  }
}

export default new StudentsController();
