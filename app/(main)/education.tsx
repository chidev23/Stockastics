import InfoPage from '../../src/components/InfoPage';

export default function EducationScreen() {
  return <InfoPage title="Education and Courses" icon="school-outline" intro="Build a stronger understanding of markets, investing and the information STOCKASTICS provides through structured education and courses." sections={[
    { heading: 'Market fundamentals', body: 'Learn the basic concepts behind stocks, exchanges, price movements, company information and market participation.' },
    { heading: 'Understanding signals', body: 'Learn what each STOCKASTICS signal category means, how to read a signal and why independent research remains important.' },
    { heading: 'Risk awareness', body: 'Education content explains uncertainty, diversification, position sizing and responsible decision-making without promising returns.' },
  ]} />;
}
