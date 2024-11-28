import React, { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

const NestedScrollable = ({ children, style }) => {
  const scrollRef = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const handleScrollBeginDrag = () => {
    setScrollEnabled(true);
  };

  const handleScrollEndDrag = () => {
    setScrollEnabled(false);
  };

  return (
    <ScrollView
      ref={scrollRef}
      scrollEnabled={scrollEnabled}
      onScrollBeginDrag={handleScrollBeginDrag}
      onScrollEndDrag={handleScrollEndDrag}
      style={style}
      nestedScrollEnabled={true}
    >
      <View onStartShouldSetResponder={() => true}>
        {children}
      </View>
    </ScrollView>
  );
};

export default NestedScrollable;