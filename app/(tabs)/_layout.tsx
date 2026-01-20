import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Üst başlığı kapat
        tabBarStyle: { display: 'none' }, // ALTTTAKİ BEYAZLIĞI KOMPLE SİLER
      }}>
      {/* Sadece senin ana sayfan kalsın */}
      <Tabs.Screen name="index" />
      
      {/* Explore burada dursa bile display:none olduğu için görünmeyecek */}
      <Tabs.Screen name="explore" />
    </Tabs>
  );
}