import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
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

const GirisSayfasi = () => {
  const [kullanici_adi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const router = useRouter();

  const KullaniciKontrol = async () => {
    if (!kullanici_adi || !sifre) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurunuz.");
      return;
    }

    try {
      const cevap = await fetch("http://192.168.0.19:3000/giris", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kullanici_adi: kullanici_adi,
          sifre: sifre,
        }),
      });

      const sonuc = await cevap.json();

      if (cevap.status === 200) {
        await AsyncStorage.setItem("@Kullanıcı_veri", kullanici_adi);
        await AsyncStorage.setItem("kullanici_id", sonuc.id.toString());
        router.push("/anasayfa");      
      } else {
        Alert.alert("Giriş Başarısız", sonuc.message);
      }
    } catch (hata) {
      Alert.alert("Hata", "Sunucu bağlantısı kurulamadı.");
    }
  };

  return (
    <View style={styles.anaKonteyner}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.icerikKonteyner}
      >
        <View style={styles.ustBolum}>
          <View style={styles.logoKutusu}>
            <Ionicons name="journal-sharp" size={32} color="#1A202C" />
          </View>
          <Text style={styles.baslikMetni}>Hoş Geldin!</Text>
          <Text style={styles.altBilgiMetni}>Alışveriş yönetimi için giriş yapabilirsin.</Text>
        </View>

        <View style={styles.girisAlani}>
          <View style={styles.inputGrubu}>
            <Text style={styles.etiket}>Kullanıcı Adı</Text>
            <View style={styles.inputCercevesi}>
              <Ionicons name="person-outline" size={20} color="#A0AEC0" />
              <TextInput
                style={styles.metinGirdisi}
                onChangeText={setKullaniciAdi}
                value={kullanici_adi}
                placeholder='kullanıcı adı'
                placeholderTextColor="#CBD5E0"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGrubu}>
            <Text style={styles.etiket}>Şifre</Text>
            <View style={styles.inputCercevesi}>
              <Ionicons name="lock-closed-outline" size={20} color="#A0AEC0" />
              <TextInput
                style={styles.metinGirdisi}
                placeholder='••••••••'
                placeholderTextColor="#CBD5E0"
                onChangeText={setSifre}
                value={sifre}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity style={styles.sifremiUnuttumButon}>
            <Text style={styles.sifremiUnuttumMetni}>Şifremi Unuttum</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.girisButonu} 
            onPress={KullaniciKontrol}
            activeOpacity={0.85}
          >
            <Text style={styles.girisButonMetni}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.altBolum}>
          <Text style={styles.hesapYokMetni}>Henüz bir hesabın yok mu? </Text>
          <TouchableOpacity onPress={() => router.push("/kayit")}>
            <Text style={styles.kaydolMetni}>Kaydol</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  anaKonteyner: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  icerikKonteyner: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  ustBolum: {
    alignItems: 'center',
    marginBottom: 45,
  },
  logoKutusu: {
    width: 65,
    height: 65,
    backgroundColor: '#F7FAFC',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },
  baslikMetni: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A202C',
    letterSpacing: -0.5,
  },
  altBilgiMetni: {
    fontSize: 15,
    color: '#718096',
    marginTop: 6,
    textAlign: 'center',
  },
  girisAlani: {
    width: '100%',
  },
  inputGrubu: {
    marginBottom: 18,
  },
  etiket: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A5568',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputCercevesi: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 58,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metinGirdisi: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#2D3748',
  },
  sifremiUnuttumButon: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  sifremiUnuttumMetni: {
    color: '#718096',
    fontSize: 13,
    fontWeight: '600',
  },
  girisButonu: {
    backgroundColor: '#1A202C',
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1A202C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  girisButonMetni: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  altBolum: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 35,
  },
  hesapYokMetni: {
    color: '#718096',
    fontSize: 14,
  },
  kaydolMetni: {
    color: '#1A202C',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default GirisSayfasi;