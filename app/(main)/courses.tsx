import InfoPage from '../../src/components/InfoPage';

export default function CoursesScreen() {
  return <InfoPage title="Courses" icon="library-outline" intro="Access structured learning paths designed to help users understand investing, market intelligence and STOCKASTICS features." sections={[
    { heading: 'Investing basics', body: 'A beginner-friendly path covering stocks, exchanges, orders, diversification and the foundations of responsible investing.' },
    { heading: 'Market intelligence', body: 'Learn how to combine market data, company information, news, sentiment and behavioural context when researching a stock.' },
    { heading: 'Using STOCKASTICS', body: 'Guided lessons will explain the app features and how to navigate signals, markets, news and the other intelligence tools.' },
  ]} />;
}
