// import logo from "@/assets/images/A1.png";
// import {useEffect, useState} from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import {View, Text, StyleSheet, Image} from 'react-native';

// export default function AuthSaplash() {
//   const [dots, setDots] = useState('.');

//   // 🔹 Dots animation ("Authenticating...")
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDots(prev => (prev.length < 3 ? prev + '.' : '.'));
//     }, 500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <LinearGradient
//       colors={['#000000', '#161515ff', '#000000']}
//       start={{x: 0.5, y: 0}}
//       end={{x: 0.5, y: 1}}
//       style={styles.container}>
//       <Image source={logo} style={styles.logoStyle} />
//       {/* Title */}
//       <Text style={styles.title}>PREMIUM</Text>

//       {/* Authenticating */}
//       <Text style={styles.authText}>Authenticating{dots}</Text>

//       {/* Footer */}
//       <View style={styles.footer}>
//         <Text style={styles.version}>Version v0.0.1</Text>
//         <Text style={styles.dev}>
//           Developed By <Text style={{fontWeight: '700'}}>BlackCode</Text>
//         </Text>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 50,
//   },
//   logoStyle: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },

//   title: {
//     fontSize: 28,
//     color: '#E0E0E0',
//     letterSpacing: 25,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   authText: {
//     fontSize: 14,
//     color: '#bbb',
//     marginBottom: 20,
//   },
//   progressContainer: {
//     width: '65%',
//     height: 2,
//     borderRadius: 4,
//     backgroundColor: '#222',
//     overflow: 'hidden',
//     marginBottom: 30,
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#f59128', // orange accent
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 25,
//     alignItems: 'center',
//   },
//   version: {
//     fontSize: 12,
//     color: '#aaa',
//     marginBottom: 4,
//   },
//   dev: {
//     fontSize: 12,
//     color: '#aaa',
//   },
// });

import logo from "@/assets/images/A1.png";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AuthSaplash() {
  const [dots, setDots] = useState(".");

  // 🔹 Dots animation ("Authenticating...")
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <Image source={logo} style={styles.logoStyle} />
      {/* Title */}
      <Text style={styles.title}>PREMIUM</Text>

      {/* Authenticating */}
      <Text style={styles.authText}>Authenticating{dots}</Text>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.version}>Version v0.0.1</Text>
        <Text style={styles.dev}>
          Developed By <Text style={{ fontWeight: "700" }}>BlackCode</Text>
        </Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    backgroundColor:"black"
  },
  logoStyle: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    color: "#E0E0E0",
    letterSpacing: 25,
    fontWeight: "bold",
    marginBottom: 15,
  },
  authText: {
    fontSize: 14,
    color: "#bbb",
    marginBottom: 20,
  },
  progressContainer: {
    width: "65%",
    height: 2,
    borderRadius: 4,
    backgroundColor: "#222",
    overflow: "hidden",
    marginBottom: 30,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#f59128", // orange accent
  },
  footer: {
    position: "absolute",
    bottom: 25,
    alignItems: "center",
  },
  version: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 4,
  },
  dev: {
    fontSize: 12,
    color: "#aaa",
  },
});
