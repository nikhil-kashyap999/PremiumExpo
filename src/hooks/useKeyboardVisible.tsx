import { Keyboard } from "react-native";
import { useEffect, useState } from "react";

export default function useKeyboardVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showEvent = "keyboardDidShow";
    const hideEvent = "keyboardDidHide";

    const show = Keyboard.addListener(showEvent, () => setVisible(true));
    const hide = Keyboard.addListener(hideEvent, () => setVisible(false));

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return visible;
};