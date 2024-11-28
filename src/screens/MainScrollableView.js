import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import NestedScrollable from '../components/NestedScrollable';
import EcChart from '../components/EcChart';
import EcDocumentos from '../components/EcDocumentos';

const MainScrollableView = () => {
  return (
    <View style={styles.container} nestedScrollEnabled={true}>
      <Text style={styles.header}>Statistics</Text>
      <NestedScrollable style={styles.section}>
        {/*<EcChart />*/}
      </NestedScrollable>
      
      <Text style={styles.header}>Documents</Text>
      <NestedScrollable style={styles.section}>
        <EcDocumentos />
      </NestedScrollable>
      
      {/* Add more sections as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
});

export default MainScrollableView;