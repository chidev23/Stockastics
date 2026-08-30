import InfoPage from '../../src/components/InfoPage';

export default function NewsAnalyticsScreen() {
  return <InfoPage title="News Analytics and Speculation" icon="analytics-outline" intro="Go beyond the headline with analysis and explanations of major news releases and what leading investors are saying." sections={[
    { heading: 'News analysis', body: 'Understand the potential market meaning of important economic, corporate and financial news releases.' },
    { heading: 'Investor views', body: 'Follow commentary and viewpoints from notable investors while keeping opinion clearly separated from verified facts.' },
    { heading: 'Market context', body: 'See how news can affect sentiment, expectations and market behaviour before reviewing a STOCKASTICS signal.' },
  ]} />;
}
