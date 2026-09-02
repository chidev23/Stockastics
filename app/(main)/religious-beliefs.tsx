import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const modes=[{label:'Halal',description:'Explore stocks and market information that meet the configured Halal screening criteria.',route:'/(main)/halal',icon:'checkmark-circle-outline' as const,color:'#16A34A'},{label:'Haram',description:'Explore stocks and market information classified as Haram by the configured screening criteria.',route:'/(main)/haram',icon:'close-circle-outline' as const,color:'#DC2626'}];

export default function ReligiousBeliefsScreen(){
  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4">
      <Pressable accessibilityRole="button" accessibilityLabel="Back to Home" onPress={()=>router.replace('/(main)' as never)} className="h-10 w-10 items-center justify-center rounded-full bg-slate-50" hitSlop={8}><Ionicons name="arrow-back" size={22} color="#0F172A"/></Pressable>
      <Text className="ml-3 flex-1 text-xl font-extrabold text-slate-900">Religious beliefs</Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-10 pt-7">
      <Text className="text-2xl font-extrabold text-slate-900">Religious beliefs</Text>
      <Text className="mt-2 text-sm leading-6 text-slate-500">Choose how you want STOCKASTICS to organize stock information according to religious screening principles.</Text>
      <View className="mt-7 gap-4">{modes.map(mode=><Pressable key={mode.label} accessibilityRole="button" onPress={()=>router.push(mode.route as never)} className="rounded-3xl bg-white p-5 active:bg-slate-50"><View style={{backgroundColor:`${mode.color}14`}} className="h-14 w-14 items-center justify-center rounded-2xl"><Ionicons name={mode.icon} size={29} color={mode.color}/></View><View className="mt-5 flex-row items-center justify-between"><Text style={{color:mode.color}} className="text-2xl font-extrabold">{mode.label}</Text><Ionicons name="chevron-forward" size={22} color="#94A3B8"/></View><Text className="mt-2 text-sm leading-6 text-slate-500">{mode.description}</Text></Pressable>)}</View>
    </ScrollView>
  </SafeAreaView>;
}
