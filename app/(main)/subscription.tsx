import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function SubscriptionScreen(){return <SafeAreaView className="flex-1 bg-slate-50 px-5 pt-6"><Text className="text-2xl font-extrabold text-slate-900">Subscription</Text><View className="mt-6 rounded-2xl bg-white p-5"><Text className="font-bold text-blue-700">14-day free trial</Text><Text className="mt-2 text-slate-600">Continue with STOCKASTICS for $50/month after your trial.</Text></View></SafeAreaView>}
