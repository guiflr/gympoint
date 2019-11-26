import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class MatriculationMail {
  get key() {
    return 'MatriculationMail';
  }

  async handle({ data }) {
    const { matriculation, student, plan } = data;

    console.log('a fila executou');

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula GymPoint',
      template: 'matriculation',
      context: {
        student: student.name,
        date: format(
          parseISO(matriculation.start_date),
          "dd 'de' MMMM', às 'H:mm'h'",
          {
            locale: pt,
          }
        ),
        value: matriculation.price,
        months: plan.duration,
      },
    });
  }
}

export default new MatriculationMail();
