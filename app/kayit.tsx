import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const KayitSayfasi = () => {
  const [kullanici_Adi, setKullanici_Adi] = useState("");
  const [sifre, setSifre] = useState("");
  const router = useRouter();

  const KayitOl = async () => {
    // 1. Boş alan kontrolü
    if (kullanici_Adi.trim().length === 0 || sifre.trim().length === 0) {
      Alert.alert("Eksik Bilgi", "Hesap oluşturmak için lütfen tüm alanları doldurunuz.");
      return;
    }

    try {
      // 2. Fetch isteği (IP adresin ve Portun doğru olduğundan emin ol)
      const cevap = await fetch("http://192.168.0.19:3000/kayit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kullanici_adi: kullanici_Adi, // Backend'in beklediği isimle eşitledim
          sifre: sifre
        })
      });

      const sonuc = await cevap.json();

      // 3. Yanıt kontrolü
      if (cevap.status === 200 || cevap.status === 201) {
        Alert.alert("Başarılı", "Hesap başarıyla oluşturuldu!");
        router.push("/"); // Giriş sayfasına yönlendir
      } else {
        Alert.alert("Kayıt Başarısız", sonuc.message || "Bir hata oluştu.");
      }
    } catch (error) {
      console.log("Bağlantı Hatası:", error);
      Alert.alert("Bağlantı Hatası", "Sunucuya ulaşılamadı. İnternetini ve Backend'i kontrol et kanka.");
    }
  };

  return (
    <View style={styles.anaKonterner}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.icerikKonteyner}
      >
        <TouchableOpacity style={styles.geriButonu} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#1A202C" />
        </TouchableOpacity>

        <View style={styles.ustBolum}>
          <Text style={styles.anaBaslik}>Yeni Kayıt</Text>
          <Text style={styles.altBaslik}>Sisteme erişmek için hesap oluşturun.</Text>
        </View>

        <View style={styles.formAlan}>
          <View style={styles.girdiGrubu}>
            <Text style={styles.etiket}>KULLANICI ADI</Text>
            <View style={styles.girdiCercevesi}>
              <Ionicons name="person-outline" size={20} color="#A0AEC0" style={styles.ikon} />
              <TextInput
                style={styles.girdi}
                placeholder='Kullanıcı adınızı belirleyin'
                placeholderTextColor="#CBD5E0"
                onChangeText={setKullanici_Adi}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.girdiGrubu}>
            <Text style={styles.etiket}>GÜVENLİ ŞİFRE</Text>
            <View style={styles.girdiCercevesi}>
              <Ionicons name="lock-closed-outline" size={20} color="#A0AEC0" style={styles.ikon} />
              <TextInput
                style={styles.girdi}
                placeholder='Şifrenizi oluşturun'
                placeholderTextColor="#CBD5E0"
                secureTextEntry
                onChangeText={setSifre}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.anaButon} onPress={KayitOl} activeOpacity={0.8}>
            <Text style={styles.butonMetni}>Hesabı Tamamla</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.altLink} onPress={() => router.push("/")}>
            <Text style={styles.altMetin}>
              Zaten bir hesabınız var mı? <Text style={styles.kalinMetin}>Giriş Yap</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  anaKonterner: { flex: 1, backgroundColor: '#FFFFFF' },
  icerikKonteyner: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  geriButonu: { position: 'absolute', top: 60, left: 20, padding: 10 },
  ustBolum: { marginBottom: 40 },
  anaBaslik: { fontSize: 32, fontWeight: '800', color: '#111827', letterSpacing: -1 },
  altBaslik: { fontSize: 16, color: '#6B7280', marginTop: 8 },
  formAlan: { width: '100%' },
  girdiGrubu: { marginBottom: 20 },
  etiket: { fontSize: 11, fontWeight: '800', color: '#9CA3AF', marginBottom: 8, marginLeft: 4, letterSpacing: 1.2 },
  girdiCercevesi: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6', height: 60, paddingHorizontal: 15 },
  ikon: { marginRight: 12 },
  girdi: { flex: 1, fontSize: 15, color: '#1F2937', fontWeight: '500' },
  anaButon: { backgroundColor: '#111827', borderRadius: 16, height: 60, justifyContent: 'center', alignItems: 'center', marginTop: 10, elevation: 4 },
  butonMetni: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  altLink: { marginTop: 25, alignItems: 'center' },
  altMetin: { color: '#6B7280', fontSize: 14 },
  kalinMetin: { color: '#111827', fontWeight: '800' }
});

export default KayitSayfasi;