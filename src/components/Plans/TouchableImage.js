import React, { useState } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const TouchableImage = ({ source, onToggle }) => {
  const [isActive, setIsActive] = useState(true);

  const handlePress = () => {
    setIsActive(!isActive);
    if (onToggle) {
      onToggle(!isActive);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.5}
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]} // Use an array to combine styles
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
