import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { answer, student } = data;

    console.log('a fila executou');

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Resposta GymPoint',
      template: 'answer',
      context: {
        student: student.name,
        date: format(parseISO(answer.answer_at), "dd 'de' MMMM', às 'H:mm'h'", {
          locale: pt,
        }),
        question: answer.question,
        answer: answer.answer,
      },
    });
  }
}

export default new AnswerMail();
