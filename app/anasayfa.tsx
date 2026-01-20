import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Veritabanı sütunlarıyla birebir aynı yaptık
interface AlınacaklarVeriTipi {
    id: string;
    alinacak_ismi: string;
    alinacak_miktar: number;
}

const Anasayfa = () => {
    const [veriler, setVeriler] = useState<AlınacaklarVeriTipi[]>([]);
    const [AlınacakEkle, setAlınacakEkle] = useState("");
    const [adetEkle, setAdetEkle] = useState("");
    const router = useRouter();

    useEffect(() => {
        VerileriGetir();
    }, []);

    const VerileriGetir = async () => {
        try {
            const kaydedilenId = await AsyncStorage.getItem("kullanici_id");
            if (!kaydedilenId) return;

            const cevap = await fetch(`http://192.168.0.19:3000/liste/${kaydedilenId}`);
            const gelen = await cevap.json();

            if (cevap.status === 200) {
                setVeriler(gelen);
            } else {
                console.log("Sunucu hatası:", gelen.message);
            }
        } catch (hata) {
            console.log("Veri çekme hatası:", hata);
        }
    };

    const YeniAlınacakEKle = async () => {
        if (AlınacakEkle.trim().length === 0 || adetEkle.trim().length === 0) {
            Alert.alert("Eksik Bilgi", "Lütfen tüm alanları doldurunuz.");
            return;
        }

        try {
            const suankiKullaniciId = await AsyncStorage.getItem("kullanici_id");
            
            const cevap = await fetch("http://192.168.0.19:3000/liste-ekle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    kullanici_id: suankiKullaniciId ? parseInt(suankiKullaniciId) : 1,
                    alinacak_ismi: AlınacakEkle,
                    alinacak_miktar: parseInt(adetEkle)
                })
            });

            const SonUrun = await cevap.json();

            if (cevap.status === 201) {
                setVeriler((oncekiVeriler) => [...oncekiVeriler, SonUrun.urun]);
                setAlınacakEkle("");
                setAdetEkle("");
                Alert.alert("Başarılı", "Ürün listeye eklendi!");
            } else {
                Alert.alert("Hata", "Ürün eklenemedi.");
            }
        } catch (hata) {
            console.log("Urun ekleme hatası:", hata);
            Alert.alert("Sistem Hatası", "Sunucuya bağlanılamadı.");
        }
    };

    return (
        <View style={styles.mainContainer}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <View>
                    <Text style={styles.brandTitle}>Alacak Yönetimi</Text>
                    <Text style={styles.welcomeText}>Listenizi kontrol edin</Text>
                </View>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.replace("/")}>
                    <Ionicons name="log-out-outline" size={22} color="#111827" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={styles.formCard}>
                    <Text style={styles.cardLabel}>YENİ KAYIT OLUŞTUR</Text>
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, { flex: 2 }]}
                            placeholder='Ürün Tanımı'
                            placeholderTextColor="#9CA3AF"
                            value={AlınacakEkle}
                            onChangeText={setAlınacakEkle}
                        />
                        <TextInput
                            style={[styles.input, { flex: 1, marginLeft: 12 }]}
                            placeholder='Miktar'
                            placeholderTextColor="#9CA3AF"
                            keyboardType='numeric'
                            value={adetEkle}
                            onChangeText={setAdetEkle}
                        />
                    </View>
                    <TouchableOpacity style={styles.primaryButton} onPress={YeniAlınacakEKle} activeOpacity={0.8}>
                        <Text style={styles.primaryButtonText}>Ekle</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>Aktif Liste</Text>
                <Text style={styles.itemCount}>{veriler.length} Ürün</Text>
            </View>

            <FlatList
                data={veriler}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
                renderItem={({ item }) => (
                    <View style={styles.entryCard}>
                        <View style={styles.entryInfo}>
                            <View style={styles.accentBar} />
                            <View>
                                <Text style={styles.entryTitle}>{item.alinacak_ismi}</Text>
                                <Text style={styles.entryDate}>Sistem Kayıtlı Ürün</Text>
                            </View>
                        </View>
                        <View style={styles.quantityBadge}>
                            <Text style={styles.quantityText}>{item.alinacak_miktar} br.</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#F9FAFB' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, paddingHorizontal: 25, paddingBottom: 20, backgroundColor: '#FFFFFF' },
    brandTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
    welcomeText: { fontSize: 14, color: '#6B7280' },
    iconButton: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
    formCard: { backgroundColor: '#FFFFFF', margin: 20, padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB' },
    cardLabel: { fontSize: 11, fontWeight: 'bold', color: '#6B7280', marginBottom: 10 },
    row: { flexDirection: 'row', marginBottom: 15 },
    input: { backgroundColor: '#F3F4F6', height: 50, borderRadius: 12, paddingHorizontal: 15, color: '#111827', fontSize: 16 },
    primaryButton: { backgroundColor: '#111827', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    primaryButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
    listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, marginVertical: 15 },
    listTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
    itemCount: { fontSize: 13, color: '#6B7280' },
    entryCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
    entryInfo: { flexDirection: 'row', alignItems: 'center' },
    accentBar: { width: 4, height: 30, backgroundColor: '#111827', borderRadius: 2, marginRight: 12 },
    entryTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
    entryDate: { fontSize: 12, color: '#9CA3AF' },
    quantityBadge: { backgroundColor: '#F3F4F6', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
    quantityText: { fontSize: 13, fontWeight: 'bold', color: '#111827' }
});

export default Anasayfa;