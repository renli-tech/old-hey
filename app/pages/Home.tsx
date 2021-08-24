import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme';
import tailwind from 'tailwind-rn';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Swipeable from 'react-native-swipeable';

export interface HomeProps {}

// const { WIDTH: width, HEIGHT: height } = Dimensions.get('screen');

const Home: React.FC<HomeProps> = () => {
  const chats = useState(new Array(0).fill({}))[0];

  return (
    <View style={styles.body}>
      <View style={tailwind('flex flex-row px-4 pt-10 pb-8 justify-between')}>
        <View style={tailwind('')}>
          <Text
            style={[
              tailwind('font-bold text-4xl'),
              { fontFamily: 'Cereal-Medium', color: colors['white'] },
            ]}
          >
            Hey! Joe
          </Text>
        </View>
        <View style={tailwind('flex flex-row')}>
          <Feather
            accessibilityRole='search'
            name='search'
            color={colors['white']}
            size={18}
            style={[tailwind('rounded-full p-4')]}
          />
          <Feather
            name='user'
            color={colors['white']}
            size={18}
            style={[
              tailwind('rounded-full p-4'),
              { backgroundColor: colors['500'] },
            ]}
          />
        </View>
      </View>
      <View style={tailwind('flex flex-row px-4 justify-between')}>
        <View style={tailwind('flex flex-col')}>
          <Text
            style={[
              tailwind('font-bold text-4xl'),
              { fontFamily: 'Cereal-Medium', color: colors['white'] },
            ]}
          >
            Chats
          </Text>
          <Text
            style={[
              tailwind('font-bold text-sm '),
              { fontFamily: 'Cereal-Light', color: colors['100'] },
            ]}
          >
            2 unread messages
          </Text>
        </View>
        <View style={tailwind('')}>
          <Feather
            name='filter'
            color={colors['white']}
            size={15}
            style={[tailwind('rounded-full p-4')]}
          />
        </View>
      </View>
      <ChatList chats={chats} />
    </View>
  );
};

const ChatList: React.FC<{ chats: any[] }> = ({ chats }) => {
  if (chats.length === 0) {
    return (
      <View style={tailwind('flex items-center justify-center py-4')}>
        <Text
          style={[
            tailwind('text-gray-300 py-4 text-xl'),
            { fontFamily: 'Cereal-Medium' },
          ]}
        >
          You have no messages
        </Text>
        <TouchableOpacity
          accessibilityRole='button'
          style={[
            tailwind('px-4 py-2 rounded-lg'),
            { backgroundColor: colors[100] },
          ]}
        >
          <Text
            style={[
              tailwind('text-white'),
              { fontFamily: 'Cereal-Medium', color: colors['white'] },
            ]}
          >
            Find Friends
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={tailwind('flex flex-col pb-28')}>
      <FlatList
        data={chats}
        renderItem={() => <ChatListItem />}
        style={tailwind('mt-4')}
      />
      <View style={tailwind('flex items-center justify-center py-4')}>
        <Text
          style={[
            tailwind('text-gray-300 py-4 text-xl'),
            { fontFamily: 'Cereal-Medium' },
          ]}
        >
          No More Messages
        </Text>
      </View>
    </View>
  );
};

const ChatListItem: React.FC<{}> = () => {
  const rightButtons = [
    <TouchableOpacity>
      <Feather
        name='trash'
        color={colors['white']}
        size={18}
        style={[
          tailwind('rounded-full p-4'),
          { backgroundColor: colors['500'] },
        ]}
      />
    </TouchableOpacity>,
  ];

  return (
    <Swipeable rightButtons={rightButtons}>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={tailwind('flex flex-row px-4 my-2 justify-between')}>
          <View style={tailwind('flex flex-row')}>
            <View style={tailwind('flex flex-row')}>
              <Feather
                name='user'
                color={colors['white']}
                size={18}
                style={[
                  tailwind('rounded-full p-4'),
                  { backgroundColor: colors['500'] },
                ]}
              />
            </View>
            <View style={tailwind('flex flex-col px-4')}>
              <View style={tailwind('')}>
                <Text
                  style={[
                    tailwind('font-bold text-xl'),
                    { fontFamily: 'Cereal-Medium', color: colors['white'] },
                  ]}
                >
                  Chats
                </Text>
              </View>
              <View style={tailwind('')}>
                <Text
                  style={[
                    tailwind('font-bold text-sm '),
                    { fontFamily: 'Cereal-Medium', color: colors['100'] },
                  ]}
                >
                  2 unread messages
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={[
              tailwind('font-bold text-sm self-center'),
              { fontFamily: 'Cereal-Medium', color: colors['100'] },
            ]}
          >
            few seconds ago
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors['black'],
    flex: 1,
  },
});
export default Home;
