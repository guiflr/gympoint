import Plan from '../models/Plan';
import * as Yup from 'yup';

class PlaController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['title', 'price', 'duration'],
    });

    return res.json(plans);
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) return res.status(400).json({ error: 'Plan does not exists.' });

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) return res.status(400).json({ error: 'Plan does not exists.' });

    await Plan.destroy({ where: { id: plan.id } });

    res.json({ ok: true });
  }
}

export default new PlaController();
