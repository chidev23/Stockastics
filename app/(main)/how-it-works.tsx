import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler, ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const descriptions: Record<string, { title: string; text: string; steps: string[] }> = {
  retail: { title: 'Retail Signals', text: 'Retail BUY signals identify qualifying stocks using the independent retail strategy.', steps: ['Market conditions are evaluated.', 'The strategy checks its BUY criteria.', 'A signal is published only when the criteria are satisfied.'] },
  ipo: { title: 'IPO Signals', text: 'IPO signals highlight companies and listing information identified by the IPO strategy.', steps: ['Potential listings are monitored.', 'Relevant company and exchange information is evaluated.', 'Qualifying opportunities are presented as signals.'] },
  buyback: { title: 'Buyback Signals', text: 'Buyback signals identify potential opportunities associated with qualifying price drops and company repurchase activity.', steps: ['Price movement is evaluated.', 'Repurchase conditions are reviewed.', 'Qualifying opportunities are presented as BUYBACK calls.'] },
  sentiment: { title: 'Sentiment Signals', text: 'Sentiment signals identify stocks with qualifying bullish investor and market sentiment.', steps: ['Market and fundamental factors are evaluated.', 'Investor sentiment is assessed.', 'Qualifying BUY opportunities are presented as signals.'] },
  'ex-dividend': { title: 'Ex-Dividend Signals', text: 'Ex-Dividend signals identify qualifying BUY opportunities around dividend dates.', steps: ['Dividend schedules are monitored.', 'Relevant market conditions are evaluated.', 'Qualifying opportunities are presented as signals.'] },
  income: { title: 'Income Signals', text: 'Income signals identify stocks with potential price appreciation while maintaining dividend income.', steps: ['Income and market factors are evaluated.', 'The strategy checks its criteria.', 'Qualifying BUY opportunities are presented as signals.'] },
  default: { title: 'How STOCKASTICS Signals Work', text: 'STOCKASTICS presents independent BUY-only strategies and market intelligence.', steps: ['Each strategy operates independently.', 'Signals are generated when its rules are satisfied.', 'Use Markets, News and Sentiment for broader context before reviewing a signal.'] },
};

const RETURN_ROUTES: Record<string, string> = {
  retail: '/retail-signals',
  ipo: '/ipo-signals',
  buyback: '/buyback-signals',
  sentiment: '/sentiment-signals',
  'ex-dividend': '/ex-dividend-signals',
  income: '/income-signals',
  default: '/signals',
};

export default function HowItWorksScreen() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const signalType = type ?? 'default';
  const content = descriptions[signalType] ?? descriptions.default;
  const returnRoute = RETURN_ROUTES[signalType] ?? RETURN_ROUTES.default;

  const goBackToSource = () => router.replace(returnRoute as never);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      goBackToSource();
      return true;
    });
    return () => subscription.remove();
  }, [returnRoute]);

  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4"><Pressable onPress={goBackToSource} className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-slate-100"><Ionicons name="arrow-back" size={20} color="#0F172A" /></Pressable><Text className="text-xl font-extrabold text-slate-900">How it works</Text></View>
    <ScrollView contentContainerClassName="px-5 pb-10 pt-6">
      <View className="rounded-3xl bg-emerald-600 p-6"><View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/20"><Ionicons name="information-circle-outline" size={26} color="#FFFFFF" /></View><Text className="mt-5 text-2xl font-extrabold text-white">{content.title}</Text><Text className="mt-2 leading-5 text-emerald-50">{content.text}</Text></View>
      <View className="mt-5 rounded-2xl border border-slate-200 bg-white p-5"><Text className="text-lg font-extrabold text-slate-900">Process</Text>{content.steps.map((step, i) => <View key={step} className="mt-4 flex-row items-start"><View className="h-7 w-7 items-center justify-center rounded-full bg-emerald-50"><Text className="text-xs font-extrabold text-emerald-700">{i + 1}</Text></View><Text className="ml-3 flex-1 leading-5 text-slate-600">{step}</Text></View>)}</View>
      <View className="mt-5 rounded-2xl border border-slate-200 bg-white p-5"><Text className="text-sm leading-5 text-slate-500">Signals are informational and are not financial advice. Market prices and conditions can change after a signal is generated.</Text></View>
    </ScrollView>
  </SafeAreaView>;
}
