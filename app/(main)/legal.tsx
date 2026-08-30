import InfoPage from '../../src/components/InfoPage';

export default function LegalScreen() {
  return <InfoPage title="Legal" icon="shield-checkmark-outline" intro="Review the policies and terms that govern your use of STOCKASTICS." sections={[
    { heading: 'Privacy Policy', body: 'Learn how account information, app activity and other data are handled. The full privacy policy will be published here.' },
    { heading: 'Terms & Conditions', body: 'Review the terms that apply when using STOCKASTICS, including signal and market-information disclaimers.' },
    { heading: 'Risk disclosure', body: 'Market information and signals are provided for informational purposes and are not a guarantee of investment results.' },
  ]} />;
}
