import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function SettingsScreen(){return <SafeAreaView className="flex-1 bg-slate-50 px-5 pt-6"><Text className="text-2xl font-extrabold text-slate-900">Settings</Text><View className="mt-6 rounded-2xl bg-white p-5"><Text className="font-bold text-slate-900">App settings</Text><Text className="mt-2 text-slate-500">Manage your STOCKASTICS preferences here.</Text></View></SafeAreaView>}
