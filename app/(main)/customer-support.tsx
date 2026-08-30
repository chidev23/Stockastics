import InfoPage from '../../src/components/InfoPage';

export default function CustomerSupportScreen() {
  return <InfoPage title="Customer support" icon="headset-outline" intro="Get help with your STOCKASTICS account, subscriptions, signals and app experience." sections={[
    { heading: 'How we can help', body: 'Use this area for support requests, account questions, subscription assistance and help understanding STOCKASTICS features.' },
    { heading: 'Contact support', body: 'Support contact options will be connected here when the customer service system is enabled.' },
  ]} />;
}
