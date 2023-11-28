import React, { useState } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const TouchableImage = ({ source, onToggle, name }) => {
  const [isActive, setIsActive] = useState(true);

  const handlePress = () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    console.log(
      `TouchableImage pressed. Name: ${name}, New active state: ${newActiveState}`
    );
    if (onToggle) {
      onToggle(name, newActiveState);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.5}
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
    >
      <Image source={source} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
});

export default TouchableImage;
