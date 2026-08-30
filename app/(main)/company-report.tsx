import InfoPage from '../../src/components/InfoPage';

export default function CompanyReportScreen() {
  return <InfoPage title="Company Report" icon="business-outline" intro="Read structured company reports covering business performance, key developments and factors investors should understand." sections={[
    { heading: 'Company overview', body: 'Reports will bring together company background, business model, major developments and relevant market context.' },
    { heading: 'Performance & fundamentals', body: 'Review reported financial performance, operating trends and other fundamental information in one place.' },
    { heading: 'Investor context', body: 'Use company reports to understand the broader picture before reviewing STOCKASTICS signals or making investment decisions.' },
  ]} />;
}
