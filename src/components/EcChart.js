import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Switch, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const EcChart = () => {
  const [chartWidth, setChartWidth] = useState(Dimensions.get('window').width - 32);
  const [toggles, setToggles] = useState({
    Bautismos: true,
    Matrimonios: true,
    Confirmaciones: true,
    Defunciones: true,
    Comuniones: true
  });

  useEffect(() => {
    const updateLayout = () => {
      setChartWidth(Dimensions.get('window').width - 32);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  const labels = Object.keys(toggles);
  const data = {
    labels: labels,
    datasets: Object.entries(toggles).filter(([_, value]) => value).map(([key, _], index) => ({
      data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
      color: (opacity = 1) => {
        const colors = ['#26A69A', '#EF5350', '#78909C', '#FFA726', '#42A5F5'];
        return `rgba(${parseInt(colors[index].slice(1, 3), 16)}, ${parseInt(colors[index].slice(3, 5), 16)}, ${parseInt(colors[index].slice(5, 7), 16)}, ${opacity})`;
      },
      strokeWidth: 2
    }))
  };

  const ToggleButton = ({ label, color }) => (
    <View style={styles.toggleContainer}>
      <Switch
        trackColor={{ false: "#767577", true: color }}
        thumbColor={toggles[label] ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(newValue) => setToggles(prev => ({ ...prev, [label]: newValue }))}
        value={toggles[label]}
        style={styles.switch}
      />
      <Text style={styles.toggleLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visualizar estadísticas</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.togglesScroll}>
        <View style={styles.togglesContainer}>
          {labels.map((label, index) => (
            <ToggleButton key={label} label={label} color={['#26A69A', '#EF5350', '#78909C', '#FFA726', '#42A5F5'][index]} />
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        
      {Object.values(toggles).some(value => value) ? (
        <LineChart
        data={data}
        width={Math.max(chartWidth, labels.length * 60)} // Ensure enough width for labels
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: "4", strokeWidth: "2", stroke: "#ffa726" },
          propsForLabels: {
            fontSize: 8,
          },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
        //horizontalLabelRotation={-45}
        verticalLabelRotation={-45}
      />
      ):(
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>Por favor, seleccione al menos una estadística para visualizar.</Text>
        </View>
      )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#26A69A',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  togglesScroll: {
    marginBottom: 16,
  },
  togglesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  toggleLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  noDataContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  }
});

export default EcChart;