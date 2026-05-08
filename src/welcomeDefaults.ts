import type { WelcomeFormData, QAItem } from './types';
import { generateId } from './types';

const DEFAULT_QA: QAItem[] = [
  { id: generateId(), question: 'Your favorite movies of all time?', answer: '' },
  { id: generateId(), question: 'What is playing in your car/home right now?', answer: '' },
  { id: generateId(), question: 'If you had one wish, what would it be?', answer: '' },
  { id: generateId(), question: "You're stuck on a deserted island — one meal, what is it?", answer: '' },
  { id: generateId(), question: 'You absolutely CANNOT live without?', answer: '' },
  { id: generateId(), question: 'In the next year, what are you most looking forward to?', answer: '' },
  { id: generateId(), question: "What's the greatest advice anyone's ever given you?", answer: '' },
  { id: generateId(), question: 'One thing others should definitely know about you?', answer: '' },
];

export const WELCOME_INITIAL: WelcomeFormData = {
  companyName: '',
  logoUrl: '',
  accentColor: '#F35C17',
  headline: "You're Part of The Family Now",
  employeeName: '',
  employeePhotoUrl: '',
  jobTitle: '',
  employeeEmail: '',
  about: '',
  education: '',
  experience: '',
  welcomeQuote: '',
  welcomeClosing: "We're excited to see their contributions to our team.",
  qaItems: DEFAULT_QA,
};
