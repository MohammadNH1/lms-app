import React from 'react';
import { Text, View } from 'react-native';

const RichtTextContent = ({ blockContent }: { blockContent: any }) => {
  return (
    <View>
      {blockContent?.map((block: any, index: number) => (
        <Text key={index} style={{ marginBottom: 12, fontSize: 16, color: '#333' }}>
          {block.children?.map((child: any) => child.text).join(' ')}
        </Text>
      ))}
    </View>
  );
};

export default RichtTextContent;
