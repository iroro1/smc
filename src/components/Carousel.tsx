import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ViewToken,
  ViewStyle,
  TextStyle,
} from "react-native";

interface CarouselProps {
  images: { uri: string; text: React.ReactNode }[];
  autoPlayInterval?: number;
  containerStyle?: ViewStyle;
  overlayStyle?: ViewStyle;
  height?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlayInterval = 4000,
  containerStyle,
  overlayStyle,
  height = 300,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (activeIndex + 1) % images.length;
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setActiveIndex(nextIndex);
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [activeIndex, images.length, autoPlayInterval]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]) {
        setActiveIndex(viewableItems[0].index || 0);
      }
    }
  ).current;

  const renderItem = ({
    item,
  }: {
    item: { uri: any; text: React.ReactNode };
  }) => (
    <View style={[styles.slide, { height }]}>
      <Image
        source={item.uri} // <-- no wrapping with `require()` here
        style={[styles.image, { height }]}
      />
      <View style={[styles.textOverlay, overlayStyle]}>{item.text}</View>
    </View>
  );

  return (
    <View style={[styles.container, { height }, containerStyle]}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.pagination}>
        {/* {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
  },
  slide: {
    width: Dimensions.get("window").width,
  },
  image: {
    width: "100%",
    minHeight: "100%",
    resizeMode: "cover",
  },
  textOverlay: {
    position: "absolute",
    width: "100%",
    minHeight: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
    // bottom: 0,
    // left: 0,
    // right: 0,
    justifyContent: "flex-start",
    // alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "white",
  },
});
