import InfoPage from '../../src/components/InfoPage';

export default function BehaviouralReportScreen() {
  return <InfoPage title="Behavioural Report" icon="pulse-outline" intro="Explore investor behaviour, market psychology and the behavioural factors that can influence financial decisions." sections={[
    { heading: 'Behavioural insights', body: 'Reports will explain common behavioural patterns and how emotions, habits and cognitive biases can affect investor decisions.' },
    { heading: 'Market psychology', body: 'Understand how collective behaviour can influence sentiment, expectations and market movements.' },
    { heading: 'Better decision-making', body: 'Use behavioural insights as an additional perspective alongside company, market, news and signal information.' },
  ]} />;
}
