import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Easing,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import light from '../../Themes/light';
import {useLandingMessageModal} from '../../context/LandingMessageModal';

function LandingMessageModal() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const {isVisible, setIsVisible} = useLandingMessageModal();
  // const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
      ]).start();
    }
  }, [isVisible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.5, // shrink down a bit more
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false); // hide content only after animation ends
      //   hideMessageModal(); // update global modal state
    });
  };
  if (!isVisible) return null;
  return (
    isVisible && (
      <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{scale: scaleAnim}],
            },
          ]}>
          <View style={styles.messageCon}>
            <View style={styles.modalHeading}>
              <Text style={styles.modalHeadingStyle}>⚠ Important</Text>
            </View>
            <View style={styles.bulletContainer}>
              <Text style={styles.bullet}>
                • This project is still in development.
              </Text>
              <Text style={styles.bullet}>
                • Do not share personal or sensitive information while chatting.
              </Text>
              <Text style={styles.bullet}>
                • You may encounter some issues or limitations.
              </Text>
              <Text style={styles.bullet}>
                • We’ll notify you once security improvements are complete.
              </Text>
            </View>

            <Text style={styles.footerNote}>
              Thank you for your understanding and support.
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.closeBtn}
              activeOpacity={0.7}
              onPress={handleClose}>
              <Text style={styles.btnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    )
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  modal: {
    paddingHorizontal: 15,
    paddingTop: 15,
    zIndex: 40,
    width: width * 0.85,
    maxWidth: 340,
    borderRadius: 14,
    backgroundColor: '#2c2c2c',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  messageCon: {
    width: '100%',
    height: 'auto',
    marginBottom: 25,
  },
  modalHeading: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#525252',
    paddingBottom: 10,
    marginBottom: 16,
  },
  modalHeadingStyle: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#e5e5e5',
  },
  message: {
    fontSize: 15,
    color: '#e5e5e5',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
  },
  bulletContainer: {
    marginBottom: 12,
  },
  bullet: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 6,
  },
  footerNote: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 6,
  },
  btnContainer: {
    borderTopWidth: 0.5,
    borderTopColor: '#525252',
    paddingVertical: 2,
    marginBottom: 5,
  },
  closeBtn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: 'center',
  },
  btnText: {
    color: light.primary,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LandingMessageModal;
