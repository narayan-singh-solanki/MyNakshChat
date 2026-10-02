import { FlatList, StyleSheet, View } from 'react-native';

import { Experience } from '../../types/types';
import ExperienceCard from './ExperienceCard';
import { useCallback } from 'react';

interface Props {
  experiences: Experience[];
}
const ExperienceRail = ({ experiences }: Props) => {
  const renderItem = useCallback(({ item }: { item: Experience }) => {
    return <ExperienceCard experience={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={experiences}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
});

export default ExperienceRail;
