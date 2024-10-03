import React from 'react';
import { Pressable } from 'react-native';

export function ExternalLink(props: React.ComponentProps<typeof Pressable>) {
  return (
    <Pressable
      {...props}
      onPress={(e) => {
        // TODO: Fix this line
        // WebBrowser.openBrowserAsync(props.href as string);
      }}
    />
  );
}
