import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Easing,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

function LogoutModal({visible, onCancel, onConfirm}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (visible) {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      setShowContent(true); // only render animated content once reset is done

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
    } else {
      setShowContent(false);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onCancel();
    });
  };

  const handleConfirm = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onConfirm();
    });
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      {showContent && (
        <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
          <Animated.View
            style={[
              styles.modal,
              {
                transform: [{scale: scaleAnim}],
                opacity: 1, // let background handle fade, modal only scales
              },
            ]}>
            <View style={styles.messageCon}>
              <View style={styles.modalHeading}>
                <Text style={styles.modalHeadingStyle}>
                  Logout Confirmation
                </Text>
              </View>
              <Text style={styles.message}>
                Are you sure you want to log out?
              </Text>
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.closeBtn}
                activeOpacity={0.7}
                onPress={handleClose}>
                <Text style={styles.btnText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeBtn}
                activeOpacity={0.7}
                onPress={handleConfirm}>
                <Text style={[styles.btnText, {color: '#aaa8a8ff'}]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      )}
    </Modal>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modal: {
    paddingHorizontal: 15,
    paddingTop: 15,
    zIndex: 9999,
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
    paddingBottom: 10,
    marginBottom: 16,
  },
  modalHeadingStyle: {
    fontSize: 17,
    textAlign: 'left',
    fontWeight: '600',
    color: '#e5e5e5',
  },
  message: {
    fontSize: 15,
    color: '#e5e5e5',
    fontWeight: '400',
    textAlign: 'left',
    lineHeight: 22,
  },
  btnContainer: {
    paddingVertical: 2,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeBtn: {
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 12,
    marginLeft: 10,
  },
  btnText: {
    color: '#e11d48',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default memo(LogoutModal);
