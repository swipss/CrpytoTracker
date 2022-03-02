import { View, Text, Pressable } from "react-native";
import React, { memo } from "react";
const FilterComponent = (props) => {
  const { filterDay, filterText, selectedRange, setSelectedRange } = props;

  const isFilterSelected = (filter) => filter === selectedRange;
  return (
    <Pressable
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: isFilterSelected(filterDay)
          ? "#1e1e1e"
          : "transparent",
        borderRadius: 5,
      }}
      onPress={() => setSelectedRange(filterDay)}
    >
      <Text style={{ color: isFilterSelected(filterDay) ? "#fff" : "grey" }}>
        {filterText}
      </Text>
    </Pressable>
  );
};

export default memo(FilterComponent);
